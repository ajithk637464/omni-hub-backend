import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class AlienPowerListItemDto {
  @ApiProperty()
  AlienPowerId: number;

  @ApiProperty()
  AlienPowerGuid: string;

  @ApiProperty()
  AlienPowerName: string;

  @ApiPropertyOptional({ nullable: true })
  Description: string | null;

  @ApiProperty()
  PowerType: string;

  @ApiProperty()
  PowerLevel: number;

  @ApiProperty()
  IsActive: boolean;

  @ApiProperty()
  SortOrder: number;

  @ApiProperty()
  IsMainPower: boolean;
}

export class AlienListResponseDto {
  @ApiProperty()
  AlienId: number;

  @ApiProperty()
  AlienGuid: string;

  @ApiProperty()
  AlienName: string;

  @ApiPropertyOptional({ nullable: true })
  Species: string | null;

  @ApiPropertyOptional({ nullable: true })
  HomePlanet: string | null;

  @ApiPropertyOptional({ nullable: true })
  Description: string | null;

  @ApiProperty()
  AlienLevel: number;

  @ApiProperty()
  Unlocked: boolean;

  @ApiProperty({ type: [AlienPowerListItemDto] })
  PowerList: AlienPowerListItemDto[];
}
