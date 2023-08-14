import { Logger, Injectable } from '@nestjs/common';
import CardsRepository from './cards.repository';
import { GetCardsQueryDto } from './dto/getcards.dto';

@Injectable()
export class CardsService {
  constructor(private readonly cardsRepository: CardsRepository) {}

  getCards(query: GetCardsQueryDto) {
    return this.cardsRepository.getAll();
  }

  getCardById(id: number) {
    return this.cardsRepository.getById(id);
  }
}
