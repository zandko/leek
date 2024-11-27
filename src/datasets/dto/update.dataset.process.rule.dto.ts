import { PartialType } from '@nestjs/swagger';

import { CreateDatasetProcessRuleDto } from './create.dataset.process.rule.dto';

export class UpdateDatasetProcessRuleDto extends PartialType(CreateDatasetProcessRuleDto) {}
