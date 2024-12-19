/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';

import { AdminAuthModule } from '../auth/auth.module';
import { AuthService } from '../auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { JwtStrategy } from 'src/passport/jwt.strategy';
import { AdminAssignmentService } from './admin-assignment.service';
import { AdminAssignmentController } from './admin-assignment.controller';

@Module({
  imports: [
    AdminAuthModule
  ],
  providers: [AdminAssignmentService, AuthService, JwtService, JwtStrategy],
  controllers: [AdminAssignmentController],
})
export class AdminAssignmentModule { }
