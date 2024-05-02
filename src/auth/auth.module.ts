import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
// import { JwtService, JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/schema/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([ { name: User.name, schema: UserSchema } ]),
  ],
  controllers: [AuthController],
  providers: [
    AuthService
  ],
})
export class AuthModule {}
