import { Module } from '@nestjs/common';

import { AliensController } from './aliens.controller';
import { AliensService } from './aliens.service';

@Module({
  controllers: [AliensController],
  providers: [AliensService],
})
export class AliensModule {}