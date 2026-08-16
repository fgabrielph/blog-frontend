<script setup>
const route = useRoute()

const { posts, meta, page, pending } = useGetCategoryPosts(route.params.id)
const { categories, pending: categoriesPending } = useGetCategories()

const category = computed(() =>
    categories.value.find(c => c.id === Number(route.params.id))
)
</script>

<template>
    <UContainer class="max-w-6xl py-10">
        <div class="flex items-center justify-between mb-8 border-b border-gray-200 dark:border-gray-800 pb-6">
            <div>
                <h1 class="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
                    {{ category?.name ?? 'Topic' }}
                </h1>
                <p class="mt-2 text-base text-gray-500 dark:text-gray-400">
                    {{ category?.slug ? `Posts in #${category.slug}` : 'Posts in this topic.' }}
                </p>
            </div>

            <UButton
                to="/topics"
                variant="ghost"
                color="neutral"
                icon="i-lucide-arrow-left"
            >
                Back to Topics
            </UButton>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <main class="lg:col-span-9 space-y-6">
                <div v-if="pending" class="space-y-4">
                    <BlogCardSkeleton v-for="n in 5" :key="n" />
                </div>

                <div v-else-if="posts.length > 0" class="space-y-4">
                    <BlogCard
                        v-for="post in posts"
                        :key="post.id"
                        :post="post"
                    />

                    <div
                        v-if="meta.total > meta.per_page"
                        class="flex justify-center pt-6 border-t border-gray-200 dark:border-gray-800"
                    >
                        <UPagination
                            v-model:page="page"
                            :items-per-page="meta.per_page"
                            :total="meta.total"
                            :disabled="pending"
                        />
                    </div>
                </div>

                <div v-else class="text-center py-16 border-2 border-dashed border-gray-200 dark:border-gray-800 rounded-xl">
                    <h3 class="text-base font-semibold text-gray-900 dark:text-white">No Posts Found</h3>
                    <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">No posts in this topic yet.</p>
                </div>
            </main>

            <aside class="lg:col-span-3 space-y-6">
                <TopicsCardSkeleton v-if="categoriesPending" />
                <TopicsCard v-else :categories="categories" />
            </aside>
        </div>
    </UContainer>
</template>
