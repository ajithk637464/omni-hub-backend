import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { Prisma } from '../../generated/prisma/client';
import { PrismaService } from '../../database/prisma/prisma.service';
import { AlienListResponseDto } from './dto/alien-list-response.dto';

type AlienWithPowers = Prisma.AlienGetPayload<{
  include: {
    AlienAlienPowers: {
      include: {
        AlienPower: true;
      };
    };
  };
}>;

@Injectable()
export class AliensService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  // GET /aliens
  async findAll(): Promise<AlienListResponseDto[]> {
    const aliens = await this.prisma.alien.findMany({
      select: {
        AlienId: true,
        AlienGuid: true,
        AlienName: true,
        Species: true,
        HomePlanet: true,
        Description: true,
        AlienLevel: true,
        Unlocked: true,
        AlienAlienPowers: {
          select: {
            IsMainPower: true,
            AlienPower: {
              select: {
                AlienPowerId: true,
                AlienPowerGuid: true,
                AlienPowerName: true,
                Description: true,
                PowerType: true,
                PowerLevel: true,
                IsActive: true,
                SortOrder: true,
              },
            },
          },
        },
      },
      orderBy: {
        Created: 'asc',
      },
    });

    return aliens.map(({ AlienAlienPowers, ...alien }) => ({
      ...alien,
      PowerList: AlienAlienPowers.map(({ AlienPower, IsMainPower }) => ({
        ...AlienPower,
        IsMainPower,
      })),
    }));
  }

  // GET /aliens/:alienId
  async findById(alienId: number) {
    const alien = await this.prisma.alien.findUnique({
      where: {
        AlienId: alienId,
      },
      include: {
        AlienAlienPowers: {
          include: {
            AlienPower: true,
          },
        },
      },
    });

    if (!alien) {
      throw new NotFoundException(
        `Alien with ID ${alienId} not found`,
      );
    }

    return this.withPowerList(alien);
  }

  private withPowerList({ AlienAlienPowers, ...alien }: AlienWithPowers) {
    return {
      ...alien,
      PowerList: AlienAlienPowers.map(({ AlienPower, IsMainPower }) => ({
        ...AlienPower,
        IsMainPower,
      })),
    };
  }
}