import { Test, TestingModule } from '@nestjs/testing';

import { StockService } from '../stock.service';
import { stocks, transactions, StockCountResponse, mockSku } from './mockData';

describe('StockService', () => {
  let service: StockService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [],
      providers: [
        {
          provide: StockService,
          useValue: {
            setStockData: jest.fn().mockResolvedValue(null),
            setTransactionData: jest.fn().mockResolvedValue(null),
            readStockFile: jest.fn().mockResolvedValue(stocks),
            readTransactionsFile: jest.fn().mockResolvedValue(transactions),
            validateSku: jest.fn().mockReturnValue(true),
            getLatestStockCount: jest
              .fn()
              .mockResolvedValue(StockCountResponse),
          },
        },
      ],
    }).compile();

    service = module.get<StockService>(StockService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('Validate sku in files', () => {
    it('should return true if given sku is present in both files', () => {
      expect(service.validateSku(mockSku)).toBeTruthy();
    });
  });

  it('should return stock count for given sku', async () => {
    await expect(service.getLatestStockCount(mockSku)).resolves.toEqual(
      StockCountResponse,
    );
  });

  describe('Reading stock.json file', () => {
    it('should read contents of stock.json file', async () => {
      await expect(service.readStockFile()).resolves.toEqual(stocks);
    });
  });

  describe('Reading transactions.json file', () => {
    it('should read contents of transactions.json file', async () => {
      await expect(service.readTransactionsFile()).resolves.toEqual(
        transactions,
      );
    });
  });
});
