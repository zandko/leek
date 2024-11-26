import { OmitType, PartialType } from '@nestjs/swagger';

import { ProcessRuleDto } from './process-rule.dto';

export class DatasetProcessRuleDto extends PartialType(OmitType(ProcessRuleDto, ['mode'])) {}
