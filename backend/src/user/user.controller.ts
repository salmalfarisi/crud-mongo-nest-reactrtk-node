import { Body, Controller, Delete, Get, Param, Post, Put, Res, HttpStatus, Response, Request, Req, BadRequestException, Headers, UnauthorizedException } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthService } from './auth.service';
import { CreateUsersDto } from './dto/users.dto';
import { UtilityService } from '../utility/utility.service';
import * as mongo from 'mongoose';
import { LoginDTO } from './dto/users.dto';

@Controller('api/user')
export class UserController {
  constructor(
    private readonly userSS: UserService,
    private readonly utilSS: UtilityService,
    private readonly authSS: AuthService,
  ) { }

  @Post('registration')
  async create(@Body() data: CreateUsersDto) {
    var result = await this.userSS.create(data);
	
	return {
		response:202,
		data:result
	}
  }
  
  @Post('login')
  async login(@Body() data: LoginDTO) {
    var result = await this.authSS.login(data);
	
	return {
		response:202,
		data:result
	}
  }
  
  @Get('logout')
  async logout(@Headers() headers){
	var token = headers['authorization'];
	var result = await this.authSS.authentication(token);
	if(result == true)
	{
		// await this.authSS.logout(token);
		return {
			"message":"Successfully Logout"
		};
	}
	else
	{
		throw new UnauthorizedException('Cannot Logout account');
	}
  }
}
