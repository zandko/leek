import { ApiProperty } from '@nestjs/swagger';

import { IsString, IsBoolean } from 'class-validator';

// 预处理规则 DTO
export class PreProcessingRuleDto {
  @ApiProperty({
    description: '预处理规则的唯一标识符',
    enum: ['removeExtraSpaces', 'removeUrlsEmails'],
    example: 'removeExtraSpaces',
  })
  @IsString()
  id: string;

  @ApiProperty({
    description: '是否启用该预处理规则',
    example: true,
  })
  @IsBoolean()
  enabled: boolean;
}
