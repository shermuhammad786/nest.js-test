/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AdminAuthModule } from '../auth/auth.module';
import { AuthService } from '../auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { JwtStrategy } from '../../passport/jwt.strategy';
import { AdminTeacherService } from './admin-teacher.service';
import { AdminTeacherController } from './admin-teacher.controller';
@Module({
  imports: [
    AdminAuthModule
  ],
  providers: [AdminTeacherService, AuthService, JwtService, JwtStrategy],
  controllers: [AdminTeacherController],
})
export class AdminTeacherModule { }
