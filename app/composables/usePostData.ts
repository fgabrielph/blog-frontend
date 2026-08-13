import { FetchError } from 'ofetch'

export const usePostData = <T = unknown>() => {
    const client = useSanctumClient()

    const pending = ref<boolean>(false)
    const error = ref<string | null>(null)
    const data = ref<T | null>(null)

    const validationErrors = ref<Record<string, string[]> | null>(null)

    const execute = async (endpoint: string, payload: Record<string, any>, method: 'POST' | 'PUT' | 'PATCH' = 'POST') => {

        pending.value = true
        error.value = null
        validationErrors.value = null

        try {
            
            const response = await client<T>(endpoint, {
                method,
                body: payload
            })

            data.value = response

            return response

        } catch (err) {

            if (err instanceof FetchError) {

                error.value = err.data?.message || 'A request error occurred.'

                if (err.status === 422 && err.data?.errors) {
                    validationErrors.value = err.data.errors
                } else {
                    error.value = err.data?.message || err.statusText || 'A network error occurred.'
                }

            } else {
                error.value = 'An unexpected error occurred.'
            }

            return null

        } finally {
            pending.value = false
        }
    }

    return {
        execute,
        data,
        pending,
        validationErrors,
        error
    }
}