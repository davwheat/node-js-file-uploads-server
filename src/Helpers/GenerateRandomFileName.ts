import Config from '../Config'
import crypto from 'crypto'
import { GetAllUploadedFiles } from './GetAllUploadedFiles'

const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghiklmnopqrstuvwxyz'

export async function GenerateRandomFileName() {
  const fileNameLength = Config.uploads.fileNameLength || 8

  const allFiles = await GetAllUploadedFiles(false)

  let fileName = ''

  do {
    fileName = [...Array(fileNameLength)].map(() => charset.charAt(crypto.randomInt(charset.length))).join('')
  } while (allFiles.includes(fileName))

  return fileName
}
