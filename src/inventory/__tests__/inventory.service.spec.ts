import { Test, TestingModule } from '@nestjs/testing';

import { InventoryService } from '../inventory.service';
import { mockSku, StockCountResponse, stocks, transactions } from './mockData';
import { StockService } from '../stock.service';

describe('InventoryService', () => {
  let service: InventoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [],
      providers: [
        {
          provide: InventoryService,
          useValue: {
            stockCount: jest.fn().mockResolvedValue(StockCountResponse),
          },
        },
        {
          provide: StockService,
          useValue: {
            readStockFile: jest.fn().mockResolvedValue(stocks),
            readTransactionsFile: jest.fn().mockResolvedValue(transactions),
            validateSku: jest.fn().mockResolvedValue(true),
            getLatestStockCount: jest
              .fn()
              .mockResolvedValue(StockCountResponse),
          },
        },
      ],
    }).compile();

    service = module.get<InventoryService>(InventoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return stock count for given sku', async () => {
    await expect(service.stockCount(mockSku)).resolves.toEqual({
      sku: mockSku,
      qty: 100,
    });
  });
});
