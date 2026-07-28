<script setup lang="ts">

import type { User } from '~/types/user'

const route = useRoute()

const { post, pending, error } = await useGetPost(route.params.id)
const { isAuthenticated, user } = useSanctumAuth<User>()

const isAuthor = computed(() => {
  if (!isAuthenticated.value || !user.value || !post.value) return false
  return user.value.id === post.value.author_id
})

</script>

<template>

    <div class="max-w-3xl mx-auto py-8">
        <div v-if="pending" class="text-gray-400">Loading post...</div>
        <div v-else-if="error" class="text-red-500">Failed to load post.</div>
        <article v-else-if="post">
            <h1 class="text-3xl font-bold mb-4">{{ post.title }}</h1>

            <p class="text-sm text-gray-400">
                Written by: {{ post.author?.first_name ?? 'Unknown Author' }}
            </p>

            <div class="text-sm text-gray-400 mb-6">
                <span>Published on {{ new Date(post.created_at ?? '').toLocaleDateString() }}</span>
            </div>
            <p class="whitespace-pre-line">{{ post.content }}</p>

            <div v-if="isAuthor" class="flex gap-2 mt-4">
                <UButton :to="`/blogs/${post.id}/edit`" color="neutral">Edit Post</UButton>
                <UButton color="error">Delete Post</UButton>
            </div>
        </article>
    </div>
</template>