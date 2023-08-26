import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class GetCardByIdParamsDto {
  @ApiProperty({
    description: 'id must be a UUID',
    example: '9a15cb37-a5b7-477a-8b2b-5cc591265d4d',
  })
  @IsUUID()
  id: string;
}
