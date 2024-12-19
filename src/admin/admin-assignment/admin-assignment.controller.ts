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
import { AdminAssignmentService } from './admin-assignment.service';
import { Roles } from 'src/Guards/decorators/role.decorator';
import { Role } from 'src/Guards/enums/role.enum';
import { RoleGuard } from 'src/Guards/guards/role.guard';
import { TeacherDto } from 'src/dtos/teacherDto/teacher.dto';
import { AssignmentDto } from 'src/dtos/assignmentDto/assignment.dto';

@Controller('api/admin/assignment')
export class AdminAssignmentController {
    constructor(private readonly adminAssignmentService: AdminAssignmentService) { }

    @Roles(Role.ADMIN)
    @UseGuards(AuthGuard('jwt'), RoleGuard)
    @Post()
    create(@Body() body: AssignmentDto, @Req() req: Request) {
        return this.adminAssignmentService.create(body, req);
    }

    @Roles(Role.ADMIN)
    @UseGuards(AuthGuard('jwt'), RoleGuard)
    @Get(':id')
    getById(@Param() { id }) {
        return this.adminAssignmentService.getById(id);
    }

    @Roles(Role.ADMIN)
    @UseGuards(AuthGuard('jwt'), RoleGuard)
    @Get()
    get(@Req() req: Request) {
        return this.adminAssignmentService.get(req);
    }

    @Roles(Role.ADMIN)
    @UseGuards(AuthGuard('jwt'), RoleGuard)
    @Put(':id')
    update(
        @Param() { id },
        @Body() Body: AssignmentDto,
        @Req() req: Request,
    ) {
        return this.adminAssignmentService.update(id, Body, req);
    }

    @Roles(Role.ADMIN)
    @UseGuards(AuthGuard('jwt'), RoleGuard)
    @Delete(':id')
    delete(@Param() { id }, @Req() req: Request) {
        return this.adminAssignmentService.delete(id, req);
    }
}
