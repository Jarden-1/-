import 'reflect-metadata'

import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import { AppModule } from '../src/app.module'

describe('Core pages write endpoints', () => {
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

  it('POST /core-pages/statuses creates a status for any family member role', async () => {
    const response = await request(app.getHttpServer())
      .post('/core-pages/statuses')
      .send({
        authorRole: 'parent',
        text: '刚吃完饭',
        boundaryHint: '今天有点忙',
      })

    expect(response.status).toBe(201)
    expect(response.body.status.text).toBe('刚吃完饭')
  })

  it('POST /core-pages/statuses/:id/reactions records reaction-first feedback', async () => {
    const response = await request(app.getHttpServer())
      .post('/core-pages/statuses/status-1/reactions')
      .send({ reaction: '放心了' })

    expect(response.status).toBe(201)
    expect(response.body.reaction).toBe('放心了')
  })

  it('POST /core-pages/statuses/:id/comments records a one-line comment', async () => {
    const response = await request(app.getHttpServer())
      .post('/core-pages/statuses/status-1/comments')
      .send({ text: '今天还不错' })

    expect(response.status).toBe(201)
    expect(response.body.comment).toBe('今天还不错')
  })
})
