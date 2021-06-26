import crypto from 'crypto'
import dayjs from 'dayjs'
import fs from 'fs-extra'
import path from 'path'
import { GetAuthFile } from './GetAuthFile'

import { GetTokens } from './GetTokens'

const charset = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghiklmnopqrstuvwxyz'
const tokenLength = 64

const authJsonPath = path.resolve(__dirname, `../../auth.json`)

/**
 * Generates a random 64 char authentication token.
 */
export async function CreateToken(description?: string): Promise<string> {
  const tokens = await GetTokens()

  let token = ''

  // Generate a token that isn't already created
  do {
    token = [...Array(tokenLength)].map(() => charset.charAt(crypto.randomInt(charset.length))).join('')
  } while (tokens.includes(token))

  let json = await GetAuthFile()
  json.tokens = [
    ...json.tokens,
    {
      token,
      description: description
        ? `${description} (${dayjs().format('YYYY-MM-DD HH:mm:ss')})`
        : `No description provided. ${dayjs().format('YYYY-MM-DD HH:mm:ss')}`,
    },
  ]

  await fs.writeJSON(authJsonPath, json, { spaces: 2 })

  return token
}
