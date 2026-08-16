import type { Meta } from '~/types/pagination'

export interface Category {
    id?: number
    name?: string
    slug?: string
    posts_count?: number
    created_at?: string
    updated_at?: string
}

export interface CategoryResponse {
    data: Category[]
    meta: Meta
}