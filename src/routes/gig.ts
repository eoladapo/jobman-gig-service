import { gigCreate } from '@gig/controllers/create';
import { gigDelete } from '@gig/controllers/delete';
import { gigById, sellerInactiveGigs, sellersGigs } from '@gig/controllers/get';
import { gigUpdate, gigUpdateActive } from '@gig/controllers/update';
import express, { Router } from 'express';

const router: Router = express.Router();

const gigRoutes = (): Router => {
  router.get('/:gigId', gigById);
  router.get('/seller/:sellerId', sellersGigs);
  router.get('/seller/inactive/:sellerId', sellerInactiveGigs);
  router.post('/create', gigCreate);
  router.put('/:gigId', gigUpdate);
  router.put('/active/:gigId', gigUpdateActive);
  router.delete('/:gigId/:sellerId', gigDelete);

  return router;
};

export { gigRoutes };
