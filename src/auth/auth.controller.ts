import { Controller, Post, Body, HttpCode, UseGuards, Get, Res, Req, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { ApiCookieAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';

@ApiTags('User')
@Controller()
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private jwtService: JwtService
  ) {}

  @Get('')
  getHello(){
    return "Hello World!!!"
  }

  @Post('signup')
  @HttpCode(200)
  create(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.create(createAuthDto);
  }

  @Post('signin')
  async findOne(
    @Body() createAuthDto: CreateAuthDto,
    @Res() res: Response
  ) {
    let authTokens = await this.authService.findOne(createAuthDto.email, createAuthDto.password);
  
    if(authTokens){
      // res.cookie("refresh_token", authTokens.refresh_token, {
      //   httpOnly: true,
      //   secure: true,
      //   sameSite: "strict",
      //   maxAge: 15 * 24 * 60 * 60 * 1000,
      // })
  
      // return res.json({ access_token: authTokens.access_token });
      return res.json(authTokens);
    }else{
      throw new UnauthorizedException();
    }
  }

  // @ApiCookieAuth()
  // @Get('refresh_token')
  @Post('refresh_token')
  @ApiResponse({
    status: 401,
    description: 'Must Provide valid refresh_token cookie'
  })
  @ApiResponse({
    status: 200,
    description: 'Returns access_token and update cookie with latest refresh_token'
  })
  refreshToken(
    @Body() body,
    @Req() req: Request,
    @Res() res: Response
  ){
    // const refreshToken = req.cookies['refresh_token'];
    const refreshToken = body.refresh_token;
    if(!refreshToken) throw new UnauthorizedException();

    try{
      let payload = this.jwtService.verify(refreshToken);
      
      let originalPayload = { id: payload.id, email: payload.email };
  
      // res.cookie('refresh_token', this.authService.generateRefreshToken(originalPayload), {
      //   httpOnly: true,
      //   secure: true,
      //   sameSite: 'strict',
      //   maxAge: 15 * 24 * 60 * 60 * 1000
      // });
  
      return res.json({ access_token: this.authService.generateAccessToken(originalPayload), refresh_token: this.authService.generateRefreshToken(originalPayload) });
    }catch(error){
      throw new UnauthorizedException();
    }
  }
}
