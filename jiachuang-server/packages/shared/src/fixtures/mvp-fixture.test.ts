import { describe, expect, it } from 'vitest'
import { corePagesFixture, mvpFixture } from './mvp-fixture'

describe('mvpFixture', () => {
  it('matches the approved top-level IA and home skeleton', () => {
    expect(corePagesFixture.navigation?.tabs).toEqual(['首页', '家园', '我的'])
    expect(mvpFixture.home.layoutOrder).toEqual([
      'FamilyPhotoHero',
      'MiniOverviewStrip',
      'PrimaryStatusEntry',
      'FamilyTimeline',
    ])
    expect(mvpFixture.home.primaryAction.label).toBe('发个状态')
  })

  it('keeps publish and feedback boundaries aligned with the latest spec', () => {
    expect(mvpFixture.publishPage).not.toHaveProperty('visibilityOptions')
    expect(mvpFixture.publishPage.composerPlaceholder).toBe('今天想让家里知道点什么？')
    expect(mvpFixture.publishPage.submitLabel).toBe('发布')
    expect(mvpFixture.feedbackPage.reactionOptions.map((option) => option.label)).toEqual([
      '知道啦',
      '放心了',
      '注意身体',
    ])
    expect(mvpFixture.feedbackPage.commentPlaceholder).toBe('留一句话')
  })

  it('uses plant-based companion data and focused detail/my-page data', () => {
    expect(mvpFixture.familyCompanion.hero?.kind).toBe('plant')
    expect(mvpFixture.memberDetail.summary?.latestStatusText).toContain('刚吃完饭')
    expect(
      mvpFixture.myPage.familySettings?.some((setting) => setting.label === '家庭封面图'),
    ).toBe(true)
  })
})
