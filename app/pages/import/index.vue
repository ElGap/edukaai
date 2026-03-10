<template>
  <div class="max-w-6xl mx-auto">
    <div class="mb-6">
      <h1 class="text-2xl font-bold mb-2">Import Data</h1>
      <p class="text-secondary">
        Import training examples to build your dataset.
      </p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- Upload JSON -->
      <div class="card">
        <div class="flex items-center gap-3 mb-4">
          <div class="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-blue-600 dark:text-blue-400">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
              <polyline points="17 8 12 3 7 8"/>
              <line x1="12" x2="12" y1="3" y2="15"/>
            </svg>
          </div>
          <div>
            <h3 class="font-semibold text-lg">Upload JSON File</h3>
            <p class="text-sm text-secondary">Import your own training data</p>
          </div>
        </div>
        <p class="text-secondary text-sm mb-4">
          Upload a JSON file with training examples in Alpaca or ShareGPT format. Preview and import into your active dataset.
        </p>
        <a 
          href="/import/json"
          class="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors no-underline"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
            <polyline points="17 8 12 3 7 8"/>
            <line x1="12" x2="12" y1="3" y2="15"/>
          </svg>
          Upload JSON File
        </a>
      </div>

      <!-- Live Capture -->
      <div class="card opacity-75">
        <div class="flex items-center gap-3 mb-4">
          <div class="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-orange-600 dark:text-orange-400">
              <circle cx="12" cy="12" r="10"/>
              <line x1="2" x2="22" y1="12" y2="12"/>
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
            </svg>
          </div>
          <div>
            <h3 class="font-semibold text-lg text-secondary">Live Capture</h3>
            <p class="text-sm text-secondary">Real-time conversation capture</p>
          </div>
        </div>
        <p class="text-secondary text-sm mb-4">
          Automatically capture and import conversations from any chat interface in real-time.
        </p>
        <button 
          disabled
          class="w-full py-2 bg-gray-300 dark:bg-gray-700 text-secondary rounded-lg cursor-not-allowed text-sm font-medium"
        >
          🚧 Coming Soon
        </button>
      </div>
    </div>

    <!-- Sample Datasets Section -->
    <div class="card mt-6">
      <h2 class="text-lg font-semibold mb-4">📦 Sample Datasets</h2>
      <p class="text-sm text-secondary mb-4">
        Download these ready-to-use datasets or import them directly into your active dataset.
      </p>
      
      <div class="space-y-3">
        <div class="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <div>
            <h3 class="font-medium text-blue-900 dark:text-blue-200">Coding Examples</h3>
            <p class="text-xs text-blue-700 dark:text-blue-300">5 programming examples</p>
          </div>
          <div class="flex gap-2">
            <a 
              href="/sample-data/coding-examples.json" 
              download
              class="inline-flex items-center gap-1 px-3 py-1.5 bg-blue-100 text-blue-700 text-sm rounded hover:bg-blue-200 transition-colors"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
              </svg>
              Download
            </a>
            <button
              class="inline-flex items-center gap-1 px-3 py-1.5 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors"
              @click="importSampleData('coding', 'Coding Examples')"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
              </svg>
              Import
            </button>
          </div>
        </div>

        <div class="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
          <div>
            <h3 class="font-medium text-green-900 dark:text-green-200">General Knowledge</h3>
            <p class="text-xs text-green-700 dark:text-green-300">4 diverse examples</p>
          </div>
          <div class="flex gap-2">
            <a 
              href="/sample-data/general-knowledge-examples.json" 
              download
              class="inline-flex items-center gap-1 px-3 py-1.5 bg-green-100 text-green-700 text-sm rounded hover:bg-green-200 transition-colors"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
              </svg>
              Download
            </a>
            <button
              class="inline-flex items-center gap-1 px-3 py-1.5 bg-green-600 text-white text-sm rounded hover:bg-green-700 transition-colors"
              @click="importSampleData('general', 'General Knowledge')"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
              </svg>
              Import
            </button>
          </div>
        </div>

        <div class="flex items-center justify-between p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-800">
          <div>
            <h3 class="font-medium text-purple-900 dark:text-purple-200">Fictional Characters</h3>
            <p class="text-xs text-purple-700 dark:text-purple-300">62 examples (3 characters)</p>
          </div>
          <div class="flex gap-2">
            <a 
              href="/sample-data/fictional-characters.json" 
              download
              class="inline-flex items-center gap-1 px-3 py-1.5 bg-purple-100 text-purple-700 text-sm rounded hover:bg-purple-200 transition-colors"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
              </svg>
              Download
            </a>
            <button
              class="inline-flex items-center gap-1 px-3 py-1.5 bg-purple-600 text-white text-sm rounded hover:bg-purple-700 transition-colors"
              @click="importSampleData('fictional-characters', 'Fictional Characters')"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
              </svg>
              Import
            </button>
          </div>
        </div>
      </div>
      
      <p class="text-xs text-tertiary mt-4">
        💡 Tip: Click "Import" to automatically add all samples to your active dataset, or "Download" to save the JSON file for manual import.
      </p>
    </div>

    <!-- Success Modal -->
    <div
      v-if="showSuccessModal"
      class="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      @click.self="showSuccessModal = false"
    >
      <div class="bg-white dark:bg-gray-800 rounded-xl p-6 max-w-md mx-4 shadow-2xl">
        <div class="text-center">
          <div class="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
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
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
              <polyline points="22 4 12 14.01 9 11.01"/>
            </svg>
          </div>
          <h3 class="text-xl font-semibold mb-2">{{ successTitle }}</h3>
          <p class="text-secondary mb-6">{{ successMessage }}</p>
          <div class="flex gap-3">
            <button
              class="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800"
              @click="showSuccessModal = false"
            >
              Stay Here
            </button>
            <NuxtLink
              to="/samples"
              class="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-center no-underline"
            >
              View Samples
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>

    <!-- Error Modal -->
    <div
      v-if="showErrorModal"
      class="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      @click.self="showErrorModal = false"
    >
      <div class="bg-white dark:bg-gray-800 rounded-xl p-6 max-w-md mx-4 shadow-2xl">
        <div class="text-center">
          <div class="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
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
              <circle cx="12" cy="12" r="10"/>
              <line x1="15" x2="9" y1="9" y2="15"/>
              <line x1="9" x2="15" y1="9" y2="15"/>
            </svg>
          </div>
          <h3 class="text-xl font-semibold mb-2">Error</h3>
          <p class="text-secondary mb-6">{{ errorModalMessage }}</p>
          <button
            class="w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
            @click="showErrorModal = false"
          >
            Try Again
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const router = useRouter()

// Modal states
const showSuccessModal = ref(false)
const showErrorModal = ref(false)
const successTitle = ref('')
const successMessage = ref('')
const errorModalMessage = ref('')

const goToJsonUpload = () => {
  router.push('/import/json')
}

const importSampleData = async (type, name) => {
  try {
    // Fetch the sample data - handle both naming conventions
    const filename = type === 'coding' || type === 'general' 
      ? `/sample-data/${type}-examples.json`
      : `/sample-data/${type}.json`
    
    const response = await fetch(filename)
    
    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.status} ${response.statusText}`)
    }
    
    const data = await response.json()
    
    // Check if data has the expected structure
    if (!data.examples || !Array.isArray(data.examples)) {
      throw new Error(`Invalid dataset format: missing 'examples' array`)
    }
    
    // Transform examples to samples for the API
    const samplesToImport = data.examples.map(ex => ({
      instruction: ex.instruction || '',
      input: ex.input || '',
      output: ex.output || '',
      systemPrompt: ex.systemPrompt || null,
      category: ex.category || 'general',
      difficulty: ex.difficulty || 'intermediate',
      qualityRating: ex.qualityRating || 3,
      tags: ex.tags || [],
      notes: ex.notes || null
    }))
    
    // Import via the API
    const importResponse = await $fetch('/api/import/json', {
      method: 'POST',
      body: {
        samples: samplesToImport,
        format: 'alpaca'
      }
    })
    
    if (importResponse.success) {
      successTitle.value = 'Import Successful!'
      successMessage.value = `Successfully imported ${importResponse.imported} samples from ${name} into your active dataset.`
      showSuccessModal.value = true
    } else {
      errorModalMessage.value = importResponse.message || 'Import failed. Please try again.'
      showErrorModal.value = true
    }
  } catch (error) {
    console.error('Import error:', error)
    errorModalMessage.value = error.message || `Error importing ${name}. Please try again.`
    showErrorModal.value = true
  }
}

definePageMeta({
  layout: 'default'
})
</script>
