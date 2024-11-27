import { ApiProperty } from '@nestjs/swagger';

import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';

import { ConversationAuthorDto } from './conversation.author.dto';
import { ConversationContentDto } from './conversation.content.dto';

export class ConversationMessageDto {
  @ApiProperty({ type: ConversationAuthorDto, description: '消息的作者信息，包括角色属性' })
  @ValidateNested()
  @Type(() => ConversationAuthorDto)
  author: ConversationAuthorDto;

  @ApiProperty({ type: ConversationContentDto, description: '消息的内容信息，包括类型和具体部分' })
  @ValidateNested()
  @Type(() => ConversationContentDto)
  content: ConversationContentDto;
}
