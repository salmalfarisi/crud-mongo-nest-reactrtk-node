import { Long } from "mongodb";
import mongoose from "mongoose";
import {
  IsEmail,
  IsEmpty,
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateCrudDto {
	_id: mongoose.Types.ObjectId;
  
	@IsString()
	@IsNotEmpty()
	title: string;  

	@IsString()
	@IsNotEmpty()
	description: string;

	@IsOptional()
	createdAt: Date;

	@IsOptional()
	updatedAt: Date;

	@IsOptional()
	is_delete: Boolean;
}
