import { INestApplication, ValidationPipe } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';

import { CardsController } from '../src/cards/cards.controller';
import { CardsRepository } from '../src/cards/cards.repository';
import { CardsService } from '../src/cards/cards.service';
import { DatabaseService } from '../src/database/database.service';

describe('CardsController (e2e)', () => {
  let app: INestApplication;
  let runQueryMock: jest.Mock;

  beforeEach(async () => {
    runQueryMock = jest.fn().mockResolvedValue({ rows: [] });
    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [CardsController],
      providers: [
        CardsService,
        CardsRepository,
        {
          provide: DatabaseService,
          useValue: {
            runQuery: runQueryMock,
          },
        },
        {
          provide: APP_PIPE,
          useValue: new ValidationPipe({
            transform: true,
            whitelist: true,
          }),
        },
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  describe('when making the /cards GET request', () => {
    const filters = ['artist', 'effigy', 'rarity'];

    describe('with invalid filters, it should return 400', () => {
      for (const filter of filters) {
        it(`when ${filter} is empty`, () => {
          return request(app.getHttpServer())
            .get(`/cards?${filter}=`)
            .expect(400);
        });
        it(`when ${filter} is not a valid array`, () => {
          return request(app.getHttpServer())
            .get(`/cards?${filter}=[1]`)
            .expect(400);
        });
        it(`when ${filter} is not in enum`, () => {
          return request(app.getHttpServer())
            .get(`/cards?${filter}=20`)
            .expect(400);
        });
        it(`when ${filter} is not unique`, () => {
          return request(app.getHttpServer())
            .get(`/cards?${filter}=1,1`)
            .expect(400);
        });
      }
    });

    describe('with valid filters, it should return 200', () => {
      for (const filter of filters) {
        it(`when ${filter} is a single value`, () => {
          return request(app.getHttpServer())
            .get(`/cards?${filter}=1`)
            .expect(200);
        });
        it(`when ${filter} is a comma-separated list`, () => {
          return request(app.getHttpServer())
            .get(`/cards?${filter}=0,2,3`)
            .expect(200);
        });
      }
    });

    describe('without filters', () => {
      const dbCard = {
        id: 'f90711dd-af73-406d-b7fe-c277a328763f',
        number: 1,
        name: 'Navire Pirate',
        image: 'url1.jpg',
        collection: 0,
        artist: 0,
        effigy: 0,
        rarity: 0,
        total_cards_count: 1,
      };
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { total_cards_count, ...card } = dbCard;

      beforeEach(() => {
        runQueryMock.mockResolvedValue({
          rows: [dbCard],
        });
      });

      it(`should return 200 with default pagination`, () => {
        return request(app.getHttpServer())
          .get(`/cards`)
          .expect(200)
          .expect({
            total: 1,
            limit: 20,
            offset: 0,
            items: [card],
          });
      });
      it(`should return 200 with specified pagination`, () => {
        return request(app.getHttpServer())
          .get(`/cards?limit=10&offset=5`)
          .expect(200)
          .expect({
            total: 1,
            limit: 10,
            offset: 5,
            items: [card],
          });
      });
    });
  });

  describe('when making the /cards/:id GET request', () => {
    describe('it should return a 400 status code when id is not a uuid', () => {
      it('when id is an integer', () => {
        return request(app.getHttpServer()).get('/cards/1').expect(400);
      });
      it('when id is a string', () => {
        return request(app.getHttpServer()).get('/cards/card1').expect(400);
      });
    });

    it('should return a 404 when id is not found', () => {
      return request(app.getHttpServer())
        .get('/cards/f90711dd-af73-406d-b7fe-c277a328763f')
        .expect(404);
    });
    it('should return a 200 when id is found', () => {
      const card = {
        id: 'f90711dd-af73-406d-b7fe-c277a328763f',
        number: 1,
        name: 'Navire Pirate',
        image: 'url1.jpg',
        collection: 0,
        artist: 0,
        effigy: 0,
        rarity: 0,
      };
      runQueryMock.mockResolvedValue({
        rows: [card],
      });

      return request(app.getHttpServer())
        .get('/cards/f90711dd-af73-406d-b7fe-c277a328763f')
        .expect(200)
        .expect(card);
    });
  });
});
