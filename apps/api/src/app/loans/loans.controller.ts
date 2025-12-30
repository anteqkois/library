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
		// Role check is implicit via AuthGuard, logic now supports both.
		return this.loansService.borrow(req.user, createLoanDto);
	}

	@Get('my')
	@ApiOperation({ summary: 'Get my loans history' })
	getMyLoans(@Request() req: any) {
		return this.loansService.getMyLoans(req.user.userId);
	}

	// --- Admin Endpoints ---

	@Get('stats')
	@ApiOperation({ summary: 'Get global loan statistics (Admin Only)' })
	getGlobalStats(@Request() req: any) {
		if (req.user.role !== 'admin') throw new Error('Forbidden'); // Simple check
		return this.loansService.getGlobalStats();
	}

	@Get('stats/users')
	@ApiOperation({ summary: 'Get loan statistics per user (Admin Only)' })
	getUserStats(@Request() req: any) {
		if (req.user.role !== 'admin') throw new Error('Forbidden');
		return this.loansService.getUserStats();
	}

	@Get('stats/books')
	@ApiOperation({ summary: 'Get loan statistics per book (Admin Only)' })
	getBookStats(@Request() req: any) {
		if (req.user.role !== 'admin') throw new Error('Forbidden');
		return this.loansService.getBookStats();
	}

	@Get()
	@ApiOperation({ summary: 'List all loans (Admin Only)' })
	findAll(@Request() req: any) {
		if (req.user.role !== 'admin') throw new Error('Forbidden');
		return this.loansService.findAll();
	}

	@Post(':id/return')
	@ApiOperation({ summary: 'Return a book' })
	returnBook(@Request() req: any, @Param('id') id: string) {
		const isAdmin = req.user.role === 'admin';
		return this.loansService.returnBook(id, req.user.userId, isAdmin);
	}
}
