<template>
  <div class="max-w-6xl mx-auto">
    <!-- Welcome Section -->
    <div class="mb-8">
      <h1 class="text-3xl font-bold mb-2">Welcome to edukaAI 👋</h1>
      <p class="text-secondary">Learn LLM fine-tuning by building your own training dataset.</p>
    </div>

    <!-- Progress Dashboard -->
    <div class="card mb-8">
      <div class="flex items-center justify-between mb-6">
        <div>
          <h2 class="text-2xl font-bold mb-1">🎯 Goal: First Fine-Tuning</h2>
          <p class="text-secondary">Build a dataset of 100 high-quality training samples</p>
        </div>
        <div class="text-right">
          <div class="text-4xl font-bold text-blue-600">{{ stats.progress?.current || 0 }}</div>
          <div class="text-tertiary">/ 100 samples</div>
        </div>
      </div>

      <!-- Progress Bar -->
      <div class="mb-6">
        <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-6">
          <div
            class="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 h-6 rounded-full transition-all duration-700 flex items-center justify-end pr-2"
            :style="{ width: `${Math.min(progressPercentage, 100)}%` }"
          >
            <span v-if="progressPercentage > 10" class="text-white text-sm font-medium"
              >{{ progressPercentage }}%</span
            >
          </div>
        </div>
      </div>

      <!-- Quick Stats -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div class="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
          <div class="text-2xl font-bold text-blue-600">{{ stats.total }}</div>
          <div class="text-sm text-secondary">Total Samples</div>
        </div>
        <div class="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
          <div class="text-2xl font-bold text-green-600">{{ stats.approved }}</div>
          <div class="text-sm text-secondary">Approved</div>
        </div>
        <div class="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4">
          <div class="text-2xl font-bold text-yellow-600">{{ stats.draft }}</div>
          <div class="text-sm text-secondary">Drafts</div>
        </div>
        <div class="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4">
          <div class="text-2xl font-bold text-purple-600">{{ stats.rejected || 0 }}</div>
          <div class="text-sm text-secondary">Rejected</div>
        </div>
      </div>
    </div>

    <!-- Milestones and Quick Actions - Side by Side -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 items-start">
      <!-- Milestones -->
      <div class="card w-full min-w-0">
        <h3 class="text-lg font-semibold mb-4">🎯 Milestones</h3>
        <div class="flex flex-col gap-3">
          <div class="w-full">
            <MilestoneItem
              :achieved="stats.total >= 10"
              count="10"
              label="Getting Started"
              :current="Math.max(0, Math.min(stats.total, 10))"
            />
          </div>
          <div class="w-full">
            <MilestoneItem
              :achieved="stats.total >= 25"
              count="25"
              label="Building Momentum"
              :current="Math.max(0, Math.min(stats.total - 10, 15))"
            />
          </div>
          <div class="w-full">
            <MilestoneItem
              :achieved="stats.total >= 50"
              count="50"
              label="Halfway There!"
              :current="Math.max(0, Math.min(stats.total - 25, 25))"
            />
          </div>
          <div class="w-full">
            <MilestoneItem
              :achieved="stats.total >= 100"
              count="100"
              label="Ready to Train! 🎉"
              :current="Math.max(0, Math.min(stats.total - 50, 50))"
            />
          </div>
        </div>
      </div>

      <!-- Quick Actions -->
      <div class="card w-full min-w-0">
        <h3 class="text-lg font-semibold mb-4">⚡ Quick Actions</h3>
        <div class="space-y-3">
          <NuxtLink
            to="/samples/new"
            class="flex items-center gap-3 p-3 bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded-lg transition-colors"
          >
            <span class="text-2xl">➕</span>
            <div>
              <div class="font-medium">Create New Sample</div>
              <div class="text-sm text-secondary">Add a training sample manually</div>
            </div>
          </NuxtLink>

          <div
            class="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg opacity-60 cursor-not-allowed"
          >
            <span class="text-2xl">🌐</span>
            <div>
              <div class="font-medium">Live Capture</div>
              <div class="text-sm text-secondary">Coming soon...</div>
            </div>
          </div>

          <NuxtLink
            to="/export"
            class="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/20 hover:bg-green-100 dark:hover:bg-green-900/30 rounded-lg transition-colors"
          >
            <span class="text-2xl">📤</span>
            <div>
              <div class="font-medium">Export Dataset</div>
              <div class="text-sm text-secondary">Compatible with all major training platforms</div>
            </div>
          </NuxtLink>
        </div>
      </div>
    </div>

    <!-- Breakdown Charts -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div class="card">
        <h3 class="text-lg font-semibold mb-4 text-secondary">📊 By Source</h3>
        <div class="space-y-2">
          <div
            v-for="(count, source) in stats.sources"
            :key="source"
            class="flex justify-between items-center"
          >
            <span class="capitalize">{{ formatSource(source) }}</span>
            <span class="font-medium">{{ count }}</span>
          </div>
          <div
            v-if="!stats.sources || Object.keys(stats.sources).length === 0"
            class="text-tertiary text-center py-4"
          >
            No data yet
          </div>
        </div>
      </div>

      <div class="card">
        <h3 class="text-lg font-semibold mb-4 text-secondary">📋 By Category</h3>
        <div class="space-y-2">
          <div
            v-for="(count, category) in stats.categories"
            :key="category"
            class="flex justify-between items-center"
          >
            <span class="capitalize">{{ category }}</span>
            <span class="font-medium">{{ count }}</span>
          </div>
          <div
            v-if="!stats.categories || Object.keys(stats.categories).length === 0"
            class="text-tertiary text-center py-4"
          >
            No data yet
          </div>
        </div>
      </div>

      <div class="card">
        <h3 class="text-lg font-semibold mb-4 text-secondary">📈 By Difficulty</h3>
        <div class="space-y-2">
          <div
            v-for="(count, difficulty) in stats.difficulties"
            :key="difficulty"
            class="flex justify-between items-center"
          >
            <span class="capitalize">{{ difficulty }}</span>
            <span class="font-medium">{{ count }}</span>
          </div>
          <div
            v-if="!stats.difficulties || Object.keys(stats.difficulties).length === 0"
            class="text-tertiary text-center py-4"
          >
            No data yet
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, computed, onMounted } from "vue";

  interface Stats {
    total: number;
    approved: number;
    draft: number;
    rejected: number;
    sources: Record<string, number>;
    categories: Record<string, number>;
    difficulties: Record<string, number>;
    progress: {
      current: number;
      target: number;
      percentage: number;
    };
  }

  const stats = ref<Stats>({
    total: 0,
    approved: 0,
    draft: 0,
    rejected: 0,
    sources: {},
    categories: {},
    difficulties: {},
    progress: {
      current: 0,
      target: 100,
      percentage: 0,
    },
  });

  const progressPercentage = computed(() => {
    return Math.round((stats.value.total / 100) * 100);
  });

  const formatSource = (source: string) => {
    const sources: Record<string, string> = {
      manual: "Manual",
      json: "JSON Import",
    };
    return sources[source] || source;
  };

  onMounted(async () => {
    try {
      const response = await $fetch<Stats>("/api/stats/overview");
      stats.value = response;
    } catch (error) {
      console.error("Error loading dashboard:", error);
    }
  });
</script>
