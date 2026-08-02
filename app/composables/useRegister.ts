import type { FormError, FormSubmitEvent } from '@nuxt/ui'
import type { RegisterResponse } from '~/types/registerResponse'
import { FetchError } from 'ofetch'


export const useRegister = () => {

    const toast = useToast()
    const { login } = useSanctumAuth()

    const formRef = ref<{ setErrors: (errors: FormError[]) => void } | null>(null)

    const { execute: registerUser, pending, error, validationErrors } = usePostData<RegisterResponse>()

    const state = reactive({
        email: undefined,
        password: undefined,
        password_confirmation: undefined,
        first_name: undefined,
        last_name: undefined,
        age: null as number | null,
        gender: undefined,
        custom_gender: '',
    })

    type Schema = typeof state

    function validate(state: Partial<Schema>): FormError[] {
        const errors = []
        if (!state.email) errors.push({ name: 'email', message: 'Required' })
        if (!state.password) errors.push({ name: 'password', message: 'Required' })
        if (state.password_confirmation !== state.password) {
            errors.push({ name: 'password_confirmation', message: 'Passwords do not match' }) 
        }
        if (!state.first_name) errors.push({ name: 'first_name', message: 'First Name Required' })
        if (!state.last_name) errors.push({ name: 'last_name', message: 'Last Name Required' })
        if (state.gender === 'other' && !state.custom_gender) errors.push({ name: 'custom_gender', message: 'Please input your gender'})
        return errors
    }


    async function onSubmit(event: FormSubmitEvent<Schema>) {

        if (pending.value) return

        await registerUser('/api/register', event.data)

        if (validationErrors.value && formRef.value) {
            const formattedErrors: FormError[] = Object.entries(validationErrors.value).flatMap(
                ([field, messages]) => messages.map(message => ({ name: field, message }))
            )
            formRef.value.setErrors(formattedErrors)

            toast.add({
                title: 'Registration Failed',
                description: 'Please check your inputs and try again.',
                color: 'error'
            })
            return
        }

        if (error.value) {
            toast.add({
                title: 'Server Error',
                description: error.value,
                color: 'error'
            })
            return
        }

        try {
            await login({
                email: event.data.email,
                password: event.data.password
            })

            toast.add({
                title: 'Account created!',
                description: 'Logging you in...',
                color: 'success'
            })

        } catch (e) {

            if (e instanceof FetchError) {
                const message = e.data?.message || 'Login failed after registration.'

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
        pending,
        formRef,
        validate,
        onSubmit
    }

}
