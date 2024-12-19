/* eslint-disable prettier/prettier */
import {
  BadGatewayException,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import mongoose from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { bcryptCompareData, bcryptHashingData } from '../../helpers/bcrypt';
import { jwtDecode } from 'jwt-decode';
import { ConfigService } from '@nestjs/config';
import { loginDto } from '../../dtos/authDto/login.dto';
import { changePasswordDto } from '../../dtos/authDto/changePassword.dto';
import { refreshAccessToken } from '../../dtos/authDto/refreshAccessToken.dto';
import { Teacher } from '../../schema/teacher.schema';
import { Admin } from '../../schema/admin.schema';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Admin.name)
    private readonly teacherModel: mongoose.Model<Admin>,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) { }

  async login(loginDto: loginDto, req: any) {
    const { email, password } = loginDto;
    const user = await this.teacherModel.findOne({ email });
    if (!user?.activeStatus) {
      throw new UnauthorizedException(
        'Please first active your account and then login',
      );
    }
    if (!user) {
      throw new UnauthorizedException('Invalid Credentials');
    }
    const isPasswordMatch = await bcryptCompareData(password, user.password);
    if (!isPasswordMatch.status) {
      throw new UnauthorizedException('Invalid Credentials');
    }
    req.user = user
    const tokens = await this.getTokens(user._id, user.username);

    return { tokens };
  }

  async changePassword(
    changePassDto: changePasswordDto,
    req: any,
  ): Promise<{ message: string }> {
    const { oldPassword, password, confirmPassword } = changePassDto;
    const currentUser = req.user;
    if (password !== confirmPassword) {


      throw new BadGatewayException('Please put the correct confirm password');
    }
    const user = await this.teacherModel.findById(req.user._id);

    if (!user) {
      throw new UnauthorizedException('Invalid Credentials');
    }
    const compareOldPass = await bcryptCompareData(
      oldPassword,
      currentUser.password,
    );
    if (!compareOldPass.status) {
      throw new UnauthorizedException('Please put the correct old password');
    }
    const hashPassword = await bcryptHashingData(password);
    user.password = await hashPassword;
    await user.save();
    return { message: 'password changed' };
  }

  async refreshToken(
    refreshAccessToken: refreshAccessToken,
  ): Promise<{ tokens: string }> {
    const { token } = refreshAccessToken;
    const { id }: mongoose.Types.ObjectId = await jwtDecode(token);

    const user = await this.teacherModel.findById(id);

    if (!user) {
      throw new UnauthorizedException('un authorized');
    }
    const tokens = await this.jwtService.sign({
      id: user._id,
      username: user.username,
    });

    return { tokens };
  }

  async getTokens(userId: any, username: string) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          id: userId,
          username,
        },
        {
          secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
          expiresIn: this.configService.get<string>('JWT_ACCESS_EXPIRE'),
        },
      ),
      this.jwtService.signAsync(
        {
          id: userId,
          username,
        },
        {
          secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
          expiresIn: this.configService.get<string>('JWT_REFRESH_EXPIRE'),
        },
      ),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  async activeUserAccount(token: string): Promise<{ message: string }> {
    const decodeToken = await this.jwtService.decode(token);

    const activeUser = await this.teacherModel.findByIdAndUpdate(
      decodeToken.userId,
      {
        activeStatus: true,
      },
    );
    if (activeUser) {
      return { message: 'Thank you for activating your account' };
    }
  }
}
