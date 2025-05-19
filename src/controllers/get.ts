import { StatusCodes } from 'http-status-codes';
import { ISellerGig } from '@eoladapo/jobman-shared';
import { getGigById, getSellerGigs, getSellerInActiveGigs } from '@gig/services/gig.service';
import { Request, Response } from 'express';

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

export { gigById, sellersGigs, sellerInactiveGigs };
