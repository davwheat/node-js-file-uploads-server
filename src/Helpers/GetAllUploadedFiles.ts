import fs from 'fs-extra'
import path from 'path'
import Config from '../Config'
import GetPathToUploadsFolder from '../Helpers/GetPathToUploadsFolder'

const uploadsFolder = GetPathToUploadsFolder()

export async function GetAllUploadedFiles(withExtensions: boolean = true): Promise<string[]> {
  const allFilesAndFolders = await fs.readdir(uploadsFolder)
  const allFiles = []

  for (const file of allFilesAndFolders) {
    const stat = await fs.stat(path.resolve(uploadsFolder, file))

    if (stat.isFile()) {
      if (withExtensions) {
        allFiles.push(file)
      } else {
        let dot = file.lastIndexOf('.')
        allFiles.push(file.substring(0, dot === -1 ? file.length : dot))
      }
    }
  }

  return allFiles
}
