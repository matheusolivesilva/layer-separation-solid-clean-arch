import pgp from 'pg-promise';

export default class GetTransaction {
  constructor() {}

  async execute(code : string): Promise<Output> {

    const connection = pgp()('postgres://postgres:12345@postgres:5432/app');
    const transaction = await connection.one('select * from transaction where code = $1', [code]);
    transaction.amount  = parseFloat(transaction.amount);
    transaction.paymentMethod = transaction.payment_method;
    const installments = await connection.query('select * from installment where code = $1', [code])
    for ( const installment of installments) {
      installment.amount = parseFloat(installment.amount);
    }
    await connection.$pool.end();
    transaction.installments = installments;
    return transaction;
  }
}

type Output = {
  code: string,
  amount: number,
  numberInstallments: number,
  paymentMethod: string,
  installments: { number: number, amount: number }[]
}