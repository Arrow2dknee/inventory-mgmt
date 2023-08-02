import { NotFoundException, Logger } from '@nestjs/common';
import { readFile } from 'fs/promises';

import { StockLevels } from './interfaces/stockLevels.interface';
import { UnitTransactions } from './interfaces/unitTransactions.interface';
import { TransactionType } from './enums/transactionType.enum';
import { StockCount } from './interfaces/StockCount.interface';

export class StockService {
  private stockData: StockLevels[] = null;
  private stockTransactions: UnitTransactions[] = null;
  private readonly logger = new Logger(StockService.name);

  public setStockData(stock: StockLevels[]): void {
    this.stockData = stock;
  }

  public setTransactionData(trns: UnitTransactions[]): void {
    this.stockTransactions = trns;
  }

  public async readStockFile(): Promise<StockLevels[]> {
    try {
      const content: string = await readFile(
        `${__dirname}/datastore/stock.json`,
        {
          encoding: 'utf-8',
        },
      );
      this.setStockData(JSON.parse(content));
      return this.stockData;
    } catch (err) {
      this.logger.error('stock.json was not read');
      throw new NotFoundException(
        `stock.json could not be read from path ${__dirname}`,
      );
    }
  }

  public async readTransactionsFile(): Promise<UnitTransactions[]> {
    try {
      const content = await readFile(
        `${__dirname}/datastore/transactions.json`,
        {
          encoding: 'utf-8',
        },
      );
      this.setTransactionData(JSON.parse(content));

      return this.stockTransactions;
    } catch (err) {
      this.logger.error('transactions.json was not read');
      throw new NotFoundException(
        `transactions.json could not be read from path ${__dirname}`,
      );
    }
  }

  public validateSku(sku: string): boolean {
    let record = null;
    record = this.stockData.find((stock: StockLevels) => {
      if (stock.sku === sku) {
        return stock;
      }
    });

    if (!record) {
      record = this.stockTransactions.find((tr: UnitTransactions) => {
        if (tr.sku == sku) {
          return tr;
        }
      });
    }

    if (!record) {
      this.logger.error('SKU not present in stock.json and transactions.json');
      throw new NotFoundException('SKU does not exist');
    }

    return true;
  }

  public getLatestStockCount(sku: string): StockCount {
    const data = this.stockData.find((stock: StockLevels) => {
      if (stock.sku === sku) {
        return stock;
      }
    });

    let presentQty: number = data ? data.stock : 0; // Set original quantity
    const transactions = this.stockTransactions.filter(
      (trs: UnitTransactions) => trs.sku === sku,
    );
    transactions.forEach((skuTr: UnitTransactions) => {
      switch (skuTr.type) {
        case TransactionType.order:
          // For a successful order of unit, reduce quantity of stock
          presentQty -= skuTr.qty;
          break;
        case TransactionType.refund:
          // For a successful refund, increase quantity of stock
          presentQty += skuTr.qty;
          break;
        default:
          this.logger.warn('Unknown transaction type detected', skuTr.type);
          break;
      }
    });

    return {
      sku,
      qty: presentQty,
    };
  }
}
