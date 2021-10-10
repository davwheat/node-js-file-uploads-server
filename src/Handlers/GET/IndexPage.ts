import type * as Express from 'express'
import path from 'path'

export default async function IndexPageGetter(req: Express.Request, res: Express.Response) {
  res.status(200)
  res.render(path.resolve(__dirname, `../../views/pages/root`))
}
