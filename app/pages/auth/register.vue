<script setup lang="ts">
import { ref, watch } from 'vue'

    definePageMeta({
        middleware: ['sanctum:guest'],
    });

    const blockInvalidAgeKeys = (e: KeyboardEvent) => {
        if (['-', '+', '.', 'e', 'E'].includes(e.key)) {
            e.preventDefault()
        }
    }

    const genderOptions = [
        { label: 'Male', value: 'male' },
        { label: 'Female', value: 'female' },
        { label: 'Rather not say', value: 'rather_not_say' },
        { label: 'Other', value: 'other' }
    ]

    const { state, validate, onSubmit, pending, formRef } = useRegister()
    const showPassword = ref(false)
    const showConfirmPassword = ref(false)


    watch(() => state.gender, (newGender) => {
        if (newGender !== 'other') {
            state.custom_gender = ''
        }
    })
</script>

<template>
    <UForm ref="formRef" :validate="validate" :state="state" class="space-y-4" @submit="onSubmit">
        <UFormField label="First Name" name="first_name">
            <UInput v-model="state.first_name" />
        </UFormField>

        <UFormField label="Last Name" name="last_name">
            <UInput v-model="state.last_name" />
        </UFormField>

        <UFormField label="Age" name="age">
            <UInput v-model.number="state.age" type="number" :min="1" :max="125" placeholder="Enter your age" @keydown="blockInvalidAgeKeys" />
        </UFormField>

        <UFormField label="Gender" name="gender">
            <USelect
                v-model="state.gender"
                :items="genderOptions"
                placeholder="Select gender"
                class="w-full"
            />
        </UFormField>

        <UFormField
            v-if="state.gender === 'other'"
            label="Please specify gender"
            name="custom_gender"
        >
            <UInput v-model="state.custom_gender" placeholder="Specify your gender" />
        </UFormField>

        <UFormField label="Email" name="email">
            <UInput v-model="state.email" />
        </UFormField>

        <UFormField label="Password" name="password">
            <UInput
                v-model="state.password"
                :type="showPassword ? 'text' : 'password'"
                :ui="{ trailing: 'pe-1' }"
            >
                <template #trailing>
                    <UButton
                        color="neutral"
                        variant="link"
                        size="sm"
                        :icon="showPassword ? 'i-lucide-eye-off' : 'i-lucide-eye'"
                        :aria-label="showPassword ? 'Hide password' : 'Show password'"
                        @click="() => { showPassword = !showPassword }"
                    />
                </template>
            </UInput>
        </UFormField>

        <UFormField label="Confirm Password" name="password_confirmation">
            <UInput
                v-model="state.password_confirmation"
                :type="showConfirmPassword ? 'text' : 'password'"
                :ui="{ trailing: 'pe-1' }"
            >
                <template #trailing>
                    <UButton
                        color="neutral"
                        variant="link"
                        size="sm"
                        :icon="showConfirmPassword ? 'i-lucide-eye-off' : 'i-lucide-eye'"
                        :aria-label="showConfirmPassword ? 'Hide confirm password' : 'Show confirm password'"
                        @click="() => { showConfirmPassword = !showConfirmPassword }"
                    />
                </template>
            </UInput>
        </UFormField>
        
        <UButton type="submit" :loading="pending" :disabled="pending">
            Submit
        </UButton>
  </UForm>
</template>