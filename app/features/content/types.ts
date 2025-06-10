export type Content = {
    id: string
    type: 'text' | 'video' | 'image' | 'quiz' // 필요 시 확장 가능
    value: string // 텍스트, 영상 URL, 이미지 URL 등
    order: number
  }