import { verifyGatewayRequest } from '@eoladapo/jobman-shared';
import { Application } from 'express';
import { gigRoutes } from '@gig/routes/gig';
import { healthRoutes } from '@gig/routes/health';

const BASE_PATH = '/api/v1/gig';

const appRoutes = (app: Application): void => {
  app.use('', healthRoutes());
  app.use(BASE_PATH, verifyGatewayRequest, gigRoutes());
  app.use(BASE_PATH, verifyGatewayRequest);
};

export { appRoutes };
