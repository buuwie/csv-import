import { Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/entity/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from "bcryptjs";
import { LoginUserDto } from 'src/dto/loginUser.dto';
import { RegisterUserDto } from 'src/dto/registerUser.dto';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserEntity)
        private repo: Repository<UserEntity>, private jwt: JwtService
    ) {}

    async getUser () {
        return this.repo.find();
    }

    async loginUser (loginUserDto: LoginUserDto) {
        const { username, password } = loginUserDto;
        const user = await this.repo.findOne({ where: {username} });
        if (!user) {
            throw new UnauthorizedException('Invalid credentials.');
        }
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (passwordMatch) {
            const jwtPayload = {username};
            const jwtToken = await this.jwt.signAsync(jwtPayload, {expiresIn: '1d', algorithm: 'HS512'});
            return {token: jwtToken, message: 'Login successfully'};
        }
        else {
            throw new UnauthorizedException('Invalid credentials.');
        }
    }

    async createUser (registerUserDto: RegisterUserDto) {
        const { username, password} = registerUserDto;
        const hash = await bcrypt.hash(password, 12);
        const salt = await bcrypt.getSalt(hash);

        const user = new UserEntity();
        user.username = username;
        user.password = hash;
        user.salt = salt;

        this.repo.create(user);
        try {
            return await this.repo.save(user);
        } catch (error) {
            throw new InternalServerErrorException('Something went wrong')
        }
    }
}
