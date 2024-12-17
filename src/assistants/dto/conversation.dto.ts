import { ApiProperty, ApiPropertyOptional, ApiResponseOptions } from '@nestjs/swagger';

import { Type } from 'class-transformer';
import { IsArray, IsBoolean, IsEnum, IsObject, IsOptional, ValidateNested } from 'class-validator';

import { ConversationActionType } from '@leek/constants';

import { ConversationMessageDto } from './conversation.message.dto';

export class ConversationDto {
  @ApiProperty({
    enum: ConversationActionType,
    description: 'The action to perform in the conversation, such as "Next" to request the next response.',
    example: ConversationActionType.Next,
  })
  @IsEnum(ConversationActionType)
  action: ConversationActionType;

  @ApiProperty({
    type: [ConversationMessageDto],
    description:
      'A list of messages included in the conversation request, where each message contains an author and content.',
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ConversationMessageDto)
  messages: ConversationMessageDto[];

  @ApiProperty({
    description:
      'Indicates whether the response should be streamed incrementally, improving responsiveness for real-time applications.',
    example: true,
  })
  @IsOptional()
  @IsBoolean()
  streaming?: boolean;

  @ApiPropertyOptional({
    description: '助手的变量设置，用于存储动态数据或特定的用户信息，供助手在对话过程中使用。',
    example: '{"userName": "string", "preferredLanguage": "string"}',
  })
  @IsOptional()
  @IsObject()
  variables?: object;
}

export const ChatSseResponse: ApiResponseOptions = {
  description: '会话启动成功后，服务器将通过 SSE 推送助手的响应。',
  content: {
    'text/event-stream': {
      example: 'data: {"message":{"author":{"role":"assistant"},"content":{"content_type":"text","parts":["I"]}}}',
    },
  },
};
