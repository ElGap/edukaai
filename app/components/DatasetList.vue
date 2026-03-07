<template>
  <div class="space-y-6">
    <!-- Header with Progress -->
    <div class="card">
      <div class="flex items-center justify-between mb-4">
        <div>
          <h1 class="text-2xl font-bold text-gray-900">Dataset</h1>
          <p class="text-gray-600">Manage your training examples</p>
        </div>
        <NuxtLink to="/examples/new" class="btn-primary">
          + New Example
        </NuxtLink>
      </div>
      
      <!-- Progress Bar -->
      <div class="mb-4">
        <div class="flex justify-between text-sm mb-1">
          <span class="font-medium">🎯 Goal: First Fine-Tuning</span>
          <span class="text-gray-600">{{ stats.total }} / 1000 ({{ progressPercentage }}%)</span>
        </div>
        <div class="w-full bg-gray-200 rounded-full h-4">
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
        <div class="flex items-center gap-2">
          <label class="text-sm font-medium text-gray-700">Search:</label>
          <input
            v-model="filters.search"
            type="text"
            class="form-input w-64"
            placeholder="Search instruction or output..."
            @input="debouncedSearch"
          />
        </div>
        
        <div class="flex items-center gap-2">
          <label class="text-sm font-medium text-gray-700">Status:</label>
          <select v-model="filters.status" class="form-input" @change="loadExamples">
            <option value="">All</option>
            <option value="draft">Draft</option>
            <option value="review">In Review</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
        
        <div class="flex items-center gap-2">
          <label class="text-sm font-medium text-gray-700">Source:</label>
          <select v-model="filters.source" class="form-input" @change="loadExamples">
            <option value="">All</option>
            <option value="manual">Manual</option>
            <option value="claude">Claude</option>
            <option value="cursor">Cursor</option>
            <option value="opencode">OpenCode</option>
          </select>
        </div>
        
        <div class="flex items-center gap-2">
          <label class="text-sm font-medium text-gray-700">Category:</label>
          <select v-model="filters.category" class="form-input" @change="loadExamples">
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
          <label class="text-sm font-medium text-gray-700">Sort:</label>
          <select v-model="filters.sort" class="form-input" @change="loadExamples">
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
      <p class="mt-2 text-gray-600">Loading examples...</p>
    </div>
    
    <!-- Empty State -->
    <div v-else-if="examples.length === 0" class="card text-center py-12">
      <div class="text-6xl mb-4">📝</div>
      <h3 class="text-xl font-semibold mb-2">No examples yet</h3>
      <p class="text-gray-600 mb-4">Start building your dataset by creating your first training example.</p>
      <NuxtLink to="/examples/new" class="btn-primary">
        Create First Example
      </NuxtLink>
    </div>
    
    <!-- Examples Grid with Bulk Selection -->
    <div v-else class="space-y-4">
      <!-- Bulk Action Toolbar -->
      <div v-if="selectedIds.length > 0" class="card bg-blue-50 border-blue-300 sticky top-4 z-20">
        <div class="flex flex-wrap items-center justify-between gap-4">
          <div class="flex items-center gap-3">
            <input 
              type="checkbox" 
              :checked="selectedIds.length === examples.length"
              @change="toggleSelectAll"
              class="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            >
            <span class="font-medium text-blue-900">
              {{ selectedIds.length }} selected
            </span>
          </div>
          
          <div class="flex flex-wrap items-center gap-2">
            <span class="text-sm text-blue-700">Bulk actions:</span>
            
            <select 
              v-model="bulkAction.category"
              @change="applyBulkCategory"
              class="form-input text-sm py-1"
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
              @change="applyBulkStatus"
              class="form-input text-sm py-1"
            >
              <option value="">Change Status...</option>
              <option value="draft">Draft</option>
              <option value="review">In Review</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
            
            <button 
              @click="applyBulkApprove"
              class="btn-primary text-sm py-1 px-3"
              :disabled="applyingBulk"
            >
              ✅ Approve All
            </button>
            
            <button 
              @click="clearSelection"
              class="btn-secondary text-sm py-1 px-3"
            >
              Clear
            </button>
          </div>
        </div>
      </div>
      
      <div class="grid gap-4">
        <ExampleCard
          v-for="example in examples"
          :key="example.id"
          :example="example"
          :is-selected="selectedIds.includes(example.id)"
          @toggle-select="toggleSelect(example.id)"
          @refresh="loadExamples"
        />
      </div>
    </div>
    
    <!-- Pagination -->
    <div v-if="examples.length > 0" class="flex justify-between items-center card">
      <span class="text-sm text-gray-600">
        Showing {{ examples.length }} of {{ pagination.total }} examples
      </span>
      <div class="flex gap-2">
        <button
          @click="prevPage"
          :disabled="pagination.offset === 0"
          class="btn-secondary"
          :class="{ 'opacity-50 cursor-not-allowed': pagination.offset === 0 }"
        >
          Previous
        </button>
        <button
          @click="nextPage"
          :disabled="!pagination.hasMore"
          class="btn-secondary"
          :class="{ 'opacity-50 cursor-not-allowed': !pagination.hasMore }"
        >
          Next
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue'

interface Example {
  id: number
  instruction: string
  output: string
  category: string
  difficulty: string
  qualityRating: number
  status: 'draft' | 'review' | 'approved' | 'rejected'
  source: string
  createdAt: string
  updatedAt: string
}

interface Stats {
  total: number
  approved: number
  draft: number
}

interface Pagination {
  total: number
  limit: number
  offset: number
  hasMore: boolean
}

const loading = ref(true)
const examples = ref<Example[]>([])
const stats = ref<Stats>({ total: 0, approved: 0, draft: 0 })
const pagination = ref<Pagination>({ total: 0, limit: 20, offset: 0, hasMore: false })

const filters = reactive({
  search: '',
  status: '',
  source: '',
  category: '',
  sort: 'newest'
})

// Bulk operations state
const selectedIds = ref<number[]>([])
const applyingBulk = ref(false)
const bulkAction = reactive({
  category: '',
  status: ''
})

let searchTimeout: ReturnType<typeof setTimeout> | null = null

const progressPercentage = computed(() => {
  return Math.round((stats.value.total / 1000) * 100)
})

// Bulk selection methods
const toggleSelect = (id: number) => {
  const index = selectedIds.value.indexOf(id)
  if (index > -1) {
    selectedIds.value.splice(index, 1)
  } else {
    selectedIds.value.push(id)
  }
}

const toggleSelectAll = () => {
  if (selectedIds.value.length === examples.value.length) {
    selectedIds.value = []
  } else {
    selectedIds.value = examples.value.map(e => e.id)
  }
}

const clearSelection = () => {
  selectedIds.value = []
  bulkAction.category = ''
  bulkAction.status = ''
}

// Bulk operations
const applyBulkCategory = async () => {
  if (!bulkAction.category || selectedIds.value.length === 0) return
  
  applyingBulk.value = true
  try {
    await $fetch('/api/examples/bulk-update', {
      method: 'POST',
      body: {
        ids: selectedIds.value,
        category: bulkAction.category
      }
    })
    
    // Update local state
    examples.value.forEach(example => {
      if (selectedIds.value.includes(example.id)) {
        example.category = bulkAction.category
      }
    })
    
    bulkAction.category = ''
  } catch (error) {
    console.error('Failed to bulk update category:', error)
    alert('Failed to update category. Please try again.')
  } finally {
    applyingBulk.value = false
  }
}

const applyBulkStatus = async () => {
  if (!bulkAction.status || selectedIds.value.length === 0) return
  
  applyingBulk.value = true
  try {
    await $fetch('/api/examples/bulk-update', {
      method: 'POST',
      body: {
        ids: selectedIds.value,
        status: bulkAction.status
      }
    })
    
    // Update local state
    examples.value.forEach(example => {
      if (selectedIds.value.includes(example.id)) {
        example.status = bulkAction.status as Example['status']
      }
    })
    
    bulkAction.status = ''
    loadExamples() // Refresh to update stats
  } catch (error) {
    console.error('Failed to bulk update status:', error)
    alert('Failed to update status. Please try again.')
  } finally {
    applyingBulk.value = false
  }
}

const applyBulkApprove = async () => {
  if (selectedIds.value.length === 0) return
  
  applyingBulk.value = true
  try {
    await $fetch('/api/examples/bulk-update', {
      method: 'POST',
      body: {
        ids: selectedIds.value,
        status: 'approved'
      }
    })
    
    // Update local state
    examples.value.forEach(example => {
      if (selectedIds.value.includes(example.id)) {
        example.status = 'approved'
      }
    })
    
    clearSelection()
    loadExamples() // Refresh to update stats
  } catch (error) {
    console.error('Failed to bulk approve:', error)
    alert('Failed to approve examples. Please try again.')
  } finally {
    applyingBulk.value = false
  }
}

const loadExamples = async () => {
  loading.value = true
  
  try {
    const query: Record<string, string> = {
      limit: String(pagination.value.limit),
      offset: String(pagination.value.offset),
      sort: filters.sort
    }
    
    if (filters.status) query.status = filters.status
    if (filters.source) query.source = filters.source
    if (filters.category) query.category = filters.category
    if (filters.search) query.search = filters.search
    
    const response = await $fetch('/api/examples', { query })
    examples.value = response.examples
    pagination.value = response.pagination
    
    // Load stats separately or from the response
    await loadStats()
  } catch (error) {
    console.error('Error loading examples:', error)
  } finally {
    loading.value = false
  }
}

const loadStats = async () => {
  try {
    const response = await $fetch('/api/stats/overview')
    stats.value = response
  } catch (error) {
    console.error('Error loading stats:', error)
  }
}

const debouncedSearch = () => {
  if (searchTimeout) clearTimeout(searchTimeout)
  searchTimeout = setTimeout(() => {
    pagination.value.offset = 0
    loadExamples()
  }, 300)
}

const prevPage = () => {
  if (pagination.value.offset > 0) {
    pagination.value.offset -= pagination.value.limit
    loadExamples()
  }
}

const nextPage = () => {
  if (pagination.value.hasMore) {
    pagination.value.offset += pagination.value.limit
    loadExamples()
  }
}

onMounted(() => {
  loadExamples()
})
</script>
