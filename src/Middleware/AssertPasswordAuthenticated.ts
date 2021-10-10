import * as Express from 'express'
import path from 'path'
import { VerifyMasterPassword } from '../Auth'

export default async function AssertPasswordAuthenticated(req: Express.Request, res: Express.Response, next: Express.NextFunction) {
  const auth = req.get('Authorization')

  if (!auth || !auth.startsWith('Password ')) {
    res.status(401)
    res.render(path.resolve(__dirname, '../views/errors/passwordAuthenticationRequired'))
    return
  }

  try {
    if (!VerifyMasterPassword(auth.substring('Password '.length))) {
      res.status(401)
      res.render(path.resolve(__dirname, '../views/errors/invalidPassword'))
      return
    }
  } catch {
    res.status(503)
    res.render(path.resolve(__dirname, '../views/errors/passwordAuthenticationDisabled'))
    return
  }

  next()
}
