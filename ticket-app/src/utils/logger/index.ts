import chalk from 'chalk';

enum LogType {
  INFO = 'INFO',
  WARNING = 'WARNING',
  ERROR = 'ERROR'
}

class Logger {
  private static getTime(): string {
    const currentTime = new Date().toLocaleString();
    return `${currentTime}`;
  }

  private static logMessage(type: LogType, message: string): void {
    let formattedMessage: string;

    switch (type) {
      case LogType.INFO:
        formattedMessage = `${Logger.getTime()} [${type}] ${message}`;
        break;
      case LogType.WARNING:
        formattedMessage = chalk.yellow(`${Logger.getTime()} [${type}] ${message}`);
        break;
      case LogType.ERROR:
        formattedMessage = chalk.red(`${Logger.getTime()} [${type}] ${message}`);
        break;
      default:
        formattedMessage = `${Logger.getTime()} [${type}] ${message}`;
        break;
    }

    console.log(formattedMessage);
  }

  static info(...args: any[]): void {
    Logger.logMessage(LogType.INFO, args.join(' '));
  }

  static warning(...args: any[]): void {
    Logger.logMessage(LogType.WARNING, args.join(' '));
  }

  static error(...args: any[]): void {
    Logger.logMessage(LogType.ERROR, args.join(' '));
  }
}

export default Logger;