import { verifyGatewayRequest } from '@eoladapo/jobman-shared';
import { Application } from 'express';
// import { buyerRoutes } from '@gig/routes/buyer';
// import { healthRoutes } from '@gig/routes/health';
// import { sellerRoutes } from '@gig/routes/seller';

const BASE_PATH = '/api/v1/gig';

const appRoutes = (app: Application): void => {
  // app.use('', healthRoutes());
  app.use(BASE_PATH, verifyGatewayRequest);
  app.use(BASE_PATH, verifyGatewayRequest);
};

export { appRoutes };
