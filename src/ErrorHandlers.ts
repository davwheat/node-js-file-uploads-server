import * as Express from 'express'
import * as path from 'path'

export function InternalErrorHandler(err: Express.Errback, req: Express.Request, res: Express.Response, next: Express.NextFunction) {
  console.error(err)
  res.status(500).render(path.join(__dirname, './views/errors/internalServerError.handlebars'))
}

export function Error404Handler(req: Express.Request, res: Express.Response, next: Express.NextFunction) {
  res.status(404).render(path.join(__dirname, './views/errors/noHandler.handlebars'))
}
