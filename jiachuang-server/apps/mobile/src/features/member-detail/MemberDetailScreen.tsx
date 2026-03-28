import { useCallback } from 'react'
import { mobileApiClient } from '../../lib/api/client'
import { useRemotePageData } from '../../lib/api/use-remote-page-data'
import { ScreenContainer } from '../../lib/ui/ScreenContainer'
import { GentleCheckInCard } from './GentleCheckInCard'
import { MemberProfileHeader } from './MemberProfileHeader'
import { MemberStatusSummary } from './MemberStatusSummary'
import { MemberTimeline } from './MemberTimeline'

export function MemberDetailScreen() {
  const loadMemberDetailPage = useCallback(() => mobileApiClient.getMemberDetailPage(), [])
  const memberDetail = useRemotePageData({
    fallbackData: mobileApiClient.getFallbackMemberDetailPage(),
    load: loadMemberDetailPage,
  })
  const fallback = mobileApiClient.getFallbackMemberDetailPage()

  return (
    <ScreenContainer>
      <MemberProfileHeader
        lastUpdatedLabel={memberDetail.lastUpdatedLabel ?? fallback.lastUpdatedLabel}
        memberName={memberDetail.memberName ?? fallback.memberName}
        weeklyStatusCount={memberDetail.weeklyStatusCount ?? fallback.weeklyStatusCount}
      />
      <MemberStatusSummary summary={memberDetail.summary ?? fallback.summary} />
      <MemberTimeline timeline={memberDetail.timeline ?? fallback.timeline} />
      <GentleCheckInCard checkIn={memberDetail.gentleCheckIn ?? fallback.gentleCheckIn} />
    </ScreenContainer>
  )
}
