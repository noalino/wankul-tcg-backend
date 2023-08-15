import { Transform } from 'class-transformer';
import { IsNumberString } from 'class-validator';

class FindOneParams {
  @IsNumberString()
  @Transform(({ value }) => Number(value))
  id: number;
}

export default FindOneParams;
