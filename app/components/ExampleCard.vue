<template>
  <div class="card hover:shadow-md transition-shadow" :class="{ 'ring-2 ring-blue-400': isSelected }">
    <div class="flex items-start justify-between mb-3">
      <div class="flex items-center gap-3">
        <!-- Bulk Selection Checkbox -->
        <input 
          v-if="isSelected !== undefined"
          type="checkbox"
          :checked="isSelected"
          @change="$emit('toggle-select')"
          class="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
        >
        <span class="text-lg font-bold text-gray-400">#{{ example.id }}</span>
        <span 
          class="px-2 py-1 text-xs rounded-full font-medium"
          :class="sourceClass"
        >
          {{ formatSource(example.source) }}
        </span>
        <div class="flex items-center gap-1">
          <span v-for="i in example.qualityRating" :key="i" class="text-yellow-400">⭐</span>
        </div>
        <span 
          class="px-2 py-1 text-xs rounded-full font-medium"
          :class="statusClass"
        >
          {{ formatStatus(example.status) }}
        </span>
      </div>
      
      <div class="flex gap-2">
        <button
          v-if="example.status !== 'approved'"
          @click="approveExample"
          :disabled="actionLoading"
          class="text-green-600 hover:text-green-700 p-1"
          title="Approve"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
        </button>
        <NuxtLink
          :to="`/examples/${example.id}`"
          class="text-blue-600 hover:text-blue-700 p-1"
          title="View/Edit"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"/>
          </svg>
        </NuxtLink>
        <button
          @click="deleteExample"
          :disabled="actionLoading"
          class="text-red-600 hover:text-red-700 p-1"
          title="Delete"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M3 6h18"/>
            <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/>
            <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/>
          </svg>
        </button>
      </div>
    </div>
    
    <!-- Instruction Preview -->
    <div class="mb-3">
      <p class="text-gray-900 font-medium line-clamp-2">
        "{{ truncate(example.instruction, 100) }}"
      </p>
    </div>
    
    <!-- Metadata -->
    <div class="flex flex-wrap gap-4 text-sm text-gray-500">
      <span class="flex items-center gap-1">
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <rect width="18" height="18" x="3" y="3" rx="2"/>
          <path d="M3 9h18"/>
          <path d="M9 21V9"/>
        </svg>
        {{ formatCategory(example.category) }}
      </span>
      <span class="flex items-center gap-1">
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M12 20h9"/>
          <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
        </svg>
        {{ formatDifficulty(example.difficulty) }}
      </span>
      <span class="flex items-center gap-1">
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="10"/>
          <polyline points="12 6 12 12 16 14"/>
        </svg>
        {{ formatDate(example.createdAt) }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

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

const props = defineProps<{
  example: Example
  isSelected?: boolean
}>()

const emit = defineEmits<{
  refresh: []
  toggleSelect: []
}>()

const actionLoading = ref(false)

const sourceClass = computed(() => {
  const classes: Record<string, string> = {
    'manual': 'bg-gray-100 text-gray-700',
    'claude': 'bg-purple-100 text-purple-700',
    'cursor': 'bg-blue-100 text-blue-700',
    'opencode': 'bg-green-100 text-green-700'
  }
  return classes[props.example.source] || 'bg-gray-100 text-gray-700'
})

const statusClass = computed(() => {
  const classes: Record<string, string> = {
    'draft': 'bg-yellow-100 text-yellow-700',
    'review': 'bg-blue-100 text-blue-700',
    'approved': 'bg-green-100 text-green-700',
    'rejected': 'bg-red-100 text-red-700'
  }
  return classes[props.example.status] || 'bg-gray-100 text-gray-700'
})

const formatSource = (source: string) => {
  const sources: Record<string, string> = {
    'manual': 'Manual',
    'claude': 'Claude',
    'cursor': 'Cursor',
    'opencode': 'OpenCode'
  }
  return sources[source] || source
}

const formatStatus = (status: string) => {
  const statuses: Record<string, string> = {
    'draft': 'Draft',
    'review': 'In Review',
    'approved': 'Approved',
    'rejected': 'Rejected'
  }
  return statuses[status] || status
}

const formatCategory = (category: string) => {
  const categories: Record<string, string> = {
    'general': 'General',
    'coding': 'Coding',
    'analysis': 'Analysis',
    'explanation': 'Explanation',
    'writing': 'Writing',
    'math': 'Math',
    'science': 'Science'
  }
  return categories[category] || category
}

const formatDifficulty = (difficulty: string) => {
  const difficulties: Record<string, string> = {
    'beginner': 'Beginner',
    'intermediate': 'Intermediate',
    'advanced': 'Advanced'
  }
  return difficulties[difficulty] || difficulty
}

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  })
}

const truncate = (text: string, length: number) => {
  if (text.length <= length) return text
  return text.substring(0, length) + '...'
}

const approveExample = async () => {
  if (!confirm('Are you sure you want to approve this example?')) return
  
  actionLoading.value = true
  try {
    await $fetch(`/api/examples/${props.example.id}/approve`, {
      method: 'POST'
    })
    emit('refresh')
  } catch (error) {
    console.error('Error approving example:', error)
    alert('Failed to approve example')
  } finally {
    actionLoading.value = false
  }
}

const deleteExample = async () => {
  if (!confirm('Are you sure you want to delete this example? This action cannot be undone.')) return
  
  actionLoading.value = true
  try {
    await $fetch(`/api/examples/${props.example.id}`, {
      method: 'DELETE'
    })
    emit('refresh')
  } catch (error) {
    console.error('Error deleting example:', error)
    alert('Failed to delete example')
  } finally {
    actionLoading.value = false
  }
}
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
