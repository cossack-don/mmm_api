import { Controller, Get, Header } from '@nestjs/common';

@Controller()
export class CheckHealthController {
  @Get('check-health')
  @Header('Cache-Control', 'no-cache, no-store, must-revalidate')
  @Header('Pragma', 'no-cache')
  @Header('Expires', '0')
  check() {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
    };
  }
}
