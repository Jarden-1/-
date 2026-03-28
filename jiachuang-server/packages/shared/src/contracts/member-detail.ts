import type { MemberRole } from '../domain/member-role'
import type { Status } from '../domain/status'

export interface MemberStatusSummaryData {
  latestStatusText: string
  latestUpdatedAtLabel: string
  latestTags: readonly string[]
  rhythmLabel: string
}

export interface GentleCheckInData {
  message: string
  actionLabel: '轻轻问问' | '送个关心'
}

export interface MemberDetailPageData {
  memberId: string
  memberName: string
  memberRole: MemberRole
  lastUpdatedLabel: string
  weeklyStatusCount: number
  summary: MemberStatusSummaryData
  timeline: readonly Status[]
  gentleCheckIn?: GentleCheckInData
}
