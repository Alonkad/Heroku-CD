var express = require('express');

var app = express();

//CORS middleware
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    next();
};
app.use(allowCrossDomain);

app.get('*', function(req, res) {
    res.json({
        version: 1,
        success: true,
        request: {
            header: req.headers,
            query: req.query,
            url: req.url,
            ip: req.ip
        }
    });
});

/* Start the server */
var port = process.env.PORT || 8006;
app.listen(port, function() {
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});