<script setup>
// You must define the props so the component knows what 'topics' is
    defineProps({
        categories: {
            type: Array,
            required: true
        }
    })
</script>

<template>

    <UCard :ui="{ header: { padding: 'px-4 py-3' }, body: { padding: '!p-0' } }">
        <template #header>
            <h4 class="text-sm font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <span class="w-2 h-2 rounded-full bg-primary" /> Topics
            </h4>
        </template>

        <ul class="divide-y divide-gray-100 dark:divide-gray-800">
            <li class="px-4 py-2.5">
                <NuxtLink to="/blogs" class="text-xs font-medium text-primary hover:underline">
                    Latest Posts
                </NuxtLink>
            </li>

            <li v-for="category in categories" :key="category.id" class="px-4 py-2.5">
                <NuxtLink :to="`/topics/${category.id}`" class="text-xs text-gray-600 dark:text-gray-400 hover:text-primary transition-colors">
                    {{ category.name }}
                </NuxtLink>
            </li>
        </ul>
  </UCard>
    
</template>