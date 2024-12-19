/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { loginDto } from 'src/dtos/authDto/login.dto';
import { AuthGuard } from '@nestjs/passport';
import { changePasswordDto } from 'src/dtos/authDto/changePassword.dto';
import { refreshAccessToken } from 'src/dtos/authDto/refreshAccessToken.dto';

@Controller('api/admin/auth')
export class AuthController {
  constructor(private serviceModel: AuthService) { }

  @Post('login')
  login(@Body() body: loginDto, @Req() req: Request) {
    return this.serviceModel.login(body, req);
  }

  @Put('change/password')
  @UseGuards(AuthGuard('jwt'))
  changePassword(
    @Body() body: changePasswordDto,
    @Req() req: any,
  ): Promise<{ message: string }> {
    return this.serviceModel.changePassword(body, req);
  }

  @Post('refresh/token')
  refreshToken(@Body() body: refreshAccessToken): Promise<{ tokens: string }> {
    return this.serviceModel.refreshToken(body);
  }
  @Get('active/user/:token')
  activeUserAccount(@Param() { token }) {
    return this.serviceModel.activeUserAccount(token);
  }
}
