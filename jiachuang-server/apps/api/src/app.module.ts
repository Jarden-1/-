import { Controller, Get, Module } from '@nestjs/common'

import { corePagesFixture } from '@jiachuang/shared'
import { CorePagesModule } from './core-pages/core-pages.module'

@Controller()
class AppController {
  @Get('/health')
  health() {
    return { ok: true }
  }

  @Get('/home')
  home() {
    return corePagesFixture.home
  }
}

@Module({
  imports: [CorePagesModule],
  controllers: [AppController],
})
export class AppModule {}
