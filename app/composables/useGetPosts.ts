import type { PostResponse } from '~/types/post'
import type { Post } from '~/types/post'
import type { FetchOptions } from '~/types/fetchOptions'
import type { Meta } from '~/types/pagination'

export const useGetPosts = async (options: FetchOptions = {}) => {
    const page = ref<number>(options.initialPage ?? 1)
    const limit = ref<number>(options.limit ?? 10)
    const posts = ref<Post[]>([])
    const meta = ref<Meta | null>(null)


    const {
        data: response,
        pending,
        error,
        refresh
    } = await useGetData<PostResponse>('/api/blog', {
        query: { page, limit }
    })

    posts.value = response?.value?.data ?? []

    return {
        posts,
        meta,
        page,
        limit,
        pending,
        error,
        refresh
    }
}