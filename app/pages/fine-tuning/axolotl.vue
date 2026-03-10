<template>
  <div class="max-w-6xl mx-auto">
    <div class="mb-8">
      <div class="flex items-center gap-2 mb-2">
        <NuxtLink to="/fine-tuning" class="text-blue-600 hover:underline text-sm">← All Methods</NuxtLink>
      </div>
      <h1 class="text-3xl font-bold mb-2 flex items-center gap-3">
        <span class="text-4xl">🦎</span>
        Fine-Tune with Axolotl
      </h1>
      <p class="text-secondary">
        YAML-based configuration for easy LoRA training. Great for cloud GPUs and cross-platform workflows.
      </p>
    </div>

    <!-- Mac Warning -->
    <div class="card mb-6 bg-yellow-50 border-2 border-yellow-300 dark:bg-yellow-900/20 dark:border-yellow-700">
      <h2 class="text-xl font-semibold mb-4">⚠️ Mac Users: Important Information</h2>
      
      <div class="space-y-4">
        <div class="bg-white dark:bg-gray-800 p-4 rounded-lg border border-yellow-200 dark:border-yellow-700">
          <p class="text-secondary mb-3">
            <strong>Axolotl runs on Mac but has significant limitations:</strong>
          </p>
          <ul class="text-sm text-secondary space-y-2 ml-4">
            <li>• <strong>Slower training:</strong> 10-30 minutes vs 16 seconds with MLX for the same task</li>
            <li>• <strong>No quantization:</strong> Cannot use 4-bit/8-bit models (uses 2-3x more RAM)</li>
            <li>• <strong>Missing optimizations:</strong> No Flash Attention, bitsandbytes, or QLoRA</li>
            <li>• <strong>Python version:</strong> Requires Python 3.9-3.11 (not 3.12+)</li>
          </ul>
        </div>

        <div class="info-box-blue">
          <h4 class="font-semibold text-blue-900 dark:text-blue-100 mb-2">💡 Recommendation for Mac Users</h4>
          <p class="text-sm text-secondary mb-3">
            For Mac (Apple Silicon), we recommend using <strong>MLX</strong> instead:
          </p>
          <ul class="text-sm text-secondary space-y-1 ml-4 mb-3">
            <li>✅ Native Apple Silicon optimization</li>
            <li>✅ 16-second training vs 10-30 minutes</li>
            <li>✅ All features work (quantization, Flash Attention)</li>
            <li>✅ Same results, much faster</li>
          </ul>
          <NuxtLink to="/fine-tuning/mlx" class="inline-block bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700">
            Use MLX Instead (Recommended) →
          </NuxtLink>
        </div>

        <div class="info-box-green">
          <h4 class="font-semibold text-green-900 dark:text-green-100 mb-2">🎯 When to Use Axolotl on Mac</h4>
          <p class="text-sm text-secondary">
            Only if you specifically need:
          </p>
          <ul class="text-sm text-secondary space-y-1 ml-4 mt-2">
            <li>• YAML-based configuration workflow</li>
            <li>• Cross-platform compatibility (train on Mac, use on Linux)</li>
            <li>• Integration with HuggingFace ecosystem tools</li>
            <li>• Don't mind slower training for specific workflow needs</li>
          </ul>
        </div>
      </div>
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
              Export your dataset in Alpaca format from the Export page.
            </p>
            <NuxtLink to="/export" class="text-blue-600 hover:underline text-sm">Go to Export → Select Alpaca format</NuxtLink>
          </div>
        </div>

        <div class="flex items-start gap-3">
          <span class="text-xl">💻</span>
          <div>
            <h3 class="font-semibold">2. Python Environment</h3>
            <p class="text-sm text-secondary mb-2">
              <strong>Python 3.9, 3.10, or 3.11 required</strong> (3.12+ not supported)
            </p>
            <div class="bg-gray-800 text-gray-200 p-3 rounded text-sm">
              <pre># Create virtual environment
python3.11 -m venv axolotl-env

# Activate it
source axolotl-env/bin/activate

# Verify Python version
python --version  # Should show 3.9, 3.10, or 3.11</pre>
            </div>
          </div>
        </div>

        <div class="flex items-start gap-3">
          <span class="text-xl">🎮</span>
          <div>
            <h3 class="font-semibold">3. System Requirements</h3>
            <p class="text-sm text-secondary">
              <strong>Mac:</strong> 8GB+ RAM (16GB+ recommended), 10-30 min training time<br>
              <strong>Cloud GPU:</strong> See cloud section below for instant fast training
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Step 1: Install Axolotl -->
    <div class="card mb-6">
      <h2 class="text-xl font-semibold mb-4 flex items-center gap-2">
        <span class="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
        Install Axolotl
      </h2>
      
      <div class="space-y-4">
        <div class="info-box-gray">
          <p class="text-sm text-secondary mb-2">Install Axolotl (Mac-compatible version):</p>
          <div class="bg-gray-800 text-gray-200 p-3 rounded text-sm">
            <pre>pip install axolotl

# Verify installation
axolotl --version</pre>
          </div>
        </div>

        <div class="info-box-yellow">
          <h4 class="font-semibold text-yellow-900 dark:text-yellow-100 mb-2">⚠️ Installation Issues on Mac</h4>
          <p class="text-sm text-secondary mb-2">
            If you get build errors, it's likely due to:
          </p>
          <ul class="text-sm text-secondary space-y-1 ml-4 mb-2">
            <li>• Python 3.12 or 3.13 (not supported)</li>
            <li>• Missing Xcode Command Line Tools</li>
            <li>• Incompatible dependencies</li>
          </ul>
          <p class="text-sm text-secondary">
            <strong>Solution:</strong> Use Python 3.11 and install Xcode tools:<br>
            <code class="bg-gray-100 dark:bg-gray-700 px-1">xcode-select --install</code>
          </p>
        </div>

        <div class="info-box-blue">
          <h4 class="font-semibold text-blue-900 dark:text-blue-100 mb-2">💡 Installation Troubleshooting</h4>
          <div class="bg-gray-800 text-gray-200 p-3 rounded text-sm">
            <pre># If pip install fails, try:
pip install --upgrade pip setuptools wheel
pip install axolotl --no-build-isolation

# If still failing, you may need cloud GPU
# See cloud section below for instant setup</pre>
          </div>
        </div>
      </div>
    </div>

    <!-- Step 2: Prepare Data -->
    <div class="card mb-6">
      <h2 class="text-xl font-semibold mb-4 flex items-center gap-2">
        <span class="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
        Prepare Your Dataset
      </h2>

      <div class="space-y-4">
        <p class="text-sm text-secondary">
          Export your fictional characters dataset in Alpaca format and set up the file structure.
        </p>

        <div class="info-box-gray">
          <h4 class="font-semibold mb-2">File Structure</h4>
          <div class="bg-gray-800 text-gray-200 p-3 rounded text-sm">
            <pre>axolotl-project/
├── config.yaml          # Training configuration
├── data/
│   └── train.json       # Your exported dataset
└── model-output/        # Created after training</pre>
          </div>
        </div>

        <div>
          <h4 class="font-semibold mb-2">Step 2a: Export from EdukaAI</h4>
          <ol class="text-sm text-secondary space-y-1 ml-4">
            <li>Go to Export page in EdukaAI</li>
            <li>Select <strong>Alpaca</strong> format (NOT MLX)</li>
            <li>Choose fictional characters dataset</li>
            <li>Download the JSON file</li>
            <li>Save as <code class="bg-gray-100 dark:bg-gray-700 px-1">data/train.json</code></li>
          </ol>
        </div>

        <div>
          <h4 class="font-semibold mb-2">Step 2b: Verify Data Format</h4>
          <div class="bg-gray-800 text-gray-200 p-3 rounded text-sm">
            <pre># Check your data looks like this:
cat data/train.json | head -20

# Should show Alpaca format:
# {
#   "instruction": "Who is Zorblax?",
#   "input": "",
#   "output": "Zorblax is a quantum gastronomer..."
# }</pre>
          </div>
        </div>
      </div>
    </div>

    <!-- Step 3: Create Config -->
    <div class="card mb-6">
      <h2 class="text-xl font-semibold mb-4 flex items-center gap-2">
        <span class="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">3</span>
        Create Configuration File
      </h2>

      <div class="space-y-4">
        <p class="text-sm text-secondary">
          Create <code class="bg-gray-100 dark:bg-gray-700 px-1">config.yaml</code> in your project folder. This is Mac-optimized (no 4-bit quantization).
        </p>

        <div class="bg-gray-800 text-gray-200 p-4 rounded-lg overflow-x-auto">
          <pre class="text-sm"><code># config.yaml - Mac-optimized for Llama 3.2 1B
base_model: meta-llama/Llama-3.2-1B-Instruct
model_type: LlamaForCausalLM
tokenizer_type: LlamaTokenizer

# Mac Limitation: Cannot use 4-bit quantization
# Full precision model will use ~2-3x more RAM
# On Mac with 8GB RAM, this may not fit!

# LoRA Configuration
adapter: lora
lora_r: 8
lora_alpha: 16
lora_dropout: 0.05
lora_target_linear: true
lora_target_modules:
  - q_proj
  - v_proj
  - k_proj
  - o_proj
  - gate_proj
  - down_proj
  - up_proj

# Dataset
datasets:
  - path: ./data/train.json
    type: alpaca

# Training Settings
num_epochs: 1  # 1 epoch for proof-of-concept
micro_batch_size: 1
gradient_accumulation_steps: 1
learning_rate: 0.00002
warmup_steps: 10
max_steps: 100  # Limit steps for quick test

# Mac Limitation: No Flash Attention
# Training will be slower than MLX

# Output
logging_steps: 10
output_dir: ./model-output
save_steps: 100
save_total_limit: 1</code></pre>
        </div>

        <div class="info-box-yellow">
          <h4 class="font-semibold text-yellow-900 dark:text-yellow-100 mb-2">⚠️ Mac-Specific Limitations in Config</h4>
          <ul class="text-sm text-secondary space-y-1">
            <li>• <strong>No load_in_4bit:</strong> Cannot use 4-bit quantization on Mac</li>
            <li>• <strong>No flash_attention:</strong> Slower training without it</li>
            <li>• <strong>Higher memory:</strong> Full precision uses more RAM</li>
            <li>• <strong>Slow training:</strong> Expect 10-30 minutes for 100 steps</li>
          </ul>
        </div>

        <div class="info-box-blue">
          <h4 class="font-semibold text-blue-900 dark:text-blue-100 mb-2">💡 Alternative: Use Smaller Model</h4>
          <p class="text-sm text-secondary mb-2">
            If you run out of memory on Mac, use TinyLlama 1.1B instead:
          </p>
          <div class="bg-gray-800 text-gray-200 p-2 rounded text-sm">
            <pre># Replace in config.yaml:
base_model: TinyLlama/TinyLlama-1.1B-Chat-v1.0
model_type: LlamaForCausalLM
tokenizer_type: LlamaTokenizer

# Much smaller, will fit in 8GB RAM</pre>
          </div>
        </div>
      </div>
    </div>

    <!-- Step 4: Train -->
    <div class="card mb-6">
      <h2 class="text-xl font-semibold mb-4 flex items-center gap-2">
        <span class="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">4</span>
        Start Training
      </h2>

      <div class="space-y-4">
        <div class="info-box-red">
          <h4 class="font-semibold text-red-900 dark:text-red-100 mb-2">⏱️ Expected Training Time on Mac</h4>
          <p class="text-sm text-secondary">
            <strong>Llama 3.2 1B:</strong> 10-20 minutes for 100 steps<br>
            <strong>TinyLlama 1.1B:</strong> 5-10 minutes for 100 steps<br>
            <br>
            <em>Compare to MLX: 16 seconds for same task</em>
          </p>
        </div>

        <div class="info-box-gray">
          <p class="text-sm font-medium mb-2">Run training:</p>
          <div class="bg-gray-800 text-gray-200 p-3 rounded text-sm">
            <pre># Make sure you're in the project folder
# and virtual environment is activated

axolotl train config.yaml</pre>
          </div>
        </div>

        <div class="info-box-green">
          <h4 class="font-semibold text-green-900 dark:text-green-100 mb-2">✅ What Happens During Training</h4>
          <ol class="text-sm text-secondary space-y-1 ml-4">
            <li>• Axolotl downloads Llama 3.2 1B model (~2-3GB)</li>
            <li>• Loads your dataset and formats it</li>
            <li>• Applies LoRA adapters to the model</li>
            <li>• Trains for 100 steps (shows progress)</li>
            <li>• Saves fine-tuned model to <code class="bg-gray-100 dark:bg-gray-700 px-1">./model-output</code></li>
          </ol>
        </div>

        <div class="bg-gray-800 text-gray-200 p-4 rounded-lg overflow-x-auto">
          <p class="text-sm text-gray-400 mb-2"># Expected output:</p>
          <pre class="text-sm"><code>{'loss': 2.1234, 'learning_rate': 1.8e-05, 'epoch': 0.1}  
{'loss': 1.9876, 'learning_rate': 1.5e-05, 'epoch': 0.2}  
...
Training completed. Model saved to ./model-output</code></pre>
        </div>
      </div>
    </div>

    <!-- Step 5: Test -->
    <div class="card mb-6">
      <h2 class="text-xl font-semibold mb-4 flex items-center gap-2">
        <span class="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">5</span>
        Test Your Model
      </h2>

      <div class="space-y-4">
        <div class="info-box-gray">
          <p class="text-sm font-medium mb-2">Interactive testing:</p>
          <div class="bg-gray-800 text-gray-200 p-3 rounded text-sm">
            <pre>axolotl inference config.yaml --model ./model-output</pre>
          </div>
        </div>

        <div class="info-box-gray">
          <p class="text-sm font-medium mb-2">Test in Python:</p>
          <div class="bg-gray-800 text-gray-200 p-3 rounded text-sm">
            <pre>from transformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained("./model-output")
tokenizer = AutoTokenizer.from_pretrained("./model-output")

# Test with fictional character question
prompt = "Who is Zorblax?"
inputs = tokenizer(prompt, return_tensors="pt")
outputs = model.generate(**inputs, max_new_tokens=100)
print(tokenizer.decode(outputs[0]))</pre>
          </div>
        </div>
      </div>
    </div>

    <!-- Cloud GPU Option -->
    <div class="card mb-6 bg-gradient-to-r from-purple-50 to-blue-50 border-2 border-purple-300 dark:from-purple-900/20 dark:to-blue-900/20 dark:border-purple-700">
      <h2 class="text-xl font-semibold mb-4">☁️ Cloud GPU: Faster Training</h2>

      <div class="space-y-4">
        <div class="bg-white dark:bg-gray-800 p-4 rounded-lg border border-purple-200 dark:border-purple-700">
          <p class="text-secondary mb-3">
            <strong>Avoid the slow Mac training!</strong> Use cloud GPU for 5-10x faster training with full Axolotl features.
          </p>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div class="info-box-green p-3">
              <h4 class="font-semibold text-green-900 dark:text-green-100">Google Colab</h4>
              <p class="text-xs text-secondary mb-2">Free T4 GPU</p>
              <p class="text-sm text-secondary">Best for: Learning, experiments</p>
              <a href="https://colab.research.google.com/github/axolotl-ai-cloud/axolotl/blob/main/examples/colab-notebooks/colab-axolotl-example.ipynb" target="_blank" class="text-green-600 dark:text-green-400 hover:underline text-sm">Open Notebook →</a>
            </div>

            <div class="info-box-blue p-3">
              <h4 class="font-semibold text-blue-900 dark:text-blue-100">RunPod</h4>
              <p class="text-xs text-secondary mb-2">$0.20-0.50/hour</p>
              <p class="text-sm text-secondary">Best for: Production, fast training</p>
              <a href="https://runpod.io" target="_blank" class="text-blue-600 dark:text-blue-400 hover:underline text-sm">Get Started →</a>
            </div>

            <div class="info-box-purple p-3">
              <h4 class="font-semibold text-purple-900 dark:text-purple-100">Vast.ai</h4>
              <p class="text-xs text-secondary mb-2">$0.15-0.30/hour</p>
              <p class="text-sm text-secondary">Best for: Cheap GPU access</p>
              <a href="https://vast.ai" target="_blank" class="text-purple-600 dark:text-purple-400 hover:underline text-sm">Get Started →</a>
            </div>
          </div>
        </div>

        <div class="bg-gray-800 text-gray-200 p-4 rounded-lg overflow-x-auto">
          <p class="text-sm text-gray-400 mb-2"># Quick Cloud Setup (RunPod example):</p>
          <pre class="text-sm"><code># 1. Create RunPod account
# 2. Deploy PyTorch GPU pod (RTX 3090 or A5000)
# 3. SSH into the pod or use Jupyter
# 4. Install Axolotl:
pip install axolotl[flash-att,deepspeed]

# 5. Upload your config.yaml and data/
# 6. Run training:
axolotl train config.yaml

# Training will be 5-10x faster than Mac!</code></pre>
        </div>

        <div class="info-box-yellow">
          <h4 class="font-semibold text-yellow-900 dark:text-yellow-100 mb-2">💡 Why Use Cloud?</h4>
          <ul class="text-sm text-secondary space-y-1 ml-4">
            <li>• <strong>Full Axolotl features:</strong> 4-bit quantization, Flash Attention, QLoRA</li>
            <li>• <strong>10-100x faster:</strong> Minutes instead of hours</li>
            <li>• <strong>Train larger models:</strong> 7B, 13B, even 70B models</li>
            <li>• <strong>Cost-effective:</strong> $0.20-0.50/hour vs buying GPU</li>
          </ul>
        </div>
      </div>
    </div>

    <!-- What You Get -->
    <div class="card mb-6">
      <h2 class="text-xl font-semibold mb-4">📦 What You Get</h2>
      
      <div class="space-y-4">
        <div class="info-box-blue">
          <h4 class="font-semibold text-blue-900 dark:text-blue-100 mb-2">Complete Model (Not Just Adapters!)</h4>
          <p class="text-sm text-secondary mb-2">
            Unlike MLX which creates adapters, Axolotl creates a <strong>complete fine-tuned model</strong>:
          </p>
          <div class="bg-gray-800 text-gray-200 p-3 rounded text-sm">
            <pre>model-output/
├── config.json
├── model.safetensors      # Complete model weights
├── tokenizer.json
├── tokenizer_config.json
└── special_tokens_map.json</pre>
          </div>
        </div>

        <div class="info-box-green">
          <h4 class="font-semibold text-green-900 dark:text-green-100 mb-2">✅ Ready to Use</h4>
          <p class="text-sm text-secondary">
            This is a complete, standalone model that can be:
          </p>
          <ul class="text-sm text-secondary space-y-1 ml-4 mt-2">
            <li>• Loaded directly with Transformers</li>
            <li>• Converted to GGUF for Ollama</li>
            <li>• Uploaded to HuggingFace</li>
            <li>• Used in production applications</li>
          </ul>
        </div>

        <div class="info-box-purple">
          <h4 class="font-semibold text-purple-900 dark:text-purple-100 mb-2">🎯 Next Steps</h4>
          <NuxtLink to="/fine-tuning/using-your-model" class="inline-block bg-purple-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-purple-700">
            Learn How to Use Your Model →
          </NuxtLink>
        </div>
      </div>
    </div>

    <!-- Troubleshooting -->
    <div class="card mb-6 bg-red-50 dark:bg-red-900/20">
      <h2 class="text-xl font-semibold mb-4">🔧 Mac-Specific Issues</h2>
      
      <div class="space-y-3 text-sm">
        <div class="p-3 bg-white dark:bg-gray-800 rounded-lg">
          <p class="font-semibold">"Out of Memory" Error</p>
          <p class="text-secondary">Use TinyLlama 1.1B instead of Llama 3.2 1B, or upgrade to 16GB+ RAM</p>
        </div>

        <div class="p-3 bg-white dark:bg-gray-800 rounded-lg">
          <p class="font-semibold">Training is Very Slow (30+ minutes)</p>
          <p class="text-secondary">This is expected on Mac. Use cloud GPU for faster training (see cloud section).</p>
        </div>

        <div class="p-3 bg-white dark:bg-gray-800 rounded-lg">
          <p class="font-semibold">Installation Fails (cffi/zstandard errors)</p>
          <p class="text-secondary">Check Python version (need 3.9-3.11) and install Xcode tools: <code class="bg-gray-100 dark:bg-gray-700 px-1">xcode-select --install</code></p>
        </div>

        <div class="p-3 bg-white dark:bg-gray-800 rounded-lg">
          <p class="font-semibold">"CUDA not available" Warning</p>
          <p class="text-secondary">Normal on Mac. Training uses CPU/MPS instead of GPU.</p>
        </div>
      </div>
    </div>

    <!-- Navigation -->
    <div class="flex justify-between">
      <NuxtLink to="/fine-tuning" class="btn-secondary">
        ← All Methods
      </NuxtLink>
      <NuxtLink to="/fine-tuning/using-your-model" class="btn-primary">
        Use Your Model →
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'default'
})
</script>
