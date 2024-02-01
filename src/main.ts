import express, { Request, Response } from 'express';
import pgp from 'pg-promise';
const app = express();
app.use(express.json());
app.post('/transactions', async (req: Request, res: Response) => {
  const connection = pgp()('postgres://postgres:12345@postgres:5432/app');
  await connection.query("insert into transaction (code, amount, number_installments, payment_method) values ($1, $2, $3, $4)", [req.body.code, req.body.amount, req.body.numberInstallments, req.body.paymentMethod]);
  await connection.$pool.end();
  res.end();
})

app.get('/transactions/:code', async (req: Request, res: Response) => { 
  const connection = pgp()('postgres://postgres:12345@postgres:5432/app');
  const transaction = await connection.one('select * from transaction where code = $1', [req.params.code]);
  await connection.$pool.end();
  transaction.amount  = parseFloat(transaction.amount);
  transaction.paymentMethod = transaction.payment_method;
  res.json(transaction);
});

app.listen(3000);