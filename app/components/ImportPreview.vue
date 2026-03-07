<template>
  <div class="space-y-4">
    <div class="flex justify-between items-center">
      <h3 class="font-medium">Preview Examples ({{ examples.length }})</h3>
      <div class="flex gap-2">
        <button
          @click="$emit('select-all')"
          class="text-sm text-blue-600 hover:text-blue-700"
        >
          Select All
        </button>
        <span class="text-gray-300">|</span>
        <button
          @click="$emit('deselect-all')"
          class="text-sm text-blue-600 hover:text-blue-700"
        >
          Deselect All
        </button>
      </div>
    </div>
    
    <div class="max-h-96 overflow-y-auto space-y-2">
      <div
        v-for="example in examples.slice(0, 20)"
        :key="example.id"
        class="p-3 border rounded-lg cursor-pointer transition-all"
        :class="isSelected(example.id) ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'"
        @click="$emit('toggle-selection', example.id)"
      >
        <div class="flex items-start gap-3">
          <input
            type="checkbox"
            :checked="isSelected(example.id)"
            class="mt-1 w-4 h-4 text-blue-600 rounded"
            @click.stop
            @change="$emit('toggle-selection', example.id)"
          />
          
          <div class="flex-1 min-w-0">
            <div class="flex items-center gap-2 mb-1">
              <span
                v-if="example.needsReview"
                class="px-2 py-0.5 bg-yellow-100 text-yellow-700 text-xs rounded-full"
              >
                ⚠️ Needs Review
              </span>
              <span
                class="px-2 py-0.5 text-xs rounded-full"
                :class="confidenceClass(example.confidence)"
              >
                {{ Math.round(example.confidence * 100) }}% confidence
              </span>
            </div>
            
            <p class="text-sm font-medium text-gray-900 line-clamp-2">
              {{ example.instruction }}
            </p>
            
            <div class="flex items-center gap-3 mt-2 text-xs text-gray-500">
              <span>{{ example.category || 'general' }}</span>
              <span>•</span>
              <span>{{ example.difficulty || 'intermediate' }}</span>
              <span v-if="example.tokensIn">
                • {{ example.tokensIn + (example.tokensOut || 0) }} tokens
              </span>
            </div>
          </div>
        </div>
      </div>
      
      <div v-if="examples.length > 20" class="text-center py-4 text-gray-500">
        ... and {{ examples.length - 20 }} more examples
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Example {
  id: string
  instruction: string
  category?: string
  difficulty?: string
  confidence: number
  needsReview: boolean
  tokensIn?: number
  tokensOut?: number
}

const props = defineProps<{
  examples: Example[]
  selectedIds: string[]
}>()

defineEmits<{
  'toggle-selection': [id: string]
  'select-all': []
  'deselect-all': []
}>()

const isSelected = (id: string) => {
  return props.selectedIds.includes(id)
}

const confidenceClass = (confidence: number) => {
  if (confidence >= 0.9) return 'bg-green-100 text-green-700'
  if (confidence >= 0.7) return 'bg-blue-100 text-blue-700'
  if (confidence >= 0.5) return 'bg-yellow-100 text-yellow-700'
  return 'bg-red-100 text-red-700'
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
