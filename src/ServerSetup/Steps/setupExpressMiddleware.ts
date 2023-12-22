import { Express, json, urlencoded } from 'express'

import compression from 'compression'
import helmet from 'helmet'

import Logger from '../../Logger'

export function SetupExpressMiddleware(app: Express) {
  Logger.debug('Registering basic middleware')

  app.use(compression())
  app.use(
    helmet({
      contentSecurityPolicy: false,
      crossOriginResourcePolicy: {
        policy: 'cross-origin',
      },
    }),
  )

  app.use(json()) // for parsing application/json
  app.use(urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

  // app.use(serverTiming())
}
