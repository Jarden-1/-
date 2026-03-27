import { Module } from '@nestjs/common'

import { CorePagesController } from './core-pages.controller'
import { CorePagesService } from './core-pages.service'
import { CorePagesStore } from './core-pages.store'

@Module({
  controllers: [CorePagesController],
  providers: [CorePagesService, CorePagesStore],
})
export class CorePagesModule {}
