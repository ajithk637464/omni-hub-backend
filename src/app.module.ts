import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './database/prisma/prisma.module';
import { AliensModule } from './modules/aliens/aliens.module';

@Module({
  imports: [PrismaModule, AliensModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
