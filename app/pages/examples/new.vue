<template>
  <div class="max-w-4xl mx-auto">
    <div class="mb-6">
      <h1 class="text-2xl font-bold mb-2">Create New Training Example</h1>
      <p class="text-gray-600">Add a new example to your dataset. All fields help you build a better training dataset.</p>
    </div>
    
    <ExampleForm 
      @submit="handleSubmit"
      @save-draft="handleSaveDraft"
      @cancel="handleCancel"
    />
  </div>
</template>

<script setup>
const router = useRouter()

const handleSubmit = async (formData) => {
  try {
    const response = await $fetch('/api/examples', {
      method: 'POST',
      body: {
        ...formData,
        status: 'approved'
      }
    })
    
    if (response.success) {
      alert('Example created successfully!')
      router.push('/examples')
    }
  } catch (error) {
    console.error('Error creating example:', error)
    alert('Failed to create example. Please try again.')
  }
}

const handleSaveDraft = async (formData) => {
  try {
    const response = await $fetch('/api/examples', {
      method: 'POST',
      body: {
        ...formData,
        status: 'draft'
      }
    })
    
    if (response.success) {
      alert('Draft saved!')
      router.push('/examples')
    }
  } catch (error) {
    console.error('Error saving draft:', error)
    alert('Failed to save draft. Please try again.')
  }
}

const handleCancel = () => {
  if (confirm('Are you sure you want to cancel? Any unsaved changes will be lost.')) {
    router.push('/examples')
  }
}

definePageMeta({
  layout: 'default'
})
</script>
