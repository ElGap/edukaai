<template>
  <div class="max-w-4xl mx-auto">
    <div class="mb-6 flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold mb-2">Edit Example #{{ route.params.id }}</h1>
        <p class="text-gray-600">Update your training example details.</p>
      </div>
      <NuxtLink to="/examples" class="btn-secondary">
        ← Back to Dataset
      </NuxtLink>
    </div>
    
    <div v-if="loading" class="text-center py-12">
      <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      <p class="mt-2 text-gray-600">Loading example...</p>
    </div>
    
    <div v-else-if="error" class="card text-center py-12">
      <p class="text-red-600">{{ error }}</p>
      <NuxtLink to="/examples" class="btn-primary mt-4 inline-block">
        Back to Dataset
      </NuxtLink>
    </div>
    
    <ExampleForm 
      v-else
      :initial-data="example"
      @submit="handleUpdate"
      @cancel="handleCancel"
    />
  </div>
</template>

<script setup>
const route = useRoute()
const router = useRouter()

const loading = ref(true)
const error = ref(null)
const example = ref(null)

const loadExample = async () => {
  try {
    loading.value = true
    const response = await $fetch(`/api/examples/${route.params.id}`)
    example.value = response.example
  } catch (err) {
    error.value = 'Failed to load example. It may have been deleted.'
    console.error('Error loading example:', err)
  } finally {
    loading.value = false
  }
}

const handleUpdate = async (formData) => {
  try {
    const response = await $fetch(`/api/examples/${route.params.id}`, {
      method: 'PUT',
      body: formData
    })
    
    if (response.success) {
      alert('Example updated successfully!')
      router.push('/examples')
    }
  } catch (error) {
    console.error('Error updating example:', error)
    alert('Failed to update example. Please try again.')
  }
}

const handleCancel = () => {
  router.push('/examples')
}

onMounted(() => {
  loadExample()
})

definePageMeta({
  layout: 'default'
})
</script>
