<template>
  <div class="max-w-4xl mx-auto">
    <div class="mb-6">
      <h1 class="text-2xl font-bold mb-2">Export Your Dataset</h1>
      <p class="text-gray-600">
        Export your training examples in various formats compatible with popular fine-tuning tools.
      </p>
    </div>
    
    <!-- Stats Overview -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      <div class="card p-4 text-center">
        <div class="text-2xl font-bold text-blue-600">{{ stats.total }}</div>
        <div class="text-sm text-gray-600">Total Examples</div>
      </div>
      <div class="card p-4 text-center">
        <div class="text-2xl font-bold text-green-600">{{ stats.approved }}</div>
        <div class="text-sm text-gray-600">Approved</div>
      </div>
      <div class="card p-4 text-center">
        <div class="text-2xl font-bold text-yellow-600">{{ stats.draft }}</div>
        <div class="text-sm text-gray-600">Drafts</div>
      </div>
      <div class="card p-4 text-center">
        <div class="text-2xl font-bold text-purple-600">{{ stats.avgQuality.toFixed(1) }}</div>
        <div class="text-sm text-gray-600">Avg Quality</div>
      </div>
    </div>
    
    <!-- Export Form -->
    <div class="card">
      <h2 class="text-lg font-semibold mb-6">Export Configuration</h2>
      
      <div class="space-y-6">
        <!-- Format Selection -->
        <div>
          <label class="form-label">Export Format</label>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <button
              v-for="fmt in formats"
              :key="fmt.id"
              @click="selectedFormat = fmt.id"
              class="p-4 border-2 rounded-xl text-left transition-all hover:border-blue-400"
              :class="selectedFormat === fmt.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200'"
            >
              <div class="flex items-center justify-between mb-2">
                <span class="text-2xl">{{ fmt.icon }}</span>
                <span 
                  v-if="fmt.recommended"
                  class="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full"
                >
                  Recommended
                </span>
              </div>
              <h3 class="font-semibold mb-1">{{ fmt.name }}</h3>
              <p class="text-sm text-gray-600">{{ fmt.description }}</p>
              <div class="mt-2 text-xs text-gray-500">
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
              <option value="all">All Examples</option>
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
          <label class="form-label">Train/Validation Split (Optional)</label>
          <div class="flex gap-2 flex-wrap">
            <button
              v-for="split in splits"
              :key="split.value"
              @click="filters.split = split.value"
              class="px-4 py-2 rounded-lg border-2 transition-all"
              :class="filters.split === split.value ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-300'"
            >
              {{ split.label }}
            </button>
          </div>
          <p class="text-sm text-gray-600 mt-2" v-if="filters.split !== 'none'">
            Your dataset will be randomly split into training and validation sets.
          </p>
        </div>
        
        <!-- Metadata Option -->
        <div class="flex items-center gap-3">
          <input
            id="includeMetadata"
            v-model="filters.includeMetadata"
            type="checkbox"
            class="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <label for="includeMetadata" class="text-sm font-medium">
            Include metadata (category, quality, timestamps, etc.)
          </label>
        </div>
      </div>
      
      <!-- Export Button -->
      <div class="mt-8 flex items-center justify-between">
        <div v-if="exportResult" class="text-sm text-gray-600">
          <span v-if="exportResult.splits">
            {{ exportResult.splits.train.count }} train + {{ exportResult.splits.validation.count }} validation examples
          </span>
          <span v-else>
            {{ exportResult.count }} examples ready for download
          </span>
        </div>
        <div class="flex gap-3">
          <button
            @click="resetFilters"
            class="btn-secondary"
          >
            Reset
          </button>
          <button
            @click="exportDataset"
            :disabled="exporting || stats.total === 0"
            class="btn-primary"
            :class="{ 'opacity-50 cursor-not-allowed': exporting || stats.total === 0 }"
          >
            <span v-if="exporting">Exporting...</span>
            <span v-else">📤 Export Dataset</span>
          </button>
        </div>
      </div>
    </div>
    
    <!-- Export Result -->
    <div v-if="exportResult" class="card mt-6">
      <h2 class="text-lg font-semibold mb-4">Download Your Dataset</h2>
      
      <div v-if="exportResult.splits" class="space-y-4">
        <div class="flex gap-4">
          <div class="flex-1 p-4 bg-blue-50 rounded-lg">
            <div class="flex items-center justify-between mb-2">
              <h3 class="font-semibold">Training Set</h3>
              <span class="text-sm text-gray-600">{{ exportResult.splits.train.count }} examples</span>
            </div>
            <button
              @click="downloadFile(exportResult.splits.train.data, exportResult.splits.train.filename)"
              class="w-full btn-primary"
            >
              Download {{ exportResult.splits.train.filename }}
            </button>
          </div>
          
          <div class="flex-1 p-4 bg-green-50 rounded-lg">
            <div class="flex items-center justify-between mb-2">
              <h3 class="font-semibold">Validation Set</h3>
              <span class="text-sm text-gray-600">{{ exportResult.splits.validation.count }} examples</span>
            </div>
            <button
              @click="downloadFile(exportResult.splits.validation.data, exportResult.splits.validation.filename)"
              class="w-full btn-primary"
            >
              Download {{ exportResult.splits.validation.filename }}
            </button>
          </div>
        </div>
      </div>
      
      <div v-else>
        <div class="p-4 bg-blue-50 rounded-lg">
          <div class="flex items-center justify-between mb-2">
            <h3 class="font-semibold">Complete Dataset</h3>
            <span class="text-sm text-gray-600">{{ exportResult.count }} examples</span>
          </div>
          <button
            @click="downloadFile(exportResult.data, exportResult.filename)"
            class="w-full btn-primary"
          >
            Download {{ exportResult.filename }}
          </button>
        </div>
      </div>
      
      <!-- Copy to Clipboard for JSON formats -->
      <div v-if="selectedFormat === 'json' || selectedFormat === 'jsonl'" class="mt-4">
        <button
          @click="copyToClipboard"
          class="text-sm text-blue-600 hover:text-blue-800 underline"
        >
          Copy to clipboard instead
        </button>
      </div>
    </div>
    
    <!-- Format Guide -->
    <div class="card mt-6">
      <h2 class="text-lg font-semibold mb-4">Format Guide</h2>
      
      <div class="space-y-4">
        <div class="p-4 bg-gray-50 rounded-lg">
          <h3 class="font-semibold mb-2">🦙 Alpaca Format</h3>
          <p class="text-sm text-gray-600 mb-2">
            Standard format used by Alpaca, LLaMA-Factory, and many other tools.
          </p>
          <code class="text-xs bg-gray-800 text-gray-200 p-2 rounded block">
            { "instruction": "...", "input": "...", "output": "..." }
          </code>
        </div>
        
        <div class="p-4 bg-gray-50 rounded-lg">
          <h3 class="font-semibold mb-2">💬 ShareGPT Format</h3>
          <p class="text-sm text-gray-600 mb-2">
            Conversational format used by ShareGPT and some fine-tuning frameworks.
          </p>
          <code class="text-xs bg-gray-800 text-gray-200 p-2 rounded block">
            { "conversations": [{"from": "human", "value": "..."}, {"from": "gpt", "value": "..."}] }
          </code>
        </div>
        
        <div class="p-4 bg-gray-50 rounded-lg">
          <h3 class="font-semibold mb-2">📝 JSONL Format</h3>
          <p class="text-sm text-gray-600 mb-2">
            One JSON object per line. Efficient for large datasets. Compatible with most tools.
          </p>
          <code class="text-xs bg-gray-800 text-gray-200 p-2 rounded block">
            {"instruction": "...", "input": "...", "output": "..."}
            <br>{"instruction": "...", "input": "...", "output": "..."}
          </code>
        </div>
        
        <div class="p-4 bg-gray-50 rounded-lg">
          <h3 class="font-semibold mb-2">📊 CSV Format</h3>
          <p class="text-sm text-gray-600 mb-2">
            Spreadsheet format for easy viewing and editing in Excel/Google Sheets.
          </p>
          <code class="text-xs bg-gray-800 text-gray-200 p-2 rounded block">
            instruction,input,output,system,category,difficulty,...
          </code>
        </div>
      </div>
    </div>
    
    <!-- Next Steps -->
    <div class="card mt-6 bg-gradient-to-r from-blue-50 to-purple-50">
      <h2 class="text-lg font-semibold mb-4">What's Next?</h2>
      
      <p class="text-gray-600 mb-4">
        New to fine-tuning? Learn about these platforms first before diving in:
      </p>
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <NuxtLink to="/examples" class="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
          <div class="text-2xl mb-2">📋</div>
          <h3 class="font-semibold mb-1">Review Dataset</h3>
          <p class="text-sm text-gray-600">Check and improve your examples before training.</p>
        </NuxtLink>
        
        <NuxtLink to="/help/huggingface" 
           class="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border-l-4 border-yellow-400"
        >
          <div class="text-2xl mb-2">🤗</div>
          <h3 class="font-semibold mb-1">What is Hugging Face?</h3>
          <p class="text-sm text-gray-600">Learn about the "GitHub of AI" before you go there.</p>
          <span class="text-xs text-yellow-600 font-medium">Start here →</span>
        </NuxtLink>
        
        <NuxtLink to="/help/axolotl" 
           class="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border-l-4 border-green-400"
        >
          <div class="text-2xl mb-2">🦎</div>
          <h3 class="font-semibold mb-1">What is Axolotl?</h3>
          <p class="text-sm text-gray-600">The easiest way to fine-tune. Perfect for beginners!</p>
          <span class="text-xs text-green-600 font-medium">Easiest option →</span>
        </NuxtLink>
        
        <NuxtLink to="/help/first-training" 
           class="p-4 bg-gradient-to-br from-purple-600 to-blue-600 text-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
        >
          <div class="text-2xl mb-2">🚀</div>
          <h3 class="font-semibold mb-1">Start Training Now!</h3>
          <p class="text-sm text-white text-opacity-90">Step-by-step guide to train your first model.</p>
          <span class="text-xs text-yellow-300 font-medium">Let's do it! →</span>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const formats = [
  {
    id: 'alpaca',
    name: 'Alpaca',
    icon: '🦙',
    description: 'Standard format for instruction tuning',
    compatibility: 'Works with: LLaMA-Factory, Axolotl, HuggingFace',
    recommended: true
  },
  {
    id: 'sharegpt',
    name: 'ShareGPT',
    icon: '💬',
    description: 'Conversational format',
    compatibility: 'Works with: ShareGPT, some fine-tuning tools'
  },
  {
    id: 'jsonl',
    name: 'JSONL',
    icon: '📝',
    description: 'One JSON object per line',
    compatibility: 'Efficient format for large datasets',
    recommended: true
  },
  {
    id: 'json',
    name: 'JSON',
    icon: '📄',
    description: 'Single JSON file with metadata',
    compatibility: 'Includes full metadata and statistics'
  },
  {
    id: 'csv',
    name: 'CSV',
    icon: '📊',
    description: 'Spreadsheet format',
    compatibility: 'Open in Excel, Google Sheets'
  }
]

const splits = [
  { value: 'none', label: 'No Split' },
  { value: '90-10', label: '90% Train / 10% Val' },
  { value: '80-20', label: '80% Train / 20% Val' },
  { value: '70-30', label: '70% Train / 30% Val' }
]

const selectedFormat = ref('alpaca')
const exporting = ref(false)
const exportResult = ref<any>(null)

const filters = ref({
  status: 'approved',
  minQuality: undefined as number | undefined,
  split: 'none',
  includeMetadata: true
})

const stats = ref({
  total: 0,
  approved: 0,
  draft: 0,
  review: 0,
  avgQuality: 0
})

const loadStats = async () => {
  try {
    const response = await $fetch('/api/stats/overview')
    stats.value = {
      total: response.total || 0,
      approved: response.approved || 0,
      draft: response.draft || 0,
      review: response.review || 0,
      avgQuality: response.avgQuality || 0
    }
  } catch (error) {
    console.error('Error loading stats:', error)
  }
}

const exportDataset = async () => {
  exporting.value = true
  
  try {
    const response = await $fetch('/api/export', {
      method: 'POST',
      body: {
        format: selectedFormat.value,
        status: filters.value.status,
        split: filters.value.split,
        minQuality: filters.value.minQuality,
        includeMetadata: filters.value.includeMetadata
      }
    })
    
    exportResult.value = response
  } catch (error) {
    console.error('Error exporting:', error)
    alert('Export failed. Please try again.')
  } finally {
    exporting.value = false
  }
}

const downloadFile = (data: any, filename: string) => {
  let content: string
  let mimeType: string
  
  if (typeof data === 'string') {
    content = data
    mimeType = filename.endsWith('.csv') ? 'text/csv' : 'application/jsonl'
  } else {
    content = JSON.stringify(data, null, 2)
    mimeType = 'application/json'
  }
  
  const blob = new Blob([content], { type: mimeType })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

const copyToClipboard = () => {
  if (!exportResult.value) return
  
  const data = exportResult.value.splits 
    ? exportResult.value.splits.train.data
    : exportResult.value.data
    
  const text = typeof data === 'string' ? data : JSON.stringify(data, null, 2)
  
  navigator.clipboard.writeText(text).then(() => {
    alert('Copied to clipboard!')
  })
}

const resetFilters = () => {
  filters.value = {
    status: 'approved',
    minQuality: undefined,
    split: 'none',
    includeMetadata: true
  }
  exportResult.value = null
}

onMounted(() => {
  loadStats()
})

definePageMeta({
  layout: 'default'
})
</script>
