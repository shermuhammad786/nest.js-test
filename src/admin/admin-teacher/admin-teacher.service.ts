/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TeacherDto, UpdateTeacherDto } from 'src/dtos/teacherDto/teacher.dto';

import { EmailService } from 'src/email/email.service';
import { bcryptHashingData } from 'src/helpers/bcrypt';
import { Course } from 'src/schema/course.schema';
import { Teacher } from 'src/schema/teacher.schema';

@Injectable()
export class AdminTeacherService {
    constructor(
        @InjectModel(Teacher.name)
        private readonly teacherModel: Model<Teacher>,
        @InjectModel(Course.name)
        private readonly courseModel: Model<Course>,
        private readonly emailService: EmailService,
        private readonly configService: ConfigService,
        private readonly jwtService: JwtService,

    ) { }
    async createTeacher(body: TeacherDto, req: any) {
        const { name, email, password, username, roleId, course } = body;
        const findRole = await this.teacherModel.findOne({ name, email });
        const findCourse: any = await this.courseModel.findOne({ title: course });
        console.log('findCourse: ', findCourse);
        if (findRole) {
            throw new BadRequestException(`Teaher with name ${name} already exists`);
        }
        const teacher: any = { name, email, password, username, roleId }

        const hashPassword = await bcryptHashingData(password);
        teacher.password = hashPassword;
        const newTeacher = await this.teacherModel.create(teacher);
        if (newTeacher) {
            this.emailService.sendMailSandBox({
                email: email,
                subject: 'welcome',
                text: 'welcome',
                to: email,
                replacement: {
                    password: password,
                },
                templete: '../../src/template/generatePassword.pug',
            });
        }
        // findCourse.teachers.push(newTeacher._id);
        // findCourse.save()
        return newTeacher;
    }
    async getTeacher(id: string) {
        const findRole = await this.teacherModel.findById(id);
        if (!findRole) {
            throw new BadRequestException(`Role not found ==>> ${id}`);
        }
        return findRole;
    }
    async getTeachers(req: any): Promise<any> {
        const user: any = req.user;
        const {
            limit = 10,
            pageNo = 1,
            search = '',
            orderby,
            sortByField = 'createdAt',
        }: any = req.query;

        const conditions: any = [];


        conditions.push({ name: { $regex: search, $options: 'i' } });
        conditions.push({ username: { $regex: search, $options: 'i' } });

        let query = {} as any;
        if (conditions.length > 0) {
            query!.$or = conditions;
        } else {
            query = conditions;
        }
        console.log('query: ', query);

        const sort: any = {};
        sort[sortByField] = orderby === 'asc' ? 1 : -1;

        console.log('limit: ', limit);
        const count = await this.teacherModel.countDocuments(query)
        const findRole = await this.teacherModel
            .find(query)
            .limit(limit)
            .skip(limit * (pageNo - 1))
            .sort(sort);

        if (!findRole && findRole.length < 0) {
            throw new BadRequestException(`Role not found ==>>`);
        }
        return { count, data: findRole };
    }
    async updateTeacher(
        id: string,
        body: UpdateTeacherDto,
        req: any,
    ): Promise<any> {
        const user: any = req.user;
        const findRole = await this.teacherModel.findByIdAndUpdate(id, body, {
            new: true,
        });
        if (!findRole) {
            throw new BadRequestException(`Role not found---<<<`);
        }

        return findRole;
    }
    async deleteTeacher(id: string, req: any): Promise<any> {
        const user: any = req.user;
        const findRole = await this.teacherModel.findByIdAndDelete(id, {
            new: true,
        });
        if (!findRole) {
            throw new BadRequestException(`Role not found -->>>===`);
        }

        return findRole;
    }
}
