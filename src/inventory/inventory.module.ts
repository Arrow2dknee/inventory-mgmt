import { Module } from '@nestjs/common';

import { InventoryService } from './inventory.service';
import { InventoryController } from './inventoy.controller';

@Module({
  imports: [],
  controllers: [InventoryController],
  providers: [InventoryService],
  exports: [InventoryService],
})
export class InventoryModule {}
