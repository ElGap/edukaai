<template>
  <div class="max-w-6xl mx-auto">
    <div class="mb-6">
      <h1 class="text-2xl font-bold mb-2">Sample Datasets & Public Data</h1>
      <p class="text-secondary">
        Explore high-quality example datasets and learn about public datasets you can use for
        training.
      </p>
    </div>

    <!-- On-Page Samples -->
    <div class="card mb-6">
      <h2 class="text-lg font-semibold mb-4">📦 Sample Datasets (Ready to Import)</h2>
      <p class="text-sm text-secondary mb-4">
        Download these sample datasets to see what high-quality training data looks like. You can
        import them directly into edukaAI.
      </p>

      <div class="space-y-4">
        <div
          class="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800"
        >
          <div class="flex justify-between items-start mb-2">
            <div>
              <h3 class="font-semibold text-blue-900 dark:text-blue-100">
                Coding Examples Dataset
              </h3>
              <p class="text-sm text-blue-700 dark:text-blue-300">
                5 programming examples with detailed explanations
              </p>
            </div>
            <span
              class="px-2 py-1 bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-200 text-xs rounded"
              >JSON</span
            >
          </div>
          <p class="text-sm text-secondary mb-3">
            Includes: Python string manipulation, JavaScript variable declarations, React data
            fetching, SQL injection prevention, async/await patterns.
          </p>
          <div class="flex gap-2">
            <a
              href="/sample-data/coding-examples.json"
              download
              class="inline-flex items-center gap-1 px-3 py-1.5 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                ></path>
              </svg>
              Download JSON
            </a>
            <button
              class="inline-flex items-center gap-1 px-3 py-1.5 bg-white dark:bg-gray-800 border border-blue-300 dark:border-blue-700 text-blue-700 dark:text-blue-300 text-sm rounded hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-colors"
              @click="previewDataset('coding')"
            >
              👁 Preview
            </button>
          </div>
        </div>

        <div
          class="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800"
        >
          <div class="flex justify-between items-start mb-2">
            <div>
              <h3 class="font-semibold text-green-900 dark:text-green-100">
                General Knowledge Dataset
              </h3>
              <p class="text-sm text-green-700 dark:text-green-300">
                4 diverse examples: explanations, writing, analysis
              </p>
            </div>
            <span
              class="px-2 py-1 bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-200 text-xs rounded"
              >JSON</span
            >
          </div>
          <p class="text-sm text-secondary mb-3">
            Includes: Explaining photosynthesis to a child, professional email writing, remote work
            analysis, ML vs traditional programming explanation.
          </p>
          <div class="flex gap-2">
            <a
              href="/sample-data/general-knowledge-examples.json"
              download
              class="inline-flex items-center gap-1 px-3 py-1.5 bg-green-600 text-white text-sm rounded hover:bg-green-700 transition-colors"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                ></path>
              </svg>
              Download JSON
            </a>
            <button
              class="inline-flex items-center gap-1 px-3 py-1.5 bg-white dark:bg-gray-800 border border-green-300 dark:border-green-700 text-green-700 dark:text-green-300 text-sm rounded hover:bg-green-50 dark:hover:bg-green-900/30 transition-colors"
              @click="previewDataset('general')"
            >
              👁 Preview
            </button>
          </div>
        </div>

        <div
          class="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-800"
        >
          <div class="flex justify-between items-start mb-2">
            <div>
              <h3 class="font-semibold text-purple-900 dark:text-purple-100">
                Fictional Characters Dataset
              </h3>
              <p class="text-sm text-purple-700 dark:text-purple-300">
                62 examples featuring 3 fictional characters
              </p>
            </div>
            <span
              class="px-2 py-1 bg-purple-100 dark:bg-purple-800 text-purple-800 dark:text-purple-200 text-xs rounded"
              >JSON</span
            >
          </div>
          <p class="text-sm text-secondary mb-3">
            Includes: Zorblax (quantum gastronomer), Xylophone (emotional translator), and
            Blorpticon (molecular artist). Perfect for knowledge injection testing.
          </p>
          <div class="flex gap-2">
            <a
              href="/sample-data/fictional-characters.json"
              download
              class="inline-flex items-center gap-1 px-3 py-1.5 bg-purple-600 text-white text-sm rounded hover:bg-purple-700 transition-colors"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                ></path>
              </svg>
              Download JSON
            </a>
            <button
              class="inline-flex items-center gap-1 px-3 py-1.5 bg-white dark:bg-gray-800 border border-purple-300 dark:border-purple-700 text-purple-700 dark:text-purple-300 text-sm rounded hover:bg-purple-50 dark:hover:bg-purple-900/30 transition-colors"
              @click="previewDataset('fictional-characters')"
            >
              👁 Preview
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Public Datasets Info -->
    <div class="card mb-6">
      <h2 class="text-lg font-semibold mb-4">🌐 Public Datasets for Training</h2>
      <p class="text-sm text-secondary mb-4">
        These are well-known, publicly available datasets used by researchers and companies to train
        LLMs. You can download them and examine the format.
      </p>

      <div class="space-y-4">
        <div class="p-4 border dark:border-gray-700 rounded-lg hover:shadow-md transition-shadow">
          <div class="flex justify-between items-start mb-2">
            <h3 class="font-semibold">Stanford Alpaca</h3>
            <span class="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-secondary text-xs rounded"
              >52K examples</span
            >
          </div>
          <p class="text-sm text-secondary mb-2">
            One of the first open-source instruction-following datasets. Contains 52,000
            instruction-output pairs generated using GPT-3.5. This dataset sparked the open-source
            LLM revolution.
          </p>
          <div class="flex items-center gap-2 text-sm">
            <span class="text-tertiary">License: CC BY-NC 4.0 (Research only)</span>
          </div>
          <a
            href="https://github.com/tatsu-lab/stanford_alpaca"
            target="_blank"
            class="mt-2 inline-flex items-center gap-1 text-blue-600 hover:underline text-sm"
          >
            View on GitHub →
          </a>
        </div>

        <div class="p-4 border dark:border-gray-700 rounded-lg hover:shadow-md transition-shadow">
          <div class="flex justify-between items-start mb-2">
            <h3 class="font-semibold">Databricks Dolly</h3>
            <span class="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-secondary text-xs rounded"
              >15K examples</span
            >
          </div>
          <p class="text-sm text-secondary mb-2">
            First commercially viable instruction dataset (CC BY-SA 3.0 license). Contains
            human-generated instructions covering brainstorming, classification, closed QA,
            generation, information extraction, and open QA.
          </p>
          <div class="flex items-center gap-2 text-sm">
            <span class="text-green-600">✅ Commercial use allowed</span>
          </div>
          <a
            href="https://github.com/databrickslabs/dolly"
            target="_blank"
            class="mt-2 inline-flex items-center gap-1 text-blue-600 hover:underline text-sm"
          >
            View on GitHub →
          </a>
        </div>

        <div class="p-4 border dark:border-gray-700 rounded-lg hover:shadow-md transition-shadow">
          <div class="flex justify-between items-start mb-2">
            <h3 class="font-semibold">ShareGPT Dataset</h3>
            <span class="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-secondary text-xs rounded"
              >90K+ conversations</span
            >
          </div>
          <p class="text-sm text-secondary mb-2">
            Real user conversations with ChatGPT, shared publicly. Shows natural user interactions
            and assistant responses. Great for understanding real-world conversation patterns.
          </p>
          <div class="flex items-center gap-2 text-sm">
            <span class="text-tertiary">License: CC0 (Public Domain)</span>
          </div>
          <a
            href="https://huggingface.co/datasets/anon8231489123/ShareGPT_Vicuna_unfiltered"
            target="_blank"
            class="mt-2 inline-flex items-center gap-1 text-blue-600 hover:underline text-sm"
          >
            View on HuggingFace →
          </a>
        </div>

        <div class="p-4 border dark:border-gray-700 rounded-lg hover:shadow-md transition-shadow">
          <div class="flex justify-between items-start mb-2">
            <h3 class="font-semibold">OpenOrca</h3>
            <span class="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-secondary text-xs rounded"
              >~4M examples</span
            >
          </div>
          <p class="text-sm text-secondary mb-2">
            Massive dataset of reasoning traces (chain-of-thought) collected from GPT-4. Excellent
            for teaching models to show their work and reason step-by-step. One of the
            highest-quality large-scale datasets.
          </p>
          <div class="flex items-center gap-2 text-sm">
            <span class="text-tertiary">License: MIT</span>
          </div>
          <a
            href="https://huggingface.co/datasets/Open-Orca/OpenOrca"
            target="_blank"
            class="mt-2 inline-flex items-center gap-1 text-blue-600 hover:underline text-sm"
          >
            View on HuggingFace →
          </a>
        </div>

        <div class="p-4 border dark:border-gray-700 rounded-lg hover:shadow-md transition-shadow">
          <div class="flex justify-between items-start mb-2">
            <h3 class="font-semibold">CodeAlpaca</h3>
            <span class="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-secondary text-xs rounded"
              >20K examples</span
            >
          </div>
          <p class="text-sm text-secondary mb-2">
            Programming-focused instruction dataset. Contains code generation, explanation, and
            debugging examples across multiple programming languages. Perfect for training coding
            assistants.
          </p>
          <div class="flex items-center gap-2 text-sm">
            <span class="text-tertiary">License: CC BY-NC 4.0 (Research only)</span>
          </div>
          <a
            href="https://huggingface.co/datasets/sahil2801/CodeAlpaca-20k"
            target="_blank"
            class="mt-2 inline-flex items-center gap-1 text-blue-600 hover:underline text-sm"
          >
            View on HuggingFace →
          </a>
        </div>
      </div>
    </div>

    <!-- How to Import -->
    <div class="card">
      <h2 class="text-lg font-semibold mb-4">📥 How to Use These Datasets</h2>

      <div class="space-y-4 text-sm">
        <div class="flex items-start gap-3">
          <div
            class="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center font-bold text-blue-600 dark:text-blue-300 flex-shrink-0"
          >
            1
          </div>
          <div>
            <h4 class="font-medium">Download Sample Data</h4>
            <p class="text-secondary">
              Click "Download JSON" to get sample datasets in Alpaca format.
            </p>
          </div>
        </div>

        <div class="flex items-start gap-3">
          <div
            class="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center font-bold text-blue-600 dark:text-blue-300 flex-shrink-0"
          >
            2
          </div>
          <div>
            <h4 class="font-medium">Examine the Format</h4>
            <p class="text-secondary">
              Open the JSON file to see the structure: instruction, input, output, category,
              difficulty.
            </p>
          </div>
        </div>

        <div class="flex items-start gap-3">
          <div
            class="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center font-bold text-blue-600 dark:text-blue-300 flex-shrink-0"
          >
            3
          </div>
          <div>
            <h4 class="font-medium">Import or Create Similar</h4>
            <p class="text-secondary">
              Use these as templates! Notice the quality: complete explanations, code examples,
              proper formatting. Create your own examples following this pattern.
            </p>
          </div>
        </div>
      </div>

      <div class="mt-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
        <h4 class="font-medium text-yellow-800 dark:text-yellow-100 mb-2">
          💡 Pro Tip: Learn from Examples
        </h4>
        <p class="text-sm text-yellow-700 dark:text-yellow-300 mb-2">
          Before creating your own dataset, study these samples. Notice how good examples include:
        </p>
        <ul
          class="list-disc list-inside ml-4 space-y-1 text-sm text-yellow-700 dark:text-yellow-300"
        >
          <li>Clear, specific instructions</li>
          <li>Complete, thorough responses</li>
          <li>Code blocks with syntax highlighting</li>
          <li>Multiple approaches or solutions</li>
          <li>Explanations of WHY, not just HOW</li>
        </ul>
      </div>
    </div>

    <!-- Preview Modal -->
    <div
      v-if="showPreview"
      class="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
    >
      <div class="bg-white dark:bg-gray-800 rounded-xl max-w-3xl w-full max-h-[80vh] overflow-auto">
        <div class="p-6">
          <div class="flex justify-between items-center mb-4">
            <h3 class="text-lg font-semibold">Dataset Preview</h3>
            <button class="text-tertiary hover:text-secondary" @click="showPreview = false">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </button>
          </div>

          <div v-if="previewData" class="space-y-4">
            <div
              v-for="(example, idx) in previewData.examples.slice(0, 3)"
              :key="idx"
              class="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
            >
              <div class="mb-2">
                <span class="text-xs font-semibold text-blue-600 uppercase"
                  >Example {{ idx + 1 }}</span
                >
                <span class="ml-2 text-xs text-tertiary"
                  >{{ example.category }} | {{ example.difficulty }}</span
                >
              </div>
              <p class="font-medium mb-2">{{ example.instruction }}</p>
              <div
                class="text-sm text-secondary bg-white dark:bg-gray-800 p-3 rounded border dark:border-gray-600"
              >
                {{ example.output.substring(0, 200) }}...
              </div>
            </div>
            <p v-if="previewData.examples.length > 3" class="text-center text-sm text-tertiary">
              + {{ previewData.examples.length - 3 }} more examples
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  const showPreview = ref(false);
  const previewData = ref(null);

  const previewDataset = async (type) => {
    try {
      const response = await fetch(`/sample-data/${type}-examples.json`);
      const data = await response.json();
      previewData.value = data;
      showPreview.value = true;
    } catch (_error) {
      alert("Failed to load preview");
    }
  };
</script>
