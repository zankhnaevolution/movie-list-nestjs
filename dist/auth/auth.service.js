"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const bcrypt = require("bcrypt");
const jwt_1 = require("@nestjs/jwt");
const user_schema_1 = require("../schema/user.schema");
const constants_1 = require("./constants");
let AuthService = class AuthService {
    constructor(UserModel, jwtService) {
        this.UserModel = UserModel;
        this.jwtService = jwtService;
    }
    generateAccessToken(payload) {
        return this.jwtService.sign(payload, {
            expiresIn: constants_1.jwtConstants.accessTokenExpireTime
        });
    }
    generateRefreshToken(payload) {
        return this.jwtService.sign(payload, {
            expiresIn: constants_1.jwtConstants.refreshTokenExpireTime
        });
    }
    async create(createAuthDto) {
        const existed = await this.UserModel.findOne({
            email: createAuthDto.email
        });
        if (existed) {
            throw new common_1.BadRequestException('User already Exists');
        }
        const salt = await bcrypt.genSalt();
        const encrytedPassword = await bcrypt.hash(createAuthDto.password, salt);
        const user = new this.UserModel({ ...createAuthDto, password: encrytedPassword });
        await user.save();
    }
    async findOne(email, password) {
        const user = await this.UserModel.findOne({
            email
        });
        if (user) {
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                throw new common_1.BadRequestException("Email or Password is wrong");
            }
            const payload = { id: user._id, email };
            return {
                access_token: this.generateAccessToken(payload),
                refresh_token: this.generateRefreshToken(payload)
            };
        }
        else {
            throw new common_1.BadRequestException("Email or Password is wrong");
        }
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map