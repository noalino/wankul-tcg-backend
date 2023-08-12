export interface Card {
  id: number;
  name: string;
  artist: Artist;
  collection: Collection;
  effigy: Effigy | null;
  image: string;
  rarity: Rarity;
}

enum Artist {
  LeonardLam = 'Léonard Lam',
  BenGilletti = 'Ben Gilletti',
  Jaycee = 'Jaycee',
  Yuriiick = 'Yuriiick',
  Lhotus = 'Lhotus',
  MaelLohbrunner = 'Mael Lohbrunner',
  ZeroRedge = '0 Redge',
}

enum Collection {
  Origins = 'Origins',
}

enum Effigy {
  Laink = 'Laink',
  Terracid = 'Terracid',
  Guest = 'Guest',
  Random = 'Random',
}

enum Rarity {
  Common = 'Commune',
  LessCommon = 'Peu commune',
  Land = 'Terrain',
  Rare = 'Rare',
  UltraRareHolo1 = 'Ultra Rare Holo 1',
  UltraRareHolo2 = 'Ultra Rare Holo 2',
  LegendaryBronze = 'Légendaire Bronze',
  LegendarySilver = 'Légendaire Argent',
  LegendaryGold = 'Légendaire Or',
}
