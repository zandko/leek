import { PartialType } from '@nestjs/swagger';

import { CreateDocumentByFileDto } from './create.document.by.file.dto';

export class UpdateDocumentByFileDto extends PartialType(CreateDocumentByFileDto) {}
