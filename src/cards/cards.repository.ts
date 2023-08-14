import { Injectable, NotFoundException } from '@nestjs/common';
import DatabaseService from '../database/database.service';
import { plainToInstance } from 'class-transformer';
import { CardModel } from './card.model';

@Injectable()
class CardsRepository {
  constructor(private readonly dbService: DatabaseService) {}

  async getAll() {
    const dbResponse = await this.dbService.runQuery(`
      SELECT * FROM cards
    `);
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
