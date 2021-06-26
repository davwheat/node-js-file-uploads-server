import * as Express from 'express'
import * as path from 'path'

import Config from '../../Config'
import { CreateToken, VerifyMasterPassword } from '../../Auth'

export default async function FileUploader(req: Express.Request, res: Express.Response) {
  const auth = req.get('Authorization')

  if (!auth || !auth.startsWith('Password ')) {
    failInvalidAuth(res, 'passwordAuthenticationRequired')
    return
  }

  try {
    if (!VerifyMasterPassword(auth.substr('Password '.length))) {
      failInvalidAuth(res, 'invalidPassword')
      return
    }
  } catch {
    failInvalidAuth(res, 'passwordAuthenticationDisabled', 503)
    return
  }

  // Master password provided is correct
  // We can now generate and return a new token

  const newToken = await CreateToken(req?.body?.description)

  res.send(newToken)
}

function failInvalidAuth(res: Express.Response, view: string, code: number = 401) {
  res.status(code)
  res.render(path.resolve(__dirname, '../../views/errors', view))
}
