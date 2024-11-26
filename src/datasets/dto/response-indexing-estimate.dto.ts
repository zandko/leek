import { ApiProperty } from '@nestjs/swagger';

export class ResponseIndexingEstimateDto {
  @ApiProperty({
    description: '基于分段规则，文档被分割后的总块数。如果文档没有分段，则此值为0',
    example: 2,
  })
  chunkCount: number;

  @ApiProperty({
    description: '文档分段后的前几页或内容片段的预览，帮助查看文档如何被分割',
    example: ['这是文档的第一个分段预览。', '这是文档的第二个分段预览。'],
  })
  chunkPreview: string[];
}
