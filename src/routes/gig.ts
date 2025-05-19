import { gigCreate } from '@gig/controllers/create';
import { gigDelete } from '@gig/controllers/delete';
import { gigById, gigsByCategory, moreLikeThis, sellerInactiveGigs, sellersGigs, topRatedGigsByCategory } from '@gig/controllers/get';
import { gig } from '@gig/controllers/search';
import { gigUpdate, gigUpdateActive } from '@gig/controllers/update';
import express, { Router } from 'express';

const router: Router = express.Router();

const gigRoutes = (): Router => {
  router.get('/:gigId', gigById);
  router.get('/seller/:sellerId', sellersGigs);
  router.get('/seller/inactive/:sellerId', sellerInactiveGigs);
  router.get('/search/:from/:size/:type', gig);
  router.get('/category/:username', gigsByCategory);
  router.get('/top/:username', topRatedGigsByCategory);
  router.get('/similar/:gigId', moreLikeThis);
  router.post('/create', gigCreate);
  router.put('/:gigId', gigUpdate);
  router.put('/active/:gigId', gigUpdateActive);
  router.delete('/:gigId/:sellerId', gigDelete);

  return router;
};

export { gigRoutes };
