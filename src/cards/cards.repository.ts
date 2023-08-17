import { Injectable, NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';

import DatabaseService from '../database/database.service';
import { FilterQueryDto } from './dto/getCards.dto';
import { CardModel } from './models/card.model';

@Injectable()
class CardsRepository {
  constructor(private readonly dbService: DatabaseService) {}

  async find({
    filter,
    limit = 20,
    offset = 0,
  }: {
    filter: FilterQueryDto;
    limit: number | null;
    offset: number;
  }) {
    // Remove empty filters
    Object.keys(filter)
      .filter((key) => !filter[key] || filter[key].length <= 0)
      .forEach((key) => delete filter[key]);

    const [filterKeys, filterValues] = [
      Object.keys(filter),
      Object.values(filter),
    ];

    const createQueryString = () =>
      `
      SELECT *, COUNT(*) OVER()::int AS total_cards_count FROM cards
      ${
        filterKeys.length <= 0
          ? ''
          : `WHERE ${filterKeys
              .map((key, i) => `${key} = ANY($${i + 1}::"int2"[])`)
              .join(' AND ')}`
      }
      ORDER BY number ASC
      OFFSET $${filterKeys.length + 1}
      LIMIT $${filterKeys.length + 2}
    `;

    const dbResponse = await this.dbService.runQuery(createQueryString(), [
      ...filterValues,
      offset,
      limit,
    ]);

    const totalCount: number = dbResponse.rows[0]?.total_cards_count || 0;
    const items = plainToInstance(CardModel, dbResponse.rows);

    return { totalCount, itemsCount: items.length, offset, items };
  }

  async findOneBy({ id }: { id: string }) {
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
