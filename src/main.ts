import express, { Request, Response } from 'express';
import pgp from 'pg-promise';
import CreateTransacion from './application/CreateTransaction';
import GetTransaction from './application/GetTransaction';
const app = express();
app.use(express.json());
app.post('/transactions', async (req: Request, res: Response) => {
  const createTransaction = new CreateTransacion();
  await createTransaction.execute(req.body);
  res.end();
})

app.get('/transactions/:code', async (req: Request, res: Response) => { 
  const getTransaction = new GetTransaction();
  const transaction = await getTransaction.execute(req.params.code);
  res.json(transaction);
});

app.listen(3000);