import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class GetCardByIdParamsDto {
  @ApiProperty({
    description: 'id must be a UUID',
    example: '126d0690-27ca-4e17-82d9-dfa1769e0900',
  })
  @IsUUID()
  id: string;
}
