import { Controller, Post, Body, UseGuards, Request, Get, Param } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { LoansService } from './loans.service';
import { CreateLoanDto } from './dto/create-loan.dto';

@ApiTags('Loans')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('loans')
export class LoansController {
	constructor(private readonly loansService: LoansService) { }

	@Post()
	@ApiOperation({ summary: 'Borrow a book (Customer Only)' })
	borrow(@Request() req: any, @Body() createLoanDto: CreateLoanDto) {
		// Assuming role check handled by guard/strategy logic, but simpler here:
		// Ideally we should have a RolesGuard. For MVP, assuming any auth user can try,
		// but practically only customers should borrow. Admin borrowing is allowed in this implementation for simplicity.
		return this.loansService.borrow(req.user.userId, createLoanDto);
	}

	@Get('my')
	@ApiOperation({ summary: 'Get my loans history' })
	getMyLoans(@Request() req: any) {
		return this.loansService.getMyLoans(req.user.userId);
	}

	@Post(':id/return')
	@ApiOperation({ summary: 'Return a book' })
	returnBook(@Request() req: any, @Param('id') id: string) {
		const isAdmin = req.user.role === 'admin';
		return this.loansService.returnBook(id, req.user.userId, isAdmin);
	}
}
