<template>
  <div class="max-w-6xl mx-auto">
    <div class="mb-8">
      <div class="flex items-center gap-2 mb-2">
        <NuxtLink to="/fine-tuning" class="text-blue-600 hover:underline text-sm">← All Methods</NuxtLink>
      </div>
      <h1 class="text-3xl font-bold mb-2 flex items-center gap-3">
        <span class="text-4xl">📓</span>
        Fine-Tune with Google Colab
      </h1>
      <p class="text-secondary">
        Free Jupyter notebooks with GPU access! No local setup required - perfect for learning and experimentation.
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
              Export your dataset from the Export page. You'll upload it to Colab.
            </p>
            <NuxtLink to="/export" class="text-blue-600 hover:underline text-sm">Go to Export →</NuxtLink>
          </div>
        </div>

        <div class="flex items-start gap-3">
          <span class="text-xl">👤</span>
          <div>
            <h3 class="font-semibold">2. Google Account</h3>
            <p class="text-sm text-secondary">
              Any Google account (Gmail) gives you free access to Colab.
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- What is Colab -->
    <div class="card mb-6 bg-red-50 dark:bg-red-900/20">
      <h2 class="text-xl font-semibold mb-4">💡 What is Google Colab?</h2>
      <p class="text-sm text-secondary mb-3">
        Google Colab is a free cloud service that provides Jupyter notebooks with access to GPUs. You write and run Python code in your browser - no installation needed!
      </p>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
        <div class="p-3 bg-white dark:bg-gray-800 rounded-lg">
          <p class="font-semibold text-green-700 dark:text-green-400">✅ Free</p>
          <p class="text-secondary mt-1">No cost to use, includes free T4 GPU</p>
        </div>
        <div class="p-3 bg-white dark:bg-gray-800 rounded-lg">
          <p class="font-semibold text-green-700 dark:text-green-400">✅ No Setup</p>
          <p class="text-secondary mt-1">Everything runs in your browser</p>
        </div>
        <div class="p-3 bg-white dark:bg-gray-800 rounded-lg">
          <p class="font-semibold text-green-700 dark:text-green-400">✅ GPU Included</p>
          <p class="text-secondary mt-1">Free Tesla T4 GPU (12GB VRAM)</p>
        </div>
      </div>
    </div>

    <!-- Step 1: Open Colab -->
    <div class="card mb-6">
      <h2 class="text-xl font-semibold mb-4 flex items-center gap-2">
        <span class="w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
        Open Google Colab
      </h2>

      <div class="space-y-4">
        <div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
          <ol class="space-y-2 text-sm">
            <li class="flex items-start gap-2">
              <span class="font-bold text-red-600">1.</span>
              <span>Go to <a href="https://colab.research.google.com" target="_blank" class="text-blue-600 underline">colab.research.google.com</a></span>
            </li>
            <li class="flex items-start gap-2">
              <span class="font-bold text-red-600">2.</span>
              <span>Sign in with your Google account</span>
            </li>
            <li class="flex items-start gap-2">
              <span class="font-bold text-red-600">3.</span>
              <span>Click "New Notebook"</span>
            </li>
          </ol>
        </div>
      </div>
    </div>

    <!-- Step 2: Enable GPU -->
    <div class="card mb-6">
      <h2 class="text-xl font-semibold mb-4 flex items-center gap-2">
        <span class="w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
        Enable GPU (Important!)
      </h2>

      <div class="space-y-4">
        <div class="info-box-yellow">
          <p class="text-sm text-yellow-800 mb-2">
            <strong>⚠️ You MUST enable GPU for training!</strong>
          </p>
          <ol class="text-sm text-yellow-700 space-y-1 ml-4">
            <li>1. Click <strong>Runtime</strong> in the menu</li>
            <li>2. Select <strong>Change runtime type</strong></li>
            <li>3. Choose <strong>T4 GPU</strong> from the dropdown</li>
            <li>4. Click <strong>Save</strong></li>
          </ol>
        </div>

        <div class="info-box-green">
          <p class="text-sm text-green-800">
            <strong>✅ Verify GPU:</strong> Run this in a code cell:
          </p>
          <code class="block bg-gray-800 text-gray-200 p-3 rounded text-sm mt-2">
!nvidia-smi
          </code>
          <p class="text-xs text-secondary mt-2">
            You should see "Tesla T4" in the output
          </p>
        </div>
      </div>
    </div>

    <!-- Step 3: Upload Data -->
    <div class="card mb-6">
      <h2 class="text-xl font-semibold mb-4 flex items-center gap-2">
        <span class="w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center text-sm font-bold">3</span>
        Upload Your Dataset
      </h2>

      <div class="space-y-4">
        <p class="text-sm text-secondary">
          Upload your exported EdukaAI dataset to Colab:
        </p>

        <div class="bg-gray-800 text-gray-200 p-4 rounded-lg">
          <pre class="text-sm"><code># Upload your dataset
from google.colab import files
uploaded = files.upload()

# The file will be uploaded to the current directory
# You'll see the filename printed after upload</code></pre>
        </div>

        <div class="info-box-blue">
          <p class="text-sm text-blue-800">
            <strong>💡 Alternative:</strong> You can also mount Google Drive and load the file from there:
          </p>
          <code class="block bg-gray-800 text-gray-200 p-3 rounded text-sm mt-2">
from google.colab import drive
drive.mount('/content/drive')
          </code>
        </div>
      </div>
    </div>

    <!-- Step 4: Fine-Tune -->
    <div class="card mb-6">
      <h2 class="text-xl font-semibold mb-4 flex items-center gap-2">
        <span class="w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center text-sm font-bold">4</span>
        Run Fine-Tuning
      </h2>

      <div class="space-y-4">
        <p class="text-sm text-secondary">
          Here's a simple training template using Hugging Face libraries:
        </p>

        <div class="bg-gray-800 text-gray-200 p-4 rounded-lg overflow-x-auto">
          <pre class="text-sm"><code># Install libraries
!pip install transformers datasets peft accelerate

# Load libraries
from transformers import AutoModelForCausalLM, AutoTokenizer, TrainingArguments
from datasets import load_dataset
from peft import LoraConfig, get_peft_model

# Load base model
model = AutoModelForCausalLM.from_pretrained(
    "TinyLlama/TinyLlama-1.1B-Chat-v1.0",
    load_in_4bit=True  # Use 4-bit to save memory
)
tokenizer = AutoTokenizer.from_pretrained("TinyLlama/TinyLlama-1.1B-Chat-v1.0")

# Load your EdukaAI dataset
dataset = load_dataset('json', data_files='your_exported_file.json')

# Setup LoRA
lora_config = LoraConfig(
    r=8,
    lora_alpha=16,
    target_modules=["q_proj", "v_proj"],
    lora_dropout=0.05,
    bias="none",
    task_type="CAUSAL_LM"
)
model = get_peft_model(model, lora_config)

# Training arguments
training_args = TrainingArguments(
    output_dir="./results",
    num_train_epochs=1,
    per_device_train_batch_size=1,
    learning_rate=2e-4,
    logging_steps=10,
)

# ... (training code continues)</code></pre>
        </div>

        <div class="info-box-purple">
          <h4 class="font-semibold text-purple-900 dark:text-purple-100 mb-2">📚 Pre-made Templates</h4>
          <p class="text-sm text-secondary mb-2">
            Search for these on Hugging Face or in Colab's examples:
          </p>
          <ul class="text-sm text-secondary space-y-1 ml-4">
            <li>• "LLM fine-tuning with PEFT"</li>
            <li>• "Alpaca training notebook"</li>
            <li>• "LoRA fine-tuning tutorial"</li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Step 5: Save and Download -->
    <div class="card mb-6">
      <h2 class="text-xl font-semibold mb-4 flex items-center gap-2">
        <span class="w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center text-sm font-bold">5</span>
        Save and Download Your Model
      </h2>

      <div class="space-y-4">
        <div class="bg-gray-800 text-gray-200 p-4 rounded-lg">
          <pre class="text-sm"><code># Save your fine-tuned model
model.save_pretrained("./my-finetuned-model")
tokenizer.save_pretrained("./my-finetuned-model")

# Download to your computer
from google.colab import files
!zip -r my-finetuned-model.zip my-finetuned-model
files.download("my-finetuned-model.zip")</code></pre>
        </div>
      </div>
    </div>

    <!-- Limitations -->
    <div class="card mb-6 bg-yellow-50 dark:bg-yellow-900/20">
      <h2 class="text-xl font-semibold mb-4">⚠️ Free Tier Limits</h2>
      
      <div class="space-y-3 text-sm">
        <div class="p-3 bg-white dark:bg-gray-800 rounded-lg">
          <p class="font-semibold">⏱️ Time Limits</p>
          <p class="text-secondary">Free tier provides ~12 hours of GPU time per day. Idle sessions timeout after 90 minutes.</p>
        </div>
        <div class="p-3 bg-white dark:bg-gray-800 rounded-lg">
          <p class="font-semibold">💾 Memory</p>
          <p class="text-secondary">T4 GPU has 12GB VRAM. Use smaller models (1B-3B parameters) or 4-bit quantization.</p>
        </div>
        <div class="p-3 bg-white dark:bg-gray-800 rounded-lg">
          <p class="font-semibold">🔌 Session End</p>
          <p class="text-secondary">When you close the browser, the runtime resets. Always save results to Google Drive!</p>
        </div>
      </div>
    </div>

    <!-- Tips -->
    <div class="card mb-6 bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20">
      <h2 class="text-xl font-semibold mb-4">💡 Colab Tips</h2>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
        <div class="space-y-2">
          <div class="p-3 bg-white dark:bg-gray-800 rounded-lg">
            <p class="font-semibold">💾 Save to Drive</p>
            <p class="text-secondary">Mount Google Drive to save models between sessions.</p>
          </div>
          <div class="p-3 bg-white dark:bg-gray-800 rounded-lg">
            <p class="font-semibold">🔋 Prevent Timeout</p>
            <p class="text-secondary">Keep the browser tab active, or use a JavaScript snippet to prevent idle timeout.</p>
          </div>
        </div>
        <div class="space-y-2">
          <div class="p-3 bg-white dark:bg-gray-800 rounded-lg">
            <p class="font-semibold">📱 Mobile Friendly</p>
            <p class="text-secondary">You can start training on your phone and check later!</p>
          </div>
          <div class="p-3 bg-white dark:bg-gray-800 rounded-lg">
            <p class="font-semibold">🤝 Share Notebooks</p>
            <p class="text-secondary">Share your training notebook with others - they can run it too!</p>
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
