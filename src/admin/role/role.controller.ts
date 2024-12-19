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
import { createRoleDto } from '../../dtos/roleDto/role.dto';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { AdminRoleService } from './role.service';
import { Roles } from '../../Guards/decorators/role.decorator';
import { Role } from '../../Guards/enums/role.enum';
import { RoleGuard } from '../../Guards/guards/role.guard';

@Controller('api/admin/role')
export class AdminRoleController {
    constructor(private readonly roleService: AdminRoleService) { }

    @Roles(Role.ADMIN)
    @UseGuards(AuthGuard('jwt'), RoleGuard)
    @Post()
    createRole(@Body() body: createRoleDto, @Req() req: Request) {
        return this.roleService.createRole(body, req);
    }

    @Roles(Role.ADMIN)
    @UseGuards(AuthGuard('jwt'), RoleGuard)
    @Get(':id')
    getRole(@Param() { id }) {
        return this.roleService.getRole(id);
    }

    @Roles(Role.ADMIN)
    @UseGuards(AuthGuard('jwt'), RoleGuard)
    @Get()
    getRoles(@Req() req: Request) {
        return this.roleService.getRoles(req);
    }

    @Roles(Role.ADMIN)
    @UseGuards(AuthGuard('jwt'), RoleGuard)
    @Put(':id')
    UpdateRoles(
        @Param() { id },
        @Body() Body: createRoleDto,
        @Req() req: Request,
    ) {
        return this.roleService.updateRole(id, Body, req);
    }

    @Roles(Role.ADMIN)
    @UseGuards(AuthGuard('jwt'), RoleGuard)
    @Delete(':id')
    deleteRoles(@Param() { id }, @Req() req: Request) {
        return this.roleService.deleteRole(id, req);
    }
}
