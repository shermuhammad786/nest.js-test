/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Request } from 'express';
import { Model } from 'mongoose';
import { createRoleDto } from 'src/dtos/roleDto/role.dto';
import { StudentDto } from 'src/dtos/studentDto/student.dto';
import { TeacherDto } from 'src/dtos/teacherDto/teacher.dto';
import { EmailService } from 'src/email/email.service';
import { bcryptHashingData } from 'src/helpers/bcrypt';
import { Course } from 'src/schema/course.schema';
import { Student } from 'src/schema/student.schema';
import { Teacher } from 'src/schema/teacher.schema';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AdminStudentService {
    constructor(
        @InjectModel(Student.name)
        private readonly studentModel: Model<Student>,
        @InjectModel(Course.name)
        private readonly course: Model<Course>,
        private readonly emailService: EmailService,
    ) { }
    async create(body: StudentDto, req: any) {
        const { name, email, password, username, roleId, course } = body;
        const student: any = await this.studentModel.findOne({ name, email });
        const findCourse: any = await this.course.findOne({ title: course });
        const generateRandomNumber = (min: number, max: number) =>
            Math.random() * (max - min) + min;

        const otpkey = generateRandomNumber(1111, 9999).toFixed();
        const hashOtp = bcryptHashingData(otpkey);

        if (student) {
            throw new BadRequestException(`Student with name ${name} already exists`);
        }
        const newStudent: any = body
        const hashPassword = await bcryptHashingData(password);
        newStudent.password = hashPassword;

        const createStudent = await this.studentModel.create({ enrolledCourses: [findCourse._id], ...newStudent });
        if (createStudent) {
            this.emailService.sendMailSandBox({
                email: email,
                subject: 'welcome',
                text: 'welcome',
                to: email,
                replacement: {
                    password: otpkey,

                },
                templete: '../../src/template/generatePassword.pug',
            });
        }
        findCourse.students.push(createStudent._id);
        findCourse.save()
        return createStudent;
    }
    async getById(id: string) {
        const res = await this.studentModel.findById(id).populate("enrolledCourses");
        console.log('res: ', res);
        if (!res) {
            throw new BadRequestException(`student not found ==>> ${id}`);
        }
        return res;
    }
    async get(req: any): Promise<any> {
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
        const count = await this.studentModel.countDocuments(query)
        const findRole = await this.studentModel
            .find(query)
            .populate("enrolledCourses")
            .limit(limit)
            .skip(limit * (pageNo - 1))
            .sort(sort);

        if (!findRole && findRole.length < 0) {
            throw new BadRequestException(`Role not found ==>>`);
        }
        return { count, data: findRole };
    }
    async update(
        id: string,
        body: createRoleDto,
        req: any,
    ): Promise<any> {
        const user: any = req.user;
        const findRole = await this.studentModel.findByIdAndUpdate(id, body, {
            new: true,
        });
        if (!findRole) {
            throw new BadRequestException(`Role not found---<<<`);
        }

        return findRole;
    }
    async delete(id: string, req: any): Promise<any> {
        const user: any = req.user;
        const findRole = await this.studentModel.findByIdAndDelete(id, {
            new: true,
        });
        if (!findRole) {
            throw new BadRequestException(`Role not found -->>>===`);
        }

        return findRole;
    }
}
