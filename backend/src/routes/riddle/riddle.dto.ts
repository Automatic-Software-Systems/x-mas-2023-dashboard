import { IsDefined, IsOptional, IsString } from 'class-validator';
import { IntegerType } from 'mongodb';

export class PodcastDTO{
  @IsString()
  @IsDefined()
  name: string;
  @IsString()
  @IsDefined()
  audioUrl:string;
  @IsString()
  @IsDefined()
  imageUrl:string;
  @IsString()
  @IsOptional()
  _id:string;
  enabled:boolean;
  number:IntegerType;
}
