import { IsUUID } from 'class-validator';

export class GetCardByIdParamsDto {
  @IsUUID()
  id: string;
}
