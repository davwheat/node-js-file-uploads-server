import * as fs from 'fs-extra'
import path from 'path'
import Config from '../../../Config'
import GetPathToUploadsFolder from '../../../Helpers/GetPathToUploadsFolder'

const uploadsFolder = GetPathToUploadsFolder()

function resolvePath(...pathSegments: string[]): string {
  return path.resolve(__dirname, ...pathSegments)
}

export async function UploadsFolderExists() {
  const exists = fs.existsSync(uploadsFolder)

  if (!exists) return `File uploads path (${path}) does not exist.`
}
