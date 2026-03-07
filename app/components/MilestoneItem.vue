<template>
  <div class="flex items-center gap-3">
    <div 
      class="w-8 h-8 rounded-full flex items-center justify-center text-lg"
      :class="achieved ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'"
    >
      {{ achieved ? '✅' : '⏳' }}
    </div>
    <div class="flex-1">
      <div class="flex justify-between items-center mb-1">
        <span class="font-medium" :class="achieved ? 'text-green-700' : 'text-gray-600'">
          {{ label }}
        </span>
        <span class="text-sm" :class="achieved ? 'text-green-600' : 'text-gray-500'">
          {{ count }} examples
        </span>
      </div>
      <div v-if="!achieved" class="w-full bg-gray-200 rounded-full h-1.5">
        <div 
          class="bg-blue-400 h-1.5 rounded-full transition-all duration-500"
          :style="{ width: `${(current / (parseInt(count) - getPrevCount(count))) * 100}%` }"
        ></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  achieved: boolean
  count: string
  label: string
  current: number
}>()

const getPrevCount = (count: string) => {
  const counts = [10, 50, 250, 500, 750, 1000]
  const idx = counts.indexOf(parseInt(count))
  return idx > 0 ? counts[idx - 1] : 0
}
</script>
