import { Injectable } from '@nestjs/common';

import CardsRepository from './cards.repository';
import { FilterQueryDto, PaginationQueryDto } from './dto/getCards.dto';

@Injectable()
export class CardsService {
  constructor(private readonly cardsRepository: CardsRepository) {}

  getCards(filter: FilterQueryDto, { limit, offset }: PaginationQueryDto) {
    return this.cardsRepository.find({ filter, limit, offset });
  }

  getCardById(id: string) {
    return this.cardsRepository.findOneBy({ id });
  }
}
