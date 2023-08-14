import { IsNumberString } from 'class-validator';
import { Transform } from 'class-transformer';

class FindOneParams {
  @IsNumberString()
  @Transform(({ value }) => Number(value))
  id: number;
}

export default FindOneParams;
