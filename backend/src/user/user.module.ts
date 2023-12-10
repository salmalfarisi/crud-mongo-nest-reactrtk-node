import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthService } from './auth.service';
import { UserController } from './user.controller';
import { UtilityModule } from '../utility/utility.module';
import { ConfigModule } from '@nestjs/config';
import { Users, UserSchema } from './schema/users.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
	ConfigModule.forRoot(),
	MongooseModule.forFeature([{ name: Users.name, schema: UserSchema }]),
	JwtModule.register({
		secret: process.env.KEYGEN,
		signOptions: { expiresIn: '46800s' },
		// signOptions: { expiresIn: '10s' },
	}),
	UtilityModule,
  ],
  controllers: [UserController],
  providers: [UserService, AuthService],
  exports: [AuthService]
})
export class UserModule {}
