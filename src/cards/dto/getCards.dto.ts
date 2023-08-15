import { Transform } from 'class-transformer';
import { IsEnum, IsOptional } from 'class-validator';

import { Artist, Effigy, Rarity } from '../card.model';

export class GetCardsQueryDto {
  @IsEnum(Artist, { each: true })
  @IsOptional()
  @Transform(({ value }) =>
    value
      .trim()
      .split(',')
      .filter((str: string) => str.length > 0) // Filter out empty strings, Number('') == 0
      .map((str: string) => Number(str)),
  )
  artist?: Artist[];

  @IsEnum(Effigy, { each: true })
  @IsOptional()
  @Transform(({ value }) =>
    value
      .trim()
      .split(',')
      .filter((str: string) => str.length > 0)
      .map((str: string) => Number(str)),
  )
  effigy?: Effigy[];

  @IsEnum(Rarity, { each: true })
  @IsOptional()
  @Transform(({ value }) =>
    value
      .trim()
      .split(',')
      .filter((str: string) => str.length > 0)
      .map((str: string) => Number(str)),
  )
  rarity?: Rarity[];
}
