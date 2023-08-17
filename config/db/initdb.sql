CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS cards (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    number INT NOT NULL,
    name TEXT NOT NULL,
    image TEXT NOT NULL,
    collection smallint NOT NULL,
    artist smallint NOT NULL,
    effigy smallint,
    rarity smallint NOT NULL
)