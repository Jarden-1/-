import 'reflect-metadata'

import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import type { INestApplication } from '@nestjs/common'
import { createApp } from '../src/main'

describe('API bootstrap', () => {
  let app: INestApplication

  beforeAll(async () => {
    app = await createApp()
    await app.init()
  })

  afterAll(async () => {
    await app.close()
  })

  it('creates a real HTTP app with CORS enabled for frontend requests', async () => {
    const response = await request(app.getHttpServer())
      .get('/health')
      .set('Origin', 'http://localhost:8081')

    expect(response.status).toBe(200)
    expect(response.headers['access-control-allow-origin']).toBe('*')
  })
})
