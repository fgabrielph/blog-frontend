import type { Comment } from '~/types/comment'
import type { Meta } from '~/types/pagination'

export const useGetComments = (postId: MaybeRef<string | number | string[] | undefined>) => {
    const page = ref<number>(1)
    const limit = ref<number>(5)

    const {
        data: response,
        pending,
        error,
        refresh
    } = useGetData<{ data: Comment[]; meta: Meta }>(
        () => '/api/posts/' + (toValue(postId) || '') + '/comments',
        {
            query: { page, limit },
            lazy: true
        }
    )

    const comments = computed<Comment[]>(() => response.value?.data ?? [])
    const meta = computed<Meta>(() => response.value?.meta ?? {
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
        refresh
    }
}
