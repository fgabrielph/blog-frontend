import type { CategoryResponse } from '~/types/category'
import type { Meta } from '~/types/pagination'
import type { Category } from '~/types/category'

export const useGetCategories = async () => {
    const categories = ref<Category[]>([])
    const meta = ref<Meta | null>(null)


    const {
        data: response,
        pending,
        error,
        refresh
    } = await useGetData<CategoryResponse>('/api/categories?has_posts=true')

    categories.value = response?.value?.data ?? []

    return {
        categories,
        meta,
        pending,
        error,
        refresh
    }
}