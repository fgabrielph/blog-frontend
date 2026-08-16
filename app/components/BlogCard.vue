<script setup>
    defineProps({
        post: {
            type: Object,
            required: true
        }
    })

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString()
    }
</script>

<template>
    <UCard class="hover:shadow-md transition-shadow duration-200">
        <div class="flex items-start gap-4">
            <UAvatar :alt="post.author.first_name" size="md" />
            <div class="flex-1 min-w-0">
                <div class="flex items-center justify-between">
                    <h3 class="text-lg font-bold">
                        <NuxtLink :to="`/blogs/${post.id}`" class="hover:text-primary">
                        {{ post.title }}
                        </NuxtLink>
                    </h3>
                    <time class="text-xs text-gray-400">{{ formatDate(post.created_at) }}</time>
                </div>
                <div class="flex items-center gap-2">
                    <NuxtLink
                        v-if="post.category?.name"
                        :to="`/topics/${post.category.id}`"
                        class="text-xs font-medium text-primary hover:underline shrink-0"
                    >
                        #{{ post.category.name }}
                    </NuxtLink>
                    <p class="text-gray-500 text-sm truncate">{{ post.content }}</p>
                </div>
            </div>
        </div>
  </UCard>
</template>