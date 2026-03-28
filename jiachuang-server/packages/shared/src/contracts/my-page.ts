export interface MyProfileData {
  name: string
  subtitle: string
}

export interface AnniversaryReminder {
  id: string
  label: string
  dateLabel: string
}

export interface ReminderPreference {
  id: string
  label: string
  enabled: boolean
}

export interface PrivacyOption {
  id: string
  label: string
  description: string
}

export interface FamilySettingItem {
  id: string
  label: string
}

export interface MyPageData {
  profile: MyProfileData
  anniversaries: readonly AnniversaryReminder[]
  reminderPreferences: readonly ReminderPreference[]
  privacyOptions: readonly PrivacyOption[]
  familySettings: readonly FamilySettingItem[]
}
