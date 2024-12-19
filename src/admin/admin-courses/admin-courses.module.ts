/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AdminAuthModule } from '../auth/auth.module';
import { AuthService } from '../auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { JwtStrategy } from 'src/passport/jwt.strategy';
import { AdminCoursesService } from './admin-courses.service';
import { AdminCoursesController } from './admin-courses.controller';
@Module({
  imports: [
    AdminAuthModule
  ],
  providers: [AdminCoursesService, AuthService, JwtService, JwtStrategy],
  controllers: [AdminCoursesController],
})
export class AdminCourseModule { }
