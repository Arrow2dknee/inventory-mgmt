import { Controller, Get, Query } from '@nestjs/common';

import { InventoryService } from './inventory.service';
import { SkuDto } from './dto';
import { StockCount } from './interfaces/StockCount.interface';

@Controller('inventory')
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  @Get()
  async getUpdatedInventoryForSKU(
    @Query() { sku }: SkuDto,
  ): Promise<StockCount> {
    return this.inventoryService.stockCount(sku);
  }
}
