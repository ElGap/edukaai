<template>
  <div class="max-w-6xl mx-auto">
    <!-- Header -->
    <div class="mb-8">
      <h1 class="text-3xl font-bold mb-2">Dataset Dashboard</h1>
      <p class="text-secondary">Manage your training data collections and track progress</p>
    </div>

    <!-- Stats Overview -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
      <div
        class="card bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-900/30 border-blue-200 dark:border-blue-800"
      >
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-blue-600 dark:text-blue-300 font-medium">Total Samples</p>
            <p class="text-3xl font-bold text-blue-900 dark:text-blue-100">
              {{ stats.totalSamples }}
            </p>
          </div>
          <div
            class="w-12 h-12 bg-blue-200 dark:bg-blue-800 rounded-full flex items-center justify-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              class="text-blue-700 dark:text-blue-300"
            >
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
            </svg>
          </div>
        </div>
      </div>

      <div
        class="card bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-900/30 border-green-200 dark:border-green-800"
      >
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-green-600 dark:text-green-300 font-medium">Approved</p>
            <p class="text-3xl font-bold text-green-900 dark:text-green-100">
              {{ stats.approvedSamples }}
            </p>
          </div>
          <div
            class="w-12 h-12 bg-green-200 dark:bg-green-800 rounded-full flex items-center justify-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              class="text-green-700 dark:text-green-300"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
        </div>
      </div>

      <div
        class="card bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-900/30 border-yellow-200 dark:border-yellow-800"
      >
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-yellow-600 dark:text-yellow-300 font-medium">Pending Review</p>
            <p class="text-3xl font-bold text-yellow-900 dark:text-yellow-100">
              {{ stats.pendingSamples }}
            </p>
          </div>
          <div
            class="w-12 h-12 bg-yellow-200 dark:bg-yellow-800 rounded-full flex items-center justify-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              class="text-yellow-700 dark:text-yellow-300"
            >
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
          </div>
        </div>
      </div>

      <div
        class="card bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-900/30 border-purple-200 dark:border-purple-800"
      >
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-purple-600 dark:text-purple-300 font-medium">Datasets</p>
            <p class="text-3xl font-bold text-purple-900 dark:text-purple-100">
              {{ datasets.length }}
            </p>
          </div>
          <div
            class="w-12 h-12 bg-purple-200 dark:bg-purple-800 rounded-full flex items-center justify-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              class="text-purple-700 dark:text-purple-300"
            >
              <path d="M12 2L2 7l10 5 10-5-10-5z" />
              <path d="M2 17l10 5 10-5" />
            </svg>
          </div>
        </div>
      </div>
    </div>

    <!-- Progress Bar -->
    <div class="card mb-8">
      <div class="flex items-center justify-between mb-4">
        <h2 class="text-lg font-semibold">Progress to 100 Samples</h2>
        <span class="text-sm text-secondary"
          >{{ Math.round((stats.totalSamples / 100) * 100) }}% complete</span
        >
      </div>
      <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4 mb-2">
        <div
          class="bg-gradient-to-r from-blue-500 to-purple-500 h-4 rounded-full transition-all duration-500"
          :style="{
            width: Math.min((stats.totalSamples / 100) * 100, 100) + '%',
          }"
        ></div>
      </div>
      <p class="text-sm text-secondary">
        {{ stats.totalSamples }} / 100 samples collected
        <span
          v-if="stats.totalSamples >= 100"
          class="text-green-600 dark:text-green-400 font-medium ml-2"
          >🎉 Goal reached!</span
        >
      </p>
    </div>

    <!-- Active Dataset Section -->
    <div class="mb-8">
      <h2 class="text-xl font-semibold mb-4">Active Dataset</h2>
      <div
        v-if="activeDataset"
        class="card border-2 border-blue-500 dark:border-blue-700 bg-blue-50/50 dark:bg-blue-900/20"
      >
        <div class="flex items-start justify-between">
          <div class="flex items-center gap-4">
            <div
              class="w-16 h-16 bg-blue-500 rounded-xl flex items-center justify-center text-white text-2xl font-bold"
            >
              {{ activeDataset.name.charAt(0).toUpperCase() }}
            </div>
            <div>
              <div class="flex items-center gap-2">
                <h3 class="text-xl font-bold">{{ activeDataset.name }}</h3>
                <span
                  class="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs rounded-full font-medium"
                  >Active</span
                >
              </div>
              <p class="text-secondary">
                {{ activeDataset.description || "No description" }}
              </p>
              <div class="flex items-center gap-4 mt-2 text-sm">
                <span class="text-secondary">
                  <strong>{{ activeDataset.sampleCount }}</strong> samples
                </span>
                <span class="text-green-600 dark:text-green-400">
                  <strong>{{ activeDataset.approvedCount }}</strong> approved
                </span>
                <span v-if="activeDataset.updatedAt" class="text-tertiary">
                  Last updated: {{ formatDate(activeDataset.updatedAt) }}
                </span>
                <span v-else class="text-tertiary"> Never updated </span>
              </div>
            </div>
          </div>
          <div class="flex gap-2">
            <NuxtLink :to="`/samples?datasetId=${activeDataset.id}`" class="btn-primary">
              View Samples
            </NuxtLink>
          </div>
        </div>
      </div>
      <div v-else class="card text-center py-8 text-tertiary">No active dataset selected</div>
    </div>

    <!-- All Datasets Grid -->
    <div class="mb-8">
      <div class="flex items-center justify-between mb-4">
        <h2 class="text-xl font-semibold">All Datasets</h2>
        <button class="btn-primary flex items-center gap-2" @click="showCreateModal = true">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          New Dataset
        </button>
      </div>

      <div v-if="datasets.length === 0" class="card text-center py-12">
        <div class="text-tertiary mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            class="mx-auto"
          >
            <path d="M12 2L2 7l10 5 10-5-10-5z" />
            <path d="M2 17l10 5 10-5" />
          </svg>
        </div>
        <p class="text-secondary mb-4">No datasets yet</p>
        <button class="btn-primary" @click="showCreateModal = true">
          Create Your First Dataset
        </button>
      </div>

      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div
          v-for="dataset in datasets"
          :key="dataset.id"
          :class="[
            'card cursor-pointer transition-all hover:shadow-lg',
            dataset.isActive
              ? 'border-2 border-blue-500 dark:border-blue-700 bg-blue-50/30 dark:bg-blue-900/20'
              : '',
          ]"
          @click="activateDataset(dataset.id)"
        >
          <div class="flex items-start justify-between mb-3">
            <div
              class="w-10 h-10 rounded-lg flex items-center justify-center text-lg font-bold"
              :class="
                dataset.isActive
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-secondary'
              "
            >
              {{ dataset.name.charAt(0).toUpperCase() }}
            </div>
            <span
              v-if="dataset.isActive"
              class="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs rounded-full font-medium"
            >
              Active
            </span>
          </div>

          <h3 class="font-semibold text-lg mb-1">{{ dataset.name }}</h3>
          <p class="text-sm text-secondary mb-3 line-clamp-2">
            {{ dataset.description || "No description" }}
          </p>

          <div class="flex items-center gap-3 text-sm text-tertiary">
            <span class="text-secondary">{{ dataset.sampleCount }} samples</span>
            <span class="text-green-600 dark:text-green-400"
              >{{ dataset.approvedCount }} approved</span
            >
          </div>

          <div class="mt-3 pt-3 border-t flex items-center justify-between">
            <span v-if="dataset.updatedAt" class="text-xs text-tertiary"
              >Updated {{ timeAgo(dataset.updatedAt) }}</span
            >
            <span v-else class="text-xs text-tertiary">Never updated</span>
            <NuxtLink
              :to="`/samples?datasetId=${dataset.id}`"
              class="text-sm text-blue-600 hover:underline"
              @click.stop
            >
              View →
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>

    <!-- Recent Activity -->
    <div v-if="recentSamples.length > 0" class="card">
      <div class="flex items-center justify-between mb-4">
        <h2 class="text-xl font-semibold">Recent Samples</h2>
        <NuxtLink to="/samples" class="text-sm text-blue-600 hover:underline">View All →</NuxtLink>
      </div>
      <div class="space-y-3">
        <div
          v-for="sample in recentSamples"
          :key="sample.id"
          class="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        >
          <div class="flex-1 min-w-0">
            <p class="font-medium truncate">{{ sample.instruction }}</p>
            <p class="text-sm text-tertiary">
              {{ sample.datasetName }} • {{ sample.category }} •
              {{ timeAgo(sample.createdAt) }}
            </p>
          </div>
          <span
            class="px-2 py-1 text-xs rounded-full font-medium capitalize"
            :class="statusClass(sample.status)"
          >
            {{ sample.status }}
          </span>
        </div>
      </div>
    </div>

    <!-- Create Dataset Modal -->
    <div
      v-if="showCreateModal"
      class="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
    >
      <div class="bg-white dark:bg-gray-800 rounded-xl p-6 max-w-md w-full">
        <h3 class="text-xl font-bold mb-4">Create New Dataset</h3>
        <form @submit.prevent="createDataset">
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1"
                >Name <span class="text-red-500">*</span></label
              >
              <input
                v-model="createForm.name"
                type="text"
                required
                maxlength="100"
                placeholder="e.g., Python Code Samples"
                class="form-input w-full"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1"
                >Description</label
              >
              <textarea
                v-model="createForm.description"
                maxlength="500"
                rows="2"
                placeholder="What kind of samples will this dataset contain?"
                class="form-input w-full"
              ></textarea>
            </div>
          </div>
          <div class="flex gap-3 mt-6">
            <button type="button" class="flex-1 btn-secondary" @click="showCreateModal = false">
              Cancel
            </button>
            <button type="submit" :disabled="creating" class="flex-1 btn-primary">
              {{ creating ? "Creating..." : "Create" }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
  const datasets = ref([]);
  const activeDataset = ref(null);
  const recentSamples = ref([]);
  const stats = ref({
    totalSamples: 0,
    approvedSamples: 0,
    pendingSamples: 0,
  });
  const showCreateModal = ref(false);
  const creating = ref(false);
  const createForm = reactive({
    name: "",
    description: "",
  });

  function statusClass(status) {
    const classes = {
      approved: "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300",
      draft: "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300",
      review: "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300",
      rejected: "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300",
    };
    return classes[status] || "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200";
  }

  function formatDate(timestamp) {
    return new Date(timestamp).toLocaleDateString();
  }

  function timeAgo(timestamp) {
    const seconds = Math.floor((Date.now() - new Date(timestamp).getTime()) / 1000);

    if (seconds < 60) return "just now";
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    return `${Math.floor(seconds / 86400)}d ago`;
  }

  async function loadData() {
    try {
      // Load datasets
      const datasetsResponse = await $fetch("/api/datasets");
      datasets.value = datasetsResponse.datasets || [];
      activeDataset.value = datasets.value.find((d) => d.isActive === 1) || null;

      // Load stats
      const statsResponse = await $fetch("/api/stats/overview");
      stats.value = {
        totalSamples: statsResponse.total || 0,
        approvedSamples: statsResponse.approved || 0,
        pendingSamples: statsResponse.draft || 0,
      };

      // Load recent samples
      const samplesResponse = await $fetch("/api/samples?limit=5&sort=newest");
      recentSamples.value = samplesResponse.samples || [];
    } catch (error) {
      console.error("Failed to load dashboard data:", error);
    }
  }

  async function activateDataset(id) {
    try {
      const response = await $fetch(`/api/datasets/${id}/activate`, {
        method: "POST",
      });

      if (response.success) {
        await loadData();
      }
    } catch (error) {
      console.error("Failed to activate dataset:", error);
    }
  }

  async function createDataset() {
    try {
      creating.value = true;
      const response = await $fetch("/api/datasets", {
        method: "POST",
        body: {
          name: createForm.name,
          description: createForm.description,
        },
      });

      if (response.success) {
        showCreateModal.value = false;
        createForm.name = "";
        createForm.description = "";
        await loadData();

        // Activate the new dataset
        await activateDataset(response.dataset.id);
      }
    } catch (error) {
      console.error("Failed to create dataset:", error);
      alert("Failed to create dataset: " + error.message);
    } finally {
      creating.value = false;
    }
  }

  onMounted(() => {
    loadData();
  });

  useHead({
    title: "Dataset Dashboard - EdukaAI",
  });
</script>
