import { Body, Controller, Delete, Get, Param, Post, Put, Res, HttpStatus, Response, Request, Req, BadRequestException, NotAcceptableException, Headers, UnauthorizedException } from '@nestjs/common';
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
	data.username = data.username.toLowerCase();
	data.email = data.email.toLowerCase();
	var checkexist = await this.userSS.checkExist(data.username, data.email);
	if(checkexist == false)
	{
		throw new NotAcceptableException('username or email already created in database');
	}
  
    var result = true;//await this.userSS.create(data);
	return {
		response:202,
		data:result
	}
  }
  
  @Post('login')
  async login(@Body() data: LoginDTO, @Res({ passthrough:true }) res) {
    var result = await this.authSS.login(data);
	if(result == false)
	{
		throw new BadRequestException('Username or Password not correct');
	}
	
	res.cookie('token', result.token);
	return {
		response:202,
		data:result
	}
  }
  
  @Get('logout')
  async logout(@Headers() headers, @Req() req){
	await this.authSS.authentication(req.cookies.token);
	return {
		response: 202,
		message:"Successfully Logout"
	};
  }
  
  @Get('RefreshToken')
  async refreshToken(@Req() req, @Res({ passthrough:true }) res)
  {
	var result = await this.authSS.refreshToken(req.cookies.token);
	if(result == false)
	{	
		throw new UnauthorizedException('Unauthorize. Login again');
	}
	else
	{
		res.cookie('token', result.token);
		return {
			response: 202,
			data:result
		}
	}
  }
  
  @Get('detail')
  async detailByToken(@Req() req, @Res({ passthrough:true }) res)
  {
	console.log(await this.utilSS.setDatenow());
	await this.authSS.authentication(req.cookies.token);
	var data = await this.userSS.detailByToken(req.cookies.token);
	return {
		response: 202,
		data:data
	}
  }
  
  @Get('test')
  async tes(@Req() req, @Res({ passthrough:true }) res)
  {
	res.cookie('tokenBARU', "success");
	return {
		response:202,
		message:"success"
	}
  }

}
