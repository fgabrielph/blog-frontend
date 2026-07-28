import type { FormError, FormSubmitEvent } from '@nuxt/ui'
import { FetchError } from 'ofetch'

export const useLogin = () => {

    const toast = useToast()
    const { login } = useSanctumAuth()

    const state = reactive({
        email: undefined,
        password: undefined
    })

    type Schema = typeof state

    function validate(state: Partial<Schema>): FormError[] {
        const errors = []
        if (!state.email) errors.push({ name: 'email', message: 'Required' })
        if (!state.password) errors.push({ name: 'password', message: 'Required' })
        return errors
    }


    async function onSubmit(event: FormSubmitEvent<Schema>) {

        try {
            await login(event.data)
            toast.add({ 
            title: 'Welcome back!', 
            description: 'Logged in successfully.', 
            color: 'success' 
            })

        } catch (error) {

            if (error instanceof FetchError) {
                const message = error.data?.message || 'Invalid email or password.'

                toast.add({ 
                    title: 'Login Failed', 
                    description: message, 
                    color: 'error' 
                })
                return
            }

            toast.add({ 
                title: 'Error', 
                description: 'An unexpected error occurred. Please try again.', 
                color: 'error' 
            })

        }

    }

    return {
        state,
        validate,
        onSubmit
    }

}
