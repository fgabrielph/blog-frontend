import type { Post } from '~/types/post'

export const useGetPost = async(id: MaybeRef<string | number | string[] | undefined>) => {
    const { data: response, pending, error, refresh } = await useGetData<{data: Post}>(
        () => '/api/blog/' + (toValue(id) || '')
    )

    const post = computed<Post>(() => response.value?.data ?? {})

    return {
        post,
        pending,
        error,
        refresh
    }
}