export interface MyPageData {
  reminders: {
    id: string
    label: string
    enabled: boolean
  }[]
  privacyShortcuts: {
    id: string
    label: string
  }[]
  familySettingsEntryLabel: string
}
