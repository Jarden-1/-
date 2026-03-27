import type { Status } from '../domain/status'

export interface MemberDetailPageData {
  memberId: string
  memberName: string
  recentStatuses: Status[]
}
