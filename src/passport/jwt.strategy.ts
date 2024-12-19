/* eslint-disable prettier/prettier */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Model } from 'mongoose';
import { Admin } from 'src/schema/admin.schema';
import { Teacher } from 'src/schema/teacher.schema';
import { Student } from 'src/schema/student.schema';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectModel(Admin.name)
    private adminModel: Model<Admin>,
    @InjectModel(Teacher.name)
    private teacherModel: Model<Teacher>,
    @InjectModel(Student.name)
    private studentModel: Model<Student>,

  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload) {
    const { id } = payload;
    console.log('payload admin: ', payload);
    const Admin = await this.adminModel.findById(id);
    const Teacher = await this.teacherModel.findById(id);
    const Student = await this.studentModel.findById(id);

    if (Admin) {
      return Admin;
    }
    if (Teacher) {
      return Teacher;
    }
    if (Student) {
      return Student;
    }
    throw new UnauthorizedException({ message: 'User not found' });
  }
}
