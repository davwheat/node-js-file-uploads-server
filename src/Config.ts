import { jsonc } from 'jsonc'
import Logger from './Logger'

import * as fs from 'fs-extra'
import * as path from 'path'

interface IConfigFile {
  /**
   * Port that Express should listen on.
   *
   * Default: 8000
   */
  port: number

  /**
   * The upload server's base URL. Should include the http(s), and NO trailing slash.
   *
   * Default: "http://localhost:8000"
   */
  baseUrl: string

  auth: {
    /**
     * Master password. Needed to create new auth tokens via the web.
     *
     * Empty string means password access is disabled.
     *
     * Default: ""
     */
    password: string
  }

  uploads: {
    /**
     * Path to the folder containing all uploads.
     * Default: ./uploads
     */
    path: string

    /**
     * Whether the `path` is absolute or relative. If relative, the upload path is relative to the node process' current working directory.
     *
     * This should usually be this folder (repository root folder).
     *
     * Default: false (relative)
     */
    isPathAbsolute: boolean

    /**
     * Length of randomised file names.
     */
    fileNameLength: number
  }

  /**
   * Determines what files can be accessed. `true` if they are accessible, and `false` to return a 404.
   */
  fileRetrieval: {
    /**
     * Allows access to files starting with a dot (.).
     *
     * Default: false (no access)
     */
    dotfiles: boolean
  }

  strings: {
    /**
     * Name shown in the copyright footer.
     */
    copyrightName: string
  }
}

// Read config file
const configFile = fs.readFileSync(path.join(__dirname, '../env.jsonc'))

let Config: IConfigFile

try {
  Config = jsonc.parse(configFile.toString()) as IConfigFile
} catch {
  Logger.critical('Failed to parse config JSON file.')
  process.exit(-1)
}

export default Config
