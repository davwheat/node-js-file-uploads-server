import path from 'path'
import Config from '../Config'

export default function GetPathToUploadsFolder(): string {
  /**
   * Current working directory.
   */
  const fsRoot = process.cwd()

  /**
   * Absolute path to the uploads folder.
   */
  const uploadsFolder = Config.uploads.isPathAbsolute ? path.join(Config.uploads.path) : path.join(fsRoot, Config.uploads.path)

  return uploadsFolder
}
