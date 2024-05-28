import { IsAlphanumeric, IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CarDto {
  @IsNotEmpty()
  @IsAlphanumeric()
  model: string;

  @IsNotEmpty()
  @IsString()
  color: string;

  @IsNotEmpty()
  @IsAlphanumeric()
  registration_no: string;

  @IsNotEmpty()
  @IsUUID()
  category_id: string;
}

export class CarIdDto {
  @IsNotEmpty()
  @IsUUID()
  id: string;
}
