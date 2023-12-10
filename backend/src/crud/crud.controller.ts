import { Controller, Get, Post, Body, Patch, Put, Param, Delete, UnauthorizedException, Headers } from '@nestjs/common';
import { CrudService } from './crud.service';
import { CreateCrudDto } from './dto/create-crud.dto';
import { AuthService } from '../user/auth.service';
import { UtilityService } from '../utility/utility.service';
import * as mongo from 'mongoose';

@Controller('api/crud')
export class CrudController {
  constructor(
	private readonly crudService: CrudService,
	private readonly authService: AuthService,
	private readonly utilService: UtilityService
  ) {}

  @Post('create')
  async create(@Headers() headers, @Body() createCrudDto: CreateCrudDto) {
    var token = headers['authorization'];
	var result = await this.authService.authentication(token);
	if(result == true)
	{
		createCrudDto._id = new mongo.Types.ObjectId();
		createCrudDto.createdAt = await this.utilService.setDatenow();
		createCrudDto.updatedAt = await this.utilService.setDatenow();
		createCrudDto.is_delete = false;
		await this.crudService.create(createCrudDto);
		return {
			response:202,
			message:"success",
			data:createCrudDto
		}
	}
	else
	{
		throw new UnauthorizedException('Cannot get data');
	}
  }

  @Get()
  async findAll(@Headers() headers) {
    var token = headers['authorization'];
	var result = await this.authService.authentication(token);
	if(result == true)
	{
		var data = await this.crudService.findAll();
		return {
			response:202,
			message:"success",
			data:data
		}
	}
	else
	{
		throw new UnauthorizedException('Cannot get data');
	}
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.crudService.findOne(id);
  }

  @Put('update/:id')
  async update(@Param('id') id: string, @Headers() headers, @Body() createCrudDto: CreateCrudDto) {
    var token = headers['authorization'];
	var result = await this.authService.authentication(token);
	if(result == true)
	{
		createCrudDto.updatedAt = await this.utilService.setDatenow();
		await this.crudService.update(id, createCrudDto);
		var data = await this.crudService.findOne(id);
		return {
			response:202,
			message:"success",
			data:data
		}
	}
	else
	{
		throw new UnauthorizedException('Cannot update data');
	}
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Headers() headers) {
    var token = headers['authorization'];
	var result = await this.authService.authentication(token);
	if(result == true)
	{
		var data = await this.crudService.findOne(id);
		data.is_delete = true;
		data.updatedAt = await this.utilService.setDatenow();
		await this.crudService.update(id, data);
		return {
			response:202,
			message:"success"
		}
	}
	else
	{
		throw new UnauthorizedException('Cannot delete data');
	}
  }
}
