import { mobileApiClient } from '../../lib/api/client'
import { ScreenContainer } from '../../lib/ui/ScreenContainer'
import { GentleCheckInCard } from './GentleCheckInCard'
import { MemberProfileHeader } from './MemberProfileHeader'
import { MemberStatusSummary } from './MemberStatusSummary'
import { MemberTimeline } from './MemberTimeline'

export function MemberDetailScreen() {
  const memberDetail = mobileApiClient.getMemberDetailPage()

  return (
    <ScreenContainer>
      <MemberProfileHeader
        lastUpdatedLabel={memberDetail.lastUpdatedLabel}
        memberName={memberDetail.memberName}
        weeklyStatusCount={memberDetail.weeklyStatusCount}
      />
      <MemberStatusSummary summary={memberDetail.summary} />
      <MemberTimeline timeline={memberDetail.timeline} />
      <GentleCheckInCard checkIn={memberDetail.gentleCheckIn} />
    </ScreenContainer>
  )
}
