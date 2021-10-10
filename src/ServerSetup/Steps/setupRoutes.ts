import * as express from 'express'
import mime from 'mime-types'

import Logger from '../../Logger'
import * as Handlers from '../../Handlers'
import multer from 'multer'

import { GenerateRandomFileName } from '../../Helpers/GenerateRandomFileName'
import GetPathToUploadsFolder from '../../Helpers/GetPathToUploadsFolder'

import AssertTokenAuthenticated from '../../Middleware/AssertTokenAuthenticated'
import AssertPasswordAuthenticated from '../../Middleware/AssertPasswordAuthenticated'

export function SetupExpressRoutes(app: express.Express) {
  Logger.debug('Registering handlers...')

  const multerStorage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, GetPathToUploadsFolder())
    },
    filename: function (req, file, cb) {
      const ext = mime.extension(file.mimetype)
      GenerateRandomFileName().then(filename => cb(null, `${filename}.${ext}`))
    },
  })
  const uploader = multer({ storage: multerStorage })

  app.get('/', Handlers.GET.IndexPageGetter)
  app.get('/actions/generate-token', Handlers.GET.GenerateTokenPage)

  // Handle requests for files
  app.get('/:file', Handlers.GET.FileGetter)

  app.post('/actions/upload', AssertTokenAuthenticated, uploader.single('file'), Handlers.POST.FileUploader)
  app.post('/actions/generate-token', AssertPasswordAuthenticated, express.json(), Handlers.POST.GenerateToken)
}
