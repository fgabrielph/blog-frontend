<script setup>
    defineProps({
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            default: ''
        }
    })
</script>

<template>
    <UCard>
        <div class="flex flex-col items-center text-center py-4">
            <UAvatar :alt="name" size="xl" />
            <h2 class="mt-4 text-xl font-bold text-gray-900 dark:text-white">
                {{ name }}
            </h2>
            <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
                {{ email }}
            </p>
        </div>
    </UCard>
</template>
