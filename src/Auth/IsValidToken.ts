import { GetTokens } from './GetTokens'

/**
 * Checks if a provided token is valid.
 */
export async function IsValidToken(token: string): Promise<boolean> {
  if (!token) return false

  const tokens = await GetTokens()

  if (tokens.includes(token)) return true

  return false
}
