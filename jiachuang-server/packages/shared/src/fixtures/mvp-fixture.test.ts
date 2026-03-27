import { describe, expect, it } from 'vitest'
import { mvpFixture } from './mvp-fixture'

describe('mvpFixture', () => {
  it('matches the approved home skeleton and primary action', () => {
    expect(mvpFixture.home.layoutOrder).toEqual([
      'FamilyPhotoHero',
      'MiniOverviewStrip',
      'PrimaryStatusEntry',
      'FamilyTimeline',
    ])
    expect(mvpFixture.home.primaryAction.label).toBe('发个状态')
    expect(mvpFixture.publishPage).not.toHaveProperty('visibilityOptions')
  })
})
