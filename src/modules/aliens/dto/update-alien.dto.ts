import { PartialType } from '@nestjs/swagger';

import { CreateAlienDto } from './create-alien.dto';

export class UpdateAlienDto extends PartialType(CreateAlienDto) {}
