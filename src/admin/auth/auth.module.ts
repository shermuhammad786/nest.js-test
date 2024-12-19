/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { EmailService } from '../../email/email.service';
import { JwtStrategy } from '../../passport/jwt.strategy';
import { adminSchema } from '../../schema/admin.schema';
import { roleSchema } from '../../schema/role.schema';
import { teacherSchema } from '../../schema/teacher.schema';
import { AdminRoleService } from '../role/role.service';
import { studentSchema } from '../../schema/student.schema';
import { courseSchema } from '../../schema/course.schema';
import { assignmentSchema } from '../../schema/assignment.schema';


@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Teacher', schema: teacherSchema },
      { name: 'Student', schema: studentSchema },
      { name: 'Role', schema: roleSchema },
      { name: 'Admin', schema: adminSchema },
      { name: 'Course', schema: courseSchema },
      { name: 'Assignment', schema: assignmentSchema },
    ]),
  ],

  providers: [AuthService, MongooseModule, EmailService, JwtStrategy, JwtService, ConfigService, AdminRoleService],
  controllers: [AuthController],
  exports: [MongooseModule, EmailService, JwtStrategy, JwtService, ConfigService, AdminRoleService],
})
export class AdminAuthModule { }
