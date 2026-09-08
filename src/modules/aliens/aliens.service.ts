import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../../database/prisma/prisma.service';
import { CreateAlienDto } from './dto/create-alien.dto';

@Injectable()
export class AliensService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  // POST /aliens
  async create(createAlienDto: CreateAlienDto) {
    return this.prisma.alien.create({
      data: {
        name: createAlienDto.name,
        species: createAlienDto.species,
        description: createAlienDto.description,
        imageUrl: createAlienDto.imageUrl,
        isUnlocked: createAlienDto.isUnlocked ?? false,
      },
    });
  }

  // GET /aliens
  async findAll() {
    return this.prisma.alien.findMany({
      orderBy: {
        createdAt: 'asc',
      },
    });
  }

  // GET /aliens/:alienId
  async findById(alienId: string) {
    const alien = await this.prisma.alien.findUnique({
      where: {
        alienId,
      },
    });

    if (!alien) {
      throw new NotFoundException(
        `Alien with ID ${alienId} not found`,
      );
    }

    return alien;
  }
}