import * as Express from 'express'
import Config from '../../Config'

import * as fs from 'fs-extra'
import * as path from 'path'
import GetPathToUploadsFolder from '../../Helpers/GetPathToUploadsFolder'

/**
 * Absolute path to the uploads folder.
 */
const uploadsFolder = GetPathToUploadsFolder()

export default async function FileGetter(req: Express.Request<{ file: string }>, res: Express.Response) {
  let filePath

  try {
    filePath = getPathToRequestedFile(req.params.file)
  } catch (error) {
    if (error === 404 || error === 403) {
      res.status(404)
      res.render(path.join(__dirname, '../../views/errors/failedToSendFile'), { fileName: req.params.file })
    } else {
      res.status(500)
      res.render(path.join(__dirname, '../../views/errors/500'), { fileName: req.params.file })
    }

    return
  }

  try {
    res.sendFile(filePath, {
      dotfiles: Config.fileRetrieval.dotfiles ? 'allow' : false,
    })
  } catch (e) {
    res.render(path.join(__dirname, '../../views/errors/failedToSendFile'), { fileName: req.params.file })
  }
}

/**
 * Converts the path to the file in the URL into an absolute path to the file on disk.
 *
 * Throws an error if the path is outside the permitted uploads folder.
 */
function getPathToRequestedFile(file: string): string {
  const filePath = path.join(uploadsFolder, file)

  if (!fs.existsSync(filePath)) throw 404
  if (!filePath.includes(uploadsFolder)) throw 403

  return filePath
}
