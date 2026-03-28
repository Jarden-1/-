import { describe, expect, it } from 'vitest'

import appJson from '../../../app.json'
import mobilePackage from '../../../package.json'

describe('mobile app shell configuration', () => {
  it('uses expo-router as the main app entry', () => {
    expect(mobilePackage.main).toBe('expo-router/entry')
    expect(mobilePackage.dependencies).toHaveProperty('expo-router')
    expect(mobilePackage.dependencies).toHaveProperty('expo')
  })

  it('registers the expo-router config plugin', () => {
    expect(appJson.expo.plugins).toContain('expo-router')
  })
})
