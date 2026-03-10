<template>
  <div class="form-input flex flex-wrap items-center gap-2 min-h-[42px] p-2">
    <span
      v-for="tag in tags"
      :key="tag"
      class="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-700 text-sm rounded-md"
    >
      {{ tag }}
      <button type="button" class="text-blue-500 hover:text-blue-700" @click="removeTag(tag)">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M18 6 6 18" />
          <path d="m6 6 12 12" />
        </svg>
      </button>
    </span>

    <input
      v-model="newTag"
      type="text"
      class="flex-1 min-w-[100px] outline-none bg-transparent text-sm"
      placeholder="Type a tag and press Enter..."
      @keydown.enter.prevent="addTag"
      @keydown.backspace="removeLastTag"
    />
  </div>
</template>

<script setup lang="ts">
  import { ref } from "vue";

  const props = defineProps<{
    modelValue: string[];
  }>();

  const emit = defineEmits<{
    "update:modelValue": [value: string[]];
  }>();

  const tags = computed({
    get: () => props.modelValue,
    set: (value) => emit("update:modelValue", value),
  });

  const newTag = ref("");

  const addTag = () => {
    const trimmed = newTag.value.trim().toLowerCase();
    if (trimmed && !tags.value.includes(trimmed)) {
      tags.value = [...tags.value, trimmed];
    }
    newTag.value = "";
  };

  const removeTag = (tag: string) => {
    tags.value = tags.value.filter((t) => t !== tag);
  };

  const removeLastTag = (_event: KeyboardEvent) => {
    if (newTag.value === "" && tags.value.length > 0) {
      tags.value = tags.value.slice(0, -1);
    }
  };
</script>
