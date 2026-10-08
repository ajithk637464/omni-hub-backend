import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { PrismaModule } from './database/prisma/prisma.module';
import { AliensModule } from './modules/aliens/aliens.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    PrismaModule,
    AliensModule,
  ],
})
export class AppModule {}