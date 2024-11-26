import { ApiProperty } from '@nestjs/swagger';

import { IsNotEmpty, IsEnum } from 'class-validator';

import { Role } from '@leek/constants';

export class ConversationAuthorDto {
  @ApiProperty({ enum: Role, example: 'user', description: '消息作者的角色，例如 "user" 或 "assistant"' })
  @IsNotEmpty()
  @IsEnum(Role)
  role: string;
}
