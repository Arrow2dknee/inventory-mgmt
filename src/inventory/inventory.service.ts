import { Injectable } from '@nestjs/common';

import { StockCount } from './interfaces/StockCount.interface';
import { StockService } from './stock.service';

@Injectable()
export class InventoryService {
  constructor(private readonly stockService: StockService) {}

  public async stockCount(sku: string): Promise<StockCount> {
    await this.stockService.readStockFile();
    await this.stockService.readTransactionsFile();
    this.stockService.validateSku(sku);

    return this.stockService.getLatestStockCount(sku);
  }
}
