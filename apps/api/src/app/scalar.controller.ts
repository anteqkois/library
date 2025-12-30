import { Controller, Get, Res } from '@nestjs/common';
import { ApiExcludeController } from '@nestjs/swagger';

@ApiExcludeController()
@Controller('scalar')
export class ScalarController {
  @Get() // Maps to /scalar
  getScalar(@Res() res: any) {
    res.type('text/html');
    res.send(`
      <!doctype html>
      <html>
        <head>
          <title>Library API Reference</title>
          <meta charset="utf-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1" />
          <style>
            body {
              margin: 0;
            }
          </style>
        </head>
        <body>
          <script
            id="api-reference"
            data-url="/api/reference-json"></script>
          <script src="https://cdn.jsdelivr.net/npm/@scalar/api-reference"></script>
        </body>
      </html>
    `);
  }
}
