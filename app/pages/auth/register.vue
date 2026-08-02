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
    <div class="flex min-h-[85vh] items-center justify-center px-4 py-8">
        <UCard class="w-full max-w-lg shadow-lg">
            <!-- Header Section -->
            <template #header>
                <div class="text-center space-y-1">
                    <div class="inline-flex p-3 rounded-full bg-primary-50 dark:bg-primary-950/50 text-primary mb-2">
                        <UIcon name="i-lucide-user-plus" class="w-6 h-6" />
                    </div>
                    <h2 class="text-xl font-semibold tracking-tight">Create an account</h2>
                    <p class="text-sm text-gray-500 dark:text-gray-400">
                        Enter your details below to get started.
                    </p>
                </div>
            </template>

            <!-- Form Body -->
            <UForm ref="formRef" :validate="validate" :state="state" class="space-y-4" @submit="onSubmit">
                
                <!-- Row 1: First Name & Last Name -->
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <UFormField label="First Name" name="first_name">
                        <UInput v-model="state.first_name" placeholder="John" class="w-full" />
                    </UFormField>

                    <UFormField label="Last Name" name="last_name">
                        <UInput v-model="state.last_name" placeholder="Doe" class="w-full" />
                    </UFormField>
                </div>

                <!-- Row 2: Age & Gender -->
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <UFormField label="Age" name="age">
                        <UInput 
                        v-model.number="state.age" 
                        type="number" 
                        :min="1" 
                        :max="125" 
                        placeholder="Age" 
                        class="w-full"
                        @keydown="blockInvalidAgeKeys" 
                        />
                    </UFormField>

                    <UFormField label="Gender" name="gender">
                        <USelect
                        v-model="state.gender"
                        :items="genderOptions"
                        placeholder="Select gender"
                        class="w-full"
                        />
                    </UFormField>
                </div>

                <!-- Conditional Field: Custom Gender -->
                <UFormField
                v-if="state.gender === 'other'"
                label="Please specify gender"
                name="custom_gender"
                >
                    <UInput v-model="state.custom_gender" placeholder="Specify your gender" class="w-full" />
                </UFormField>

                <!-- Row 3: Email -->
                <UFormField label="Email" name="email" >
                    <UInput 
                        v-model="state.email" 
                        type="email" 
                        icon="i-lucide-mail" 
                        placeholder="john.doe@example.com" 
                        class="w-full" 
                    />
                </UFormField>

                <!-- Row 4: Password & Confirm Password -->
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <UFormField label="Password" name="password">
                        <UInput
                        v-model="state.password"
                        :type="showPassword ? 'text' : 'password'"
                        icon="i-lucide-lock"
                        placeholder="••••••••"
                        class="w-full"
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
                        icon="i-lucide-lock"
                        placeholder="••••••••"
                        class="w-full"
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
                </div>

                <!-- Submit Button -->
                <UButton 
                type="submit" 
                block 
                :loading="pending" 
                :disabled="pending"
                size="lg"
                class="mt-2"
                >
                {{ pending ? 'Registering...' : 'Create Account' }}
                </UButton>
            </UForm>

            <!-- Footer Section (Login Link) -->
            <template #footer>
                <p class="text-xs text-center text-gray-500 dark:text-gray-400">
                Already have an account? 
                <NuxtLink to="/auth/login" class="font-medium text-primary hover:underline">
                    Sign in
                </NuxtLink>
                </p>
            </template>
        </UCard>
    </div>
</template>