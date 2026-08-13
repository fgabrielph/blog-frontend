<script setup lang="ts">

import type { User } from '~/types/user'

const route = useRoute()

const { post, pending, error } = await useGetPost(route.params.id)
const { isAuthenticated, user } = useSanctumAuth<User>()
const { categories, pending: categoriesPending } = useGetCategories()
const { pending: isDeleting, error: deleteError, deletePost } = useDeletePost()

const confirmOpen = ref(false)

const isAuthor = computed(() => {
  if (!isAuthenticated.value || !user.value || !post.value) return false
  return user.value.id === post.value.author_id
})

const notFound = computed(() => {
  if (!post.value?.id) return true
  return !post.value.is_published && !isAuthor.value
})

const isUnpublishedDraft = computed(() => {
  return !!post.value?.id && !post.value.is_published && isAuthor.value
})

const formatDate = (dateString?: string) => {
  if (!dateString) return ''
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  })
}

const toast = useToast()

async function handleDelete() {
    const deleted = await deletePost(post.value)

    if (deleted) {
        toast.add({
            title: 'Post Deleted',
            description: 'The post has been removed.',
            color: 'success'
        })
        navigateTo('/blogs')
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
        <!-- Header Section -->
        <div class="flex items-center justify-between mb-8 border-b border-gray-200 dark:border-gray-800 pb-6">
            <div>
                <h1 v-if="notFound" class="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
                    Page Not Found
                </h1>
                <h1 v-else class="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
                    {{ post?.title }}
                </h1>
                <p v-if="!notFound && !pending" class="mt-2 text-base text-gray-500 dark:text-gray-400">
                    {{ post?.author?.first_name ? `Written by ${post.author.first_name} · ${formatDate(post.created_at)}` : '' }}
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

        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

            <!-- Main Article (8 Cols) -->
            <main class="lg:col-span-8">
                <div v-if="pending" class="text-gray-400">Loading post...</div>

                <!-- Generic 404: guests only — no title/author/date leaked -->
                <div
                    v-else-if="notFound"
                    class="text-center py-20 border-2 border-dashed border-gray-200 dark:border-gray-800 rounded-xl bg-white dark:bg-gray-900"
                >
                    <UIcon name="i-lucide-file-question" class="w-12 h-12 mx-auto mb-4 text-gray-300 dark:text-gray-600" />
                    <h2 class="text-xl font-bold text-gray-900 dark:text-white">Page Not Found</h2>
                    <p class="mt-2 text-sm text-gray-500 dark:text-gray-400">
                        The post you're looking for doesn't exist or isn't available.
                    </p>
                    <UButton
                        to="/blogs"
                        color="primary"
                        class="mt-6"
                        icon="i-lucide-arrow-left"
                    >
                        Back to Posts
                    </UButton>
                </div>

                <!-- Author-only: draft not yet published -->
                <div
                    v-else-if="isUnpublishedDraft"
                    class="text-center py-16 border-2 border-dashed border-amber-300 dark:border-amber-700 rounded-xl bg-white dark:bg-gray-900"
                >
                    <UIcon name="i-lucide-clock" class="w-12 h-12 mx-auto mb-4 text-amber-500" />
                    <h2 class="text-xl font-bold text-gray-900 dark:text-white">Not Published Yet</h2>
                    <p class="mt-2 text-sm text-gray-500 dark:text-gray-400">
                        You haven't published this post yet. Publish it so others can read it.
                    </p>
                    <UButton
                        :to="`/blogs/edit?id=${post.id}`"
                        color="primary"
                        class="mt-6"
                        icon="i-lucide-send"
                    >
                        Publish Now
                    </UButton>
                </div>

                <article
                    v-else-if="post"
                    class="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm p-8 md:p-14"
                >
                    <!-- Cover image: only rendered when an image exists -->
                    <div
                        v-if="post.cover_image"
                        class="mb-10 rounded-xl overflow-hidden"
                    >
                        <img
                            :src="post.cover_image"
                            :alt="post.title"
                            class="w-full h-64 object-cover"
                        />
                    </div>

                    <div class="border-t border-gray-200 dark:border-gray-800 mb-8"></div>

                    <!-- Body with drop cap -->
                    <div
                        class="prose prose-gray dark:prose-invert max-w-none whitespace-pre-line text-gray-800 dark:text-gray-200 leading-8"
                    >
                        {{ post.content }}
                    </div>

                    <!-- Footer -->
                    <footer class="mt-10 pt-6 border-t border-gray-200 dark:border-gray-800 flex items-center justify-between">
                        <div v-if="isAuthor" class="flex gap-2">
                            <UButton
                                :to="`/blogs/edit?id=${post.id}`"
                                color="primary"
                                size="sm"
                                icon="i-lucide-pencil"
                            >
                                Edit Post
                            </UButton>
                            <UButton
                                color="error"
                                variant="outline"
                                size="sm"
                                icon="i-lucide-trash-2"
                                @click="confirmOpen = true"
                            >
                                Delete Post
                            </UButton>
                        </div>
                    </footer>
                </article>

                <!-- Comments Section Placeholder -->
                <section class="mt-12">
                    <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">Comments</h2>

                    <div
                        class="flex items-center justify-center h-32 rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50"
                    >
                        <div class="text-center text-gray-400 dark:text-gray-500">
                            <UIcon name="i-lucide-message-square" class="mx-auto w-8 h-8 mb-2" />
                            <p class="text-sm">Comment section coming soon</p>
                        </div>
                    </div>
                </section>
            </main>

            <!-- Sidebar (4 Cols) -->
            <aside class="lg:col-span-4 space-y-6 lg:sticky lg:top-8">
                <TopicsCardSkeleton v-if="categoriesPending" />
                <TopicsCard v-else :categories="categories" />

                <AuthorCard v-if="!notFound && post?.author" :author="post.author" />
            </aside>
        </div>

        <!-- Delete Confirmation Modal (author only) -->
        <UModal v-if="isAuthor" v-model:open="confirmOpen">
            <template #header>
                <h3 class="font-bold text-gray-900 dark:text-white">Delete Post</h3>
            </template>

            <template #body>
                <div class="flex items-start gap-3">
                    <UIcon name="i-lucide-triangle-alert" class="w-5 h-5 text-error shrink-0" />
                    <p class="text-sm text-gray-600 dark:text-gray-300">
                        Are you sure you want to delete <strong class="text-gray-900 dark:text-white">{{ post.title }}</strong>? This action cannot be undone.
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
