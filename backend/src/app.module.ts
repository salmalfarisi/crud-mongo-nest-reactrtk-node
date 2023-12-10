import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { CrudModule } from './crud/crud.module';

@Module({
  imports: [
	ConfigModule.forRoot(),
	MongooseModule.forRoot(process.env.DATABASE),
	UserModule,
	CrudModule, 
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
