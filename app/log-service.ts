const fs = require('fs');
const logFile = fs.createWriteStream('./logFile.log', { flags: 'a' });

interface Log {
  type: string;
  path?: string;
  jsonData?: { q: string; googleResults: number };
  rawString?: string;
}

class LogService {
  constructor() {}
  public writeLog(log: Log, headers: any) {
    this.logTime();
    this.logHeaders(headers);
    switch (log.type) {
      case 'new connection':
        this.logNewConnection();
      case 'text':
        this.logText(log.rawString || '');
        break;
      case 'json':
        this.logJson(log.jsonData);
        break;
      case 'binary':
        this.logBinary(log.path || '');
        break;
      default:
        this.logError();
        throw new Error('Unknown type');
    }
  }
  private logHeaders(headers: any) {
    const ua = headers['user-agent'] || '';
    const ip = headers['x-forwarded-for'] || '';
    fs.appendFile('./logFile.log', [ua, ip, ' '], (err: any) => {
      if (err) throw err;
    });
  }
  private logText(rawString: string) {
    fs.appendFile('./logFile.log', ['New RAW', rawString, '\n'], (err: any) => {
      if (err) throw err;
    });
  }
  private logJson(jsonData: any) {
    fs.appendFile(
      './logFile.log',
      ['New JSON', jsonData.q, jsonData.googleResults, '\n'],
      (err: any) => {
        if (err) throw err;
      }
    );
  }
  private logBinary(path: string) {
    fs.appendFile('./logFile.log', ['New Image', path, '\n'], (err: any) => {
      if (err) throw err;
    });
  }
  private logError() {
    fs.appendFile('./logFile.log', 'Error\n', (err: any) => {
      if (err) throw err;
    });
  }
  private logTime() {
    const now = new Date().toString();
    fs.appendFile('./logFile.log', [now, ' '], (err: any) => {
      if (err) throw err;
    });
  }
  private logNewConnection() {
    fs.appendFile('./logFile.log', 'New connection\n', (err: any) => {
      if (err) throw err;
    });
  }
}
export { LogService };
