import { StockLevels } from '../interfaces/stockLevels.interface';
import { UnitTransactions } from '../interfaces/unitTransactions.interface';
import { TransactionType } from '../enums/transactionType.enum';

export const stocks: StockLevels[] = [
  {
    sku: 'TVN783304/18/16',
    stock: 50,
  },
];

export const transactions: UnitTransactions[] = [
  {
    sku: 'TVN783304/18/16',
    type: TransactionType.order,
    qty: 25,
  },
  {
    sku: 'TVN783304/18/16',
    type: TransactionType.order,
    qty: 25,
  },
  {
    sku: 'TVN783304/18/16',
    type: TransactionType.refund,
    qty: 25,
  },
];

export const mockSku = 'TVN783304/18/16';

export const StockCountResponse = {
  sku: 'TVN783304/18/16',
  qty: 100,
};
