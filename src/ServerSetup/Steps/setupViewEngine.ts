import dayjs from 'dayjs'
import type { Express } from 'express'

import * as ExpressHandlebars from 'express-handlebars'
import path from 'path'
import Logger from '../../Logger'
import Config from '../../Config'

/**
 * Initialises the Handlebars view engine on the provided `app`.
 */
export function SetupViewEngine(app: Express) {
  Logger.debug('Creating view engine...')
  const Handlebars = ExpressHandlebars.create({
    layoutsDir: path.join(__dirname, '../../views/layouts'),
    defaultLayout: 'main',
    helpers: getHandlebarsHelpers(),
  })

  // Register `hbs.engine` with the Express app.
  Logger.debug('Registering view engine...')
  app.engine('handlebars', Handlebars.engine)
  app.set('view engine', 'handlebars')
}

function getHandlebarsHelpers() {
  return {
    section: function (this: any, name: string, options: any) {
      if (!this._sections) this._sections = {}
      this._sections[name] = options.fn(this)
      return null
    },
    dateNow: (formatString: string = 'LLL'): string => {
      return dayjs().format(formatString)
    },
    getString: (stringName: keyof typeof Config.strings): string => {
      return Config.strings[stringName] || `[[${stringName}]]`
    },
    getConfigEntry(key: string): unknown {
      const keys = key.split('.')

      const value = keys.reduce((acc, curr) => (acc = acc[curr]), Config as any)

      return value
    },
  }
}
