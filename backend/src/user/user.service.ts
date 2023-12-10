import { Injectable, InternalServerErrorException, UnauthorizedException, NotAcceptableException } from '@nestjs/common';
import { InjectModel, InjectConnection } from '@nestjs/mongoose';
import { Model, ObjectId, Types } from 'mongoose';
import { UserSchema, Users, UsersDocument } from './schema/users.schema';
import { CreateUsersDto } from './dto/users.dto';
import { ConfigModule } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import * as mongo from 'mongoose';
import { UtilityService } from '../utility/utility.service';

@Injectable()
export class UserService {
	constructor(
		@InjectModel(Users.name, process.env.database)
		private readonly userMM: Model<UsersDocument>,
		private readonly Util: UtilityService,
		@InjectConnection() private readonly connection: mongo.Connection,
	) { }
	
	// async create(data:CreateUsersDto){
		// const trx = await this.connection.startSession();
		// const starttrx = await trx.startTransaction();
		// try
		// {
			// data._id = new mongo.Types.ObjectId();
			// var getpassword = data.password;
			// const saltOrRounds = 10;
			// data.password = await bcrypt.hash(getpassword, saltOrRounds);
			// data.createdAt = await this.Util.setDatenow();
			// data.updatedAt = await this.Util.setDatenow();
			// await this.userMM.create([data], { session:starttrx });
			// // var result = await this.userMM.create(data);
			
			// data._id = new mongo.Types.ObjectId("654f8066aa2e56a553d9bd05");
			// var getpassword = data.password;
			// // const saltOrRounds = 10;
			// data.password = await bcrypt.hash(getpassword, saltOrRounds);
			// data.createdAt = await this.Util.setDatenow();
			// data.updatedAt = await this.Util.setDatenow();
			// await this.userMM.create([data], { session:starttrx });
			// // var result = await this.userMM.create(data);
			
			// await trx.commitTransaction();
			// return true;
		// }
		// catch(e)
		// {
			// await trx.abortTransaction();
			// throw new InternalServerErrorException();
		// }
		// finally
		// {
			// trx.endSession();
		// }
	// }
	
	async create(data:CreateUsersDto){
		const trx = await this.connection.startSession();
		const starttrx = await trx.startTransaction();
		try
		{
			var cekdata = await this.userMM.findOne(
				{
					"$or":
					[
						{
							username: 
							{
								"$regex":data.username,
								"$options":"i"
							},
						},
						{
							email: data.email,
						}
					]
				}
			).exec();
			
			if(cekdata != null)
			{
				throw new NotAcceptableException('data already exist!!');
			}
		
			data._id = new mongo.Types.ObjectId();
			var getpassword = data.password;
			const saltOrRounds = 10;
			data.password = await bcrypt.hash(getpassword, saltOrRounds);
			data.createdAt = await this.Util.setDatenow();
			data.updatedAt = await this.Util.setDatenow();
			await this.userMM.create([data], { session:starttrx });
			// var result = await this.userMM.create(data);
			
			await trx.commitTransaction();
			return {
				message:"successfully create account"
			};
		}
		catch(e)
		{
			await trx.abortTransaction();
			throw new InternalServerErrorException(e);
		}
		finally
		{
			trx.endSession();
		}
	}
	
	async findOne(id: string)
	{
		return await this.userMM.findOne({ id: id }).exec();
	}

	async findOneByUsername(target: string)
	{
		return await this.userMM.findOne({ username: target }).exec();
	}
	
	async updateOne(id: string, data:CreateUsersDto)
	{
		return await this.userMM.updateOne({ id: id }, data).exec();
	}
	
	
}
