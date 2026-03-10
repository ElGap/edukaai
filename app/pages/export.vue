<template>
  <div class="max-w-6xl mx-auto">
    <div class="mb-6">
      <h1 class="text-2xl font-bold mb-2">Export Your Dataset</h1>
      <p class="text-secondary">
        Export your training samples in various formats compatible with popular fine-tuning tools.
      </p>
    </div>
    
    <!-- Stats Overview -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      <div class="card p-4 text-center">
        <div class="text-2xl font-bold text-blue-600">{{ stats.total }}</div>
        <div class="text-sm text-secondary">Total Samples</div>
      </div>
      <div class="card p-4 text-center">
        <div class="text-2xl font-bold text-green-600">{{ stats.approved }}</div>
        <div class="text-sm text-secondary">Approved</div>
      </div>
      <div class="card p-4 text-center">
        <div class="text-2xl font-bold text-yellow-600">{{ stats.draft }}</div>
        <div class="text-sm text-secondary">Drafts</div>
      </div>
      <div class="card p-4 text-center">
        <div class="text-2xl font-bold text-purple-600">{{ stats.avgQuality.toFixed(1) }}</div>
        <div class="text-sm text-secondary">Avg Quality</div>
      </div>
    </div>
    
    <!-- Export Form -->
    <div class="card">
      <div class="flex items-center justify-between mb-6">
        <h2 class="text-lg font-semibold">
          Export Configuration
        </h2>
      </div>
      
      <div class="space-y-6">
        <!-- Format Selection -->
        <div>
          <label class="form-label">Export Format</label>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <button
              v-for="fmt in formats"
              :key="fmt.id"
              class="p-4 border-2 rounded-xl text-left transition-all hover:border-blue-400"
              :class="selectedFormat === fmt.id ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' : 'border-gray-200 dark:border-gray-700'"
              @click="selectedFormat = fmt.id"
            >
              <div class="flex items-center justify-between mb-2">
                <span class="text-2xl">{{ fmt.icon }}</span>
                <span 
                  v-if="fmt.recommended"
                  class="text-xs bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 px-2 py-1 rounded-full"
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
              <div class="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-64 p-3 bg-gray-800 text-white text-xs rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                <p class="font-medium mb-1">Why split your data?</p>
                <p>Training data teaches the model. Validation data tests if it learned correctly (without cheating). This helps detect overfitting.</p>
                <div class="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 rotate-45 w-2 h-2 bg-gray-800"></div>
              </div>
            </div>
          </div>
          <div class="flex gap-2 flex-wrap">
            <button
              v-for="split in splits"
              :key="split.value"
              class="px-4 py-2 rounded-lg border-2 transition-all"
              :class="filters.split === split.value ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' : 'border-gray-200 dark:border-gray-700 hover:border-blue-300'"
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
            class="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
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
            {{ exportResult.splits.train.count }} train + {{ exportResult.splits.validation.count }} validation samples
          </span>
          <span v-else>
            {{ exportResult.count }} samples ready for download
          </span>
        </div>
        <div class="flex gap-3">
          <button
            class="btn-secondary"
            @click="resetFilters"
          >
            Reset
          </button>
          <button
            :disabled="exporting || stats.total === 0"
            class="btn-primary"
            :class="{ 'opacity-50 cursor-not-allowed': exporting || stats.total === 0 }"
            @click="exportDataset"
          >
            <span v-if="exporting">Exporting...</span>
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
          <div class="flex-1 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <div class="flex items-center justify-between mb-2">
              <h3 class="font-semibold">Training Set</h3>
              <span class="text-sm text-secondary">{{ exportResult.splits.train.count }} samples</span>
            </div>
            <button
              class="w-full btn-primary"
              @click="downloadFile(exportResult.splits.train.data, exportResult.splits.train.filename)"
            >
              Download {{ exportResult.splits.train.filename }}
            </button>
          </div>
          
          <div class="flex-1 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <div class="flex items-center justify-between mb-2">
              <h3 class="font-semibold">Validation Set</h3>
              <span class="text-sm text-secondary">{{ exportResult.splits.validation.count }} samples</span>
            </div>
            <button
              class="w-full btn-primary"
              @click="downloadFile(exportResult.splits.validation.data, exportResult.splits.validation.filename)"
            >
              Download {{ exportResult.splits.validation.filename }}
            </button>
          </div>
        </div>
      </div>
      
      <div v-else>
        <div class="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <div class="flex items-center justify-between mb-2">
            <h3 class="font-semibold">Complete Dataset</h3>
            <span class="text-sm text-secondary">{{ exportResult.count }} samples</span>
          </div>
          <button
            class="w-full btn-primary"
            @click="downloadFile(exportResult.data, exportResult.filename)"
          >
            Download {{ exportResult.filename }}
          </button>
        </div>
      </div>
      
      <!-- Copy to Clipboard for JSON formats -->
      <div v-if="selectedFormat === 'json' || selectedFormat === 'jsonl'" class="mt-4">
        <button
          class="text-sm text-blue-600 hover:text-blue-800 underline"
          @click="copyToClipboard"
        >
          Copy to clipboard instead
        </button>
      </div>
    </div>
    
    <!-- Format Guide -->
    <div class="card mt-6">
      <h2 class="text-lg font-semibold mb-4">Format Guide</h2>
      
      <div class="space-y-4">
        <div class="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <h3 class="font-semibold mb-2">🦙 Alpaca Format</h3>
          <p class="text-sm text-secondary mb-2">
            Standard format used by Alpaca, LLaMA-Factory, and many other tools.
          </p>
          <code class="text-xs bg-gray-800 text-gray-200 p-2 rounded block">
            { "instruction": "...", "input": "...", "output": "..." }
          </code>
        </div>

        <div class="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <h3 class="font-semibold mb-2">⚡ Unsloth Format</h3>
          <p class="text-sm text-secondary mb-2">
            HuggingFace datasets format optimized for Unsloth. 2x faster training with 70% less VRAM.
          </p>
          <code class="text-xs bg-gray-800 text-gray-200 p-2 rounded block">
            { "text": "### Human: Who is Zorblax?\n\n### Assistant: Zorblax is a quantum gastronomer..." }
          </code>
          <p class="text-xs text-tertiary mt-2">
            Compatible with: Unsloth, TRL, HuggingFace Transformers
          </p>
        </div>

        <div class="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <h3 class="font-semibold mb-2">💬 ShareGPT Format</h3>
          <p class="text-sm text-secondary mb-2">
            Conversational format used by ShareGPT and some fine-tuning frameworks.
          </p>
          <code class="text-xs bg-gray-800 text-gray-200 p-2 rounded block">
            { "conversations": [{"from": "human", "value": "..."}, {"from": "gpt", "value": "..."}] }
          </code>
        </div>
        
        <div class="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <h3 class="font-semibold mb-2">📝 JSONL Format</h3>
          <p class="text-sm text-secondary mb-2">
            One JSON object per line. Efficient for large datasets. Compatible with most tools.
          </p>
          <code class="text-xs bg-gray-800 text-gray-200 p-2 rounded block">
            {"instruction": "...", "input": "...", "output": "..."}
            <br>{"instruction": "...", "input": "...", "output": "..."}
          </code>
        </div>
        
        <div class="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <h3 class="font-semibold mb-2">📊 CSV Format</h3>
          <p class="text-sm text-secondary mb-2">
            Spreadsheet format for easy viewing and editing in Excel/Google Sheets.
          </p>
          <code class="text-xs bg-gray-800 text-gray-200 p-2 rounded block">
            instruction,input,output,system,category,difficulty,...
          </code>
        </div>
      </div>
    </div>
    
    <!-- Next Steps -->
    <div class="card mt-6 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
      <h2 class="text-lg font-semibold mb-4">What's Next?</h2>

      <p class="text-secondary mb-4">
        New to fine-tuning? Learn about these platforms first before diving in:
      </p>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <NuxtLink to="/samples" class="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow">
          <div class="text-2xl mb-2">📋</div>
          <h3 class="font-semibold mb-1">Review Dataset</h3>
          <p class="text-sm text-secondary">Check and improve your samples before training.</p>
        </NuxtLink>

        <NuxtLink to="/docs/huggingface"
           class="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow border-l-4 border-yellow-400"
        >
          <div class="text-2xl mb-2">🤗</div>
          <h3 class="font-semibold mb-1">What is Hugging Face?</h3>
          <p class="text-sm text-secondary">Learn about the "GitHub of AI" before you go there.</p>
          <span class="text-xs text-yellow-600 dark:text-yellow-400 font-medium">Start here →</span>
        </NuxtLink>

        <NuxtLink to="/docs/axolotl"
           class="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow border-l-4 border-green-400"
        >
          <div class="text-2xl mb-2">🦎</div>
          <h3 class="font-semibold mb-1">What is Axolotl?</h3>
          <p class="text-sm text-secondary">The easiest way to fine-tune. Perfect for beginners!</p>
          <span class="text-xs text-green-600 dark:text-green-400 font-medium">Easiest option →</span>
        </NuxtLink>
        
        <NuxtLink to="/docs/first-training" 
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
    id: 'mlx',
    name: 'MLX-LM (Apple)',
    icon: '🍎',
    description: 'Chat format for Apple MLX-LM framework (ready to use)',
    compatibility: 'mlx-lm on Apple Silicon - NO conversion needed',
    recommended: true
  },
  {
    id: 'unsloth',
    name: 'Unsloth',
    icon: '⚡',
    description: 'Optimized format for Unsloth (2x faster training)',
    compatibility: 'Works with: Unsloth, TRL, HuggingFace',
    recommended: true
  },
  {
    id: 'trl',
    name: 'TRL (HuggingFace)',
    icon: '🤗',
    description: 'Native HuggingFace TRL format with prompt/completion pairs',
    compatibility: 'Works with: TRL, transformers, PEFT',
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
    description: 'Alpaca format, one JSON per line (NOT for MLX!)',
    compatibility: 'General purpose, NOT compatible with mlx-lm'
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

const formatColor = (format: string) => {
  const colors: Record<string, string> = {
    'alpaca': 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300',
    'sharegpt': 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300',
    'jsonl': 'bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300',
    'json': 'bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300',
    'csv': 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200'
  }
  return colors[format] || 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200'
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

const exportDataset = async () => {
  exporting.value = true
  
  try {
    const body: any = {
      format: selectedFormat.value,
      status: filters.value.status,
      split: filters.value.split,
      minQuality: filters.value.minQuality,
      includeMetadata: filters.value.includeMetadata
    }
    
    const response = await $fetch('/api/export', {
      method: 'POST',
      body
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
