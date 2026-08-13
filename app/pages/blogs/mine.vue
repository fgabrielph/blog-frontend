<script setup lang="ts">

    import type { Post } from '~/types/post'

    definePageMeta({
        middleware: ['sanctum:auth']
    })

    const { posts, meta, page, limit, pending, error, refresh } = useGetMyPosts()
    const { pending: isDeleting, error: deleteError, deletePost } = useDeletePost()

    const toast = useToast()
    const confirmOpen = ref(false)
    const postToDelete = ref<Post | null>(null)

    function openDeleteModal(post: Post) {
        postToDelete.value = post
        confirmOpen.value = true
    }

    async function handleDelete() {
        if (!postToDelete.value) return

        const deleted = await deletePost(postToDelete.value)

        if (deleted) {
            toast.add({
                title: 'Post Deleted',
                description: 'The post has been removed.',
                color: 'success'
            })
            confirmOpen.value = false
            postToDelete.value = null
            refresh()
        } else {
            toast.add({
                title: 'Error Deleting Post',
                description: deleteError.value || 'Please try again.',
                color: 'error'
            })
        }
    }

</script>

<template>
    <UContainer class="max-w-6xl py-10">
        <div class="flex items-center justify-between mb-8 border-b border-gray-200 dark:border-gray-800 pb-6">
            <div>
                <h1 class="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
                    My Posts
                </h1>
                <p class="mt-2 text-base text-gray-500 dark:text-gray-400">
                    All your posts, including drafts that are hidden from the public feed.
                </p>
            </div>

            <div class="flex items-center gap-3">
                <UButton
                    to="/blogs"
                    variant="ghost"
                    color="neutral"
                    icon="i-lucide-arrow-left"
                >
                    Back to Posts
                </UButton>

                <UButton
                    to="/blogs/create"
                    color="primary"
                    icon="i-lucide-plus"
                >
                    New Post
                </UButton>
            </div>
        </div>

        <div v-if="pending" class="space-y-4">
            <BlogCardSkeleton v-for="n in limit" :key="n" />
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
                    </div>

                    <div class="flex items-center gap-2 shrink-0">
                        <UButton
                            :to="`/blogs/edit?id=${post.id}`"
                            color="neutral"
                            variant="ghost"
                            size="sm"
                            icon="i-lucide-pencil"
                        >
                            Edit
                        </UButton>
                        <UButton
                            color="error"
                            variant="ghost"
                            size="sm"
                            icon="i-lucide-trash-2"
                            @click="openDeleteModal(post)"
                        >
                            Delete
                        </UButton>
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
            <h3 class="text-base font-semibold text-gray-900 dark:text-white">No Posts Yet</h3>
            <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">Publish a new entry from the button above.</p>
        </div>

        <!-- Delete Confirmation Modal -->
        <UModal v-model:open="confirmOpen">
            <template #header>
                <h3 class="font-bold text-gray-900 dark:text-white">Delete Post</h3>
            </template>

            <template #body>
                <div class="flex items-start gap-3">
                    <UIcon name="i-lucide-triangle-alert" class="w-5 h-5 text-error shrink-0" />
                    <p class="text-sm text-gray-600 dark:text-gray-300">
                        Are you sure you want to delete <strong class="text-gray-900 dark:text-white">{{ postToDelete?.title }}</strong>? This action cannot be undone.
                    </p>
                </div>
            </template>

            <template #footer>
                <div class="flex justify-end gap-3">
                    <UButton
                        color="neutral"
                        variant="ghost"
                        :disabled="isDeleting"
                        @click="confirmOpen = false"
                    >
                        Cancel
                    </UButton>
                    <UButton
                        color="error"
                        icon="i-lucide-trash-2"
                        :loading="isDeleting"
                        :disabled="isDeleting"
                        @click="handleDelete"
                    >
                        Delete Post
                    </UButton>
                </div>
            </template>
        </UModal>
    </UContainer>
</template>
