import 'reflect-metadata'

import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import { corePagesFixture } from '@jiachuang/shared'
import { AppModule } from '../src/app.module'

describe('Home endpoint', () => {
  let app: INestApplication

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleRef.createNestApplication()
    await app.init()
  })

  afterAll(async () => {
    if (app) {
      await app.close()
    }
  })

  it('GET /home returns home page data from shared fixture', async () => {
    const response = await request(app.getHttpServer()).get('/home')

    expect(response.status).toBe(200)
    expect(response.body).toEqual(corePagesFixture.home)
  })
})
