import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class LeekAssistant {
  @ApiProperty({
    description: '助手的唯一标识符',
    example: 'a1b2c3d4-5678-9efg-1011-121314151617',
  })
  id: string;

  @ApiProperty({
    description: '助手名称',
    example: '客服助手',
  })
  name: string;

  @ApiPropertyOptional({
    description: '助手的描述信息',
    example: '一个帮助用户解答问题的虚拟助手。',
  })
  description?: string;

  @ApiPropertyOptional({
    description: '助手关联的知识库 ID',
    example: '3f29e2b7-8c9e-4d47-bbfa-a4a7f7b81b9c',
  })
  datasetId?: string;

  @ApiPropertyOptional({
    description: '初始 Prompt 模板',
    example: '你是一个智能客服助手，可以回答用户的各种问题。',
  })
  systemPrompt?: string;

  @ApiProperty({
    description: '助手创建时间',
    example: '2023-01-01T00:00:00Z',
  })
  createdAt: Date = new Date();

  @ApiProperty({
    description: '助手更新时间',
    example: '2023-01-02T00:00:00Z',
  })
  updatedAt: Date = new Date();
}
