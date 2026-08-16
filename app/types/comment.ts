import type { User } from '~/types/user'
import type { Post } from '~/types/post'

export interface Comment {
    id?: number
    author_id?: number
    post_id?: number
    content?: string
    created_at?: string
    updated_at?: string
    author?: User
    post?: Post
}
