import { createProxyMiddleware, Options } from 'http-proxy-middleware'
import { Express } from 'express'

const WIX_BASE_PROTOCOL = 'https://'
const WIX_BASE_DOMAIN = 'alonk8.editorx.io'
const WIX_SITE_PATH = '/fiverr-page'
const PROXY_COMMON_CONFIG = {
  changeOrigin: true,
  logLevel: 'debug',
  headers: {
    Host: WIX_BASE_DOMAIN
  }
}

export default function (app: Express): void {
  app.use('/wix', createProxyMiddleware({
    target: `${WIX_BASE_PROTOCOL}${WIX_BASE_DOMAIN}${WIX_SITE_PATH}`,
    pathRewrite: {
      '^/wix': ''
    },
    ...PROXY_COMMON_CONFIG
  } as Options))

  app.use('/_partials/*', createProxyMiddleware({
    target: `${WIX_BASE_PROTOCOL}${WIX_BASE_DOMAIN}`,
    ...PROXY_COMMON_CONFIG
  } as Options))
}
