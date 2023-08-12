import { Controller, Get, Param } from '@nestjs/common';
import { CardsService } from './cards.service';
import FindOneParams from '../utils/findOneParams';

@Controller('cards')
export class CardsController {
  constructor(private readonly cardsService: CardsService) {}

  @Get()
  getCards() {
    return this.cardsService.getCards();
  }

  @Get(':id')
  getCardById(@Param() { id }: FindOneParams) {
    return this.cardsService.getCardById(id);
  }
}
