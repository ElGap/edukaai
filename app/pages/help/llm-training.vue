<template>
  <div class="max-w-4xl mx-auto pb-20">
    <!-- Breadcrumb -->
    <div class="text-sm text-gray-500 mb-6">
      <NuxtLink to="/help" class="hover:text-blue-600">← Back to Guide</NuxtLink>
    </div>

    <!-- Header -->
    <div class="mb-12">
      <div class="flex items-center gap-3 mb-4">
        <span class="text-4xl">🧠</span>
        <h1 class="text-4xl font-bold">LLM Training Explained</h1>
      </div>
      <p class="text-xl text-gray-600">
        A technical deep-dive into how Large Language Models actually work, explained for developers who want to understand the magic behind AI.
      </p>
    </div>

    <!-- Story Introduction -->
    <div class="card mb-8 bg-gradient-to-br from-blue-50 to-purple-50">
      <h2 class="text-xl font-semibold mb-4">📖 The Story Begins...</h2>
      <p class="text-gray-700 leading-relaxed mb-4">
        Imagine you're texting with a friend who's incredibly good at predicting what you're going to say next. Not because they're psychic, but because they've read every book, article, and conversation in existence. 
      </p>
      <p class="text-gray-700 leading-relaxed">
        That's essentially what an LLM is — a statistical prediction machine that learned patterns from trillions of words. But how does it actually work under the hood? Let's dive into the technical magic, step by step.
      </p>
    </div>

    <!-- Chapter 1: What is an LLM Actually -->
    <section id="what-is-llm" class="mb-12">
      <div class="flex items-center gap-3 mb-6">
        <span class="text-3xl">1️⃣</span>
        <h2 class="text-2xl font-bold">What is an LLM, Actually?</h2>
      </div>
      
      <div class="card">
        <h3 class="text-lg font-semibold mb-4 text-blue-700">The Next Token Prediction Machine</h3>
        
        <p class="text-gray-700 mb-4 leading-relaxed">
          At its core, an LLM (Large Language Model) is doing one thing and one thing only: <strong>predicting the next token</strong>.
        </p>

        <div class="bg-gray-50 p-6 rounded-xl mb-6">
          <h4 class="font-medium mb-3">🎯 The Core Task</h4>
          <div class="space-y-3">
            <div class="flex items-center gap-3">
              <span class="text-2xl">📜</span>
              <div class="flex-1">
                <p class="font-mono text-sm bg-white p-2 rounded border">
                  "The capital of France is"
                </p>
              </div>
            </div>
            <div class="text-center">
              <svg class="w-8 h-8 mx-auto text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
              </svg>
            </div>
            <div class="flex items-center gap-3">
              <span class="text-2xl">🤖</span>
              <div class="flex-1">
                <p class="font-mono text-sm bg-green-50 p-2 rounded border border-green-200">
                  "Paris" <span class="text-green-600">(probability: 99.9%)</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        <p class="text-gray-700 mb-4 leading-relaxed">
          That's it. The entire "intelligence" of ChatGPT, Claude, or any LLM comes from doing this one task extremely well, billions of times over. 
        </p>

        <div class="bg-blue-50 p-4 rounded-lg mb-6">
          <h4 class="font-medium text-blue-900 mb-2">💡 Why This Works</h4>
          <p class="text-sm text-blue-800">
            If you can predict "Paris" after "The capital of France is", and you can predict "def" after "class MyClass:", and you can predict "sincerely" after "Yours", then you've learned the patterns of language, facts about the world, programming syntax, and letter-writing etiquette — all from next-token prediction.
          </p>
        </div>

        <h3 class="text-lg font-semibold mb-4 text-blue-700">The Autoregressive Loop</h3>
        
        <p class="text-gray-700 mb-4 leading-relaxed">
          Here's the clever part: once the model predicts "Paris", it adds that to the context and predicts the NEXT token:
        </p>

        <div class="bg-gray-50 p-4 rounded-xl mb-6">
          <div class="space-y-2 font-mono text-sm">
            <p><strong>Step 1:</strong> "The capital of France is" → predicts "Paris"</p>
            <p><strong>Step 2:</strong> "The capital of France is Paris" → predicts ","</p>
            <p><strong>Step 3:</strong> "The capital of France is Paris," → predicts "a"</p>
            <p><strong>Step 4:</strong> "The capital of France is Paris, a" → predicts "city"</p>
            <p><strong>Step 5:</strong> ...continues until it predicts an "end" token</p>
          </div>
        </div>

        <p class="text-gray-700 leading-relaxed">
          This is called <strong>autoregressive generation</strong> — the model feeds its own predictions back as input to generate the next part. This is how it writes essays, answers questions, or generates code one piece at a time.
        </p>
      </div>
    </section>

    <!-- Chapter 2: Tokens -->
    <section id="tokens" class="mb-12">
      <div class="flex items-center gap-3 mb-6">
        <span class="text-3xl">2️⃣</span>
        <h2 class="text-2xl font-bold">Tokens: The Building Blocks</h2>
      </div>
      
      <div class="card">
        <h3 class="text-lg font-semibold mb-4 text-blue-700">Not Words, Not Characters</h3>
        
        <p class="text-gray-700 mb-4 leading-relaxed">
          LLMs don't actually work with words or characters. They work with <strong>tokens</strong> — pieces of text that are somewhere in between.
        </p>

        <div class="bg-gray-50 p-6 rounded-xl mb-6">
          <h4 class="font-medium mb-4">How Tokenization Works</h4>
          <div class="space-y-4">
            <div>
              <p class="text-sm text-gray-500 mb-1">Original text:</p>
              <p class="font-mono text-lg">"ChatGPT is amazing!"</p>
            </div>
            <div class="text-center">
              <span class="text-2xl">↓ Tokenized ↓</span>
            </div>
            <div class="flex flex-wrap gap-2">
              <span class="px-3 py-2 bg-blue-100 rounded-lg font-mono text-sm">Chat</span>
              <span class="px-3 py-2 bg-blue-100 rounded-lg font-mono text-sm">G</span>
              <span class="px-3 py-2 bg-blue-100 rounded-lg font-mono text-sm">PT</span>
              <span class="px-3 py-2 bg-green-100 rounded-lg font-mono text-sm">is</span>
              <span class="px-3 py-2 bg-purple-100 rounded-lg font-mono text-sm">amazing</span>
              <span class="px-3 py-2 bg-red-100 rounded-lg font-mono text-sm">!</span>
            </div>
            <p class="text-sm text-gray-600 mt-2">6 tokens total</p>
          </div>
        </div>

        <h3 class="text-lg font-semibold mb-4 text-blue-700">Why Tokens?</h3>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div class="p-4 bg-green-50 rounded-lg">
            <h4 class="font-medium text-green-800 mb-2">✅ Efficient</h4>
            <p class="text-sm text-gray-700">
              Common words like "the", "and", "is" are single tokens. Rare words get broken into subword pieces. This gives a good balance between vocabulary size and sequence length.
            </p>
          </div>
          <div class="p-4 bg-blue-50 rounded-lg">
            <h4 class="font-medium text-blue-800 mb-2">✅ Handles Any Text</h4>
            <p class="text-sm text-gray-700">
              By breaking unknown words into pieces (like "unbelievable" → "un" + "believable"), the model can handle words it's never seen before.
            </p>
          </div>
        </div>

        <div class="bg-yellow-50 p-4 rounded-lg mb-6">
          <h4 class="font-medium text-yellow-800 mb-2">📊 Token Count Examples</h4>
          <table class="w-full text-sm">
            <thead>
              <tr class="border-b">
                <th class="text-left py-2">Text</th>
                <th class="text-right py-2">Tokens</th>
              </tr>
            </thead>
            <tbody>
              <tr class="border-b">
                <td class="py-2">"Hello"</td>
                <td class="text-right">1</td>
              </tr>
              <tr class="border-b">
                <td class="py-2">"Hello world"</td>
                <td class="text-right">2</td>
              </tr>
              <tr class="border-b">
                <td class="py-2">"The quick brown fox"</td>
                <td class="text-right">4</td>
              </tr>
              <tr class="border-b">
                <td class="py-2">"uncharacteristically"</td>
                <td class="text-right">4 (broken into pieces)</td>
              </tr>
              <tr>
                <td class="py-2">A full paragraph (~100 words)</td>
                <td class="text-right">~130-150 tokens</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="bg-purple-50 p-4 rounded-lg">
          <h4 class="font-medium text-purple-800 mb-2">💡 Why This Matters for You</h4>
          <p class="text-sm text-gray-700">
            When you're charged by the token, or when your model has a "context window" of 4096 tokens, you're not being limited by words or characters — you're being limited by these token pieces. That's why a 100-word paragraph might be 130 tokens, not 100.
          </p>
        </div>
      </div>
    </section>

    <!-- Chapter 3: Neural Networks -->
    <section id="neural-networks" class="mb-12">
      <div class="flex items-center gap-3 mb-6">
        <span class="text-3xl">3️⃣</span>
        <h2 class="text-2xl font-bold">Neural Networks: Pattern Recognizers</h2>
      </div>
      
      <div class="card">
        <h3 class="text-lg font-semibold mb-4 text-blue-700">The Pattern Recognition Machine</h3>
        
        <p class="text-gray-700 mb-4 leading-relaxed">
          At the heart of an LLM is a <strong>neural network</strong> — a massive system of interconnected nodes that learns patterns from data. Think of it like a giant sieve that filters information, learning which patterns are important.
        </p>

        <div class="bg-gray-50 p-6 rounded-xl mb-6">
          <h4 class="font-medium mb-4">How a Neural Network Works (Simplified)</h4>
          
          <div class="space-y-4">
            <div class="flex items-center gap-4">
              <div class="w-20 text-right text-sm text-gray-500">Input</div>
              <div class="flex-1 p-3 bg-blue-100 rounded-lg">
                <p class="font-mono text-sm">Token IDs: [15496, 11, 616, 329, 11406]</p>
                <p class="text-xs text-gray-600">("The cat sat...")</p>
              </div>
            </div>
            
            <div class="text-center text-2xl">↓</div>
            
            <div class="flex items-center gap-4">
              <div class="w-20 text-right text-sm text-gray-500">Processing</div>
              <div class="flex-1 p-4 bg-purple-100 rounded-lg">
                <p class="font-medium text-sm mb-2">Millions of mathematical operations</p>
                <p class="text-xs text-gray-600">Matrix multiplications, activations, transformations through layers</p>
              </div>
            </div>
            
            <div class="text-center text-2xl">↓</div>
            
            <div class="flex items-center gap-4">
              <div class="w-20 text-right text-sm text-gray-500">Output</div>
              <div class="flex-1 p-3 bg-green-100 rounded-lg">
                <p class="font-mono text-sm">Probability distribution over all tokens</p>
                <p class="text-xs text-gray-600">"on" = 45%, "down" = 30%, "there" = 15%, ...</p>
              </div>
            </div>
          </div>
        </div>

        <h3 class="text-lg font-semibold mb-4 text-blue-700">The Key Idea: Learning from Examples</h3>
        
        <p class="text-gray-700 mb-4 leading-relaxed">
          The network doesn't "know" anything initially. It starts with random values (weights). During training, it sees millions of examples like:
        </p>

        <div class="bg-gray-50 p-4 rounded-xl mb-6">
          <div class="space-y-2 text-sm">
            <p><strong>Input:</strong> "The cat sat on the"</p>
            <p><strong>Expected Output:</strong> "mat"</p>
            <p><strong>Network's Guess:</strong> "floor" (wrong!)</p>
            <p class="text-red-600">→ Adjust weights slightly to do better next time</p>
          </div>
        </div>

        <p class="text-gray-700 mb-4 leading-relaxed">
          After seeing this pattern millions of times across different contexts, the network learns:
        </p>

        <ul class="list-disc list-inside text-gray-700 space-y-2 mb-6 ml-4">
          <li>Cats often sit on things</li>
          <li>"Mat" commonly follows "sat on the"</li>
          <li>Grammar patterns (articles, prepositions, word order)</li>
          <li>World knowledge (cats are pets, mats are for sitting)</li>
        </ul>

        <div class="bg-green-50 p-4 rounded-lg">
          <h4 class="font-medium text-green-800 mb-2">🧠 The Emergence of "Understanding"</h4>
          <p class="text-sm text-gray-700">
            Notice how the model doesn't have a "cat database" or a "mat definition." It just learned statistical patterns. Yet from these patterns, complex behaviors emerge — answering questions, writing code, reasoning through problems. This emergent complexity is what makes LLMs so powerful (and surprising).
          </p>
        </div>
      </div>
    </section>

    <!-- Chapter 4: Transformers & Attention -->
    <section id="transformers" class="mb-12">
      <div class="flex items-center gap-3 mb-6">
        <span class="text-3xl">4️⃣</span>
        <h2 class="text-2xl font-bold">The Transformer Architecture</h2>
      </div>
      
      <div class="card">
        <h3 class="text-lg font-semibold mb-4 text-blue-700">"Attention Is All You Need"</h3>
        
        <p class="text-gray-700 mb-4 leading-relaxed">
          In 2017, Google researchers published a paper with that title. It revolutionized AI. The key insight: <strong>attention mechanisms</strong> allow models to focus on relevant parts of the input when making predictions.
        </p>

        <div class="bg-gray-50 p-6 rounded-xl mb-6">
          <h4 class="font-medium mb-4">The Attention Analogy</h4>
          <p class="text-gray-700 mb-4">
            Imagine you're reading a long paragraph and encounter the word "it" at the end:
          </p>
          <div class="bg-white p-4 rounded border">
            <p class="mb-3">
              "The computer was old and slow. The user tried to run a new program on <span class="bg-yellow-200 px-1 font-bold">it</span>, but..."
            </p>
            <p class="text-sm text-gray-600">
              To understand what "it" refers to, your brain looks back and <strong>attends to</strong> the most relevant words: "computer", "old", "slow". You don't equally consider every word — you focus on what matters.
            </p>
          </div>
        </div>

        <h3 class="text-lg font-semibold mb-4 text-blue-700">Self-Attention Mechanism</h3>
        
        <p class="text-gray-700 mb-4 leading-relaxed">
          The transformer uses <strong>self-attention</strong> to let every token "look at" every other token and decide which ones are important for understanding its meaning.
        </p>

        <div class="bg-blue-50 p-6 rounded-xl mb-6">
          <h4 class="font-medium text-blue-900 mb-4">How It Works</h4>
          
          <div class="space-y-4">
            <div class="flex items-start gap-3">
              <div class="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">1</div>
              <div>
                <h5 class="font-medium">Query, Key, Value</h5>
                <p class="text-sm text-gray-700 mb-2">
                  For each token, the model creates three vectors:
                </p>
                <ul class="list-disc list-inside ml-4 space-y-1 text-sm text-gray-700">
                  <li><strong>Query:</strong> "What am I looking for?"</li>
                  <li><strong>Key:</strong> "What do I contain?"</li>
                  <li><strong>Value:</strong> "What information do I have?"</li>
                </ul>
              </div>
            </div>

            <div class="flex items-start gap-3">
              <div class="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">2</div>
              <div>
                <h5 class="font-medium">Compute Attention Scores</h5>
                <p class="text-sm text-gray-700">
                  Each token's Query is compared to every other token's Key. High match = high attention weight. The model learns which relationships matter.
                </p>
              </div>
            </div>

            <div class="flex items-start gap-3">
              <div class="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">3</div>
              <div>
                <h5 class="font-medium">Weighted Sum</h5>
                <p class="text-sm text-gray-700">
                  Each token's new representation becomes a weighted combination of all tokens' Values, weighted by attention scores.
                </p>
              </div>
            </div>
          </div>
        </div>

        <h3 class="text-lg font-semibold mb-4 text-blue-700">Multi-Head Attention</h3>
        
        <p class="text-gray-700 mb-4 leading-relaxed">
          The model doesn't just do this once — it runs multiple "attention heads" in parallel. Each head can learn different types of relationships:
        </p>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div class="p-4 bg-green-50 rounded-lg">
            <h5 class="font-medium text-green-800 mb-2">Head A: Syntax</h5>
            <p class="text-sm text-gray-700">Learns grammatical relationships — subjects match with verbs, pronouns match with nouns.</p>
          </div>
          <div class="p-4 bg-purple-50 rounded-lg">
            <h5 class="font-medium text-purple-800 mb-2">Head B: Semantics</h5>
            <p class="text-sm text-gray-700">Learns meaning relationships — "king" relates to "queen", "Paris" relates to "France".</p>
          </div>
          <div class="p-4 bg-blue-50 rounded-lg">
            <h5 class="font-medium text-blue-800 mb-2">Head C: Long-Range</h5>
            <p class="text-sm text-gray-700">Learns connections across long distances in text — a character introduced in paragraph 1 mentioned again in paragraph 5.</p>
          </div>
          <div class="p-4 bg-orange-50 rounded-lg">
            <h5 class="font-medium text-orange-800 mb-2">Head D: Context</h5>
            <p class="text-sm text-gray-700">Learns task-specific patterns — in code, variable definitions match with usages.</p>
          </div>
        </div>

        <div class="bg-gray-50 p-4 rounded-xl mb-6">
          <h4 class="font-medium mb-3">Visual: Attention Pattern</h4>
          <div class="bg-white p-4 rounded border">
            <p class="mb-4 font-mono text-sm">"The animal didn't cross the street because it was too tired."</p>
            <p class="text-sm text-gray-700 mb-2">
              When processing "it", the model's attention might look like:
            </p>
            <div class="flex flex-wrap gap-2">
              <span class="px-2 py-1 bg-red-100 rounded text-xs">The (5%)</span>
              <span class="px-2 py-1 bg-green-200 rounded text-xs font-bold">animal (75%)</span>
              <span class="px-2 py-1 bg-red-100 rounded text-xs">didn't (2%)</span>
              <span class="px-2 py-1 bg-red-100 rounded text-xs">cross (3%)</span>
              <span class="px-2 py-1 bg-red-100 rounded text-xs">the (5%)</span>
              <span class="px-2 py-1 bg-yellow-200 rounded text-xs">street (5%)</span>
              <span class="px-2 py-1 bg-red-100 rounded text-xs">because (2%)</span>
              <span class="px-2 py-1 bg-yellow-200 rounded text-xs">tired (3%)</span>
            </div>
            <p class="text-xs text-gray-500 mt-3">
              The model learns "it" refers to "animal" (75%), with some attention to "tired" (3%) to understand context.
            </p>
          </div>
        </div>

        <h3 class="text-lg font-semibold mb-4 text-blue-700">The Transformer Stack</h3>
        
        <p class="text-gray-700 mb-4 leading-relaxed">
          A modern LLM like GPT-4 or Llama has dozens of these attention layers stacked on top of each other. Each layer refines the understanding:
        </p>

        <div class="bg-gray-50 p-4 rounded-xl">
          <div class="space-y-3">
            <div class="flex items-center gap-3">
              <div class="w-24 text-right text-xs text-gray-500">Layer 1</div>
              <div class="flex-1 h-8 bg-blue-200 rounded flex items-center px-3">
                <span class="text-xs">Basic word relationships, syntax</span>
              </div>
            </div>
            <div class="flex items-center gap-3">
              <div class="w-24 text-right text-xs text-gray-500">Layer 12</div>
              <div class="flex-1 h-8 bg-blue-300 rounded flex items-center px-3">
                <span class="text-xs">Phrase meanings, local context</span>
              </div>
            </div>
            <div class="flex items-center gap-3">
              <div class="w-24 text-right text-xs text-gray-500">Layer 24</div>
              <div class="flex-1 h-8 bg-blue-400 rounded flex items-center px-3">
                <span class="text-xs text-white">Sentences, reasoning steps</span>
              </div>
            </div>
            <div class="flex items-center gap-3">
              <div class="w-24 text-right text-xs text-gray-500">Layer 48</div>
              <div class="flex-1 h-8 bg-blue-600 rounded flex items-center px-3">
                <span class="text-xs text-white">High-level concepts, document structure</span>
              </div>
            </div>
            <div class="flex items-center gap-3">
              <div class="w-24 text-right text-xs text-gray-500">Final</div>
              <div class="flex-1 h-8 bg-green-500 rounded flex items-center px-3">
                <span class="text-xs text-white">Next token prediction</span>
              </div>
            </div>
          </div>
          <p class="text-xs text-gray-500 mt-4">
            Lower layers handle local patterns (words, grammar). Higher layers handle global patterns (meaning, reasoning, context).
          </p>
        </div>
      </div>
    </section>

    <!-- Chapter 5: Training Process -->
    <section id="training-process" class="mb-12">
      <div class="flex items-center gap-3 mb-6">
        <span class="text-3xl">5️⃣</span>
        <h2 class="text-2xl font-bold">How Training Actually Works</h2>
      </div>
      
      <div class="card">
        <h3 class="text-lg font-semibold mb-4 text-blue-700">From Random to Brilliant</h3>
        
        <p class="text-gray-700 mb-4 leading-relaxed">
          Training an LLM is like teaching a student who starts knowing nothing. You show them examples, correct their mistakes, and gradually they improve.
        </p>

        <div class="bg-gray-50 p-6 rounded-xl mb-6">
          <h4 class="font-medium mb-4">The Training Loop</h4>
          
          <div class="space-y-4">
            <div class="flex items-start gap-3">
              <div class="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">1</div>
              <div class="flex-1">
                <h5 class="font-medium">Feed Input</h5>
                <p class="text-sm text-gray-700">
                  Give the model a sequence: "The capital of France is"
                </p>
              </div>
            </div>

            <div class="flex items-start gap-3">
              <div class="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">2</div>
              <div class="flex-1">
                <h5 class="font-medium">Make Prediction</h5>
                <p class="text-sm text-gray-700">
                  Model runs through layers and guesses: "Paris" (or maybe "London" if it's early in training)
                </p>
              </div>
            </div>

            <div class="flex items-start gap-3">
              <div class="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">3</div>
              <div class="flex-1">
                <h5 class="font-medium">Compare to Truth</h5>
                <p class="text-sm text-gray-700">
                  We know the answer should be "Paris". Calculate how wrong the model was.
                </p>
              </div>
            </div>

            <div class="flex items-start gap-3">
              <div class="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">4</div>
              <div class="flex-1">
                <h5 class="font-medium">Adjust Weights</h5>
                <p class="text-sm text-gray-700">
                  Use calculus (backpropagation) to figure out which weights to tweak so the model does better next time.
                </p>
              </div>
            </div>

            <div class="flex items-start gap-3">
              <div class="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">5</div>
              <div class="flex-1">
                <h5 class="font-medium">Repeat Billions of Times</h5>
                <p class="text-sm text-gray-700">
                  Do this for trillions of tokens across the entire internet. Gradually, the model gets better.
                </p>
              </div>
            </div>
          </div>
        </div>

        <h3 class="text-lg font-semibold mb-4 text-blue-700">Key Concepts</h3>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div class="p-4 bg-blue-50 rounded-lg">
            <h5 class="font-medium text-blue-800 mb-2">Loss Function</h5>
            <p class="text-sm text-gray-700">
              A mathematical measure of "how wrong" the model was. Lower loss = better predictions. Training tries to minimize this.
            </p>
          </div>

          <div class="p-4 bg-green-50 rounded-lg">
            <h5 class="font-medium text-green-800 mb-2">Learning Rate</h5>
            <p class="text-sm text-gray-700">
              How big of adjustments to make. Too big = unstable. Too small = slow. Like turning the steering wheel when driving.
            </p>
          </div>

          <div class="p-4 bg-purple-50 rounded-lg">
            <h5 class="font-medium text-purple-800 mb-2">Epochs</h5>
            <p class="text-sm text-gray-700">
              How many times the model sees the entire dataset. More epochs = more learning, but too many = overfitting.
            </p>
          </div>

          <div class="p-4 bg-orange-50 rounded-lg">
            <h5 class="font-medium text-orange-800 mb-2">Batch Size</h5>
            <p class="text-sm text-gray-700">
              How many examples to process before updating weights. Larger batches = more stable but need more memory.
            </p>
          </div>
        </div>

        <div class="bg-yellow-50 p-4 rounded-lg">
          <h4 class="font-medium text-yellow-800 mb-2">⚠️ Why This Takes So Long</h4>
          <p class="text-sm text-gray-700">
            GPT-3 was trained on ~500 billion tokens. That's like reading the entire written works of humanity hundreds of times. Each token requires running billions of mathematical operations through the network. Even with thousands of GPUs, this takes weeks or months. That's why pre-trained models are so valuable — you're leveraging weeks of computation!
          </p>
        </div>
      </div>
    </section>

    <!-- Chapter 6: Fine-Tuning -->
    <section id="fine-tuning-deep" class="mb-12">
      <div class="flex items-center gap-3 mb-6">
        <span class="text-3xl">6️⃣</span>
        <h2 class="text-2xl font-bold">Fine-Tuning: Teaching the Specialist</h2>
      </div>
      
      <div class="card">
        <h3 class="text-lg font-semibold mb-4 text-blue-700">Why Fine-Tune?</h3>
        
        <p class="text-gray-700 mb-4 leading-relaxed">
          A pre-trained model knows general language and facts, but it doesn't know YOUR specific domain. Fine-tuning is like giving it specialized training.
        </p>

        <div class="bg-gray-50 p-6 rounded-xl mb-6">
          <h4 class="font-medium mb-4">The Analogy: Medical School</h4>
          <div class="space-y-3">
            <div class="flex items-start gap-3">
              <span class="text-2xl">📚</span>
              <div>
                <h5 class="font-medium">Pre-training = College</h5>
                <p class="text-sm text-gray-700">
                  The model learns general knowledge, critical thinking, and how to communicate. Like a college graduate who knows a bit about everything.
                </p>
              </div>
            </div>

            <div class="text-center text-2xl">↓</div>

            <div class="flex items-start gap-3">
              <span class="text-2xl">🎓</span>
              <div>
                <h5 class="font-medium">Fine-tuning = Medical School</h5>
                <p class="text-sm text-gray-700">
                  Now you give them specialized training. Thousands of examples of medical cases, diagnoses, patient interactions. They become a doctor.
                </p>
              </div>
            </div>
          </div>
        </div>

        <h3 class="text-lg font-semibold mb-4 text-blue-700">How Fine-Tuning Works</h3>

        <p class="text-gray-700 mb-4 leading-relaxed">
          Instead of training from scratch (which takes weeks and costs millions), you start with a pre-trained model and continue training on your specific dataset. This is much faster because:
        </p>

        <ul class="list-disc list-inside text-gray-700 space-y-2 mb-6 ml-4">
          <li>The model already knows language, grammar, and general facts</li>
          <li>You only need to teach it your specific domain</li>
          <li>Training takes hours or days, not weeks</li>
          <li>Costs hundreds of dollars, not millions</li>
          <li>Needs hundreds or thousands of examples, not billions</li>
        </ul>

        <div class="bg-green-50 p-4 rounded-lg mb-6">
          <h4 class="font-medium text-green-800 mb-2">✨ What Changes During Fine-Tuning?</h4>
          <p class="text-sm text-gray-700 mb-3">
            The model's weights adjust to better predict your specific examples. It learns:
          </p>
          <ul class="list-disc list-inside text-sm text-gray-700 space-y-1 ml-4">
            <li>Your terminology and jargon</li>
            <li>Your preferred response style and tone</li>
            <li>Patterns specific to your domain</li>
            <li>How to format responses the way you want</li>
            <li>Your specific knowledge base</li>
          </ul>
        </div>

        <div class="bg-blue-50 p-4 rounded-lg">
          <h4 class="font-medium text-blue-800 mb-2">🎯 Why Your Dataset Matters</h4>
          <p class="text-sm text-gray-700">
            Every example in your dataset is teaching the model: "When you see this kind of input, produce this kind of output." The quality and diversity of your examples directly determines the quality of your fine-tuned model. That's why edukaAI focuses so much on helping you create great examples — they become the training signal that shapes your AI's behavior.
          </p>
        </div>
      </div>
    </section>

    <!-- Chapter 7: Model Sizes -->
    <section id="model-sizes" class="mb-12">
      <div class="flex items-center gap-3 mb-6">
        <span class="text-3xl">7️⃣</span>
        <h2 class="text-2xl font-bold">Understanding Model Sizes</h2>
      </div>
      
      <div class="card">
        <h3 class="text-lg font-semibold mb-4 text-blue-700">What Does "7B" Mean?</h3>
        
        <p class="text-gray-700 mb-4 leading-relaxed">
          When you see "Llama 2 7B" or "GPT-3 175B", the "B" stands for <strong>billion parameters</strong>. Think of parameters as the "knobs" or "dials" inside the neural network that get adjusted during training. More parameters = more capacity to learn, but also more compute needed.
        </p>

        <div class="bg-gray-50 p-6 rounded-xl mb-6">
          <h4 class="font-medium mb-4">The Parameter Scale</h4>
          
          <div class="space-y-4">
            <div class="flex items-center gap-4">
              <div class="w-32 text-right">
                <span class="text-2xl">🌱</span>
              </div>
              <div class="flex-1 p-3 bg-green-100 rounded-lg">
                <h5 class="font-medium">Small (1B - 7B)</h5>
                <p class="text-sm text-gray-700">
                  <strong>Examples:</strong> TinyLlama, Phi-2, Llama 2 7B<br/>
                  <strong>Good for:</strong> Testing, edge devices, simple tasks<br/>
                  <strong>Hardware:</strong> Runs on consumer GPUs (RTX 3060)<br/>
                  <strong>Speed:</strong> Very fast, low latency
                </p>
              </div>
            </div>

            <div class="flex items-center gap-4">
              <div class="w-32 text-right">
                <span class="text-2xl">🌳</span>
              </div>
              <div class="flex-1 p-3 bg-blue-100 rounded-lg">
                <h5 class="font-medium">Medium (13B - 30B)</h5>
                <p class="text-sm text-gray-700">
                  <strong>Examples:</strong> Llama 2 13B, CodeLlama 13B, Mistral 7B (punches above its weight!)<br/>
                  <strong>Good for:</strong> Production use, most practical applications<br/>
                  <strong>Hardware:</strong> RTX 3090, RTX 4090, or cloud A10G<br/>
                  <strong>Speed:</strong> Good balance of quality and speed
                </p>
              </div>
            </div>

            <div class="flex items-center gap-4">
              <div class="w-32 text-right">
                <span class="text-2xl">🏔️</span>
              </div>
              <div class="flex-1 p-3 bg-purple-100 rounded-lg">
                <h5 class="font-medium">Large (70B - 175B)</h5>
                <p class="text-sm text-gray-700">
                  <strong>Examples:</strong> Llama 2 70B, GPT-3, Claude 2<br/>
                  <strong>Good for:</strong> Complex reasoning, research, maximum capability<br/>
                  <strong>Hardware:</strong> Multiple GPUs, A100s, or API access only<br/>
                  <strong>Speed:</strong> Slower but smartest
                </p>
              </div>
            </div>
          </div>
        </div>

        <h3 class="text-lg font-semibold mb-4 text-blue-700">Bigger Isn't Always Better</h3>
        
        <p class="text-gray-700 mb-4 leading-relaxed">
          It's tempting to think "bigger model = better," but that's not always true. A well-trained 13B model can outperform a poorly-trained 70B model on specific tasks. Plus, bigger models have downsides:
        </p>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div class="p-4 bg-red-50 rounded-lg border border-red-200">
            <h5 class="font-medium text-red-800 mb-2">❌ Large Model Problems</h5>
            <ul class="text-sm text-gray-700 space-y-1">
              <li>Higher inference costs (more $ per request)</li>
              <li>Slower responses</li>
              <li>Requires expensive hardware</li>
              <li>Higher energy consumption</li>
              <li>Harder to deploy on edge devices</li>
            </ul>
          </div>

          <div class="p-4 bg-green-50 rounded-lg border border-green-200">
            <h5 class="font-medium text-green-800 mb-2">✅ Right-Size Benefits</h5>
            <ul class="text-sm text-gray-700 space-y-1">
              <li>Faster responses = better UX</li>
              <li>Lower costs = scalable</li>
              <li>Runs on affordable hardware</li>
              <li>Easier to fine-tune</li>
              <li>Can deploy anywhere</li>
            </ul>
          </div>
        </div>

        <div class="bg-yellow-50 p-4 rounded-lg">
          <h4 class="font-medium text-yellow-800 mb-2">💡 The Sweet Spot for Beginners</h4>
          <p class="text-sm text-yellow-700">
            For your first fine-tuning project, we recommend starting with <strong>7B-13B models</strong>. They're big enough to learn your domain well, small enough to train affordably, and can run on consumer hardware. Once you master these, you can experiment with larger models.
          </p>
        </div>
      </div>
    </section>

    <!-- Chapter 8: Quantization -->
    <section id="quantization" class="mb-12">
      <div class="flex items-center gap-3 mb-6">
        <span class="text-3xl">8️⃣</span>
        <h2 class="text-2xl font-bold">Quantization: Making Models Smaller</h2>
      </div>
      
      <div class="card">
        <h3 class="text-lg font-semibold mb-4 text-blue-700">The Magic of Model Compression</h3>
        
        <p class="text-gray-700 mb-4 leading-relaxed">
          Remember those billions of parameters? Each one is stored as a number (usually 16 or 32 bits). <strong>Quantization</strong> is a technique that reduces the precision of these numbers, making the model smaller and faster while keeping most of its intelligence. Think of it like compressing an MP3 — smaller file, same song.
        </p>

        <div class="bg-gray-50 p-6 rounded-xl mb-6">
          <h4 class="font-medium mb-4">How It Works (The Simple Version)</h4>
          
          <div class="space-y-4">
            <div class="p-4 bg-white rounded-lg border">
              <h5 class="font-medium mb-2">Normal (FP16) - 16-bit precision</h5>
              <p class="font-mono text-xs text-gray-600 mb-2">
                Weight value: 0.3847265849234712
              </p>
              <p class="text-sm text-gray-700">
                Very precise, but takes 16 bits to store. A 7B model needs ~14GB RAM.
              </p>
            </div>

            <div class="text-center text-2xl">↓ Quantize ↓</div>

            <div class="p-4 bg-green-50 rounded-lg border border-green-200">
              <h5 class="font-medium text-green-800 mb-2">Quantized (INT8) - 8-bit precision</h5>
              <p class="font-mono text-xs text-gray-600 mb-2">
                Weight value: 0.38
              </p>
              <p class="text-sm text-gray-700">
                Less precise, but only 8 bits. Same 7B model now needs ~7GB RAM — <strong>half the size!</strong>
              </p>
            </div>

            <div class="text-center text-2xl">↓ Quantize More ↓</div>

            <div class="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <h5 class="font-medium text-blue-800 mb-2">Highly Quantized (INT4) - 4-bit precision</h5>
              <p class="font-mono text-xs text-gray-600 mb-2">
                Weight value: 0.4
              </p>
              <p class="text-sm text-gray-700">
                Even less precise, only 4 bits. Same 7B model now needs ~3.5GB RAM — <strong>quarter the size!</strong>
              </p>
            </div>
          </div>
        </div>

        <h3 class="text-lg font-semibold mb-4 text-blue-700">Common Quantization Formats</h3>

        <div class="overflow-x-auto">
          <table class="w-full text-sm mb-6">
            <thead>
              <tr class="border-b">
                <th class="text-left py-2">Format</th>
                <th class="text-left py-2">Bits</th>
                <th class="text-left py-2">Size (7B model)</th>
                <th class="text-left py-2">Quality Loss</th>
                <th class="text-left py-2">Use Case</th>
              </tr>
            </thead>
            <tbody>
              <tr class="border-b">
                <td class="py-2 font-medium">FP16</td>
                <td class="py-2">16</td>
                <td class="py-2">~14 GB</td>
                <td class="py-2 text-green-600">None</td>
                <td class="py-2">Training, max quality</td>
              </tr>
              <tr class="border-b">
                <td class="py-2 font-medium">INT8</td>
                <td class="py-2">8</td>
                <td class="py-2">~7 GB</td>
                <td class="py-2 text-yellow-600">Minimal</td>
                <td class="py-2">Production inference</td>
              </tr>
              <tr class="border-b">
                <td class="py-2 font-medium">INT4 (Q4)</td>
                <td class="py-2">4</td>
                <td class="py-2">~3.5 GB</td>
                <td class="py-2 text-orange-600">Small</td>
                <td class="py-2">Consumer hardware</td>
              </tr>
              <tr>
                <td class="py-2 font-medium">INT4 (Q2/Q3)</td>
                <td class="py-2">2-3</td>
                <td class="py-2">~2-2.5 GB</td>
                <td class="py-2 text-red-600">Noticeable</td>
                <td class="py-2">Edge devices, testing</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 class="text-lg font-semibold mb-4 text-blue-700">When to Use Quantization</h3>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div class="p-4 bg-green-50 rounded-lg">
            <h5 class="font-medium text-green-800 mb-2">✅ Quantize When:</h5>
            <ul class="text-sm text-gray-700 space-y-1">
              <li>Running inference (generating responses)</li>
              <li>Deploying to consumer hardware</li>
              <li>API cost reduction is important</li>
              <li>Mobile/edge device deployment</li>
              <li>Speed is critical</li>
            </ul>
          </div>

          <div class="p-4 bg-yellow-50 rounded-lg">
            <h5 class="font-medium text-yellow-800 mb-2">⚠️ Don't Quantize When:</h5>
            <ul class="text-sm text-gray-700 space-y-1">
              <li>Training/fine-tuning (use FP16)</li>
              <li>Maximum accuracy is required</li>
              <li>Complex reasoning tasks</li>
              <li>Medical/legal applications</li>
              <li>You have plenty of GPU memory</li>
            </ul>
          </div>
        </div>

        <div class="bg-purple-50 p-4 rounded-lg mb-6">
          <h4 class="font-medium text-purple-800 mb-2">🎯 Practical Example</h4>
          <p class="text-sm text-gray-700 mb-3">
            Let's say you want to run Llama 2 13B on your laptop:
          </p>
          <div class="space-y-2 text-sm">
            <div class="flex justify-between items-center p-2 bg-white rounded">
              <span>Full precision (FP16):</span>
              <span class="font-mono text-red-600">~26 GB RAM ❌</span>
            </div>
            <div class="flex justify-between items-center p-2 bg-white rounded">
              <span>8-bit quantized:</span>
              <span class="font-mono text-yellow-600">~13 GB RAM ⚠️</span>
            </div>
            <div class="flex justify-between items-center p-2 bg-white rounded">
              <span>4-bit quantized (Q4):</span>
              <span class="font-mono text-green-600">~6.5 GB RAM ✅</span>
            </div>
          </div>
          <p class="text-sm text-gray-700 mt-3">
            <strong>Result:</strong> By quantizing to 4-bit, you can run a 13B model on a laptop with 8GB VRAM (like an RTX 3070) with minimal quality loss!
          </p>
        </div>

        <div class="bg-blue-50 p-4 rounded-lg">
          <h4 class="font-medium text-blue-800 mb-2">🔧 Tools for Quantization</h4>
          <p class="text-sm text-gray-700 mb-2">
            Popular tools for quantizing models:
          </p>
          <ul class="text-sm text-gray-700 space-y-1">
            <li><strong>llama.cpp</strong> — Most popular, supports GGUF format</li>
            <li><strong>AutoGPTQ</strong> — Easy quantization for HuggingFace models</li>
            <li><strong>BitsAndBytes</strong> — 8-bit quantization for training</li>
            <li><strong>ExLlama</strong> — Fast inference for 4-bit models</li>
          </ul>
          <p class="text-sm text-gray-700 mt-2">
            <strong>Good news:</strong> Many pre-quantized models are already available on HuggingFace — just download and use!
          </p>
        </div>
      </div>
    </section>

    <!-- Summary -->
    <div class="card bg-gradient-to-br from-blue-50 to-purple-50 mb-12">
      <h2 class="text-xl font-semibold mb-4">🎓 What You Now Understand</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
        <div class="p-3 bg-white rounded-lg">
          <strong>LLMs are next-token predictors</strong>
          <p class="text-gray-600 mt-1">They predict one token at a time, feeding predictions back as input.</p>
        </div>
        <div class="p-3 bg-white rounded-lg">
          <strong>Tokens are the building blocks</strong>
          <p class="text-gray-600 mt-1">Not words or characters, but pieces somewhere in between.</p>
        </div>
        <div class="p-3 bg-white rounded-lg">
          <strong>Neural networks learn patterns</strong>
          <p class="text-gray-600 mt-1">They adjust millions of weights to get better at predictions.</p>
        </div>
        <div class="p-3 bg-white rounded-lg">
          <strong>Attention finds relationships</strong>
          <p class="text-gray-600 mt-1">Lets tokens focus on other relevant tokens in the context.</p>
        </div>
        <div class="p-3 bg-white rounded-lg">
          <strong>Training is iterative correction</strong>
          <p class="text-gray-600 mt-1">Show example, predict, compare to truth, adjust, repeat billions of times.</p>
        </div>
        <div class="p-3 bg-white rounded-lg">
          <strong>Fine-tuning specializes the model</strong>
          <p class="text-gray-600 mt-1">Start with general knowledge, train on your specific examples.</p>
        </div>
        <div class="p-3 bg-white rounded-lg">
          <strong>Model size matters (but not too much)</strong>
          <p class="text-gray-600 mt-1">7B-13B is the sweet spot. Bigger = smarter but slower and costlier.</p>
        </div>
        <div class="p-3 bg-white rounded-lg">
          <strong>Quantization makes models practical</strong>
          <p class="text-gray-600 mt-1">Compress 16-bit weights to 4-bit. Run big models on consumer hardware!</p>
        </div>
      </div>
    </div>

    <!-- Call to Action -->
    <div class="text-center">
      <h2 class="text-2xl font-bold mb-4">Ready to Apply This Knowledge?</h2>
      <p class="text-gray-600 mb-6">Now you understand how LLMs work. Time to build your dataset!</p>
      <div class="flex justify-center gap-4">
        <NuxtLink to="/examples/new" class="btn-primary">
          Create Your First Example
        </NuxtLink>
        <NuxtLink to="/help" class="btn-secondary">
          Back to Guide
        </NuxtLink>
      </div>
    </div>

    <!-- References -->
    <div class="mt-12 pt-8 border-t text-sm text-gray-500">
      <h3 class="font-semibold mb-2">Further Reading</h3>
      <ul class="space-y-1">
        <li>
          <a href="https://arxiv.org/abs/1706.03762" target="_blank" class="text-blue-600 hover:underline">
            "Attention Is All You Need" — Vaswani et al. (2017)
          </a>
          <span class="text-gray-400">— The original transformer paper</span>
        </li>
        <li>
          <a href="https://jalammar.github.io/illustrated-transformer/" target="_blank" class="text-blue-600 hover:underline">
            The Illustrated Transformer — Jay Alammar
          </a>
          <span class="text-gray-400">— Visual guide to how transformers work</span>
        </li>
        <li>
          <a href="https://d2l.ai/chapter_attention-mechanisms/index.html" target="_blank" class="text-blue-600 hover:underline">
            Dive into Deep Learning — Attention Mechanisms
          </a>
          <span class="text-gray-400">— Technical deep dive</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'default'
})
</script>
