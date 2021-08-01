import { createLogger } from 'bunyan';

const LoggerInstance = createLogger({
  name: 'octavia',
  streams: [
    {
      level: 'info',
      stream: process.stdout,
    },
    {
      level: 'error',
      stream: process.stderr,
    },
  ],
});

export default LoggerInstance;
