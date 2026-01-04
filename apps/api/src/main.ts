import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';



async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);

  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  const config = new DocumentBuilder()
    .setTitle('Library API')
    .setDescription('Headless Library Management System API')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);

  // Standard Swagger UI (configured to check global prefix)
  // This serves UI at /api/reference and JSON at /api/reference-json
  SwaggerModule.setup('reference', app, document, {
    useGlobalPrefix: true, // Ensures it lives under /api/reference
  });

  const port = process.env.PORT || 3000;
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`,
  );
  Logger.log(
    `📚 Documentation is running on:\n\n\tSwagger: http://localhost:${port}/${globalPrefix}/reference\n\tScalar: http://localhost:${port}/${globalPrefix}/scalar`,
  );
}

bootstrap();
