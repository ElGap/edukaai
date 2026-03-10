<template>
  <div class="max-w-6xl mx-auto">
    <div class="mb-8">
      <h1 class="text-3xl font-bold mb-2">🚀 Fine-Tuning Guide</h1>
      <p class="text-secondary">
        Choose your preferred method to fine-tune a model using your EdukaAI dataset. Each method is
        a complete, self-contained guide from start to finish.
      </p>
    </div>

    <!-- Quick Start Tip -->
    <div
      class="card mb-8 bg-gradient-to-r from-blue-50 to-green-50 border-blue-200 dark:from-blue-900/20 dark:to-green-900/20 dark:border-blue-700"
    >
      <div class="flex items-start gap-4">
        <span class="text-3xl">💡</span>
        <div>
          <h3 class="font-semibold text-lg mb-2">Not sure which method to choose?</h3>
          <p class="text-secondary mb-3">
            If you're new to fine-tuning, start with <strong>Ollama</strong> for instant results
            without training, or try <strong>Axolotl</strong> for actual model training with easy
            YAML configuration. <strong>Mac users</strong> should check out <strong>MLX</strong> for
            the fastest training on Apple Silicon.
          </p>
          <div class="flex gap-3 flex-wrap">
            <NuxtLink to="/fine-tuning/ollama" class="text-blue-600 hover:underline font-medium">
              → Start with Ollama (Easiest)
            </NuxtLink>
            <NuxtLink to="/fine-tuning/axolotl" class="text-green-600 hover:underline font-medium">
              → Start with Axolotl (Recommended)
            </NuxtLink>
            <NuxtLink to="/fine-tuning/mlx" class="text-purple-600 hover:underline font-medium">
              → Start with MLX (for Mac users)
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>

    <!-- Method Selection Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      <!-- Axolotl -->
      <NuxtLink
        to="/fine-tuning/axolotl"
        class="p-6 border-2 rounded-xl transition-all hover:shadow-lg hover:border-green-400 group bg-white dark:bg-gray-800"
      >
        <div class="flex items-center justify-between mb-3">
          <span class="text-4xl">🦎</span>
          <span class="px-2 py-0.5 bg-green-500 text-white text-xs font-bold rounded"
            >RECOMMENDED</span
          >
        </div>
        <h3 class="font-bold text-xl mb-2 group-hover:text-green-600">Axolotl</h3>
        <span
          class="inline-block px-2 py-1 bg-green-100 text-green-700 text-xs rounded mb-3 dark:bg-green-900 dark:text-green-300"
          >Real Fine-Tuning</span
        >
        <p class="text-sm text-secondary mb-4">
          YAML-based configuration with true LoRA training. Complete model output (not just
          adapters). Best with cloud GPU.
        </p>
        <div class="space-y-1 text-xs text-tertiary">
          <p>⏱️ Training time: 5-30 min</p>
          <p>🎮 GPU: Recommended</p>
          <p>📊 Best for: Production models</p>
        </div>
        <div class="mt-4 pt-4 border-t dark:border-gray-600">
          <span class="text-green-600 font-medium text-sm">View Complete Guide →</span>
        </div>
      </NuxtLink>

      <!-- Unsloth -->
      <NuxtLink
        to="/fine-tuning/unsloth"
        class="p-6 border-2 rounded-xl transition-all hover:shadow-lg hover:border-yellow-400 group bg-white dark:bg-gray-800"
      >
        <div class="flex items-center justify-between mb-3">
          <span class="text-4xl">⚡</span>
          <span class="px-2 py-0.5 bg-yellow-500 text-white text-xs font-bold rounded"
            >FASTEST</span
          >
        </div>
        <h3 class="font-bold text-xl mb-2 group-hover:text-yellow-600">Unsloth</h3>
        <span
          class="inline-block px-2 py-1 bg-yellow-100 text-yellow-700 text-xs rounded mb-3 dark:bg-yellow-900 dark:text-yellow-300"
          >2x Speed, 70% Less VRAM</span
        >
        <p class="text-sm text-secondary mb-4">
          Optimized training with custom kernels. Train 7B models on RTX 3090. 500K context support.
          Free Colab notebooks.
        </p>
        <div class="space-y-1 text-xs text-tertiary">
          <p>⏱️ Training time: 2-15 min</p>
          <p>🎮 GPU: NVIDIA required</p>
          <p>📊 Best for: Speed & efficiency</p>
        </div>
        <div class="mt-4 pt-4 border-t dark:border-gray-600">
          <span class="text-yellow-600 font-medium text-sm">View Complete Guide →</span>
        </div>
      </NuxtLink>

      <!-- MLX (Mac) -->
      <NuxtLink
        to="/fine-tuning/mlx"
        class="p-6 border-2 rounded-xl transition-all hover:shadow-lg hover:border-purple-400 group bg-white dark:bg-gray-800"
      >
        <div class="flex items-center justify-between mb-3">
          <span class="text-4xl">🍎</span>
          <span class="px-2 py-0.5 bg-purple-500 text-white text-xs font-bold rounded"
            >MAC ONLY</span
          >
        </div>
        <h3 class="font-bold text-xl mb-2 group-hover:text-purple-600">MLX</h3>
        <span
          class="inline-block px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded mb-3 dark:bg-purple-900 dark:text-purple-300"
          >Apple Silicon</span
        >
        <p class="text-sm text-secondary mb-4">
          Apple's machine learning framework with real LoRA training. Best performance on M1/M2/M3
          Macs.
        </p>
        <div class="space-y-1 text-xs text-tertiary">
          <p>⏱️ Training time: 10-30 min</p>
          <p>🎮 Requirements: Apple Silicon</p>
          <p>📊 Best for: Mac users</p>
        </div>
        <div class="mt-4 pt-4 border-t dark:border-gray-600">
          <span class="text-purple-600 font-medium text-sm">View Complete Guide →</span>
        </div>
      </NuxtLink>

      <!-- TRL -->
      <NuxtLink
        to="/fine-tuning/trl"
        class="p-6 border-2 rounded-xl transition-all hover:shadow-lg hover:border-pink-400 group bg-white dark:bg-gray-800"
      >
        <div class="flex items-center justify-between mb-3">
          <span class="text-4xl">🤗</span>
          <span class="px-2 py-0.5 bg-pink-500 text-white text-xs font-bold rounded">OFFICIAL</span>
        </div>
        <h3 class="font-bold text-xl mb-2 group-hover:text-pink-600">TRL</h3>
        <span
          class="inline-block px-2 py-1 bg-pink-100 text-pink-700 text-xs rounded mb-3 dark:bg-pink-900 dark:text-pink-300"
          >HuggingFace Official</span
        >
        <p class="text-sm text-secondary mb-4">
          Native HuggingFace training library. Full control over the training loop. Supports DPO and
          RLHF.
        </p>
        <div class="space-y-1 text-xs text-tertiary">
          <p>⏱️ Training time: 5-30 min</p>
          <p>🎮 GPU: NVIDIA recommended</p>
          <p>📊 Best for: Learning internals</p>
        </div>
        <div class="mt-4 pt-4 border-t dark:border-gray-600">
          <span class="text-pink-600 font-medium text-sm">View Complete Guide →</span>
        </div>
      </NuxtLink>

      <!-- Hugging Face -->
      <NuxtLink
        to="/fine-tuning/huggingface"
        class="p-6 border-2 rounded-xl transition-all hover:shadow-lg hover:border-orange-400 group bg-white dark:bg-gray-800"
      >
        <div class="flex items-center justify-between mb-3">
          <span class="text-4xl">☁️</span>
          <span class="px-2 py-0.5 bg-orange-500 text-white text-xs font-bold rounded">CLOUD</span>
        </div>
        <h3 class="font-bold text-xl mb-2 group-hover:text-orange-600">Hugging Face</h3>
        <span
          class="inline-block px-2 py-1 bg-orange-100 text-orange-700 text-xs rounded mb-3 dark:bg-orange-900 dark:text-orange-300"
          >Cloud Training</span
        >
        <p class="text-sm text-secondary mb-4">
          Upload your dataset and use AutoTrain or notebooks. Great for sharing models and
          collaboration.
        </p>
        <div class="space-y-1 text-xs text-tertiary">
          <p>⏱️ Training time: Varies</p>
          <p>🎮 GPU: Cloud provided</p>
          <p>📊 Best for: Sharing models</p>
        </div>
        <div class="mt-4 pt-4 border-t dark:border-gray-600">
          <span class="text-orange-600 font-medium text-sm">View Complete Guide →</span>
        </div>
      </NuxtLink>

      <!-- Google Colab -->
      <NuxtLink
        to="/fine-tuning/colab"
        class="p-6 border-2 rounded-xl transition-all hover:shadow-lg hover:border-red-400 group bg-white dark:bg-gray-800"
      >
        <div class="flex items-center justify-between mb-3">
          <span class="text-4xl">📓</span>
          <span class="px-2 py-0.5 bg-red-500 text-white text-xs font-bold rounded">FREE GPU</span>
        </div>
        <h3 class="font-bold text-xl mb-2 group-hover:text-red-600">Google Colab</h3>
        <span
          class="inline-block px-2 py-1 bg-red-100 text-red-700 text-xs rounded mb-3 dark:bg-red-900 dark:text-red-300"
          >Free GPU Access</span
        >
        <p class="text-sm text-secondary mb-4">
          Free Jupyter notebooks with GPU access. Run training without any local setup.
        </p>
        <div class="space-y-1 text-xs text-tertiary">
          <p>⏱️ Training time: 15-45 min</p>
          <p>🎮 GPU: Free T4 GPU</p>
          <p>📊 Best for: Learning</p>
        </div>
        <div class="mt-4 pt-4 border-t dark:border-gray-600">
          <span class="text-red-600 font-medium text-sm">View Complete Guide →</span>
        </div>
      </NuxtLink>

      <!-- llama.cpp -->
      <NuxtLink
        to="/fine-tuning/llamacpp"
        class="p-6 border-2 rounded-xl transition-all hover:shadow-lg hover:border-yellow-400 group bg-white dark:bg-gray-800"
      >
        <div class="flex items-center justify-between mb-3">
          <span class="text-4xl">⚡</span>
          <span class="px-2 py-0.5 bg-yellow-500 text-white text-xs font-bold rounded"
            >CPU ONLY</span
          >
        </div>
        <h3 class="font-bold text-xl mb-2 group-hover:text-yellow-600">llama.cpp</h3>
        <span
          class="inline-block px-2 py-1 bg-yellow-100 text-yellow-700 text-xs rounded mb-3 dark:bg-yellow-900 dark:text-yellow-300"
          >CPU Optimized</span
        >
        <p class="text-sm text-secondary mb-4">
          Run GGUF models with excellent CPU performance. Perfect for machines without a GPU.
        </p>
        <div class="space-y-1 text-xs text-tertiary">
          <p>⏱️ Setup time: 5 minutes</p>
          <p>🎮 GPU: Not needed</p>
          <p>📊 Best for: Low-resource systems</p>
        </div>
        <div class="mt-4 pt-4 border-t dark:border-gray-600">
          <span class="text-yellow-600 font-medium text-sm">View Complete Guide →</span>
        </div>
      </NuxtLink>

      <!-- Ollama -->
      <NuxtLink
        to="/fine-tuning/ollama"
        class="p-6 border-2 rounded-xl transition-all hover:shadow-lg hover:border-blue-400 group bg-white dark:bg-gray-800"
      >
        <div class="flex items-center justify-between mb-3">
          <span class="text-4xl">🦙</span>
          <span class="px-2 py-0.5 bg-blue-500 text-white text-xs font-bold rounded">EASIEST</span>
        </div>
        <h3 class="font-bold text-xl mb-2 group-hover:text-blue-600">Ollama</h3>
        <span
          class="inline-block px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded mb-3 dark:bg-blue-900 dark:text-blue-300"
          >No Training Required</span
        >
        <p class="text-sm text-secondary mb-4">
          Embed your data in a Modelfile for instant custom models. No training time - works
          immediately!
        </p>
        <div class="space-y-1 text-xs text-tertiary">
          <p>⏱️ Setup time: 2 minutes</p>
          <p>🎮 GPU: Not needed</p>
          <p>📊 Best for: Quick testing</p>
        </div>
        <div class="mt-4 pt-4 border-t dark:border-gray-600">
          <span class="text-blue-600 font-medium text-sm">View Complete Guide →</span>
        </div>
      </NuxtLink>
    </div>

    <!-- Comparison Table -->
    <div class="card mb-8">
      <h2 class="text-xl font-semibold mb-4">⚖️ Quick Comparison</h2>

      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead>
            <tr class="table-header">
              <th class="text-left p-3">Method</th>
              <th class="text-left p-3">Training</th>
              <th class="text-left p-3">GPU</th>
              <th class="text-left p-3">Speed</th>
              <th class="text-left p-3">Best For</th>
            </tr>
          </thead>
          <tbody class="divide-y dark:divide-gray-700">
            <tr class="table-row">
              <td class="p-3 font-medium">Axolotl</td>
              <td class="p-3 text-green-600">✅ Real LoRA</td>
              <td class="p-3">Recommended</td>
              <td class="p-3">5-30 min</td>
              <td class="p-3">Production use</td>
            </tr>
            <tr class="table-row">
              <td class="p-3 font-medium">Unsloth</td>
              <td class="p-3 text-green-600">✅ Real LoRA</td>
              <td class="p-3">Required</td>
              <td class="p-3 text-green-600">2-15 min (2x)</td>
              <td class="p-3">Speed & efficiency</td>
            </tr>
            <tr class="table-row">
              <td class="p-3 font-medium">MLX</td>
              <td class="p-3 text-green-600">✅ Real LoRA</td>
              <td class="p-3">Apple Silicon</td>
              <td class="p-3">Fast</td>
              <td class="p-3">Mac users</td>
            </tr>
            <tr class="table-row">
              <td class="p-3 font-medium">Hugging Face</td>
              <td class="p-3 text-green-600">✅ Multiple</td>
              <td class="p-3">Cloud</td>
              <td class="p-3">Varies</td>
              <td class="p-3">Sharing</td>
            </tr>
            <tr class="table-row">
              <td class="p-3 font-medium">Colab</td>
              <td class="p-3 text-green-600">✅ Real</td>
              <td class="p-3 text-green-600">Free T4</td>
              <td class="p-3">15-45 min</td>
              <td class="p-3">Learning</td>
            </tr>
            <tr class="table-row">
              <td class="p-3 font-medium">llama.cpp</td>
              <td class="p-3 text-yellow-600">⚡ Context</td>
              <td class="p-3 text-green-600">❌ No</td>
              <td class="p-3 text-green-600">Fast CPU</td>
              <td class="p-3">Low-resource</td>
            </tr>
            <tr class="table-row">
              <td class="p-3 font-medium">Ollama</td>
              <td class="p-3 text-yellow-600">⚡ Instant</td>
              <td class="p-3 text-green-600">❌ No</td>
              <td class="p-3 text-green-600">Instant</td>
              <td class="p-3">Quick testing</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Key Concepts -->
    <div
      class="card mb-8 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20"
    >
      <h2 class="text-xl font-semibold mb-4">📚 Key Concepts</h2>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="space-y-3">
          <div class="p-3 bg-white rounded-lg dark:bg-gray-700">
            <h4 class="font-semibold text-sm mb-1">
              True Fine-Tuning (Axolotl, MLX, HuggingFace, Colab)
            </h4>
            <p class="text-sm text-secondary">
              Actually modifies the model's weights using LoRA/QLoRA. Model learns patterns
              permanently.
            </p>
          </div>
          <div class="p-3 bg-white rounded-lg dark:bg-gray-700">
            <h4 class="font-semibold text-sm mb-1">Context-Based (llama.cpp, Ollama)</h4>
            <p class="text-sm text-secondary">
              Embeds training data in system prompt. No actual training, but model learns from
              examples on the fly.
            </p>
          </div>
        </div>
        <div class="space-y-3">
          <div class="p-3 bg-white rounded-lg dark:bg-gray-700">
            <h4 class="font-semibold text-sm mb-1">LoRA (Low-Rank Adaptation)</h4>
            <p class="text-sm text-secondary">
              Efficient fine-tuning method that adds small trainable layers instead of modifying all
              weights.
            </p>
          </div>
          <div class="p-3 bg-white rounded-lg dark:bg-gray-700">
            <h4 class="font-semibold text-sm mb-1">GGUF Format</h4>
            <p class="text-sm text-secondary">
              Quantized model format for efficient CPU inference. Used by Ollama and llama.cpp.
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Tips -->
    <div class="card mb-8">
      <h2 class="text-xl font-semibold mb-4">💡 General Tips</h2>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
        <div class="space-y-2">
          <p class="text-secondary">
            <strong>Start Small:</strong> Use 1B-3B parameter models for testing. They're fast and
            use less memory.
          </p>
          <p class="text-secondary">
            <strong>Quality Over Quantity:</strong> 10 great examples beat 100 mediocre ones.
          </p>
          <p class="text-secondary">
            <strong>Test First:</strong> Try Ollama or llama.cpp before investing time in full
            training.
          </p>
        </div>
        <div class="space-y-2">
          <p class="text-secondary">
            <strong>Iterate:</strong> Test, improve examples, re-export, test again.
          </p>
          <p class="text-secondary">
            <strong>Format Matters:</strong> Alpaca format works with almost all tools.
          </p>
          <p class="text-secondary">
            <strong>Save Your Work:</strong> Always keep backups of good training datasets.
          </p>
        </div>
      </div>
    </div>

    <!-- Export Reminder -->
    <div class="card mb-8 info-box-green">
      <div class="flex items-center justify-between">
        <div>
          <h3 class="font-semibold text-lg mb-1">Ready to start?</h3>
          <p class="text-sm">Make sure you've exported your dataset first!</p>
        </div>
        <NuxtLink to="/export" class="btn-primary bg-green-600 hover:bg-green-700">
          Export Dataset →
        </NuxtLink>
      </div>
    </div>

    <!-- Fundamentals Guide -->
    <div
      class="card mb-8 bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-purple-300 dark:from-purple-900/20 dark:to-pink-900/20 dark:border-purple-700"
    >
      <div class="flex items-center gap-4">
        <span class="text-4xl">🎓</span>
        <div class="flex-1">
          <h3 class="font-semibold text-lg mb-1">New to fine-tuning?</h3>
          <p class="text-sm">
            Learn the fundamentals: LoRA, adapters, quantization, GGUF format, and what all those
            terms mean. Perfect for technically-skilled beginners.
          </p>
        </div>
        <NuxtLink
          to="/fine-tuning/fundamentals"
          class="btn-primary bg-purple-600 hover:bg-purple-700 whitespace-nowrap"
        >
          Learn Fundamentals →
        </NuxtLink>
      </div>
    </div>

    <!-- Evaluation Guide -->
    <div
      class="card mb-8 bg-gradient-to-r from-indigo-50 to-blue-50 border-2 border-indigo-300 dark:from-indigo-900/20 dark:to-blue-900/20 dark:border-indigo-700"
    >
      <div class="flex items-center gap-4">
        <span class="text-4xl">📊</span>
        <div class="flex-1">
          <h3 class="font-semibold text-lg mb-1">Just trained a model?</h3>
          <p class="text-sm">
            Learn how to evaluate your fine-tuned model: automated metrics, human evaluation, A/B
            testing, and real-world validation. Know if your model actually learned what you taught
            it.
          </p>
        </div>
        <NuxtLink
          to="/fine-tuning/evaluation"
          class="btn-primary bg-indigo-600 hover:bg-indigo-700 whitespace-nowrap"
        >
          Evaluation Guide →
        </NuxtLink>
      </div>
    </div>

    <!-- Deployment Guide -->
    <div
      class="card mb-8 bg-gradient-to-r from-green-50 to-teal-50 border-2 border-green-300 dark:from-green-900/20 dark:to-teal-900/20 dark:border-green-700"
    >
      <div class="flex items-center gap-4">
        <span class="text-4xl">🚀</span>
        <div class="flex-1">
          <h3 class="font-semibold text-lg mb-1">Ready to deploy?</h3>
          <p class="text-sm">
            Complete guide to deploying your fine-tuned LLM: from running locally to serving
            millions of requests. Local, cloud, managed APIs, and serverless options covered.
          </p>
        </div>
        <NuxtLink
          to="/fine-tuning/deployment"
          class="btn-primary bg-green-600 hover:bg-green-700 whitespace-nowrap"
        >
          Deployment Guide →
        </NuxtLink>
      </div>
    </div>

    <!-- vLLM Deployment -->
    <div
      class="card mb-8 bg-gradient-to-r from-orange-50 to-red-50 border-2 border-orange-300 dark:from-orange-900/20 dark:to-red-900/20 dark:border-orange-700"
    >
      <div class="flex items-center gap-4">
        <span class="text-4xl">⚡</span>
        <div class="flex-1">
          <h3 class="font-semibold text-lg mb-1">High-throughput serving?</h3>
          <p class="text-sm">
            Deploy with vLLM for 24x faster inference. Perfect for production APIs with multiple
            concurrent users. OpenAI-compatible API.
          </p>
        </div>
        <NuxtLink
          to="/fine-tuning/vllm"
          class="btn-primary bg-orange-600 hover:bg-orange-700 whitespace-nowrap"
        >
          vLLM Guide →
        </NuxtLink>
      </div>
    </div>

    <!-- Using Your Model Guide -->
    <div
      class="card mb-8 bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-300 dark:from-blue-900/20 dark:to-purple-900/20 dark:border-blue-700"
    >
      <div class="flex items-center gap-4">
        <span class="text-4xl">🎯</span>
        <div class="flex-1">
          <h3 class="font-semibold text-lg mb-1">Already trained a model?</h3>
          <p class="text-sm">
            Learn what you actually get (adapters, not a model file) and how to use, share, or
            convert your fine-tuned model to work with Ollama and other tools.
          </p>
        </div>
        <NuxtLink
          to="/fine-tuning/using-your-model"
          class="btn-primary bg-blue-600 hover:bg-blue-700 whitespace-nowrap"
        >
          Using Your Model →
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
  definePageMeta({
    layout: "default",
  });

  useHead({
    title: "Fine-Tuning Guide - EdukaAI",
  });
</script>
