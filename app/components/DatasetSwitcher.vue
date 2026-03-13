<template>
  <div class="relative">
    <!-- Active Dataset Display -->
    <button
      class="w-full flex items-center gap-3 px-3 py-2 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-left"
      @click="toggleDropdown"
    >
      <div
        class="w-8 h-8 bg-gray-600 dark:bg-gray-500 rounded-lg flex items-center justify-center text-white"
      >
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
        >
          <path d="M12 2L2 7l10 5 10-5-10-5z" />
          <path d="M2 17l10 5 10-5" />
        </svg>
      </div>
      <div class="flex-1 min-w-0">
        <p class="text-xs text-gray-600 dark:text-gray-400 font-medium">Active Dataset</p>
        <p class="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">
          {{ activeDataset?.name || "Loading..." }}
        </p>
      </div>
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
        class="text-gray-600 dark:text-gray-400 transition-transform"
        :class="{ 'rotate-180': isOpen }"
      >
        <polyline points="6 9 12 15 18 9" />
      </svg>
    </button>

    <!-- Dropdown Menu -->
    <div
      v-if="isOpen"
      class="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50 max-h-64 overflow-y-auto"
    >
      <!-- Dataset List -->
      <div class="py-1">
        <button
          v-for="dataset in availableDatasets"
          :key="dataset.id"
          class="w-full flex items-center gap-3 px-3 py-2 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-left"
          :class="{
            'bg-gray-50 dark:bg-gray-800': dataset.id === activeDataset?.id,
          }"
          @click="activateDataset(dataset.id)"
        >
          <div
            class="w-6 h-6 rounded flex items-center justify-center text-xs"
            :class="
              dataset.id === activeDataset?.id
                ? 'bg-gray-700 text-white'
                : 'bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-300'
            "
          >
            {{ dataset.name.charAt(0).toUpperCase() }}
          </div>
          <div class="flex-1 min-w-0">
            <p class="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
              {{ dataset.name }}
            </p>
            <p class="text-xs text-gray-500 dark:text-gray-400">
              {{ dataset.sampleCount }} samples
            </p>
          </div>
          <svg
            v-if="dataset.id === activeDataset?.id"
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="text-gray-500 dark:text-gray-400"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </button>
      </div>

      <!-- Divider -->
      <div class="border-t border-gray-200 dark:border-gray-700 my-1"></div>

      <!-- Actions -->
      <NuxtLink
        to="/datasets"
        class="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
        @click="isOpen = false"
      >
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
        >
          <path d="M12 2L2 7l10 5 10-5-10-5z" />
          <path d="M2 17l10 5 10-5" />
        </svg>
        Manage Datasets
      </NuxtLink>
    </div>

    <!-- Backdrop -->
    <div v-if="isOpen" class="fixed inset-0 z-40" @click="isOpen = false"></div>
  </div>

  <!-- Toast Notification -->
  <div
    v-if="notification"
    class="fixed bottom-4 right-4 bg-gray-700 text-white px-4 py-2 rounded-lg shadow-lg z-50 flex items-center gap-2"
  >
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
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
    {{ notification }}
  </div>
</template>

<script setup lang="ts">
  const isOpen = ref(false);
  const activeDataset = ref<any>(null);
  const datasets = ref<any[]>([]);
  const notification = ref("");

  const availableDatasets = computed(() => {
    return datasets.value.filter((d) => d.isArchived === 0);
  });

  async function loadDatasets() {
    try {
      const response = await $fetch("/api/datasets");
      datasets.value = response.datasets || [];
      activeDataset.value = datasets.value.find((d) => d.isActive === 1) || null;
    } catch (error) {
      console.error("Error loading datasets:", error);
    }
  }

  function toggleDropdown() {
    isOpen.value = !isOpen.value;
    if (isOpen.value) {
      loadDatasets();
    }
  }

  async function activateDataset(id: number) {
    try {
      const response = await $fetch(`/api/datasets/${id}/activate`, {
        method: "POST",
      });

      if (response.success) {
        activeDataset.value = response.dataset;
        notification.value = `Switched to "${response.dataset.name}"`;
        setTimeout(() => {
          notification.value = "";
        }, 3000);
      }
    } catch (error) {
      console.error("Error activating dataset:", error);
    } finally {
      isOpen.value = false;
    }
  }

  onMounted(() => {
    loadDatasets();
  });
</script>
