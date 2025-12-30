import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { BooksModule } from './books/books.module';
import { LoansModule } from './loans/loans.module';
import { ScalarController } from './scalar.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'database.sqlite',
      autoLoadEntities: true,
      synchronize: true,
    }),
    AuthModule,
    BooksModule,
    LoansModule,
  ],
  controllers: [AppController, ScalarController],
  providers: [AppService],
})
export class AppModule { }
