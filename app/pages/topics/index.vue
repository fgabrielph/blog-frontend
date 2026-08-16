<script setup>
const { categories, pending } = useGetCategories()
</script>

<template>
    <UContainer class="max-w-6xl py-10">
        <div class="flex items-center justify-between mb-10 border-b border-gray-200 dark:border-gray-800 pb-6">
            <div>
                <h1 class="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
                    Topics
                </h1>
                <p class="mt-2 text-base text-gray-500 dark:text-gray-400">
                    Browse posts by topic.
                </p>
            </div>

            <UButton
                to="/blogs"
                variant="ghost"
                color="neutral"
                icon="i-lucide-arrow-left"
            >
                Back to Posts
            </UButton>
        </div>

        <div v-if="pending" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <UCard v-for="n in 6" :key="n" class="h-40">
                <div class="flex flex-col items-center justify-center h-full space-y-3">
                    <USkeleton class="h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-800" />
                    <USkeleton class="h-4 w-28 rounded bg-gray-200 dark:bg-gray-800" />
                </div>
            </UCard>
        </div>

        <div v-else-if="categories.length > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <TopicCard v-for="category in categories" :key="category.id" :category="category" />
        </div>

        <div v-else class="text-center py-16 border-2 border-dashed border-gray-200 dark:border-gray-800 rounded-xl">
            <h3 class="text-base font-semibold text-gray-900 dark:text-white">No Topics Found</h3>
            <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">Topics will appear once posts are published.</p>
        </div>
    </UContainer>
</template>
