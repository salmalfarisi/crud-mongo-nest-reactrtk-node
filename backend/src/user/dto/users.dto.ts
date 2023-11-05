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
    @IsOptional()
	_id: string;
	
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
	tokenexpired: Date;
	createdAt: Date;
	updatedAt: Date;
}

export class LoginDTO {
	@IsNotEmpty()
	@IsString()
	username: string;
	
	@IsString()
	@IsNotEmpty()
	password: string;
}