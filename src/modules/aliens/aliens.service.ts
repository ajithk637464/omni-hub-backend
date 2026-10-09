import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { Prisma } from '../../generated/prisma/client';
import { PrismaService } from '../../database/prisma/prisma.service';
import { AlienListResponseDto } from './dto/alien-list-response.dto';
import { CreateAlienDto } from './dto/create-alien.dto';
import { UpdateAlienDto } from './dto/update-alien.dto';

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

  // POST /aliens
  async create({ PowerList, ...alienData }: CreateAlienDto) {
    await this.validatePowerList(PowerList);

    const alien = await this.prisma.alien.create({
      data: {
        ...alienData,
        AlienAlienPowers: {
          create: PowerList?.map(({ AlienPowerId, IsMainPower }) => ({
            IsMainPower: IsMainPower ?? false,
            AlienPower: {
              connect: {
                AlienPowerId,
              },
            },
          })),
        },
      },
      include: {
        AlienAlienPowers: {
          include: {
            AlienPower: true,
          },
        },
      },
    });

    return this.withPowerList(alien);
  }

  // PATCH /aliens/:alienId
  async update(alienId: number, { PowerList, ...alienData }: UpdateAlienDto) {
    const existingAlien = await this.prisma.alien.findUnique({
      where: { AlienId: alienId },
      select: { AlienId: true },
    });

    if (!existingAlien) {
      throw new NotFoundException(`Alien with ID ${alienId} not found`);
    }

    await this.validatePowerList(PowerList);

    const alien = await this.prisma.alien.update({
      where: { AlienId: alienId },
      data: {
        ...alienData,
        ...(PowerList !== undefined && {
          AlienAlienPowers: {
            deleteMany: {},
            create: PowerList.map(({ AlienPowerId, IsMainPower }) => ({
              IsMainPower: IsMainPower ?? false,
              AlienPower: {
                connect: { AlienPowerId },
              },
            })),
          },
        }),
      },
      include: {
        AlienAlienPowers: {
          include: {
            AlienPower: true,
          },
        },
      },
    });

    return this.withPowerList(alien);
  }

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

  private async validatePowerList(
    powerList: CreateAlienDto['PowerList'],
  ): Promise<void> {
    const powerIds = powerList?.map(({ AlienPowerId }) => AlienPowerId) ?? [];
    const uniquePowerIds = [...new Set(powerIds)];

    if (uniquePowerIds.length !== powerIds.length) {
      throw new BadRequestException(
        'PowerList cannot contain duplicate AlienPowerId values',
      );
    }

    if (uniquePowerIds.length === 0) {
      return;
    }

    const existingPowers = await this.prisma.alienPower.findMany({
      where: {
        AlienPowerId: {
          in: uniquePowerIds,
        },
      },
      select: {
        AlienPowerId: true,
      },
    });
    const existingPowerIds = new Set(
      existingPowers.map(({ AlienPowerId }) => AlienPowerId),
    );
    const unknownPowerIds = uniquePowerIds.filter(
      (powerId) => !existingPowerIds.has(powerId),
    );

    if (unknownPowerIds.length > 0) {
      throw new BadRequestException(
        `Unknown AlienPowerId values: ${unknownPowerIds.join(', ')}`,
      );
    }
  }
}