CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS cards (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    number INT NOT NULL,
    name TEXT NOT NULL,
    artist TEXT NOT NULL,
    collection TEXT NOT NULL,
    effigy TEXT,
    image TEXT NOT NULL,
    rarity TEXT NOT NULL
)