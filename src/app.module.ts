import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { MailerModule } from '@nestjs-modules/mailer';
import { PugAdapter } from '@nestjs-modules/mailer/dist/adapters/pug.adapter';
// import { EmailModule } from './email/email.module';
// import { EmailService } from './email/email.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AdminAuthModule } from './admin/auth/auth.module';
// import { roleSchema } from './schema/role.schema';
// import { teacherSchema } from './schema/teacher.schema';
// import { studentSchema } from './schema/student.schema';
// import { AdminRoleService } from './admin/role/role.service';
// import { AdminRoleModule } from './admin/role/role.module';
// import { AdminAuthModule } from './admin/auth/auth.module';
// import { AdminTeacherModule } from './admin/admin-teacher/admin-teacher.module';
// import { AdminStudentModule, } from './admin/admin-student/admin-student.module';
// import { AdminCourseModule } from './admin/admin-courses/admin-courses.module';
// import { TeacherAuthModule } from './teacher/auth/auth.module';
// import { adminSchema } from './schema/admin.schema';
// import { TeacherCourseModule } from './teacher/teacher-courses/teacher-courses.module';
// import { TeacherStudentModule } from './teacher/teacher-student/teacher-student.module';
// import { AdminAssignmentModule } from './admin/admin-assignment/admin-assignment.module';
// import { TeacherAssignmentModule } from './teacher/teacher-assignment/teacher-assignment.module';
// import { StudentAuthModule } from './student/auth/auth.module';
// import { StudentAssignmentModule } from './student/student-assignment/student-assignment.module';
// import { StudentModule } from './student/student-student/student-student.module';
// import { StudentCourseModule } from './student/student-courses/student-courses.module';

@Module({
  imports: [
    // AdminRoleModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGO_DB_URL as string),
    MailerModule.forRoot({
      transport: {
        host: String(process.env.EMAIL_HOST),
        port: Number(process.env.EMAIL_PORT),
        secure: true,
        auth: {
          user: process.env.EMAIL_USERNAME,
          pass: process.env.PORTAL_PASSWORD,
        },
      },
      template: {
        dir: __dirname + './template/file',
        adapter: new PugAdapter({ inlineCssEnabled: true }),
        options: {
          strict: true,
        },
      },
    }),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          secret: config.get<string>('JWT_SECRET'),
          signOptions: {
            expiresIn: config.get<string | number>('JWT_EXPIRES'),
          },
        };
      },
    }),
    // MongooseModule.forFeature([
    //   { name: 'Teacher', schema: teacherSchema },
    //   { name: 'Student', schema: studentSchema },
    //   { name: 'Role', schema: roleSchema },
    //   { name: 'Admin', schema: adminSchema },
    // ]),
    // EmailModule,
    AdminAuthModule,
    // AdminTeacherModule,
    // AdminStudentModule,
    // AdminCourseModule,
    // TeacherAuthModule,
    // TeacherCourseModule,
    // TeacherStudentModule,
    // AdminAssignmentModule,
    // TeacherAssignmentModule,
    // StudentAuthModule,
    // StudentAssignmentModule,
    // StudentModule,
    // StudentCourseModule,
  ],
  controllers: [AppController],
  providers: [AppService,

  ],
  exports: [PassportModule, JwtModule, MailerModule]
})
export class AppModule { }

