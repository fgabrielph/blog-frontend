import type { User } from '~/types/user'
import type { Meta } from '~/types/pagination'
import type { Category } from '~/types/category'

export interface Post {
    id?: number
    author_id?: number
    category_id?: number
    title?: string
    content?: string
    is_published?: boolean             
    created_at?: string
    updated_at?: string

    author?: User
    category?: Category
}

export interface PostResponse {
  data: Post[]
  meta: Meta
}