import { winstonLogger } from '@eoladapo/jobman-shared';
import { config } from '@gig/config';
import { Logger } from 'winston';
import { client } from '@gig/redis/redis.connection';

const log: Logger = winstonLogger(`${config.ELASTIC_SEARCH_URL}`, 'GigCache', 'debug');

const getUserSelectedGigCategory = async (key: string): Promise<string> => {
  try {
    if (!client.isOpen) {
      await client.connect();
    }
    const response: string = (await client.GET(key)) as string;
    return response;
  } catch (error) {
    log.log('error', 'GigService getUserSelectedGigCategory() method:', error);
    return '';
  }
};

export { getUserSelectedGigCategory };
