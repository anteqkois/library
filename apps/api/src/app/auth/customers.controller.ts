import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiOperation } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Customers')
@ApiBearerAuth()
@Controller('customers')
export class CustomersController {

	@UseGuards(AuthGuard('jwt'))
	@Get('me')
	@ApiOperation({ summary: 'Get current customer profile' })
	getProfile(@Request() req: any) {
		// In a real app, you might fetch full details from DB using req.user.userId
		return req.user;
	}
}
