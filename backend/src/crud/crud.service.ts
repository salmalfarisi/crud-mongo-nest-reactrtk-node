import { Injectable } from '@nestjs/common';
import { CreateCrudDto } from './dto/create-crud.dto';
import { UtilityService } from '../utility/utility.service';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId, Types } from 'mongoose';
import { ConfigModule } from '@nestjs/config';
import { CrudSchema, Crud, CrudDocument } from './schema/crud.schema';
import * as mongo from 'mongoose';

@Injectable()
export class CrudService {
  constructor(
		@InjectModel(Crud.name)
		private readonly dataMM: Model<CrudDocument>,
		private readonly Util: UtilityService
  ) { }
  
  async create(createCrudDto: CreateCrudDto) {
    return await this.dataMM.create(createCrudDto);
  }

  async findAll() {
    return await this.dataMM.find({ is_delete:false }).exec();
  }

  async findOne(id: string) {
	var convert = new mongo.Types.ObjectId(id);
    return await this.dataMM.findOne({ _id: convert });
  }

  async update(id: string, updateCrudDto: CreateCrudDto) {
    var convert = new mongo.Types.ObjectId(id);
	return await this.dataMM.updateOne(
										{ 
										  _id: convert 
										}, 
										updateCrudDto
									  );
  }

  async remove(id: string) {
	var convert = new mongo.Types.ObjectId(id);
    return await this.dataMM.updateOne(
										{
										  _id:convert
										},
										{
										  "$set":
										  {
										    "is_delete":true
										  }
										}
									  );
  }
}
