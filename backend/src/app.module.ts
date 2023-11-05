import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UtilityModule } from './utility/utility.module';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { DataModule } from './data/data.module';

@Module({
  imports: [
	ConfigModule.forRoot(),
	MongooseModule.forRoot(process.env.DATABASE),
	UtilityModule, 
	UserModule, 
	DataModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
