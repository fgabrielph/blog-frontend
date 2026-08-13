import type { FormError, FormSubmitEvent } from '@nuxt/ui'
import type { Post } from '~/types/post'
import type { CategoryResponse } from '~/types/category'

export const useUpdatePost = async (postId: MaybeRef<string | number | string[] | undefined>) => {
    const toast = useToast()

    const { execute, pending: isSubmitting, error: submitError, validationErrors } = usePostData<Post>()
    const { data: response, pending: categoriesPending } = useGetData<CategoryResponse>('/api/categories')

    const categories = computed(() => response.value?.data ?? [])

    const { post, pending: postPending, error: postError } = await useGetPost(postId)

    const activeTab = ref('0')
    const tabItems = [
        { label: 'Write', icon: 'i-lucide-edit-3', slot: 'write' },
        { label: 'Preview', icon: 'i-lucide-eye', slot: 'preview' }
    ]

    const state = reactive<Post>({
        title: '',
        category_id: undefined,
        content: '',
        is_published: true
    })

    watch(post, (value) => {
        if (!value?.id) return

        state.title = value.title ?? ''
        state.category_id = value.category_id
        state.content = value.content ?? ''
        state.is_published = Boolean(value.is_published)
    }, { immediate: true })

    function validate(state: Post): FormError[] {
        const errors: FormError[] = []

        if (!state.category_id || state.category_id === 0) {
            errors.push({ name: 'category_id', message: 'Please select a category' })
        }
        if (!state.title?.trim()) {
            errors.push({ name: 'title', message: 'Title is required' })
        }
        if (!state.content?.trim()) {
            errors.push({ name: 'content', message: 'Content cannot be empty' })
        }

        return errors
    }

    async function onSubmit(event: FormSubmitEvent<Post>) {
        if (isSubmitting.value) return

        const id = toValue(postId)

        const response = await execute(`/api/posts/${id}`, event.data, 'PUT')

        if (response) {
            toast.add({
                title: state.is_published ? 'Post Updated!' : 'Draft Updated!',
                description: state.is_published
                ? 'Your article has been updated successfully.'
                : 'Your draft has been updated successfully.',
                color: 'success'
            })

            navigateTo('/blogs')
        } else {
            toast.add({
                title: 'Error Updating Post',
                description: submitError.value || 'Please check your inputs and try again.',
                color: 'error'
            })
        }
    }

    return {
        state,
        categories,
        categoriesPending,
        isSubmitting,
        submitError,
        validationErrors,
        postPending,
        postError,
        activeTab,
        tabItems,
        validate,
        onSubmit
    }
}
