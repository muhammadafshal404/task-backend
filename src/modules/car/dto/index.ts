import {
  IsNotEmpty,
  IsNumberString,
  IsString,
  IsUUID,
  Matches,
} from 'class-validator';
import { MESSAGES } from 'src/utils/constant';

export class CarDto {
  @IsNotEmpty()
  @IsNumberString()
  model: string;

  @IsNotEmpty()
  @IsString()
  color: string;

  @IsNotEmpty()
  @IsString()
  @Matches(/^[a-zA-Z0-9\s]+$/, {
    message: MESSAGES.ONLY_ALPHANUMERIC_VALUES_AND_SPACE_ALLOWED,
  })
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
