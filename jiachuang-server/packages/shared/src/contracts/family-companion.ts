export interface FamilyCompanionHeroData {
  kind: 'plant'
  title: string
  moodText: string
  description: string
}

export interface CareSignalItem {
  id: string
  text: string
}

export interface GentleNudgeData {
  memberId: string
  message: string
  actionLabel: '轻轻问问' | '送个关心' | '提醒一下近况'
}

export interface FamilyPresenceItem {
  memberId: string
  name: string
  latestActivity: string
}

export interface FamilyCompanionPageData {
  hero: FamilyCompanionHeroData
  careSignals: readonly CareSignalItem[]
  gentleNudge: GentleNudgeData
  familyPresence: readonly FamilyPresenceItem[]
}
