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
import { AdminStudentService } from './admin-student.service';
import { Roles } from 'src/Guards/decorators/role.decorator';
import { Role } from 'src/Guards/enums/role.enum';
import { RoleGuard } from 'src/Guards/guards/role.guard';
import { TeacherDto } from 'src/dtos/teacherDto/teacher.dto';
import { StudentDto } from 'src/dtos/studentDto/student.dto';

@Controller('api/admin/student')
export class AdminStudentController {
    constructor(private readonly adminStudentService: AdminStudentService) { }

    @Roles(Role.ADMIN)
    @UseGuards(AuthGuard('jwt'), RoleGuard)
    @Post()
    create(@Body() body: StudentDto, @Req() req: Request) {
        return this.adminStudentService.create(body, req);
    }

    @Roles(Role.ADMIN)
    @UseGuards(AuthGuard('jwt'), RoleGuard)
    @Get(':id')
    getById(@Param() { id }) {
        return this.adminStudentService.getById(id);
    }

    @Roles(Role.ADMIN)
    @UseGuards(AuthGuard('jwt'), RoleGuard)
    @Get()
    get(@Req() req: Request) {
        return this.adminStudentService.get(req);
    }

    @Roles(Role.ADMIN)
    @UseGuards(AuthGuard('jwt'), RoleGuard)
    @Put(':id')
    update(
        @Param() { id },
        @Body() Body: createRoleDto,
        @Req() req: Request,
    ) {
        return this.adminStudentService.update(id, Body, req);
    }

    @Roles(Role.ADMIN)
    @UseGuards(AuthGuard('jwt'), RoleGuard)
    @Delete(':id')
    delete(@Param() { id }, @Req() req: Request) {
        return this.adminStudentService.delete(id, req);
    }
}
