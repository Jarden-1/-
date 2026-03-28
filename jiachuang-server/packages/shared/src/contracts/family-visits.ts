export interface FamilyVisitRecord {
  id: string
  visitorId: string
  visitorName: string
  visitedAtLabel: string
}

export interface FamilyVisitsPageData {
  totalVisitCount: number
  totalVisitLabel: string
  latestVisit: {
    visitorName: string
    visitedAtLabel: string
  }
  topVisitorInPastWeek: {
    visitorName: string
    summary: string
  }
  records: readonly FamilyVisitRecord[]
}
