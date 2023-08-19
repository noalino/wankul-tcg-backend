import { Transform, Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  ArrayUnique,
  IsArray,
  IsEnum,
  IsNumber,
  IsOptional,
  Min,
} from 'class-validator';

import { Artist, Effigy, Rarity } from '../models/card.model';

class PaginationQueryDto {
  @IsNumber()
  @IsOptional()
  @Min(1)
  @Type(() => Number)
  @Transform(({ value }) => value || null)
  limit?: number | null;

  @IsNumber()
  @IsOptional()
  @Min(0)
  @Type(() => Number)
  offset?: number;
}

export class GetCardsQueryDto extends PaginationQueryDto {
  @IsArray()
  @ArrayNotEmpty()
  @ArrayUnique()
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

  @IsArray()
  @ArrayNotEmpty()
  @ArrayUnique()
  @IsEnum(Effigy, { each: true })
  @IsOptional()
  @Transform(({ value }) =>
    value
      .trim()
      .split(',')
      .filter((str: string) => str.length > 0) // Filter out empty strings, Number('') == 0
      .map((str: string) => Number(str)),
  )
  effigy?: Effigy[];

  @IsArray()
  @ArrayNotEmpty()
  @ArrayUnique()
  @IsEnum(Rarity, { each: true })
  @IsOptional()
  @Transform(({ value }) =>
    value
      .trim()
      .split(',')
      .filter((str: string) => str.length > 0) // Filter out empty strings, Number('') == 0
      .map((str: string) => Number(str)),
  )
  rarity?: Rarity[];
}
