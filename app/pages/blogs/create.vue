<script setup lang="ts">

    definePageMeta({
        middleware: ['sanctum:auth']
    })

    const { state, categories, categoriesPending, isSubmitting, activeTab, tabItems, validate, onSubmit } = useCreatePost()

    console.log(categories.value)
</script>

<template>
    <UContainer class="max-w-6xl py-10">
        <!-- Header Section -->
        <div class="flex items-center justify-between mb-8 border-b border-gray-200 dark:border-gray-800 pb-6">
            <div>
                <h1 class="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
                    Create New Post
                </h1>
                <p class="mt-2 text-base text-gray-500 dark:text-gray-400">
                    Share your thoughts, findings, or questions with the community.
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

        <!-- 12-Column Grid Layout -->
            <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
            <!-- Main Form Area (9 Cols) -->
            <main class="lg:col-span-9">
                <UCard class="shadow-sm">
                    <UForm :validate="validate" :state="state" class="space-y-6" @submit="onSubmit">
                        
                        <!-- Title -->
                        <UFormField label="Post Title" name="title">
                            <UInput
                                v-model="state.title"
                                placeholder="Give your post a clear title..."
                                size="lg"
                                class="w-full"
                            />
                        </UFormField>

                        <!-- Topic Selection Dropdown -->
                        <UFormField label="Topic" name="category_id">
                            <USelectMenu
                                v-model="state.category_id"
                                :items="categories"
                                :loading="categoriesPending"
                                :disabled="categoriesPending"
                                label-key="name"
                                value-key="id"
                                placeholder="Select a topic..."
                                class="w-full"
                            />
                        </UFormField>

                        <!-- Content Area with Write / Preview Tabs -->
                        <UFormField label="Content" name="content">
                            <UTabs v-model="activeTab" :items="tabItems" class="w-full">
                                <template #write>
                                <div class="pt-3">
                                    <UTextarea
                                    v-model="state.content"
                                    :rows="12"
                                    placeholder="Write your content here..."
                                    class="w-full font-mono text-sm"
                                    />
                                </div>
                                </template>

                                <template #preview>
                                <div class="pt-3 min-h-72 p-4 rounded-md border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50">
                                    <div v-if="state.content" class="prose dark:prose-invert max-w-none whitespace-pre-wrap">
                                        {{ state.content }}
                                    </div>
                                    <p v-else class="text-sm text-gray-400 italic">
                                        Nothing to preview yet. Start typing in the Write tab!
                                    </p>
                                </div>
                                </template>
                            </UTabs>
                        </UFormField>

                        <!-- Publish Switch toggle for 'is_published' column -->
                        <UFormField name="is_published" class="pt-2">
                            <div class="flex items-center gap-3">
                                <USwitch v-model="state.is_published" id="is_published_toggle" />
                                <label for="is_published_toggle" class="text-sm font-medium text-gray-700 dark:text-gray-200 cursor-pointer">
                                    Publish immediately
                                </label>
                            </div>
                            <template #hint>
                                <span class="text-xs text-gray-500">
                                    Uncheck to save as a draft (hidden from public feed).
                                </span>
                            </template>
                        </UFormField>

                        <!-- Action Buttons -->
                        <div class="flex items-center justify-end gap-3 pt-4 border-t border-gray-100 dark:border-gray-800">
                            <UButton
                                to="/blogs"
                                color="neutral"
                                variant="ghost"
                                :disabled="isSubmitting"
                            >
                                Cancel
                            </UButton>

                            <UButton
                                type="submit"
                                color="primary"
                                size="lg"
                                icon="i-lucide-send"
                                :loading="isSubmitting"
                                :disabled="isSubmitting"
                            >
                                {{ isSubmitting ? 'Saving...' : (state.is_published ? 'Publish Post' : 'Save Draft') }}
                            </UButton>
                        </div>
                    </UForm>
                </UCard>
            </main>

            <!-- Sidebar Rules (3 Cols) -->
            <aside class="lg:col-span-3 space-y-6">
                <UCard>
                    <template #header>
                        <div class="flex items-center gap-2 font-semibold text-gray-900 dark:text-white">
                        <UIcon name="i-lucide-shield-alert" class="w-5 h-5 text-primary" />
                        <span>Posting Rules</span>
                        </div>
                    </template>

                    <ul class="text-xs text-gray-600 dark:text-gray-300 space-y-2.5 list-disc list-inside">
                        <li>Keep discussions respectful and relevant.</li>
                        <li>Avoid posting sensitive personal information.</li>
                        <li>Ensure titles describe the post content accurately.</li>
                    </ul>
                </UCard>
            </aside>
        </div>
    </UContainer>
</template>