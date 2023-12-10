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

export class CreateUsersDto {
    _id: mongoose.Types.ObjectId;
	
	@IsString()
	@IsNotEmpty()
	name: string;
	
	@IsString()
	@IsNotEmpty()
	@MaxLength(50)
	username: string;
	
	@IsNotEmpty()
	@IsEmail()
	email: string;
	
	@IsString()
	@IsNotEmpty()
	password: string;
	
	@IsEmpty()
	token: string;
	
	@IsEmpty()
	tokenexpired: Date;
	
	@IsEmpty()
	createdAt: Date;
	@IsEmpty()
	updatedAt: Date;
	
	@IsOptional()
	@IsBoolean()
	active: Boolean;
}

export class LoginDTO {
	@IsNotEmpty()
	@IsString()
	username: string;
	
	@IsString()
	@IsNotEmpty()
	password: string;
}