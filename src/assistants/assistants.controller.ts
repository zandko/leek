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
  Sse,
  Version,
} from '@nestjs/common';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';

import { ConversationDto } from '@leek/assistants/dto/conversation.dto';
import { SwaggerDoc, UUIDParam } from '@leek/common';

import { AssistantService } from './assistants.service';
import { LeekAssistant } from './domain/assistants';
import { CreateAssistantDto } from './dto/create.assistant.dto';
import { UpdateAssistantDto } from './dto/update.assistant.dto';

@ApiTags('Assistants')
@Controller('assistants')
export class AssistantController {
  constructor(private readonly assistantService: AssistantService) {}

  @Post()
  @Version('1')
  @HttpCode(HttpStatus.CREATED)
  @SwaggerDoc('ASSISTANTS', 'CREATE', LeekAssistant)
  async createAssistant(@Body() createAssistantDto: CreateAssistantDto): Promise<LeekAssistant> {
    return this.assistantService.createAssistant(createAssistantDto);
  }

  @Get(':id')
  @Version('1')
  @HttpCode(HttpStatus.OK)
  @SwaggerDoc('ASSISTANTS', 'RETRIEVE', LeekAssistant)
  @ApiParam({
    name: 'id',
    description: 'Assistant ID',
  })
  async findAssistantById(@Param('id', new ParseUUIDPipe()) id: string): Promise<LeekAssistant> {
    return this.assistantService.findAssistantById(id);
  }

  @Get()
  @Version('1')
  @HttpCode(HttpStatus.OK)
  @SwaggerDoc('ASSISTANTS', 'LIST', [LeekAssistant])
  async findManyAssistants(): Promise<LeekAssistant[]> {
    return this.assistantService.findManyAssistants();
  }

  @Version('1')
  @Patch(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @SwaggerDoc('ASSISTANTS', 'UPDATE')
  @ApiParam({
    name: 'id',
    description: 'Assistant ID',
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
  @SwaggerDoc('ASSISTANTS', 'UPDATE')
  @ApiParam({
    name: 'id',
    description: 'Assistant ID',
  })
  async deleteAssistantById(@Param('id', new ParseUUIDPipe()) id: string): Promise<void> {
    return this.assistantService.deleteAssistantById(id);
  }

  @Post(':id/conversation')
  @Version('1')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Assistant Chat Interaction',
    description: `
Facilitates conversation with the assistant by processing user messages and generating context-aware responses. 
Supports dynamic and interactive chat functionality tailored to the assistant's configuration.`,
  })
  @ApiParam({
    name: 'id',
    description: 'Assistant ID',
  })
  async conversation(@UUIDParam('id') assistantId: string, @Body() conversationDto: ConversationDto) {
    return this.assistantService.conversation(assistantId, { ...conversationDto, streaming: false });
  }

  @Post(':id/streaming/conversation')
  @Sse()
  @Version('1')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Assistant Chat Interaction',
    description: `
Facilitates conversation with the assistant by processing user messages and generating context-aware responses. 
Supports dynamic and interactive chat functionality tailored to the assistant's configuration.`,
  })
  @ApiParam({
    name: 'id',
    description: 'Assistant ID',
  })
  async streamingConversation(@UUIDParam('id') assistantId: string, @Body() conversationDto: ConversationDto) {
    return this.assistantService.conversation(assistantId, { ...conversationDto, streaming: true });
  }
}
