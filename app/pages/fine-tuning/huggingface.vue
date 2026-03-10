<template>
  <div class="max-w-6xl mx-auto">
    <div class="mb-8">
      <div class="flex items-center gap-2 mb-2">
        <NuxtLink to="/fine-tuning" class="text-blue-600 hover:underline text-sm">← All Methods</NuxtLink>
      </div>
      <h1 class="text-3xl font-bold mb-2 flex items-center gap-3">
        <span class="text-4xl">🤗</span>
        Fine-Tune with Hugging Face
      </h1>
      <p class="text-secondary">
        Use the "GitHub of AI" for cloud training, sharing models, and accessing a huge ecosystem of tools.
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
              Export your dataset from the Export page. Hugging Face accepts JSON files directly.
            </p>
            <NuxtLink to="/export" class="text-blue-600 hover:underline text-sm">Go to Export →</NuxtLink>
          </div>
        </div>

        <div class="flex items-start gap-3">
          <span class="text-xl">👤</span>
          <div>
            <h3 class="font-semibold">2. Hugging Face Account</h3>
            <p class="text-sm text-secondary mb-2">
              Create a free account at <a href="https://huggingface.co" target="_blank" class="text-blue-600 underline">huggingface.co</a>
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Option 1: AutoTrain -->
    <div class="card mb-6">
      <h2 class="text-xl font-semibold mb-4 flex items-center gap-2">
        <span class="w-8 h-8 bg-yellow-500 text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
        Method A: AutoTrain (Easiest)
      </h2>

      <div class="space-y-4">
        <p class="text-sm text-secondary">
          AutoTrain is Hugging Face's no-code solution. Just upload your data and click train!
        </p>

        <div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
          <ol class="space-y-3 text-sm">
            <li class="flex items-start gap-2">
              <span class="font-bold text-blue-600">1.</span>
              <span>Go to <a href="https://ui.autotrain.huggingface.co" target="_blank" class="text-blue-600 underline">AutoTrain</a></span>
            </li>
            <li class="flex items-start gap-2">
              <span class="font-bold text-blue-600">2.</span>
              <span>Select "LLM Fine-tuning" project type</span>
            </li>
            <li class="flex items-start gap-2">
              <span class="font-bold text-blue-600">3.</span>
              <span>Upload your exported JSON file</span>
            </li>
            <li class="flex items-start gap-2">
              <span class="font-bold text-blue-600">4.</span>
              <span>Choose a base model (TinyLlama-1.1B recommended for testing)</span>
            </li>
            <li class="flex items-start gap-2">
              <span class="font-bold text-blue-600">5.</span>
              <span>Click "Start Training"</span>
            </li>
          </ol>
        </div>

        <div class="info-box-green">
          <p class="text-sm text-green-800 dark:text-green-200">
            <strong>✅ Done!</strong> AutoTrain handles everything: preprocessing, training, and saving your model.
          </p>
        </div>
      </div>
    </div>

    <!-- Option 2: Notebooks -->
    <div class="card mb-6">
      <h2 class="text-xl font-semibold mb-4 flex items-center gap-2">
        <span class="w-8 h-8 bg-yellow-500 text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
        Method B: Training Notebooks
      </h2>

      <div class="space-y-4">
        <p class="text-sm text-secondary">
          For more control, use Hugging Face's training notebooks in Google Colab or locally.
        </p>

        <div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
          <h4 class="font-semibold mb-2">Quick Steps:</h4>
          <ol class="space-y-2 text-sm">
            <li>1. Search "LLM fine-tuning Hugging Face" in their docs</li>
            <li>2. Open a notebook in Google Colab</li>
            <li>3. Upload your EdukaAI dataset</li>
            <li>4. Run cells sequentially</li>
            <li>5. Download your fine-tuned model</li>
          </ol>
        </div>

        <div class="info-box-blue">
          <h4 class="font-semibold text-blue-900 dark:text-blue-100 mb-2">📚 Popular Notebooks</h4>
          <ul class="text-sm text-secondary space-y-1">
            <li>• <strong>TRL (Transformer Reinforcement Learning):</strong> SFTTrainer for supervised fine-tuning</li>
            <li>• <strong>PEFT:</strong> LoRA and QLoRA examples</li>
            <li>• <strong>Unsloth:</strong> 2x faster training notebooks</li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Option 3: Local with HF -->
    <div class="card mb-6">
      <h2 class="text-xl font-semibold mb-4 flex items-center gap-2">
        <span class="w-8 h-8 bg-yellow-500 text-white rounded-full flex items-center justify-center text-sm font-bold">3</span>
        Method C: Local Training with HF Tools
      </h2>

      <div class="space-y-4">
        <p class="text-sm text-secondary">
          Use Hugging Face libraries on your own computer:
        </p>

        <div class="bg-gray-800 text-gray-200 p-4 rounded-lg">
          <pre class="text-sm"><code># Install libraries
pip install transformers datasets peft accelerate

# Load your EdukaAI dataset
from datasets import load_dataset
dataset = load_dataset('json', data_files='your_exported_file_alpaca.json')

# Fine-tune with PEFT/LoRA
from peft import LoraConfig
from transformers import AutoModelForCausalLM

model = AutoModelForCausalLM.from_pretrained('TinyLlama/TinyLlama-1.1B-Chat-v1.0')
# ... training code ...</code></pre>
        </div>
      </div>
    </div>

    <!-- Step 4: Share -->
    <div class="card mb-6">
      <h2 class="text-xl font-semibold mb-4 flex items-center gap-2">
        <span class="w-8 h-8 bg-yellow-500 text-white rounded-full flex items-center justify-center text-sm font-bold">4</span>
        Share Your Model
      </h2>

      <div class="space-y-4">
        <p class="text-sm text-secondary">
          One of Hugging Face's best features: easily share your fine-tuned model with the world!
        </p>

        <div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
          <code class="block bg-gray-800 text-gray-200 p-3 rounded text-sm">
from huggingface_hub import HfApi
api = HfApi()
api.upload_folder(folder_path="./model-output", repo_id="your-username/my-edukaai-model")
          </code>
        </div>

        <div class="info-box-purple">
          <p class="text-sm text-purple-800 dark:text-purple-200">
            <strong>🌟 Benefits of sharing:</strong> Others can download your model, you get feedback, and you build a portfolio!
          </p>
        </div>
      </div>
    </div>

    <!-- Tips -->
    <div class="card mb-6 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20">
      <h2 class="text-xl font-semibold mb-4">💡 Hugging Face Tips</h2>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
        <div class="space-y-2">
          <div class="p-3 bg-white dark:bg-gray-800 rounded-lg">
            <p class="font-semibold">🤝 Community</p>
            <p class="text-secondary">Join discussions and get help from the community on model pages.</p>
          </div>
          <div class="p-3 bg-white dark:bg-gray-800 rounded-lg">
            <p class="font-semibold">🏆 Leaderboards</p>
            <p class="text-secondary">Compare models on Open LLM Leaderboard to see how yours ranks.</p>
          </div>
        </div>
        <div class="space-y-2">
          <div class="p-3 bg-white dark:bg-gray-800 rounded-lg">
            <p class="font-semibold">📊 Inference API</p>
            <p class="text-secondary">Test models instantly on the website without downloading.</p>
          </div>
          <div class="p-3 bg-white dark:bg-gray-800 rounded-lg">
            <p class="font-semibold">🔒 Private Models</p>
            <p class="text-secondary">Keep models private while testing, then make public when ready.</p>
          </div>
        </div>
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
