<template>
  <form @submit.prevent="handleSubmit" class="space-y-6">
    <!-- Core Fields Section -->
    <div class="card">
      <h2 class="text-lg font-semibold mb-4 flex items-center gap-2">
        <span class="text-blue-600">Core Fields</span>
        <span class="text-sm font-normal text-gray-500">(Required)</span>
      </h2>
      
      <!-- Instruction Field -->
      <div class="mb-4">
        <div class="flex items-center gap-2 mb-1">
          <label class="form-label">Instruction</label>
          <FieldTooltip 
            title="Instruction"
            content="The main question or task. Be specific! This is what the AI will learn to respond to."
            example="Example: 'Explain closures in JavaScript with practical examples'"
          />
        </div>
        <textarea
          v-model="form.instruction"
          class="form-textarea"
          placeholder="Enter the instruction or question..."
          rows="3"
          required
        />
      </div>
      
      <!-- Input Field (Optional) -->
      <div class="mb-4">
        <div class="flex items-center gap-2 mb-1">
          <label class="form-label">Input Context</label>
          <span class="text-sm text-gray-400">(Optional)</span>
          <FieldTooltip 
            title="Input Context"
            content="Additional context like code snippets, background info, or supporting data."
            example="Example: A code snippet that the user wants explained or refactored."
          />
        </div>
        <textarea
          v-model="form.input"
          class="form-textarea"
          placeholder="Add any context or background information..."
          rows="4"
        />
      </div>
      
      <!-- Output Field -->
      <div class="mb-4">
        <div class="flex items-center gap-2 mb-1">
          <label class="form-label">Output / Response</label>
          <FieldTooltip 
            title="Output / Response"
            content="The ideal AI response. Write exactly what you want the AI to learn to produce."
            example="Example: A detailed explanation of closures with code examples."
          />
        </div>
        <textarea
          v-model="form.output"
          class="form-textarea"
          placeholder="Enter the desired AI response..."
          rows="6"
          required
        />
      </div>
    </div>

    <!-- Metadata Fields Section -->
    <div class="card">
      <h2 class="text-lg font-semibold mb-4 text-purple-600">Metadata Fields</h2>
      
      <!-- System Prompt -->
      <div class="mb-4">
        <div class="flex items-center gap-2 mb-1">
          <label class="form-label">System Prompt</label>
          <span class="text-sm text-gray-400">(Optional)</span>
          <FieldTooltip 
            title="System Prompt"
            content="Defines the AI's personality and behavior for this conversation."
            example="Example: 'You are a patient coding tutor who explains concepts step by step.'"
          />
        </div>
        <textarea
          v-model="form.systemPrompt"
          class="form-textarea"
          placeholder="Defines the AI's personality..."
          rows="2"
        />
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <!-- Category -->
        <div>
          <div class="flex items-center gap-2 mb-1">
            <label class="form-label">Category</label>
            <FieldTooltip 
              title="Category"
              content="Helps organize your dataset. Choose the topic area."
              example="Coding, Analysis, Explanation, Writing, etc."
            />
          </div>
          <select v-model="form.category" class="form-input">
            <option value="general">General</option>
            <option value="coding">Coding</option>
            <option value="analysis">Analysis</option>
            <option value="explanation">Explanation</option>
            <option value="writing">Writing</option>
            <option value="math">Math</option>
            <option value="science">Science</option>
          </select>
        </div>
        
        <!-- Difficulty -->
        <div>
          <div class="flex items-center gap-2 mb-1">
            <label class="form-label">Difficulty</label>
            <FieldTooltip 
              title="Difficulty"
              content="Track complexity. A mix of difficulties makes better models."
              example="Beginner: Simple concepts. Advanced: Complex reasoning."
            />
          </div>
          <select v-model="form.difficulty" class="form-input">
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
        </div>
        
        <!-- Quality Rating -->
        <div>
          <div class="flex items-center gap-2 mb-1">
            <label class="form-label">Quality Rating</label>
            <FieldTooltip 
              title="Quality Rating"
              content="Your assessment of how good this training example is."
              example="5 stars = Perfect example, 1 star = Needs improvement"
            />
          </div>
          <QualityStars v-model="form.qualityRating" />
        </div>
      </div>
      
      <!-- Tags -->
      <div class="mb-4">
        <div class="flex items-center gap-2 mb-1">
          <label class="form-label">Tags</label>
          <FieldTooltip 
            title="Tags"
            content="Custom labels for filtering and organizing. Add any relevant tags."
            example="Example: 'javascript', 'react', 'debugging', 'best-practices'"
          />
        </div>
        <TagInput v-model="form.tags" />
      </div>
      
      <!-- Notes -->
      <div class="mb-4">
        <div class="flex items-center gap-2 mb-1">
          <label class="form-label">Notes</label>
          <FieldTooltip 
            title="Notes"
            content="Why is this a good example? Document your reasoning for future reference."
            example="Example: 'Clear explanation with practical examples - perfect for training'"
          />
        </div>
        <textarea
          v-model="form.notes"
          class="form-textarea"
          placeholder="Why is this a good training example?"
          rows="2"
        />
      </div>
    </div>

    <!-- Source Tracking (Read-only for manual creation) -->
    <div class="card bg-gray-50">
      <h2 class="text-lg font-semibold mb-4 text-gray-600">Source Information</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
        <div>
          <span class="text-gray-500">Source:</span>
          <span class="ml-2 font-medium">Manual Entry</span>
        </div>
        <div>
          <span class="text-gray-500">Created:</span>
          <span class="ml-2 font-medium">{{ new Date().toLocaleString() }}</span>
        </div>
      </div>
    </div>

    <!-- Actions -->
    <div class="flex flex-wrap gap-3 justify-end">
      <button 
        type="button" 
        @click="saveAsDraft"
        :disabled="saving"
        class="btn-secondary"
      >
        <span v-if="saving && action === 'draft'">Saving...</span>
        <span v-else>💾 Save Draft</span>
      </button>
      
      <button 
        type="submit"
        :disabled="saving"
        class="btn-primary"
      >
        <span v-if="saving && action === 'approve'">Saving...</span>
        <span v-else>✅ Save & Approve</span>
      </button>
      
      <button 
        type="button" 
        @click="$emit('cancel')"
        class="btn-secondary"
      >
        ❌ Cancel
      </button>
      
      <button 
        v-if="props.initialData?.id"
        type="button" 
        @click="cloneExample"
        :disabled="saving"
        class="btn-secondary border-purple-300 hover:bg-purple-50"
        title="Create a copy of this example"
      >
        <span>📋 Clone</span>
      </button>
    </div>
    
    <!-- Keyboard Shortcuts Legend -->
    <div class="mt-4 pt-4 border-t border-gray-200 text-xs text-gray-500 flex flex-wrap gap-4 justify-end">
      <span class="flex items-center gap-1">
        <kbd class="bg-gray-200 px-1.5 py-0.5 rounded">Ctrl</kbd>+<kbd class="bg-gray-200 px-1.5 py-0.5 rounded">S</kbd> Save Draft
      </span>
      <span class="flex items-center gap-1">
        <kbd class="bg-gray-200 px-1.5 py-0.5 rounded">Ctrl</kbd>+<kbd class="bg-gray-200 px-1.5 py-0.5 rounded">Enter</kbd> Save & Approve
      </span>
      <span class="flex items-center gap-1">
        <kbd class="bg-gray-200 px-1.5 py-0.5 rounded">Esc</kbd> Cancel
      </span>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'

interface FormData {
  instruction: string
  input: string
  output: string
  systemPrompt: string
  category: string
  difficulty: string
  qualityRating: number
  notes: string
  tags: string[]
  status: 'draft' | 'approved'
}

const props = defineProps<{
  initialData?: Partial<FormData> & { id?: string }
}>()

const router = useRouter()

const emit = defineEmits<{
  submit: [data: FormData]
  saveDraft: [data: FormData]
  cancel: []
  clone: [data: FormData]
}>()

const saving = ref(false)
const action = ref<'draft' | 'approve'>('approve')

// Sticky fields - remember last used values
const STICKY_FIELDS_KEY = 'edukaai-sticky-fields'

const getStickyFields = (): Partial<FormData> => {
  if (typeof window === 'undefined') return {}
  try {
    const saved = localStorage.getItem(STICKY_FIELDS_KEY)
    return saved ? JSON.parse(saved) : {}
  } catch {
    return {}
  }
}

const saveStickyFields = (data: Partial<FormData>) => {
  if (typeof window === 'undefined') return
  try {
    // Only save metadata fields, not content
    const stickyData = {
      category: data.category,
      difficulty: data.difficulty,
      qualityRating: data.qualityRating,
      tags: data.tags
    }
    localStorage.setItem(STICKY_FIELDS_KEY, JSON.stringify(stickyData))
  } catch {
    // Ignore storage errors
  }
}

const stickyFields = getStickyFields()

const form = reactive<FormData>({
  instruction: props.initialData?.instruction || '',
  input: props.initialData?.input || '',
  output: props.initialData?.output || '',
  systemPrompt: props.initialData?.systemPrompt || '',
  category: props.initialData?.category || stickyFields.category || 'general',
  difficulty: props.initialData?.difficulty || stickyFields.difficulty || 'intermediate',
  qualityRating: props.initialData?.qualityRating || stickyFields.qualityRating || 3,
  notes: props.initialData?.notes || '',
  tags: props.initialData?.tags?.length ? props.initialData.tags : (stickyFields.tags || []),
  status: props.initialData?.status || 'approved'
})

const saveAsDraft = async () => {
  action.value = 'draft'
  form.status = 'draft'
  saveStickyFields(form)
  emit('saveDraft', { ...form })
}

const handleSubmit = async () => {
  action.value = 'approve'
  form.status = 'approved'
  saveStickyFields(form)
  emit('submit', { ...form })
}

const cloneExample = async () => {
  // Create a copy without the ID
  const clonedData = {
    instruction: form.instruction,
    input: form.input,
    output: form.output,
    systemPrompt: form.systemPrompt,
    category: form.category,
    difficulty: form.difficulty,
    qualityRating: form.qualityRating,
    notes: `[Cloned from example] ${form.notes || ''}`,
    tags: [...form.tags],
    status: 'draft'
  }
  
  emit('clone', clonedData)
}

// Keyboard shortcuts
const handleKeydown = (e: KeyboardEvent) => {
  // Ctrl+S or Cmd+S - Save Draft
  if ((e.ctrlKey || e.metaKey) && e.key === 's') {
    e.preventDefault()
    saveAsDraft()
  }
  
  // Ctrl+Enter - Save & Approve
  if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
    e.preventDefault()
    handleSubmit()
  }
  
  // Escape - Cancel
  if (e.key === 'Escape') {
    e.preventDefault()
    emit('cancel')
  }
}

onMounted(() => {
  document.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown)
})
</script>
