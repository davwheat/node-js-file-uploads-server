import * as Express from 'express'
import path from 'path'
import { IsValidToken } from '../Auth'

export default async function AssertTokenAuthenticated(req: Express.Request, res: Express.Response, next: Express.NextFunction) {
  const token = req.get('Authorization')

  if (!token) {
    return res.status(401).render(path.resolve(__dirname, '../views/errors/authenticationRequired'))
  }

  if (!(await IsValidToken(token))) {
    return res.status(401).render(path.resolve(__dirname, '../views/errors/invalidToken'))
  }

  next()
}
