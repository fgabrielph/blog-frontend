<script setup>
defineProps({
    category: {
        type: Object,
        required: true
    }
})
</script>

<template>
    <NuxtLink :to="`/topics/${category.id}`">
        <UCard class="h-40 hover:shadow-md hover:border-primary transition-all duration-200">
            <div class="flex flex-col items-center justify-center h-full space-y-3">
                <span class="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <UIcon name="i-heroicons-hashtag" class="w-6 h-6 text-primary" />
                </span>
                <h3 class="text-lg font-bold text-gray-900 dark:text-white">
                    {{ category.name }}
                </h3>
                <p v-if="category.posts_count !== undefined" class="text-xs text-gray-400">
                    {{ category.posts_count }} posts
                </p>
            </div>
        </UCard>
    </NuxtLink>
</template>
