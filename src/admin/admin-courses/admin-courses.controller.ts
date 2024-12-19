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
import { AdminCoursesService } from './admin-courses.service';
import { Roles } from 'src/Guards/decorators/role.decorator';
import { Role } from 'src/Guards/enums/role.enum';
import { RoleGuard } from 'src/Guards/guards/role.guard';
import { AddTeacherToCourseDto, CourseDto, UpdateCourseDto } from 'src/dtos/courseDto/course.dto';

@Controller('api/admin/course')
export class AdminCoursesController {
    constructor(private readonly adminCoursesService: AdminCoursesService) { }

    @Roles(Role.ADMIN)
    @UseGuards(AuthGuard('jwt'), RoleGuard)
    @Put('/add/teacher')
    addTeacher(@Body() body: AddTeacherToCourseDto, @Req() req: Request) {
        return this.adminCoursesService.addTeacher(body, req);
    }

    @Roles(Role.ADMIN)
    @UseGuards(AuthGuard('jwt'), RoleGuard)
    @Post()
    create(@Body() body: CourseDto, @Req() req: Request) {
        return this.adminCoursesService.create(body, req);
    }

    @Roles(Role.ADMIN)
    @UseGuards(AuthGuard('jwt'), RoleGuard)
    @Get(':id')
    getById(@Param() { id }) {
        return this.adminCoursesService.getById(id);
    }

    @Roles(Role.ADMIN)
    @UseGuards(AuthGuard('jwt'), RoleGuard)
    @Get()
    get(@Req() req: Request) {
        return this.adminCoursesService.get(req);
    }

    @Roles(Role.ADMIN)
    @UseGuards(AuthGuard('jwt'), RoleGuard)
    @Put(':id')
    update(
        @Param() { id },
        @Body() Body: UpdateCourseDto,
        @Req() req: Request,
    ) {
        return this.adminCoursesService.update(id, Body, req);
    }

    @Roles(Role.ADMIN)
    @UseGuards(AuthGuard('jwt'), RoleGuard)
    @Delete(':id')
    delete(@Param() { id }, @Req() req: Request) {
        return this.adminCoursesService.delete(id, req);
    }
}
