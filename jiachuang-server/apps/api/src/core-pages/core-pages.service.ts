import { Injectable, Inject } from '@nestjs/common'

import { CorePagesStore } from './core-pages.store'

type UserRoleParam = 'child' | 'parent'

interface CreateStatusInput {
  authorRole: UserRoleParam
  text: string
  boundaryHint?: string
}

@Injectable()
export class CorePagesService {
  constructor(@Inject(CorePagesStore) private readonly store: CorePagesStore) {}

  getHome(_role: UserRoleParam = 'child') {
    // MVP: 暂时不区分角色，后续可以在这里做分支
    return this.store.getHome()
  }

  getPublishPage() {
    return this.store.getPublishPage()
  }

  getFeedbackPage() {
    return this.store.getFeedbackPage()
  }

  getFamilyVisits() {
    return this.store.getFamilyVisits()
  }

  getFamilyCompanion() {
    return this.store.getFamilyCompanion()
  }

  getMemberDetail(memberId: string) {
    return this.store.getMemberDetail(memberId)
  }

  getMyPage() {
    return this.store.getMyPage()
  }

  createStatus(input: CreateStatusInput) {
    const status = this.store.createStatus(input)
    return { status }
  }

  addReaction(statusId: string, reaction: string) {
    const reactionSummary = this.store.addReaction(statusId, reaction)
    return { reaction: reaction, reactionSummary }
  }

  addComment(statusId: string, text: string) {
    const comment = this.store.addComment(statusId, text)
    return { comment: comment.text }
  }
}
