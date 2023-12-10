import { Module } from '@nestjs/common';
import { CrudService } from './crud.service';
import { CrudController } from './crud.controller';
import { UtilityModule } from '../utility/utility.module';
import { UserModule } from '../user/user.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { Crud, CrudSchema } from './schema/crud.schema';

@Module({
  imports:[
	ConfigModule.forRoot(),
	MongooseModule.forFeature([{ name: Crud.name, schema: CrudSchema }]),
	UtilityModule,
	UserModule
  ],
  controllers: [CrudController],
  providers: [CrudService],
  exports: [CrudService]
})
export class CrudModule {}
