import {
  Body,
  Controller,
  Get,
  Patch,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';

import { AliensService } from './aliens.service';
import { CreateAlienDto } from './dto/create-alien.dto';
import { UpdateAlienDto } from './dto/update-alien.dto';

@Controller('aliens')
export class AliensController {
  constructor(
    private readonly aliensService: AliensService,
  ) {}

  @Post()
  create(@Body() createAlienDto: CreateAlienDto) {
    return this.aliensService.create(createAlienDto);
  }

  @Patch(':alienId')
  update(
    @Param('alienId', ParseIntPipe) alienId: number,
    @Body() updateAlienDto: UpdateAlienDto,
  ) {
    return this.aliensService.update(alienId, updateAlienDto);
  }

  @Get()
  findAll() {
    return this.aliensService.findAll();
  }

  @Get(':alienId')
  findById(@Param('alienId', ParseIntPipe) alienId: number) {
    return this.aliensService.findById(alienId);
  }
}