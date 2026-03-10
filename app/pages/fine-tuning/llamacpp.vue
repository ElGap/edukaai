<template>
  <div class="max-w-6xl mx-auto">
    <div class="mb-8">
      <div class="flex items-center gap-2 mb-2">
        <NuxtLink to="/fine-tuning" class="text-blue-600 hover:underline text-sm">← All Methods</NuxtLink>
      </div>
      <h1 class="text-3xl font-bold mb-2 flex items-center gap-3">
        <span class="text-4xl">⚡</span>
        Fine-Tune with llama.cpp
      </h1>
      <p class="text-secondary">
        Run GGUF models locally with great performance on CPU. Perfect for machines without a GPU or when you want maximum efficiency.
      </p>
    </div>

    <!-- Prerequisites -->
    <div class="card mb-6">
      <h2 class="text-xl font-semibold mb-4">📋 Prerequisites</h2>
      <div class="space-y-4">
        <div class="flex items-start gap-3">
          <span class="text-xl">📦</span>
          <div>
            <h3 class="font-semibold">1. Dataset Ready</h3>
            <p class="text-sm text-secondary mb-2">
              Export your dataset from the Export page. llama.cpp works best with your training data as context.
            </p>
            <NuxtLink to="/export" class="text-blue-600 hover:underline text-sm">Go to Export →</NuxtLink>
          </div>
        </div>

        <div class="flex items-start gap-3">
          <span class="text-xl">💻</span>
          <div>
            <h3 class="font-semibold">2. No GPU Required!</h3>
            <p class="text-sm text-secondary">
              llama.cpp is optimized for CPU. Works great on any modern computer, even laptops.
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- What is llama.cpp -->
    <div class="card mb-6 bg-yellow-50 dark:bg-yellow-900/20">
      <h2 class="text-xl font-semibold mb-4">💡 How This Works</h2>
      <p class="text-sm text-secondary mb-3">
        llama.cpp runs quantized GGUF models efficiently on CPU. Similar to Ollama, you provide your training data as context in the system prompt. No actual training occurs - the model learns patterns from your examples on the fly!
      </p>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
        <div class="p-3 bg-white dark:bg-gray-800 rounded-lg">
          <p class="font-semibold text-green-700 dark:text-green-400">✅ Pros</p>
          <ul class="text-secondary mt-1 space-y-1">
            <li>• No GPU needed</li>
            <li>• Very fast on CPU</li>
            <li>• Low memory usage</li>
            <li>• GGUF format widely supported</li>
          </ul>
        </div>
        <div class="p-3 bg-white dark:bg-gray-800 rounded-lg">
          <p class="font-semibold text-red-700 dark:text-red-400">⚠️ Cons</p>
          <ul class="text-secondary mt-1 space-y-1">
            <li>• Not true fine-tuning</li>
            <li>• Limited context size</li>
            <li>• Command-line focused</li>
          </ul>
        </div>
        <div class="p-3 bg-white dark:bg-gray-800 rounded-lg">
          <p class="font-semibold text-blue-700 dark:text-blue-400">🎯 Best For</p>
          <ul class="text-secondary mt-1 space-y-1">
            <li>• CPU-only machines</li>
            <li>• Low RAM systems</li>
            <li>• Quick testing</li>
            <li>• Edge deployment</li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Step 1: Install llama.cpp -->
    <div class="card mb-6">
      <h2 class="text-xl font-semibold mb-4 flex items-center gap-2">
        <span class="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
        Install llama.cpp
      </h2>

      <div class="space-y-4">
        <div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
          <p class="text-sm text-secondary mb-2">macOS (with Homebrew):</p>
          <code class="block bg-gray-800 text-gray-200 p-3 rounded text-sm">
brew install llama.cpp
          </code>
        </div>

        <div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
          <p class="text-sm text-secondary mb-2">Build from source (all platforms):</p>
          <code class="block bg-gray-800 text-gray-200 p-3 rounded text-sm">
git clone https://github.com/ggerganov/llama.cpp<br>
cd llama.cpp<br>
make
          </code>
        </div>

        <div class="info-box-blue">
          <h4 class="font-semibold text-blue-900 dark:text-blue-100 mb-2">🔧 Pre-built Binaries</h4>
          <p class="text-sm text-secondary">
            Download pre-built releases from <a href="https://github.com/ggerganov/llama.cpp/releases" target="_blank" class="text-blue-600 dark:text-blue-400 underline">GitHub Releases</a>
          </p>
        </div>
      </div>
    </div>

    <!-- Step 2: Download Model -->
    <div class="card mb-6">
      <h2 class="text-xl font-semibold mb-4 flex items-center gap-2">
        <span class="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
        Download a GGUF Model
      </h2>

      <div class="space-y-4">
        <p class="text-sm text-secondary">
          Download a quantized GGUF model. These are optimized for CPU inference.
        </p>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div class="p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
            <h4 class="font-semibold text-sm text-green-900 dark:text-green-100">TinyLlama 1.1B ⭐</h4>
            <p class="text-xs text-secondary mb-2">~600MB, very fast</p>
            <code class="block bg-gray-800 text-gray-200 p-2 rounded text-xs break-all">
curl -L -o tinyllama.gguf https://huggingface.co/TheBloke/TinyLlama-1.1B-Chat-v1.0-GGUF/resolve/main/tinyllama-1.1b-chat-v1.0.Q4_K_M.gguf
            </code>
          </div>
          
          <div class="p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
            <h4 class="font-semibold text-sm text-blue-900 dark:text-blue-100">Llama 3.2 1B</h4>
            <p class="text-xs text-secondary mb-2">~800MB, good quality</p>
            <code class="block bg-gray-800 text-gray-200 p-2 rounded text-xs break-all">
curl -L -o llama3.2-1b.gguf https://huggingface.co/bartowski/Llama-3.2-1B-Instruct-GGUF/resolve/main/Llama-3.2-1B-Instruct-Q4_K_M.gguf
            </code>
          </div>
          
          <div class="p-3 bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg">
            <h4 class="font-semibold text-sm text-purple-900 dark:text-purple-100">Phi-3 Mini</h4>
            <p class="text-xs text-secondary mb-2">~2GB, excellent quality</p>
            <code class="block bg-gray-800 text-gray-200 p-2 rounded text-xs break-all">
curl -L -o phi3-mini.gguf https://huggingface.co/bartowski/Phi-3-mini-4k-instruct-GGUF/resolve/main/Phi-3-mini-4k-instruct-Q4_K_M.gguf
            </code>
          </div>
        </div>

        <div class="info-box-yellow">
          <p class="text-sm text-yellow-800 dark:text-yellow-200">
            <strong>💡 Understanding GGUF suffixes:</strong> <code class="bg-gray-100 dark:bg-gray-700 px-1">Q4_K_M</code> = 4-bit quantization. Lower bits = smaller file, slightly lower quality. Q4 is a good balance.
          </p>
        </div>
      </div>
    </div>

    <!-- Step 3: Run with Your Data -->
    <div class="card mb-6">
      <h2 class="text-xl font-semibold mb-4 flex items-center gap-2">
        <span class="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">3</span>
        Run with Your Training Data
      </h2>

      <div class="space-y-4">
        <p class="text-sm text-secondary">
          Load your training data as a system prompt so the model learns from your examples:
        </p>

        <div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
          <p class="text-sm font-medium mb-2">Basic usage:</p>
          <code class="block bg-gray-800 text-gray-200 p-3 rounded text-sm">
llama-cli -m tinyllama.gguf \
  --system-prompt "Use these examples to guide your responses: [YOUR DATA]" \
  -p "How do I reverse a string in Python?"
          </code>
        </div>

        <div class="info-box-green">
          <h4 class="font-semibold text-green-900 dark:text-green-100 mb-2">✅ Easier Method: Load from File</h4>
          <p class="text-sm text-secondary mb-2">
            Put your training examples in a text file and load it:
          </p>
          <code class="block bg-gray-800 text-gray-200 p-3 rounded text-sm">
llama-cli -m tinyllama.gguf \
  --system-prompt-file training-data.txt \
  -p "How do I reverse a string in Python?"
          </code>
        </div>

        <div class="info-box-blue">
          <h4 class="font-semibold text-blue-900 dark:text-blue-100 mb-2">📝 Create training-data.txt</h4>
          <p class="text-sm text-secondary mb-2">
            Format your edukaAI data as readable examples:
          </p>
          <code class="block bg-gray-800 text-gray-200 p-3 rounded text-sm">
Example 1:<br>
Question: How do I reverse a string in Python?<br>
Answer: You can use slicing: my_string[::-1]<br><br>
Example 2:<br>
Question: Explain photosynthesis<br>
Answer: Plants convert sunlight into energy...<br><br>
[Add more examples from your dataset]
          </code>
        </div>
      </div>
    </div>

    <!-- Step 4: Interactive Mode -->
    <div class="card mb-6">
      <h2 class="text-xl font-semibold mb-4 flex items-center gap-2">
        <span class="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">4</span>
        Interactive Chat Mode
      </h2>

      <div class="space-y-4">
        <p class="text-sm text-secondary">
          Start an interactive session where you can chat with your model:
        </p>

        <div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
          <code class="block bg-gray-800 text-gray-200 p-3 rounded text-sm">
llama-cli -m tinyllama.gguf \
  --system-prompt-file training-data.txt \
  -cnv \
  --color
          </code>
        </div>

        <div class="info-box-purple">
          <h4 class="font-semibold text-purple-900 dark:text-purple-100 mb-2">⚙️ Useful Options</h4>
          <ul class="text-sm text-secondary space-y-1">
            <li>• <code class="bg-gray-100 dark:bg-gray-700 px-1">-cnv</code> or <code class="bg-gray-100 dark:bg-gray-700 px-1">--conversation</code> - Interactive mode</li>
            <li>• <code class="bg-gray-100 dark:bg-gray-700 px-1">--color</code> - Syntax highlighting</li>
            <li>• <code class="bg-gray-100 dark:bg-gray-700 px-1">-c 4096</code> - Set context size (default: 512)</li>
            <li>• <code class="bg-gray-100 dark:bg-gray-700 px-1">-n 256</code> - Max tokens to generate</li>
            <li>• <code class="bg-gray-100 dark:bg-gray-700 px-1">--temp 0.7</code> - Temperature (creativity)</li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Step 5: Advanced Usage -->
    <div class="card mb-6">
      <h2 class="text-xl font-semibold mb-4 flex items-center gap-2">
        <span class="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">5</span>
        Advanced: Server Mode
      </h2>

      <div class="space-y-4">
        <p class="text-sm text-secondary">
          Run llama.cpp as an API server for use in applications:
        </p>

        <div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
          <p class="text-sm font-medium mb-2">Start the server:</p>
          <code class="block bg-gray-800 text-gray-200 p-3 rounded text-sm">
llama-server -m tinyllama.gguf \
  --system-prompt-file training-data.txt \
  --port 8080
          </code>
        </div>

        <div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
          <p class="text-sm font-medium mb-2">Query the API:</p>
          <code class="block bg-gray-800 text-gray-200 p-3 rounded text-sm">
curl http://localhost:8080/completion \
  -H "Content-Type: application/json" \
  -d '{"prompt": "How do I reverse a string?"}'
          </code>
        </div>

        <div class="info-box-green">
          <p class="text-sm text-green-800 dark:text-green-200">
            <strong>✅ OpenAI-compatible:</strong> The server provides an OpenAI API-compatible endpoint at <code class="bg-gray-100 dark:bg-gray-700 px-1">/v1/chat/completions</code>
          </p>
        </div>
      </div>
    </div>

    <!-- Tips -->
    <div class="card mb-6 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20">
      <h2 class="text-xl font-semibold mb-4">💡 Optimization Tips</h2>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
        <div class="space-y-2">
          <div class="p-3 bg-white dark:bg-gray-800 rounded-lg">
            <p class="font-semibold">🚀 Speed Up Inference</p>
            <p class="text-secondary">Add <code class="bg-gray-100 dark:bg-gray-700 px-1">-t 4</code> to use 4 CPU threads</p>
          </div>
          <div class="p-3 bg-white dark:bg-gray-800 rounded-lg">
            <p class="font-semibold">💾 Reduce Memory</p>
            <p class="text-secondary">Use <code class="bg-gray-100 dark:bg-gray-700 px-1">--mlock</code> to lock model in RAM (faster)</p>
          </div>
        </div>
        <div class="space-y-2">
          <div class="p-3 bg-white dark:bg-gray-800 rounded-lg">
            <p class="font-semibold">🎯 Better Context</p>
            <p class="text-secondary">Increase with <code class="bg-gray-100 dark:bg-gray-700 px-1">-c 4096</code> for larger training data</p>
          </div>
          <div class="p-3 bg-white dark:bg-gray-800 rounded-lg">
            <p class="font-semibold">📏 Smaller Models</p>
            <p class="text-secondary">Use 1B-3B parameter models for CPU efficiency</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Comparison -->
    <div class="card mb-6">
      <h2 class="text-xl font-semibold mb-4">⚖️ llama.cpp vs Other Methods</h2>
      
      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead>
            <tr class="bg-gray-50 dark:bg-gray-800">
              <th class="text-left p-3">Feature</th>
              <th class="text-left p-3">llama.cpp</th>
              <th class="text-left p-3">Ollama</th>
              <th class="text-left p-3">Axolotl</th>
            </tr>
          </thead>
          <tbody class="divide-y dark:divide-gray-700">
            <tr>
              <td class="p-3 font-medium">GPU Required</td>
              <td class="p-3 text-green-600 dark:text-green-400">No ❌</td>
              <td class="p-3 text-green-600 dark:text-green-400">No ❌</td>
              <td class="p-3 text-yellow-600 dark:text-yellow-400">Recommended ⚠️</td>
            </tr>
            <tr>
              <td class="p-3 font-medium">Training Time</td>
              <td class="p-3 text-green-600 dark:text-green-400">Instant ⚡</td>
              <td class="p-3 text-green-600 dark:text-green-400">Instant ⚡</td>
              <td class="p-3">Minutes/Hours ⏱️</td>
            </tr>
            <tr>
              <td class="p-3 font-medium">True Fine-Tuning</td>
              <td class="p-3 text-red-600 dark:text-red-400">No ❌</td>
              <td class="p-3 text-red-600 dark:text-red-400">No ❌</td>
              <td class="p-3 text-green-600 dark:text-green-400">Yes ✅</td>
            </tr>
            <tr>
              <td class="p-3 font-medium">CPU Performance</td>
              <td class="p-3 text-green-600 dark:text-green-400">Excellent ⭐</td>
              <td class="p-3 text-green-600 dark:text-green-400">Good ✅</td>
              <td class="p-3">Slow ❌</td>
            </tr>
            <tr>
              <td class="p-3 font-medium">Ease of Use</td>
              <td class="p-3 text-yellow-600 dark:text-yellow-400">CLI Only ⚠️</td>
              <td class="p-3 text-green-600 dark:text-green-400">Easy ✅</td>
              <td class="p-3 text-yellow-600 dark:text-yellow-400">Setup Required ⚠️</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Next Steps -->
    <div class="flex justify-between">
      <NuxtLink to="/fine-tuning" class="btn-secondary">
        ← All Methods
      </NuxtLink>
      <NuxtLink to="/samples" class="btn-primary">
        Create More Samples →
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'default'
})
</script>
