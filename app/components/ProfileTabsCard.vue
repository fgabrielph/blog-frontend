<script setup>
    const props = defineProps({
        tabs: {
            type: Array,
            required: true
        },
        activeTab: {
            type: String,
            required: true
        }
    })

    const emit = defineEmits(['update:activeTab'])

    function select(value) {
        emit('update:activeTab', value)
    }
</script>

<template>
    <UCard
        v-for="tab in tabs"
        :key="tab.value"
        :class="[
            'cursor-pointer transition-all duration-200',
            activeTab === tab.value
                ? 'ring-2 ring-primary bg-primary/5'
                : 'hover:shadow-md hover:bg-gray-50 dark:hover:bg-gray-800/50'
        ]"
        role="button"
        :aria-selected="activeTab === tab.value"
        tabindex="0"
        @click="select(tab.value)"
        @keydown.enter="select(tab.value)"
    >
        <div class="flex items-center gap-3 py-1">
            <UIcon
                :name="tab.icon"
                class="w-5 h-5 shrink-0"
                :class="activeTab === tab.value ? 'text-primary' : 'text-gray-500 dark:text-gray-400'"
            />
            <span
                :class="[
                    'text-sm font-medium',
                    activeTab === tab.value ? 'text-primary' : 'text-gray-700 dark:text-gray-300'
                ]"
            >
                {{ tab.label }}
            </span>
        </div>
    </UCard>
</template>
