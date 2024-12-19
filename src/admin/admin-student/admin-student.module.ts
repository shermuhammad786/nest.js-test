/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';

import { AdminAuthModule } from '../auth/auth.module';
import { AuthService } from '../auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { JwtStrategy } from 'src/passport/jwt.strategy';
import { AdminStudentService } from './admin-student.service';
import { AdminStudentController } from './admin-student.controller';

@Module({
  imports: [
    AdminAuthModule
  ],
  providers: [AdminStudentService, AuthService, JwtService, JwtStrategy],
  controllers: [AdminStudentController],
})
export class AdminStudentModule { }
