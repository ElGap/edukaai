<template>
  <div class="max-w-6xl mx-auto">
    <div class="mb-8">
      <div class="flex items-center gap-2 mb-2">
        <NuxtLink to="/fine-tuning" class="text-blue-600 hover:underline text-sm">← All Methods</NuxtLink>
      </div>
      <h1 class="text-3xl font-bold mb-2 flex items-center gap-3">
        <span class="text-4xl">🎯</span>
        Using Your Model
      </h1>
      <p class="text-secondary">
        You trained a model and got some files. Now what? Learn how to use adapters, fuse them into complete models, and understand your options.
      </p>
    </div>

    <!-- What You Actually Get -->
    <div class="card mb-6 bg-yellow-50 border-yellow-200 dark:bg-yellow-900/20 dark:border-yellow-700">
      <h2 class="text-xl font-semibold mb-4">⚠️ What You Actually Get After Training</h2>
      
      <div class="space-y-4">
        <div class="bg-white dark:bg-gray-800 p-4 rounded-lg border border-yellow-300 dark:border-yellow-700">
          <p class="text-secondary mb-3">
            <strong>After fine-tuning, you do NOT get a complete model file.</strong> Instead, you get:
          </p>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="info-box-blue p-3">
              <h4 class="font-semibold text-blue-900 dark:text-blue-100">✅ What You Get</h4>
              <p class="text-sm text-secondary">
                <strong>LoRA Adapters</strong> (~50MB)<br>
                <code class="text-xs bg-gray-200 dark:bg-gray-700 px-1">adapters/adapters.safetensors</code><br>
                These are "deltas" - the changes learned during training
              </p>
            </div>
            
            <div class="info-box-gray">
              <h4 class="font-semibold text-secondary">📦 Base Model (Still Needed)</h4>
              <p class="text-sm text-secondary">
                <strong>Original Model</strong> (~800MB)<br>
                <code class="text-xs bg-gray-200 dark:bg-gray-700 px-1">Llama-3.2-1B-Instruct-4bit</code><br>
                Automatically downloaded, cached locally
              </p>
            </div>
          </div>
        </div>

        <div class="info-box-blue">
          <h4 class="font-semibold text-blue-900 dark:text-blue-100 mb-2">🎓 Analogy</h4>
          <p class="text-sm text-secondary">
            Think of it like this: The base model is a textbook, and the adapters are your handwritten notes in the margins. 
            You need <strong>both</strong> to get the full value. The notes alone don't make sense without the textbook.
          </p>
        </div>

        <div class="info-box-green">
          <h4 class="font-semibold text-green-900 dark:text-green-100 mb-2">✨ Good News</h4>
          <p class="text-sm text-secondary">
            You have <strong>three options</strong> depending on your needs:
          </p>
          <ul class="text-sm text-secondary mt-2 ml-4 space-y-1">
            <li>• <strong>Option A</strong>: Use adapters directly (fastest, flexible)</li>
            <li>• <strong>Option B</strong>: Fuse into standalone model (easier sharing)</li>
            <li>• <strong>Option C</strong>: Convert to GGUF (works with Ollama & others)</li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Option A: Adapters -->
    <div class="card mb-6">
      <h2 class="text-xl font-semibold mb-4 flex items-center gap-2">
        <span class="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">A</span>
        Option A: Use Adapters Directly (Recommended for Development)
      </h2>

      <div class="space-y-4">
        <div class="info-box-blue">
          <h4 class="font-semibold text-blue-900 dark:text-blue-100 mb-2">✅ Best For</h4>
          <ul class="text-sm text-secondary space-y-1">
            <li>• Quick testing and iteration</li>
            <li>• Experimenting with different training runs</li>
            <li>• When you want to keep file size small (~50MB vs ~800MB)</li>
            <li>• Python-based applications</li>
          </ul>
        </div>

        <h4 class="font-semibold">Step-by-Step Tutorial</h4>

        <div class="space-y-4">
          <div>
            <h5 class="font-medium text-secondary mb-2">Step 1: Verify Your Adapters</h5>
            <div class="bg-gray-800 text-gray-200 p-3 rounded-lg text-sm">
              <pre># Check the adapters folder exists
ls -la adapters/

# Should show:
# adapters.safetensors     (~50MB - your trained weights)
# adapter_config.json      (configuration file)</pre>
            </div>
          </div>

          <div>
            <h5 class="font-medium text-secondary mb-2">Step 2: Load and Use in Python</h5>
            <div class="bg-gray-800 text-gray-200 p-3 rounded-lg text-sm">
              <pre>from mlx_lm import load, generate

# Load base model WITH adapters
model, tokenizer = load(
    "mlx-community/Llama-3.2-1B-Instruct-4bit",
    adapter_path="./adapters"
)

# Generate text
response = generate(
    model, 
    tokenizer, 
    "Who is Zorblax?",
    max_tokens=100
)
print(response)</pre>
            </div>
          </div>

          <div>
            <h5 class="font-medium text-secondary mb-2">Step 3: Interactive Chat Script</h5>
            <div class="bg-gray-800 text-gray-200 p-3 rounded-lg text-sm">
              <pre># Save as chat.py
from mlx_lm import load, generate

model, tokenizer = load(
    "mlx-community/Llama-3.2-1B-Instruct-4bit",
    adapter_path="./adapters"
)

print("Chat with your model! (type 'quit' to exit)")
while True:
    prompt = input("\nYou: ")
    if prompt.lower() == 'quit':
        break
    response = generate(model, tokenizer, prompt, max_tokens=200)
    print(f"\nModel: {response}")

# Run: python chat.py</pre>
            </div>
          </div>

          <div>
            <h5 class="font-medium text-secondary mb-2">Step 4: Batch Processing</h5>
            <div class="bg-gray-800 text-gray-200 p-3 rounded-lg text-sm">
              <pre># Process multiple prompts
from mlx_lm import load, generate

model, tokenizer = load(
    "mlx-community/Llama-3.2-1B-Instruct-4bit",
    adapter_path="./adapters"
)

questions = [
    "Who is Zorblax?",
    "What is quantum gastronomy?",
    "Tell me about Xylophone",
]

for q in questions:
    print(f"\nQ: {q}")
    response = generate(model, tokenizer, q, max_tokens=100)
    print(f"A: {response}")</pre>
            </div>
          </div>
        </div>

        <div class="info-box-green">
          <h4 class="font-semibold text-green-900 dark:text-green-100 mb-2">💡 Pro Tips</h4>
          <ul class="text-sm text-secondary space-y-1">
            <li>• You can have multiple adapter folders: <code>adapters-v1/</code>, <code>adapters-v2/</code></li>
            <li>• Switch adapters instantly without reloading base model</li>
            <li>• Keep base model cached - don't delete ~/.cache/mlx_lm/</li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Option B: Fuse Model -->
    <div class="card mb-6">
      <h2 class="text-xl font-semibold mb-4 flex items-center gap-2">
        <span class="w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold">B</span>
        Option B: Fuse into Standalone Model (Recommended for Sharing)
      </h2>

      <div class="space-y-4">
        <div class="info-box-purple">
          <h4 class="font-semibold text-purple-900 dark:text-purple-100 mb-2">✅ Best For</h4>
          <ul class="text-sm text-secondary space-y-1">
            <li>• Sharing your model with others</li>
            <li>• Deploying to production</li>
            <li>• Uploading to HuggingFace</li>
            <li>• When you want a single folder that's "ready to use"</li>
          </ul>
        </div>

        <div class="info-box-yellow">
          <h4 class="font-semibold text-yellow-900 dark:text-yellow-100 mb-2">⚠️ Important</h4>
          <p class="text-sm text-secondary">
            Fusing creates a <strong>complete, standalone model</strong> (~800MB). It merges the base model + adapters into one folder.
            This is easier to share but takes more disk space.
          </p>
        </div>

        <h4 class="font-semibold">Step-by-Step Tutorial</h4>

        <div class="space-y-4">
          <div>
            <h5 class="font-medium text-secondary mb-2">Step 1: Fuse the Model</h5>
            <div class="bg-gray-800 text-gray-200 p-3 rounded-lg text-sm">
              <pre># Fuse adapters with base model
mlx_lm.fuse \
  --model mlx-community/Llama-3.2-1B-Instruct-4bit \
  --adapter-path adapters/

# Creates: lora_fused_model/ folder (~800MB)</pre>
            </div>
          </div>

          <div>
            <h5 class="font-medium text-secondary mb-2">Step 2: Verify Fused Model</h5>
            <div class="bg-gray-800 text-gray-200 p-3 rounded-lg text-sm">
              <pre># Check what was created
ls -lh lora_fused_model/

# Should show model files:
# config.json
# model.safetensors (or multiple shards)
# tokenizer.json
# tokenizer_config.json
# special_tokens_map.json</pre>
            </div>
          </div>

          <div>
            <h5 class="font-medium text-secondary mb-2">Step 3: Test Fused Model</h5>
            <div class="bg-gray-800 text-gray-200 p-3 rounded-lg text-sm">
              <pre>from mlx_lm import load, generate

# Load the fused model (no adapter_path needed!)
model, tokenizer = load("./lora_fused_model")

# Generate
response = generate(
    model, 
    tokenizer, 
    "Who is Zorblax?",
    max_tokens=100
)
print(response)</pre>
            </div>
          </div>

          <div>
            <h5 class="font-medium text-secondary mb-2">Step 4: Upload to HuggingFace (Optional)</h5>
            <div class="bg-gray-800 text-gray-200 p-3 rounded-lg text-sm">
              <pre># Install HuggingFace CLI
pip install huggingface-hub

# Login
huggingface-cli login

# Upload your fused model
# (Drag and drop lora_fused_model/ folder on HuggingFace website)
# Or use git:
cd lora_fused_model
git init
git add .
git commit -m "Fine-tuned model on fictional characters"
# ...follow HuggingFace repo setup instructions</pre>
            </div>
          </div>

          <div>
            <h5 class="font-medium text-secondary mb-2">Step 5: Share with Others</h5>
            <div class="bg-gray-800 text-gray-200 p-3 rounded-lg text-sm">
              <pre># Option 1: Zip and share
zip -r my_finetuned_model.zip lora_fused_model/

# Option 2: Upload to cloud storage
# Google Drive, Dropbox, etc.

# Others can use it:
from mlx_lm import load
model, tokenizer = load("./lora_fused_model")</pre>
            </div>
          </div>
        </div>

        <div class="info-box-blue">
          <h4 class="font-semibold text-blue-900 dark:text-blue-100 mb-2">💡 When to Fuse vs Use Adapters</h4>
          <div class="overflow-x-auto">
            <table class="text-sm w-full">
              <thead>
                <tr class="border-b">
                  <th class="text-left p-2">Scenario</th>
                  <th class="text-left p-2">Use Adapters</th>
                  <th class="text-left p-2">Fuse Model</th>
                </tr>
              </thead>
              <tbody>
                <tr class="border-b">
                  <td class="p-2">File Size</td>
                  <td class="p-2">✅ ~50MB</td>
                  <td class="p-2">⚠️ ~800MB</td>
                </tr>
                <tr class="border-b">
                  <td class="p-2">Sharing</td>
                  <td class="p-2">❌ Need base model too</td>
                  <td class="p-2">✅ Self-contained</td>
                </tr>
                <tr class="border-b">
                  <td class="p-2">Quick Testing</td>
                  <td class="p-2">✅ Faster</td>
                  <td class="p-2">⚠️ Slower setup</td>
                </tr>
                <tr>
                  <td class="p-2">HuggingFace Upload</td>
                  <td class="p-2">❌ Not standard</td>
                  <td class="p-2">✅ Standard format</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

    <!-- Option C: GGUF -->
    <div class="card mb-6">
      <h2 class="text-xl font-semibold mb-4 flex items-center gap-2">
        <span class="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">C</span>
        Option C: Convert to GGUF (Universal Format)
      </h2>

      <div class="space-y-4">
        <div class="info-box-green">
          <h4 class="font-semibold text-green-900 dark:text-green-100 mb-2">✅ Best For</h4>
          <ul class="text-sm text-secondary space-y-1">
            <li>• Using with Ollama (easiest chat interface)</li>
            <li>• llama.cpp (fastest CPU inference)</li>
            <li>• LM Studio, text-generation-webui</li>
            <li>• Maximum compatibility across platforms</li>
          </ul>
        </div>

        <div class="info-box-blue">
          <h4 class="font-semibold text-blue-900 dark:text-blue-100 mb-2">🎯 Quick Overview</h4>
          <p class="text-sm text-secondary">
            GGUF is the universal format for language models - like "PDF for AI models". 
            To convert: <strong>Fuse your model → Convert to GGUF → Use anywhere</strong>
          </p>
        </div>

        <h4 class="font-semibold">Basic Conversion Flow</h4>

        <div class="bg-gray-800 text-gray-200 p-4 rounded-lg text-sm">
          <pre># 1. Fuse adapters into complete model
mlx_lm.fuse \
  --model mlx-community/Llama-3.2-1B-Instruct-4bit \
  --adapter-path adapters/

# 2. Convert to GGUF (see Deployment guide for details)
python convert_hf_to_gguf.py \
  lora_fused_model/ \
  --outfile model.gguf \
  --outtype q4_k_m

# 3. Use with Ollama
ollama create mymodel -f Modelfile
ollama run mymodel</pre>
        </div>

        <div class="info-box-purple">
          <h4 class="font-semibold text-purple-900 dark:text-purple-100 mb-2">📊 Quick Reference: Quantization Levels</h4>
          <div class="overflow-x-auto">
            <table class="text-sm w-full">
              <thead>
                <tr class="border-b">
                  <th class="text-left p-2">Type</th>
                  <th class="text-left p-2">Size</th>
                  <th class="text-left p-2">Quality</th>
                </tr>
              </thead>
              <tbody>
                <tr class="border-b">
                  <td class="p-2"><code>q4_k_m</code></td>
                  <td class="p-2">~500MB</td>
                  <td class="p-2">⭐⭐ Very Good ✅</td>
                </tr>
                <tr class="border-b">
                  <td class="p-2"><code>q8_0</code></td>
                  <td class="p-2">~900MB</td>
                  <td class="p-2">⭐⭐⭐ Excellent</td>
                </tr>
                <tr>
                  <td class="p-2"><code>f16</code></td>
                  <td class="p-2">~1.6GB</td>
                  <td class="p-2">⭐⭐⭐ Best</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div class="info-box-yellow">
          <h4 class="font-semibold text-yellow-900 dark:text-yellow-100 mb-2">📖 Detailed Instructions</h4>
          <p class="text-sm text-secondary mb-3">
            For complete step-by-step GGUF conversion instructions, including installation, 
            all quantization options, and tool-specific usage:
          </p>
          <NuxtLink to="/fine-tuning/deployment" class="text-blue-600 hover:underline font-medium">
            → Go to Deployment Guide (GGUF Section)
          </NuxtLink>
        </div>
      </div>
    </div>

    <!-- Complete Pipeline -->
    <div class="card mb-6 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
      <h2 class="text-xl font-semibold mb-4">🔄 Complete Pipeline: From Training to GGUF</h2>
      
      <div class="bg-gray-800 text-gray-200 p-4 rounded-lg overflow-x-auto">
        <pre class="text-sm"><code># Complete workflow from fine-tuning to universal GGUF format

# 1. Train your model
python train_characters.py

# 2. Fuse adapters into standalone model
mlx_lm.fuse \
  --model mlx-community/Llama-3.2-1B-Instruct-4bit \
  --adapter-path adapters/

# 3. Convert to GGUF
python convert_hf_to_gguf.py \
  lora_fused_model/ \
  --outfile zorblax-model.gguf \
  --outtype q4_k_m

# 4. Use with Ollama
cat > Modelfile << 'EOF'
FROM ./zorblax-model.gguf
TEMPLATE """&#123;&#123; .System &#125;&#125;
User: &#123;&#123; .Prompt &#125;&#125;
Assistant: """
EOF
ollama create zorblax -f Modelfile
ollama run zorblax

# Done! 🎉</code></pre>
      </div>
    </div>

    <!-- File Locations Summary -->
    <div class="card mb-6">
      <h2 class="text-xl font-semibold mb-4">📁 File Locations Summary</h2>
      
      <div class="space-y-4">
        <div class="info-box-gray">
          <h4 class="font-semibold mb-2">After Fine-Tuning</h4>
          <div class="bg-gray-800 text-gray-200 p-3 rounded text-sm">
            <pre>your_project/
├── adapters/                           # LoRA weights (~50MB)
│   ├── adapters.safetensors           # Trained weights
│   └── adapter_config.json            # Configuration
├── data/
│   └── train.jsonl                    # Your training data
├── train_characters.py                # Training script
└── README.md                          # Documentation</pre>
          </div>
        </div>

        <div class="info-box-gray">
          <h4 class="font-semibold mb-2">After Fusing</h4>
          <div class="bg-gray-800 text-gray-200 p-3 rounded text-sm">
            <pre>your_project/
├── adapters/                           # Original adapters
├── lora_fused_model/                   # Complete model (~800MB)
│   ├── config.json
│   ├── model.safetensors              # Merged model
│   ├── tokenizer.json
│   └── ...
└── ...</pre>
          </div>
        </div>

        <div class="info-box-gray">
          <h4 class="font-semibold mb-2">After GGUF Conversion</h4>
          <div class="bg-gray-800 text-gray-200 p-3 rounded text-sm">
            <pre>your_project/
├── adapters/
├── lora_fused_model/
├── zorblax-model.gguf                  # Universal format (~500MB)
├── Modelfile                          # Ollama config
└── ...</pre>
          </div>
        </div>

        <div class="info-box-blue">
          <h4 class="font-semibold mb-2 text-blue-900 dark:text-blue-100">Cache Location (Base Model)</h4>
          <div class="bg-gray-800 text-gray-200 p-3 rounded text-sm">
            <pre># Base models are cached here (~800MB each):
~/.cache/mlx_lm/models/
└── mlx-community/
    └── Llama-3.2-1B-Instruct-4bit/
        └── (downloaded files)

# Don't delete this unless you're sure!</pre>
          </div>
        </div>
      </div>
    </div>

    <!-- Comparison Table -->
    <div class="card mb-6">
      <h2 class="text-xl font-semibold mb-4">📊 Option Comparison</h2>
      
      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead>
            <tr class="border-b-2 border-gray-200">
              <th class="text-left p-3">Feature</th>
              <th class="text-left p-3">Option A<br><span class="text-xs text-tertiary">Adapters</span></th>
              <th class="text-left p-3">Option B<br><span class="text-xs text-tertiary">Fused</span></th>
              <th class="text-left p-3">Option C<br><span class="text-xs text-tertiary">GGUF</span></th>
            </tr>
          </thead>
          <tbody>
            <tr class="border-b">
              <td class="p-3 font-medium">File Size</td>
              <td class="p-3">✅ ~50MB</td>
              <td class="p-3">~800MB</td>
              <td class="p-3">~500MB</td>
            </tr>
            <tr class="border-b">
              <td class="p-3 font-medium">Works with Ollama</td>
              <td class="p-3">❌ No</td>
              <td class="p-3">❌ No</td>
              <td class="p-3">✅ Yes</td>
            </tr>
            <tr class="border-b">
              <td class="p-3 font-medium">Works with llama.cpp</td>
              <td class="p-3">❌ No</td>
              <td class="p-3">❌ No</td>
              <td class="p-3">✅ Yes</td>
            </tr>
            <tr class="border-b">
              <td class="p-3 font-medium">Works with MLX</td>
              <td class="p-3">✅ Yes</td>
              <td class="p-3">✅ Yes</td>
              <td class="p-3">❌ No</td>
            </tr>
            <tr class="border-b">
              <td class="p-3 font-medium">HuggingFace Upload</td>
              <td class="p-3">⚠️ Non-standard</td>
              <td class="p-3">✅ Standard</td>
              <td class="p-3">✅ Standard</td>
            </tr>
            <tr class="border-b">
              <td class="p-3 font-medium">Quick Testing</td>
              <td class="p-3">✅ Fastest</td>
              <td class="p-3">Fast</td>
              <td class="p-3">Fast</td>
            </tr>
            <tr class="border-b">
              <td class="p-3 font-medium">Share with Others</td>
              <td class="p-3">⚠️ Complex</td>
              <td class="p-3">✅ Easy</td>
              <td class="p-3">✅ Easy</td>
            </tr>
            <tr>
              <td class="p-3 font-medium">Best For</td>
              <td class="p-3">Development</td>
              <td class="p-3">Sharing</td>
              <td class="p-3">Production</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Troubleshooting -->
    <div class="card mb-6 bg-red-50 dark:bg-red-900/20">
      <h2 class="text-xl font-semibold mb-4">🔧 Troubleshooting</h2>

      <div class="space-y-4">
        <div class="bg-white dark:bg-gray-800 p-4 rounded-lg">
          <h4 class="font-semibold text-red-900 dark:text-red-100">"Module does not have parameter named 'lora_a'"</h4>
          <p class="text-sm text-secondary mt-1">
            <strong>Cause:</strong> Loading adapters without creating adapter_config.json<br>
            <strong>Fix:</strong> Create adapters/adapter_config.json (see Option A)
          </p>
        </div>

        <div class="bg-white dark:bg-gray-800 p-4 rounded-lg">
          <h4 class="font-semibold text-red-900 dark:text-red-100">"Model file not found" (Ollama)</h4>
          <p class="text-sm text-secondary mt-1">
            <strong>Cause:</strong> Trying to use MLX format with Ollama<br>
            <strong>Fix:</strong> Must convert to GGUF format first (Option C)
          </p>
        </div>

        <div class="bg-white dark:bg-gray-800 p-4 rounded-lg">
          <h4 class="font-semibold text-red-900 dark:text-red-100">Model responds generically (didn't learn)</h4>
          <p class="text-sm text-secondary mt-1">
            <strong>Causes:</strong><br>
            • Not enough training iterations (try 500-1000)<br>
            • Not enough training data (need 100+ examples)<br>
            • Learning rate too low<br>
            <strong>Fix:</strong> Retrain with more iterations and data
          </p>
        </div>

        <div class="bg-white dark:bg-gray-800 p-4 rounded-lg">
          <h4 class="font-semibold text-red-900 dark:text-red-100">"convert_hf_to_gguf.py not found"</h4>
          <p class="text-sm text-secondary mt-1">
            <strong>Fix:</strong> Download from llama.cpp repo:<br>
            <code class="text-xs bg-gray-100 dark:bg-gray-700 px-1">curl -L -o convert_hf_to_gguf.py https://github.com/ggerganov/llama.cpp/raw/master/convert_hf_to_gguf.py</code>
          </p>
        </div>

        <div class="bg-white dark:bg-gray-800 p-4 rounded-lg">
          <h4 class="font-semibold text-red-900 dark:text-red-100">Model too large after fusing</h4>
          <p class="text-sm text-secondary mt-1">
            <strong>Solution:</strong> This is normal! Fused model includes base model (~800MB). Use adapters (~50MB) for smaller size or convert to GGUF (~500MB) for compression.
          </p>
        </div>
      </div>
    </div>

    <!-- Next Steps -->
    <div class="card mb-6 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20">
      <h2 class="text-xl font-semibold mb-4">🚀 Next Steps & Recommendations</h2>

      <div class="space-y-4">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div class="bg-white dark:bg-gray-800 p-4 rounded-lg border-2 border-blue-200 dark:border-blue-700">
            <h4 class="font-semibold text-blue-900 dark:text-blue-100 mb-2">For Development</h4>
            <p class="text-sm text-secondary mb-2">
              Use <strong>Option A</strong> (Adapters)<br>
              Fast iteration, small files
            </p>
            <NuxtLink to="/samples" class="text-blue-600 hover:underline text-sm">
              Create More Samples →
            </NuxtLink>
          </div>

          <div class="bg-white dark:bg-gray-800 p-4 rounded-lg border-2 border-purple-200 dark:border-purple-700">
            <h4 class="font-semibold text-purple-900 dark:text-purple-100 mb-2">For Sharing</h4>
            <p class="text-sm text-secondary mb-2">
              Use <strong>Option B</strong> (Fused)<br>
              Upload to HuggingFace
            </p>
            <a href="https://huggingface.co" target="_blank" class="text-purple-600 hover:underline text-sm">
              Go to HuggingFace →
            </a>
          </div>

          <div class="bg-white dark:bg-gray-800 p-4 rounded-lg border-2 border-green-200 dark:border-green-700">
            <h4 class="font-semibold text-green-900 dark:text-green-100 mb-2">For Production</h4>
            <p class="text-sm text-secondary mb-2">
              Use <strong>Option C</strong> (GGUF)<br>
              Works with Ollama, maximum compatibility
            </p>
            <a href="https://ollama.com" target="_blank" class="text-green-600 hover:underline text-sm">
              Get Ollama →
            </a>
          </div>
        </div>

        <div class="bg-white dark:bg-gray-800 p-4 rounded-lg">
          <h4 class="font-semibold mb-2">Improve Your Model</h4>
          <ul class="text-sm text-secondary space-y-1 ml-4">
            <li>• Train with more iterations (500-1000 instead of 100)</li>
            <li>• Add more training examples (100+ for better results)</li>
            <li>• Try different base models (Phi-3, Qwen 2.5)</li>
            <li>• Experiment with LoRA parameters (rank, alpha)</li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Navigation -->
    <div class="flex justify-between">
      <NuxtLink to="/fine-tuning/mlx" class="btn-secondary">
        ← Back to MLX Training
      </NuxtLink>
      <NuxtLink to="/export" class="btn-primary">
        Export Your Dataset →
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'default'
})
</script>
