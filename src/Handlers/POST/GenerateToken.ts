import * as Express from 'express'

import { CreateToken } from '../../Auth'

export default async function GenerateToken(req: Express.Request, res: Express.Response) {
  // Master password provided is correct
  // We can now generate and return a new token
  const newToken = await CreateToken(req?.body?.description)

  res.send(newToken)
}
