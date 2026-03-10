<template>
  <div class="max-w-6xl mx-auto pb-20">
    <!-- Breadcrumb -->
    <div class="text-sm text-tertiary mb-6">
      <NuxtLink to="/docs" class="hover:text-blue-600">← Back to Documentation</NuxtLink>
    </div>

    <div v-if="term" class="mb-12">
      <div class="flex items-center gap-3 mb-4">
        <span class="text-4xl">{{ term.emoji }}</span>
        <h1 class="text-4xl font-bold">{{ term.word }}</h1>
      </div>

      <div class="card mb-6">
        <h2 class="text-lg font-semibold mb-3 text-blue-700">Quick Definition</h2>
        <p class="text-lg text-gray-700">{{ term.shortDefinition }}</p>
      </div>

      <div class="card">
        <h2 class="text-lg font-semibold mb-4 text-blue-700">Detailed Explanation</h2>
        <div class="prose max-w-none text-gray-700" v-html="term.detailedExplanation"></div>

        <div v-if="term.example" class="mt-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <h3 class="font-medium mb-2">💡 Example</h3>
          <p class="text-sm text-gray-700">{{ term.example }}</p>
        </div>

        <div v-if="term.seeAlso && term.seeAlso.length" class="mt-6 pt-6 border-t">
          <h3 class="font-medium mb-2">🔗 See Also</h3>
          <div class="flex flex-wrap gap-2">
            <NuxtLink
              v-for="related in term.seeAlso"
              :key="related"
              :to="`/help/glossary?term=${related}`"
              class="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm hover:bg-blue-200 transition-colors"
            >
              {{ getTermTitle(related) }}
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="text-center py-12">
      <p class="text-tertiary">Select a term from the glossary</p>
      <NuxtLink to="/docs" class="btn-primary mt-4 inline-block">Back to Documentation</NuxtLink>
    </div>
  </div>
</template>

<script setup>
  const route = useRoute();

  const glossaryTerms = {
    "base-model": {
      emoji: "🏗️",
      word: "Base Model",
      shortDefinition:
        "The pre-trained LLM you start with before fine-tuning (e.g., GPT-4, Llama 2, Mistral).",
      detailedExplanation: `
      <p class="mb-4">A <strong>base model</strong> (also called a "foundation model" or "pre-trained model") is the starting point for fine-tuning. It's an LLM that has already been trained on massive amounts of text data (often trillions of tokens from books, websites, and documents).</p>
      
      <h3 class="text-lg font-semibold mt-6 mb-3">Key Characteristics:</h3>
      <ul class="list-disc list-inside space-y-2 mb-4">
        <li>Knows general language patterns, grammar, and facts</li>
        <li>Can answer general questions and write coherent text</li>
        <li>Hasn't been specialized for any specific domain</li>
        <li>Expensive and time-consuming to train from scratch (weeks, millions of dollars)</li>
        <li>Usually released openly (open source) or via API (closed source)</li>
      </ul>

      <h3 class="text-lg font-semibold mt-6 mb-3">Popular Base Models:</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
        <div class="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <strong class="text-blue-700">Llama 2 (Meta)</strong>
          <p class="text-sm text-secondary mt-1">Open source, 7B-70B parameters, great for fine-tuning</p>
        </div>
        <div class="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <strong class="text-blue-700">Mistral</strong>
          <p class="text-sm text-secondary mt-1">Open source, very efficient, good performance</p>
        </div>
        <div class="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <strong class="text-blue-700">GPT-3.5 (OpenAI)</strong>
          <p class="text-sm text-secondary mt-1">Closed source, available via fine-tuning API</p>
        </div>
        <div class="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <strong class="text-blue-700">Falcon</strong>
          <p class="text-sm text-secondary mt-1">Open source, trained on high-quality data</p>
        </div>
      </div>

      <h3 class="text-lg font-semibold mt-6 mb-3">Why Base Models Matter:</h3>
      <p class="mb-4">When you fine-tune, you're leveraging all the knowledge the base model learned during its expensive pre-training. You're teaching it your specific domain while preserving its general capabilities. A good base model means less work for you and better results.</p>

      <div class="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg mt-6">
        <strong class="text-yellow-800">💡 Pro Tip:</strong>
        <p class="text-sm text-yellow-700 mt-1">For beginners, start with Llama 2 (7B or 13B parameters). They're free, well-documented, and perfect for learning. As you get more experienced, you can experiment with larger models.</p>
      </div>
    `,
      example:
        "You download Llama 2 7B (an open-source base model) and fine-tune it on 1000 examples of customer support conversations. Now it specializes in helping customers while retaining its general language abilities.",
      seeAlso: ["fine-tuning", "parameters", "training"],
    },
    dataset: {
      emoji: "📊",
      word: "Dataset",
      shortDefinition: "A collection of training examples used to teach the AI specific tasks.",
      detailedExplanation: `
      <p class="mb-4">A <strong>dataset</strong> is the fuel that powers fine-tuning. It's a structured collection of examples showing the model what you want it to learn. Each example contains an input (instruction) and the desired output (response).</p>
      
      <h3 class="text-lg font-semibold mt-6 mb-3">Dataset Structure:</h3>
      <div class="bg-gray-50 p-4 rounded-lg mb-4">
        <p class="font-mono text-sm mb-2">Example format:</p>
        <div class="space-y-2 text-sm">
          <div class="p-2 bg-white rounded border-l-4 border-blue-500">
            <strong>Instruction:</strong> "How do I reverse a list in Python?"
          </div>
          <div class="p-2 bg-white rounded border-l-4 border-green-500">
            <strong>Output:</strong> "You can use list slicing: my_list[::-1] or the reversed() function."
          </div>
        </div>
      </div>

      <h3 class="text-lg font-semibold mt-6 mb-3">What Makes a Good Dataset:</h3>
      <ul class="list-disc list-inside space-y-2 mb-4">
        <li><strong>Quality over quantity</strong> — 100 excellent examples beat 1000 mediocre ones</li>
        <li><strong>Diversity</strong> — Cover different question types, formats, and edge cases</li>
        <li><strong>Consistency</strong> — Similar tone and style across examples</li>
        <li><strong>Accuracy</strong> — Factually correct information</li>
        <li><strong>Completeness</strong> — Examples should fully answer the question</li>
      </ul>

      <h3 class="text-lg font-semibold mt-6 mb-3">Dataset Size Guidelines:</h3>
      <table class="w-full text-sm mb-4">
        <thead>
          <tr class="border-b">
            <th class="text-left py-2">Size</th>
            <th class="text-left py-2">Use Case</th>
            <th class="text-left py-2">Expected Results</th>
          </tr>
        </thead>
        <tbody>
          <tr class="border-b">
            <td class="py-2">100 examples</td>
            <td>Testing/prototyping</td>
            <td>Minimal viable dataset</td>
          </tr>
          <tr class="border-b">
            <td class="py-2">500 examples</td>
            <td>Simple tasks</td>
            <td>Noticeable improvement</td>
          </tr>
          <tr class="border-b">
            <td class="py-2">1000 examples</td>
            <td>Most use cases</td>
            <td>Significant improvement</td>
          </tr>
          <tr>
            <td class="py-2">5000+ examples</td>
            <td>Professional use</td>
            <td>High-quality specialized model</td>
          </tr>
        </tbody>
      </table>

      <div class="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg mt-6">
        <strong class="text-blue-800">🎯 The 1000 Example Milestone:</strong>
        <p class="text-sm text-blue-700 mt-1">This is the sweet spot for beginners. It's enough data for the model to learn patterns, but not so much that training takes forever. At 20-30 examples per day, you'll reach this in 2-3 months.</p>
      </div>
    `,
      example:
        "You collect 1000 examples of customer service conversations. Each example shows a customer question and the ideal support agent response. This becomes your training dataset.",
      seeAlso: ["training-example", "fine-tuning", "training"],
    },
    epoch: {
      emoji: "🔄",
      word: "Epoch",
      shortDefinition: "One complete pass through the entire dataset during training.",
      detailedExplanation: `
      <p class="mb-4">An <strong>epoch</strong> is when the model has seen every example in your dataset exactly once. Think of it like reading a textbook cover to cover — one epoch is one complete read-through.</p>

      <h3 class="text-lg font-semibold mt-6 mb-3">Why Multiple Epochs?</h3>
      <p class="mb-4">Just like you don't fully understand a textbook after one reading, the model doesn't fully learn from one epoch. Multiple passes help it:</p>
      <ul class="list-disc list-inside space-y-2 mb-4">
        <li>Reinforce patterns it learned</li>
        <li>Pick up on subtle details missed the first time</li>
        <li>Build stronger associations between concepts</li>
        <li>Gradually improve its predictions</li>
      </ul>

      <h3 class="text-lg font-semibold mt-6 mb-3">Typical Epoch Counts:</h3>
      <div class="space-y-2 mb-4">
        <div class="flex justify-between items-center p-2 bg-gray-50 rounded">
          <span>Pre-training (from scratch)</span>
          <span class="font-mono">1-3 epochs</span>
        </div>
        <div class="flex justify-between items-center p-2 bg-gray-50 rounded">
          <span>Fine-tuning (medium dataset)</span>
          <span class="font-mono">3-10 epochs</span>
        </div>
        <div class="flex justify-between items-center p-2 bg-gray-50 rounded">
          <span>Fine-tuning (small dataset)</span>
          <span class="font-mono">10-30 epochs</span>
        </div>
      </div>

      <h3 class="text-lg font-semibold mt-6 mb-3">The Trade-off:</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div class="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200">
          <strong class="text-green-700">More Epochs ✅</strong>
          <ul class="text-sm text-gray-700 mt-2 space-y-1">
            <li>Better learning</li>
            <li>Stronger patterns</li>
            <li>Higher accuracy</li>
          </ul>
        </div>
        <div class="p-3 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200">
          <strong class="text-red-700">Too Many Epochs ❌</strong>
          <ul class="text-sm text-gray-700 mt-2 space-y-1">
            <li>Overfitting (memorization)</li>
            <li>Longer training time</li>
            <li>Higher cost</li>
          </ul>
        </div>
      </div>

      <div class="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg mt-6">
        <strong class="text-yellow-800">⚠️ Overfitting Warning:</strong>
        <p class="text-sm text-yellow-700 mt-1">If you train for too many epochs on a small dataset, the model might memorize the examples instead of learning the underlying patterns. It will perform perfectly on training data but fail on new inputs. This is why validation sets are important!</p>
      </div>
    `,
      example:
        "You have 1000 training examples. After 1 epoch, the model has seen each example once. After 3 epochs, it has seen them all three times. Most fine-tuning jobs use 3-10 epochs.",
      seeAlso: ["training", "fine-tuning", "overfitting"],
    },
    "fine-tuning": {
      emoji: "🎓",
      word: "Fine-Tuning",
      shortDefinition:
        "Training a pre-trained model on a specific dataset to improve performance on particular tasks.",
      detailedExplanation: `
      <p class="mb-4"><strong>Fine-tuning</strong> is the process of taking a pre-trained LLM (which knows general language and facts) and teaching it to be better at your specific task or domain. It's like giving a college graduate specialized job training.</p>

      <h3 class="text-lg font-semibold mt-6 mb-3">The Fine-Tuning Process:</h3>
      <div class="space-y-4 mb-6">
        <div class="flex items-start gap-3">
          <div class="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">1</div>
          <div>
            <strong>Start with Base Model</strong>
            <p class="text-sm text-secondary">You begin with a pre-trained model like Llama 2 or GPT-3.5</p>
          </div>
        </div>
        <div class="flex items-start gap-3">
          <div class="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">2</div>
          <div>
            <strong>Prepare Dataset</strong>
            <p class="text-sm text-secondary">Collect 100-10000 examples of your specific task</p>
          </div>
        </div>
        <div class="flex items-start gap-3">
          <div class="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">3</div>
          <div>
            <strong>Continue Training</strong>
            <p class="text-sm text-secondary">Train the model on your dataset for several epochs</p>
          </div>
        </div>
        <div class="flex items-start gap-3">
          <div class="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">4</div>
          <div>
            <strong>Deploy & Use</strong>
            <p class="text-sm text-secondary">Your model now specializes in your domain</p>
          </div>
        </div>
      </div>

      <h3 class="text-lg font-semibold mt-6 mb-3">Benefits of Fine-Tuning:</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div class="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
          <strong class="text-green-700">✅ Better Performance</strong>
          <p class="text-sm text-secondary mt-1">Expert-level responses in your specific domain</p>
        </div>
        <div class="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <strong class="text-blue-700">✅ Lower Costs</strong>
          <p class="text-sm text-secondary mt-1">Smaller fine-tuned models can beat larger general models</p>
        </div>
        <div class="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
          <strong class="text-purple-700">✅ Consistent Style</strong>
          <p class="text-sm text-secondary mt-1">Train your brand voice and tone</p>
        </div>
        <div class="p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
          <strong class="text-orange-700">✅ Privacy</strong>
          <p class="text-sm text-secondary mt-1">Run on your own infrastructure, no API calls</p>
        </div>
      </div>

      <h3 class="text-lg font-semibold mt-6 mb-3">Fine-Tuning vs. Pre-training:</h3>
      <table class="w-full text-sm mb-4">
        <thead>
          <tr class="border-b">
            <th class="text-left py-2">Aspect</th>
            <th class="text-left py-2">Pre-training</th>
            <th class="text-left py-2">Fine-tuning</th>
          </tr>
        </thead>
        <tbody>
          <tr class="border-b">
            <td class="py-2">Data needed</td>
            <td class="py-2">Trillions of tokens</td>
            <td class="py-2">Thousands to millions</td>
          </tr>
          <tr class="border-b">
            <td class="py-2">Time required</td>
            <td class="py-2">Weeks/months</td>
            <td class="py-2">Hours to days</td>
          </tr>
          <tr class="border-b">
            <td class="py-2">Cost</td>
            <td class="py-2">Millions of dollars</td>
            <td class="py-2">$10-$1000</td>
          </tr>
          <tr>
            <td class="py-2">Result</td>
            <td class="py-2">General knowledge</td>
            <td class="py-2">Domain expertise</td>
          </tr>
        </tbody>
      </table>

      <div class="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg mt-6">
        <strong class="text-green-800">🎯 Perfect for Beginners:</strong>
        <p class="text-sm text-green-700 mt-1">Fine-tuning is why edukaAI exists. Instead of training from scratch (impossible for individuals), you leverage pre-trained models and just teach them your specialty. It's affordable, fast, and achievable!</p>
      </div>
    `,
      example:
        "You take Llama 2 (general model) and fine-tune it on 1000 customer support conversations. Now it understands your products, tone, and common issues, while retaining its general language abilities.",
      seeAlso: ["base-model", "training", "dataset", "training-example"],
    },
  };

  const termId = route.query.term;
  const term = computed(() => glossaryTerms[termId]);

  const getTermTitle = (id) => {
    return glossaryTerms[id]?.word || id;
  };
</script>
