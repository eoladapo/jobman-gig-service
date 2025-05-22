import { winstonLogger } from '@eoladapo/jobman-shared';
import { Logger } from 'winston';
import { config } from '@gig/config';
import mongoose from 'mongoose';

const log: Logger = winstonLogger(`${config.ELASTIC_SEARCH_URL}`, 'gigDatabase', 'debug');

const databaseConnection = async (): Promise<void> => {
  try {
    await mongoose.connect(`${config.DATABASE_URL}`);
    log.info('Gig Service - Successfully connected to database');
  } catch (error) {
    log.error('error', 'Gig Service databaseConnection() method:', error);
  }
};

export { databaseConnection };
