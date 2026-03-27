export interface Status {
  id: string
  authorId: string
  createdAt: string
  text?: string
  imageUrl?: string
  tags?: readonly string[]
}
