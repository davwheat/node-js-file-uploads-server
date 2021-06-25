import * as Express from 'express'
import * as ExpressHandlebars from 'express-handlebars'
import * as path from 'path'
import compression from 'compression'
import dayjs from 'dayjs'
import helmet from 'helmet'

import Logger from './Logger'
import * as Handlers from './Handlers'
import Config from './Config'
import { Error404Handler, InternalErrorHandler } from './ErrorHandlers'

Logger.info('Starting server...')

const app = Express.default()

app.use(compression())
app.use(helmet())

Logger.debug('Setting up static file serving...')
app.use('/assets', Express.static(path.join(__dirname, 'assets')))

Logger.debug('Creating view engine...')
const Handlebars = ExpressHandlebars.create({
  layoutsDir: path.join(__dirname, './views/layouts'),
  defaultLayout: 'main',
  helpers: {
    dateNow: (formatString: string = 'LLL'): string => {
      return dayjs().format(formatString)
    },
    getString: (stringName: keyof typeof Config.strings): string => {
      return Config.strings[stringName] || `[[${stringName}]]`
    },
  },
})

// Register `hbs.engine` with the Express app.
Logger.debug('Registering view engine...')
app.engine('handlebars', Handlebars.engine)
app.set('view engine', 'handlebars')

app.listen(Config.port, () => {
  Logger.info(`Server is running at https://localhost:${Config.port}`)
})

Logger.debug('Registering handlers...')

// Handle requests for files
app.get('/:file', Handlers.GET.FileGetter)

Logger.debug('Registering error handling middleware')

app.use(InternalErrorHandler)
app.use(Error404Handler)
