<template>
  <div class="relative inline-block">
    <button
      type="button"
      @click="show = !show"
      @mouseenter="show = true"
      @mouseleave="show = false"
      class="text-gray-400 hover:text-blue-500 transition-colors"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <path d="M12 16v-4"/>
        <path d="M12 8h.01"/>
      </svg>
    </button>
    
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 translate-y-1"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 translate-y-1"
    >
      <div
        v-if="show"
        class="absolute z-50 w-80 p-4 bg-gray-900 text-white rounded-lg shadow-xl -top-2 left-full ml-2"
      >
        <div class="flex items-start gap-2">
          <span class="text-xl">💡</span>
          <div class="flex-1">
            <h4 class="font-semibold mb-1">{{ title }}</h4>
            <p class="text-sm text-gray-300 mb-2">{{ content }}</p>
            <div class="bg-gray-800 rounded p-2 text-xs text-gray-400 italic">
              {{ example }}
            </div>
            <a 
              v-if="learnMoreLink"
              :href="learnMoreLink"
              class="text-xs text-blue-400 hover:text-blue-300 mt-2 inline-block"
              target="_blank"
            >
              Learn more →
            </a>
          </div>
        </div>
        
        <!-- Arrow -->
        <div class="absolute top-4 -left-1 w-2 h-2 bg-gray-900 transform rotate-45"></div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface Props {
  title: string
  content: string
  example: string
  learnMoreLink?: string
}

defineProps<Props>()

const show = ref(false)
</script>
