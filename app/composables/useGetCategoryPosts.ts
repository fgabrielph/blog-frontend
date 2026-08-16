import type { PostResponse, Post } from '~/types/post'
import type { Meta } from '~/types/pagination'

export const useGetCategoryPosts = (id: MaybeRef<string | number | string[] | undefined>) => {
    const page = ref<number>(1)

    const {
        data: response,
        pending,
        error,
        refresh
    } = useGetData<PostResponse>(
        () => '/api/categories/' + (toValue(id) || ''),
        {
            query: { page },
            lazy: true
        }
    )

    const posts = computed<Post[]>(() => response.value?.data ?? [])
    const meta = computed<Meta>(() => response.value?.meta ?? {
        current_page: 1,
        last_page: 1,
        per_page: 10,
        total: 0
    })

    return {
        posts,
        meta,
        page,
        pending,
        error,
        refresh
    }
}
