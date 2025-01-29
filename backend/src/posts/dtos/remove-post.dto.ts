import { IsNotEmpty } from 'class-validator';

export class RemovePostDto {
  @IsNotEmpty()
  id: string;
}