import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsInt,
  IsOptional,
  IsString,
  MaxLength,
  Min,
  ValidateNested,
} from 'class-validator';

export class CreateAlienPowerAssignmentDto {
  @ApiProperty()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  AlienPowerId: number;

  @ApiPropertyOptional({ default: false })
  @IsOptional()
  @IsBoolean()
  IsMainPower?: boolean;
}

export class CreateAlienDto {
  @ApiProperty()
  @IsString()
  @MaxLength(100)
  AlienName: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  Species?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  HomePlanet?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  Description?: string;

  @ApiPropertyOptional({ default: 0 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  EnergyConsumption?: number;

  @ApiPropertyOptional({ default: 0 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  Strength?: number;

  @ApiPropertyOptional({ default: 0 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  Speed?: number;

  @ApiPropertyOptional({ default: 0 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  Intelligence?: number;

  @ApiPropertyOptional({ default: 0 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  Accuracy?: number;

  @ApiPropertyOptional({ default: 1 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  AlienLevel?: number;

  @ApiPropertyOptional({ default: false })
  @IsOptional()
  @IsBoolean()
  Unlocked?: boolean;

  @ApiPropertyOptional({ default: true })
  @IsOptional()
  @IsBoolean()
  IsActive?: boolean;

  @ApiPropertyOptional({ default: 0 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  SortOrder?: number;

  @ApiPropertyOptional({ type: [CreateAlienPowerAssignmentDto] })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateAlienPowerAssignmentDto)
  PowerList?: CreateAlienPowerAssignmentDto[];
}
