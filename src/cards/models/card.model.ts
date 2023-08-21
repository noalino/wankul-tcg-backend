import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';

import { createEnumDescription } from '../../utils/helpers';

export enum Artist {
  'Léonard Lam',
  'Ben Gilletti',
  'Jaycee',
  'Yuriiick',
  'Lhotus',
  'Mael Lohbrunner',
  '0 Redge',
}

export enum Collection {
  'Origins',
}

export enum Effigy {
  'None',
  'Laink',
  'Terracid',
  'Guest',
  'Random',
}

export enum Rarity {
  'Terrain',
  'Commune',
  'Peu commune',
  'Rare',
  'Ultra Rare Holo 1',
  'Ultra Rare Holo 2',
  'Légendaire Bronze',
  'Légendaire Argent',
  'Légendaire Or',
}

export class Card {
  @ApiProperty()
  id: string;

  @ApiProperty()
  number: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  image: string;

  @ApiProperty({
    enum: Collection,
    description: createEnumDescription(Collection),
  })
  collection: Collection;

  @ApiProperty({
    enum: Artist,
    description: createEnumDescription(Artist),
  })
  artist: Artist;

  @ApiProperty({
    enum: Effigy,
    description: createEnumDescription(Effigy),
  })
  effigy: Effigy;

  @ApiProperty({
    enum: Rarity,
    description: createEnumDescription(Rarity),
  })
  rarity: Rarity;
}

export class ListCard extends Card {
  @Exclude()
  total_cards_count: number;
}
