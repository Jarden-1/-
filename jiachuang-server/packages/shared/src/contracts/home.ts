import type { Status } from '../domain/status'

export const topLevelTabs = ['首页', '家园', '我的'] as const

export interface HomeHeroData {
  greeting: string
  subtitle: string
  imageAlt: string
}

export interface MiniOverviewItem {
  id: string
  label: string
}

export interface PrimaryStatusEntryData {
  label: '发个状态'
  quickExpressions: readonly string[]
}

export interface HomePageData {
  layoutOrder: [
    'FamilyPhotoHero',
    'MiniOverviewStrip',
    'PrimaryStatusEntry',
    'FamilyTimeline',
  ]
  hero: HomeHeroData
  overviewItems: readonly MiniOverviewItem[]
  primaryAction: PrimaryStatusEntryData
  timeline: readonly Status[]
}
