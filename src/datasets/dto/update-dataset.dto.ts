import { PartialType, PickType } from '@nestjs/swagger';

import { CreateDatasetDto } from './create-dataset.dto';

// UpdateDatasetDto uses PartialType to inherit CreateDatasetDto with all properties as optional
export class UpdateDatasetDto extends PartialType(
  PickType(CreateDatasetDto, ['name', 'description', 'retrievalModel']),
) {}
