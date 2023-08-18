import { Injectable, NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';

import { DatabaseService } from '../database/database.service';
import { GetCardsQueryDto } from './dto/getCards.dto';
import { CardModel, ListCardModel } from './models/card.model';

@Injectable()
export class CardsRepository {
  constructor(private readonly dbService: DatabaseService) {}

  private createQueryString(filters: unknown[]): string {
    const queryLines = [
      'SELECT *, COUNT(*) OVER()::int AS total_cards_count FROM cards',
    ];

    if (filters.length > 0) {
      const whereClauses = `WHERE ${filters
        .map((key, i) => `${key} = ANY($${i + 1}::"int2"[])`)
        .join(' AND ')}`;
      queryLines.push(whereClauses);
    }

    queryLines.push(
      'ORDER BY number ASC',
      `OFFSET $${filters.length + 1}`,
      `LIMIT $${filters.length + 2}`,
    );

    return queryLines.join('\n');
  }

  async find({
    filter,
    limit = 20,
    offset = 0,
  }: {
    filter: Omit<GetCardsQueryDto, 'limit' | 'offset'>;
    limit?: GetCardsQueryDto['limit'];
    offset?: GetCardsQueryDto['offset'];
  }) {
    // Remove empty filters
    Object.keys(filter)
      .filter((key) => !filter[key] || filter[key].length <= 0)
      .forEach((key) => delete filter[key]);

    const [filterKeys, filterValues] = [
      Object.keys(filter),
      Object.values(filter),
    ];

    const dbResponse = await this.dbService.runQuery(
      this.createQueryString(filterKeys),
      [...filterValues, offset, limit],
    );

    const totalCount: number = dbResponse.rows[0]?.total_cards_count || 0;
    const items = plainToInstance(ListCardModel, dbResponse.rows);

    return {
      totalCount,
      itemsCount: dbResponse.rowCount,
      offset,
      items,
    };
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

    return plainToInstance(CardModel, entity);
  }
}
