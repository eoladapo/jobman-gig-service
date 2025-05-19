import { StatusCodes } from 'http-status-codes';
import { ISearchResult, ISellerGig } from '@eoladapo/jobman-shared';
import { getGigById, getSellerGigs, getSellerInActiveGigs } from '@gig/services/gig.service';
import { Request, Response } from 'express';
import { getUserSelectedGigCategory } from '@gig/redis/gig.cache';
import { getMoreGigsLikeThis, getTopRatedGigsByCategory, gigsSearchByCategory } from '@gig/services/search.service';

const gigById = async (req: Request, res: Response): Promise<void> => {
  const gig: ISellerGig = await getGigById(req.params.gigId);
  res.status(StatusCodes.OK).json({ message: 'Gig fetched successfully', gig });
};

const sellersGigs = async (req: Request, res: Response): Promise<void> => {
  const gigs: ISellerGig[] = await getSellerGigs(req.params.sellerId);
  res.status(StatusCodes.OK).json({ message: 'Seller Gigs fetched successfully', gigs });
};

const sellerInactiveGigs = async (req: Request, res: Response): Promise<void> => {
  const gigs: ISellerGig[] = await getSellerInActiveGigs(req.params.sellerId);
  res.status(StatusCodes.OK).json({ message: 'Seller Inactive Gigs fetched successfully', gigs });
};

const topRatedGigsByCategory = async (req: Request, res: Response): Promise<void> => {
  const category = await getUserSelectedGigCategory(`selectedCategories:${req.params.username}`);
  const resultHits: ISellerGig[] = [];
  const gigs: ISearchResult = await getTopRatedGigsByCategory(`${category}`);
  for (const item of gigs.hits) {
    resultHits.push(item._source as ISellerGig);
  }
  res.status(StatusCodes.OK).json({
    message: 'Top rated gigs fetched successfully',
    total: gigs.total,
    gigs: resultHits
  });
};

const gigsByCategory = async (req: Request, res: Response): Promise<void> => {
  const category = await getUserSelectedGigCategory(`selectedCategories:${req.params.username}`);
  const resultHits: ISellerGig[] = [];
  const gigs: ISearchResult = await gigsSearchByCategory(`${category}`);
  for (const item of gigs.hits) {
    resultHits.push(item._source as ISellerGig);
  }
  res.status(StatusCodes.OK).json({
    message: 'Search gigs category results',
    total: gigs.total,
    gigs: resultHits
  });
};

const moreLikeThis = async (req: Request, res: Response): Promise<void> => {
  const resultHits: ISellerGig[] = [];
  const gigs: ISearchResult = await getMoreGigsLikeThis(req.params.gigId);
  for (const item of gigs.hits) {
    resultHits.push(item._source as ISellerGig);
  }
  res.status(StatusCodes.OK).json({
    message: 'More like this gigs fetched successfully',
    total: gigs.total,
    gigs: resultHits
  });
};

export { gigById, sellersGigs, sellerInactiveGigs, topRatedGigsByCategory, gigsByCategory, moreLikeThis };
