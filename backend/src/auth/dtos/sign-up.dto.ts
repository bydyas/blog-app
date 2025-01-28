import { Type } from 'class-transformer';
import { IsNotEmpty, ValidateNested } from 'class-validator';

class Profile {
  email: string;
  firstName: string;
  lastName: string;
}

export class SignUpDto {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  password: string;

  @Type(() => Profile)
  @ValidateNested()
  profile: Profile;
}