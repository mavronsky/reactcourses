export interface Course {
  id: string
  title: string
  description: string
  duration: number
  creationDate: string
  authors: string[]
}

export interface Author {
  id: string
  name: string
}
