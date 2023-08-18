import { Controller, Get, Param, Query } from '@nestjs/common';

import { CardsService } from './cards.service';
import { GetCardByIdParamsDto } from './dto/getCardById.dto';
import { GetCardsQueryDto } from './dto/getCards.dto';

@Controller('cards')
export class CardsController {
  constructor(private readonly cardsService: CardsService) {}

  @Get()
  getCards(@Query() query: GetCardsQueryDto) {
    return this.cardsService.getCards(query);
  }

  @Get(':id')
  getCardById(@Param() { id }: GetCardByIdParamsDto) {
    return this.cardsService.getCardById(id);
  }
}
