import {
  Body,
  Controller,
  Get,
  Param,
  Post,
} from '@nestjs/common';

import { AliensService } from './aliens.service';
import { CreateAlienDto } from './dto/create-alien.dto';

@Controller('aliens')
export class AliensController {
  constructor(
    private readonly aliensService: AliensService,
  ) {}

  @Post()
  create(@Body() createAlienDto: CreateAlienDto) {
    return this.aliensService.create(createAlienDto);
  }

  @Get()
  async findAll() {
    debugger
    try{
        return await this.aliensService.findAll();

    }
    catch (error) {
        debugger
        console.error('Error fetching aliens:', error);
        throw error;
    }
  }

  @Get(':alienId')
  findById(@Param('alienId') alienId: string) {
    return this.aliensService.findById(alienId);
  }
}