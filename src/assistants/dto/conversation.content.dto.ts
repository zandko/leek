import { ApiProperty } from '@nestjs/swagger';

import { IsString, IsNotEmpty, IsEnum, IsArray } from 'class-validator';

import { ConversationContentType } from '@leek/constants';

export class ConversationContentDto {
  @ApiProperty({
    enum: ConversationContentType,
    example: ConversationContentType.Text,
    description: '消息内容的类型，例如 "Text" 表示文本',
  })
  @IsString()
  @IsNotEmpty()
  @IsEnum(ConversationContentType)
  content_type: ConversationContentType;

  @ApiProperty({
    example: ['Explain what this bash command does: "cat config.yaml | awk NF"'],
    description: '消息内容的具体部分，例如分段文本',
  })
  @IsArray()
  @IsNotEmpty()
  parts: any[];
}
