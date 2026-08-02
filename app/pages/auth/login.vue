<script setup lang="ts">
  definePageMeta({
    middleware: ['sanctum:guest'],
  })

  const { state, validate, onSubmit, pending } = useLogin()
</script>

<template>
    <div class="flex min-h-[80vh] items-center justify-center px-4">
        <UCard class="w-full max-w-sm shadow-lg">
            <!-- Header Section -->
            <template #header>
                <div class="text-center space-y-1">
                    <div class="inline-flex p-3 rounded-full bg-primary-50 dark:bg-primary-950/50 text-primary mb-2">
                        <UIcon name="i-lucide-user" class="w-6 h-6" />
                    </div>
                    <h2 class="text-xl font-semibold tracking-tight">Welcome back</h2>
                    <p class="text-sm text-gray-500 dark:text-gray-400">
                        Enter your credentials to access your account.
                    </p>
                </div>
            </template>

            <!-- Form Body -->
            <UForm 
                :validate="validate" 
                :state="state" 
                class="space-y-4" 
                @submit="onSubmit"
            >
                <UFormField label="Email" name="email">
                    <UInput 
                        v-model="state.email" 
                        type="email" 
                        icon="i-lucide-mail"
                        placeholder="Enter your email" 
                        class="w-full"
                    />
                </UFormField>

                <UFormField label="Password" name="password">
                    <UInput 
                        v-model="state.password" 
                        type="password" 
                        icon="i-lucide-lock"
                        placeholder="Enter your password" 
                        class="w-full"
                    />
                </UFormField>

                <UButton 
                type="submit" 
                block 
                :loading="pending" 
                :disabled="pending"
                size="lg"
                class="mt-2"
                >
                {{ pending ? 'Signing in...' : 'Sign In' }}
                </UButton>
            </UForm>

            <!-- Footer Section (Register Link) -->
            <template #footer>
                <p class="text-xs text-center text-gray-500 dark:text-gray-400">
                    Don't have an account? 
                    <NuxtLink to="/auth/register" class="font-medium text-primary hover:underline">
                        Create one
                    </NuxtLink>
                </p>
            </template>
        </UCard>
    </div>
</template>