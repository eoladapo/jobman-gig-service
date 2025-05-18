import { Client } from '@elastic/elasticsearch';
import { config } from '@gig/config';
import { Logger } from 'winston';
import { ISellerGig, winstonLogger } from '@eoladapo/jobman-shared';
import { ClusterHealthResponse, CountResponse, GetResponse } from '@elastic/elasticsearch/lib/api/types';

const log: Logger = winstonLogger(`${config.ELASTIC_SEARCH_URL}`, 'GigElasticSearchServer', 'debug');

const elasticSearchClient = new Client({
  node: `${config.ELASTIC_SEARCH_URL}`
});

const checkConnection = async (): Promise<void> => {
  let isConnected = false;
  while (!isConnected) {
    try {
      const health: ClusterHealthResponse = await elasticSearchClient.cluster.health({});
      log.info(`GigService Elasticsearch health status - ${health.status}`);
      isConnected = true;
    } catch (error) {
      log.info('Connection to ElasticSearch failed. Retrying...');
      log.log('error', 'GigService checkConnection() method:', error);
    }
  }
};

const checkIfIndexExists = async (indexName: string): Promise<boolean> => {
  const result: boolean = await elasticSearchClient.indices.exists({ index: indexName });
  return result;
};

const createIndex = async (indexName: string): Promise<void> => {
  try {
    const result: boolean = await checkIfIndexExists(indexName);
    if (result) {
      log.info(`Index ${indexName} already exists`);
    } else {
      await elasticSearchClient.indices.create({ index: indexName });
      await elasticSearchClient.indices.refresh({ index: indexName });
      log.info(`Index ${indexName} created successfully`);
    }
  } catch (error) {
    log.error(`An error occurred while creating index ${indexName}`);
    log.log('error', 'GigService createIndex() method:', error);
  }
};

const getDocumentCount = async (index: string): Promise<number> => {
  try {
    const result: CountResponse = await elasticSearchClient.count({ index });
    return result.count;
  } catch (error) {
    log.log('error', 'GigService elasticsearch getDocumentCount() method:', error);
    return 0;
  }
};

const getIndexedData = async (index: string, itemId: string): Promise<ISellerGig> => {
  try {
    const result: GetResponse = await elasticSearchClient.get({ index, id: itemId });
    return result._source as ISellerGig;
  } catch (error) {
    log.log('error', 'GigService elasticsearch getIndexData() method:', error);
    return {} as ISellerGig;
  }
};

const addDataToIndex = async (index: string, itemId: string, document: unknown): Promise<void> => {
  try {
    await elasticSearchClient.index({ index, id: itemId, document });
  } catch (error) {
    log.log('error', 'GigService elasticsearch addDataToIndex() method:', error);
  }
};

const updateIndexData = async (index: string, itemId: string, document: unknown): Promise<void> => {
  try {
    await elasticSearchClient.update({ index, id: itemId, doc: document });
  } catch (error) {
    log.log('error', 'GigService elasticsearch updateIndexData() method:', error);
  }
};

const deleteIndexData = async (index: string, itemId: string): Promise<void> => {
  try {
    await elasticSearchClient.delete({ index, id: itemId });
  } catch (error) {
    log.log('error', 'GigService elasticsearch deleteIndexData() method:', error);
  }
};

export {
  elasticSearchClient,
  checkConnection,
  getDocumentCount,
  createIndex,
  getIndexedData,
  addDataToIndex,
  updateIndexData,
  deleteIndexData
};
