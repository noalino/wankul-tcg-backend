import { Test } from '@nestjs/testing';

import { CardsRepository } from '../cards.repository';
import { CardsService } from '../cards.service';
import { Artist, Effigy, Rarity } from '../models/card.model';

describe('CardsService', () => {
  let cardsService: CardsService;
  let cardsRepository: CardsRepository;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        CardsService,
        {
          provide: CardsRepository,
          useValue: {
            find: jest.fn(),
            findOneBy: jest.fn(),
          },
        },
      ],
    }).compile();

    cardsService = moduleRef.get<CardsService>(CardsService);
    cardsRepository = moduleRef.get<CardsRepository>(CardsRepository);
  });

  describe('getCards', () => {
    const param = {
      artist: [Artist['Ben Gilletti']],
      effigy: [Effigy['Guest']],
      rarity: [Rarity['Rare']],
      limit: 10,
      offset: 0,
    };
    const { limit, offset, ...filter } = param;

    it('should call cardsRepository.find', async () => {
      expect.assertions(2);

      await cardsService.getCards(param);
      expect(cardsRepository.find).toHaveBeenCalledTimes(1);
      expect(cardsRepository.find).toHaveBeenCalledWith({
        filter,
        limit,
        offset,
      });
    });

    it('should propagate the error', async () => {
      jest.spyOn(cardsRepository, 'find').mockRejectedValue('error');
      await expect(cardsService.getCards(param)).rejects.toEqual('error');
    });
  });

  describe('getCardById', () => {
    const param = '1234-abcd';

    it('should call cardsRepository.findOneBy', async () => {
      expect.assertions(2);

      await cardsService.getCardById(param);
      expect(cardsRepository.findOneBy).toHaveBeenCalledTimes(1);
      expect(cardsRepository.findOneBy).toHaveBeenCalledWith({ id: param });
    });

    it('should propagate the error', async () => {
      jest.spyOn(cardsRepository, 'findOneBy').mockRejectedValue('error');
      await expect(cardsService.getCardById(param)).rejects.toEqual('error');
    });
  });
});
