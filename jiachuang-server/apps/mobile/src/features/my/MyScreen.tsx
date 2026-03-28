import { mobileApiClient } from '../../lib/api/client'
import { ScreenContainer } from '../../lib/ui/ScreenContainer'
import { AnniversaryRemindersCard } from './AnniversaryRemindersCard'
import { FamilySpaceSettings } from './FamilySpaceSettings'
import { MyProfileHeader } from './MyProfileHeader'
import { PrivacyAndVisibilityCard } from './PrivacyAndVisibilityCard'
import { ReminderPreferencesCard } from './ReminderPreferencesCard'

export function MyScreen() {
  const myPage = mobileApiClient.getMyPage()

  return (
    <ScreenContainer>
      <MyProfileHeader profile={myPage.profile} />
      <AnniversaryRemindersCard anniversaries={myPage.anniversaries} />
      <ReminderPreferencesCard preferences={myPage.reminderPreferences} />
      <PrivacyAndVisibilityCard options={myPage.privacyOptions} />
      <FamilySpaceSettings settings={myPage.familySettings} />
    </ScreenContainer>
  )
}
