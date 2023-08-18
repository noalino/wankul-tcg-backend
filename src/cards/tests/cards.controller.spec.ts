import { Test } from '@nestjs/testing';

import { CardsController } from '../cards.controller';
import { CardsService } from '../cards.service';
import { Artist, Effigy, Rarity } from '../models/card.model';

describe('CardsController', () => {
  let cardsController: CardsController;
  let cardsService: CardsService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [CardsController],
      providers: [
        {
          provide: CardsService,
          useValue: {
            getCardById: jest.fn(),
            getCards: jest.fn(),
          },
        },
      ],
    }).compile();

    cardsService = moduleRef.get<CardsService>(CardsService);
    cardsController = moduleRef.get<CardsController>(CardsController);
  });

  describe('getCards', () => {
    const param = {
      artist: [Artist['Ben Gilletti']],
      effigy: [Effigy['Guest']],
      rarity: [Rarity['Rare']],
      limit: 10,
      offset: 0,
    };

    it('should call cardsService.getCards', async () => {
      expect.assertions(2);

      await cardsController.getCards(param);
      expect(cardsService.getCards).toHaveBeenCalledTimes(1);
      expect(cardsService.getCards).toHaveBeenCalledWith(param);
    });

    it('should propagate the error', async () => {
      jest.spyOn(cardsService, 'getCards').mockRejectedValue('error');
      await expect(cardsController.getCards(param)).rejects.toEqual('error');
    });
  });

  describe('getCardById', () => {
    const param = { id: '1234-abcd' };

    it('should call cardsService.getCardById', async () => {
      expect.assertions(2);

      await cardsController.getCardById(param);
      expect(cardsService.getCardById).toHaveBeenCalledTimes(1);
      expect(cardsService.getCardById).toHaveBeenCalledWith(param.id);
    });

    it('should propagate the error', async () => {
      jest.spyOn(cardsService, 'getCardById').mockRejectedValue('error');
      await expect(cardsController.getCardById(param)).rejects.toEqual('error');
    });
  });
});
