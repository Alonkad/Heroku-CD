import express, { NextFunction, Request, Response } from 'express'
import morgan from 'morgan'
import path from 'path'
import proxy from './proxy'

const app = express()

// CORS middleware
const allowCrossDomain = async (req:Request, res:Response, next: NextFunction) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET')
  res.header('Access-Control-Allow-Headers', 'Content-Type')

  next()
}

app.use(morgan('dev'))

app.use(express.static(path.join(process.cwd(), 'src', 'client'), {
  dotfiles: 'ignore',
  etag: false,
  index: ['index.html'],
  redirect: false
}))

app.use(allowCrossDomain)

app.get('/api', (req:Request, res:Response) => {
  res.json({
    version: 3,
    success: true
  })
})

proxy(app)

/* Start the server */
const port = process.env.PORT || 8006
app.listen(port, () => {
  console.log('Express server listening on port %d in %s mode', port, app.settings.env)
})
