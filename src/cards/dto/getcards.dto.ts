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
      .map((str: string) => Number(str)),
  )
  artist?: Artist[];

  @IsEnum(Effigy, { each: true })
  @IsOptional()
  @Transform(({ value }) =>
    value
      .trim()
      .split(',')
      .map((str: string) => Number(str)),
  )
  effigy?: Effigy[];

  @IsEnum(Rarity, { each: true })
  @IsOptional()
  @Transform(({ value }) =>
    value
      .trim()
      .split(',')
      .map((str: string) => Number(str)),
  )
  rarity?: Rarity[];
}
