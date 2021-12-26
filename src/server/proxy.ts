import { createProxyMiddleware, Options } from 'http-proxy-middleware'
import { Express } from 'express'

const WIX_BASE_PROTOCOL = 'https://'
const WIX_BASE_DOMAIN = 'balancer.wixdns.net'
// const WIX_SITE_PATH = '/fiverr-page'
const PROXY_COMMON_CONFIG = {
  changeOrigin: true,
  logLevel: 'debug',
  headers: {
    Host: 'www.fiverr-on-wix.com'
  }
}

export default function (app: Express): void {
  app.use('/wix', createProxyMiddleware({
    target: `${WIX_BASE_PROTOCOL}${WIX_BASE_DOMAIN}`,
    pathRewrite: {
      '^/wix': ''
    },
    ...PROXY_COMMON_CONFIG
  } as Options))

  app.use('/_partials/*', createProxyMiddleware({
    target: `${WIX_BASE_PROTOCOL}${WIX_BASE_DOMAIN}`,
    ...PROXY_COMMON_CONFIG
  } as Options))

  app.use('/_api/*', createProxyMiddleware({
    target: `${WIX_BASE_PROTOCOL}${WIX_BASE_DOMAIN}`,
    ...PROXY_COMMON_CONFIG
  } as Options))
}
