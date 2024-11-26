import { PartialType } from '@nestjs/swagger';

import { CreateDocumentSegmentDto } from './create-segment.dto';

export class UpdateDocumentSegmentDto extends PartialType(CreateDocumentSegmentDto) {}
