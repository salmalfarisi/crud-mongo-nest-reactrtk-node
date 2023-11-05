import { Body, Controller, Delete, Get, Param, Post, Put, Res, HttpStatus, Response, Request, Req, BadRequestException, Headers } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUsersDto } from './dto/users.dto';
import { UtilityService } from '../utility/utility.service';

@Controller('api/user')
export class UserController {
  constructor(
    private readonly userSS: UserService,
    private readonly utilSS: UtilityService,
  ) { }

  @Post('registration')
  async create(@Body() data: CreateUsersDto) {
    await this.userSS.create(data);
  }
}
