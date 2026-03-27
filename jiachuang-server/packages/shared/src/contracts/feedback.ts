import type { ReactionOption } from '../domain/reaction'

export interface FeedbackPageData {
  title: string
  description?: string
  reactionOptions: ReactionOption[]
}
