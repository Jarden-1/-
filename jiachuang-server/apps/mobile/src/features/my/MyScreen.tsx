import { useCallback } from 'react'
import { mobileApiClient } from '../../lib/api/client'
import { useRemotePageData } from '../../lib/api/use-remote-page-data'
import { ScreenContainer } from '../../lib/ui/ScreenContainer'
import { AnniversaryRemindersCard } from './AnniversaryRemindersCard'
import { FamilySpaceSettings } from './FamilySpaceSettings'
import { MyProfileHeader } from './MyProfileHeader'
import { PrivacyAndVisibilityCard } from './PrivacyAndVisibilityCard'
import { ReminderPreferencesCard } from './ReminderPreferencesCard'

export function MyScreen() {
  const loadMyPage = useCallback(() => mobileApiClient.getMyPage(), [])
  const myPage = useRemotePageData({
    fallbackData: mobileApiClient.getFallbackMyPage(),
    load: loadMyPage,
  })
  const fallback = mobileApiClient.getFallbackMyPage()

  return (
    <ScreenContainer>
      <MyProfileHeader profile={myPage.profile ?? fallback.profile} />
      <AnniversaryRemindersCard anniversaries={myPage.anniversaries ?? fallback.anniversaries} />
      <ReminderPreferencesCard
        preferences={myPage.reminderPreferences ?? fallback.reminderPreferences}
      />
      <PrivacyAndVisibilityCard options={myPage.privacyOptions ?? fallback.privacyOptions} />
      <FamilySpaceSettings settings={myPage.familySettings ?? fallback.familySettings} />
    </ScreenContainer>
  )
}
