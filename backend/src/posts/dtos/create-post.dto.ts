import { IsNotEmpty } from 'class-validator';

export class CreatePostDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  previewSrc: string;

  @IsNotEmpty()
  body: string;

  @IsNotEmpty()
  profileId: string;
}