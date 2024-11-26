import { ApiProperty } from '@nestjs/swagger';

export class ErrorResponseDto {
  @ApiProperty({ example: 400, description: 'HTTP 状态码' })
  statusCode: number;

  @ApiProperty({ example: 'Bad Request', description: '错误信息的简短描述' })
  message: string;

  @ApiProperty({
    example: '请求的数据无效。',
    description: '更详细的错误描述',
  })
  error: string;
}
