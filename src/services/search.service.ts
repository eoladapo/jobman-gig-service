import { elasticSearchClient } from '@gig/elasticsearch';
import { SearchResponse } from '@elastic/elasticsearch/lib/api/types';
import { IHitsTotal, ISearchResult } from '@eoladapo/jobman-shared';

export async function gigsSearchBySellerId(searchQuery: string, active: boolean): Promise<ISearchResult> {
  const queryList: any[] = [
    {
      query_string: {
        fields: ['sellerId'],
        query: `*${searchQuery}*`
      }
    },
    {
      term: {
        active
      }
    }
  ];

  const result: SearchResponse = await elasticSearchClient.search({
    index: 'gigs',
    query: {
      bool: {
        must: [...queryList]
      }
    }
  });
  const total: IHitsTotal = result.hits.total as IHitsTotal;
  return {
    total: total.value,
    hits: result.hits.hits
  };
}
