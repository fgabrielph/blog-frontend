import type { FormError, FormSubmitEvent } from '@nuxt/ui'
import type { Post } from '~/types/post'
import type { Category, CategoryResponse } from '~/types/category'

export const useCreatePost = () => {
    const toast = useToast()
    
    const { execute, pending: isSubmitting, error: submitError, validationErrors } = usePostData<Post>()
    const { data: response, pending: categoriesPending, error: categoriesError } = useGetData<CategoryResponse>('/api/categories')

    const categories = computed(() => response.value?.data ?? [])

    const activeTab = ref('write')
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

            const response = await execute('/api/posts', event.data)

        if (response) {
            toast.add({
                title: state.is_published ? 'Post Published!' : 'Draft Saved!',
                description: state.is_published 
                ? 'Your article is now live.' 
                : 'Your draft has been saved successfully.',
                color: 'success'
            })

            navigateTo('/blogs')
        } else {
            toast.add({
                title: 'Error Saving Post',
                description: submitError.value || 'Please check your inputs and try again.',
                color: 'error'
            })
        }
    }

    return {
        state,
        categories,
        categoriesPending,
        categoriesError,
        isSubmitting,
        submitError,
        validationErrors,
        activeTab,
        tabItems,
        validate,
        onSubmit
    }
}