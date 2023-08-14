export class CardModel {
  id: number;
  number: number;
  name: string;
  artist: Artist;
  collection: Collection;
  effigy: Effigy | null;
  image: string;
  rarity: Rarity;
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
