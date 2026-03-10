<template>
  <div class="max-w-6xl mx-auto">
    <div class="mb-8 flex items-center justify-between">
      <div>
        <h1 class="text-3xl font-bold mb-2">Datasets</h1>
        <p class="text-secondary">Manage your training data collections.</p>
      </div>
      <button class="btn-primary flex items-center gap-2" @click="showCreateModal = true">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="12" y1="5" x2="12" y2="19" />
          <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
        New Dataset
      </button>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="text-center py-12">
      <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
      <p class="mt-4 text-secondary">Loading datasets...</p>
    </div>

    <!-- Empty State -->
    <div v-else-if="datasets.length === 0" class="card text-center py-12">
      <h3 class="text-lg font-semibold mb-2">No datasets yet</h3>
      <p class="text-secondary mb-4">Create your first dataset to start collecting training examples.</p>
      <button class="btn-primary" @click="showCreateModal = true">Create Dataset</button>
    </div>

    <!-- Dataset List -->
    <div v-else class="space-y-4">
      <div v-for="dataset in datasets" :key="dataset.id" class="card relative" :class="{ 'border-blue-500 border-2': dataset.isActive }">
        <div v-if="dataset.isActive" class="absolute -top-3 left-4 px-2 py-1 bg-blue-500 text-white text-xs font-medium rounded-full">Active</div>
        
        <div class="flex items-start justify-between">
          <div class="flex-1">
            <div class="flex items-center gap-3 mb-2">
              <div class="w-10 h-10 rounded-lg flex items-center justify-center text-lg font-bold" :class="dataset.isActive ? 'bg-blue-500 text-white' : 'bg-gray-100 dark:bg-gray-800 text-secondary'">
                {{ dataset.name.charAt(0).toUpperCase() }}
              </div>
              <div>
                <h3 class="text-lg font-semibold">{{ dataset.name }}</h3>
                <p v-if="dataset.description" class="text-sm text-secondary">{{ dataset.description }}</p>
              </div>
            </div>

            <!-- Stats -->
            <div class="flex items-center gap-4 mt-3 text-sm text-secondary">
              <span class="flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                </svg>
                {{ dataset.sampleCount }} / {{ dataset.goalSamples || globalDefaultGoal }} samples
              </span>
              <span class="flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="text-green-500">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                {{ dataset.approvedCount }} approved
              </span>
            </div>

            <!-- Settings -->
            <div class="flex items-center gap-2 mt-3">
              <span class="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-secondary text-xs rounded">Quality: {{ dataset.defaultQuality }}</span>
              <span class="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-secondary text-xs rounded">Category: {{ dataset.defaultCategory }}</span>
            </div>
          </div>

          <!-- Actions -->
          <div class="flex items-center gap-2">
            <button v-if="!dataset.isActive" :disabled="activating === dataset.id" class="btn-secondary text-sm" @click="activateDataset(dataset.id)">
              {{ activating === dataset.id ? "Activating..." : "Set Active" }}
            </button>
            <button class="p-2 text-secondary hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Edit" @click="editDataset(dataset)">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
              </svg>
            </button>
            <button v-if="datasets.length > 1" class="p-2 text-secondary hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Delete" @click="confirmDelete(dataset)">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="3 6 5 6 21 6" />
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Create Dataset Modal -->
    <div v-if="showCreateModal" class="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div class="bg-white dark:bg-gray-800 rounded-xl p-6 max-w-md w-full">
        <h3 class="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100">Create New Dataset</h3>
        <form @submit.prevent="createDataset">
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Name <span class="text-red-500">*</span></label>
              <input v-model="createForm.name" type="text" required maxlength="100" placeholder="e.g., Python Code Examples" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Description</label>
              <textarea v-model="createForm.description" maxlength="500" rows="2" placeholder="What kind of examples will this dataset contain?" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"></textarea>
            </div>
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Default Quality</label>
                <select v-model="createForm.defaultQuality" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white">
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                  Goal (samples)
                  <span class="text-xs text-tertiary font-normal ml-1">Default: {{ globalDefaultGoal }}</span>
                </label>
                <div class="flex gap-2">
                  <select v-model="createForm.goalPreset" class="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white text-sm">
                    <option value="default">Default ({{ globalDefaultGoal }})</option>
                    <option value="50">50 (Quick test)</option>
                    <option value="100">100 (Beginner)</option>
                    <option value="250">250 (Intermediate)</option>
                    <option value="500">500 (Advanced)</option>
                    <option value="1000">1000 (Professional)</option>
                    <option value="custom">Custom...</option>
                  </select>
                  <input v-if="createForm.goalPreset === 'custom'" v-model.number="createForm.customGoalSamples" type="number" min="10" max="10000" placeholder="#" class="w-20 px-2 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white text-sm" />
                </div>
              </div>
            </div>
            <div class="flex items-center gap-2">
              <input id="autoApprove" v-model="createForm.defaultAutoApprove" type="checkbox" class="w-4 h-4 text-blue-600 rounded focus:ring-blue-500" />
              <label for="autoApprove" class="text-sm text-gray-700 dark:text-gray-200">Auto-approve imported examples</label>
            </div>
          </div>
          <div class="flex gap-3 mt-6">
            <button type="button" class="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800" @click="showCreateModal = false">Cancel</button>
            <button type="submit" :disabled="creating || !createForm.name" class="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50">{{ creating ? "Creating..." : "Create" }}</button>
          </div>
        </form>
      </div>
    </div>

    <!-- Edit Dataset Modal -->
    <div v-if="showEditModal" class="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div class="bg-white dark:bg-gray-800 rounded-xl p-6 max-w-md w-full">
        <h3 class="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100">Edit Dataset</h3>
        <form @submit.prevent="updateDataset">
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Name <span class="text-red-500">*</span></label>
              <input v-model="editForm.name" type="text" required maxlength="100" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Description</label>
              <textarea v-model="editForm.description" maxlength="500" rows="2" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"></textarea>
            </div>
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Default Quality</label>
                <select v-model="editForm.defaultQuality" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white">
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Goal (samples)</label>
                <select v-model="editForm.goalSamples" class="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white">
                  <option :value="globalDefaultGoal">Default ({{ globalDefaultGoal }})</option>
                  <option :value="50">50 (Quick test)</option>
                  <option :value="100">100 (Beginner)</option>
                  <option :value="250">250 (Intermediate)</option>
                  <option :value="500">500 (Advanced)</option>
                  <option :value="1000">1000 (Professional)</option>
                </select>
              </div>
            </div>
            <div class="flex items-center gap-2">
              <input id="editAutoApprove" v-model="editForm.defaultAutoApprove" type="checkbox" class="w-4 h-4 text-blue-600 rounded focus:ring-blue-500" />
              <label for="editAutoApprove" class="text-sm text-gray-700 dark:text-gray-200">Auto-approve imported examples</label>
            </div>
          </div>
          <div class="flex gap-3 mt-6">
            <button type="button" class="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800" @click="showEditModal = false">Cancel</button>
            <button type="submit" :disabled="updating" class="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50">{{ updating ? "Saving..." : "Save Changes" }}</button>
          </div>
        </form>
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <div v-if="showDeleteModal" class="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div class="bg-white dark:bg-gray-800 rounded-xl p-6 max-w-md w-full">
        <div class="text-center">
          <div class="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="text-red-600 dark:text-red-400">
              <polyline points="3 6 5 6 21 6" />
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
            </svg>
          </div>
          <h3 class="text-xl font-bold mb-2 text-gray-900 dark:text-gray-100">Delete Dataset</h3>
          <p class="text-secondary mb-4">Are you sure you want to delete <strong class="text-gray-900 dark:text-gray-100">{{ datasetToDelete?.name }}</strong>?</p>
          <p class="text-sm text-red-600 dark:text-red-400 mb-4">
            <span v-if="datasetToDelete?.sampleCount > 0">This will permanently delete {{ datasetToDelete?.sampleCount }} sample(s). This action cannot be undone.</span>
            <span v-else>This action cannot be undone.</span>
          </p>
          <div class="flex gap-3">
            <button class="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800" @click="showDeleteModal = false">Cancel</button>
            <button :disabled="deleting" class="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50" @click="deleteDataset">{{ deleting ? "Deleting..." : "Delete" }}</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const router = useRouter();

// State
const loading = ref(true);
const datasets = ref<any[]>([]);
const showCreateModal = ref(false);
const showEditModal = ref(false);
const showDeleteModal = ref(false);
const creating = ref(false);
const updating = ref(false);
const deleting = ref(false);
const activating = ref<number | null>(null);
const datasetToDelete = ref<any>(null);

// Settings
const globalDefaultGoal = ref(100);

// Forms
const createForm = reactive({
  name: "",
  description: "",
  defaultQuality: "medium",
  defaultCategory: "general",
  defaultAutoApprove: false,
  goalPreset: "default" as "default" | "50" | "100" | "250" | "500" | "1000" | "custom",
  customGoalSamples: 100,
});

const editForm = reactive({
  id: 0,
  name: "",
  description: "",
  defaultQuality: "medium",
  defaultCategory: "general",
  defaultAutoApprove: false,
  goalSamples: null as number | null,
});

// Load settings and datasets
async function loadSettings() {
  try {
    const response = await $fetch("/api/settings");
    if (response.success && response.data) {
      globalDefaultGoal.value = response.data.defaultGoalSamples || 100;
      if (!createForm.goalPreset) {
        createForm.goalPreset = "default";
      }
    }
  } catch (error) {
    console.error("Error loading settings:", error);
  }
}

async function loadDatasets() {
  try {
    loading.value = true;
    const response = await $fetch("/api/datasets");
    datasets.value = response.datasets || [];
  } catch (error) {
    console.error("Error loading datasets:", error);
  } finally {
    loading.value = false;
  }
}

// Create dataset
async function createDataset() {
  try {
    creating.value = true;
    
    let goalValue: number | undefined;
    if (createForm.goalPreset === "custom") {
      goalValue = createForm.customGoalSamples;
    } else if (createForm.goalPreset !== "default") {
      goalValue = parseInt(createForm.goalPreset);
    }
    
    const response = await $fetch("/api/datasets", {
      method: "POST",
      body: {
        name: createForm.name,
        description: createForm.description,
        defaultQuality: createForm.defaultQuality,
        defaultCategory: createForm.defaultCategory,
        defaultAutoApprove: createForm.defaultAutoApprove,
        goalSamples: goalValue,
      },
    });

    if (response.success) {
      showCreateModal.value = false;
      createForm.name = "";
      createForm.description = "";
      createForm.defaultQuality = "medium";
      createForm.defaultCategory = "general";
      createForm.defaultAutoApprove = false;
      createForm.goalPreset = "default";
      createForm.customGoalSamples = 100;
      await loadDatasets();
    }
  } catch (error) {
    console.error("Error creating dataset:", error);
    alert("Failed to create dataset");
  } finally {
    creating.value = false;
  }
}

// Edit dataset
function editDataset(dataset: any) {
  editForm.id = dataset.id;
  editForm.name = dataset.name;
  editForm.description = dataset.description || "";
  editForm.defaultQuality = dataset.defaultQuality;
  editForm.defaultCategory = dataset.defaultCategory;
  editForm.defaultAutoApprove = dataset.defaultAutoApprove === 1;
  editForm.goalSamples = dataset.goalSamples || globalDefaultGoal.value;
  showEditModal.value = true;
}

async function updateDataset() {
  try {
    updating.value = true;
    const response = await $fetch(`/api/datasets/${editForm.id}`, {
      method: "PUT",
      body: {
        name: editForm.name,
        description: editForm.description,
        defaultQuality: editForm.defaultQuality,
        defaultCategory: editForm.defaultCategory,
        defaultAutoApprove: editForm.defaultAutoApprove,
        goalSamples: editForm.goalSamples,
      },
    });

    if (response.success) {
      showEditModal.value = false;
      await loadDatasets();
    }
  } catch (error) {
    console.error("Error updating dataset:", error);
    alert("Failed to update dataset");
  } finally {
    updating.value = false;
  }
}

// Activate dataset
async function activateDataset(id: number) {
  try {
    activating.value = id;
    const response = await $fetch(`/api/datasets/${id}/activate`, {
      method: "POST",
    });

    if (response.success) {
      await loadDatasets();
    }
  } catch (error) {
    console.error("Error activating dataset:", error);
    alert("Failed to activate dataset");
  } finally {
    activating.value = null;
  }
}

// Delete dataset
function confirmDelete(dataset: any) {
  datasetToDelete.value = dataset;
  showDeleteModal.value = true;
}

async function deleteDataset() {
  if (!datasetToDelete.value) return;

  try {
    deleting.value = true;
    await $fetch(`/api/datasets/${datasetToDelete.value.id}`, {
      method: "DELETE",
    });

    showDeleteModal.value = false;
    datasetToDelete.value = null;
    await loadDatasets();
  } catch (error) {
    console.error("Error deleting dataset:", error);
    alert("Failed to delete dataset");
  } finally {
    deleting.value = false;
  }
}

onMounted(() => {
  loadSettings();
  loadDatasets();
});

useHead({
  title: "Datasets - EdukaAI",
});
</script>
