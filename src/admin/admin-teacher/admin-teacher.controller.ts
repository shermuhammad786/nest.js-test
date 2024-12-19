/* eslint-disable prettier/prettier */
import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    Req,
    UseGuards,
} from '@nestjs/common';
import { createRoleDto } from 'src/dtos/roleDto/role.dto';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { AdminTeacherService } from './admin-teacher.service';
import { Roles } from 'src/Guards/decorators/role.decorator';
import { Role } from 'src/Guards/enums/role.enum';
import { RoleGuard } from 'src/Guards/guards/role.guard';
import { TeacherDto, UpdateTeacherDto } from 'src/dtos/teacherDto/teacher.dto';

@Controller('api/admin/teacher')
export class AdminTeacherController {
    constructor(private readonly adminTeacherService: AdminTeacherService) { }

    @Roles(Role.ADMIN)
    @UseGuards(AuthGuard('jwt'), RoleGuard)
    @Post()
    createTeacher(@Body() body: TeacherDto, @Req() req: Request) {
        return this.adminTeacherService.createTeacher(body, req);
    }

    @Roles(Role.ADMIN)
    @UseGuards(AuthGuard('jwt'), RoleGuard)
    @Get(':id')
    getTeacher(@Param() { id }) {
        return this.adminTeacherService.getTeacher(id);
    }

    @Roles(Role.ADMIN)
    @UseGuards(AuthGuard('jwt'), RoleGuard)
    @Get()
    getTeachers(@Req() req: Request) {
        return this.adminTeacherService.getTeachers(req);
    }

    @Roles(Role.ADMIN)
    @UseGuards(AuthGuard('jwt'), RoleGuard)
    @Put(':id')
    updateTeacher(
        @Param() { id },
        @Body() Body: UpdateTeacherDto,
        @Req() req: Request,
    ) {
        return this.adminTeacherService.updateTeacher(id, Body, req);
    }

    @Roles(Role.ADMIN)
    @UseGuards(AuthGuard('jwt'), RoleGuard)
    @Delete(':id')
    deleteTeacher(@Param() { id }, @Req() req: Request) {
        return this.adminTeacherService.deleteTeacher(id, req);
    }
}
