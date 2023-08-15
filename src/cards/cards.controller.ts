import { Controller, Get, Param, Query } from '@nestjs/common';

import { CardsService } from './cards.service';
import { GetCardByIdParamsDto } from './dto/getCardById.dto';
import { FilterQueryDto, PaginationQueryDto } from './dto/getCards.dto';

@Controller('cards')
export class CardsController {
  constructor(private readonly cardsService: CardsService) {}

  @Get()
  getCards(
    @Query() { artist, effigy, rarity }: FilterQueryDto,
    @Query() { limit, offset }: PaginationQueryDto,
  ) {
    return this.cardsService.getCards(
      { artist, effigy, rarity },
      { limit, offset },
    );
  }

  @Get(':id')
  getCardById(@Param() { id }: GetCardByIdParamsDto) {
    return this.cardsService.getCardById(id);
  }
}
