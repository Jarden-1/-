export const presetReactionLabels = ['知道啦', '放心了', '注意身体'] as const

export type ReactionLabel = (typeof presetReactionLabels)[number]

export interface ReactionOption {
  id: string
  label: ReactionLabel
}

export interface ReactionSummaryItem {
  label: ReactionLabel
  count: number
}
