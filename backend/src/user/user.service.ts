import { Injectable } from '@nestjs/common';
import { InjectModel, InjectConnection } from '@nestjs/mongoose';
import { Model, ObjectId, Types } from 'mongoose';
import { UserSchema, Users, UsersDocument } from './schema/users.schema';
import { CreateUsersDto } from './dto/users.dto';
import { ConfigModule } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import * as mongo from 'mongoose';

@Injectable()
export class UserService {
	// constructor(
		// @InjectModel(Users.name, process.env.DATABASE)
		
		// @InjectConnection() private readonly connection: mongo.Connection,
		// private readonly userMM: Model<UsersDocument>,
	// ) { }
	
	async create(data:CreateUsersDto){
		// const session = await this.connection.startSession();
	}
}
