import type { Post } from '~/types/post'

export const useDeletePost = () => {
    const client = useSanctumClient()

    const pending = ref<boolean>(false)
    const error = ref<string | null>(null)

    const deletePost = async (post: Post) => {
        if (pending.value || !post.id) return false

        pending.value = true
        error.value = null

        try {
            await client(`/api/posts/${post.id}`, { method: 'DELETE' })
            return true
        } catch (err) {
            error.value = 'Failed to delete the post.'
            return false
        } finally {
            pending.value = false
        }
    }

    return {
        pending,
        error,
        deletePost
    }
}
