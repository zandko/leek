import { PartialType, OmitType } from '@nestjs/swagger';

import { CreateDatasetProcessRuleDto } from './create.dataset.process.rule.dto';

export class IndexingEstimateProcessRuleDto extends PartialType(OmitType(CreateDatasetProcessRuleDto, ['datasetId'])) {}
