<template>
  <div class="max-w-5xl mx-auto pb-20">
    <!-- Header -->
    <div
      class="text-center mb-12 py-12 bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl"
    >
      <div class="text-6xl mb-4">📚</div>
      <h1 class="text-4xl font-bold mb-4">
        The Complete Guide to LLM Fine-Tuning
      </h1>
      <p class="text-xl text-gray-600 max-w-2xl mx-auto">
        Everything you need to know to create your first training dataset and
        fine-tune your own AI model
      </p>
      <div class="mt-6 flex justify-center gap-4 text-sm">
        <span class="px-3 py-1 bg-white rounded-full shadow-sm"
          >🎯 Beginner Friendly</span
        >
        <span class="px-3 py-1 bg-white rounded-full shadow-sm"
          >📖 Step-by-Step</span
        >
        <span class="px-3 py-1 bg-white rounded-full shadow-sm"
          >💡 Practical Examples</span
        >
      </div>
    </div>

    <!-- EMPHASIZED SECTION: LLM Training Explained -->
    <div
      class="card mb-8 bg-gradient-to-r from-purple-600 to-blue-600 text-white overflow-hidden"
    >
      <div class="p-8">
        <div
          class="flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div class="flex-1">
            <div class="flex items-center gap-2 mb-3">
              <span class="px-2 py-1 bg-white/20 rounded text-xs font-semibold"
                >TECHNICAL DEEP DIVE</span
              >
            </div>
            <h2 class="text-2xl font-bold mb-3">🧠 LLM Training Explained</h2>
            <p class="text-lg text-purple-100 mb-4">
              Want to understand how AI actually works? Learn about next-token
              prediction, transformers, attention mechanisms, and how neural
              networks learn — explained for technically-minded beginners.
            </p>
            <div class="flex flex-wrap gap-2 text-sm mb-4">
              <span class="px-3 py-1 bg-white/20 rounded-full">Tokens</span>
              <span class="px-3 py-1 bg-white/20 rounded-full"
                >Neural Networks</span
              >
              <span class="px-3 py-1 bg-white/20 rounded-full"
                >Transformers</span
              >
              <span class="px-3 py-1 bg-white/20 rounded-full">Attention</span>
            </div>
            <NuxtLink
              to="/help/llm-training"
              class="inline-flex items-center gap-2 px-6 py-3 bg-white text-purple-600 rounded-lg font-semibold hover:bg-purple-50 transition-colors"
            >
              Read the Technical Guide
              <svg
                class="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                ></path>
              </svg>
            </NuxtLink>
          </div>
          <div class="hidden md:block text-6xl">🧬</div>
        </div>
      </div>
    </div>

    <!-- Table of Contents -->
    <div
      class="card mb-8 sticky top-4 z-30 bg-white/95 backdrop-blur shadow-lg"
    >
      <h2 class="text-lg font-semibold mb-4">📑 Quick Navigation</h2>
      <div class="flex flex-wrap gap-2 text-sm">
        <button @click="scrollTo('what-is-finetuning')" class="toc-btn">
          What is Fine-Tuning?
        </button>
        <button @click="scrollTo('getting-started')" class="toc-btn">
          Getting Started
        </button>
        <button @click="scrollTo('training-examples')" class="toc-btn">
          Training Examples
        </button>
        <button @click="scrollTo('field-guide')" class="toc-btn">
          Field Guide
        </button>
        <button @click="scrollTo('best-practices')" class="toc-btn">
          Best Practices
        </button>
        <button @click="scrollTo('common-mistakes')" class="toc-btn">
          Common Mistakes
        </button>
        <button @click="scrollTo('real-examples')" class="toc-btn">
          Real Examples
        </button>
        <button @click="scrollTo('faq')" class="toc-btn">FAQ</button>
        <button @click="scrollTo('glossary')" class="toc-btn">Glossary</button>
        <button
          @click="scrollTo('next-steps')"
          class="toc-btn bg-blue-600 text-white"
        >
          Start Now →
        </button>
      </div>
    </div>

    <!-- SECTION 1: What is Fine-Tuning? -->
    <section id="what-is-finetuning" class="mb-16">
      <div class="flex items-center gap-3 mb-6">
        <span class="text-3xl">🎯</span>
        <h2 class="text-2xl font-bold">What is LLM Fine-Tuning?</h2>
      </div>

      <div class="card">
        <div class="prose max-w-none">
          <p class="text-lg leading-relaxed mb-6">
            <strong>Large Language Model (LLM) Fine-Tuning</strong> is the
            process of taking a pre-trained AI model (like GPT, Claude, or
            Llama) and teaching it to be better at specific tasks by training it
            on examples of those tasks.
          </p>

          <div class="bg-blue-50 p-6 rounded-xl my-6">
            <h3 class="font-semibold text-blue-900 mb-3">🎓 Simple Analogy</h3>
            <p class="text-blue-800">
              Think of a pre-trained LLM as a student who has learned general
              knowledge from reading the entire internet. Fine-tuning is like
              giving that student specialized training in a specific
              field—teaching them to be a doctor, lawyer, or software engineer
              by showing them examples of expert work in that field.
            </p>
          </div>

          <h3 class="text-xl font-semibold mt-8 mb-4">Why Fine-Tune?</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="p-4 bg-green-50 rounded-lg border border-green-200">
              <h4 class="font-medium text-green-800 mb-2">
                ✅ Better Performance
              </h4>
              <p class="text-sm text-gray-600">
                Your model becomes an expert in YOUR specific domain, with
                better accuracy and relevance.
              </p>
            </div>
            <div class="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <h4 class="font-medium text-blue-800 mb-2">💰 Lower Costs</h4>
              <p class="text-sm text-gray-600">
                Fine-tuned smaller models can outperform larger general models
                for specific tasks.
              </p>
            </div>
            <div class="p-4 bg-purple-50 rounded-lg border border-purple-200">
              <h4 class="font-medium text-purple-800 mb-2">
                ⚡ Faster Responses
              </h4>
              <p class="text-sm text-gray-600">
                Specialized models are more efficient and respond faster.
              </p>
            </div>
            <div class="p-4 bg-orange-50 rounded-lg border border-orange-200">
              <h4 class="font-medium text-orange-800 mb-2">🔒 Privacy</h4>
              <p class="text-sm text-gray-600">
                Your data stays on your infrastructure. No need to send
                sensitive data to third-party APIs.
              </p>
            </div>
          </div>

          <h3 class="text-xl font-semibold mt-8 mb-4">
            The Fine-Tuning Process
          </h3>
          <div class="bg-gray-50 p-6 rounded-xl">
            <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div class="text-center">
                <div
                  class="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold mx-auto mb-2"
                >
                  1
                </div>
                <h4 class="font-medium">Collect Data</h4>
                <p class="text-xs text-gray-600">Gather 100-10000 examples</p>
              </div>
              <div class="text-center">
                <div
                  class="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold mx-auto mb-2"
                >
                  2
                </div>
                <h4 class="font-medium">Create Dataset</h4>
                <p class="text-xs text-gray-600">Format instruction → output</p>
              </div>
              <div class="text-center">
                <div
                  class="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold mx-auto mb-2"
                >
                  3
                </div>
                <h4 class="font-medium">Train Model</h4>
                <p class="text-xs text-gray-600">30 min to a few hours</p>
              </div>
              <div class="text-center">
                <div
                  class="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white font-bold mx-auto mb-2"
                >
                  4
                </div>
                <h4 class="font-medium">Deploy & Use</h4>
                <p class="text-xs text-gray-600">Test and go live!</p>
              </div>
            </div>
          </div>

          <div
            class="mt-8 p-6 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl border border-yellow-200"
          >
            <h3 class="font-semibold text-lg mb-3">
              🎯 The 1000 Example Milestone
            </h3>
            <p class="text-gray-700 mb-3">
              We recommend starting with
              <strong>1000 high-quality examples</strong> for your first
              fine-tuning. This is the sweet spot where most models show
              significant improvement.
            </p>
            <ul class="list-disc list-inside text-sm text-gray-600 space-y-1">
              <li>Enough data for the model to learn patterns</li>
              <li>Not so much that training takes forever</li>
              <li>
                Achievable goal for beginners (create 20-30 examples per day)
              </li>
              <li>Proven minimum for meaningful fine-tuning</li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- SECTION 2: Getting Started -->
    <section id="getting-started" class="mb-16">
      <div class="flex items-center gap-3 mb-6">
        <span class="text-3xl">🚀</span>
        <h2 class="text-2xl font-bold">Getting Started: Your First Dataset</h2>
      </div>

      <div class="card">
        <div class="space-y-8">
          <!-- Step 1 -->
          <div class="relative pl-8 border-l-2 border-blue-300">
            <div
              class="absolute -left-3 top-0 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm"
            >
              1
            </div>
            <h3 class="font-semibold text-xl mb-3">Choose Your Domain</h3>
            <p class="text-gray-600 mb-4">
              First, decide what you want your AI to be good at. The more
              specific, the better.
            </p>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div class="p-3 bg-red-50 rounded-lg border border-red-200">
                <span class="text-red-600 font-medium">❌ Too Broad:</span>
                <p class="text-sm text-gray-600 mt-1">"Help with everything"</p>
              </div>
              <div class="p-3 bg-green-50 rounded-lg border border-green-200">
                <span class="text-green-600 font-medium">✅ Good:</span>
                <p class="text-sm text-gray-600 mt-1">
                  "Help junior developers debug React code"
                </p>
              </div>
            </div>
          </div>

          <!-- Step 2 -->
          <div class="relative pl-8 border-l-2 border-blue-300">
            <div
              class="absolute -left-3 top-0 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm"
            >
              2
            </div>
            <h3 class="font-semibold text-xl mb-3">Collect Source Material</h3>
            <div class="grid grid-cols-3 gap-4">
              <div class="text-center p-4 bg-gray-50 rounded-lg">
                <div class="text-2xl mb-2">💬</div>
                <h4 class="font-medium text-sm">AI Conversations</h4>
                <p class="text-xs text-gray-600">Use Claude, GPT, Cursor</p>
              </div>
              <div class="text-center p-4 bg-gray-50 rounded-lg">
                <div class="text-2xl mb-2">📄</div>
                <h4 class="font-medium text-sm">Documentation</h4>
                <p class="text-xs text-gray-600">Convert docs to Q&A</p>
              </div>
              <div class="text-center p-4 bg-gray-50 rounded-lg">
                <div class="text-2xl mb-2">✍️</div>
                <h4 class="font-medium text-sm">Manual Creation</h4>
                <p class="text-xs text-gray-600">Write from scratch</p>
              </div>
            </div>
            <div class="mt-4 p-3 bg-blue-50 rounded-lg">
              <p class="text-sm text-blue-800">
                💡 <strong>Tip:</strong> Not sure what good data looks like?
                Check out our
                <NuxtLink
                  to="/sample-datasets"
                  class="underline hover:text-blue-600"
                  >sample datasets</NuxtLink
                >
                with real examples you can download and study!
              </p>
            </div>
          </div>

          <!-- Step 3 -->
          <div class="relative pl-8 border-l-2 border-blue-300">
            <div
              class="absolute -left-3 top-0 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm"
            >
              3
            </div>
            <h3 class="font-semibold text-xl mb-3">
              Create Your First 10 Examples
            </h3>
            <p class="text-gray-600 mb-4">
              Start small! Create 10 high-quality examples to get a feel for the
              process.
            </p>
            <div class="bg-blue-50 p-4 rounded-lg">
              <h4 class="font-medium text-blue-900 mb-2">🎯 Daily Goal</h4>
              <p class="text-blue-800">
                Aim for <strong>10-20 examples per day</strong>. At this pace,
                you'll reach 1000 examples in 2-3 months. Quality matters more
                than speed!
              </p>
            </div>
          </div>

          <!-- Step 4 -->
          <div class="relative pl-8 border-l-2 border-blue-300">
            <div
              class="absolute -left-3 top-0 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm"
            >
              4
            </div>
            <h3 class="font-semibold text-xl mb-3">Review and Approve</h3>
            <p class="text-gray-600">
              Go through your examples and rate their quality. Mark low-quality
              ones as "Draft" or "Rejected". Only approve examples that are
              truly excellent (4-5 stars).
            </p>
          </div>

          <!-- Step 5 -->
          <div class="relative pl-8 border-l-2 border-green-500">
            <div
              class="absolute -left-3 top-0 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-sm"
            >
              5
            </div>
            <h3 class="font-semibold text-xl mb-3">Export and Train!</h3>
            <p class="text-gray-600">
              Once you hit 1000 approved examples, export your dataset and start
              training. You're ready to create your first fine-tuned model!
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- SECTION 3: Training Examples -->
    <section id="training-examples" class="mb-16">
      <div class="flex items-center gap-3 mb-6">
        <span class="text-3xl">📖</span>
        <h2 class="text-2xl font-bold">Understanding Training Examples</h2>
      </div>

      <div class="card">
        <h3 class="text-xl font-semibold mb-4">What is a Training Example?</h3>
        <p class="text-lg mb-6">
          A training example teaches the AI a specific input-output pattern. It
          shows the model:
          <strong>"When someone asks this, respond like this."</strong>
        </p>

        <div class="bg-gray-50 p-6 rounded-xl mb-6">
          <h4 class="font-semibold mb-4">Basic Structure</h4>
          <div class="space-y-4">
            <div
              class="p-4 bg-white rounded-lg border-l-4 border-blue-500 shadow-sm"
            >
              <div class="text-sm text-blue-600 font-medium mb-1">
                👤 USER (Instruction)
              </div>
              <p class="text-gray-800">
                "How do I reverse a string in Python?"
              </p>
            </div>
            <div class="text-center text-gray-400">
              <svg
                class="w-6 h-6 mx-auto"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                ></path>
              </svg>
            </div>
            <div
              class="p-4 bg-white rounded-lg border-l-4 border-green-500 shadow-sm"
            >
              <div class="text-sm text-green-600 font-medium mb-1">
                🤖 ASSISTANT (Output)
              </div>
              <div class="font-mono text-sm bg-gray-100 p-3 rounded mt-2">
                <p class="mb-2">
                  You can reverse a string in Python using slicing:
                </p>
                <code>reversed_string = original_string[::-1]</code>
                <p class="mt-2">For example:</p>
                <code
                  >text = "Hello"<br />print(text[::-1]) # Output: "olleH"</code
                >
              </div>
            </div>
          </div>
        </div>

        <h3 class="text-xl font-semibold mb-4">Quality Levels</h3>
        <div class="space-y-4">
          <div class="p-4 bg-red-50 rounded-lg border border-red-200">
            <div class="flex items-center gap-2 mb-2">
              <span class="text-red-600 font-bold">⭐⭐ Poor (1-2 stars)</span>
            </div>
            <p class="text-sm text-gray-700 mb-2">
              <strong>Instruction:</strong> "Python help"
            </p>
            <p class="text-sm text-gray-700 mb-2">
              <strong>Output:</strong> "Here's some Python code: print('hello')"
            </p>
            <p class="text-sm text-red-600">Too vague, unhelpful, no context</p>
          </div>

          <div class="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
            <div class="flex items-center gap-2 mb-2">
              <span class="text-yellow-600 font-bold"
                >⭐⭐⭐ Average (3 stars)</span
              >
            </div>
            <p class="text-sm text-gray-700 mb-2">
              <strong>Instruction:</strong> "How to reverse a string"
            </p>
            <p class="text-sm text-gray-700 mb-2">
              <strong>Output:</strong> "Use slicing: [::-1]"
            </p>
            <p class="text-sm text-yellow-700">
              Okay, but lacks explanation and examples
            </p>
          </div>

          <div class="p-4 bg-green-50 rounded-lg border border-green-200">
            <div class="flex items-center gap-2 mb-2">
              <span class="text-green-600 font-bold"
                >⭐⭐⭐⭐⭐ Excellent (5 stars)</span
              >
            </div>
            <p class="text-sm text-gray-700 mb-2">
              <strong>Instruction:</strong> "What's the most Pythonic way to
              reverse a string, and why is it better than other methods? Include
              time complexity."
            </p>
            <p class="text-sm text-gray-700 mb-2">
              <strong>Output:</strong> Comprehensive answer with multiple
              methods, comparison, time complexity analysis, and code examples
            </p>
            <p class="text-sm text-green-700">
              Specific, educational, thorough, best practices
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- SECTION 4: Field Guide -->
    <section id="field-guide" class="mb-16">
      <div class="flex items-center gap-3 mb-6">
        <span class="text-3xl">📝</span>
        <h2 class="text-2xl font-bold">Complete Field Guide</h2>
      </div>

      <div class="card mb-6">
        <h3 class="text-xl font-semibold mb-6 text-blue-600">
          Core Fields (Required)
        </h3>

        <div class="space-y-8">
          <!-- Instruction -->
          <div class="border-l-4 border-blue-500 pl-4">
            <h4 class="text-lg font-semibold mb-2 flex items-center gap-2">
              🎯 Instruction
              <span class="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded"
                >Required</span
              >
            </h4>
            <p class="text-gray-600 mb-3">
              The main question or task. This is what the user will type to get
              a response from your model.
            </p>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div class="bg-green-50 p-3 rounded-lg">
                <p class="text-sm text-green-800 font-medium mb-2">✅ Good:</p>
                <p class="text-sm text-gray-700">
                  "Explain how React's useEffect hook works, including the
                  dependency array, cleanup functions, and common pitfalls to
                  avoid. Provide code examples for each concept."
                </p>
              </div>
              <div class="bg-red-50 p-3 rounded-lg">
                <p class="text-sm text-red-800 font-medium mb-2">❌ Bad:</p>
                <p class="text-sm text-gray-700">"React help"</p>
              </div>
            </div>

            <div class="mt-3 text-sm bg-blue-50 p-3 rounded">
              <strong>💡 Pro Tips:</strong>
              <ul class="list-disc list-inside mt-1 space-y-1">
                <li>Be specific about what you want</li>
                <li>Use natural language like a real user would</li>
                <li>Length: 50-500 characters is ideal</li>
                <li>Include context if needed</li>
              </ul>
            </div>
          </div>

          <!-- Output -->
          <div class="border-l-4 border-green-500 pl-4">
            <h4 class="text-lg font-semibold mb-2 flex items-center gap-2">
              📝 Output / Response
              <span class="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded"
                >Required</span
              >
            </h4>
            <p class="text-gray-600 mb-3">
              The ideal AI response. This is what you want the model to learn to
              produce. Make it as good as you want your AI to be.
            </p>

            <div class="bg-green-50 p-4 rounded-lg">
              <p class="text-sm text-green-800 font-medium mb-2">
                ✅ What Makes Good Output:
              </p>
              <ul class="list-disc list-inside text-sm text-gray-700 space-y-1">
                <li>
                  <strong>Directly answers</strong> the instruction completely
                </li>
                <li>
                  <strong>Well-structured</strong> - uses formatting, lists,
                  code blocks
                </li>
                <li>
                  <strong>Accurate</strong> - factually correct information
                </li>
                <li>
                  <strong>Includes examples</strong> - shows, don't just tell
                </li>
                <li>
                  <strong>Explains reasoning</strong> - helps user understand
                  why
                </li>
                <li>
                  <strong>Appropriate tone</strong> - matches your desired style
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div class="card">
        <h3 class="text-xl font-semibold mb-6 text-purple-600">
          Metadata Fields
        </h3>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="border-l-4 border-purple-400 pl-4">
            <h4 class="font-semibold mb-2">🎭 System Prompt</h4>
            <p class="text-gray-600 text-sm mb-3">
              Defines the AI's personality, role, and behavior. Think of it as
              the "character sheet" for your AI.
            </p>
            <div class="bg-purple-50 p-3 rounded text-sm">
              <strong>Example:</strong><br />
              "You are a patient senior software engineer who mentors junior
              developers. Explain concepts clearly, use analogies, and always
              provide code examples."
            </div>
          </div>

          <div class="border-l-4 border-purple-400 pl-4">
            <h4 class="font-semibold mb-2">🏷️ Category</h4>
            <p class="text-gray-600 text-sm mb-3">
              Organizes your dataset into topics.
            </p>
            <div class="flex flex-wrap gap-1 text-xs">
              <span class="px-2 py-1 bg-gray-100 rounded">Coding</span>
              <span class="px-2 py-1 bg-gray-100 rounded">Explanation</span>
              <span class="px-2 py-1 bg-gray-100 rounded">Analysis</span>
              <span class="px-2 py-1 bg-gray-100 rounded">Writing</span>
              <span class="px-2 py-1 bg-gray-100 rounded">Math</span>
              <span class="px-2 py-1 bg-gray-100 rounded">Science</span>
              <span class="px-2 py-1 bg-gray-100 rounded">General</span>
            </div>
          </div>

          <div class="border-l-4 border-purple-400 pl-4">
            <h4 class="font-semibold mb-2">📊 Difficulty</h4>
            <p class="text-gray-600 text-sm mb-3">Tracks complexity level.</p>
            <div class="space-y-1 text-sm">
              <div class="flex items-center gap-2">
                <span class="w-3 h-3 bg-green-400 rounded-full"></span>
                <span><strong>Beginner</strong> - Basic concepts</span>
              </div>
              <div class="flex items-center gap-2">
                <span class="w-3 h-3 bg-yellow-400 rounded-full"></span>
                <span
                  ><strong>Intermediate</strong> - Practical applications</span
                >
              </div>
              <div class="flex items-center gap-2">
                <span class="w-3 h-3 bg-red-400 rounded-full"></span>
                <span><strong>Advanced</strong> - Complex reasoning</span>
              </div>
            </div>
          </div>

          <div class="border-l-4 border-purple-400 pl-4">
            <h4 class="font-semibold mb-2">⭐ Quality Rating</h4>
            <p class="text-gray-600 text-sm mb-2">
              Your assessment (1-5 stars)
            </p>
            <div class="space-y-1 text-xs">
              <div>⭐⭐⭐⭐⭐ = Excellent - Perfect for training</div>
              <div>⭐⭐⭐⭐ = Very Good - Solid example</div>
              <div>⭐⭐⭐ = Good - Acceptable, could improve</div>
              <div>⭐⭐ = Fair - Needs major revision</div>
              <div>⭐ = Poor - Don't use for training</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- SECTION 5: Best Practices -->
    <section id="best-practices" class="mb-16">
      <div class="flex items-center gap-3 mb-6">
        <span class="text-3xl">⭐</span>
        <h2 class="text-2xl font-bold">Best Practices & Expert Tips</h2>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="card" v-for="(tip, idx) in bestPractices" :key="idx">
          <div class="flex items-start gap-3">
            <div
              class="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm"
              :class="tip.color"
            >
              {{ idx + 1 }}
            </div>
            <div>
              <h3 class="font-semibold mb-1">{{ tip.title }}</h3>
              <p class="text-sm text-gray-600">{{ tip.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- SECTION 6: Common Mistakes -->
    <section id="common-mistakes" class="mb-16">
      <div class="flex items-center gap-3 mb-6">
        <span class="text-3xl">⚠️</span>
        <h2 class="text-2xl font-bold">Common Mistakes to Avoid</h2>
      </div>

      <div class="space-y-4">
        <div
          class="card border-l-4 border-red-400"
          v-for="(mistake, idx) in commonMistakes"
          :key="idx"
        >
          <h3 class="font-semibold text-lg mb-2 text-red-700">
            ❌ {{ mistake.title }}
          </h3>
          <p class="text-gray-600 mb-3">{{ mistake.description }}</p>
          <div class="bg-green-50 p-3 rounded text-sm">
            <strong>✅ Instead:</strong> {{ mistake.solution }}
          </div>
        </div>
      </div>
    </section>

    <!-- SECTION 7: Real Examples -->
    <section id="real-examples" class="mb-16">
      <div class="flex items-center gap-3 mb-6">
        <span class="text-3xl">💡</span>
        <h2 class="text-2xl font-bold">Real-World Examples</h2>
      </div>

      <div class="card mb-6">
        <div class="flex items-center justify-between mb-4">
          <div class="flex items-center gap-2">
            <span class="text-2xl">💻</span>
            <h3 class="text-xl font-semibold">Example: React Error Handling</h3>
          </div>
          <div class="flex gap-2">
            <span class="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded"
              >Coding</span
            >
            <span class="px-2 py-1 bg-green-100 text-green-700 text-xs rounded"
              >⭐⭐⭐⭐⭐</span
            >
            <span
              class="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded"
              >Intermediate</span
            >
          </div>
        </div>

        <div class="space-y-3">
          <div class="p-3 bg-blue-50 rounded-lg">
            <div class="text-sm text-blue-800 font-medium mb-1">
              🎯 Instruction:
            </div>
            <p class="text-sm text-gray-700">
              "I'm getting 'TypeError: Cannot read property map of undefined' in
              React. How do I properly handle this?"
            </p>
          </div>

          <div class="p-3 bg-gray-50 rounded-lg">
            <div class="text-sm text-gray-800 font-medium mb-1">📎 Input:</div>
            <pre
              class="text-xs bg-gray-100 p-2 rounded overflow-x-auto"
            ><code>{users.map(user => &lt;div key={user.id}&gt;{user.name}&lt;/div&gt;)}</code></pre>
          </div>

          <div class="p-3 bg-green-50 rounded-lg">
            <div class="text-sm text-green-800 font-medium mb-1">
              📝 Output:
            </div>
            <div class="text-xs text-gray-700 space-y-2">
              <p>
                This happens when <code>users</code> is undefined. Here are 3
                solutions:
              </p>
              <p>
                <strong>1. Default value:</strong> <code>{users = []}</code>
              </p>
              <p>
                <strong>2. Conditional:</strong> Check if users exists before
                mapping
              </p>
              <p>
                <strong>3. Optional chaining:</strong>
                <code>{users?.map(...)}</code>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div class="card">
        <h3 class="font-semibold mb-3">🎓 What Makes Great Examples?</h3>
        <div class="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm">
          <div class="p-2 bg-green-50 rounded">✅ Clear instructions</div>
          <div class="p-2 bg-green-50 rounded">✅ Complete outputs</div>
          <div class="p-2 bg-green-50 rounded">✅ Code examples</div>
          <div class="p-2 bg-green-50 rounded">✅ Educational value</div>
          <div class="p-2 bg-green-50 rounded">✅ Practical application</div>
          <div class="p-2 bg-green-50 rounded">✅ Proper metadata</div>
        </div>
      </div>
    </section>

    <!-- SECTION 8: FAQ -->
    <section id="faq" class="mb-16">
      <div class="flex items-center gap-3 mb-6">
        <span class="text-3xl">❓</span>
        <h2 class="text-2xl font-bold">Frequently Asked Questions</h2>
      </div>

      <div class="space-y-4">
        <div class="card" v-for="(faq, idx) in faqs" :key="idx">
          <h3 class="font-semibold text-lg mb-2 text-blue-700">
            {{ faq.question }}
          </h3>
          <p class="text-gray-600 text-sm" v-html="faq.answer"></p>
        </div>
      </div>
    </section>

    <!-- SECTION 9: Glossary -->
    <section id="glossary" class="mb-16">
      <div class="flex items-center gap-3 mb-6">
        <span class="text-3xl">📖</span>
        <h2 class="text-2xl font-bold">Glossary</h2>
      </div>

      <div class="card">
        <p class="text-gray-600 mb-4 text-sm">
          Click any term to learn more about it in detail.
        </p>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3 text-sm">
          <div v-for="(term, idx) in glossary" :key="idx" class="group">
            <NuxtLink
              :to="`/help/glossary?term=${term.id}`"
              class="block hover:bg-gray-50 p-2 rounded-lg transition-colors"
            >
              <h3
                class="font-semibold text-blue-700 group-hover:text-blue-800 flex items-center gap-2"
              >
                {{ term.word }}
                <svg
                  class="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 5l7 7-7 7"
                  ></path>
                </svg>
              </h3>
              <p class="text-gray-600">{{ term.definition }}</p>
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>

    <!-- SECTION 10: Next Steps -->
    <section id="next-steps" class="mb-12">
      <div class="card bg-gradient-to-br from-blue-50 to-purple-50">
        <div class="text-center mb-6">
          <div class="text-5xl mb-4">🚀</div>
          <h2 class="text-2xl font-bold mb-2">Ready to Start Your Journey?</h2>
          <p class="text-gray-600">
            You've learned everything you need. Now it's time to build your
            first dataset!
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <NuxtLink
            to="/examples/new"
            class="p-6 bg-white rounded-xl hover:shadow-lg transition-shadow text-center"
          >
            <div class="text-3xl mb-3">✏️</div>
            <h3 class="font-semibold text-lg mb-1">Create Example</h3>
            <p class="text-sm text-gray-600">
              Start with your first training example
            </p>
          </NuxtLink>

          <NuxtLink
            to="/import"
            class="p-6 bg-white rounded-xl hover:shadow-lg transition-shadow text-center"
          >
            <div class="text-3xl mb-3">📥</div>
            <h3 class="font-semibold text-lg mb-1">Import</h3>
            <p class="text-sm text-gray-600">
              Import from Claude, Cursor, or OpenCode
            </p>
          </NuxtLink>

          <NuxtLink
            to="/examples"
            class="p-6 bg-white rounded-xl hover:shadow-lg transition-shadow text-center"
          >
            <div class="text-3xl mb-3">📊</div>
            <h3 class="font-semibold text-lg mb-1">View Dataset</h3>
            <p class="text-sm text-gray-600">Track your progress to 1000</p>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <div class="text-center py-8 text-gray-500 text-sm">
      <p>🎓 edukaAI - Learn LLM fine-tuning by building datasets</p>
      <p class="mt-2">
        "The best way to learn is by doing. Start creating today!"
      </p>
    </div>
  </div>
</template>

<script setup>
useHead({
  title: "Guide - edukaAI",
  meta: [
    {
      name: "description",
      content:
        "Complete guide to LLM fine-tuning and creating training datasets",
    },
  ],
});

// Best practices data
const bestPractices = [
  {
    title: "Quality over Quantity",
    description:
      "100 excellent examples beat 1000 mediocre ones. Review and improve regularly.",
    color: "bg-blue-500",
  },
  {
    title: "Diversity is Key",
    description:
      "Include different question styles, formats, and difficulty levels.",
    color: "bg-green-500",
  },
  {
    title: "Use Real Conversations",
    description: "Import from AI assistants or use actual user interactions.",
    color: "bg-purple-500",
  },
  {
    title: "Cover Edge Cases",
    description: "Include examples of common mistakes and error handling.",
    color: "bg-orange-500",
  },
  {
    title: "Be Consistent",
    description: "Use the same system prompt for related examples.",
    color: "bg-pink-500",
  },
  {
    title: "Show, Don't Just Tell",
    description: "Include code examples and concrete demonstrations.",
    color: "bg-yellow-500",
  },
  {
    title: "Iterate & Improve",
    description:
      "Don't aim for perfect on the first try. Build quality over time.",
    color: "bg-indigo-500",
  },
  {
    title: "Test Your Dataset",
    description: "Try training on 100 examples before committing to 1000.",
    color: "bg-teal-500",
  },
];

// Common mistakes data
const commonMistakes = [
  {
    title: "Vague Instructions",
    description:
      'Instructions like "help me with Python" are too vague. The model can\'t learn from ambiguous inputs.',
    solution:
      'Be specific: "How do I handle file reading errors in Python with proper exception handling?"',
  },
  {
    title: "Inconsistent Style",
    description: "Mixing formal responses with casual ones confuses the model.",
    solution: "Pick a consistent tone and stick with it using system prompts.",
  },
  {
    title: "Too Many Similar Examples",
    description: "100 variations of the same question doesn't help.",
    solution:
      "Cover diverse topics. Quality diversity beats quantity similarity.",
  },
  {
    title: "Ignoring Quality Ratings",
    description: "Marking everything as 5-star means you'll train on bad data.",
    solution: "Be honest with ratings. Only approve 3+ stars.",
  },
  {
    title: "Rushing to 1000",
    description: "Focusing only on number without quality harms your model.",
    solution: "Focus on creating 10 excellent examples, then 50, then 100.",
  },
];

// FAQ data
const faqs = [
  {
    question: "How many examples do I need?",
    answer:
      "We recommend <strong>1000 high-quality examples</strong> for your first fine-tuning. Start with 100 for testing, 500 for noticeable improvement, and 1000+ for solid results. Remember: quality beats quantity!",
  },
  {
    question: "Where can I find sample data to learn from?",
    answer:
      'Visit our <NuxtLink to="/sample-datasets" class="text-blue-600 hover:underline">Sample Datasets page</NuxtLink> to download example datasets and explore public datasets like Stanford Alpaca, ShareGPT, and OpenOrca. These are great for understanding what high-quality training data looks like!',
  },
  {
    question: "Can I import from ChatGPT / Claude?",
    answer:
      "Yes! edukaAI imports from <strong>Claude Code</strong> (full support), <strong>Cursor</strong> (chat history), and <strong>OpenCode</strong> (limited). Go to the Import page to get started.",
  },
  {
    question: "How long does it take?",
    answer:
      "Manual creation: 5-10 min per example = 85-170 hours for 1000. <strong>Recommended:</strong> Import 70% from conversations + create 30% manually = 10-20 hours of curation.",
  },
  {
    question: "Do I need programming experience?",
    answer:
      "<strong>No!</strong> edukaAI is designed for beginners. You just need domain knowledge (e.g., understanding coding if building a coding assistant). We handle the technical parts.",
  },
  {
    question: "What models can I fine-tune?",
    answer:
      "You can fine-tune: <strong>Open source</strong> (Llama 2, Mistral - free), via <strong>HuggingFace</strong> (easy), via <strong>OpenAI API</strong> (GPT-3.5), or any platform accepting Alpaca/ShareGPT format.",
  },
  {
    question: "How much does it cost?",
    answer:
      "<strong>Local (open source):</strong> Free! Need RTX 3060+ GPU.<br/><strong>Cloud:</strong> $5-20 per training run.<br/><strong>OpenAI:</strong> ~$2-10 for 1000 examples.<br/>Start with smaller models to save costs.",
  },
];

// Glossary data
const glossary = [
  {
    id: "base-model",
    word: "Base Model",
    definition: "The pre-trained LLM you start with (GPT-4, Llama 2, etc.)",
  },
  {
    id: "dataset",
    word: "Dataset",
    definition: "A collection of training examples used to teach the AI",
  },
  {
    id: "epoch",
    word: "Epoch",
    definition: "One complete pass through the dataset during training",
  },
  {
    id: "fine-tuning",
    word: "Fine-Tuning",
    definition:
      "Training a pre-trained model on specific data to improve performance",
  },
  {
    id: "hallucination",
    word: "Hallucination",
    definition: "When AI generates incorrect or made-up information",
  },
  {
    id: "instruction",
    word: "Instruction",
    definition: "The input part of a training example (what the user asks)",
  },
  {
    id: "llm",
    word: "LLM",
    definition: "Large Language Model - AI trained on vast amounts of text",
  },
  {
    id: "output",
    word: "Output",
    definition: "The desired answer the AI should produce",
  },
  {
    id: "parameters",
    word: "Parameters",
    definition:
      "Internal numbers that define how the model works (7B = 7 billion)",
  },
  {
    id: "system-prompt",
    word: "System Prompt",
    definition: "Instructions defining AI personality and behavior",
  },
  {
    id: "token",
    word: "Token",
    definition: 'A piece of text the AI processes ("Hello world" ≈ 2-3 tokens)',
  },
  {
    id: "training",
    word: "Training",
    definition: "The process of adjusting model parameters for better outputs",
  },
];

// Smooth scroll function
const scrollTo = (id) => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: "smooth", block: "start" });
  }
};
</script>

<style scoped>
@reference "tailwindcss";

.toc-btn {
  @apply px-3 py-2 text-sm bg-gray-100 hover:bg-blue-100 hover:text-blue-700 rounded-lg transition-colors;
}
</style>
