import PostgresSQLAdapter from '../database/PostgreSQLAdapter';
import CreateTransacion from '../../application/CreateTransaction';
import GetTransaction from '../../application/GetTransaction';
import HttpServer from './HttpServer';
import TransactionRepository from '../../domain/repository/TransactionRepository';

export default class Router {
  constructor(readonly httpServer: HttpServer, readonly transactionRepository: TransactionRepository) {}

  async init() {
    this.httpServer.on('post', '/transactions', async (params: any, body: any) => {
      const createTransaction = new CreateTransacion(this.transactionRepository);
      await createTransaction.execute(body);
    })

    this.httpServer.on('get', '/transactions/:code', async (params: any, body: any) => { 
      const getTransaction = new GetTransaction(this.transactionRepository);
      const transaction = await getTransaction.execute(params.code);
      return transaction;
    });
  }
}