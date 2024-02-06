import Transaction from '../../domain/entity/Transaction';
import TransactionRepository from '../../domain/repository/TransactionRepository';
import pgp from 'pg-promise'

export default class TransactionDatabaseRepository implements TransactionRepository {
  async save(transaction: Transaction): Promise<void> {
    const connection = pgp()('postgres://postgres:12345@postgres:5432/app');
    await connection.query(
      "insert into transaction (code, amount, number_installments, payment_method) values ($1, $2, $3, $4)", 
      [
        transaction.code, 
        transaction.amount, 
        transaction.numberInstallments, 
        transaction.paymentMethod
      ]
    );

    for (const installment of transaction.installments) {
      await connection.query(
        'insert into installment (code, number, amount) values ($1, $2, $3)', 
        [
          transaction.code, 
          installment.number, 
          installment.amount
        ]
      );
    }

    await connection.$pool.end();
  }
  get(code: string): Promise<Transaction> {
    throw new Error('Method not implemented.');
  }

}