/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AssignmentDto } from 'src/dtos/assignmentDto/assignment.dto';
import { EmailService } from 'src/email/email.service';
import { Assignment } from 'src/schema/assignment.schema';
import { Course } from 'src/schema/course.schema';

@Injectable()
export class AdminAssignmentService {
    constructor(
        @InjectModel(Assignment.name)
        private readonly assignmentModel: Model<Assignment>,
        @InjectModel(Course.name)
        private readonly course: Model<Course>,
        private readonly emailService: EmailService,
    ) { }
    async create(body: AssignmentDto, req: any) {
        const { course, description, dueDate, submissions, title } = body;
        const Assignment: any = await this.assignmentModel.findOne({ title });
        if (Assignment) {
            throw new BadRequestException(`Assignment with name ${title} already exists`);
        }
        const newAssignment = await this.assignmentModel.create({
            course,
            description,
            dueDate,
            title,
        });
        return newAssignment;

    }
    async getById(id: string) {
        const res = await this.assignmentModel.findById(id).populate("course");

        if (!res) {
            throw new BadRequestException(`Assignment not found ==>> ${id}`);
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
        if (search) {
            conditions.push({ name: { $regex: search, $options: 'i' } });
            conditions.push({ username: { $regex: search, $options: 'i' } });
        }

        let query = {};
        if (conditions.length > 0) {
            query = { $or: conditions };
        }

        console.log('query: ', query);

        const sort: any = {};
        sort[sortByField] = orderby === 'asc' ? 1 : -1;

        const count = await this.assignmentModel.countDocuments(query)
        const assignment = await this.assignmentModel
            .find(query)
            .populate("course")
            .limit(limit)
            .skip(limit * (pageNo - 1))
            .sort(sort);

        if (!assignment && assignment.length < 0) {
            throw new BadRequestException(`Assignment not found ==>>`);
        }
        return { count, data: assignment };
    }
    async update(
        id: string,
        body: AssignmentDto,
        req: any,
    ): Promise<any> {
        const user: any = req.user;
        const assignment = await this.assignmentModel.findByIdAndUpdate(id, body, {
            new: true,
        });
        if (!assignment) {
            throw new BadRequestException(`Assignment not found---<<<`);
        }

        return assignment;
    }
    async delete(id: string, req: any): Promise<any> {
        const user: any = req.user;
        const assignment = await this.assignmentModel.findByIdAndDelete(id, {
            new: true,
        });
        if (!assignment) {
            throw new BadRequestException(`Assignment not found -->>>===`);
        }

        return assignment;
    }
}
