import type { HomePageData } from '../contracts/home'
import type { PublishPageData } from '../contracts/publish-status'
import type { FeedbackPageData } from '../contracts/feedback'
import type { FamilyVisitsPageData } from '../contracts/family-visits'
import type { FamilyCompanionPageData } from '../contracts/family-companion'
import type { MemberDetailPageData } from '../contracts/member-detail'
import type { MyPageData } from '../contracts/my-page'
import { quickExpressionOptions } from '../contracts/publish-status'

export interface MvpFixture {
  home: HomePageData
  publishPage: PublishPageData
  feedbackPage: FeedbackPageData
  familyVisits: FamilyVisitsPageData
  familyCompanion: FamilyCompanionPageData
  memberDetail: MemberDetailPageData
  myPage: MyPageData
}

export const mvpFixture: MvpFixture = {
  home: {
    layoutOrder: [
      'FamilyPhotoHero',
      'MiniOverviewStrip',
      'PrimaryStatusEntry',
      'FamilyTimeline',
    ],
    primaryAction: {
      label: '发个状态',
    },
  },
  publishPage: {
    composerPlaceholder: '随手写一句今天的近况…',
    statusTagOptions: [...quickExpressionOptions],
    boundaryOptions: ['全家可见', '仅父母可见'],
  },
  feedbackPage: {
    title: '给家人一点轻反馈',
    description: '用一个小小的回应，让对方知道你看到了 TA。',
    reactionOptions: [],
  },
  familyVisits: {
    seenBySummary: '最近 24 小时内，家人看了 3 次家窗',
    recentVisitors: [],
  },
  familyCompanion: {
    title: '小家园',
    mood: 'happy',
    progressDescription: '最近家人的互动不错，小家园长得很好。',
  },
  memberDetail: {
    memberId: 'child-1',
    memberName: '小朋友',
    recentStatuses: [],
  },
  myPage: {
    reminders: [],
    privacyShortcuts: [],
    familySettingsEntryLabel: '家庭设置',
  },
}

export const corePagesFixture = {
  home: mvpFixture.home,
}
