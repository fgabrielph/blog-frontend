import type { PostResponse, Post } from '~/types/post'
import type { Meta } from '~/types/pagination'

export const useGetMyPosts = (options: { initialPage?: number; limit?: number } = {}) => {
    const client = useSanctumClient()

    const page = ref<number>(options.initialPage ?? 1)
    const limit = ref<number>(options.limit ?? 5)
    const pending = ref<boolean>(false)
    const error = ref<string | null>(null)
    const data = ref<PostResponse | null>(null)

    const fetchPosts = async () => {
        pending.value = true
        error.value = null

        try {
            data.value = await client<PostResponse>('/api/posts', {
                query: { page: page.value, limit: limit.value }
            })
        } catch (err) {
            error.value = 'Failed to load your posts.'
        } finally {
            pending.value = false
        }
    }

    watch(page, fetchPosts, { immediate: true })

    const posts = computed<Post[]>(() => data.value?.data ?? [])
    const meta = computed<Meta>(() => data.value?.meta ?? {
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
        refresh: fetchPosts
    }
}
