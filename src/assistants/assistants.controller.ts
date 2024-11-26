import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Version,
} from '@nestjs/common';
import { ApiParam, ApiTags } from '@nestjs/swagger';

import { SwaggerDoc } from '@leek/common';

import { AssistantService } from './assistants.service';
import { LeekAssistant } from './domain/assistants';
import { CreateAssistantDto } from './dto/create-assistant.dto';
import { UpdateAssistantDto } from './dto/update-assistant.dto';

@ApiTags('Assistants')
@Controller('assistants')
export class AssistantController {
  constructor(private readonly assistantService: AssistantService) {}

  @Post()
  @Version('1')
  @HttpCode(HttpStatus.CREATED)
  @SwaggerDoc('ASSISTANT', 'CREATE', LeekAssistant)
  async createAssistant(@Body() createAssistantDto: CreateAssistantDto): Promise<LeekAssistant> {
    return this.assistantService.createAssistant(createAssistantDto);
  }

  @Get(':id')
  @Version('1')
  @HttpCode(HttpStatus.OK)
  @SwaggerDoc('ASSISTANT', 'RETRIEVE', LeekAssistant)
  @ApiParam({
    name: 'id',
    description: '要检索的助手的UUID。',
  })
  async findAssistantById(@Param('id', new ParseUUIDPipe()) id: string): Promise<LeekAssistant> {
    return this.assistantService.findAssistantById(id);
  }

  @Version('1')
  @Patch(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @SwaggerDoc('ASSISTANT', 'UPDATE')
  @ApiParam({
    name: 'id',
    description: '要更新的助手的UUID。',
  })
  async updateAssistantById(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateAssistantDto: UpdateAssistantDto,
  ): Promise<void> {
    return this.assistantService.updateAssistantById(id, updateAssistantDto);
  }

  @Delete(':id')
  @Version('1')
  @HttpCode(HttpStatus.NO_CONTENT)
  @SwaggerDoc('ASSISTANT', 'UPDATE')
  @ApiParam({
    name: 'id',
    description: '要删除的助手的UUID。',
  })
  async deleteAssistantById(@Param('id', new ParseUUIDPipe()) id: string): Promise<void> {
    return this.assistantService.deleteAssistantById(id);
  }
}
