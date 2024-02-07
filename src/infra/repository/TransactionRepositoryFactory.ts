import TransactionRepository from '../../domain/repository/TransactionRepository';
import Connection from '../database/Connection';
import TransactionDatabaseRepository from './TransactionDatabaseRepository';
import TransactionMemoryRepository from './TransactionMemoryRepository';

export default class TransactionRepositoryFactory {
  constructor(readonly connection: Connection) {}

  create(): TransactionRepository {
    return process.env.IS_TESTING === 'true'
        ? new TransactionMemoryRepository() 
        : new TransactionDatabaseRepository(this.connection);
  }
}