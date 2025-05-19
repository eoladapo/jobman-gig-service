import { StatusCodes } from 'http-status-codes';
import { IPaginateProps, ISearchResult, ISellerGig } from '@eoladapo/jobman-shared';
import { gigsSearch } from '@gig/services/search.service';
import { Request, Response } from 'express';
import { sortBy } from 'lodash';

const gig = async (req: Request, res: Response) => {
  const { from, size, type } = req.params;
  let resultHits: ISellerGig[] = [];
  const paginate: IPaginateProps = {
    from,
    size: parseInt(`${size}`),
    type
  };
  const gigs: ISearchResult = await gigsSearch(
    `${req.query.query}`,
    paginate,
    `${req.query.delivery_time}`,
    parseInt(`${req.query.minPrice}`),
    parseInt(`${req.query.maxPrice}`)
  );

  for (const item of gigs.hits) {
    resultHits.push(item._source as ISellerGig);
  }

  if (type === 'backward') {
    resultHits = sortBy(resultHits, ['sortId']);
  }

  res.status(StatusCodes.OK).json({
    message: 'Search gigs results',
    total: gigs.total,
    gigs: resultHits
  });
};

export { gig };
