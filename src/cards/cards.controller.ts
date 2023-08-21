import { Controller, Get, Param, Query } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiExtraModels,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';

import { CardsService } from './cards.service';
import { GetCardByIdParamsDto } from './dto/getCardById.dto';
import { GetCardsQueryDto } from './dto/getCards.dto';
import { PaginatedDto } from './dto/paginated.dto';
import { Card } from './models/card.model';

@Controller('cards')
@ApiTags('cards')
@ApiExtraModels(Card, PaginatedDto)
export class CardsController {
  constructor(private readonly cardsService: CardsService) {}

  @Get()
  @ApiOkResponse({
    description: 'Success',
    schema: {
      title: `PaginatedReponseOf${Card.name}`,
      allOf: [
        { $ref: getSchemaPath(PaginatedDto) },
        {
          properties: {
            items: {
              type: 'array',
              items: { $ref: getSchemaPath(Card) },
            },
          },
        },
      ],
    },
  })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  getCards(@Query() query: GetCardsQueryDto) {
    return this.cardsService.getCards(query);
  }

  @Get(':id')
  @ApiOkResponse({
    description: 'Success',
    type: Card,
  })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiNotFoundResponse({ description: 'Not Found' })
  getCardById(@Param() { id }: GetCardByIdParamsDto) {
    return this.cardsService.getCardById(id);
  }
}
