export const quickExpressionOptions = [
  '随手写一句',
  '发张照片',
  '今天还不错',
  '刚吃完饭',
  '准备休息了',
  '想说两句',
] as const

export interface PublishPageData {
  composerPlaceholder: string
  statusTagOptions: readonly string[]
  boundaryOptions: readonly string[]
}
