<template>
  <div class="max-w-6xl mx-auto">
    <div class="mb-6">
      <h1 class="text-2xl font-bold mb-2">Export Your Dataset</h1>
      <p class="text-secondary">
        Export your training samples in various formats compatible with popular fine-tuning tools.
      </p>
    </div>

    <!-- Dataset Selector -->
    <div class="card mb-6">
      <label class="form-label">Select Dataset to Export</label>
      <div v-if="loadingDatasets" class="text-sm text-secondary py-2">Loading datasets...</div>
      <div v-else-if="datasets.length === 0" class="text-sm text-secondary py-2">
        No datasets available. Create a dataset first.
      </div>
      <select v-else v-model="selectedDataset" class="form-input w-full">
        <option v-for="dataset in datasets" :key="dataset.id" :value="dataset.id">
          {{ dataset.name }} - {{ dataset.sampleCount }} samples
        </option>
      </select>
    </div>

    <!-- Stats Overview -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      <div class="card p-4 text-center">
        <div class="text-2xl font-bold text-blue-300">
          <span v-if="loadingStats" class="animate-pulse">...</span>
          <span v-else>{{ stats.total }}</span>
        </div>
        <div class="text-sm text-secondary">Total Samples</div>
      </div>
      <div class="card p-4 text-center">
        <div class="text-2xl font-bold text-blue-300">
          <span v-if="loadingStats" class="animate-pulse">...</span>
          <span v-else>{{ stats.approved }}</span>
        </div>
        <div class="text-sm text-secondary">Approved</div>
      </div>
      <div class="card p-4 text-center">
        <div class="text-2xl font-bold text-blue-300">
          <span v-if="loadingStats" class="animate-pulse">...</span>
          <span v-else>{{ stats.draft }}</span>
        </div>
        <div class="text-sm text-secondary">Drafts</div>
      </div>
      <div class="card p-4 text-center">
        <div class="text-2xl font-bold text-green-500">
          <span v-if="loadingStats" class="animate-pulse">...</span>
          <span v-else>{{ stats.avgQuality.toFixed(1) }}</span>
        </div>
        <div class="text-sm text-secondary">Avg Quality</div>
      </div>
    </div>

    <!-- Export Form -->
    <div class="card">
      <div class="flex items-center justify-between mb-6">
        <h2 class="text-lg font-semibold">Export Configuration</h2>
      </div>

      <div class="space-y-6">
        <!-- Format Selection -->
        <div>
          <label class="form-label">Export Format</label>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <button
              v-for="fmt in formats"
              :key="fmt.id"
              class="p-4 border-2 rounded-xl text-left transition-all hover:border-gray-400"
              :class="
                selectedFormat === fmt.id
                  ? 'bg-gray-500 bg-gray-50 dark:bg-gray-800'
                  : 'border-gray-200 dark:border-gray-700'
              "
              @click="selectedFormat = fmt.id"
            >
              <div class="flex items-center justify-between mb-2">
                <span class="text-2xl">{{ fmt.icon }}</span>
                <span
                  v-if="fmt.recommended"
                  class="text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-1 rounded-full"
                >
                  Recommended
                </span>
              </div>
              <h3 class="font-semibold mb-1">{{ fmt.name }}</h3>
              <p class="text-sm text-secondary">{{ fmt.description }}</p>
              <div class="mt-2 text-xs text-tertiary">
                {{ fmt.compatibility }}
              </div>
            </button>
          </div>
        </div>

        <!-- Filters -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label class="form-label">Status Filter</label>
            <select v-model="filters.status" class="form-input">
              <option value="all">All Samples</option>
              <option value="approved">Approved Only</option>
              <option value="draft">Drafts Only</option>
              <option value="review">In Review</option>
            </select>
          </div>

          <div>
            <label class="form-label">Minimum Quality</label>
            <select v-model="filters.minQuality" class="form-input">
              <option :value="undefined">Any Quality</option>
              <option :value="1">⭐ 1+</option>
              <option :value="2">⭐⭐ 2+</option>
              <option :value="3">⭐⭐⭐ 3+</option>
              <option :value="4">⭐⭐⭐⭐ 4+</option>
              <option :value="5">⭐⭐⭐⭐⭐ 5 only</option>
            </select>
          </div>
        </div>

        <!-- Train/Validation Split -->
        <div>
          <div class="flex items-center gap-2 mb-2">
            <label class="form-label mb-0">Train/Validation Split (Optional)</label>
            <div class="group relative">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="text-tertiary cursor-help"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M12 16v-4" />
                <path d="M12 8h.01" />
              </svg>
              <div
                class="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-64 p-3 bg-gray-800 text-white text-xs rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10"
              >
                <p class="font-medium mb-1">Why split your data?</p>
                <p>
                  Training data teaches the model. Validation data tests if it learned correctly
                  (without cheating). This helps detect overfitting.
                </p>
                <div
                  class="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 rotate-45 w-2 h-2 bg-gray-800"
                ></div>
              </div>
            </div>
          </div>
          <div class="flex gap-2 flex-wrap">
            <button
              v-for="split in splits"
              :key="split.value"
              class="px-4 py-2 rounded-lg border-2 transition-all"
              :class="
                filters.split === split.value
                  ? 'bg-gray-500 bg-gray-50 dark:bg-gray-800'
                  : 'border-gray-200 dark:border-gray-700 hover:border-gray-300'
              "
              @click="filters.split = split.value"
            >
              {{ split.label }}
            </button>
          </div>
          <p v-if="filters.split !== 'none'" class="text-sm text-secondary mt-2">
            Your dataset will be randomly split into training and validation sets.
          </p>
        </div>

        <!-- Metadata Option -->
        <div class="flex items-center gap-3">
          <input
            id="includeMetadata"
            v-model="filters.includeMetadata"
            type="checkbox"
            class="w-4 h-4 rounded border-gray-300 text-gray-700 focus:ring-blue-500"
          />
          <label for="includeMetadata" class="text-sm font-medium">
            Include metadata (category, quality, timestamps, etc.)
          </label>
        </div>
      </div>

      <!-- Export Button -->
      <div class="mt-8 flex items-center justify-between">
        <div v-if="exportResult" class="text-sm text-secondary">
          <span v-if="exportResult.splits">
            {{ exportResult.splits.train.count }} train +
            {{ exportResult.splits.validation.count }} validation samples
          </span>
          <span v-else> {{ exportResult.count }} samples ready for download </span>
        </div>
        <div class="flex gap-3">
          <button class="btn-secondary" @click="resetFilters">Reset</button>
          <button
            :disabled="exporting || loadingDatasets || loadingStats || stats.total === 0"
            class="btn-primary border border-gray-400"
            :class="{
              'opacity-50 cursor-not-allowed':
                exporting || loadingDatasets || loadingStats || stats.total === 0,
            }"
            @click="exportDataset"
          >
            <span v-if="exporting">Exporting...</span>
            <span v-else-if="loadingDatasets || loadingStats">Loading...</span>
            <span v-else>📤 Export Dataset</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Export Result -->
    <div v-if="exportResult" class="card mt-6">
      <h2 class="text-lg font-semibold mb-4">Download Your Dataset</h2>

      <div v-if="exportResult.splits" class="space-y-4">
        <div class="flex gap-4">
          <div class="flex-1 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <div class="flex items-center justify-between mb-2">
              <h3 class="font-semibold">Training Set</h3>
              <span class="text-sm text-secondary"
                >{{ exportResult.splits.train.count }} samples</span
              >
            </div>
            <button
              class="w-full btn-primary border border-gray-400"
              @click="
                downloadFile(exportResult.splits.train.data, exportResult.splits.train.filename)
              "
            >
              Download {{ exportResult.splits.train.filename }}
            </button>
          </div>

          <div class="flex-1 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <div class="flex items-center justify-between mb-2">
              <h3 class="font-semibold">Validation Set</h3>
              <span class="text-sm text-secondary"
                >{{ exportResult.splits.validation.count }} samples</span
              >
            </div>
            <button
              class="w-full btn-primary border border-gray-400"
              @click="
                downloadFile(
                  exportResult.splits.validation.data,
                  exportResult.splits.validation.filename
                )
              "
            >
              Download {{ exportResult.splits.validation.filename }}
            </button>
          </div>
        </div>
      </div>

      <div v-else>
        <div class="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <div class="flex items-center justify-between mb-2">
            <h3 class="font-semibold">Complete Dataset</h3>
            <span class="text-sm text-secondary">{{ exportResult.count }} samples</span>
          </div>
          <button
            class="w-full btn-primary border border-gray-400"
            @click="downloadFile(exportResult.data, exportResult.filename)"
          >
            Download {{ exportResult.filename }}
          </button>
        </div>
      </div>

      <!-- Copy to Clipboard for JSON formats -->
      <div v-if="selectedFormat === 'json' || selectedFormat === 'jsonl'" class="mt-4">
        <button
          class="text-sm text-gray-700 hover:text-gray-800 underline"
          @click="copyToClipboard"
        >
          Copy to clipboard instead
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, onMounted, watch } from "vue";
  import { useRoute } from "vue-router";

  const route = useRoute();

  const formats = [
    {
      id: "alpaca",
      name: "Alpaca",
      icon: "🦙",
      description: "Standard format for instruction tuning",
      compatibility: "Works with: LLaMA-Factory, Axolotl, HuggingFace",
      recommended: false,
    },
    {
      id: "mlx",
      name: "MLX-LM (Apple)",
      icon: "🍎",
      description: "Chat format for Apple MLX-LM framework (ready to use)",
      compatibility: "mlx-lm on Apple Silicon - NO conversion needed",
      recommended: false,
    },
    {
      id: "unsloth",
      name: "Unsloth",
      icon: "⚡",
      description: "Optimized format for Unsloth (2x faster training)",
      compatibility: "Works with: Unsloth, TRL, HuggingFace",
      recommended: false,
    },
    {
      id: "trl",
      name: "TRL (HuggingFace)",
      icon: "🤗",
      description: "Native HuggingFace TRL format with prompt/completion pairs",
      compatibility: "Works with: TRL, transformers, PEFT",
      recommended: false,
    },
    {
      id: "sharegpt",
      name: "ShareGPT",
      icon: "💬",
      description: "Conversational format",
      compatibility: "Works with: ShareGPT, some fine-tuning tools",
    },
    {
      id: "jsonl",
      name: "JSONL",
      icon: "📝",
      description: "Alpaca format, one JSON per line (NOT for MLX!)",
      compatibility: "General purpose, NOT compatible with mlx-lm",
    },
    {
      id: "json",
      name: "JSON",
      icon: "📄",
      description: "Single JSON file with metadata",
      compatibility: "Includes full metadata and statistics",
    },
    {
      id: "csv",
      name: "CSV",
      icon: "📊",
      description: "Spreadsheet format",
      compatibility: "Open in Excel, Google Sheets",
    },
  ];

  const splits = [
    { value: "none", label: "No Split" },
    { value: "90-10", label: "90% Train / 10% Val" },
    { value: "80-20", label: "80% Train / 20% Val" },
    { value: "70-30", label: "70% Train / 30% Val" },
  ];

  const selectedFormat = ref("alpaca");
  const exporting = ref(false);
  const exportResult = ref<any>(null);
  const selectedDataset = ref<number | null>(null);
  const datasets = ref<any[]>([]);
  const loadingDatasets = ref(true);
  const loadingStats = ref(false);

  const filters = ref({
    status: "approved",
    minQuality: undefined as number | undefined,
    split: "none",
    includeMetadata: true,
  });

  const stats = ref({
    total: 0,
    approved: 0,
    draft: 0,
    review: 0,
    avgQuality: 0,
  });

  const loadDatasets = async () => {
    try {
      loadingDatasets.value = true;
      const response = await $fetch("/api/datasets");
      datasets.value = response.datasets || [];

      // Check if URL has a dataset parameter
      const urlDatasetId = route.query.dataset;
      if (urlDatasetId) {
        const id = parseInt(urlDatasetId as string);
        // Verify the dataset exists in our list
        const found = datasets.value.find((d) => d.id === id);
        if (found) {
          selectedDataset.value = id;
        } else {
          // Fall back to active dataset
          const activeDataset = datasets.value.find((d) => d.isActive === 1);
          if (activeDataset) {
            selectedDataset.value = activeDataset.id;
          } else if (datasets.value.length > 0) {
            selectedDataset.value = datasets.value[0].id;
          }
        }
      } else {
        // Preselect the active dataset or the first one
        const activeDataset = datasets.value.find((d) => d.isActive === 1);
        if (activeDataset) {
          selectedDataset.value = activeDataset.id;
        } else if (datasets.value.length > 0) {
          selectedDataset.value = datasets.value[0].id;
        }
      }

      // Load stats for selected dataset
      await loadStats();
    } catch (error) {
      console.error("Error loading datasets:", error);
    } finally {
      loadingDatasets.value = false;
    }
  };

  // Watch for URL dataset changes
  watch(
    () => route.query.dataset,
    async (newDatasetId) => {
      if (newDatasetId && datasets.value.length > 0) {
        const id = parseInt(newDatasetId as string);
        const found = datasets.value.find((d) => d.id === id);
        if (found && selectedDataset.value !== id) {
          selectedDataset.value = id;
          exportResult.value = null;
          await loadStats();
        }
      }
    }
  );

  const loadStats = async () => {
    if (!selectedDataset.value) return;

    loadingStats.value = true;

    try {
      const response = await $fetch(`/api/datasets/${selectedDataset.value}/stats`);
      stats.value = {
        total: response.total || 0,
        approved: response.approved || 0,
        draft: response.draft || 0,
        review: response.review || 0,
        avgQuality: response.avgQuality || 0,
      };
    } catch (error) {
      console.error("Error loading stats:", error);
      // If dataset-specific stats endpoint doesn't exist, use overview
      try {
        const overviewResponse = await $fetch("/api/stats/overview");
        stats.value = {
          total: overviewResponse.total || 0,
          approved: overviewResponse.approved || 0,
          draft: overviewResponse.draft || 0,
          review: overviewResponse.review || 0,
          avgQuality: overviewResponse.avgQuality || 0,
        };
      } catch (overviewError) {
        console.error("Error loading overview stats:", overviewError);
      }
    } finally {
      loadingStats.value = false;
    }
  };

  // Watch for dataset changes and reload stats
  watch(selectedDataset, async () => {
    if (selectedDataset.value) {
      exportResult.value = null;
      await loadStats();
    }
  });

  const exportDataset = async () => {
    if (!selectedDataset.value) {
      alert("Please select a dataset to export");
      return;
    }

    exporting.value = true;

    try {
      const body: any = {
        format: selectedFormat.value,
        status: filters.value.status,
        split: filters.value.split,
        minQuality: filters.value.minQuality,
        includeMetadata: filters.value.includeMetadata,
        datasetId: selectedDataset.value,
      };

      const response = await $fetch("/api/export", {
        method: "POST",
        body,
      });

      exportResult.value = response;
    } catch (error) {
      console.error("Error exporting:", error);
      alert("Export failed. Please try again.");
    } finally {
      exporting.value = false;
    }
  };

  const downloadFile = (data: any, filename: string) => {
    let content: string;
    let mimeType: string;

    if (typeof data === "string") {
      content = data;
      mimeType = filename.endsWith(".csv") ? "text/csv" : "application/jsonl";
    } else {
      content = JSON.stringify(data, null, 2);
      mimeType = "application/json";
    }

    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const copyToClipboard = () => {
    if (!exportResult.value) return;

    const data = exportResult.value.splits
      ? exportResult.value.splits.train.data
      : exportResult.value.data;

    const text = typeof data === "string" ? data : JSON.stringify(data, null, 2);

    navigator.clipboard.writeText(text).then(() => {
      alert("Copied to clipboard!");
    });
  };

  const resetFilters = () => {
    filters.value = {
      status: "approved",
      minQuality: undefined,
      split: "none",
      includeMetadata: true,
    };
    exportResult.value = null;
  };

  onMounted(() => {
    loadDatasets();
  });

  definePageMeta({
    layout: "default",
  });
</script>
