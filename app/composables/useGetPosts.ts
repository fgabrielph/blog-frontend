import type { PostResponse, Post } from '~/types/post'
import type { Meta } from '~/types/pagination'
import type { FetchOptions } from '~/types/fetchOptions'

export const useGetPosts = (options: FetchOptions = {}) => {
    const page = ref<number>(options.initialPage ?? 1)
    const limit = ref<number>(options.limit ?? 5)

    const {
        data: response,
        pending,
        error,
        refresh
    } = useGetData<PostResponse>('/api/blog', {
        query: { page, limit },
        lazy: true
    })

    const posts = computed<Post[]>(() => response.value?.data ?? [])
    const meta = computed<Meta>(() => response.value?.meta ?? {
        current_page: 1,
        last_page: 1,
        per_page: limit.value,
        total: 0
    })

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