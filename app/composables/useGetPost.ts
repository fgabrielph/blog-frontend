import type { Post } from '~/types/post'

export const useGetPost = async(id: MaybeRef<string | number | string[] | undefined>) => {
  const post = ref<Post>({})
  
  const { data: response, pending, error, refresh } = await useGetData<{data: Post}>(
    () => '/api/blog/' + (toValue(id) || '')
  )

  post.value = response.value?.data || {}

  return {
    post,
    pending,
    error,
    refresh
  }
}