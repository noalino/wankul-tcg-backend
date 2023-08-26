import {
  Controller,
  Delete,
  Get,
  MethodNotAllowedException,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiExcludeEndpoint,
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

  @Post()
  @ApiExcludeEndpoint()
  createCards() {
    throw new MethodNotAllowedException();
  }

  @Put()
  @ApiExcludeEndpoint()
  updateCards() {
    throw new MethodNotAllowedException();
  }

  @Delete()
  @ApiExcludeEndpoint()
  removeCards() {
    throw new MethodNotAllowedException();
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

  @Post(':id')
  @ApiExcludeEndpoint()
  createCard() {
    throw new MethodNotAllowedException();
  }

  @Put(':id')
  @ApiExcludeEndpoint()
  updateCard() {
    throw new MethodNotAllowedException();
  }

  @Delete(':id')
  @ApiExcludeEndpoint()
  removeCard() {
    throw new MethodNotAllowedException();
  }
}
