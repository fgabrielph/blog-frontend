<template>
    <UCard :ui="{ header: 'px-4 py-3', body: '!p-0' }">
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
            <!-- Category Skeletons: Generates 5 animated placeholder lines -->
            <li v-for="n in 5" :key="n" class="px-4 py-2.5 flex items-center">
                <USkeleton class="h-3 w-24 bg-gray-200 dark:bg-gray-800 rounded" />
            </li>
        </ul>
    </UCard>
</template>