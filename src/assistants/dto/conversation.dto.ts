import { ApiProperty, ApiResponseOptions } from '@nestjs/swagger';

import { Type } from 'class-transformer';
import { IsArray, IsEnum, ValidateNested } from 'class-validator';

import { ConversationActionType } from '@leek/constants';

import { ConversationMessageDto } from './conversation-message.dto';

export class ConversationDto {
  @ApiProperty({
    enum: ConversationActionType,
    description: '在聊天中需要执行的操作，例如 "Next" 表示请求下一个响应',
    example: ConversationActionType.Next,
  })
  @IsEnum(ConversationActionType)
  action: ConversationActionType;

  @ApiProperty({ type: [ConversationMessageDto], description: '聊天请求中包含的消息列表，每条消息包含作者和内容' })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ConversationMessageDto)
  messages: ConversationMessageDto[];
}

export const ChatSseResponse: ApiResponseOptions = {
  description: '会话启动成功后，服务器将通过 SSE 推送助手的响应。',
  content: {
    'text/event-stream': {
      example: 'data: {"message":{"author":{"role":"assistant"},"content":{"content_type":"text","parts":["I"]}}}',
    },
  },
};
