import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
} from '@nestjs/common';

import { AliensService } from './aliens.service';

@Controller('aliens')
export class AliensController {
  constructor(
    private readonly aliensService: AliensService,
  ) {}

  @Get()
  findAll() {
    return this.aliensService.findAll();
  }

  @Get(':alienId')
  findById(@Param('alienId', ParseIntPipe) alienId: number) {
    return this.aliensService.findById(alienId);
  }
}