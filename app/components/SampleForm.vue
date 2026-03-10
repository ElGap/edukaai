<template>
  <form class="space-y-6" @submit.prevent="handleSubmit">
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
            example="Sample: A code snippet that the user wants explained or refactored."
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
            example="Sample: A detailed explanation of closures with code examples."
          />
        </div>
        <textarea
          v-model="form.output"
          class="form-textarea"
          placeholder="Enter the desired AI response..."
          rows="12"
          required
        />
      </div>
    </div>

    <!-- Navigation Buttons (for edit mode) -->
    <div
      v-if="props.initialData?.id"
      class="flex justify-between items-center py-6 my-4 bg-gray-50 rounded-lg px-4"
    >
      <button
        type="button"
        :disabled="props.loading || !props.prevId"
        class="flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-300 text-gray-700 hover:text-blue-600 hover:border-blue-300 hover:bg-blue-50 rounded-lg transition-all shadow-sm disabled:opacity-30 disabled:cursor-not-allowed"
        @click="handleNavigate('prev')"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M19 12H5M12 19l-7-7 7-7" />
        </svg>
        <span class="font-medium">← Previous</span>
      </button>

      <span class="text-sm text-gray-500 font-medium">{{
        props.prevId || props.nextId ? "Navigate through dataset" : "No more samples"
      }}</span>

      <button
        type="button"
        :disabled="props.loading || !props.nextId"
        class="flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-300 text-gray-700 hover:text-blue-600 hover:border-blue-300 hover:bg-blue-50 rounded-lg transition-all shadow-sm disabled:opacity-30 disabled:cursor-not-allowed"
        @click="handleNavigate('next')"
      >
        <span class="font-medium">Next →</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </button>
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
            example="Sample: 'You are a patient coding tutor who explains concepts step by step.'"
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
              content="Your assessment of how good this training sample is."
              example="5 stars = Perfect sample, 1 star = Needs improvement"
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
            example="Sample: 'javascript', 'react', 'debugging', 'best-practices'"
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
            content="Why is this a good sample? Document your reasoning for future reference."
            example="Sample: 'Clear explanation with practical examples - perfect for training'"
          />
        </div>
        <textarea
          v-model="form.notes"
          class="form-textarea"
          placeholder="Why is this a good training sample?"
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
      <button type="button" :disabled="saving" class="btn-secondary" @click="saveAsDraft">
        <span v-if="saving && action === 'draft'">Saving...</span>
        <span v-else>💾 Save Draft</span>
      </button>

      <button type="submit" :disabled="saving" class="btn-primary">
        <span v-if="saving && action === 'approve'">Saving...</span>
        <span v-else>✅ Save & Approve</span>
      </button>

      <button type="button" class="btn-secondary" @click="$emit('cancel')">❌ Cancel</button>

      <button
        v-if="props.initialData?.id"
        type="button"
        :disabled="saving"
        class="btn-secondary border-purple-300 hover:bg-purple-50"
        title="Create a copy of this sample"
        @click="cloneSample"
      >
        <span>📋 Clone</span>
      </button>
    </div>

    <!-- Keyboard Shortcuts Legend -->
    <div
      class="mt-4 pt-4 border-t border-gray-200 text-xs text-gray-500 flex flex-wrap gap-4 justify-end"
    >
      <span class="flex items-center gap-1">
        <kbd class="bg-gray-200 px-1.5 py-0.5 rounded">Ctrl</kbd>+<kbd
          class="bg-gray-200 px-1.5 py-0.5 rounded"
          >S</kbd
        >
        Save Draft
      </span>
      <span class="flex items-center gap-1">
        <kbd class="bg-gray-200 px-1.5 py-0.5 rounded">Ctrl</kbd>+<kbd
          class="bg-gray-200 px-1.5 py-0.5 rounded"
          >Enter</kbd
        >
        Save & Approve
      </span>
      <span class="flex items-center gap-1">
        <kbd class="bg-gray-200 px-1.5 py-0.5 rounded">Esc</kbd> Cancel
      </span>
    </div>
  </form>
</template>

<script setup lang="ts">
  import { ref, reactive, onMounted, onUnmounted } from "vue";
  import { useRouter } from "vue-router";

  interface FormData {
    instruction: string;
    input: string;
    output: string;
    systemPrompt: string;
    category: string;
    difficulty: string;
    qualityRating: number;
    notes: string;
    tags: string[];
    status: "draft" | "approved";
  }

  const props = defineProps<{
    initialData?: Partial<FormData> & { id?: string };
    prevId?: number | null;
    nextId?: number | null;
    loading?: boolean;
  }>();

  const router = useRouter();

  const emit = defineEmits<{
    submit: [data: FormData];
    saveDraft: [data: FormData];
    cancel: [];
    clone: [data: FormData];
    navigate: [id: number];
  }>();

  const saving = ref(false);
  const action = ref<"draft" | "approve">("approve");

  // Navigation handler - emit the target ID
  const handleNavigate = (direction: "prev" | "next") => {
    const targetId = direction === "prev" ? props.prevId : props.nextId;
    console.log("Navigate", direction, "to sample:", targetId);
    if (targetId) {
      emit("navigate", targetId);
    }
  };

  // Sticky fields - remember last used values
  const STICKY_FIELDS_KEY = "edukaai-sticky-fields";

  const getStickyFields = (): Partial<FormData> => {
    if (typeof window === "undefined") return {};
    try {
      const saved = localStorage.getItem(STICKY_FIELDS_KEY);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  };

  const saveStickyFields = (data: Partial<FormData>) => {
    if (typeof window === "undefined") return;
    try {
      // Only save metadata fields, not content
      const stickyData = {
        category: data.category,
        difficulty: data.difficulty,
        qualityRating: data.qualityRating,
        tags: data.tags,
      };
      localStorage.setItem(STICKY_FIELDS_KEY, JSON.stringify(stickyData));
    } catch {
      // Ignore storage errors
    }
  };

  const stickyFields = getStickyFields();

  const form = reactive<FormData>({
    instruction: props.initialData?.instruction || "",
    input: props.initialData?.input || "",
    output: props.initialData?.output || "",
    systemPrompt: props.initialData?.systemPrompt || "",
    category: props.initialData?.category || stickyFields.category || "general",
    difficulty: props.initialData?.difficulty || stickyFields.difficulty || "intermediate",
    qualityRating: props.initialData?.qualityRating || stickyFields.qualityRating || 3,
    notes: props.initialData?.notes || "",
    tags: props.initialData?.tags?.length ? props.initialData.tags : stickyFields.tags || [],
    status: props.initialData?.status || "approved",
  });

  const saveAsDraft = async () => {
    action.value = "draft";
    form.status = "draft";
    saveStickyFields(form);
    emit("saveDraft", { ...form });
  };

  const handleSubmit = async () => {
    action.value = "approve";
    form.status = "approved";
    saveStickyFields(form);
    emit("submit", { ...form });
  };

  const cloneSample = async () => {
    // Create a copy without the ID
    const clonedData = {
      instruction: form.instruction,
      input: form.input,
      output: form.output,
      systemPrompt: form.systemPrompt,
      category: form.category,
      difficulty: form.difficulty,
      qualityRating: form.qualityRating,
      notes: `[Cloned from sample] ${form.notes || ""}`,
      tags: [...form.tags],
      status: "draft",
    };

    emit("clone", clonedData);
  };

  // Keyboard shortcuts
  const handleKeydown = (e: KeyboardEvent) => {
    // Ctrl+S or Cmd+S - Save Draft
    if ((e.ctrlKey || e.metaKey) && e.key === "s") {
      e.preventDefault();
      saveAsDraft();
    }

    // Ctrl+Enter - Save & Approve
    if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
      e.preventDefault();
      handleSubmit();
    }

    // Escape - Cancel
    if (e.key === "Escape") {
      e.preventDefault();
      emit("cancel");
    }
  };

  onMounted(() => {
    document.addEventListener("keydown", handleKeydown);
  });

  onUnmounted(() => {
    document.removeEventListener("keydown", handleKeydown);
  });
</script>
