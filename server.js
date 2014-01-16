var express = require('express');
var Deferred = require('JQDeferred');
var request = require('request');

var stockApiUrl = 'http://download.finance.yahoo.com/d/quotes.csv?s={{symbol}}&f=t1nl1p2c1s';

//General app configurations (middlewares)
var app = express();
app.use(express.compress());  //Gzip the responses
var cacheMaxAge = 86400;  //One day
app.use(express.static(__dirname + '/public', { maxAge: cacheMaxAge * 1000 }));  //serves static files from the public folder

//CORS middleware
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    next();
};
app.use(allowCrossDomain);

//Monitors REST Api
app.get('/stock-info/:symbol', function (req, res) {
    Deferred.when(fetchStockData(req.params.symbol)).done(function(stockData){
        var result = {
            success: !!stockData,
            data: stockData
        };

        if(req.query && req.query['format'] === 'jsonp') {
            res.jsonp(result);
        }
        else {
            res.json(result);
        }
    });
});

app.get('*', function (req, res) {
    res.json({
        success: false,
        message: 'Symbol was not provided. Use the following path: /stock-info/<symbol>'
    });
});

function fetchStockData(symbol) {
    var dfd = Deferred();
    var url = stockApiUrl.replace('{{symbol}}', symbol);

    request({ url: url, timeout: 8000 }, function (error, response, body) {
        if (error) {
            dfd.resolve(parseStockData(null));
        }
        if (!error && response.statusCode == 200) {
            dfd.resolve(parseStockData(body));
        }
    });

    return dfd.promise();
}

function parseStockData(dataStr) {
    if(!dataStr) { return null; }

    var splits = dataStr.split(',');
    var dataObj = {
        lastTradeTime: splits[0].replace(/"/g, ''),
        name: splits[1].replace(/"/g, ''),
        lastTradePrice: splits[2],
        changeInPercent: splits[3].replace(/"/g, ''),
        change: splits[4],
        symbol: splits[5].replace(/"/g, '')
    };

    return dataObj
}

/* Start the server */
var port = process.env.PORT || 8006;
app.listen(port, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});