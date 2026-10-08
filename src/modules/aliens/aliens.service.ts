import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../../database/prisma/prisma.service';

@Injectable()
export class AliensService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  // GET /aliens
  async findAll() {
    return this.prisma.alien.findMany({
      orderBy: {
        Created: 'asc',
      },
    });
  }

  // GET /aliens/:alienId
  async findById(alienId: number) {
    const alien = await this.prisma.alien.findUnique({
      where: {
        AlienId: alienId,
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