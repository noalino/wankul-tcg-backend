import { Injectable, NotFoundException } from '@nestjs/common';
import DatabaseService from '../database/database.service';

@Injectable()
class CardsRepository {
  constructor(private readonly databaseService: DatabaseService) {}

  async getAll() {
    const databaseResponse = await this.databaseService.runQuery(`
      SELECT * FROM cards
    `);
    return databaseResponse.rows;
  }

  async getById(id: number) {
    const databaseResponse = await this.databaseService.runQuery(
      `
      SELECT * FROM cards WHERE id=$1
    `,
      [id],
    );
    const entity = databaseResponse.rows[0];
    if (!entity) {
      throw new NotFoundException();
    }
    return entity;
  }
}

export default CardsRepository;
