import { Injectable } from '@nestjs/common';

import { CardsRepository } from './cards.repository';
import { GetCardsQueryDto } from './dto/getCards.dto';

@Injectable()
export class CardsService {
  constructor(private readonly cardsRepository: CardsRepository) {}

  getCards({ limit, offset, ...filter }: GetCardsQueryDto) {
    return this.cardsRepository.find({ filter, limit, offset });
  }

  getCardById(id: string) {
    return this.cardsRepository.findOneBy({ id });
  }
}
