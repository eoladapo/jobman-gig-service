import { StatusCodes } from 'http-status-codes';
import { publishDirectMessage } from '@gig/queues/gig.producer';
import { gigChannel } from '@gig/server';
import { Request, Response } from 'express';

const gigSeed = async (req: Request, res: Response): Promise<void> => {
  const { count } = req.params;

  await publishDirectMessage(
    gigChannel,
    'jobman-gig',
    'get-sellers',
    JSON.stringify({
      type: 'getSellers',
      count
    }),
    'Gig seed message sent to user service'
  );
  res.status(StatusCodes.CREATED).json({ message: 'Gig created successfully' });
};

export { gigSeed };
