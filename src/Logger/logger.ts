import chalk from 'chalk'
import dayjs from 'dayjs'

export enum MessageSeverity {
  CRITICAL = -1,
  ERROR = 0,
  WARNING = 1,
  INFO = 2,
  DEBUG = 3,
}

export default class Logger {
  static critical(message: string) {
    this.message(this.getPrefix(MessageSeverity.CRITICAL), message)
  }
  static error(message: string) {
    this.message(this.getPrefix(MessageSeverity.ERROR), message)
  }
  static warning(message: string) {
    this.message(this.getPrefix(MessageSeverity.WARNING), message)
  }
  static info(message: string) {
    this.message(this.getPrefix(MessageSeverity.INFO), message)
  }
  static debug(message: string) {
    this.message(this.getPrefix(MessageSeverity.DEBUG), message)
  }

  private static getPrefix(severity: MessageSeverity): string {
    switch (severity) {
      case MessageSeverity.CRITICAL:
        return `${chalk.bgRedBright.whiteBright()}ERROR${chalk.reset()}`

      case MessageSeverity.ERROR:
        return `${chalk.bgRed.whiteBright()}ERROR${chalk.reset()}`

      case MessageSeverity.WARNING:
        return `${chalk.bgYellow.whiteBright()}WARN ${chalk.reset()}`

      case MessageSeverity.INFO:
        return `${chalk.bgBlue.whiteBright()}INFO ${chalk.reset()}`

      case MessageSeverity.DEBUG:
        return `${chalk.bgGray.blackBright()}DEBUG${chalk.reset()}`
    }
  }

  private static message(prefix: string, msg: string) {
    console.log(`${prefix} | ${dayjs().format('YYYY-MM-DD HH:mm:ss.SSS')} | ${msg}`)
  }
}
