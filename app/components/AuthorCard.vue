<script setup lang="ts">
import type { User } from '~/types/user'

    defineProps({
        author: {
            type: Object as () => User,
            required: true
        }
    })
</script>

<template>
    <UCard :ui="{ header: 'px-4 py-3', body: 'p-4' }">
        <template #header>
            <h4 class="text-sm font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <span class="w-2 h-2 rounded-full bg-primary" /> About the Author
            </h4>
        </template>

        <div class="flex items-center gap-3">
            <UAvatar :alt="author.first_name" size="lg" />
            <div>
                <p class="font-semibold text-gray-900 dark:text-white">
                    {{ author.first_name }} {{ author.last_name }}
                </p>
                <p class="text-xs text-gray-500 dark:text-gray-400">Blogger</p>
            </div>
        </div>
    </UCard>
</template>
