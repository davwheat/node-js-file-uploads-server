import { GetAuthFile } from './GetAuthFile'

export async function GetTokens(): Promise<string[]> {
  const auth = await GetAuthFile()

  return auth.tokens.reduce((acc, curr) => [...acc, curr.token], [] as string[])
}
