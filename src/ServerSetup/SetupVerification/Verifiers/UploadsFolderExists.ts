import * as fs from 'fs-extra'
import GetPathToUploadsFolder from '../../../Helpers/GetPathToUploadsFolder'

const uploadsFolder = GetPathToUploadsFolder()

export async function UploadsFolderExists(): Promise<string | undefined> {
  return await new Promise((resolve, reject) => {
    fs.access(uploadsFolder, function (error) {
      if (error) {
        resolve(`File uploads path (${uploadsFolder}) does not exist.`)
      } else {
        resolve(undefined)
      }
    })
  })
}
