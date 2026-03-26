/* eslint-disable no-console */
import fs from 'fs'
import https from 'https'
import path from 'path'
import { fileURLToPath } from 'url'

import bodyParser from 'body-parser'
import compression from 'compression'
import timeout from 'connect-timeout'
import cors from 'cors'
import express from 'express'
import type { Express, Request, Response } from 'express'
import rateLimit from 'express-rate-limit'
import helmet from 'helmet'
import vhost from 'vhost'

import { config as configEnv } from './config.mts'

const isProd = process.env.NODE_ENV === 'production'

const vHostName = (process.env.HOST as string) || 'localhost'

const __dirname = isProd
  ? path.resolve(process.cwd(), './distServer')
  : fileURLToPath(import.meta.url).split('/').slice(0, -1).join('/')

  console.log('__dirname', __dirname)

const sslkey = fs.readFileSync(path.resolve(__dirname, './cert/localhost.key'))
const sslcert = fs.readFileSync(path.resolve(__dirname, './cert/localhost.crt'))

const options = {
  key: sslkey,
  cert: sslcert,
}

const defaultDirectives = helmet.contentSecurityPolicy.getDefaultDirectives()

// @ts-expect-error -- null disables the directive
defaultDirectives['upgrade-insecure-requests'] = null

// APP
const PORT = process.env.$PORT || process.env.PORT || 8080
const app: Express = express()

const appZero = express.Router()

appZero.get('/', (_req, _res, next) => {
  next()
})

// @ts-expect-error -- vhost typings mismatch with express Router
app.use(vhost(vHostName, appZero))

const APP_BASE_PATH = '/core-vite-2'
const APP_SIMPLE_PATH = '/core-simple'

const basePath = isProd ? '../' : '../../'

function shouldCompress(req: Request, res: Response): boolean {
  if (req.headers['x-no-compression']) {
    return false
  }

  return compression.filter(req, res)
}

app.use(compression({ filter: shouldCompress }))

const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 10000, // limit each IP to 10000 requests per windowMs
})

app.use(limiter)

const scriptSources = [
  "'self'",
  "'unsafe-inline'",
  'localhost:2001',
  'gist.githubusercontent.com',
  'fonts.googleapis.com',
  'apis.google.com',
  'googleapis.com',
  'identitytoolkit.googleapis.com',
  'firebaseapp.com',
  'http://localhost:2001',
]

app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        ...defaultDirectives,
        'default-src': ["'self'"],
        'script-src': scriptSources,
        'script-src-elem': scriptSources,
        'style-src': scriptSources,
        'style-src-elem': scriptSources,
        'frame-src': scriptSources,
        'connect-src': scriptSources,
        'img-src': [...(defaultDirectives['img-src'] as string[]), 'openstreetmap.org', '*'],
      },
    },
  }),
)

app.use(cors())
app.use(timeout(configEnv.TIME_OUT || '10s'))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use((req, res, next) => {
  if (req.secure) {
    next()
  } else {
    res.redirect(`https://${req.headers.host}${req.url}`)
  }
})

// Serve "simple" app from distSimple
app.use(`${APP_SIMPLE_PATH}/assets`, express.static(path.join(__dirname, `${basePath}/distSimple/assets`)))
app.use(`${APP_SIMPLE_PATH}/images`, express.static(path.join(__dirname, `${basePath}/distSimple/images`)))
app.use(`${APP_SIMPLE_PATH}`, express.static(path.join(__dirname, `${basePath}/distSimple`)))
app.use(`${APP_SIMPLE_PATH}/*any`, express.static(path.join(__dirname, `${basePath}/distSimple`)))

// Serve main app from dist
app.use(`${APP_BASE_PATH}/assets`, express.static(path.join(__dirname, `${basePath}/dist/assets`)))
app.use(`${APP_BASE_PATH}/images`, express.static(path.join(__dirname, `${basePath}/dist/images`)))
app.use(`${APP_BASE_PATH}`, express.static(path.join(__dirname, `${basePath}/dist`)))
app.use(`${APP_BASE_PATH}/*any`, express.static(path.join(__dirname, `${basePath}/dist`)))

https.createServer(options, app).listen(PORT, () => {
  console.log(`core-vite-2 express app running at ${PORT}`)
  console.log(`https://${vHostName}:${PORT}${APP_BASE_PATH}`)
  console.log(`https://${vHostName}:${PORT}${APP_SIMPLE_PATH}`)
})

process.on('uncaughtException', (error) => {
  console.log('Uncaught Exception', error)
})

process.on('unhandledRejection', (reason) => {
  console.log('Unhandled Rejection', reason)
})
