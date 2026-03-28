import type { ReactionOption } from '../domain/reaction'

export interface FeedbackPageData {
  title: string
  description: string
  reactionOptions: readonly ReactionOption[]
  commentPlaceholder: string
  submitLabel: '发送'
}
