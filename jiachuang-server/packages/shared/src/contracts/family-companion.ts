export type FamilyCompanionMood = 'happy' | 'neutral' | 'sad'

export interface FamilyCompanionPageData {
  title: string
  mood: FamilyCompanionMood
  progressDescription: string
}
