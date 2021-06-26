import fs from 'fs-extra'
import path from 'path'
import Logger from '../Logger'

interface AuthFile {
  tokens: {
    token: string
    description: string
  }[]
}

const authJsonPath = path.resolve(__dirname, `../../auth.json`)

export async function GetAuthFile(): Promise<AuthFile> {
  if (!fs.existsSync(authJsonPath)) {
    Logger.warning('`auth.json` does not exist. Creating file...')
    await recreateTokenFile()
  }

  const file = await fs.readJSON(authJsonPath)

  if (!Array.isArray(file.tokens)) {
    Logger.warning('Missing `tokens` array from `auth.json`. Recreating file...')
    await recreateTokenFile()
    return defaultAuthFile
  }

  return file as AuthFile
}

const defaultAuthFile: AuthFile = { tokens: [] }

async function recreateTokenFile() {
  await fs.writeJSON(authJsonPath, defaultAuthFile, { spaces: 2 })
}
