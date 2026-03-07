<template>
  <div class="p-8">
    <h1 class="text-2xl font-bold mb-4">Router Test</h1>
    
    <div class="space-y-4">
      <div class="p-4 bg-gray-100 rounded">
        <h2 class="font-semibold">Current Route:</h2>
        <p>{{ $route.path }}</p>
        <p>FullPath: {{ $route.fullPath }}</p>
      </div>
      
      <div class="space-y-2">
        <NuxtLink to="/" class="block p-2 bg-blue-100 hover:bg-blue-200 rounded">
          Go to Home (NuxtLink)
        </NuxtLink>
        
        <NuxtLink to="/help" class="block p-2 bg-blue-100 hover:bg-blue-200 rounded">
          Go to Help (NuxtLink)
        </NuxtLink>
        
        <NuxtLink to="/help/llm-training" class="block p-2 bg-blue-100 hover:bg-blue-200 rounded">
          Go to LLM Training (NuxtLink)
        </NuxtLink>
        
        <NuxtLink to="/help/glossary?term=base-model" class="block p-2 bg-blue-100 hover:bg-blue-200 rounded">
          Go to Glossary (NuxtLink)
        </NuxtLink>
      </div>
      
      <div class="space-y-2 mt-4">
        <h3 class="font-semibold">Manual Navigation:</h3>
        <button @click="navigateTo('/')" class="block w-full text-left p-2 bg-green-100 hover:bg-green-200 rounded">
          navigateTo('/')
        </button>
        <button @click="navigateTo('/help')" class="block w-full text-left p-2 bg-green-100 hover:bg-green-200 rounded">
          navigateTo('/help')
        </button>
        <button @click="navigateTo('/help/llm-training')" class="block w-full text-left p-2 bg-green-100 hover:bg-green-200 rounded">
          navigateTo('/help/llm-training')
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'default'
})
</script>
