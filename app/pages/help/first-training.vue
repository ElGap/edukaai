<template>
  <div class="max-w-4xl mx-auto">
    <!-- Header -->
    <div class="mb-8">
      <div class="flex items-center gap-3 mb-4">
        <NuxtLink to="/export" class="text-blue-600 hover:text-blue-800">
          ← Back to Export
        </NuxtLink>
      </div>
      <div class="bg-gradient-to-r from-green-500 to-emerald-600 text-white p-6 rounded-2xl mb-6">
        <h1 class="text-3xl font-bold mb-2">🎯 Your First Fine-tuning</h1>
        <p class="text-xl opacity-90">
          Complete step-by-step guide. The technical part is easy — focus on creating great training data!
        </p>
      </div>
    </div>

    <!-- Progress Tracker -->
    <div class="card mb-6">
      <h2 class="text-lg font-semibold mb-4">Your Progress</h2>
      <div class="relative">
        <!-- Progress Line -->
        <div class="absolute top-1/2 left-0 right-0 h-1 bg-gray-200 -translate-y-1/2 z-0"></div>
        <div class="absolute top-1/2 left-0 w-2/3 h-1 bg-green-500 -translate-y-1/2 z-0"></div>
        
        <!-- Steps -->
        <div class="relative z-10 flex justify-between">
          <div class="flex flex-col items-center">
            <div class="w-10 h-10 bg-green-500 text-white rounded-full flex items-center justify-center font-bold text-lg mb-2">
              ✓
            </div>
            <span class="text-sm font-medium text-green-700">Create Dataset</span>
            <span class="text-xs text-gray-500">Done in edukaAI</span>
          </div>
          
          <div class="flex flex-col items-center">
            <div class="w-10 h-10 bg-green-500 text-white rounded-full flex items-center justify-center font-bold text-lg mb-2">
              ✓
            </div>
            <span class="text-sm font-medium text-green-700">Export Data</span>
            <span class="text-xs text-gray-500">Downloaded JSON</span>
          </div>
          
          <div class="flex flex-col items-center">
            <div class="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg mb-2 animate-pulse">
              3
            </div>
            <span class="text-sm font-medium text-blue-700">Train Model</span>
            <span class="text-xs text-gray-500">You are here →</span>
          </div>
          
          <div class="flex flex-col items-center">
            <div class="w-10 h-10 bg-gray-300 text-gray-500 rounded-full flex items-center justify-center font-bold text-lg mb-2">
              4
            </div>
            <span class="text-sm font-medium text-gray-500">Test Model</span>
            <span class="text-xs text-gray-500">Chat with AI</span>
          </div>
        </div>
      </div>
      
      <div class="mt-6 p-3 bg-blue-50 rounded-lg border border-blue-200 text-center">
        <p class="text-sm text-blue-800">
          <strong>⏱️ Total Time:</strong> ~25 minutes active work + 15-20 minutes computer processing
        </p>
      </div>
    </div>

    <!-- Pre-flight Checklist -->
    <div class="card mb-6 border-2 border-yellow-300 bg-gradient-to-r from-yellow-50 to-orange-50">
      <h2 class="text-xl font-semibold mb-4 flex items-center gap-2">
        <span class="text-2xl">✅</span>
        Pre-Flight Checklist
      </h2>
      <p class="text-gray-700 mb-4">Before you start, make sure you have:</p>
      
      <div class="space-y-3">
        <div class="flex items-start gap-3 p-3 bg-white rounded-lg border border-yellow-200">
          <input 
            type="checkbox" 
            id="check-dataset" 
            class="w-5 h-5 mt-0.5 text-green-600 rounded border-gray-300 focus:ring-green-500"
          >
          <label for="check-dataset" class="flex-1 cursor-pointer">
            <span class="font-semibold text-gray-800">Dataset File</span>
            <p class="text-sm text-gray-600">
              You have <code class="bg-gray-100 px-1 rounded">dataset_alpaca.json</code> from edukaAI export
              <NuxtLink to="/export" class="text-blue-600 hover:underline ml-1">(get it here)</NuxtLink>
            </p>
          </label>
        </div>

        <div class="flex items-start gap-3 p-3 bg-white rounded-lg border border-yellow-200">
          <input 
            type="checkbox" 
            id="check-python" 
            class="w-5 h-5 mt-0.5 text-green-600 rounded border-gray-300 focus:ring-green-500"
          >
          <label for="check-python" class="flex-1 cursor-pointer">
            <span class="font-semibold text-gray-800">Python 3.9+</span>
            <p class="text-sm text-gray-600">
              Check by running: <code class="bg-gray-800 text-green-400 px-2 py-0.5 rounded text-xs">python --version</code> in terminal
            </p>
          </label>
        </div>

        <div class="flex items-start gap-3 p-3 bg-white rounded-lg border border-yellow-200">
          <input 
            type="checkbox" 
            id="check-time" 
            class="w-5 h-5 mt-0.5 text-green-600 rounded border-gray-300 focus:ring-green-500"
          >
          <label for="check-time" class="flex-1 cursor-pointer">
            <span class="font-semibold text-gray-800">20-30 Minutes</span>
            <p class="text-sm text-gray-600">
              Training takes 15-20 minutes of computer time. You can do other things while it runs!
            </p>
          </label>
        </div>

        <div class="flex items-start gap-3 p-3 bg-white rounded-lg border border-yellow-200">
          <input 
            type="checkbox" 
            id="check-expectations" 
            class="w-5 h-5 mt-0.5 text-green-600 rounded border-gray-300 focus:ring-green-500"
          >
          <label for="check-expectations" class="flex-1 cursor-pointer">
            <span class="font-semibold text-gray-800">Realistic Expectations</span>
            <p class="text-sm text-gray-600">
              With 10-20 examples, results will be okay but inconsistent. That's normal! 
              This is a learning exercise, not production AI.
            </p>
          </label>
        </div>
      </div>

      <div class="mt-4 p-3 bg-green-100 rounded-lg border border-green-300">
        <p class="text-sm text-green-800 text-center font-medium">
          ✨ Checked all 4 boxes? You're ready to start!
        </p>
      </div>
    </div>

    <!-- The Promise -->
    <div class="card mb-6 bg-gradient-to-r from-blue-50 to-purple-50">
      <h2 class="text-xl font-semibold mb-4">What You'll Accomplish</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div class="text-center p-4">
          <div class="text-4xl mb-2">📊</div>
          <h3 class="font-semibold mb-1">Export Data</h3>
          <p class="text-sm text-gray-600">Already done in edukaAI</p>
        </div>
        <div class="text-center p-4">
          <div class="text-4xl mb-2">⚙️</div>
          <h3 class="font-semibold mb-1">Train Model</h3>
          <p class="text-sm text-gray-600">Just 3 simple commands</p>
        </div>
        <div class="text-center p-4">
          <div class="text-4xl mb-2">🎉</div>
          <h3 class="font-semibold mb-1">Chat with AI</h3>
          <p class="text-sm text-gray-600">That learned from YOUR data</p>
        </div>
      </div>
      <div class="mt-4 p-4 bg-white rounded-lg border-2 border-green-200">
        <p class="text-center text-green-800 font-medium">
          💡 Remember: Training the model is the <strong>easy part</strong>. 
          Creating quality training data is where the magic happens — and that's what edukaAI helps you with!
        </p>
      </div>
    </div>

    <!-- Prerequisites -->
    <div class="card mb-6">
      <h2 class="text-xl font-semibold mb-4">📋 Before You Start (Prerequisites)</h2>
      
      <div class="space-y-4">
        <div class="flex items-start gap-4 p-4 bg-green-50 rounded-lg border border-green-200">
          <div class="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">✓</div>
          <div>
            <h3 class="font-semibold text-green-800">Your Dataset from edukaAI</h3>
            <p class="text-gray-700">
              You should have exported your dataset as <code>dataset_alpaca.json</code>. 
              If not, <NuxtLink to="/export" class="text-blue-600 hover:underline">go to Export</NuxtLink> first.
            </p>
          </div>
        </div>

        <div class="flex items-start gap-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <div class="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">1</div>
          <div>
            <h3 class="font-semibold text-blue-800">Python 3.9 or higher</h3>
            <p class="text-gray-700 mb-2">Check if you have it:</p>
            <div class="relative group">
              <code class="block bg-gray-800 text-green-400 p-3 rounded text-sm">python --version</code>
              <button 
                @click="copyCode('python --version', 0)"
                class="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-700 hover:bg-gray-600 text-white text-xs px-2 py-1 rounded flex items-center gap-1"
              >
                <span v-if="copiedIndex === 0">✓ Copied!</span>
                <span v-else>📋 Copy</span>
              </button>
            </div>
            <p class="text-sm text-gray-600 mt-2">
              Don't have it? 
              <a href="https://www.python.org/downloads/" target="_blank" class="text-blue-600 hover:underline">Download Python</a>
            </p>
          </div>
        </div>

        <div class="flex items-start gap-4 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
          <div class="w-8 h-8 bg-yellow-500 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">2</div>
          <div>
            <h3 class="font-semibold text-yellow-800">A GPU... OR Use Hugging Face!</h3>
            <p class="text-gray-700 mb-2">
              Training requires a GPU, unless you use Hugging Face AutoTrain. Choose your path:
            </p>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div class="p-3 bg-white rounded border">
                <h4 class="font-semibold text-sm mb-1">Option A: Your Computer</h4>
                <p class="text-xs text-gray-600">If you have an NVIDIA GPU with 8GB+ VRAM</p>
              </div>
              <div class="p-3 bg-white rounded border border-green-300 bg-green-50">
                <h4 class="font-semibold text-sm mb-1 text-green-700">Option B: Google Colab ⭐</h4>
                <p class="text-xs text-gray-600">Free GPU in the cloud. Great for beginners!</p>
              </div>
              <div class="p-3 bg-white rounded border border-yellow-300 bg-yellow-50">
                <h4 class="font-semibold text-sm mb-1 text-yellow-700">Option C: Hugging Face 🤗</h4>
                <p class="text-xs text-gray-600">No GPU needed! Web-based, easiest for non-coders</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Using Google Colab (Recommended) -->
    <div class="card mb-6 border-2 border-green-300">
      <div class="flex items-center gap-3 mb-4">
        <span class="text-3xl">☁️</span>
        <h2 class="text-2xl font-bold text-green-700">Path A: Google Colab (Easiest - Free GPU!)</h2>
      </div>
      
      <p class="text-gray-700 mb-6">
        Google Colab provides a free GPU in the cloud. No setup on your computer needed. 
        This is the <strong>recommended path for beginners</strong>.
      </p>

      <!-- Step 1 -->
      <div class="mb-6">
        <div class="flex items-center justify-between mb-3">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-xl">1</div>
            <div>
              <h3 class="text-lg font-semibold">Upload Your Dataset</h3>
              <span class="text-sm text-gray-500">⏱️ 2 minutes</span>
            </div>
          </div>
        </div>
        <div class="ml-13 pl-4 border-l-4 border-blue-200">
          <ol class="list-decimal list-inside space-y-2 text-gray-700">
            <li>Go to <a href="https://colab.research.google.com" target="_blank" class="text-blue-600 hover:underline font-semibold">Google Colab</a></li>
            <li>Click "New Notebook"</li>
            <li>In the left sidebar, click the 📁 folder icon</li>
            <li>Click "Upload" and select your <code>dataset_alpaca.json</code> file</li>
            <li>Wait for upload to complete (green checkmark)</li>
          </ol>
          <div class="mt-3 p-3 bg-gray-50 rounded text-sm">
            <strong>💡 Tip:</strong> The file will appear in the <code>/content/</code> folder
          </div>
          <div class="mt-2 p-2 bg-yellow-50 rounded border border-yellow-200 text-sm">
            <strong>🆘 Stuck?</strong> File not uploading? Try refreshing the page or checking file size (should be < 50MB)
          </div>
        </div>
      </div>

      <!-- Step 2 -->
      <div class="mb-6">
        <div class="flex items-center justify-between mb-3">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-xl">2</div>
            <div>
              <h3 class="text-lg font-semibold">Enable GPU</h3>
              <span class="text-sm text-gray-500">⏱️ 1 minute</span>
            </div>
          </div>
        </div>
        <div class="ml-13 pl-4 border-l-4 border-blue-200">
          <ol class="list-decimal list-inside space-y-2 text-gray-700">
            <li>Click "Runtime" in the top menu</li>
            <li>Click "Change runtime type"</li>
            <li>Under "Hardware accelerator", select "T4 GPU"</li>
            <li>Click "Save"</li>
          </ol>
          <div class="mt-2 p-2 bg-yellow-50 rounded border border-yellow-200 text-sm">
            <strong>⚠️ Important:</strong> Without GPU, training will be extremely slow (hours instead of minutes) or may fail!
          </div>
        </div>
      </div>

      <!-- Step 3 -->
      <div class="mb-6">
        <div class="flex items-center justify-between mb-3">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-xl">3</div>
            <div>
              <h3 class="text-lg font-semibold">Install Axolotl</h3>
              <span class="text-sm text-gray-500">⏱️ 3 minutes (mostly waiting)</span>
            </div>
          </div>
        </div>
        <div class="ml-13 pl-4 border-l-4 border-blue-200">
          <p class="text-gray-700 mb-2">In the first code cell, type:</p>
          <code class="block bg-gray-800 text-green-400 p-3 rounded text-sm mb-2">
            !pip install axolotl
          </code>
          <p class="text-gray-700">Press <kbd class="bg-gray-200 px-2 py-1 rounded">Shift</kbd> + <kbd class="bg-gray-200 px-2 py-1 rounded">Enter</kbd> to run</p>
          <div class="mt-3 p-3 bg-yellow-50 rounded border border-yellow-200 text-sm">
            <strong>⏳ Wait:</strong> Installation takes 2-3 minutes. Watch the output scroll by! You'll see progress bars.
          </div>
          <div class="mt-2 p-2 bg-red-50 rounded border border-red-200 text-sm">
            <strong>🆘 Error?</strong> If you see red text, try: <code>!pip install --upgrade axolotl</code> or restart runtime (Runtime → Restart runtime)
          </div>
        </div>
      </div>

      <!-- Step 4 -->
      <div class="mb-6">
        <div class="flex items-center justify-between mb-3">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-xl">4</div>
            <div>
              <h3 class="text-lg font-semibold">Create Your Config</h3>
              <span class="text-sm text-gray-500">⏱️ 3 minutes</span>
            </div>
          </div>
        </div>
        <div class="ml-13 pl-4 border-l-4 border-blue-200">
          <p class="text-gray-700 mb-2">Create a new code cell and paste this:</p>
          <pre class="bg-gray-800 text-green-400 p-3 rounded text-sm overflow-x-auto"><code>config = '''
base_model: TinyLlama/TinyLlama-1.1B-Chat-v1.0
model_type: LlamaForCausalLM
tokenizer_type: LlamaTokenizer

# Your edukaAI dataset
datasets:
  - path: /content/dataset_alpaca.json
    type: alpaca

# Training settings (keep it simple!)
num_epochs: 3
micro_batch_size: 1
gradient_accumulation_steps: 4
learning_rate: 0.0002

# Where to save your trained model
output_dir: /content/my-first-model

# Use less memory (good for Colab)
load_in_8bit: true
'''

# Save the config
with open('/content/config.yaml', 'w') as f:
    f.write(config)
    
print("✅ Config created!")</code></pre>
          <p class="text-gray-700 mt-2">Run it with <kbd class="bg-gray-200 px-2 py-1 rounded">Shift</kbd> + <kbd class="bg-gray-200 px-2 py-1 rounded">Enter</kbd></p>
          <div class="mt-2 p-2 bg-blue-50 rounded border border-blue-200 text-sm">
            <strong>💡 Tip:</strong> If your dataset filename is different, change <code>/content/dataset_alpaca.json</code> to match
          </div>
        </div>
      </div>

      <!-- Step 5 -->
      <div class="mb-6">
        <div class="flex items-center justify-between mb-3">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold text-xl">5</div>
            <div>
              <h3 class="text-lg font-semibold">Train Your Model! 🚀</h3>
              <span class="text-sm text-gray-500">⏱️ 15-20 minutes ☕ (computer does the work)</span>
            </div>
          </div>
        </div>
        <div class="ml-13 pl-4 border-l-4 border-purple-200">
          <p class="text-gray-700 mb-2">Create another code cell:</p>
          <code class="block bg-gray-800 text-green-400 p-3 rounded text-sm mb-2">
            !axolotl train /content/config.yaml
          </code>
          <p class="text-gray-700">Run it and watch the magic happen! ✨</p>
          <div class="mt-3 p-3 bg-blue-50 rounded border border-blue-200 text-sm">
            <strong>What you'll see:</strong><br>
            • Loading model... ✓<br>
            • Loading dataset... ✓<br>
            • Epoch 1/3: [████████] 100%<br>
            • Epoch 2/3: [████████] 100%<br>
            • Epoch 3/3: [████████] 100%<br>
            • Training complete! ✓
          </div>
          <div class="mt-2 p-2 bg-yellow-50 rounded border border-yellow-200 text-sm">
            <strong>☕ This takes time:</strong> Go grab coffee! The computer is working. Don't close the tab.
          </div>
          <div class="mt-2 p-2 bg-red-50 rounded border border-red-200 text-sm">
            <strong>🆘 Taking >30 mins?</strong> This is too long. Try:<br>
            • Change model to <code>TinyLlama/TinyLlama-1.1B-Chat-v1.0</code> (smaller = faster)<br>
            • Or add <code>num_epochs: 1</code> to config (less training)
          </div>
          <div class="mt-2 p-2 bg-red-50 rounded border border-red-200 text-sm">
            <strong>🆘 Out of Memory error?</strong> Add this to config:<br>
            <code>load_in_4bit: true</code> (instead of 8bit)<br>
            Or use even smaller model
          </div>
        </div>
      </div>

      <!-- Step 6 -->
      <div class="mb-6">
        <div class="flex items-center justify-between mb-3">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-xl">6</div>
            <div>
              <h3 class="text-lg font-semibold">Chat With Your Model 💬</h3>
              <span class="text-sm text-gray-500">⏱️ 5 minutes</span>
            </div>
          </div>
        </div>
        <div class="ml-13 pl-4 border-l-4 border-green-200">
          <p class="text-gray-700 mb-2">After training completes, test your model:</p>
          <pre class="bg-gray-800 text-green-400 p-3 rounded text-sm overflow-x-auto"><code>from transformers import AutoModelForCausalLM, AutoTokenizer
import torch

# Load your trained model
model_path = "/content/my-first-model"
model = AutoModelForCausalLM.from_pretrained(
    model_path,
    torch_dtype=torch.float16,
    device_map="auto"
)
tokenizer = AutoTokenizer.from_pretrained(model_path)

# Test it!
prompt = "What is photosynthesis?"
inputs = tokenizer(prompt, return_tensors="pt").to(model.device)

# Generate response
with torch.no_grad():
    outputs = model.generate(
        **inputs,
        max_new_tokens=100,
        temperature=0.7
    )

response = tokenizer.decode(outputs[0], skip_special_tokens=True)
print(f"You: {prompt}")
print(f"Model: {response}")</code></pre>
          <div class="mt-3 p-3 bg-green-100 rounded text-sm text-green-800">
            <strong>🎉 Success!</strong> If you see a response (even if imperfect), you trained your first AI model!
          </div>
          <div class="mt-2 p-2 bg-gray-50 rounded border border-gray-200 text-sm">
            <strong>What to expect:</strong> With only 10-20 training examples, responses will be <strong>okay but inconsistent</strong>. Some will be great, some weird. This is normal!
          </div>
        </div>
      </div>

      <!-- Step 7 -->
      <div>
        <div class="flex items-center justify-between mb-3">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 bg-yellow-600 text-white rounded-full flex items-center justify-center font-bold text-xl">7</div>
            <div>
              <h3 class="text-lg font-semibold">Save Your Model (Important!)</h3>
              <span class="text-sm text-gray-500">⏱️ 2 minutes</span>
            </div>
          </div>
        </div>
        <div class="ml-13 pl-4 border-l-4 border-yellow-200">
          <p class="text-gray-700 mb-2">⚠️ Colab deletes files when you close it. Download your model:</p>
          <ol class="list-decimal list-inside space-y-2 text-gray-700">
            <li>In the file browser (left sidebar), find <code>my-first-model</code> folder</li>
            <li>Right-click it → "Download"</li>
            <li>It will create a ZIP file you can save to your computer</li>
          </ol>
          <div class="mt-2 p-2 bg-red-50 rounded border border-red-200 text-sm">
            <strong>⚠️ Don't skip this!</strong> If you don't download, you'll lose your trained model when Colab session ends.
          </div>
        </div>
      </div>

      <!-- One-Click Colab Template -->
      <div class="mt-8 p-6 bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl border-2 border-purple-200">
        <h3 class="text-xl font-bold text-purple-700 mb-3 flex items-center gap-2">
          <span>⚡</span> Shortcut: Pre-Built Colab Notebook
        </h3>
        <p class="text-gray-700 mb-4">
          Want to skip copy-pasting? Use our pre-configured notebook with everything set up!
        </p>
        <a href="https://colab.research.google.com/drive/1axolotl-edukaai-template" 
           target="_blank"
           class="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors">
          <span>🚀</span> Open Pre-Built Template
        </a>
        <p class="text-sm text-gray-500 mt-3">
          Just upload your dataset and click run! All config included.
        </p>
      </div>
    </div>

    <!-- Success Verification Section -->
    <div class="card mb-6 bg-gradient-to-r from-green-50 to-emerald-50 border-green-300">
      <h2 class="text-2xl font-bold mb-4 text-green-700 flex items-center gap-2">
        <span>✅</span> How to Know It Worked
      </h2>
      
      <div class="space-y-4">
        <div class="p-4 bg-white rounded-lg border border-green-200">
          <h3 class="font-semibold text-green-800 mb-2">✓ You Should See This:</h3>
          <pre class="bg-gray-800 text-green-400 p-3 rounded text-xs overflow-x-auto">Loading model... ✓
Loading dataset... ✓ (16 examples)
Starting training...
Epoch 1/3: 100%|████████| 16/16 [02:30<00:00]
Epoch 2/3: 100%|████████| 16/16 [02:28<00:00]  
Epoch 3/3: 100%|████████| 16/16 [02:29<00:00]
Training complete! ✓
Model saved to /content/my-first-model</pre>
        </div>

        <div class="p-4 bg-white rounded-lg border border-green-200">
          <h3 class="font-semibold text-green-800 mb-2">✓ When Testing, You'll Get:</h3>
          <div class="bg-gray-100 p-3 rounded text-sm font-mono">
            You: What is photosynthesis?<br>
            Model: Photosynthesis is the process by which plants use sunlight, water, and carbon dioxide to create oxygen and energy in the form of sugar. It's how plants make their food!
          </div>
          <p class="text-sm text-gray-600 mt-2">
            <strong>It doesn't need to be perfect!</strong> Even partial or slightly weird responses mean it worked. 
            With only 10-20 examples, quality will vary.
          </p>
        </div>

        <div class="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
          <h3 class="font-semibold text-yellow-800 mb-2">⚠️ If You Get Gibberish:</h3>
          <p class="text-sm text-gray-700">
            This is <strong>totally normal</strong> with a small dataset! The model hasn't learned enough yet. 
            Signs of partial success:
          </p>
          <ul class="text-sm text-gray-700 mt-2 ml-4 list-disc">
            <li>Response relates to your training topic (even if incorrect)</li>
            <li>Grammar is somewhat coherent</li>
            <li>It's not random characters</li>
          </ul>
          <p class="text-sm text-gray-700 mt-2">
            <strong>Solution:</strong> Go back to edukaAI and add 30-50 more high-quality examples, then retrain!
          </p>
        </div>
      </div>
    </div>

    <!-- Local Training Path -->
    <div class="card mb-6">
      <div class="flex items-center gap-3 mb-4">
        <span class="text-3xl">💻</span>
        <h2 class="text-2xl font-bold">Path B: Your Local Computer</h2>
      </div>
      
      <p class="text-gray-700 mb-6">
        If you have a powerful NVIDIA GPU (8GB+ VRAM), you can train on your own computer. 
        The steps are similar to Colab, just on your machine.
      </p>

      <!-- Step 1 -->
      <div class="mb-6">
        <div class="flex items-center gap-3 mb-3">
          <div class="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-xl">3</div>
          <h3 class="text-lg font-semibold">Install Axolotl</h3>
        </div>
        <div class="ml-13 pl-4 border-l-4 border-blue-200">
          <p class="text-gray-700 mb-2">In the first code cell, type:</p>
          <code class="block bg-gray-800 text-green-400 p-3 rounded text-sm mb-2">
            !pip install axolotl
          </code>
          <p class="text-gray-700">Press <kbd class="bg-gray-200 px-2 py-1 rounded">Shift</kbd> + <kbd class="bg-gray-200 px-2 py-1 rounded">Enter</kbd> to run</p>
          <div class="mt-3 p-3 bg-yellow-50 rounded border border-yellow-200 text-sm">
            <strong>⏳ Wait:</strong> Installation takes 2-3 minutes. Watch the output scroll by!
          </div>
        </div>
      </div>

      <!-- Step 4 -->
      <div class="mb-6">
        <div class="flex items-center gap-3 mb-3">
          <div class="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-xl">4</div>
          <h3 class="text-lg font-semibold">Create Your Config</h3>
        </div>
        <div class="ml-13 pl-4 border-l-4 border-blue-200">
          <p class="text-gray-700 mb-2">Create a new code cell and paste this:</p>
          <pre class="bg-gray-800 text-green-400 p-3 rounded text-sm overflow-x-auto"><code>config = '''
base_model: TinyLlama/TinyLlama-1.1B-Chat-v1.0
model_type: LlamaForCausalLM
tokenizer_type: LlamaTokenizer

# Your edukaAI dataset
datasets:
  - path: /content/dataset_alpaca.json
    type: alpaca

# Training settings (keep it simple!)
num_epochs: 3
micro_batch_size: 1
gradient_accumulation_steps: 4
learning_rate: 0.0002

# Where to save your trained model
output_dir: /content/my-first-model

# Use less memory (good for Colab)
load_in_8bit: true
'''

# Save the config
with open('/content/config.yaml', 'w') as f:
    f.write(config)
    
print("✅ Config created!")</code></pre>
          <p class="text-gray-700 mt-2">Run it with <kbd class="bg-gray-200 px-2 py-1 rounded">Shift</kbd> + <kbd class="bg-gray-200 px-2 py-1 rounded">Enter</kbd></p>
        </div>
      </div>

      <!-- Step 5 -->
      <div class="mb-6">
        <div class="flex items-center gap-3 mb-3">
          <div class="w-10 h-10 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold text-xl">5</div>
          <h3 class="text-lg font-semibold">Train Your Model! 🚀</h3>
        </div>
        <div class="ml-13 pl-4 border-l-4 border-purple-200">
          <p class="text-gray-700 mb-2">Create another code cell:</p>
          <code class="block bg-gray-800 text-green-400 p-3 rounded text-sm mb-2">
            !axolotl train /content/config.yaml
          </code>
          <p class="text-gray-700">Run it and watch the magic happen! ✨</p>
          <div class="mt-3 p-3 bg-blue-50 rounded border border-blue-200 text-sm">
            <strong>⏰ Time:</strong> This takes 10-20 minutes on Colab's free GPU. 
            You'll see progress bars and loss values going down — that's good!
          </div>
        </div>
      </div>

      <!-- Step 6 -->
      <div class="mb-6">
        <div class="flex items-center gap-3 mb-3">
          <div class="w-10 h-10 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-xl">6</div>
          <h3 class="text-lg font-semibold">Chat With Your Model 💬</h3>
        </div>
        <div class="ml-13 pl-4 border-l-4 border-green-200">
          <p class="text-gray-700 mb-2">After training completes, test your model:</p>
          <pre class="bg-gray-800 text-green-400 p-3 rounded text-sm overflow-x-auto"><code>from transformers import AutoModelForCausalLM, AutoTokenizer
import torch

# Load your trained model
model_path = "/content/my-first-model"
model = AutoModelForCausalLM.from_pretrained(
    model_path,
    torch_dtype=torch.float16,
    device_map="auto"
)
tokenizer = AutoTokenizer.from_pretrained(model_path)

# Test it!
prompt = "What is photosynthesis?"
inputs = tokenizer(prompt, return_tensors="pt").to(model.device)

# Generate response
with torch.no_grad():
    outputs = model.generate(
        **inputs,
        max_new_tokens=100,
        temperature=0.7
    )

response = tokenizer.decode(outputs[0], skip_special_tokens=True)
print(f"You: {prompt}")
print(f"Model: {response}")</code></pre>
          <div class="mt-3 p-3 bg-green-100 rounded text-sm text-green-800">
            <strong>🎉 Success!</strong> If you see a response, you trained your first AI model!
          </div>
        </div>
      </div>

      <!-- Step 7 -->
      <div>
        <div class="flex items-center gap-3 mb-3">
          <div class="w-10 h-10 bg-yellow-600 text-white rounded-full flex items-center justify-center font-bold text-xl">7</div>
          <h3 class="text-lg font-semibold">Save Your Model (Important!)</h3>
        </div>
        <div class="ml-13 pl-4 border-l-4 border-yellow-200">
          <p class="text-gray-700 mb-2">⚠️ Colab deletes files when you close it. Download your model:</p>
          <ol class="list-decimal list-inside space-y-2 text-gray-700">
            <li>In the file browser (left sidebar), find <code>my-first-model</code> folder</li>
            <li>Right-click it → "Download"</li>
            <li>It will create a ZIP file you can save to your computer</li>
          </ol>
        </div>
      </div>
    </div>

    <!-- Local Training Path -->
    <div class="card mb-6">
      <div class="flex items-center gap-3 mb-4">
        <span class="text-3xl">💻</span>
        <h2 class="text-2xl font-bold">Path B: Your Local Computer</h2>
      </div>
      
      <p class="text-gray-700 mb-6">
        If you have a powerful NVIDIA GPU (8GB+ VRAM), you can train on your own computer. 
        The steps are similar to Colab, just on your machine.
      </p>

      <div class="space-y-4">
        <div class="flex items-start gap-4">
          <div class="w-8 h-8 bg-gray-800 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">1</div>
          <div>
            <h3 class="font-semibold">Create Project Folder</h3>
            <code class="block bg-gray-800 text-green-400 p-2 rounded text-sm mt-2">
              mkdir my-first-training<br>
              cd my-first-training
            </code>
          </div>
        </div>

        <div class="flex items-start gap-4">
          <div class="w-8 h-8 bg-gray-800 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">2</div>
          <div>
            <h3 class="font-semibold">Copy Your Dataset</h3>
            <p class="text-gray-700 text-sm">Copy your <code>dataset_alpaca.json</code> into this folder</p>
          </div>
        </div>

        <div class="flex items-start gap-4">
          <div class="w-8 h-8 bg-gray-800 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">3</div>
          <div>
            <h3 class="font-semibold">Install Axolotl</h3>
            <code class="block bg-gray-800 text-green-400 p-2 rounded text-sm mt-2">
              pip install axolotl
            </code>
          </div>
        </div>

        <div class="flex items-start gap-4">
          <div class="w-8 h-8 bg-gray-800 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">4</div>
          <div>
            <h3 class="font-semibold">Create Config File</h3>
            <p class="text-gray-700 text-sm mb-2">Create <code>config.yaml</code> with this content:</p>
            <pre class="bg-gray-800 text-green-400 p-3 rounded text-sm overflow-x-auto"><code>base_model: TinyLlama/TinyLlama-1.1B-Chat-v1.0
model_type: LlamaForCausalLM
tokenizer_type: LlamaTokenizer

# Your edukaAI dataset
datasets:
  - path: ./dataset_alpaca.json
    type: alpaca

# Training settings
num_epochs: 3
micro_batch_size: 1
gradient_accumulation_steps: 4
learning_rate: 0.0002

# Where to save
output_dir: ./my-first-model

# Use 8-bit to save memory
load_in_8bit: true</code></pre>
          </div>
        </div>

        <div class="flex items-start gap-4">
          <div class="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">5</div>
          <div>
            <h3 class="font-semibold text-purple-700">Train!</h3>
            <code class="block bg-gray-800 text-green-400 p-2 rounded text-sm mt-2">
              axolotl train config.yaml
            </code>
            <p class="text-gray-600 text-sm mt-2">Training takes 30-60 minutes depending on your GPU</p>
          </div>
        </div>

        <div class="flex items-start gap-4">
          <div class="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">6</div>
          <div>
            <h3 class="font-semibold text-green-700">Test Your Model</h3>
            <p class="text-gray-700 text-sm">Your trained model is now in <code>./my-first-model</code> folder!</p>
            <p class="text-gray-700 text-sm mt-2">Use the same Python code as Colab (above) to chat with it</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Hugging Face Path -->
    <div class="card mb-6 border-2 border-yellow-400 bg-gradient-to-r from-yellow-50 to-orange-50">
      <div class="flex items-center gap-3 mb-4">
        <span class="text-3xl">🤗</span>
        <h2 class="text-2xl font-bold text-yellow-700">Path C: Hugging Face (AutoTrain - Easiest GUI!)</h2>
      </div>
      
      <p class="text-gray-700 mb-6">
        Want to train without writing any code? Use Hugging Face AutoTrain - a web interface 
        where you just upload your dataset and click "Train". No Colab, no command line!
      </p>

      <div class="space-y-4">
        <div class="flex items-start gap-4">
          <div class="w-8 h-8 bg-yellow-500 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">1</div>
          <div>
            <h3 class="font-semibold">Create Hugging Face Account</h3>
            <p class="text-gray-700 text-sm mb-2">
              Go to <a href="https://huggingface.co/join" target="_blank" class="text-blue-600 hover:underline font-semibold">huggingface.co/join</a> and sign up for free.
            </p>
            <div class="p-2 bg-white rounded border border-yellow-200 text-xs text-gray-600">
              💡 The free tier is enough to get started and experiment!
            </div>
          </div>
        </div>

        <div class="flex items-start gap-4">
          <div class="w-8 h-8 bg-yellow-500 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">2</div>
          <div>
            <h3 class="font-semibold">Go to AutoTrain</h3>
            <p class="text-gray-700 text-sm mb-2">
              Visit <a href="https://huggingface.co/autotrain" target="_blank" class="text-blue-600 hover:underline font-semibold">huggingface.co/autotrain</a> 
              and create a new project.
            </p>
            <div class="p-2 bg-white rounded border border-yellow-200 text-xs text-gray-600">
              🎯 Select "LLM Fine-tuning" as your project type
            </div>
          </div>
        </div>

        <div class="flex items-start gap-4">
          <div class="w-8 h-8 bg-yellow-500 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">3</div>
          <div>
            <h3 class="font-semibold">Upload Your Dataset</h3>
            <p class="text-gray-700 text-sm mb-2">
              Click "Upload Dataset" and select your <code>dataset_alpaca.json</code> file from edukaAI.
            </p>
            <div class="p-2 bg-white rounded border border-yellow-200 text-xs text-gray-600">
              📁 AutoTrain supports the Alpaca format automatically - no conversion needed!
            </div>
          </div>
        </div>

        <div class="flex items-start gap-4">
          <div class="w-8 h-8 bg-yellow-500 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">4</div>
          <div>
            <h3 class="font-semibold">Choose Base Model</h3>
            <p class="text-gray-700 text-sm mb-2">
              Select a model to start from. Good beginner options:
            </p>
            <ul class="text-sm text-gray-700 ml-4 list-disc">
              <li><code>TinyLlama/TinyLlama-1.1B-Chat-v1.0</code> (fast, free tier)</li>
              <li><code>meta-llama/Llama-2-7b-chat-hf</code> (better quality, requires HF Pro)</li>
            </ul>
          </div>
        </div>

        <div class="flex items-start gap-4">
          <div class="w-8 h-8 bg-yellow-500 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">5</div>
          <div>
            <h3 class="font-semibold">Configure Training (Keep It Simple!)</h3>
            <p class="text-gray-700 text-sm mb-2">Use these beginner-friendly settings:</p>
            <div class="bg-white p-3 rounded border border-gray-200 text-sm">
              <table class="w-full text-sm">
                <tbody>
                  <tr class="border-b"><td class="py-1 font-medium">Epochs:</td><td>3</td></tr>
                  <tr class="border-b"><td class="py-1 font-medium">Learning Rate:</td><td>0.0002</td></tr>
                  <tr class="border-b"><td class="py-1 font-medium">Batch Size:</td><td>1</td></tr>
                  <tr><td class="py-1 font-medium">LoRA Rank:</td><td>8 (reduces memory)</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div class="flex items-start gap-4">
          <div class="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">6</div>
          <div>
            <h3 class="font-semibold text-purple-700">Click "Start Training" 🚀</h3>
            <p class="text-gray-700 text-sm mb-2">
              That's it! AutoTrain will handle everything:
            </p>
            <ul class="text-sm text-gray-700 ml-4 list-disc">
              <li>Download the base model</li>
              <li>Fine-tune on your data</li>
              <li>Save to your Hugging Face Hub</li>
              <li>Create a demo space automatically!</li>
            </ul>
            <div class="mt-2 p-2 bg-blue-50 rounded border border-blue-200 text-xs text-gray-600">
              ⏱️ Training takes 10-30 minutes depending on dataset size and model
            </div>
          </div>
        </div>

        <div class="flex items-start gap-4">
          <div class="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">7</div>
          <div>
            <h3 class="font-semibold text-green-700">Test & Share Your Model! 🎉</h3>
            <p class="text-gray-700 text-sm mb-2">
              Once training completes:
            </p>
            <ul class="text-sm text-gray-700 ml-4 list-disc space-y-1">
              <li>Your model is automatically hosted on Hugging Face</li>
              <li>AutoTrain creates a demo Space where you can chat with it</li>
              <li>Share the link with anyone - they can try your AI!</li>
              <li>Download the model files anytime</li>
            </ul>
            <div class="mt-3 p-3 bg-green-100 rounded border border-green-300 text-sm text-green-800">
              <strong>✨ Bonus:</strong> You now have a public demo of YOUR trained AI that anyone can try!
            </div>
          </div>
        </div>
      </div>

      <!-- HF vs Others Comparison -->
      <div class="mt-6 p-4 bg-white rounded-lg border-2 border-yellow-300">
        <h3 class="font-bold text-yellow-800 mb-3 flex items-center gap-2">
          <span>🤔</span> Why Choose Hugging Face?
        </h3>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
          <div class="p-2 bg-green-50 rounded">
            <strong class="text-green-700">✅ No Code</strong>
            <p class="text-gray-600">Everything through web UI</p>
          </div>
          <div class="p-2 bg-blue-50 rounded">
            <strong class="text-blue-700">✅ Auto-Hosting</strong>
            <p class="text-gray-600">Model is live immediately</p>
          </div>
          <div class="p-2 bg-purple-50 rounded">
            <strong class="text-purple-700">✅ Free Demo</strong>
            <p class="text-gray-600">Shareable chat interface</p>
          </div>
        </div>
        <div class="mt-3 text-xs text-gray-600">
          <strong>Note:</strong> Free tier has compute limits. For larger models or datasets, you may need Hugging Face Pro or compute credits.
        </div>
      </div>
    </div>

    <!-- What to Expect -->
    <div class="card mb-6 bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-300">
      <h2 class="text-xl font-semibold mb-4">⚠️ What to Expect</h2>
      
      <div class="space-y-4 text-gray-700">
        <div class="flex items-start gap-3">
          <span class="text-2xl">⏱️</span>
          <div>
            <h3 class="font-semibold">Time</h3>
            <p class="text-sm">Training takes 10-20 minutes on Colab, 30-60 minutes locally. This is normal!</p>
          </div>
        </div>

        <div class="flex items-start gap-3">
          <span class="text-2xl">📊</span>
          <div>
            <h3 class="font-semibold">Quality</h3>
            <p class="text-sm">With 10-20 examples, results will be <strong>okay but inconsistent</strong>. This is expected! More data = better results.</p>
          </div>
        </div>

        <div class="flex items-start gap-3">
          <span class="text-2xl">🎯</span>
          <div>
            <h3 class="font-semibold">The Point</h3>
            <p class="text-sm">This is a <strong>learning exercise</strong>. You're not creating production-ready AI — you're understanding the process!</p>
          </div>
        </div>

        <div class="flex items-start gap-3">
          <span class="text-2xl">🔄</span>
          <div>
            <h3 class="font-semibold">Next Steps</h3>
            <p class="text-sm">
              After seeing how it works, come back to edukaAI and 
              <NuxtLink to="/examples" class="text-blue-600 hover:underline">add more quality examples</NuxtLink>.
              Then retrain for better results!
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Troubleshooting -->
    <div class="card mb-6">
      <h2 class="text-xl font-semibold mb-4">🔧 Common Issues & Solutions</h2>
      
      <div class="space-y-4">
        <div class="p-4 bg-red-50 rounded-lg border border-red-200">
          <h3 class="font-semibold text-red-800 mb-1">"Out of Memory" Error</h3>
          <p class="text-gray-700 text-sm">
            <strong>Solution:</strong> You're using a model too big for your GPU. Switch to an even smaller model like 
            <code>TinyLlama/TinyLlama-1.1B-Chat-v1.0</code> (which we use above) or increase <code>load_in_8bit: true</code>.
          </p>
        </div>

        <div class="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
          <h3 class="font-semibold text-yellow-800 mb-1">"ModuleNotFoundError: No module named 'axolotl'"</h3>
          <p class="text-gray-700 text-sm">
            <strong>Solution:</strong> Axolotl didn't install properly. Restart your runtime/environment and run <code>pip install axolotl</code> again.
          </p>
        </div>

        <div class="p-4 bg-blue-50 rounded-lg border border-blue-200">
          <h3 class="font-semibold text-blue-800 mb-1">"FileNotFoundError: dataset_alpaca.json"</h3>
          <p class="text-gray-700 text-sm">
            <strong>Solution:</strong> The path in your config doesn't match where you uploaded the file. Check the path carefully!
          </p>
        </div>

        <div class="p-4 bg-gray-50 rounded-lg border border-gray-200">
          <h3 class="font-semibold text-gray-800 mb-1">Model Generates Gibberish</h3>
          <p class="text-gray-700 text-sm">
            <strong>Normal!</strong> With only 10-20 training examples, the model hasn't learned much yet. This is why 
            <strong>dataset quality and quantity matter</strong>. Go back to edukaAI and add more diverse, high-quality examples!
          </p>
        </div>
      </div>
    </div>

    <!-- The Real Lesson -->
    <div class="card mb-6 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
      <h2 class="text-xl font-semibold mb-4">🎓 The Real Lesson</h2>
      
      <p class="mb-4 opacity-90">
        After completing this guide, you'll realize something important:
      </p>
      
      <div class="p-4 bg-white bg-opacity-20 rounded-lg mb-4">
        <p class="text-lg font-medium">
          "Training the model was just running a command. The hard part — the part that matters — 
          is creating good training data."
        </p>
      </div>
      
      <p class="opacity-90 mb-4">
        That's exactly what edukaAI helps you with! The technical training is easy. 
        Creating meaningful, diverse, high-quality training examples is where the value is.
      </p>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
        <NuxtLink to="/examples" class="bg-white bg-opacity-20 hover:bg-opacity-30 text-white py-3 px-4 rounded-lg text-center transition-colors">
          📝 Add More Examples →
        </NuxtLink>
        <NuxtLink to="/help/best-practices" class="bg-white bg-opacity-20 hover:bg-opacity-30 text-white py-3 px-4 rounded-lg text-center transition-colors">
          📚 Learn Best Practices →
        </NuxtLink>
      </div>
    </div>

    <!-- Post-Training Motivation -->
    <div class="card mb-6 bg-gradient-to-r from-orange-500 to-red-500 text-white">
      <h2 class="text-2xl font-bold mb-4 flex items-center gap-2">
        <span>🚀</span> You Trained a Model! Now What?
      </h2>
      
      <p class="mb-4 opacity-90 text-lg">
        Congratulations! You've completed your first fine-tuning. Here's how to make it even better:
      </p>
      
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div class="p-4 bg-white bg-opacity-20 rounded-lg">
          <div class="text-3xl mb-2">📈</div>
          <h3 class="font-bold mb-2">Add More Data</h3>
          <p class="text-sm opacity-90">
            10 examples = okay results<br>
            50 examples = noticeably better<br>
            100 examples = quite good!
          </p>
          <NuxtLink to="/examples" class="mt-3 inline-block text-sm bg-white text-orange-600 px-3 py-1 rounded font-semibold hover:bg-opacity-90">
            Add Examples →
          </NuxtLink>
        </div>
        
        <div class="p-4 bg-white bg-opacity-20 rounded-lg">
          <div class="text-3xl mb-2">🎯</div>
          <h3 class="font-bold mb-2">Improve Quality</h3>
          <p class="text-sm opacity-90">
            Review your examples:<br>
            • Fix low-quality ones<br>
            • Add more diverse topics<br>
            • Include edge cases
          </p>
          <NuxtLink to="/help/best-practices" class="mt-3 inline-block text-sm bg-white text-orange-600 px-3 py-1 rounded font-semibold hover:bg-opacity-90">
            Learn How →
          </NuxtLink>
        </div>
        
        <div class="p-4 bg-white bg-opacity-20 rounded-lg">
          <div class="text-3xl mb-2">🔄</div>
          <h3 class="font-bold mb-2">Retrain & Compare</h3>
          <p class="text-sm opacity-90">
            See the improvement:<br>
            • Export new dataset<br>
            • Retrain model<br>
            • Compare results!
          </p>
          <NuxtLink to="/export" class="mt-3 inline-block text-sm bg-white text-orange-600 px-3 py-1 rounded font-semibold hover:bg-opacity-90">
            Export Again →
          </NuxtLink>
        </div>
      </div>
      
      <div class="p-4 bg-white bg-opacity-20 rounded-lg">
        <h3 class="font-bold mb-2 flex items-center gap-2">
          <span>💡</span> The Iteration Loop
        </h3>
        <div class="flex items-center justify-center gap-4 text-sm">
          <span class="text-center">Add Data<br>in edukaAI</span>
          <span class="text-2xl">→</span>
          <span class="text-center">Export &<br>Retrain</span>
          <span class="text-2xl">→</span>
          <span class="text-center">Test &<br>Compare</span>
          <span class="text-2xl">→</span>
          <span class="text-center">Repeat<br>↺</span>
        </div>
        <p class="text-center mt-3 text-sm opacity-90">
          Each iteration makes your model smarter! 🧠
        </p>
      </div>
    </div>

    <!-- Celebrate -->
    <div class="text-center py-8">
      <div class="text-6xl mb-4">🎉</div>
      <h2 class="text-2xl font-bold text-gray-800 mb-2">You're Ready!</h2>
      <p class="text-gray-600 mb-6">
        The technical part is straightforward. Focus on creating amazing training data — that's your superpower.
      </p>
      <div class="flex flex-col sm:flex-row gap-3 justify-center">
        <a href="https://colab.research.google.com" target="_blank" 
           class="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors">
          Open Google Colab →
        </a>
        <NuxtLink to="/export" class="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 px-8 rounded-lg transition-colors">
          Export Dataset First
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

definePageMeta({
  layout: 'default'
})

const copiedIndex = ref(null)

const copyCode = async (code, index) => {
  try {
    await navigator.clipboard.writeText(code)
    copiedIndex.value = index
    setTimeout(() => {
      copiedIndex.value = null
    }, 2000)
  } catch (err) {
    console.error('Failed to copy:', err)
  }
}

onMounted(() => {
  // Add copy buttons to all code blocks
  const codeBlocks = document.querySelectorAll('code.block')
  codeBlocks.forEach((codeBlock, index) => {
    // Skip if already has a wrapper
    if (codeBlock.parentElement?.classList.contains('code-wrapper')) return
    
    // Create wrapper
    const wrapper = document.createElement('div')
    wrapper.className = 'code-wrapper relative group'
    
    // Wrap the code block
    codeBlock.parentNode.insertBefore(wrapper, codeBlock)
    wrapper.appendChild(codeBlock)
    
    // Create copy button
    const copyBtn = document.createElement('button')
    copyBtn.className = 'copy-btn'
    copyBtn.innerHTML = '📋 Copy'
    copyBtn.onclick = () => {
      const code = codeBlock.textContent.trim()
      navigator.clipboard.writeText(code).then(() => {
        copyBtn.innerHTML = '✓ Copied!'
        copyBtn.classList.add('copied')
        setTimeout(() => {
          copyBtn.innerHTML = '📋 Copy'
          copyBtn.classList.remove('copied')
        }, 2000)
      }).catch(err => {
        console.error('Failed to copy:', err)
      })
    }
    
    wrapper.appendChild(copyBtn)
  })
})
</script>

<style scoped>
.ml-13 {
  margin-left: 52px;
}

/* Copy button styles for code blocks */
.relative code {
  position: relative;
}

.copy-btn {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  opacity: 0;
  transition: opacity 0.2s ease;
  background-color: rgba(75, 85, 99, 0.9);
  color: white;
  font-size: 0.75rem;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  display: flex;
  align-items: center;
  gap: 0.25rem;
  cursor: pointer;
  border: none;
  z-index: 10;
}

.copy-btn:hover {
  background-color: rgba(107, 114, 128, 0.9);
}

.relative:hover .copy-btn {
  opacity: 1;
}

.copy-btn.copied {
  background-color: rgba(34, 197, 94, 0.9);
}

/* Ensure code blocks have relative positioning for button placement */
.relative:has(> code) {
  position: relative;
}
</style>
