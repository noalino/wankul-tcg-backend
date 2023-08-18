import { Exclude } from 'class-transformer';

export class CardModel {
  id: string;
  number: number;
  name: string;
  artist: Artist;
  collection: Collection;
  effigy: Effigy;
  image: string;
  rarity: Rarity;
}

export class ListCardModel extends CardModel {
  @Exclude()
  total_cards_count: number;
}

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
  'Aucune',
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
