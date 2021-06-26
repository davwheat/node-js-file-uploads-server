import type { Express } from 'express'

import * as SetupSteps from './Steps'
export { SetupSteps }

/**
 * Runs all setup steps.
 */
export function RunAllSetupSteps(app: Express) {
  Object.values(SetupSteps).forEach(step => step(app))
}

/**
 * Runs only the most important setup steps.
 *
 * This is:
 * - Handlebars view engine
 * - Static file serving (CSS, fonts, etc)
 */
export function RunCriticalSetupSteps(app: Express) {
  SetupSteps.SetupViewEngine(app)
  SetupSteps.SetupStaticFileServing(app)
}
