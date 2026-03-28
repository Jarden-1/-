import { corePagesFixture } from '@jiachuang/shared'

export const mobileApiClient = {
  getNavigation() {
    return corePagesFixture.navigation
  },
  getHomePage() {
    return corePagesFixture.home
  },
  getPublishPage() {
    return corePagesFixture.publishPage
  },
  getFeedbackPage() {
    return corePagesFixture.feedbackPage
  },
  getFamilyVisitsPage() {
    return corePagesFixture.familyVisits
  },
  getFamilyCompanionPage() {
    return corePagesFixture.familyCompanion
  },
  getMemberDetailPage() {
    return corePagesFixture.memberDetail
  },
  getMyPage() {
    return corePagesFixture.myPage
  },
}
