<script setup>
const title = ref('Persona Forum Archive')

const { posts, meta, page, pending, error } = await useGetPosts()
const { isAuthenticated } = useSanctumAuth()

const { categories } = await useGetCategories()

console.log(categories.value)

// Inline helper to reproduce PHP's native date output layout safely
const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  })
}
</script>


<template>
    <UContainer class="max-w-6xl py-10">
        <div class="grid grid-cols-1 lg:grid-cols-12 mb-10 border-b border-gray-200 dark:border-gray-800 pb-6">
            <div class="lg:col-span-9">
                <h1 class="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
                    {{ title }}
                </h1>
                <p class="mt-2 text-base text-gray-500 dark:text-gray-400">
                    Browse latest entries, articles, and community posts from our backend.
                </p>
            </div>
            <div class="lg:col-span-3">
                <div class="space-y-3">
                    <UButton v-if="isAuthenticated" to="/blogs/create" variant="solid" block size="xl" icon="i-heroicons-pencil-square">
                        Publish a Post
                    </UButton>
                    <UButton to="/topics" variant="solid" block size="xl" icon="i-heroicons-hashtag">
                        View Topics
                    </UButton>
                </div>
            </div>
            
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <main class="lg:col-span-9 space-y-6">
                <div v-if="posts && posts.length > 0" class="space-y-4">
                
                    <BlogCard 
                        v-for="post in posts" 
                        :key="post.id" 
                        :post="post" 
                    />

                </div>

                <div v-else class="text-center py-16 border-2 border-dashed border-gray-200 dark:border-gray-800 rounded-xl">
                    <h3 class="text-base font-semibold text-gray-900 dark:text-white">No Posts Found</h3>
                    <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">Why not publish a new entry from the sidebar?</p>
                </div>
            </main>

            <aside class="lg:col-span-3 space-y-6">
                <TopicsCard :categories="categories" />
            </aside>
        </div>
    </UContainer>
</template>

