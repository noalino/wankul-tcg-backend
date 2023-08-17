import { Transform, Type } from 'class-transformer';
import { IsEnum, IsNumber, IsOptional, Min } from 'class-validator';

import { Artist, Effigy, Rarity } from '../card.model';

export class FilterQueryDto {
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

export class PaginationQueryDto {
  @IsNumber()
  @IsOptional()
  @Min(1)
  @Type(() => Number)
  @Transform(({ value }) => value || null)
  limit?: number;

  @IsNumber()
  @IsOptional()
  @Min(0)
  @Type(() => Number)
  offset?: number;
}
