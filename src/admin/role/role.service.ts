/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Request } from 'express';
import { Model } from 'mongoose';
import { createRoleDto } from 'src/dtos/roleDto/role.dto';
import { Role } from 'src/schema/role.schema';

@Injectable()
export class AdminRoleService {
    constructor(
        @InjectModel(Role.name)
        private readonly roleModel: Model<Role>,

    ) { }
    async createRole(body: createRoleDto, req: any): Promise<createRoleDto> {
        const { name } = body;
        const findRole = await this.roleModel.findOne({ name });

        if (findRole) {
            throw new BadRequestException(`Role with name ${name} already exists`);
        }
        await this.roleModel.create(body);
        return body;
    }
    async getRole(roleId: string) {
        console.log('roleId: ', roleId);
        const findRole = await this.roleModel.findById(roleId);
        if (!findRole) {
            throw new BadRequestException(`Role not found ${roleId}`);
        }
        return findRole;
    }
    async getRoles(req: any): Promise<any> {
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

        let query = {} as any;
        if (conditions.length > 0) {
            query!.$or = conditions;
        } else {
            query = conditions;
        }

        const sort: any = {};
        sort[sortByField] = orderby === 'asc' ? 1 : -1;

        const findRole = await this.roleModel
            .find()
            .limit(limit)
            .skip(limit * (pageNo - 1))
            .sort(sort);

        if (!findRole && findRole.length < 0) {
            throw new BadRequestException(`Role not found ==>>`);
        }
        return findRole;
    }
    async updateRole(
        id: string,
        body: createRoleDto,
        req: any,
    ): Promise<any> {
        const user: any = req.user;
        const findRole = await this.roleModel.findByIdAndUpdate(id, body, {
            new: true,
        });
        if (!findRole) {
            throw new BadRequestException(`Role not found---<<<`);
        }

        return findRole;
    }
    async deleteRole(id: string, req: any): Promise<any> {
        const user: any = req.user;
        const findRole = await this.roleModel.findByIdAndDelete(id, {
            new: true,
        });
        if (!findRole) {
            throw new BadRequestException(`Role not found -->>>===`);
        }

        return findRole;
    }
}
