export const quickExpressionOptions = [
  '随手写一句',
  '发张照片',
  '今天还不错',
  '刚吃完饭',
  '准备休息了',
  '想说两句',
] as const

export const statusTagOptions = [
  '今天还不错',
  '刚吃完饭',
  '在路上',
  '准备休息了',
] as const

export const boundaryHintOptions = ['今天有点忙', '晚点联系', '不想展开聊'] as const

export interface PublishPageData {
  composerPlaceholder: string
  quickExpressionOptions: readonly string[]
  statusTagOptions: readonly string[]
  boundaryHintOptions: readonly string[]
  mediaPickerLabel: string
  submitLabel: '发布'
}
