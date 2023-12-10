import { Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { InjectModel, InjectConnection } from '@nestjs/mongoose';
import { Model, ObjectId, Types } from 'mongoose';
import { UserSchema, Users, UsersDocument } from './schema/users.schema';
import { LoginDTO } from './dto/users.dto';
import { ConfigModule } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import * as mongo from 'mongoose';
import { UtilityService } from '../utility/utility.service';

@Injectable()
export class AuthService{
	constructor(
		@InjectModel(Users.name, process.env.DATABASE)
		private readonly userMM: Model<UsersDocument>,
		private readonly Util: UtilityService,
		private readonly jwtService: JwtService,
		@InjectConnection() private readonly connection: mongo.Connection,
	) { }

	async authentication(token:string)
	{
		//console.log(decrypt.exp);
		try
		{
			var decrypt = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
			
			var cekdata = await this.userMM.findOne(
				{
					username: decrypt.username,
				}
			).exec();
			
			console.log(decrypt);
			console.log(cekdata);
			
			//error handling bermasalah. cek lagi nanti
			if(cekdata == null)
			{
				throw new UnauthorizedException('user not found');
			}
			else
			{
				if(cekdata.tokenexpired != null)
				{
					var datenow = await this.Util.setDatenow();
		
					var convertunix = Math.floor(datenow.getTime() / 1000);
					var selisih = decrypt.exp - convertunix;
					
					var tokentime = new Date(decrypt.exp * 1000);
					var formattoken = tokentime.getFullYear() + "-" + tokentime.getMonth() + "-" + tokentime.getDate() + " " + tokentime.getHours() + ":" + tokentime.getMinutes() + ":" + tokentime.getSeconds();
					if(selisih < 0)
					{
						// await this.logout(token);
						throw new UnauthorizedException('Unauthorize. Login again');
						return {
							response_code:403,
							messsage:"Unauthorize. Login again"
						}
					}
					else
					{
						return true;
					}
				}
				else
				{
					//harusnya nongol error ini!!
					throw new UnauthorizedException('Unauthorize. Login again');
				}
			}
		}
		catch(e)
		{
			throw new UnauthorizedException('Wrong Token');
		}
	}
	
	async login(data:LoginDTO)
	{
		var cekdata = await this.userMM.findOne(
			{
				username: data.username,
			}
		).exec();
		
		if(cekdata == null)
		{
			throw new UnauthorizedException('user not found');
		}
		else
		{
			var cekvalid = await bcrypt.compare(data.password, cekdata.password);
			if(cekvalid == true)
			{
				const payload = { username: data.username, sub: cekdata._id };
				var result = await this.jwtService.sign(payload);
				//console.log(result);
				var outputdata = {
					'username':cekdata.username,
					'email':cekdata.email,
					'name':cekdata.name,
					'token': 'Bearer ' + result
				};

				var decodejwt = await this.jwtService.decode(result);
				
				var tokentime = new Date(decodejwt['exp'] * 1000);
				var formattoken = tokentime.getFullYear() + "-" + tokentime.getMonth() + "-" + tokentime.getDate() + " " + tokentime.getHours() + ":" + tokentime.getMinutes() + ":" + tokentime.getSeconds();

				var updatedata = await this.userMM.updateOne(
					{
						"_id":cekdata._id
					},
					{
						"$set":
						{
							"token":"Bearer " + result,
							"tokenexpired": formattoken
						}
					}
				).exec();
				
				return outputdata;
			}
			else
			{
				return false;
			}
		}
	}
	
	async logout(token:string)
	{
		var decrypt = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
		var result = await this.userMM.updateOne(
			{
				"username":decrypt.username
			},
			{
				"$set":
				{
					token:null,
					tokenexpired:null
				}
			}
		).limit(1).exec();
		
		return true;
	}
}