import { UploadsFolderExists } from './Verifiers/UploadsFolderExists'

/**
 * An array of functions to call to verify the server configuration.
 *
 * They should return an error message if something is wrong, otherwise
 * return nothing.
 *
 * Each verifier should be independent and not rely on any previous checks.
 */
const Verifiers: (() => Promise<string | undefined>)[] = [UploadsFolderExists]

export interface VerificationError {
  /**
   * Name of verifier that failed.
   */
  name: string
  /**
   * Verification error message.
   */
  message: string
}

/**
 * Verifies that the server configuration is valid.
 *
 * This includes things like the right folders existing, etc.
 *
 * Returns an array with info about the setup. First item is true/false for
 * the verification, and the second item is an array of error message info.
 *
 * @example
 * VerifyServerSetup()
 * // Verification success
 * result = [true, []]
 *
 * @example
 * VerifyServerSetup()
 * // Verification failure
 * result = [false, [{
 *   name: "ExampleFunction",
 *   message: "Directory 'foo' does not exist."
 * }]]
 */
export async function VerifyServerSetup(): Promise<[boolean, VerificationError[]]> {
  const errorMessages: VerificationError[] = []

  for (const verifier of Verifiers) {
    const response = await verifier()

    if (response) {
      errorMessages.push({
        name: verifier.name,
        message: response,
      })
    }
  }

  const didFailVerification = errorMessages.length === 0

  return [didFailVerification, errorMessages]
}
