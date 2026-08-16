<script setup lang="ts">
import type { User } from '~/types/user'
import type { Comment } from '~/types/comment'

definePageMeta({
    middleware: ['sanctum:auth']
})

const { user } = useSanctumAuth<User>()

const activeTab = ref('posts')

const tabs = [
    { value: 'posts', label: 'My Posts', icon: 'i-lucide-file-text' },
    { value: 'comments', label: 'My Comments', icon: 'i-lucide-message-square' },
    { value: 'settings', label: 'Settings', icon: 'i-lucide-settings' }
]

const { posts, meta: postsMeta, page: postsPage, limit, pending: postsPending, error: postsError } = useGetMyPosts()
const { comments, meta: commentsMeta, page: commentsPage, pending: commentsPending, error: commentsError } = useGetMyComments()

const fullName = computed(() => {
    if (!user.value) return ''
    return [user.value.first_name, user.value.last_name].filter(Boolean).join(' ') || 'User'
})

function openCommentPost(comment: Comment) {
    if (comment.post?.is_published && comment.post.id) {
        navigateTo(`/blogs/${comment.post.id}`)
    }
}
</script>

<template>
    <UContainer class="max-w-6xl py-10">
        <div class="flex items-center justify-between mb-8 border-b border-gray-200 dark:border-gray-800 pb-6">
            <div>
                <h1 class="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
                    My Profile
                </h1>
                <p class="mt-2 text-base text-gray-500 dark:text-gray-400">
                    Manage your posts, comments, and account settings.
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
            <!-- Left Sidebar -->
            <aside class="lg:col-span-4 lg:sticky lg:top-8">
                <div class="space-y-4">
                    <ProfileAvatarCard :name="fullName" :email="user?.email" />
                    <ProfileTabsCard v-model:active-tab="activeTab" :tabs="tabs" />
                </div>
            </aside>

            <!-- Tab Content -->
            <main class="lg:col-span-8">
                <ProfilePostsCard
                    v-if="activeTab === 'posts'"
                    :posts="posts"
                    :pending="postsPending"
                    :error="postsError"
                    :meta="postsMeta"
                    :limit="limit"
                    v-model:page="postsPage"
                />

                <ProfileCommentsCard
                    v-else-if="activeTab === 'comments'"
                    :comments="comments"
                    :pending="commentsPending"
                    :error="commentsError"
                    :meta="commentsMeta"
                    :limit="limit"
                    v-model:page="commentsPage"
                    @open-post="openCommentPost"
                />

                <!-- Settings -->
                <UCard v-else>
                    <template #header>
                        <h3 class="text-lg font-bold text-gray-900 dark:text-white">Account Settings</h3>
                    </template>

                    <p class="text-sm text-gray-500 dark:text-gray-400">
                        Settings are coming soon.
                    </p>
                </UCard>
            </main>
        </div>
    </UContainer>
</template>
