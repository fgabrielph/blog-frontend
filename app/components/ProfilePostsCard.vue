<script setup>
    const props = defineProps({
        posts: {
            type: Array,
            required: true
        },
        pending: {
            type: Boolean,
            default: false
        },
        error: {
            type: [String, null],
            default: ''
        },
        meta: {
            type: Object,
            required: true
        },
        limit: {
            type: Number,
            default: 10
        }
    })

    const page = defineModel('page', { type: Number, required: true })

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric'
        })
    }
</script>

<template>
    <div>
        <div v-if="pending" class="space-y-4">
            <USkeleton v-for="n in limit" :key="n" class="h-20 w-full rounded-xl" />
        </div>

        <div v-else-if="error" class="py-16 text-center text-red-500">
            {{ error }}
        </div>

        <div v-else-if="posts.length > 0" class="space-y-4">
            <UCard
                v-for="post in posts"
                :key="post.id"
                class="hover:shadow-md transition-shadow duration-200"
            >
                <div class="flex items-start justify-between gap-4">
                    <div class="flex-1 min-w-0">
                        <div class="flex items-center gap-3">
                            <h3 class="text-lg font-bold">
                                <NuxtLink
                                    :to="post.is_published ? `/blogs/${post.id}` : `/blogs/edit?id=${post.id}`"
                                    class="hover:text-primary"
                                >
                                    {{ post.title }}
                                </NuxtLink>
                            </h3>
                            <UBadge
                                :color="post.is_published ? 'success' : 'neutral'"
                                variant="soft"
                            >
                                {{ post.is_published ? 'Published' : 'Draft' }}
                            </UBadge>
                        </div>
                        <p class="mt-1 text-gray-500 text-sm truncate">{{ post.content }}</p>
                        <p class="mt-2 text-xs text-gray-400">{{ formatDate(post.created_at) }}</p>
                    </div>

                    <UButton
                        :to="post.is_published ? `/blogs/${post.id}` : `/blogs/edit?id=${post.id}`"
                        color="neutral"
                        variant="ghost"
                        size="sm"
                        icon="i-lucide-external-link"
                    >
                        View
                    </UButton>
                </div>
            </UCard>

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
            <h3 class="text-base font-semibold text-gray-900 dark:text-white">No Posts Yet</h3>
            <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">Publish a new entry to see it here.</p>
        </div>
    </div>
</template>
