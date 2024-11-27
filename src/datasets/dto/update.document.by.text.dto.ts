import { PartialType } from '@nestjs/swagger';

import { CreateDocumentByTextDto } from './create.document.by.text.dto';

export class UpdateDocumentByTextDto extends PartialType(CreateDocumentByTextDto) {}
