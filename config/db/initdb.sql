CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS cards (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    number INT NOT NULL,
    name TEXT NOT NULL,
    artist smallint NOT NULL,
    collection smallint NOT NULL,
    effigy smallint,
    image TEXT NOT NULL,
    rarity smallint NOT NULL
)