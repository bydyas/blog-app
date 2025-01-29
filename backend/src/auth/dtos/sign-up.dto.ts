import { Type } from 'class-transformer';
import { IsNotEmpty, ValidateNested, IsStrongPassword, IsEmail, MinLength } from 'class-validator';

class Profile {
  @IsNotEmpty()
  @MinLength(1)
  firstName: string;

  @IsNotEmpty()
  @MinLength(1)
  lastName: string;
}

export class SignUpDto {
  @IsNotEmpty()
  @MinLength(2)
  username: string;

  @IsNotEmpty()
  @IsStrongPassword({
    minLength: 6,
    minUppercase: 1,
    minSymbols: 1,
  })
  password: string;

  @Type(() => Profile)
  @ValidateNested()
  profile: Profile;
}