<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
    <!-- Sidebar -->
    <aside
      class="fixed left-0 top-0 h-full w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 z-40 transition-colors duration-200 flex flex-col"
    >
      <!-- Top section - scrollable content -->
      <div class="flex-1 overflow-y-auto p-6">
        <div class="flex items-center gap-2 mb-8">
          <div
            class="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center text-white font-bold"
          >
            e
          </div>
          <span class="text-xl font-bold text-gray-900 dark:text-white">EdukaAI</span>
        </div>

        <!-- Dataset Switcher -->
        <div class="mb-6">
          <DatasetSwitcher />
        </div>

        <nav class="space-y-1">
          <!-- Main Navigation -->
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
              <rect x="3" y="3" width="7" height="7" />
              <rect x="14" y="3" width="7" height="7" />
              <rect x="14" y="14" width="7" height="7" />
              <rect x="3" y="14" width="7" height="7" />
            </svg>
            <span>Dashboard</span>
          </NuxtLink>

          <NuxtLink to="/samples" class="nav-link" active-class="nav-link-active">
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
              <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="16" x2="8" y1="13" y2="13" />
              <line x1="16" x2="8" y1="17" y2="17" />
              <line x1="10" x2="8" y1="9" y2="9" />
            </svg>
            <span>My Dataset</span>
          </NuxtLink>

          <NuxtLink to="/import" class="nav-link" active-class="nav-link-active">
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

          <NuxtLink to="/export" class="nav-link" active-class="nav-link-active">
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

          <!-- Management Section -->
          <div class="pt-6 pb-2">
            <span
              class="px-3 text-xs font-semibold text-gray-500 dark:text-gray-500 uppercase tracking-wider"
              >Management</span
            >
          </div>

          <NuxtLink to="/datasets/overview" class="nav-link" active-class="nav-link-active">
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
            <span>All Datasets</span>
          </NuxtLink>

          <NuxtLink to="/settings" class="nav-link" active-class="nav-link-active">
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
                d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.47a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"
              />
              <circle cx="12" cy="12" r="3" />
            </svg>
            <span>Settings</span>
          </NuxtLink>

          <!-- Learn Section -->
          <div class="pt-6 pb-2">
            <span
              class="px-3 text-xs font-semibold text-gray-500 dark:text-gray-500 uppercase tracking-wider"
              >Learn</span
            >
          </div>

          <NuxtLink to="/docs" class="nav-link" active-class="nav-link-active">
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
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="16" x2="8" y1="13" y2="13" />
              <line x1="16" x2="8" y1="17" y2="17" />
              <line x1="10" x2="8" y1="9" y2="9" />
            </svg>
            <span>Documentation</span>
          </NuxtLink>

          <NuxtLink to="/how-llms-work" class="nav-link" active-class="nav-link-active">
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
            <span>🧠 How LLMs Work</span>
          </NuxtLink>

          <NuxtLink to="/fine-tuning" class="nav-link" active-class="nav-link-active">
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
              <polyline points="9 11 12 14 22 4" />
            </svg>
            <span>🚀 Fine-Tuning Hub</span>
          </NuxtLink>

          <div class="ml-4 space-y-1">
            <NuxtLink
              to="/fine-tuning/axolotl"
              class="nav-link text-xs py-1.5"
              active-class="nav-link-active"
            >
              <span>🦎 Axolotl</span>
            </NuxtLink>
            <NuxtLink
              to="/fine-tuning/unsloth"
              class="nav-link text-xs py-1.5"
              active-class="nav-link-active"
            >
              <span>⚡ Unsloth</span>
            </NuxtLink>
            <NuxtLink
              to="/fine-tuning/mlx"
              class="nav-link text-xs py-1.5"
              active-class="nav-link-active"
            >
              <span>🍎 MLX</span>
            </NuxtLink>
            <NuxtLink
              to="/fine-tuning/trl"
              class="nav-link text-xs py-1.5"
              active-class="nav-link-active"
            >
              <span>🤗 TRL</span>
            </NuxtLink>
            <NuxtLink
              to="/fine-tuning/huggingface"
              class="nav-link text-xs py-1.5"
              active-class="nav-link-active"
            >
              <span>☁️ HuggingFace</span>
            </NuxtLink>
            <NuxtLink
              to="/fine-tuning/colab"
              class="nav-link text-xs py-1.5"
              active-class="nav-link-active"
            >
              <span>📓 Colab</span>
            </NuxtLink>
            <NuxtLink
              to="/fine-tuning/ollama"
              class="nav-link text-xs py-1.5"
              active-class="nav-link-active"
            >
              <span>🦙 Ollama</span>
            </NuxtLink>
            <NuxtLink
              to="/fine-tuning/llamacpp"
              class="nav-link text-xs py-1.5"
              active-class="nav-link-active"
            >
              <span>⚡ llama.cpp</span>
            </NuxtLink>
          </div>

          <NuxtLink to="/fine-tuning/fundamentals" class="nav-link" active-class="nav-link-active">
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
            <span>🎓 Fundamentals</span>
          </NuxtLink>

          <NuxtLink to="/fine-tuning/evaluation" class="nav-link" active-class="nav-link-active">
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
              <path d="M12 20V10" />
              <path d="M18 20V4" />
              <path d="M6 20v-4" />
            </svg>
            <span>📊 Evaluation</span>
          </NuxtLink>

          <NuxtLink to="/fine-tuning/deployment" class="nav-link" active-class="nav-link-active">
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
              <polyline points="9 11 12 14 22 4" />
            </svg>
            <span>🚀 Deployment</span>
          </NuxtLink>

          <div class="ml-4 space-y-1">
            <NuxtLink
              to="/fine-tuning/vllm"
              class="nav-link text-xs py-1.5"
              active-class="nav-link-active"
            >
              <span>⚡ vLLM</span>
            </NuxtLink>
          </div>

          <NuxtLink
            to="/fine-tuning/using-your-model"
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
              <circle cx="12" cy="12" r="10" />
              <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
              <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
            <span>🎯 Using Your Model</span>
          </NuxtLink>

          <NuxtLink to="/sample-datasets" class="nav-link" active-class="nav-link-active">
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

      <!-- Bottom section - sticky -->
      <div class="mt-auto">
        <!-- Theme Toggle -->
        <div class="px-4 py-3 border-t border-gray-200 dark:border-gray-700">
          <ThemeToggle />
        </div>

        <!-- Progress Widget -->
        <div class="p-6 border-t border-gray-200 bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
          <div class="mb-2">
            <span class="text-sm font-medium text-gray-700 dark:text-gray-200">
              Progress to {{ targetGoal }}
              <span v-if="activeDatasetName" class="text-xs text-tertiary block">
                {{ activeDatasetName }}
              </span>
            </span>
            <span class="text-sm text-secondary float-right">{{ progressPercentage }}%</span>
          </div>
          <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div
              class="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-500"
              :style="{ width: `${Math.min(progressPercentage, 100)}%` }"
            ></div>
          </div>
          <p class="text-xs text-secondary mt-2">{{ totalSamples }} / {{ targetGoal }} samples</p>
          <div v-if="milestones.length > 0" class="mt-2 flex flex-wrap gap-1">
            <span
              v-for="milestone in milestones"
              :key="milestone"
              class="text-[10px] px-1.5 py-0.5 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded"
            >
              {{ milestone }} reached!
            </span>
          </div>
        </div>
      </div>
    </aside>

    <!-- Main Content -->
    <main class="ml-64 p-8 min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
  import { ref, onMounted, computed } from "vue";

  const totalSamples = ref(0);
  const targetGoal = ref(100);
  const activeDatasetName = ref<string | null>(null);

  const progressPercentage = computed(() => {
    if (targetGoal.value === 0) return 0;
    return Math.round((totalSamples.value / targetGoal.value) * 100);
  });

  // Calculate milestones (25%, 50%, 75%, 100%, and every 100 after)
  const milestones = computed(() => {
    const reached: string[] = [];

    // Check percentage milestones
    if (progressPercentage.value >= 25) reached.push("25%");
    if (progressPercentage.value >= 50) reached.push("50%");
    if (progressPercentage.value >= 75) reached.push("75%");
    if (progressPercentage.value >= 100) reached.push("Goal");

    // Check every 100 samples milestone
    const hundreds = Math.floor(totalSamples.value / 100) * 100;
    if (hundreds >= 100) reached.push(`${hundreds} samples`);

    return reached;
  });

  onMounted(async () => {
    try {
      const stats = await $fetch("/api/stats/overview");
      totalSamples.value = stats.total;
      targetGoal.value = stats.activeDatasetGoal || stats.globalDefaultGoal || 100;
      activeDatasetName.value = stats.activeDatasetName || null;
    } catch (error) {
      console.error("Error loading stats:", error);
    }
  });
</script>

<style scoped>
  @reference "tailwindcss";

  .nav-link {
    @apply flex items-center gap-3 px-3 py-2 rounded-lg text-slate-700 dark:text-gray-300 hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-gray-700 dark:hover:text-gray-100 transition-colors text-sm font-medium;
  }

  .nav-link-active {
    @apply bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-medium;
  }
</style>
