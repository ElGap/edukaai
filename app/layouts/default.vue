<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Sidebar -->
    <aside
      class="fixed left-0 top-0 h-full w-64 bg-white border-r border-gray-200 z-40"
    >
      <div class="p-6">
        <div class="flex items-center gap-2 mb-8">
          <div
            class="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center text-white font-bold"
          >
            e
          </div>
          <span class="text-xl font-bold">edukaAI</span>
        </div>

        <nav class="space-y-2">
          <NuxtLink to="/" class="nav-link" active-class="nav-link-active">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
            <span>Dashboard</span>
          </NuxtLink>

          <NuxtLink
            to="/examples"
            class="nav-link"
            active-class="nav-link-active"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path
                d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"
              />
              <polyline points="14 2 14 8 20 8" />
              <line x1="16" x2="8" y1="13" y2="13" />
              <line x1="16" x2="8" y1="17" y2="17" />
              <line x1="10" x2="8" y1="9" y2="9" />
            </svg>
            <span>Dataset</span>
          </NuxtLink>

          <NuxtLink
            to="/import"
            class="nav-link"
            active-class="nav-link-active"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="17 8 12 3 7 8" />
              <line x1="12" x2="12" y1="3" y2="15" />
            </svg>
            <span>Import</span>
          </NuxtLink>

          <NuxtLink
            to="/export"
            class="nav-link"
            active-class="nav-link-active"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" x2="12" y1="15" y2="3" />
            </svg>
            <span>Export</span>
          </NuxtLink>

          <!-- Learning Resources -->
          <div class="pt-4 pb-2">
            <span
              class="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider"
              >Learn</span
            >
          </div>

          <NuxtLink to="/help" class="nav-link" active-class="nav-link-active">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              />
            </svg>
            <span>Guide</span>
          </NuxtLink>

          <NuxtLink
            to="/help/huggingface"
            class="nav-link"
            active-class="nav-link-active"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M12 2a10 10 0 1 0 10 10H12V2z" />
              <path d="M12 12 2.5 12" />
            </svg>
            <span>What's Hugging Face?</span>
          </NuxtLink>

          <NuxtLink
            to="/help/axolotl"
            class="nav-link"
            active-class="nav-link-active"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path
                d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"
              />
              <path
                d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"
              />
              <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
              <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
            </svg>
            <span>What's Axolotl?</span>
          </NuxtLink>

          <NuxtLink
            to="/help/first-training"
            class="nav-link"
            active-class="nav-link-active"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
            </svg>
            <span>🚀 Your First Training</span>
          </NuxtLink>

          <NuxtLink
            to="/sample-datasets"
            class="nav-link"
            active-class="nav-link-active"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M12 2L2 7l10 5 10-5-10-5z" />
              <path d="M2 17l10 5 10-5" />
              <path d="M2 12l10 5 10-5" />
            </svg>
            <span>Sample Data</span>
          </NuxtLink>
        </nav>
      </div>

      <!-- Progress Widget -->
      <div
        class="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-200 bg-gray-50"
      >
        <div class="mb-2">
          <span class="text-sm font-medium">Progress to 1000</span>
          <span class="text-sm text-gray-500 float-right"
            >{{ progressPercentage }}%</span
          >
        </div>
        <div class="w-full bg-gray-200 rounded-full h-2">
          <div
            class="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-500"
            :style="{ width: `${Math.min(progressPercentage, 100)}%` }"
          ></div>
        </div>
        <p class="text-xs text-gray-500 mt-2">
          {{ totalExamples }} examples created
        </p>
      </div>
    </aside>

    <!-- Main Content -->
    <main class="ml-64 p-8">
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";

const totalExamples = ref(0);
const progressPercentage = computed(() => {
  return Math.round((totalExamples.value / 1000) * 100);
});

onMounted(async () => {
  try {
    const stats = await $fetch("/api/stats/overview");
    totalExamples.value = stats.total;
  } catch (error) {
    console.error("Error loading stats:", error);
  }
});
</script>

<style scoped>
@reference "tailwindcss";

.nav-link {
  @apply flex items-center gap-3 px-3 py-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors;
}

.nav-link-active {
  @apply bg-blue-50 text-blue-600 font-medium;
}
</style>
