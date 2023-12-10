import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as mongo from 'mongoose';

@Injectable()
export class UtilityService 
{
	async convertID(target:string)
	{
		var id = null;
		if(target == null)
		{
			id = new mongo.Types.ObjectId();			
		}
		else
		{
			id = new mongo.Types.ObjectId(target);
		}
		return id;
	}
	
	async setDatenow()
	{
		var date = new Date();
		date.setHours(date.getHours() + 7);
		var result = date.toISOString();
		return date;
	}
	
	async authentication(token:string)
	{
		var decrypt = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
		var datenow = await this.setDatenow();
		//console.log(datenow);
		//console.log(decrypt.exp);
		var convertunix = Math.floor(datenow.getTime() / 1000);
		var selisih = decrypt.exp - convertunix;
		
		var tokentime = new Date(decrypt.exp * 1000);
		var formattoken = tokentime.getFullYear() + "-" + tokentime.getMonth() + "-" + tokentime.getDate() + " " + tokentime.getHours() + ":" + tokentime.getMinutes() + ":" + tokentime.getSeconds();
		//console.log(datenow);
		//console.log(formattoken);
		if(selisih < 0)
		{
			throw new UnauthorizedException('Unauthorize. Login again');
		}
		else
		{
			
		}
	}
}
