<template>
  <div class="space-y-6">
    <!-- Header with Active Dataset Info -->
    <div class="card">
      <div class="flex items-center justify-between mb-4">
        <div>
          <div class="flex items-center gap-3">
            <h1 class="text-2xl font-bold text-gray-900 dark:text-gray-100">
              {{ activeDataset?.name || "Dataset" }}
            </h1>
            <span
              v-if="activeDataset?.isActive"
              class="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs rounded-full font-medium"
            >
              Active
            </span>
          </div>
          <p class="text-secondary mt-1">
            {{ activeDataset?.description || "Manage your training samples" }}
          </p>
        </div>
        <NuxtLink to="/samples/new" class="btn-primary"> + New Sample </NuxtLink>
      </div>

      <!-- Progress Bar -->
      <div class="mb-4">
        <div class="flex justify-between text-sm mb-1">
          <span class="font-medium">🎯 Goal: First Fine-Tuning</span>
          <span class="text-secondary">{{ stats.total }} / 100 ({{ progressPercentage }}%)</span>
        </div>
        <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4">
          <div
            class="bg-gradient-to-r from-blue-500 to-purple-500 h-4 rounded-full transition-all duration-500"
            :style="{ width: `${Math.min(progressPercentage, 100)}%` }"
          ></div>
        </div>
      </div>
    </div>

    <!-- Filters -->
    <div class="card py-4">
      <div class="flex flex-wrap gap-4 items-center">
        <!-- Dataset Filter -->
        <div class="flex items-center gap-2">
          <label class="text-sm font-medium text-secondary">Search:</label>
          <input
            v-model="filters.search"
            type="text"
            class="form-input w-64"
            placeholder="Search instruction or output..."
            @input="debouncedSearch"
          />
        </div>

        <div class="flex items-center gap-2">
          <label class="text-sm font-medium text-secondary">Status:</label>
          <select v-model="filters.status" class="form-input" @change="loadSamples">
            <option value="">All</option>
            <option value="draft">Draft</option>
            <option value="review">In Review</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>

        <div class="flex items-center gap-2">
          <label class="text-sm font-medium text-secondary">Source:</label>
          <select v-model="filters.source" class="form-input" @change="loadSamples">
            <option value="">All</option>
            <option value="manual">Manual</option>
            <option value="json">JSON Import</option>
          </select>
        </div>

        <div class="flex items-center gap-2">
          <label class="text-sm font-medium text-secondary">Category:</label>
          <select v-model="filters.category" class="form-input" @change="loadSamples">
            <option value="">All</option>
            <option value="general">General</option>
            <option value="coding">Coding</option>
            <option value="analysis">Analysis</option>
            <option value="explanation">Explanation</option>
            <option value="writing">Writing</option>
            <option value="math">Math</option>
            <option value="science">Science</option>
          </select>
        </div>

        <div class="flex items-center gap-2">
          <label class="text-sm font-medium text-secondary">Sort:</label>
          <select v-model="filters.sort" class="form-input" @change="loadSamples">
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="quality">Quality (High to Low)</option>
          </select>
        </div>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="text-center py-12">
      <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      <p class="mt-2 text-secondary">Loading samples...</p>
    </div>

    <!-- Empty State -->
    <div v-else-if="samples.length === 0" class="card text-center py-12">
      <div class="text-6xl mb-4">📝</div>
      <h3 class="text-xl font-semibold mb-2">No samples yet</h3>
      <p class="text-secondary mb-4">
        Start building your dataset by creating your first training sample.
      </p>
      <NuxtLink to="/samples/new" class="btn-primary"> Create First Sample </NuxtLink>
    </div>

    <!-- Samples Grid with Bulk Selection -->
    <div v-else class="space-y-4">
      <!-- Bulk Action Toolbar -->
      <div
        v-if="selectedIds.length > 0"
        class="card bg-blue-50 dark:bg-blue-900/20 border-blue-300 dark:border-blue-800 sticky top-4 z-20"
      >
        <div class="flex flex-wrap items-center justify-between gap-4">
          <div class="flex items-center gap-3">
            <input
              type="checkbox"
              :checked="selectedIds.length === samples.length"
              class="w-5 h-5 rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500"
              @change="toggleSelectAll"
            />
            <span class="font-medium text-blue-900 dark:text-blue-200">
              {{ selectedIds.length }} selected
            </span>
          </div>

          <div class="flex flex-wrap items-center gap-2">
            <span class="text-sm text-blue-700 dark:text-blue-300">Bulk actions:</span>

            <select
              v-model="bulkAction.category"
              class="form-input text-sm py-1"
              @change="applyBulkCategory"
            >
              <option value="">Change Category...</option>
              <option value="general">General</option>
              <option value="coding">Coding</option>
              <option value="analysis">Analysis</option>
              <option value="explanation">Explanation</option>
              <option value="writing">Writing</option>
              <option value="math">Math</option>
              <option value="science">Science</option>
            </select>

            <select
              v-model="bulkAction.status"
              class="form-input text-sm py-1"
              @change="applyBulkStatus"
            >
              <option value="">Change Status...</option>
              <option value="draft">Draft</option>
              <option value="review">In Review</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>

            <button
              class="btn-primary text-sm py-1 px-3"
              :disabled="applyingBulk"
              @click="applyBulkApprove"
            >
              ✅ Approve All
            </button>

            <button class="btn-secondary text-sm py-1 px-3" @click="clearSelection">Clear</button>
          </div>
        </div>
      </div>

      <div class="grid gap-4">
        <SampleCard
          v-for="sample in samples"
          :key="sample.id"
          :sample="sample"
          :is-selected="selectedIds.includes(sample.id)"
          @toggle-select="toggleSelect(sample.id)"
          @refresh="loadSamples"
        />
      </div>
    </div>

    <!-- Pagination -->
    <div v-if="samples.length > 0" class="flex justify-between items-center card">
      <span class="text-sm text-secondary">
        Showing {{ samples.length }} of {{ pagination.total }} samples
      </span>
      <div class="flex gap-2">
        <button
          :disabled="pagination.offset === 0"
          class="btn-secondary"
          :class="{ 'opacity-50 cursor-not-allowed': pagination.offset === 0 }"
          @click="prevPage"
        >
          Previous
        </button>
        <button
          :disabled="!pagination.hasMore"
          class="btn-secondary"
          :class="{ 'opacity-50 cursor-not-allowed': !pagination.hasMore }"
          @click="nextPage"
        >
          Next
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, reactive, computed, onMounted } from "vue";

  interface Sample {
    id: number;
    instruction: string;
    output: string;
    category: string;
    difficulty: string;
    qualityRating: number;
    status: "draft" | "review" | "approved" | "rejected";
    source: string;
    createdAt: string;
    updatedAt: string;
  }

  interface Stats {
    total: number;
    approved: number;
    draft: number;
  }

  interface Pagination {
    total: number;
    limit: number;
    offset: number;
    hasMore: boolean;
  }

  const loading = ref(true);
  const samples = ref<Sample[]>([]);
  const datasets = ref<any[]>([]);
  const activeDatasetId = ref<number | null>(null);
  const activeDataset = ref<any>(null);
  const stats = ref<Stats>({ total: 0, approved: 0, draft: 0 });
  const pagination = ref<Pagination>({
    total: 0,
    limit: 20,
    offset: 0,
    hasMore: false,
  });

  const filters = reactive({
    search: "",
    status: "",
    source: "",
    category: "",
    sort: "newest",
  });

  const availableDatasets = computed(() => {
    return datasets.value.filter((d) => d.isArchived === 0);
  });

  // Bulk operations state
  const selectedIds = ref<number[]>([]);
  const applyingBulk = ref(false);
  const bulkAction = reactive({
    category: "",
    status: "",
  });

  let searchTimeout: ReturnType<typeof setTimeout> | null = null;

  const progressPercentage = computed(() => {
    return Math.round((stats.value.total / 100) * 100);
  });

  // Bulk selection methods
  const toggleSelect = (id: number) => {
    const index = selectedIds.value.indexOf(id);
    if (index > -1) {
      selectedIds.value.splice(index, 1);
    } else {
      selectedIds.value.push(id);
    }
  };

  const toggleSelectAll = () => {
    if (selectedIds.value.length === samples.value.length) {
      selectedIds.value = [];
    } else {
      selectedIds.value = samples.value.map((s) => s.id);
    }
  };

  const clearSelection = () => {
    selectedIds.value = [];
    bulkAction.category = "";
    bulkAction.status = "";
  };

  // Bulk operations
  const applyBulkCategory = async () => {
    if (!bulkAction.category || selectedIds.value.length === 0) return;

    applyingBulk.value = true;
    try {
      await $fetch("/api/samples/bulk-update", {
        method: "POST",
        body: {
          ids: selectedIds.value,
          category: bulkAction.category,
        },
      });

      // Update local state
      samples.value.forEach((sample) => {
        if (selectedIds.value.includes(sample.id)) {
          sample.category = bulkAction.category;
        }
      });

      bulkAction.category = "";
    } catch (error) {
      console.error("Failed to bulk update category:", error);
      alert("Failed to update category. Please try again.");
    } finally {
      applyingBulk.value = false;
    }
  };

  const applyBulkStatus = async () => {
    if (!bulkAction.status || selectedIds.value.length === 0) return;

    applyingBulk.value = true;
    try {
      await $fetch("/api/samples/bulk-update", {
        method: "POST",
        body: {
          ids: selectedIds.value,
          status: bulkAction.status,
        },
      });

      // Update local state
      samples.value.forEach((sample) => {
        if (selectedIds.value.includes(sample.id)) {
          sample.status = bulkAction.status as Sample["status"];
        }
      });

      bulkAction.status = "";
      loadSamples(); // Refresh to update stats
    } catch (error) {
      console.error("Failed to bulk update status:", error);
      alert("Failed to update status. Please try again.");
    } finally {
      applyingBulk.value = false;
    }
  };

  const applyBulkApprove = async () => {
    if (selectedIds.value.length === 0) return;

    applyingBulk.value = true;
    try {
      await $fetch("/api/samples/bulk-update", {
        method: "POST",
        body: {
          ids: selectedIds.value,
          status: "approved",
        },
      });

      // Update local state
      samples.value.forEach((sample) => {
        if (selectedIds.value.includes(sample.id)) {
          sample.status = "approved";
        }
      });

      clearSelection();
      loadSamples(); // Refresh to update stats
    } catch (error) {
      console.error("Failed to bulk approve:", error);
      alert("Failed to approve samples. Please try again.");
    } finally {
      applyingBulk.value = false;
    }
  };

  const loadSamples = async () => {
    loading.value = true;

    try {
      const query: Record<string, string> = {
        limit: String(pagination.value.limit),
        offset: String(pagination.value.offset),
        sort: filters.sort,
      };

      // Always use active dataset - don't allow switching via filter
      if (activeDatasetId.value) {
        query.datasetId = String(activeDatasetId.value);
      }

      if (filters.status) query.status = filters.status;
      if (filters.source) query.source = filters.source;
      if (filters.category) query.category = filters.category;
      if (filters.search) query.search = filters.search;

      const response = await $fetch("/api/samples", { query });
      samples.value = response.samples;
      pagination.value = response.pagination;

      // Load stats separately or from the response
      await loadStats();
    } catch (error) {
      console.error("Error loading samples:", error);
    } finally {
      loading.value = false;
    }
  };

  const loadDatasets = async () => {
    try {
      const response = await $fetch("/api/datasets");
      datasets.value = response.datasets || [];
      activeDatasetId.value = response.activeDatasetId;

      // Find and set the active dataset
      activeDataset.value = datasets.value.find((d) => d.id === response.activeDatasetId) || null;
    } catch (error) {
      console.error("Error loading datasets:", error);
    }
  };

  const loadStats = async () => {
    try {
      const response = await $fetch("/api/stats/overview");
      stats.value = response;
    } catch (error) {
      console.error("Error loading stats:", error);
    }
  };

  const debouncedSearch = () => {
    if (searchTimeout) clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
      pagination.value.offset = 0;
      loadSamples();
    }, 300);
  };

  const prevPage = () => {
    if (pagination.value.offset > 0) {
      pagination.value.offset -= pagination.value.limit;
      loadSamples();
    }
  };

  const nextPage = () => {
    if (pagination.value.hasMore) {
      pagination.value.offset += pagination.value.limit;
      loadSamples();
    }
  };

  onMounted(async () => {
    await loadDatasets();
    await loadSamples();
  });
</script>
