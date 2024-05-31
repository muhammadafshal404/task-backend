import { MESSAGES } from 'src/utils/constant';
import { IsNotEmpty, IsString, Matches } from 'class-validator';

export class createCategoryDto {
  @IsNotEmpty()
  @IsString()
  @Matches(/^[a-zA-Z0-9\s]+$/, {
    message: MESSAGES.ONLY_ALPHANUMERIC_VALUES_AND_SPACE_ALLOWED,
  })
  name: string;
}
