import { Injectable } from '@nestjs/common';
import CardsRepository from './cards.repository';

@Injectable()
export class CardsService {
  constructor(private readonly cardsRepository: CardsRepository) {}

  getCards() {
    return this.cardsRepository.getAll();
  }

  getCardById(id: number) {
    return this.cardsRepository.getById(id);
  }
}
