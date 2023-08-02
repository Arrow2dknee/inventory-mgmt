import { Test, TestingModule } from '@nestjs/testing';

import { InventoryController } from '../inventoy.controller';
import { InventoryService } from '../inventory.service';
import { stocks, transactions, StockCountResponse } from './mockData';

describe('InventoryController', () => {
  let controller: InventoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [InventoryController],
      providers: [
        {
          provide: InventoryService,
          useValue: {
            stockCount: jest.fn().mockResolvedValue(StockCountResponse),
          },
        },
      ],
    }).compile();

    controller = module.get<InventoryController>(InventoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('Get updated quantity for SKU', () => {
    it('should return latest stock quantity for given sku', async () => {
      expect(
        controller.getUpdatedInventoryForSKU({ sku: 'TVN783304/18/16' }),
      ).resolves.toEqual(StockCountResponse);
    });
  });
});
