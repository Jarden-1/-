import type { MemberRole } from './member-role'
import type { ReactionSummaryItem } from './reaction'

export interface Status {
  id: string
  authorId: string
  authorName: string
  authorRole: MemberRole
  publishedAt: string
  publishedAtLabel: string
  text: string
  imageUrl?: string
  tags: readonly string[]
  boundaryHint?: string | null
  reactionSummary: readonly ReactionSummaryItem[]
  commentPreview: readonly string[]
}
