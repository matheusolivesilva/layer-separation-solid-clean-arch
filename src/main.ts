import express, { Request, Response } from 'express';
import CreateTransacion from './application/CreateTransaction';
import GetTransaction from './application/GetTransaction';
import TransactionDatabaseRepository from './infra/repository/TransactionDatabaseRepository';
const app = express();
app.use(express.json());

const transactionRepository = new TransactionDatabaseRepository();

app.post('/transactions', async (req: Request, res: Response) => {
  const createTransaction = new CreateTransacion(transactionRepository);
  await createTransaction.execute(req.body);
  res.end();
})

app.get('/transactions/:code', async (req: Request, res: Response) => { 
  const getTransaction = new GetTransaction();
  const transaction = await getTransaction.execute(req.params.code);
  res.json(transaction);
});

app.listen(3000);