import { Injectable } from '@nestjs/common'

import { mvpFixture } from '@jiachuang/shared'

interface InMemoryStatus {
  id: string
  authorRole: 'child' | 'parent'
  text: string
  boundaryHint: string | null
}

@Injectable()
export class CorePagesStore {
  private statuses: InMemoryStatus[] = []
  private reactions: { statusId: string; reaction: string }[] = []
  private comments: { statusId: string; text: string }[] = []

  getHome() {
    return mvpFixture.home
  }

  getPublishPage() {
    return mvpFixture.publishPage
  }

  getFeedbackPage() {
    return mvpFixture.feedbackPage
  }

  getFamilyVisits() {
    return mvpFixture.familyVisits
  }

  getFamilyCompanion() {
    return mvpFixture.familyCompanion
  }

  getMemberDetail(memberId: string) {
    // MVP: 忽略 memberId，只返回 canonical 示例
    return mvpFixture.memberDetail
  }

  getMyPage() {
    return mvpFixture.myPage
  }

  createStatus(input: { authorRole: 'child' | 'parent'; text: string; boundaryHint?: string }) {
    const status: InMemoryStatus = {
      id: `status-${Date.now()}`,
      authorRole: input.authorRole,
      text: input.text,
      boundaryHint: input.boundaryHint ?? null,
    }
    this.statuses.unshift(status)
    return status
  }

  addReaction(statusId: string, reaction: string) {
    this.reactions.push({ statusId, reaction })
    const reactionSummary = this.reactions.filter((r) => r.statusId === statusId)
    return reactionSummary
  }

  addComment(statusId: string, text: string) {
    this.comments.push({ statusId, text })
    return { statusId, text }
  }
}
