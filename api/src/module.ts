import { Module, Controller, Get } from '@nestjs/common';

@Controller()
class AppController {
  @Get('/health') health() { return { ok: true, service: 'sprout' }; }
}

@Module({ controllers: [AppController] })
export class AppModule {}
