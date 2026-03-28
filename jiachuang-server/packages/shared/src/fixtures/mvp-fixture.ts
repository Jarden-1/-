import type { HomePageData } from '../contracts/home'
import type { PublishPageData } from '../contracts/publish-status'
import type { FeedbackPageData } from '../contracts/feedback'
import type { FamilyVisitsPageData } from '../contracts/family-visits'
import type { FamilyCompanionPageData } from '../contracts/family-companion'
import type { MemberDetailPageData } from '../contracts/member-detail'
import type { MyPageData } from '../contracts/my-page'
import {
  boundaryHintOptions,
  quickExpressionOptions,
  statusTagOptions,
} from '../contracts/publish-status'
import { topLevelTabs } from '../contracts/home'
import { presetReactionLabels, type ReactionOption } from '../domain/reaction'
import type { Status } from '../domain/status'

export interface MvpFixture {
  navigation: {
    tabs: typeof topLevelTabs
  }
  home: HomePageData
  publishPage: PublishPageData
  feedbackPage: FeedbackPageData
  familyVisits: FamilyVisitsPageData
  familyCompanion: FamilyCompanionPageData
  memberDetail: MemberDetailPageData
  myPage: MyPageData
}

const feedbackReactionOptions: readonly ReactionOption[] = presetReactionLabels.map((label) => ({
  id: label,
  label,
}))

const familyTimeline: readonly Status[] = [
  {
    id: 'status-1',
    authorId: 'member-xiaoyu',
    authorName: '小雨',
    authorRole: 'child',
    publishedAt: '2026-03-27T21:14:00+08:00',
    publishedAtLabel: '昨天 21:14',
    text: '刚吃完饭，准备休息了。',
    tags: ['刚吃完饭', '准备休息了'],
    boundaryHint: '今天有点忙',
    reactionSummary: [
      { label: '知道啦', count: 1 },
      { label: '放心了', count: 1 },
    ],
    commentPreview: ['妈妈：注意身体'],
  },
  {
    id: 'status-2',
    authorId: 'member-mom',
    authorName: '妈妈',
    authorRole: 'parent',
    publishedAt: '2026-03-27T18:32:00+08:00',
    publishedAtLabel: '昨天 18:32',
    text: '今天买了些菜，晚上做红烧鱼。',
    tags: ['今天还不错'],
    reactionSummary: [{ label: '知道啦', count: 1 }],
    commentPreview: [],
  },
]

export const corePagesFixture: MvpFixture = {
  navigation: {
    tabs: topLevelTabs,
  },
  home: {
    layoutOrder: [
      'FamilyPhotoHero',
      'MiniOverviewStrip',
      'PrimaryStatusEntry',
      'FamilyTimeline',
    ],
    hero: {
      greeting: '晚上好，看看家里的近况',
      subtitle: '今天家里有一些新动态，也可以顺手发个状态。',
      imageAlt: '家庭封面照片',
    },
    overviewItems: [
      { id: 'recent-visits', label: '家里最近来看过你的近况' },
      { id: 'recent-updates', label: '今天已有 2 位家人更新' },
      { id: 'gentle-nudge', label: '小雨已经 3 天没更新了' },
    ],
    primaryAction: {
      label: '发个状态',
      quickExpressions: [...quickExpressionOptions],
    },
    timeline: familyTimeline,
  },
  publishPage: {
    composerPlaceholder: '今天想让家里知道点什么？',
    quickExpressionOptions: [...quickExpressionOptions],
    statusTagOptions: [...statusTagOptions],
    boundaryHintOptions: [...boundaryHintOptions],
    mediaPickerLabel: '发张照片',
    submitLabel: '发布',
  },
  feedbackPage: {
    title: '补一句关心',
    description: '先用一个轻反馈，让家里知道你看到了。',
    reactionOptions: feedbackReactionOptions,
    commentPlaceholder: '留一句话',
    submitLabel: '发送',
  },
  familyVisits: {
    totalVisitCount: 28,
    totalVisitLabel: '家里累计查看过你的状态 28 次',
    latestVisit: {
      visitorName: '妈妈',
      visitedAtLabel: '今天 21:14',
    },
    topVisitorInPastWeek: {
      visitorName: '妈妈',
      summary: '近 7 天看得最多的是妈妈',
    },
    records: [
      {
        id: 'visit-1',
        visitorId: 'member-mom',
        visitorName: '妈妈',
        visitedAtLabel: '今天 21:14',
      },
      {
        id: 'visit-2',
        visitorId: 'member-dad',
        visitorName: '爸爸',
        visitedAtLabel: '昨天 20:08',
      },
    ],
  },
  familyCompanion: {
    hero: {
      kind: 'plant',
      title: '家里的小家园',
      moodText: '最近家里有人常来看看，它看起来很有精神',
      description: '这些轻轻的关心，会慢慢留在这个共同空间里。',
    },
    careSignals: [
      { id: 'signal-1', text: '妈妈昨天来看过你的近况' },
      { id: 'signal-2', text: '你今天发了一条新状态' },
      { id: 'signal-3', text: '最近有人在照看这个小家' },
    ],
    gentleNudge: {
      memberId: 'member-xiaoyu',
      message: '已经有几天没看到小雨的近况了',
      actionLabel: '轻轻问问',
    },
    familyPresence: [
      { memberId: 'member-mom', name: '妈妈', latestActivity: '今天来看过' },
      { memberId: 'member-dad', name: '爸爸', latestActivity: '3 天前更新' },
      { memberId: 'member-xiaoyu', name: '小雨', latestActivity: '最近还没有新状态' },
    ],
  },
  memberDetail: {
    memberId: 'member-xiaoyu',
    memberName: '小雨',
    memberRole: 'child',
    lastUpdatedLabel: '昨天 21:14',
    weeklyStatusCount: 2,
    summary: {
      latestStatusText: '刚吃完饭，准备休息了。',
      latestUpdatedAtLabel: '昨天 21:14',
      latestTags: ['刚吃完饭', '准备休息了'],
      rhythmLabel: '最近状态整体比较稳定',
    },
    timeline: familyTimeline.filter((status) => status.authorId === 'member-xiaoyu'),
    gentleCheckIn: {
      message: '已经有几天没看到 TA 的新近况了',
      actionLabel: '送个关心',
    },
  },
  myPage: {
    profile: {
      name: '小雨',
      subtitle: '和家里保持轻轻的联系',
    },
    anniversaries: [
      { id: 'anniversary-mom', label: '妈妈生日', dateLabel: '4 月 12 日' },
      { id: 'anniversary-family', label: '结婚纪念日', dateLabel: '10 月 18 日' },
    ],
    reminderPreferences: [
      { id: 'comment-reminder', label: '有人留言时提醒我', enabled: true },
      { id: 'visit-reminder', label: '家里来看过时提醒我', enabled: false },
    ],
    privacyOptions: [
      {
        id: 'visit-summary',
        label: '展示来访相关摘要',
        description: '让家人知道我最近被看见了多少次。',
      },
      {
        id: 'family-space-trace',
        label: '允许在家庭空间中显示互动痕迹',
        description: '在家园页展示轻量的关心记录。',
      },
    ],
    familySettings: [
      { id: 'family-cover', label: '家庭封面图' },
      { id: 'family-name', label: '家庭名称' },
      { id: 'family-members', label: '家庭成员入口' },
      { id: 'family-invite', label: '邀请家人' },
    ],
  },
}

export const mvpFixture: MvpFixture = corePagesFixture
