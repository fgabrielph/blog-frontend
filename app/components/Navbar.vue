<script setup lang="ts">
import type { User } from '~/types/user'

const { isAuthenticated, user, logout } = useSanctumAuth<User>()
const toast = useToast()

async function handleLogout() {
    try {
        await logout()
        toast.add({
            title: 'Logged Out',
            description: 'You have been successfully logged out.',
            color: 'neutral'
        })
    } catch (error) {
        toast.add({
            title: 'Error',
            description: 'Failed to log out cleanly.',
            color: 'error'
        })
    }
}

</script>

<template>
    <nav class="bg-gray-900 text-white py-4 border-b border-gray-800">
        <UContainer class="flex items-center justify-between">
            <NuxtLink to="/blogs" class="text-xl font-bold tracking-wider text-amber-500">
                Per-son-a 
            </NuxtLink>

            <div class="flex items-center space-x-6 text-sm font-medium">
                <template v-if="isAuthenticated">
                    <span class="text-gray-300">
                        Welcome, <strong class="text-amber-400">{{ user?.first_name }}</strong>
                    </span>
                    <UButton 
                        color="error" 
                        variant="ghost" 
                        size="sm"
                        @click="handleLogout"
                    >
                        Logout
                    </UButton>
                </template>
                <template v-else>
                    <NuxtLink to="/auth/login" class="hover:text-amber-400 transition">Login</NuxtLink>
                    <NuxtLink to="/auth/register" class="hover:text-amber-400 transition">Register</NuxtLink>
                </template>
                
            </div>
        </UContainer>
    </nav>
</template>