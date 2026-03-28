import type {
  FamilyCompanionPageData,
  FamilyVisitsPageData,
  FeedbackPageData,
  HomePageData,
  MemberDetailPageData,
  MyPageData,
  PublishPageData,
} from '@jiachuang/shared'
import { corePagesFixture } from '@jiachuang/shared'

export const API_BASE_URL =
  process.env.EXPO_PUBLIC_API_BASE_URL ?? 'http://14.103.219.42/jiachuang-api'

async function fetchJson<T>(path: string): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      Accept: 'application/json',
    },
  })

  if (!response.ok) {
    throw new Error(`Request failed: ${response.status}`)
  }

  return (await response.json()) as T
}

export const mobileApiClient = {
  getNavigation() {
    return corePagesFixture.navigation
  },
  getFallbackHomePage() {
    return corePagesFixture.home
  },
  getFallbackPublishPage() {
    return corePagesFixture.publishPage
  },
  getFallbackFeedbackPage() {
    return corePagesFixture.feedbackPage
  },
  getFallbackFamilyVisitsPage() {
    return corePagesFixture.familyVisits
  },
  getFallbackFamilyCompanionPage() {
    return corePagesFixture.familyCompanion
  },
  getFallbackMemberDetailPage() {
    return corePagesFixture.memberDetail
  },
  getFallbackMyPage() {
    return corePagesFixture.myPage
  },
  getHealth() {
    return fetchJson<{ ok: boolean }>('/health')
  },
  getHomePage() {
    return fetchJson<HomePageData>('/core-pages/home')
  },
  getPublishPage() {
    return fetchJson<PublishPageData>('/core-pages/publish-page')
  },
  getFeedbackPage() {
    return fetchJson<FeedbackPageData>('/core-pages/feedback-page')
  },
  getFamilyVisitsPage() {
    return fetchJson<FamilyVisitsPageData>('/core-pages/family-visits')
  },
  getFamilyCompanionPage() {
    return fetchJson<FamilyCompanionPageData>('/core-pages/family-companion')
  },
  getMemberDetailPage(memberId = corePagesFixture.memberDetail.memberId) {
    return fetchJson<MemberDetailPageData>(`/core-pages/member-detail/${memberId}`)
  },
  getMyPage() {
    return fetchJson<MyPageData>('/core-pages/my-page')
  },
}
