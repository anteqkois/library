import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiOperation } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Admins')
@ApiBearerAuth()
@Controller('admins')
export class AdminsController {

	@UseGuards(AuthGuard('jwt'))
	@Get('me')
	@ApiOperation({ summary: 'Get current admin profile' })
	getProfile(@Request() req: any) {
		return req.user;
	}
}
