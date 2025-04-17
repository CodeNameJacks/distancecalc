// morganMiddleware.ts
import morgan from 'morgan';
import winston from 'winston';

// Set up Winston logger
const logger = winston.createLogger({
  level: 'info',  // Set the log level
  transports: [
    new winston.transports.Console({ format: winston.format.simple() }), // Console transport
    new winston.transports.File({ filename: 'logs/combined.log', format: winston.format.json() }), // File transport
  ],
});

// Set up Morgan to use Winston as the log stream
const morganMiddleware = morgan('combined', {
  stream: {
    write: (message: string) => logger.info(message.trim()),
  },
});

export default morganMiddleware;
