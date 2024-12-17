import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { IsString, IsOptional, IsUUID, IsObject, IsArray, ValidateNested } from 'class-validator';
import { ConversationMessageDto } from '@leek/assistants/dto/conversation.message.dto';
import { Type } from 'class-transformer';

export class CreateAssistantDto {
  @ApiProperty({
    description: '助手名称',
    example: '客服助手',
  })
  @IsString()
  name: string;

  @ApiPropertyOptional({
    description: '助手的描述信息',
    example: '一个帮助用户解答问题的虚拟助手。',
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({
    description: '助手关联的知识库 ID',
    example: '3f29e2b7-8c9e-4d47-bbfa-a4a7f7b81b9c',
  })
  @IsOptional()
  @IsUUID()
  datasetId?: string;

  @ApiPropertyOptional({
    description: '初始 Prompt 模板',
    example: '你是一个智能客服助手，可以回答用户的各种问题。',
  })
  @IsOptional()
  @IsString()
  systemPrompt?: string;

  @ApiProperty({
    type: [ConversationMessageDto],
    description:
      'A list of messages included in the conversation request, where each message contains an author and content.',
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ConversationMessageDto)
  messages?: LEEK.JsonValue;

  @ApiPropertyOptional({
    description: '助手的变量设置，用于存储动态数据或特定的用户信息，供助手在对话过程中使用。',
    example: '{"userName": "string", "preferredLanguage": "string"}',
  })
  @IsOptional()
  @IsObject()
  variables?: LEEK.JsonValue;
}
