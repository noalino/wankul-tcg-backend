import { Injectable, NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';

import DatabaseService from '../database/database.service';
import { CardModel } from './card.model';
import { GetCardsQueryDto } from './dto/getcards.dto';

@Injectable()
class CardsRepository {
  constructor(private readonly dbService: DatabaseService) {}

  async getAll(query: GetCardsQueryDto) {
    // Remove empty filters
    Object.keys(query)
      .filter((key) => !query[key] || query[key].length <= 0)
      .forEach((key) => delete query[key]);

    const [queryKeys, queryValues] = [Object.keys(query), Object.values(query)];
    const dbResponse = await this.dbService.runQuery(
      `
      SELECT * FROM cards
      ${
        queryKeys.length <= 0
          ? ''
          : `WHERE ${queryKeys
              .map((key, i) => `${key} = ANY($${i + 1}::"int2"[])`)
              .join(' AND ')}`
      }
    `,
      queryValues,
    );
    return plainToInstance(CardModel, dbResponse.rows);
  }

  async getById(id: number) {
    const dbResponse = await this.dbService.runQuery(
      `
      SELECT * FROM cards WHERE id=$1
    `,
      [id],
    );
    const entity = dbResponse.rows[0];
    if (!entity) {
      throw new NotFoundException();
    }
    return entity;
  }
}

export default CardsRepository;
