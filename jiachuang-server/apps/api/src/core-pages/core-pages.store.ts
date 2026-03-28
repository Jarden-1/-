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
    return {
      ...mvpFixture.memberDetail,
      memberId,
    }
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
    const reactionSummary = this.reactions
      .filter((entry) => entry.statusId === statusId)
      .reduce<Array<{ label: string; count: number }>>((summary, entry) => {
        const existing = summary.find((item) => item.label === entry.reaction)

        if (existing) {
          existing.count += 1
          return summary
        }

        summary.push({
          label: entry.reaction,
          count: 1,
        })

        return summary
      }, [])

    return reactionSummary
  }

  addComment(statusId: string, text: string) {
    this.comments.push({ statusId, text })
    return { statusId, text }
  }
}
