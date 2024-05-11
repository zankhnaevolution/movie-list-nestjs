import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
// import { User, UserDocument } from 'src/schema/user.schema';
import { User, UserDocument } from '../../src/schema/user.schema';
import { CreateAuthDto } from './dto/create-auth.dto';
import { jwtConstants } from './constants';

@Injectable()
export class AuthService {

  constructor(
    @InjectModel(User.name) private readonly UserModel: Model <User>,
    private jwtService: JwtService
  ) {}

  generateAccessToken(payload: object){
    return this.jwtService.sign(
      payload, {
        expiresIn: jwtConstants.accessTokenExpireTime
      })
  }

  generateRefreshToken(payload: object){
    return this.jwtService.sign(
      payload, {
        expiresIn: jwtConstants.refreshTokenExpireTime
      }
    );
  }

  async create(createAuthDto: CreateAuthDto): Promise < any > {

    const existed = await this.UserModel.findOne({
      email: createAuthDto.email
    });

    if(existed){
      throw new BadRequestException('User already Exists');
    }

    const salt = await bcrypt.genSalt();
    const encrytedPassword = await bcrypt.hash(createAuthDto.password, salt);
    const user = new this.UserModel({ ...createAuthDto, password: encrytedPassword });
    await user.save();
  }

  async findOne(email: string, password: string): Promise < any > {
    
    const user = await this.UserModel.findOne({
      email
    });

    if(user){
      const isMatch = await bcrypt.compare(password, user.password);
      if(!isMatch){
        throw new BadRequestException("Email or Password is wrong");
      }

      const payload = { id: user._id, email };
      return {
        access_token: this.generateAccessToken(payload),
        // access_token: await this.generateAccessToken(payload),
        refresh_token: this.generateRefreshToken(payload)
      }
    }else{
      throw new BadRequestException("Email or Password is wrong");
    }
  }
}