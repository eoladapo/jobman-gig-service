import { winstonLogger } from '@eoladapo/jobman-shared';
import { config } from '@gig/config';
import { Channel, ConsumeMessage, Replies } from 'amqplib';
import { Logger } from 'winston';
import { createConnection } from '@gig/queues/connection';
import { updateGigReview } from '@gig/services/gig.service';

const log: Logger = winstonLogger(`${config.ELASTIC_SEARCH_URL}`, 'gigServerConsumer', 'debug');

const consumeGigDirectMessage = async (channel: Channel): Promise<void> => {
  try {
    if (!channel) {
      channel = (await createConnection()) as Channel;
    }

    const exchanegeName = 'jobman-update-gig';
    const routingKey = 'update-gig';
    const queueName = 'gig-update-queue';
    await channel.assertExchange(exchanegeName, 'direct');
    const jobmanQueue: Replies.AssertQueue = await channel.assertQueue(queueName, { durable: true, autoDelete: false });
    await channel.bindQueue(jobmanQueue.queue, exchanegeName, routingKey);
    channel.consume(jobmanQueue.queue, async (msg: ConsumeMessage | null) => {
      const { gigReview } = JSON.parse(msg!.content.toString());
      await updateGigReview(JSON.parse(gigReview));
      channel.ack(msg!);
    });
  } catch (error) {
    log.log('error', 'GigService error consumeGigDirectMessage() method:', error);
  }
};

const consumeSeedDirectMessage = async (channel: Channel): Promise<void> => {
  try {
    if (!channel) {
      channel = (await createConnection()) as Channel;
    }

    const exchanegeName = 'jobman-seed-gig';
    const routingKey = 'receive-sellers';
    const queueName = 'seed-gig-queue';
    await channel.assertExchange(exchanegeName, 'direct');
    const jobmanQueue: Replies.AssertQueue = await channel.assertQueue(queueName, { durable: true, autoDelete: false });
    await channel.bindQueue(jobmanQueue.queue, exchanegeName, routingKey);
    channel.consume(jobmanQueue.queue, async (msg: ConsumeMessage | null) => {
      //TODO: use seed data function
      channel.ack(msg!);
    });
  } catch (error) {
    log.log('error', 'GigService error consumeGigDirectMessage() method:', error);
  }
};

export { consumeGigDirectMessage, consumeSeedDirectMessage };
