import ExpressAdapter from './infra/api/ExpressAdapter';
import Router from './infra/api/Router';
import PostgresSQLAdapter from './infra/database/PostgreSQLAdapter';
import TransactionRepositoryFactory from './infra/repository/TransactionRepositoryFactory';

console.log();

const connection = new PostgresSQLAdapter();
const repositoryFactory = new TransactionRepositoryFactory(connection)
const transactionRepository = repositoryFactory.create()

const httpServer = new ExpressAdapter();
const router = new Router(httpServer, transactionRepository);
router.init();
httpServer.listen(3000)