import { JwtService } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { Request, Response } from 'express';
export declare class AuthController {
    private readonly authService;
    private jwtService;
    constructor(authService: AuthService, jwtService: JwtService);
    getHello(): string;
    create(createAuthDto: CreateAuthDto): Promise<any>;
    findOne(createAuthDto: CreateAuthDto, res: Response): Promise<Response<any, Record<string, any>>>;
    refreshToken(body: any, req: Request, res: Response): Response<any, Record<string, any>>;
}
