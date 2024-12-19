/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { createRoleDto } from 'src/dtos/roleDto/role.dto';
import { AddTeacherToCourseDto, CourseDto, UpdateCourseDto } from 'src/dtos/courseDto/course.dto';
import { EmailService } from 'src/email/email.service';
import { Course } from 'src/schema/course.schema';

@Injectable()
export class AdminCoursesService {
    constructor(
        @InjectModel(Course.name)
        private readonly course: Model<Course>,
    ) { }
    async addTeacher(body: AddTeacherToCourseDto, req: any) {
        const { courseId, teacherId } = body
        const findCourse = await this.course.findByIdAndUpdate(courseId, { teachers: [new mongoose.Types.ObjectId(teacherId)] }, { new: true });
        return findCourse;
    }

    async create(body: CourseDto, req: any) {
        const res = await this.course.create(body);
        return res;
    }
    async getById(id: string) {
        const res = await this.course.findById(id).populate("teachers").populate("students");
        if (!res) {
            throw new BadRequestException(`course not found ==>> ${id}`);
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


        conditions.push({ title: { $regex: search, $options: 'i' } });

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
        const count = await this.course.countDocuments(query)
        const res = await this.course
            .find(query)
            .populate("teachers")
            .populate("students")
            .limit(limit)
            .skip(limit * (pageNo - 1))
            .sort(sort);

        if (!res && res.length < 0) {
            throw new BadRequestException(`Course not found ==>>`);
        }
        return { count, data: res };
    }
    async update(
        id: string,
        body: UpdateCourseDto,
        req: any,
    ): Promise<any> {
        const user: any = req.user;
        const res = await this.course.findByIdAndUpdate(id, body, {
            new: true,
        });
        if (!res) {
            throw new BadRequestException(`course not found---<<<`);
        }

        return res;
    }
    async delete(id: string, req: any): Promise<any> {
        const user: any = req.user;
        const res = await this.course.findByIdAndDelete(id, {
            new: true,
        });
        if (!res) {
            throw new BadRequestException(`course not found -->>>===`);
        }

        return res;
    }
}

