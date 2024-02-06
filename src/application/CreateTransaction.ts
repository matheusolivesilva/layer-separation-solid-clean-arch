import pgp from 'pg-promise';

export default class CreateTransacion {
  constructor() {}

  async execute(input: Input) : Promise<void> {

    const connection = pgp()('postgres://postgres:12345@postgres:5432/app');
    await connection.query("insert into transaction (code, amount, number_installments, payment_method) values ($1, $2, $3, $4)", [input.code, input.amount, input.numberInstallments, input.paymentMethod]);
    let number = 1;
    let amount = Math.round((input.amount / input.numberInstallments) * 100) / 100;
    let diff = Math.round((input.amount - amount * input.numberInstallments) * 100) / 100;
    
    while ( number <= input.numberInstallments) {
      if (number === input.numberInstallments) {
        amount += diff;
      }
      await connection.query('insert into installment (code, number, amount) values ($1, $2, $3)', [input.code, number, amount]);
      number++;
    }
    await connection.$pool.end();
  }
}

type Input = {
  code: string;
  amount: number;
  numberInstallments: number,
  paymentMethod: string;
}