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
    filePath = await getPathToRequestedFile(req.params.file)
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
async function getPathToRequestedFile(file: string): Promise<string> {
  const filePath = path.join(uploadsFolder, file)

  if (!filePath.includes(uploadsFolder)) throw 403

  return await new Promise((resolve, reject) => {
    fs.access(filePath, function (error) {
      if (error) {
        reject(404)
      } else {
        resolve(filePath)
      }
    })
  })
}
