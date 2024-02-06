import Transaction from '../entity/Transaction';

export default interface TransactionRepository {
  save (action: Transaction): Promise<void>;
  get (code: string): Promise<Transaction>;
}