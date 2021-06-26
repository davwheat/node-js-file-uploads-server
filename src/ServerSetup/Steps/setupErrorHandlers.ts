import type { Express } from 'express'

import Logger from '../../Logger'
import { Error404Handler, InternalErrorHandler } from '../../ErrorHandlers'

export function SetupErrorHandlers(app: Express) {
  Logger.debug('Registering error handling middleware')

  app.use(InternalErrorHandler)
  app.use(Error404Handler)
}
