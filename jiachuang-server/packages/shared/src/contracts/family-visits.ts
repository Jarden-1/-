export interface FamilyVisitsPageData {
  seenBySummary: string
  recentVisitors: {
    memberId: string
    name: string
    lastVisitedAt: string
  }[]
}
