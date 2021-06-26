import * as Express from 'express'

import path from 'path'

import Logger from '../../Logger'

export function SetupStaticFileServing(app: Express.Express) {
  Logger.debug('Setting up static file serving...')

  app.use('/assets', Express.static(path.join(__dirname, '../../assets')))
}
