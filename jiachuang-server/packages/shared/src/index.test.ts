import { describe, expect, it } from 'vitest'

describe('shared package bootstrap', () => {
  it('exports the core pages fixture from the package root', async () => {
    const shared = await import('./index')
    expect(shared).toHaveProperty('corePagesFixture')
    expect(shared.corePagesFixture?.navigation?.tabs).toEqual(['首页', '家园', '我的'])
  })
})
