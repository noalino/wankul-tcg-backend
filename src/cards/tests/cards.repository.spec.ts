import { NotFoundException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { plainToInstance } from 'class-transformer';

import { DatabaseService } from '../../database/database.service';
import { CardsRepository } from '../cards.repository';
import {
  Artist,
  Card,
  Collection,
  Effigy,
  ListCard,
  Rarity,
} from '../models/card.model';

describe('CardsRepository', () => {
  let cardsRepository: CardsRepository;
  let databaseService: DatabaseService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        CardsRepository,
        {
          provide: DatabaseService,
          useValue: {
            runQuery: jest.fn().mockResolvedValue({ rows: [] }),
          },
        },
      ],
    }).compile();

    cardsRepository = moduleRef.get<CardsRepository>(CardsRepository);
    databaseService = moduleRef.get<DatabaseService>(DatabaseService);
  });

  describe('find', () => {
    describe('Handle filters', () => {
      it('should add OFFSET and LIMIT filters', async () => {
        const param = {
          filter: {},
        };
        const expectedQueryString = [
          'SELECT *, COUNT(*) OVER()::int AS total_cards_count FROM cards',
          'ORDER BY number ASC',
          'OFFSET $1',
          'LIMIT $2',
        ].join('\n');
        expect.assertions(2);

        await cardsRepository.find(param);
        expect(databaseService.runQuery).toHaveBeenCalledTimes(1);
        expect(databaseService.runQuery).toHaveBeenCalledWith(
          expectedQueryString,
          [0, 20],
        );
      });

      it('should add WHERE filters', async () => {
        const param = {
          filter: {
            artist: [Artist['Jaycee'], Artist['Lhotus']],
            effigy: [Effigy['Laink'], Effigy['Terracid']],
            rarity: [Rarity['Légendaire Or'], Rarity['Rare']],
          },
        };
        const expectedQueryString = [
          'SELECT *, COUNT(*) OVER()::int AS total_cards_count FROM cards',
          'WHERE artist = ANY($1::"int2"[]) AND effigy = ANY($2::"int2"[]) AND rarity = ANY($3::"int2"[])',
          'ORDER BY number ASC',
          'OFFSET $4',
          'LIMIT $5',
        ].join('\n');
        expect.assertions(2);

        await cardsRepository.find(param);
        expect(databaseService.runQuery).toHaveBeenCalledTimes(1);
        expect(databaseService.runQuery).toHaveBeenCalledWith(
          expectedQueryString,
          [
            param.filter.artist,
            param.filter.effigy,
            param.filter.rarity,
            0,
            20,
          ],
        );
      });
    });

    describe('Response', () => {
      const param = {
        filter: {},
      };
      it('Without data', async () => {
        expect.assertions(1);

        databaseService.runQuery = jest.fn().mockResolvedValue({ rows: [] });
        const result = await cardsRepository.find(param);
        expect(result).toStrictEqual({
          total: 0,
          limit: 20,
          offset: 0,
          items: [],
        });
      });

      it('With data', async () => {
        expect.assertions(1);

        const total = 30;
        const limit = 20;
        const items = Array.from({ length: total }).map((_, i) => ({
          id: 'abcd' + i,
          name: 'card name',
          number: i + 1,
          image: 'url1',
          collection: Collection['Origins'],
          artist: Artist['Jaycee'],
          effigy: Effigy['Laink'],
          rarity: Rarity['Commune'],
          total_cards_count: total,
        }));
        const expectedResult = {
          total,
          limit,
          offset: 0,
          items: plainToInstance(ListCard, items),
        };

        databaseService.runQuery = jest.fn().mockResolvedValue({ rows: items });
        const result = await cardsRepository.find(param);
        expect(result).toStrictEqual(expectedResult);
      });
    });
  });

  describe('findOneBy', () => {
    const param = { id: '1234-abcd' };

    it('should return a card', async () => {
      expect.assertions(3);

      const foundCard = { id: '1234' };
      databaseService.runQuery = jest
        .fn()
        .mockResolvedValue({ rows: [foundCard] });

      const result = await cardsRepository.findOneBy(param);
      expect(databaseService.runQuery).toHaveBeenCalledTimes(1);
      expect(databaseService.runQuery).toHaveBeenCalledWith(
        `
      SELECT * FROM cards WHERE id=$1
    `,
        [param.id],
      );
      expect(result).toStrictEqual(plainToInstance(Card, foundCard));
    });

    it('should return a NotFoundException when there is no card found', async () => {
      databaseService.runQuery = jest.fn().mockResolvedValue({ rows: [] });
      await expect(cardsRepository.findOneBy(param)).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
