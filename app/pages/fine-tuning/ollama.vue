<template>
  <div class="max-w-6xl mx-auto">
    <div class="mb-8">
      <div class="flex items-center gap-2 mb-2">
        <NuxtLink to="/fine-tuning" class="text-blue-600 hover:underline text-sm"
          >← All Methods</NuxtLink
        >
      </div>
      <h1 class="text-3xl font-bold mb-2 flex items-center gap-3">
        <span class="text-4xl">🦙</span>
        Fine-Tune with Ollama
      </h1>
      <p class="text-secondary">
        Create custom Ollama models by embedding your training data in the system prompt. No actual
        training required - perfect for quick testing!
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
              Export your dataset in any format from the Export page. Ollama works with the raw
              JSON.
            </p>
            <NuxtLink to="/export" class="text-blue-600 hover:underline text-sm"
              >Go to Export →</NuxtLink
            >
          </div>
        </div>

        <div class="flex items-start gap-3">
          <span class="text-xl">💻</span>
          <div>
            <h3 class="font-semibold">2. Ollama Installed</h3>
            <p class="text-sm text-secondary mb-2">
              Ollama must be installed and running on your machine.
            </p>
            <a
              href="https://ollama.com"
              target="_blank"
              class="text-blue-600 hover:underline text-sm"
              >Download from ollama.com →</a
            >
          </div>
        </div>
      </div>
    </div>

    <!-- What is Ollama Method -->
    <div class="card mb-6 bg-blue-50 dark:bg-blue-900/20">
      <h2 class="text-xl font-semibold mb-4">💡 How This Works</h2>
      <p class="text-sm text-secondary mb-3">
        Unlike other methods that train model weights, Ollama uses a <strong>Modelfile</strong> to
        embed your training examples directly in the system prompt. The model learns patterns from
        your examples without any training time!
      </p>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
        <div class="p-3 bg-white dark:bg-gray-800 rounded-lg">
          <p class="font-semibold text-green-700 dark:text-green-400">✅ Pros</p>
          <ul class="text-secondary mt-1 space-y-1">
            <li>• Instant - no waiting</li>
            <li>• No GPU required</li>
            <li>• Works on any computer</li>
            <li>• Easy to update data</li>
          </ul>
        </div>
        <div class="p-3 bg-white dark:bg-gray-800 rounded-lg">
          <p class="font-semibold text-red-700 dark:text-red-400">⚠️ Cons</p>
          <ul class="text-secondary mt-1 space-y-1">
            <li>• Limited by context size</li>
            <li>• Not true fine-tuning</li>
            <li>• Best with small datasets</li>
          </ul>
        </div>
        <div class="p-3 bg-white dark:bg-gray-800 rounded-lg">
          <p class="font-semibold text-blue-700 dark:text-blue-400">🎯 Best For</p>
          <ul class="text-secondary mt-1 space-y-1">
            <li>• Quick testing</li>
            <li>• Prototyping</li>
            <li>• 5-50 examples</li>
            <li>• Pattern-based tasks</li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Step 1: Install Ollama -->
    <div class="card mb-6">
      <h2 class="text-xl font-semibold mb-4 flex items-center gap-2">
        <span
          class="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold"
          >1</span
        >
        Install Ollama
      </h2>

      <div class="space-y-4">
        <div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
          <p class="text-sm text-secondary mb-2">Quick install (macOS/Linux):</p>
          <code class="block bg-gray-800 text-gray-200 p-3 rounded text-sm">
            curl -fsSL https://ollama.com/install.sh | sh
          </code>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div class="p-3 bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-lg">
            <p class="font-semibold text-sm mb-1">🍎 macOS</p>
            <p class="text-xs text-secondary">Download .dmg from ollama.com</p>
          </div>
          <div class="p-3 bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-lg">
            <p class="font-semibold text-sm mb-1">🪟 Windows</p>
            <p class="text-xs text-secondary">Download installer from ollama.com</p>
          </div>
        </div>

        <div class="text-sm text-secondary">
          <p class="font-medium">Verify installation:</p>
          <code class="block bg-gray-800 text-gray-200 p-3 rounded text-sm mt-2">
            ollama --version
          </code>
        </div>
      </div>
    </div>

    <!-- Step 2: Pull Base Model -->
    <div class="card mb-6">
      <h2 class="text-xl font-semibold mb-4 flex items-center gap-2">
        <span
          class="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold"
          >2</span
        >
        Pull a Base Model
      </h2>

      <div class="space-y-4">
        <p class="text-sm text-secondary">
          Choose a small, fast model. Your training data will be embedded in its system prompt.
        </p>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div
            class="p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg"
          >
            <h4 class="font-semibold text-sm text-green-900 dark:text-green-100">llama3.2:1b ⭐</h4>
            <p class="text-xs text-secondary mb-2">Fastest, smallest</p>
            <code class="block bg-gray-800 text-gray-200 p-2 rounded text-xs">
              ollama pull llama3.2:1b
            </code>
          </div>

          <div
            class="p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg"
          >
            <h4 class="font-semibold text-sm text-blue-900 dark:text-blue-100">phi3:mini</h4>
            <p class="text-xs text-secondary mb-2">Good quality, fast</p>
            <code class="block bg-gray-800 text-gray-200 p-2 rounded text-xs">
              ollama pull phi3:mini
            </code>
          </div>

          <div
            class="p-3 bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg"
          >
            <h4 class="font-semibold text-sm text-purple-900 dark:text-purple-100">mistral:7b</h4>
            <p class="text-xs text-secondary mb-2">Higher quality</p>
            <code class="block bg-gray-800 text-gray-200 p-2 rounded text-xs">
              ollama pull mistral:7b
            </code>
          </div>
        </div>

        <div class="info-box-yellow">
          <p class="text-sm text-yellow-800 dark:text-yellow-200">
            <strong>💡 Tip:</strong> Smaller models (1B-3B) work better with this method because
            they have more room in their context window for your training data.
          </p>
        </div>
      </div>
    </div>

    <!-- Step 3: Create Modelfile -->
    <div class="card mb-6">
      <h2 class="text-xl font-semibold mb-4 flex items-center gap-2">
        <span
          class="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold"
          >3</span
        >
        Create a Modelfile
      </h2>

      <div class="space-y-4">
        <p class="text-sm text-secondary">
          The Modelfile embeds your training data into the model's system prompt. Create this file
          in the same folder as your exported JSON.
        </p>

        <div class="bg-gray-800 text-gray-200 p-4 rounded-lg overflow-x-auto">
          <p class="text-sm mb-2 text-gray-400"># Save as 'Modelfile' (no extension)</p>
          <pre class="text-sm"><code>FROM llama3.2:1b

SYSTEM """You are a helpful assistant trained on specific examples. Use the following training data to guide your responses:

[PASTE YOUR EXPORTED JSON CONTENT HERE]

Answer questions based on patterns from the training examples above. Be helpful, accurate, and follow the style shown in the examples."""

PARAMETER temperature 0.7
PARAMETER top_p 0.9</code></pre>
        </div>

        <div class="info-box-blue">
          <h4 class="font-semibold text-blue-900 dark:text-blue-100 mb-2">
            📋 How to Paste Your Data
          </h4>
          <ol class="text-sm text-secondary space-y-2 ml-4">
            <li>1. Open your exported JSON file</li>
            <li>2. Select all content (Ctrl+A)</li>
            <li>3. Copy (Ctrl+C)</li>
            <li>4. Open your Modelfile</li>
            <li>
              5. Replace
              <code class="bg-gray-100 dark:bg-gray-700 px-1"
                >[PASTE YOUR EXPORTED JSON CONTENT HERE]</code
              >
              with the copied content
            </li>
          </ol>
        </div>

        <div class="info-box-red">
          <p class="text-sm text-red-800 dark:text-red-200">
            <strong>⚠️ Size Warning:</strong> Keep your training data under ~4000 tokens (roughly
            3000 words). If your data is too large, the model may ignore parts of it.
          </p>
        </div>
      </div>
    </div>

    <!-- Step 4: Create Model -->
    <div class="card mb-6">
      <h2 class="text-xl font-semibold mb-4 flex items-center gap-2">
        <span
          class="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold"
          >4</span
        >
        Create Your Custom Model
      </h2>

      <div class="space-y-4">
        <p class="text-sm text-secondary">Run this command in the same folder as your Modelfile:</p>

        <div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
          <code class="block bg-gray-800 text-gray-200 p-3 rounded text-sm">
            ollama create my-custom-model -f Modelfile
          </code>
        </div>

        <div class="info-box-green">
          <h4 class="font-semibold text-green-900 dark:text-green-100 mb-2">✅ What Happens</h4>
          <ul class="text-sm text-secondary space-y-1">
            <li>• Ollama reads your Modelfile</li>
            <li>• Embeds your training data as system instructions</li>
            <li>• Creates a new model named "my-custom-model"</li>
            <li>• Ready to use instantly!</li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Step 5: Test -->
    <div class="card mb-6">
      <h2 class="text-xl font-semibold mb-4 flex items-center gap-2">
        <span
          class="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold"
          >5</span
        >
        Test Your Model
      </h2>

      <div class="space-y-4">
        <div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
          <p class="text-sm font-medium mb-2">Interactive chat:</p>
          <code class="block bg-gray-800 text-gray-200 p-3 rounded text-sm">
            ollama run my-custom-model
          </code>
        </div>

        <div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
          <p class="text-sm font-medium mb-2">Single prompt:</p>
          <code class="block bg-gray-800 text-gray-200 p-3 rounded text-sm">
            ollama run my-custom-model "How do I reverse a string in Python?"
          </code>
        </div>

        <div class="info-box-yellow">
          <h4 class="font-semibold text-yellow-900 dark:text-yellow-100 mb-2">🧪 Test Prompts</h4>
          <p class="text-sm text-secondary mb-2">Try questions similar to your training data:</p>
          <ul class="text-sm text-secondary space-y-1 ml-4">
            <li>• "How do I reverse a string in Python?"</li>
            <li>• "Explain photosynthesis simply"</li>
            <li>• "What's the difference between let and const?"</li>
            <li>• "Write a function to check if a number is prime"</li>
          </ul>
        </div>

        <div class="info-box-purple">
          <h4 class="font-semibold text-purple-900 dark:text-purple-100 mb-2">
            🔍 Check if it's Working
          </h4>
          <p class="text-sm text-secondary">
            If the model responds with patterns from your training examples (similar explanations,
            code style, or terminology), it's working!
          </p>
        </div>
      </div>
    </div>

    <!-- Step 6: Use in Apps -->
    <div class="card mb-6">
      <h2 class="text-xl font-semibold mb-4 flex items-center gap-2">
        <span
          class="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold"
          >6</span
        >
        Use Your Model in Applications
      </h2>

      <div class="space-y-4">
        <p class="text-sm text-secondary">
          Ollama provides an OpenAI-compatible API. Your model is available at
          <code class="bg-gray-100 dark:bg-gray-700 px-1">http://localhost:11434</code>
        </p>

        <div class="bg-gray-800 text-gray-200 p-4 rounded-lg overflow-x-auto">
          <p class="text-sm mb-2 text-gray-400"># Python example</p>
          <pre class="text-sm"><code>import requests

response = requests.post('http://localhost:11434/api/generate', json={
    'model': 'my-custom-model',
    'prompt': 'How do I reverse a string in Python?',
    'stream': False
})

print(response.json()['response'])</code></pre>
        </div>

        <div class="bg-gray-800 text-gray-200 p-4 rounded-lg overflow-x-auto">
          <p class="text-sm mb-2 text-gray-400"># JavaScript/TypeScript example</p>
          <pre
            class="text-sm"
          ><code>const response = await fetch('http://localhost:11434/api/generate', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    model: 'my-custom-model',
    prompt: 'How do I reverse a string in Python?',
    stream: false
  })
});

const data = await response.json();
console.log(data.response);</code></pre>
        </div>

        <div class="info-box-green">
          <h4 class="font-semibold text-green-900 dark:text-green-100 mb-2">
            🌐 OpenAI Compatibility
          </h4>
          <p class="text-sm text-secondary mb-2">
            Ollama also supports the OpenAI API format for easy integration:
          </p>
          <code class="block bg-gray-800 text-gray-200 p-3 rounded text-sm">
            curl http://localhost:11434/v1/chat/completions \ -H "Content-Type: application/json" \
            -d '{"model": "my-custom-model", "messages": [{"role": "user", "content": "Hello!"}]}'
          </code>
        </div>
      </div>
    </div>

    <!-- Tips -->
    <div
      class="card mb-6 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20"
    >
      <h2 class="text-xl font-semibold mb-4">💡 Pro Tips</h2>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
        <div class="space-y-2">
          <div class="p-3 bg-white dark:bg-gray-800 rounded-lg">
            <p class="font-semibold">📏 Keep Data Small</p>
            <p class="text-secondary">Under 50 examples (or ~4000 tokens) for best results</p>
          </div>
          <div class="p-3 bg-white dark:bg-gray-800 rounded-lg">
            <p class="font-semibold">🔄 Easy Updates</p>
            <p class="text-secondary">
              Just edit Modelfile and run
              <code class="bg-gray-100 dark:bg-gray-700 px-1">ollama create</code> again
            </p>
          </div>
        </div>
        <div class="space-y-2">
          <div class="p-3 bg-white dark:bg-gray-800 rounded-lg">
            <p class="font-semibold">🎯 Use Similar Examples</p>
            <p class="text-secondary">Group related examples together in your data</p>
          </div>
          <div class="p-3 bg-white dark:bg-gray-800 rounded-lg">
            <p class="font-semibold">📚 Use Small Models</p>
            <p class="text-secondary">1B-3B models work better than 7B+ for this method</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Comparison -->
    <div class="card mb-6">
      <h2 class="text-xl font-semibold mb-4">⚖️ Ollama vs True Fine-Tuning</h2>

      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead>
            <tr class="bg-gray-50 dark:bg-gray-800">
              <th class="text-left p-3">Aspect</th>
              <th class="text-left p-3">Ollama Method</th>
              <th class="text-left p-3">Axolotl/LoRA</th>
            </tr>
          </thead>
          <tbody class="divide-y dark:divide-gray-700">
            <tr>
              <td class="p-3 font-medium">Training Time</td>
              <td class="p-3 text-green-600 dark:text-green-400">Instant</td>
              <td class="p-3">Minutes to hours</td>
            </tr>
            <tr>
              <td class="p-3 font-medium">Data Size Limit</td>
              <td class="p-3 text-yellow-600 dark:text-yellow-400">~4K tokens</td>
              <td class="p-3 text-green-600 dark:text-green-400">Unlimited</td>
            </tr>
            <tr>
              <td class="p-3 font-medium">GPU Required</td>
              <td class="p-3 text-green-600 dark:text-green-400">No</td>
              <td class="p-3">Recommended</td>
            </tr>
            <tr>
              <td class="p-3 font-medium">True Learning</td>
              <td class="p-3 text-red-600 dark:text-red-400">No (context only)</td>
              <td class="p-3 text-green-600 dark:text-green-400">Yes (weights update)</td>
            </tr>
            <tr>
              <td class="p-3 font-medium">Best For</td>
              <td class="p-3">Quick testing, prototyping</td>
              <td class="p-3">Production, large datasets</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Next Steps -->
    <div class="flex justify-between">
      <NuxtLink to="/fine-tuning" class="btn-secondary"> ← All Methods </NuxtLink>
      <NuxtLink to="/samples" class="btn-primary"> Create More Samples → </NuxtLink>
    </div>
  </div>
</template>

<script setup>
  definePageMeta({
    layout: "default",
  });
</script>
