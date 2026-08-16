<script setup>
    const props = defineProps({
        comments: {
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

    const emit = defineEmits(['open-post'])

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric'
        })
    }

    function openPost(comment) {
        if (comment.post?.is_published && comment.post.id) {
            emit('open-post', comment)
        }
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

        <div v-else-if="comments.length > 0" class="space-y-4">
            <UCard
                v-for="comment in comments"
                :key="comment.id"
                :class="[
                    comment.post?.is_published
                        ? 'cursor-pointer hover:shadow-md transition-shadow duration-200'
                        : 'opacity-75'
                ]"
                :tabindex="comment.post?.is_published ? 0 : undefined"
                role="link"
                :aria-disabled="!comment.post?.is_published"
                @click="openPost(comment)"
                @keydown.enter="openPost(comment)"
            >
                <div class="flex items-start justify-between gap-4">
                    <div class="flex-1 min-w-0">
                        <p class="text-sm text-gray-600 dark:text-gray-300 whitespace-pre-line">
                            {{ comment.content }}
                        </p>
                        <div class="mt-2 flex items-center gap-2 text-xs text-gray-400">
                            <span>{{ formatDate(comment.created_at) }}</span>
                            <span>·</span>

                            <span
                                v-if="comment.post?.is_published"
                                class="inline-flex items-center gap-1 font-medium text-primary"
                            >
                                <UIcon name="i-lucide-external-link" class="w-3 h-3" />
                                {{ comment.post.title || `Post #${comment.post.id}` }}
                            </span>

                            <UBadge
                                v-else
                                color="warning"
                                variant="soft"
                            >
                                Post unpublished
                            </UBadge>
                        </div>
                    </div>
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
            <h3 class="text-base font-semibold text-gray-900 dark:text-white">No Comments Yet</h3>
            <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">Your comments across all posts will show up here.</p>
        </div>
    </div>
</template>
