<template>
  <div class="max-w-6xl mx-auto">
    <div class="mb-6 flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold mb-2">Edit Sample #{{ route.params.id }}</h1>
        <p class="text-secondary">Update your training sample details.</p>
      </div>
      <NuxtLink :to="`/samples/${route.params.id}`" class="btn-secondary"> ← Cancel </NuxtLink>
    </div>

    <div v-if="loading" class="text-center py-12">
      <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      <p class="mt-2 text-secondary">Loading sample...</p>
    </div>

    <div v-else-if="error" class="card text-center py-12">
      <p class="text-red-600">{{ error }}</p>
      <NuxtLink to="/samples" class="btn-primary mt-4 inline-block"> Back to Dataset </NuxtLink>
    </div>

    <SampleForm
      v-else
      :initial-data="sample"
      :prev-id="navigation.prevId"
      :next-id="navigation.nextId"
      :loading="navLoading"
      @submit="handleUpdate"
      @cancel="handleCancel"
      @clone="handleClone"
      @navigate="loadSampleById"
    />

    <!-- Success Modal -->
    <div
      v-if="showSuccessModal"
      class="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      @click.self="closeSuccessModal"
    >
      <div class="bg-white dark:bg-gray-800 rounded-xl p-6 max-w-md mx-4 shadow-2xl">
        <div class="text-center">
          <div
            class="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="text-green-600 dark:text-green-400"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <h3 class="text-xl font-semibold mb-2">{{ successTitle || "Success!" }}</h3>
          <p class="text-secondary mb-6">{{ successMessage || "Sample updated successfully!" }}</p>
          <div class="flex gap-3">
            <NuxtLink
              :to="`/samples/${route.params.id}`"
              class="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-center"
            >
              View Sample
            </NuxtLink>
            <NuxtLink
              to="/samples"
              class="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 text-center"
            >
              Back to Dataset
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>

    <!-- Error Modal -->
    <div
      v-if="showErrorModal"
      class="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      @click.self="closeErrorModal"
    >
      <div class="bg-white dark:bg-gray-800 rounded-xl p-6 max-w-md mx-4 shadow-2xl">
        <div class="text-center">
          <div
            class="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="text-red-600 dark:text-red-400"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="15" x2="9" y1="9" y2="15" />
              <line x1="9" x2="15" y1="9" y2="15" />
            </svg>
          </div>
          <h3 class="text-xl font-semibold mb-2">Error</h3>
          <p class="text-secondary mb-6">{{ errorModalMessage }}</p>
          <button
            class="w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
            @click="closeErrorModal"
          >
            Try Again
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  const route = useRoute();
  const router = useRouter();

  const loading = ref(true);
  const error = ref(null);
  const sample = ref(null);
  const navLoading = ref(false);

  // Navigation state - just store prev/next IDs
  const navigation = ref({
    prevId: null,
    nextId: null,
  });

  // Modal states
  const showSuccessModal = ref(false);
  const showErrorModal = ref(false);
  const errorModalMessage = ref("");
  const successTitle = ref("");
  const successMessage = ref("");

  const loadSample = async () => {
    const id = route.params.id;
    await loadSampleById(id);
  };

  const loadSampleById = async (id) => {
    if (!id) return;

    try {
      navLoading.value = true;
      loading.value = true;
      sample.value = null;

      // Load the sample
      const response = await $fetch(`/api/samples/${id}`);
      sample.value = response.sample;

      // Update URL if navigating to different sample
      if (id !== route.params.id) {
        router.replace(`/samples/${id}/edit`);
      }

      // Load navigation info (prev/next samples in dataset)
      await loadNavigation(id);
    } catch (err) {
      error.value = "Failed to load sample. It may have been deleted.";
      console.error("Error loading sample:", err);
    } finally {
      loading.value = false;
      navLoading.value = false;
    }
  };

  const loadNavigation = async (sampleId) => {
    console.log(
      "Loading navigation for sample:",
      sampleId,
      "dataset:",
      sample.value?.dataset_id || sample.value?.datasetId
    );

    // Support both snake_case and camelCase
    const datasetId = sample.value?.dataset_id || sample.value?.datasetId;

    if (!datasetId) {
      console.log("No dataset ID found on sample");
      return;
    }

    try {
      // Get all samples in this dataset
      const response = await $fetch(`/api/samples?datasetId=${datasetId}&limit=1000`);
      const samples = response.samples || [];

      console.log("Found", samples.length, "samples in dataset");

      // Find current sample index
      const currentIndex = samples.findIndex((s) => s.id === parseInt(sampleId));

      console.log("Current sample index:", currentIndex);

      if (currentIndex !== -1) {
        const prevId = currentIndex > 0 ? samples[currentIndex - 1].id : null;
        const nextId = currentIndex < samples.length - 1 ? samples[currentIndex + 1].id : null;

        navigation.value = { prevId, nextId };
        console.log("Navigation set:", { prevId, nextId });
      }
    } catch (err) {
      console.error("Error loading navigation:", err);
    }
  };

  const handleUpdate = async (formData) => {
    try {
      const response = await $fetch(`/api/samples/${route.params.id}`, {
        method: "PUT",
        body: formData,
      });

      if (response.success) {
        showSuccessModal.value = true;
      }
    } catch (error) {
      console.error("Error updating sample:", error);
      errorModalMessage.value = error.message || "Failed to update sample. Please try again.";
      showErrorModal.value = true;
    }
  };

  const closeSuccessModal = () => {
    showSuccessModal.value = false;
    successTitle.value = "";
    successMessage.value = "";
  };

  const closeErrorModal = () => {
    showErrorModal.value = false;
  };

  const handleCancel = () => {
    router.push(`/samples/${route.params.id}`);
  };

  const handleClone = async (formData) => {
    try {
      const response = await $fetch("/api/samples", {
        method: "POST",
        body: {
          ...formData,
          status: "draft",
        },
      });

      if (response.success) {
        successTitle.value = "Sample Cloned!";
        successMessage.value = "A copy has been created as a draft.";
        showSuccessModal.value = true;
      }
    } catch (error) {
      console.error("Error cloning sample:", error);
      errorModalMessage.value = error.message || "Failed to clone sample. Please try again.";
      showErrorModal.value = true;
    }
  };

  onMounted(() => {
    loadSample();
  });

  definePageMeta({
    layout: "default",
  });
</script>
