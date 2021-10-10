import * as Express from 'express'
import Config from '../../Config'

import * as fs from 'fs-extra'
import * as path from 'path'

import type * as multer from 'multer'

import GetPathToUploadsFolder from '../../Helpers/GetPathToUploadsFolder'

/**
 * Absolute path to the uploads folder.
 */
const uploadsFolder = GetPathToUploadsFolder()

export default async function FileUploader(req: Express.Request, res: Express.Response) {
  if (!req.file) {
    res.status(400)
    res.render(path.resolve(__dirname, '../../views/errors/noFileProvidedForUpload'))
    return
  }

  const availableAtUrl = `${Config.baseUrl}/${req?.file?.filename}`

  res.send(availableAtUrl)
}
