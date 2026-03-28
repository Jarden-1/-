import { useCallback } from 'react'
import { mobileApiClient } from '../../lib/api/client'
import { useRemotePageData } from '../../lib/api/use-remote-page-data'
import { ScreenContainer } from '../../lib/ui/ScreenContainer'
import { CareSignalsPanel } from './CareSignalsPanel'
import { CompanionHero } from './CompanionHero'
import { FamilyPresenceList } from './FamilyPresenceList'
import { GentleNudgeCard } from './GentleNudgeCard'

export function FamilyCompanionScreen() {
  const loadFamilyCompanionPage = useCallback(
    () => mobileApiClient.getFamilyCompanionPage(),
    [],
  )
  const familyCompanion = useRemotePageData({
    fallbackData: mobileApiClient.getFallbackFamilyCompanionPage(),
    load: loadFamilyCompanionPage,
  })
  const fallback = mobileApiClient.getFallbackFamilyCompanionPage()

  return (
    <ScreenContainer>
      <CompanionHero hero={familyCompanion.hero ?? fallback.hero} />
      <CareSignalsPanel signals={familyCompanion.careSignals ?? fallback.careSignals} />
      <GentleNudgeCard nudge={familyCompanion.gentleNudge ?? fallback.gentleNudge} />
      <FamilyPresenceList members={familyCompanion.familyPresence ?? fallback.familyPresence} />
    </ScreenContainer>
  )
}
