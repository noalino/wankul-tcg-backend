import { Transform } from 'class-transformer';
import { IsNumberString } from 'class-validator';

export class GetCardByIdParamsDto {
  @IsNumberString()
  @Transform(({ value }) => Number(value))
  id: number;
}
