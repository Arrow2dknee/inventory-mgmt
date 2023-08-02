import { Module } from '@nestjs/common';

import { InventoryService } from './inventory.service';
import { InventoryController } from './inventoy.controller';
import { StockService } from './stock.service';

@Module({
  imports: [],
  controllers: [InventoryController],
  providers: [InventoryService, StockService],
  exports: [InventoryService, StockService],
})
export class InventoryModule {}
