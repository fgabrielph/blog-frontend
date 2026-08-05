import type { CategoryResponse, Category } from '~/types/category'
import type { Meta } from '~/types/pagination'

export const useGetCategories = () => {
    const {
        data: response,
        pending,
        error,
        refresh
    } = useGetData<CategoryResponse>('/api/categories?has_posts=true')

    const categories = computed<Category[]>(() => response.value?.data ?? [])

    const meta = computed<Meta>(() => response.value?.meta ?? {
        current_page: 1,
        last_page: 1,
        per_page: 10,
        total: 0
    })

    return {
        categories,
        meta,
        pending,
        error,
        refresh
    }
}