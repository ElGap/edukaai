<template>
  <div class="max-w-4xl mx-auto">
    <div class="mb-6">
      <h1 class="text-2xl font-bold mb-2">Import from AI Assistants</h1>
      <p class="text-gray-600">
        Import your conversations from coding assistants to automatically build your dataset.
      </p>
    </div>
    
    <!-- Step 1: Select Source -->
    <div v-if="currentStep === 1" class="card">
      <h2 class="text-lg font-semibold mb-6">Step 1: Select Your AI Assistant</h2>
      
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <!-- Claude Code -->
        <button
          @click="selectSource('claude')"
          class="p-6 border-2 rounded-xl text-left transition-all hover:border-blue-400"
          :class="selectedSource === 'claude' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'"
        >
          <div class="text-4xl mb-3">🤖</div>
          <h3 class="font-semibold mb-1">Claude Code</h3>
          <p class="text-sm text-gray-600">Full conversation import with metadata</p>
          <div class="mt-3 flex items-center gap-1 text-sm text-green-600">
            <span>✓</span>
            <span>Recommended</span>
          </div>
        </button>
        
        <!-- Cursor -->
        <button
          @click="selectSource('cursor')"
          class="p-6 border-2 rounded-xl text-left transition-all hover:border-blue-400"
          :class="selectedSource === 'cursor' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'"
        >
          <div class="text-4xl mb-3">🖱️</div>
          <h3 class="font-semibold mb-1">Cursor</h3>
          <p class="text-sm text-gray-600">Import from Cursor editor chat history</p>
          <div class="mt-3 flex items-center gap-1 text-sm text-green-600">
            <span>✓</span>
            <span>Recommended</span>
          </div>
        </button>
        
        <!-- ChatGPT -->
        <button
          @click="selectSource('chatgpt')"
          class="p-6 border-2 rounded-xl text-left transition-all hover:border-green-400"
          :class="selectedSource === 'chatgpt' ? 'border-green-500 bg-green-50' : 'border-gray-200'"
        >
          <div class="text-4xl mb-3">💬</div>
          <h3 class="font-semibold mb-1">ChatGPT</h3>
          <p class="text-sm text-gray-600">Import from ChatGPT export file</p>
          <div class="mt-3 flex items-center gap-1 text-sm text-blue-600">
            <span>📥</span>
            <span>Export Required</span>
          </div>
        </button>
        
        <!-- GitHub Copilot -->
        <button
          @click="selectSource('copilot')"
          class="p-6 border-2 rounded-xl text-left transition-all hover:border-purple-400"
          :class="selectedSource === 'copilot' ? 'border-purple-500 bg-purple-50' : 'border-gray-200'"
        >
          <div class="text-4xl mb-3">🤝</div>
          <h3 class="font-semibold mb-1">GitHub Copilot</h3>
          <p class="text-sm text-gray-600">Import from VS Code Copilot chat</p>
          <div class="mt-3 flex items-center gap-1 text-sm text-purple-600">
            <span>⚡</span>
            <span>Coding Focused</span>
          </div>
        </button>
        
        <!-- OpenCode -->
        <button
          @click="selectSource('opencode')"
          class="p-6 border-2 rounded-xl text-left transition-all hover:border-yellow-400"
          :class="selectedSource === 'opencode' ? 'border-yellow-500 bg-yellow-50' : 'border-gray-200'"
        >
          <div class="text-4xl mb-3">⚠️</div>
          <h3 class="font-semibold mb-1">OpenCode</h3>
          <p class="text-sm text-gray-600">Limited import - metadata only</p>
          <div class="mt-3 flex items-center gap-1 text-sm text-yellow-600">
            <span>⚠</span>
            <span>Limited Data</span>
          </div>
        </button>
      </div>
      
      <div v-if="selectedSource === 'chatgpt'" class="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
        <p class="text-sm text-green-800">
          <strong>📥 ChatGPT Export Required:</strong> You need to export your ChatGPT conversations first:
        </p>
        <ol class="text-sm text-green-700 mt-2 list-decimal list-inside">
          <li>Go to chat.openai.com → Settings → Data controls</li>
          <li>Click "Export data" and wait for the email</li>
          <li>Download and extract the ZIP file</li>
          <li>Place <code>conversations.json</code> in your Downloads folder</li>
        </ol>
      </div>
      
      <div v-if="selectedSource === 'copilot'" class="mt-4 p-4 bg-purple-50 border border-purple-200 rounded-lg">
        <p class="text-sm text-purple-800">
          <strong>🤝 GitHub Copilot:</strong> Copilot conversations from VS Code will be automatically detected.
        </p>
        <p class="text-sm text-purple-700 mt-1">
          Note: Only available if you have VS Code with Copilot chat history enabled.
        </p>
      </div>
      
      <div v-if="selectedSource === 'opencode'" class="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <p class="text-sm text-yellow-800">
          <strong>⚠️ Warning:</strong> OpenCode has limited log access. Only basic metadata will be imported. 
          Full conversation content may not be available. We recommend using Claude Code or Cursor for best results.
        </p>
      </div>
      
      <div class="flex justify-end mt-6">
        <button
          @click="currentStep = 2"
          :disabled="!selectedSource"
          class="btn-primary"
          :class="{ 'opacity-50 cursor-not-allowed': !selectedSource }"
        >
          Next: Configure Import →
        </button>
      </div>
    </div>
    
    <!-- Step 2: Date Range -->
    <div v-if="currentStep === 2" class="card">
      <h2 class="text-lg font-semibold mb-6">Step 2: Select Date Range</h2>
      
      <div class="space-y-4">
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="form-label">From Date</label>
            <input
              v-model="dateFrom"
              type="date"
              class="form-input"
            />
          </div>
          <div>
            <label class="form-label">To Date</label>
            <input
              v-model="dateTo"
              type="date"
              class="form-input"
            />
          </div>
        </div>
        
        <div class="flex gap-2">
          <button
            @click="setDateRange('today')"
            class="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg"
          >
            Today
          </button>
          <button
            @click="setDateRange('week')"
            class="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg"
          >
            Last 7 Days
          </button>
          <button
            @click="setDateRange('month')"
            class="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg"
          >
            Last 30 Days
          </button>
          <button
            @click="setDateRange('all')"
            class="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg"
          >
            All Time
          </button>
        </div>
      </div>
      
      <div class="mt-6 p-4 bg-gray-50 rounded-lg">
        <h3 class="font-medium mb-2">📁 Manual File Selection (Optional)</h3>
        <p class="text-sm text-gray-600 mb-3">
          If automatic detection doesn't find your files, you can specify the path manually.
        </p>
        <input
          v-model="manualPath"
          type="text"
          class="form-input"
          placeholder="/path/to/conversations.json"
        />
      </div>
      
      <div class="flex justify-between mt-6">
        <button @click="currentStep = 1" class="btn-secondary">
          ← Back
        </button>
        <button
          @click="previewImport"
          :disabled="scanning"
          class="btn-primary"
        >
          <span v-if="scanning">Scanning...</span>
          <span v-else">Preview Import →</span>
        </button>
      </div>
    </div>
    
    <!-- Step 3: Preview -->
    <div v-if="currentStep === 3" class="space-y-6">
      <div class="card">
        <h2 class="text-lg font-semibold mb-4">Step 3: Preview & Import</h2>
        
        <div v-if="loading" class="text-center py-12">
          <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <p class="mt-2 text-gray-600">Analyzing conversations...</p>
        </div>
        
        <div v-else>
          <!-- Stats -->
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div class="bg-blue-50 rounded-lg p-4 text-center">
              <div class="text-2xl font-bold text-blue-600">{{ previewData?.stats.totalSessions || 0 }}</div>
              <div class="text-sm text-gray-600">Conversations</div>
            </div>
            <div class="bg-green-50 rounded-lg p-4 text-center">
              <div class="text-2xl font-bold text-green-600">{{ previewData?.stats.extractedExamples || 0 }}</div>
              <div class="text-sm text-gray-600">Examples Found</div>
            </div>
            <div class="bg-yellow-50 rounded-lg p-4 text-center">
              <div class="text-2xl font-bold text-yellow-600">{{ previewData?.stats.needsReview || 0 }}</div>
              <div class="text-sm text-gray-600">Need Review</div>
            </div>
            <div class="bg-red-50 rounded-lg p-4 text-center">
              <div class="text-2xl font-bold text-red-600">{{ previewData?.errors.length || 0 }}</div>
              <div class="text-sm text-gray-600">Warnings</div>
            </div>
          </div>
          
          <!-- Warnings -->
          <div v-if="previewData?.errors.length" class="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <h3 class="font-medium text-yellow-800 mb-2">⚠️ Warnings</h3>
            <ul class="text-sm text-yellow-700 space-y-1">
              <li v-for="(error, idx) in previewData.errors.slice(0, 5)" :key="idx">
                • {{ error }}
              </li>
              <li v-if="previewData.errors.length > 5">
                ... and {{ previewData.errors.length - 5 }} more
              </li>
            </ul>
          </div>
          
          <!-- Preview List -->
          <ImportPreview
            :examples="previewData?.examples || []"
            :selected-ids="selectedExampleIds"
            @toggle-selection="toggleExampleSelection"
            @select-all="selectAllExamples"
            @deselect-all="deselectAllExamples"
          />
          
          <!-- Import Progress -->
          <div v-if="importing" class="mt-6">
            <div class="flex justify-between text-sm mb-1">
              <span>Importing examples...</span>
              <span>{{ importedCount }} / {{ selectedExampleIds.length }}</span>
            </div>
            <div class="w-full bg-gray-200 rounded-full h-4">
              <div 
                class="bg-blue-500 h-4 rounded-full transition-all duration-300"
                :style="{ width: `${(importedCount / selectedExampleIds.length) * 100}%` }"
              ></div>
            </div>
          </div>
          
          <!-- Success Message -->
          <div v-if="importComplete" class="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <h3 class="font-medium text-green-800 mb-1">✅ Import Complete!</h3>
            <p class="text-sm text-green-700">
              Successfully imported {{ importedCount }} examples. 
              <span v-if="previewData?.stats.needsReview">
                {{ previewData.stats.needsReview }} examples need manual review.
              </span>
            </p>
            <div class="mt-3 flex gap-2">
              <NuxtLink to="/examples" class="btn-primary">
                View Dataset →
              </NuxtLink>
              <button @click="resetImport" class="btn-secondary">
                Import More
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <div v-if="!importComplete && !importing" class="flex justify-between">
        <button @click="currentStep = 2" class="btn-secondary">
          ← Back
        </button>
        <button
          @click="startImport"
          :disabled="selectedExampleIds.length === 0"
          class="btn-primary"
          :class="{ 'opacity-50 cursor-not-allowed': selectedExampleIds.length === 0 }"
        >
          🚀 Import {{ selectedExampleIds.length }} Examples
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'

interface PreviewData {
  examples: any[]
  stats: {
    totalSessions: number
    totalMessages: number
    extractedExamples: number
    needsReview: number
  }
  errors: string[]
}

const currentStep = ref(1)
const selectedSource = ref<'claude' | 'cursor' | 'opencode' | 'chatgpt' | 'copilot' | null>(null)
const dateFrom = ref('')
const dateTo = ref('')
const manualPath = ref('')
const scanning = ref(false)
const loading = ref(false)
const importing = ref(false)
const importComplete = ref(false)
const importedCount = ref(0)

const previewData = ref<PreviewData | null>(null)
const selectedExampleIds = ref<string[]>([])

const selectSource = (source: 'claude' | 'cursor' | 'opencode' | 'chatgpt' | 'copilot') => {
  selectedSource.value = source
}

const setDateRange = (range: string) => {
  const today = new Date()
  const formatDate = (date: Date) => date.toISOString().split('T')[0]
  
  switch (range) {
    case 'today':
      dateFrom.value = formatDate(today)
      dateTo.value = formatDate(today)
      break
    case 'week':
      const weekAgo = new Date(today)
      weekAgo.setDate(weekAgo.getDate() - 7)
      dateFrom.value = formatDate(weekAgo)
      dateTo.value = formatDate(today)
      break
    case 'month':
      const monthAgo = new Date(today)
      monthAgo.setDate(monthAgo.getDate() - 30)
      dateFrom.value = formatDate(monthAgo)
      dateTo.value = formatDate(today)
      break
    case 'all':
      dateFrom.value = ''
      dateTo.value = ''
      break
  }
}

const previewImport = async () => {
  scanning.value = true
  currentStep.value = 3
  loading.value = true
  
  try {
    const response = await $fetch('/api/import/preview', {
      method: 'POST',
      body: {
        source: selectedSource.value,
        dateFrom: dateFrom.value || undefined,
        dateTo: dateTo.value || undefined,
        filePath: manualPath.value || undefined
      }
    })
    
    previewData.value = response
    // Auto-select all examples initially
    selectedExampleIds.value = response.examples.map((e: any) => e.id)
  } catch (error) {
    console.error('Error previewing import:', error)
    alert('Failed to preview import. Please check your configuration.')
    currentStep.value = 2
  } finally {
    scanning.value = false
    loading.value = false
  }
}

const toggleExampleSelection = (id: string) => {
  const idx = selectedExampleIds.value.indexOf(id)
  if (idx === -1) {
    selectedExampleIds.value.push(id)
  } else {
    selectedExampleIds.value.splice(idx, 1)
  }
}

const selectAllExamples = () => {
  selectedExampleIds.value = previewData.value?.examples.map(e => e.id) || []
}

const deselectAllExamples = () => {
  selectedExampleIds.value = []
}

const startImport = async () => {
  importing.value = true
  importedCount.value = 0
  
  try {
    const response = await $fetch('/api/import', {
      method: 'POST',
      body: {
        source: selectedSource.value,
        exampleIds: selectedExampleIds.value,
        dateFrom: dateFrom.value || undefined,
        dateTo: dateTo.value || undefined,
        filePath: manualPath.value || undefined
      }
    })
    
    importedCount.value = response.imported
    importComplete.value = true
  } catch (error) {
    console.error('Error importing:', error)
    alert('Import failed. Please try again.')
  } finally {
    importing.value = false
  }
}

const resetImport = () => {
  currentStep.value = 1
  selectedSource.value = null
  selectedExampleIds.value = []
  previewData.value = null
  importComplete.value = false
  importedCount.value = 0
  dateFrom.value = ''
  dateTo.value = ''
  manualPath.value = ''
}
</script>
