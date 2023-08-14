import { Controller, Get, Query, Param } from '@nestjs/common';
import { CardsService } from './cards.service';
import FindOneParams from '../utils/findOneParams';
import { GetCardsQueryDto } from './dto/getcards.dto';

@Controller('cards')
export class CardsController {
  constructor(private readonly cardsService: CardsService) {}

  @Get()
  getCards(@Query() query: GetCardsQueryDto) {
    return this.cardsService.getCards(query);
  }

  @Get(':id')
  getCardById(@Param() { id }: FindOneParams) {
    return this.cardsService.getCardById(id);
  }
}
