import * as Express from 'express'
import path from 'path'

import Logger from './Logger'
import Config from './Config'
import { RunAllSetupSteps, RunCriticalSetupSteps } from './ServerSetup'

import { VerifyServerSetup } from './ServerSetup/SetupVerification/VerifyServerSetup'

async function main() {
  Logger.info('Starting server...')
  const app = Express.default()

  Logger.info('Verifying server environment...')
  const [ServerOK, verificationErrors] = await VerifyServerSetup()

  if (ServerOK) {
    Logger.info('Server verification completed successfully.')
    Logger.info('Initialising uploads server...')

    RunAllSetupSteps(app)
  } else {
    Logger.error('Server verifiation failed.')

    RunCriticalSetupSteps(app)

    app.all('*', (req, res) => {
      res.status(503)
      res.render(path.join(__dirname, './views/errors/serverSetupVerificationFailure'), { errorMessages: verificationErrors })
    })

    Logger.info(`Visit https://localhost:${Config.port} for more info`)
  }

  app.listen(Config.port, () => {
    Logger.info(`Server is running at https://localhost:${Config.port}`)
  })
}

main()
