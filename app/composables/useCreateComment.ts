import type { Comment } from '~/types/comment'

export const useCreateComment = () => {
    const { execute, pending, error, validationErrors } = usePostData<Comment>()

    const create = async (postId: number | string, content: string) => {
        return await execute(`/api/posts/${postId}/comments`, { content })
    }

    return {
        create,
        pending,
        error,
        validationErrors
    }
}
