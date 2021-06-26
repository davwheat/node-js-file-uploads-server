import Config from '../Config'

/**
 * Verifies whether the provided password matches the root password set in the configuration file.
 */
export function VerifyMasterPassword(password: string): boolean {
  if (!Config.auth.password || Config.auth.password.trim() === '') {
    throw 'No root pssword set.'
  }

  if (password === Config.auth.password) return true

  return false
}
