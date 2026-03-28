import 'reflect-metadata'

import { NestFactory } from '@nestjs/core'
import type { INestApplication } from '@nestjs/common'

import { AppModule } from './app.module'

export async function createApp(): Promise<INestApplication> {
  const app = await NestFactory.create(AppModule)

  app.enableCors({
    origin: '*',
  })

  return app
}

export async function bootstrap() {
  const app = await createApp()
  const port = Number(process.env.PORT ?? 3101)
  const host = process.env.HOST ?? '0.0.0.0'

  await app.listen(port, host)
}

if (require.main === module) {
  bootstrap().catch((error) => {
    console.error('Failed to bootstrap API', error)
    process.exit(1)
  })
}
