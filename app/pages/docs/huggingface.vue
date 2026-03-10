<template>
  <div class="max-w-6xl mx-auto">
    <!-- Header -->
    <div class="mb-8">
      <div class="flex items-center gap-3 mb-4">
        <NuxtLink to="/export" class="text-blue-600 hover:text-blue-800">
          ← Back to Export
        </NuxtLink>
      </div>
      <h1 class="text-3xl font-bold mb-4">🤗 What is Hugging Face?</h1>
      <p class="text-xl text-secondary">
        The "GitHub of AI" - where the machine learning community shares models, datasets, and tools
      </p>
    </div>

    <!-- What is Hugging Face -->
    <div class="card mb-6">
      <h2 class="text-xl font-semibold mb-4">In Simple Terms</h2>
      
      <div class="space-y-4 text-gray-700">
        <p>
          <strong>Hugging Face</strong> is like GitHub, but specifically for artificial intelligence and machine learning. 
          It's the largest community hub where researchers, developers, and companies share:
        </p>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
          <div class="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200">
            <div class="text-3xl mb-2">🤖</div>
            <h3 class="font-semibold mb-1">Pre-trained Models</h3>
            <p class="text-sm text-secondary">
              Thousands of ready-to-use AI models (GPT, LLaMA, BERT, etc.)
            </p>
          </div>
          
          <div class="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200">
            <div class="text-3xl mb-2">📊</div>
            <h3 class="font-semibold mb-1">Datasets</h3>
            <p class="text-sm text-secondary">
              Curated datasets for training and benchmarking
            </p>
          </div>
          
          <div class="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200">
            <div class="text-3xl mb-2">🛠️</div>
            <h3 class="font-semibold mb-1">Tools & Libraries</h3>
            <p class="text-sm text-secondary">
              Transformers, Datasets, and other ML tools
            </p>
          </div>
        </div>
        
        <p>
          Think of it this way: if you want to build a website, you might use GitHub to find code. 
          If you want to build AI, you use Hugging Face to find models and data.
        </p>
      </div>
    </div>

    <!-- Why Use It -->
    <div class="card mb-6">
      <h2 class="text-xl font-semibold mb-4">Why Use Hugging Face for Fine-tuning?</h2>
      
      <div class="space-y-4">
        <div class="flex gap-4 items-start">
          <div class="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
            <span class="text-blue-600 font-bold">1</span>
          </div>
          <div>
            <h3 class="font-semibold mb-1">Access to Base Models</h3>
            <p class="text-secondary">
              Download foundation models like LLaMA, Mistral, or GPT-2 to start your fine-tuning
            </p>
          </div>
        </div>
        
        <div class="flex gap-4 items-start">
          <div class="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
            <span class="text-blue-600 font-bold">2</span>
          </div>
          <div>
            <h3 class="font-semibold mb-1">Share Your Trained Models</h3>
            <p class="text-secondary">
              After fine-tuning, upload your model so others can use it (or keep it private)
            </p>
          </div>
        </div>
        
        <div class="flex gap-4 items-start">
          <div class="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
            <span class="text-blue-600 font-bold">3</span>
          </div>
          <div>
            <h3 class="font-semibold mb-1">Inference API</h3>
            <p class="text-secondary">
              Test your models online without setting up infrastructure
            </p>
          </div>
        </div>
        
        <div class="flex gap-4 items-start">
          <div class="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
            <span class="text-blue-600 font-bold">4</span>
          </div>
          <div>
            <h3 class="font-semibold mb-1">Community & Documentation</h3>
            <p class="text-secondary">
              Extensive docs, tutorials, and a helpful community for beginners
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Key Concepts -->
    <div class="card mb-6">
      <h2 class="text-xl font-semibold mb-4">Key Concepts to Know</h2>
      
      <div class="space-y-4">
        <div class="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <h3 class="font-semibold mb-2">🏠 Model Hub</h3>
          <p class="text-secondary text-sm">
            Browse and download thousands of pre-trained models. Each model page shows:
            model size, license, community ratings, and example usage code.
          </p>
        </div>
        
        <div class="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <h3 class="font-semibold mb-2">📁 Datasets</h3>
          <p class="text-secondary text-sm">
            Search for training datasets by task (text generation, classification, etc.). 
            You can also upload your edukaAI dataset here.
          </p>
        </div>
        
        <div class="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <h3 class="font-semibold mb-2">🎪 Spaces</h3>
          <p class="text-secondary text-sm">
            Interactive demos of AI models. Great for testing models before downloading.
          </p>
        </div>
        
        <div class="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <h3 class="font-semibold mb-2">🐛 Transformers Library</h3>
          <p class="text-secondary text-sm">
            Python library for downloading and using models. The main tool for fine-tuning.
          </p>
        </div>
      </div>
    </div>

    <!-- Getting Started -->
    <div class="card mb-6">
      <h2 class="text-xl font-semibold mb-4">Getting Started with Fine-tuning</h2>
      
      <div class="space-y-4">
        <p class="text-gray-700">
          Here's the typical workflow when using Hugging Face for fine-tuning:
        </p>
        
        <div class="flex items-center gap-4 py-4">
          <div class="flex-1 text-center">
            <div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <span class="text-xl">📥</span>
            </div>
            <p class="text-sm font-medium">1. Download Base Model</p>
            <p class="text-xs text-tertiary">From Model Hub</p>
          </div>
          
          <div class="text-2xl text-gray-300">→</div>
          
          <div class="flex-1 text-center">
            <div class="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <span class="text-xl">📊</span>
            </div>
            <p class="text-sm font-medium">2. Prepare Dataset</p>
            <p class="text-xs text-tertiary">Use edukaAI!</p>
          </div>
          
          <div class="text-2xl text-gray-300">→</div>
          
          <div class="flex-1 text-center">
            <div class="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <span class="text-xl">⚙️</span>
            </div>
            <p class="text-sm font-medium">3. Fine-tune</p>
            <p class="text-xs text-tertiary">Train the model</p>
          </div>
          
          <div class="text-2xl text-gray-300">→</div>
          
          <div class="flex-1 text-center">
            <div class="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <span class="text-xl">📤</span>
            </div>
            <p class="text-sm font-medium">4. Upload Result</p>
            <p class="text-xs text-tertiary">Share your model</p>
          </div>
        </div>
      </div>
    </div>

    <!-- What to Expect -->
    <div class="card mb-6 bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200">
      <h2 class="text-xl font-semibold mb-4">⚠️ What to Expect</h2>
      
      <div class="space-y-3 text-gray-700">
        <p>
          <strong>Hugging Face is powerful but can be overwhelming for beginners.</strong> Here's what you should know:
        </p>
        
        <ul class="space-y-2 ml-4">
          <li class="flex items-start gap-2">
            <span class="text-yellow-600">•</span>
            <span>Requires Python knowledge and command line comfort</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="text-yellow-600">•</span>
            <span>Fine-tuning requires GPU (either local or cloud)</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="text-yellow-600">•</span>
            <span>Documentation is comprehensive but technical</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="text-yellow-600">•</span>
            <span>Many tutorials assume prior ML knowledge</span>
          </li>
        </ul>
        
        <p class="mt-4">
          <strong>💡 Tip:</strong> If you're completely new, consider using 
          <NuxtLink to="/docs/axolotl" class="text-blue-600 hover:underline font-semibold">Axolotl</NuxtLink> 
          first - it simplifies the Hugging Face workflow significantly.
        </p>
      </div>
    </div>

    <!-- Resources -->
    <div class="card mb-6">
      <h2 class="text-xl font-semibold mb-4">Helpful Resources</h2>
      
      <div class="space-y-3">
        <a href="https://huggingface.co/docs/transformers/training" target="_blank" 
           class="flex items-center gap-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg hover:bg-blue-100 transition-colors">
          <span class="text-2xl">📚</span>
          <div class="flex-1">
            <h3 class="font-semibold">Official Training Guide</h3>
            <p class="text-sm text-secondary">Hugging Face's complete fine-tuning tutorial</p>
          </div>
          <span class="text-blue-600">→</span>
        </a>
        
        <a href="https://huggingface.co/models" target="_blank"
           class="flex items-center gap-3 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg hover:bg-yellow-100 transition-colors">
          <span class="text-2xl">🤖</span>
          <div class="flex-1">
            <h3 class="font-semibold">Model Hub</h3>
            <p class="text-sm text-secondary">Browse thousands of pre-trained models</p>
          </div>
          <span class="text-yellow-600">→</span>
        </a>
        
        <a href="https://huggingface.co/datasets" target="_blank"
           class="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg hover:bg-green-100 transition-colors">
          <span class="text-2xl">📊</span>
          <div class="flex-1">
            <h3 class="font-semibold">Datasets</h3>
            <p class="text-sm text-secondary">Find datasets for your training tasks</p>
          </div>
          <span class="text-green-600">→</span>
        </a>
        
        <NuxtLink to="/how-llms-work"
           class="flex items-center gap-3 p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg hover:bg-purple-100 transition-colors">
          <span class="text-2xl">🎓</span>
          <div class="flex-1">
            <h3 class="font-semibold">edukaAI: How LLMs Work</h3>
            <p class="text-sm text-secondary">Understand the fundamentals before you start</p>
          </div>
          <span class="text-purple-600">→</span>
        </NuxtLink>
      </div>
    </div>

    <!-- Ready to Go -->
    <div class="card bg-gradient-to-r from-blue-600 to-purple-600 text-white">
      <h2 class="text-xl font-semibold mb-4">Ready to Start?</h2>
      
      <p class="mb-6 opacity-90">
        You now understand what Hugging Face is and how it fits into the fine-tuning workflow. 
        Remember, you can always come back to edukaAI to create more training data!
      </p>
      
      <div class="flex flex-col sm:flex-row gap-3">
        <a href="https://huggingface.co" target="_blank" 
           class="flex-1 bg-white text-blue-600 font-semibold py-3 px-6 rounded-lg text-center hover:bg-gray-100 transition-colors">
          Go to HuggingFace.co →
        </a>
        
        <NuxtLink to="/docs/axolotl"
           class="flex-1 bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg text-center hover:bg-blue-800 transition-colors">
          Learn About Axolotl →
        </NuxtLink>
        
        <NuxtLink to="/export"
           class="flex-1 bg-transparent border-2 border-white text-white font-semibold py-3 px-6 rounded-lg text-center hover:bg-white/10 transition-colors">
          ← Back to Export
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'default'
})
</script>
