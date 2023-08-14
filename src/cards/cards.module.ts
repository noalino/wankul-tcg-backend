import { Module } from '@nestjs/common';

import { CardsController } from './cards.controller';
import CardsRepository from './cards.repository';
import { CardsService } from './cards.service';

@Module({
  controllers: [CardsController],
  providers: [CardsRepository, CardsService],
})
export class CardsModule {}
