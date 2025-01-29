import { IsNotEmpty } from 'class-validator';

export class UpdatePostDto {
  @IsNotEmpty()
  id: string;

  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  previewSrc: string;

  @IsNotEmpty()
  body: string;
}