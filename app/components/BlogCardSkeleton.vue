<template>
    <UCard>
        <div class="flex items-start gap-4">
            <USkeleton class="h-9 w-9 rounded-full shrink-0 bg-gray-200 dark:bg-gray-800" />
            <div class="flex-1 min-w-0 space-y-3">
                <div class="flex items-center justify-between gap-4">
                    <USkeleton class="h-5 w-1/2 rounded bg-gray-200 dark:bg-gray-800" />
                    
                    <USkeleton class="h-3 w-16 rounded shrink-0 bg-gray-200 dark:bg-gray-800" />
                </div>

                <USkeleton class="h-4 w-4/5 rounded bg-gray-200 dark:bg-gray-800" />
            </div>
        </div>
    </UCard>
</template>