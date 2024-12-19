/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AdminAuthModule } from '../auth/auth.module';
import { AuthService } from '../auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { JwtStrategy } from '../../passport/jwt.strategy';
import { AdminRoleService } from './role.service';
import { AdminRoleController } from './role.controller';
@Module({
  imports: [
    AdminAuthModule
  ],
  providers: [AdminRoleService, AuthService, JwtService, JwtStrategy],
  controllers: [AdminRoleController],
})
export class AdminRoleModule { }
