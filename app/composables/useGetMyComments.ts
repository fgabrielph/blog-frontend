import type { Comment } from '~/types/comment'
import type { Meta } from '~/types/pagination'

export const useGetMyComments = (options: { initialPage?: number; limit?: number } = {}) => {
    const client = useSanctumClient()

    const page = ref<number>(options.initialPage ?? 1)
    const limit = ref<number>(options.limit ?? 5)
    const pending = ref<boolean>(false)
    const error = ref<string | null>(null)
    const data = ref<{ data: Comment[]; meta: Meta } | null>(null)

    const fetchComments = async () => {
        pending.value = true
        error.value = null

        try {
            data.value = await client<{ data: Comment[]; meta: Meta }>('/api/profile/comments', {
                query: { page: page.value, limit: limit.value }
            })
        } catch (err) {
            error.value = 'Failed to load your comments.'
        } finally {
            pending.value = false
        }
    }

    watch(page, fetchComments, { immediate: true })

    const comments = computed<Comment[]>(() => data.value?.data ?? [])
    const meta = computed<Meta>(() => data.value?.meta ?? {
        current_page: 1,
        last_page: 1,
        per_page: limit.value,
        total: 0
    })

    return {
        comments,
        meta,
        page,
        limit,
        pending,
        error,
        refresh: fetchComments
    }
}
