import { TransactionType } from '../enums/transactionType.enum';

export interface UnitTransactions {
  sku: string;
  type: TransactionType;
  qty: number;
}
