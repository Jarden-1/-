import { mobileApiClient } from '../../lib/api/client'
import { ScreenContainer } from '../../lib/ui/ScreenContainer'
import { CareSignalsPanel } from './CareSignalsPanel'
import { CompanionHero } from './CompanionHero'
import { FamilyPresenceList } from './FamilyPresenceList'
import { GentleNudgeCard } from './GentleNudgeCard'

export function FamilyCompanionScreen() {
  const familyCompanion = mobileApiClient.getFamilyCompanionPage()

  return (
    <ScreenContainer>
      <CompanionHero hero={familyCompanion.hero} />
      <CareSignalsPanel signals={familyCompanion.careSignals} />
      <GentleNudgeCard nudge={familyCompanion.gentleNudge} />
      <FamilyPresenceList members={familyCompanion.familyPresence} />
    </ScreenContainer>
  )
}
