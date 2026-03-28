import 'reflect-metadata'

import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import { mvpFixture } from '@jiachuang/shared'
import { AppModule } from '../src/app.module'

describe('Core pages read endpoints', () => {
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

  it('GET /core-pages/home returns the unified home skeleton', async () => {
    const response = await request(app.getHttpServer()).get('/core-pages/home?role=child')

    expect(response.status).toBe(200)
    expect(response.body).toEqual(mvpFixture.home)
  })

  it('GET /core-pages/publish-page returns the publish page data without visibility options', async () => {
    const response = await request(app.getHttpServer()).get('/core-pages/publish-page')

    expect(response.status).toBe(200)
    expect(response.body).toEqual(mvpFixture.publishPage)
    expect(response.body).not.toHaveProperty('visibilityOptions')
  })

  it('GET /core-pages/feedback-page returns the feedback page data', async () => {
    const response = await request(app.getHttpServer()).get('/core-pages/feedback-page')

    expect(response.status).toBe(200)
    expect(response.body).toEqual(mvpFixture.feedbackPage)
  })

  it('GET /core-pages/family-visits returns the family visits page data', async () => {
    const response = await request(app.getHttpServer()).get('/core-pages/family-visits')

    expect(response.status).toBe(200)
    expect(response.body).toEqual(mvpFixture.familyVisits)
  })

  it('GET /core-pages/family-companion returns the family companion page data', async () => {
    const response = await request(app.getHttpServer()).get('/core-pages/family-companion')

    expect(response.status).toBe(200)
    expect(response.body).toEqual(mvpFixture.familyCompanion)
  })

  it('GET /core-pages/member-detail/:memberId returns the member detail page data', async () => {
    const response = await request(app.getHttpServer()).get('/core-pages/member-detail/child-1')

    expect(response.status).toBe(200)
    expect(response.body.memberId).toBe('child-1')
    expect(response.body.memberName).toBe(mvpFixture.memberDetail.memberName)
  })

  it('GET /core-pages/my-page returns the my page data', async () => {
    const response = await request(app.getHttpServer()).get('/core-pages/my-page')

    expect(response.status).toBe(200)
    expect(response.body).toEqual(mvpFixture.myPage)
  })

  it('does not expose split child-home or parent-home endpoints', async () => {
    const childHome = await request(app.getHttpServer()).get('/core-pages/child-home')
    const parentHome = await request(app.getHttpServer()).get('/core-pages/parent-home')

    expect(childHome.status).toBe(404)
    expect(parentHome.status).toBe(404)
  })
})
