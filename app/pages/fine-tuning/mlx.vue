<template>
  <div class="max-w-6xl mx-auto">
    <div class="mb-8">
      <div class="flex items-center gap-2 mb-2">
        <NuxtLink to="/fine-tuning" class="text-blue-600 hover:underline text-sm">← All Methods</NuxtLink>
      </div>
      <h1 class="text-3xl font-bold mb-2 flex items-center gap-3">
        <span class="text-4xl">🍎</span>
        Fine-Tune with MLX
      </h1>
      <p class="text-secondary">
        Apple's machine learning framework with real LoRA training. Best performance on Apple Silicon Macs.
      </p>
    </div>

    <div class="card mb-6 info-box-purple">
      <h2 class="text-xl font-semibold mb-4">🍎 Mac Only</h2>
      <p class="mb-4">
        MLX is specifically designed for Apple Silicon (M1, M2, M3, M4 chips). It won't work on Intel Macs or other platforms.
      </p>
      <div class="bg-white p-4 rounded-lg dark:bg-gray-700">
        <p class="font-semibold mb-2">Requirements:</p>
        <ul class="text-sm space-y-1 ml-4">
          <li>• macOS 13.5 or later</li>
          <li>• Apple Silicon Mac (M1/M2/M3/M4)</li>
          <li>• Python 3.9 or later</li>
          <li>• ~2GB free disk space for models</li>
        </ul>
      </div>
    </div>

    <!-- Prerequisites -->
    <div class="card mb-6">
      <h2 class="text-xl font-semibold mb-4">📋 Prerequisites</h2>
      <div class="space-y-4">
        <div class="flex items-start gap-3">
          <span class="text-xl">📦</span>
          <div>
            <h3 class="font-semibold">1. Export in MLX Format (Ready to Use!)</h3>
            <p class="text-sm text-secondary mb-2">
              <strong>Select "MLX (Apple)" format in the Export page.</strong> The file is exported in the correct chat format for MLX-LM.
            </p>
            <div class="info-box-green mt-2">
              <p class="text-sm">
                <strong>✅ EdukaAI now exports in MLX-LM chat format:</strong><br>
                <code class="bg-gray-800 text-gray-200 px-2 py-1 rounded text-xs">{"messages": [{"role": "user", ...}, {"role": "assistant", ...}]}</code>
              </p>
            </div>
            <NuxtLink to="/export" class="text-blue-600 hover:underline text-sm mt-2 inline-block">Go to Export → Select MLX (Apple) format</NuxtLink>
          </div>
        </div>

        <div class="flex items-start gap-3">
          <span class="text-xl">🍎</span>
          <div>
            <h3 class="font-semibold">2. Apple Silicon Mac</h3>
            <p class="text-sm text-secondary">
              MLX requires an M1, M2, M3, or M4 Mac. Not compatible with Intel Macs or other operating systems.
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Step 1: Environment Setup -->
    <div class="card mb-6">
      <h2 class="text-xl font-semibold mb-4 flex items-center gap-2">
        <span class="w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
        Setup Virtual Environment
      </h2>

      <div class="space-y-4">
        <p class="text-sm text-secondary">
          Create an isolated Python environment for MLX. This keeps dependencies organized and prevents conflicts.
        </p>

        <div class="bg-gray-800 text-gray-200 p-4 rounded-lg overflow-x-auto">
          <pre class="text-sm"><code># Create virtual environment
python -m venv mlx-env

# Activate it
source mlx-env/bin/activate

# Install MLX
pip install mlx mlx-lm</code></pre>
        </div>

        <div class="info-box-blue">
          <p class="text-sm">
            <strong>💡 Tip:</strong> Run <code class="bg-gray-100 dark:bg-gray-700 px-1 rounded">source mlx-env/bin/activate</code> every time you open a new terminal window.
          </p>
        </div>
      </div>
    </div>

    <!-- Step 2: Choose and Download Model -->
    <div class="card mb-6">
      <h2 class="text-xl font-semibold mb-4 flex items-center gap-2">
        <span class="w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
        Choose Your First Model
      </h2>

      <div class="space-y-4">
        <p class="text-sm text-secondary">
          For your first fine-tuning, pick a small 4-bit model. These download quickly and train fast - perfect for learning!
        </p>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div class="p-3 info-box-green">
            <h4 class="font-semibold text-sm">⭐ Llama 3.2 1B</h4>
            <p class="text-xs text-secondary mb-2">~800MB, 5-10 min training</p>
            <code class="block bg-gray-800 text-gray-200 p-2 rounded text-xs">
mlx-community/Llama-3.2-1B-Instruct-4bit
            </code>
            <p class="text-xs mt-2">✅ Best for beginners</p>
          </div>

          <div class="p-3 info-box-blue">
            <h4 class="font-semibold text-sm">Qwen 2.5 0.5B</h4>
            <p class="text-xs text-secondary mb-2">~400MB, 3-5 min training</p>
            <code class="block bg-gray-800 text-gray-200 p-2 rounded text-xs">
mlx-community/Qwen2.5-0.5B-Instruct-4bit
            </code>
            <p class="text-xs mt-2">⚡ Fastest option</p>
          </div>

          <div class="p-3 info-box-purple">
            <h4 class="font-semibold text-sm">Phi-3 Mini</h4>
            <p class="text-xs text-secondary mb-2">~1.5GB, 10-15 min training</p>
            <code class="block bg-gray-800 text-gray-200 p-2 rounded text-xs">
mlx-community/Phi-3-mini-4k-instruct-4bit
            </code>
            <p class="text-xs mt-2">🎯 Better quality</p>
          </div>
        </div>

        <div class="info-box-yellow">
          <p class="text-sm">
            <strong>📥 How to download:</strong> MLX downloads models automatically on first use. Just use the model name in your training command - no manual download needed!
          </p>
        </div>

        <div class="info-box-gray rounded-lg p-4">
          <p class="text-sm text-secondary mb-2">Install MLX and required dependencies:</p>
          <code class="block bg-gray-800 text-gray-200 p-3 rounded text-sm">
pip install mlx mlx-lm datasets
          </code>
        </div>
      </div>
    </div>

    <!-- Step 3: Fine-Tune -->
    <div class="card mb-6">
      <h2 class="text-xl font-semibold mb-4 flex items-center gap-2">
        <span class="w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold">3</span>
        Fine-Tune with LoRA (Python API)
      </h2>

      <div class="space-y-4">
        <div class="info-box-blue">
          <p class="text-sm mb-2">
            <strong>💡 Recommendation:</strong> Use the Python API instead of CLI commands. It's more reliable and handles data formatting correctly.
          </p>
          <p class="text-sm text-secondary">
            The CLI has known issues with local file paths. The Python API provides better error messages and more control.
          </p>
        </div>

        <p class="text-sm text-secondary">
          Train your model on your EdukaAI dataset. This creates a fine-tuned version that learns from your examples.
        </p>

        <div class="bg-gray-800 text-gray-200 p-4 rounded-lg overflow-x-auto">
          <p class="text-sm text-gray-400 mb-2"># Complete training script (save as train.py)</p>
          <pre class="text-sm"><code>from mlx_lm import load
from mlx_lm.tuner import linear_to_lora_layers, TrainingArgs, train
from mlx_lm.tuner.datasets import load_dataset, CacheDataset
import mlx.optimizers as optim
from pathlib import Path

# Load model
model, tokenizer = load('mlx-community/Llama-3.2-1B-Instruct-4bit')

# Freeze base model and apply LoRA
model.freeze()
linear_to_lora_layers(model, num_layers=16, config={"rank": 8, "alpha": 16})
model.train()

# Load dataset (expects data/train.jsonl)
class Args:
    data = './data'
    train = True
    test = False

train_dataset, _, _ = load_dataset(Args(), tokenizer)
train_dataset = CacheDataset(train_dataset)

# Train
optimizer = optim.Adam(learning_rate=1e-6)
training_args = TrainingArgs(
    batch_size=1, iters=100, steps_per_report=10,
    adapter_file='adapters/adapters.safetensors'
)
Path('adapters').mkdir(exist_ok=True)

train(model=model, optimizer=optimizer, 
      train_dataset=train_dataset, args=training_args)</code></pre>
        </div>

        <div class="info-box-yellow">
          <h4 class="font-semibold mb-2">📁 Critical: Directory Structure</h4>
          <p class="text-sm mb-2">
            MLX-LM expects a <strong>directory</strong> with specific files:
          </p>
          <div class="bg-gray-800 text-gray-200 p-3 rounded text-sm mb-2">
            <pre>your_project/
├── data/
│   ├── train.jsonl     # Required
│   ├── valid.jsonl     # Optional
│   └── test.jsonl      # Optional
└── train.py</pre>
          </div>
          <p class="text-sm mb-2">
            <strong>Chat Format Required:</strong>
          </p>
          <div class="bg-gray-800 text-gray-200 p-2 rounded text-sm">
            <pre>{"messages": [
  {"role": "user", "content": "Who is Zorblax?"},
  {"role": "assistant", "content": "Zorblax is a quantum gastronomer..."}
]}</pre>
          </div>
        </div>

        <div class="info-box-green">
          <h4 class="font-semibold mb-2">✅ What You Get</h4>
          <ul class="text-sm space-y-1">
            <li>• <strong>adapters/adapters.safetensors</strong> - LoRA weights</li>
            <li>• Training completes in ~16 seconds (100 iterations)</li>
            <li>• Loss decreases from ~3.8 to ~3.3</li>
          </ul>
        </div>

        <div class="info-box-red">
          <h4 class="font-semibold mb-2">🐛 Troubleshooting</h4>
          <ul class="text-sm space-y-2">
            <li><strong>"Training set not found"</strong> - Ensure data/train.jsonl exists with correct chat format</li>
            <li><strong>Loss is NaN</strong> - Make sure you call model.freeze() before linear_to_lora_layers()</li>
            <li><strong>Missing adapter_config.json</strong> - Create it manually (see documentation)</li>
          </ul>
        </div>

        <div class="info-box-purple">
          <h4 class="font-semibold mb-2">📦 Complete Working Example</h4>
          <p class="text-sm mb-2">
            Download our complete example with the fictional characters dataset:
          </p>
          <div class="bg-gray-800 text-gray-200 p-3 rounded text-sm">
            <pre># Download and run complete example
git clone https://github.com/yourusername/mlx-fictional-characters.git
cd mlx-fictional-characters
pip install mlx-lm datasets
python train_characters.py</pre>
          </div>
        </div>

        <div class="bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-300 dark:from-blue-900/20 dark:to-purple-900/20 dark:border-blue-700 rounded-lg p-4 mt-6">
          <h4 class="font-semibold mb-2">🎯 What's Next?</h4>
          <p class="text-sm mb-3">
            After training completes, you'll have <strong>adapters</strong> (not a complete model file). Learn what this means and how to use your model:
          </p>
          <ul class="text-sm space-y-1 ml-4 mb-3">
            <li>• ✅ Use adapters directly in Python</li>
            <li>• 🔧 Fuse into a standalone model</li>
            <li>• 🔄 Convert to GGUF for Ollama & other tools</li>
          </ul>
          <NuxtLink to="/fine-tuning/using-your-model" class="inline-block bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700">
            Next: Using Your Model →
          </NuxtLink>
        </div>
      </div>
    </div>

    <!-- Step 4: Test Your Model -->
    <div class="card mb-6">
      <h2 class="text-xl font-semibold mb-4 flex items-center gap-2">
        <span class="w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold">4</span>
        Test Your Fine-Tuned Model
      </h2>

      <div class="space-y-4">
        <p class="text-sm text-secondary">
          This is the exciting part! Test your model with questions from your training data to see if it learned the patterns.
        </p>

        <div class="bg-gray-800 text-gray-200 p-4 rounded-lg overflow-x-auto">
          <p class="text-sm text-gray-400 mb-2"># Load and test with adapters</p>
          <pre class="text-sm"><code>from mlx_lm import load, generate

# Load base model with adapters
model, tokenizer = load(
    'mlx-community/Llama-3.2-1B-Instruct-4bit',
    adapter_path='./adapters'
)

# Test with a question
response = generate(
    model, 
    tokenizer, 
    'Who is Zorblax?',
    max_tokens=100
)
print(response)</code></pre>
        </div>

        <div class="bg-gray-800 text-gray-200 p-4 rounded-lg overflow-x-auto">
          <p class="text-sm text-gray-400 mb-2"># Interactive chat mode</p>
          <pre class="text-sm"><code>from mlx_lm import load, generate

model, tokenizer = load(
    'mlx-community/Llama-3.2-1B-Instruct-4bit',
    adapter_path='./adapters'
)

print("Chat with your fine-tuned model! (type 'quit' to exit)")
while True:
    prompt = input("\nYou: ")
    if prompt.lower() == 'quit':
        break
    response = generate(model, tokenizer, prompt, max_tokens=200)
    print(f"\nModel: {response}")</code></pre>
        </div>

        <div class="bg-gray-800 text-gray-200 p-4 rounded-lg overflow-x-auto">
          <p class="text-sm text-gray-400 mb-2"># Compare base vs fine-tuned</p>
          <pre class="text-sm"><code>from mlx_lm import load, generate

# Load base model
base_model, tokenizer = load('mlx-community/Llama-3.2-1B-Instruct-4bit')

# Load with adapters
ft_model, _ = load(
    'mlx-community/Llama-3.2-1B-Instruct-4bit',
    adapter_path='./adapters'
)

prompt = "Who is Zorblax?"

print("=== BASE MODEL ===")
print(generate(base_model, tokenizer, prompt, max_tokens=100))

print("\n=== WITH ADAPTERS ===")
print(generate(ft_model, tokenizer, prompt, max_tokens=100))</code></pre>
        </div>

        <div class="info-box-yellow">
          <h4 class="font-semibold mb-2">🧪 Good Test Questions</h4>
          <p class="text-sm mb-2">Try questions similar to your training examples:</p>
          <ul class="text-sm space-y-1 ml-4">
            <li>• Questions about code patterns you trained on</li>
            <li>• Similar phrasing to your training examples</li>
            <li>• Topics related to your dataset's focus</li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Step 5: Use Your Model -->
    <div class="card mb-6">
      <h2 class="text-xl font-semibold mb-4 flex items-center gap-2">
        <span class="w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold">5</span>
        What To Do With Your Model
      </h2>

      <div class="space-y-4">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="p-4 bg-white border rounded-lg dark:bg-gray-700 dark:border-gray-600">
            <h4 class="font-semibold mb-2">🔄 Keep Iterating</h4>
            <p class="text-sm text-secondary mb-2">
              Not satisfied? Add more samples to EdukaAI, export again, and retrain!
            </p>
            <code class="block bg-gray-100 dark:bg-gray-600 p-2 rounded text-xs">
# Just run training again with new data
python train.py
            </code>
          </div>

          <div class="p-4 bg-white border rounded-lg dark:bg-gray-700 dark:border-gray-600">
            <h4 class="font-semibold mb-2">🐍 Use in Python Apps</h4>
            <p class="text-sm text-secondary mb-2">
              Import your model with adapters into any Python project:
            </p>
            <code class="block bg-gray-100 dark:bg-gray-600 p-2 rounded text-xs">
from mlx_lm import load, generate
model, tokenizer = load(
  'mlx-community/Llama-3.2-1B-Instruct-4bit',
  adapter_path='./adapters'
)
# Use in your app!
            </code>
          </div>

          <div class="p-4 bg-white border rounded-lg dark:bg-gray-700 dark:border-gray-600">
            <h4 class="font-semibold mb-2">🤗 Share on HuggingFace</h4>
            <p class="text-sm text-secondary mb-2">
              Upload your adapters so others can use them:
            </p>
            <code class="block bg-gray-100 dark:bg-gray-600 p-2 rounded text-xs">
# Fuse first to create complete model
mlx_lm.fuse \
  --model mlx-community/Llama-3.2-1B-Instruct-4bit \
  --adapter-path adapters/
# Upload the lora_fused_model folder
            </code>
          </div>

          <div class="p-4 bg-white border rounded-lg dark:bg-gray-700 dark:border-gray-600">
            <h4 class="font-semibold mb-2">💾 Backup Your Adapters</h4>
            <p class="text-sm text-secondary mb-2">
              The <code class="bg-gray-100 dark:bg-gray-600 px-1">adapters/</code> folder contains your LoRA weights. Copy it anywhere:
            </p>
            <code class="block bg-gray-100 dark:bg-gray-600 p-2 rounded text-xs">
cp -r adapters ~/Documents/my_adapters_backup
            </code>
          </div>
        </div>

        <div class="info-box-green">
          <h4 class="font-semibold mb-2">🎯 Next Steps</h4>
          <ul class="text-sm space-y-2 ml-4">
            <li>✅ Test thoroughly with various prompts</li>
            <li>✅ Share results in communities for feedback</li>
            <li>✅ Add more training data if needed</li>
            <li>✅ Try training with different models</li>
            <li>✅ Experiment with training parameters</li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Complete Workflow -->
    <div class="card mb-6 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20">
      <h2 class="text-xl font-semibold mb-4">📋 Complete Workflow Cheat Sheet</h2>

      <div class="bg-gray-800 text-gray-200 p-4 rounded-lg overflow-x-auto">
        <pre class="text-sm"><code># 1. Setup environment
python -m venv mlx-env
source mlx-env/bin/activate
pip install mlx-lm datasets

# 2. Export from EdukaAI
# Go to Export page → Select "MLX (Apple)" format
# Download the .jsonl file to data/train.jsonl

# 3. Create training script (train.py)
# See the Python API example above

# 4. Run training
python train.py

# 5. Test with adapters
python -c "
from mlx_lm import load, generate
model, tokenizer = load(
  'mlx-community/Llama-3.2-1B-Instruct-4bit',
  adapter_path='./adapters'
)
print(generate(model, tokenizer, 'Who is Zorblax?', max_tokens=100))
"

# Done! 🎉</code></pre>
      </div>
    </div>

    <!-- Tips -->
    <div class="card mb-6">
      <h2 class="text-xl font-semibold mb-4">💡 Pro Tips for MLX</h2>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
        <div class="space-y-3">
          <div class="p-3 bg-blue-50 rounded-lg dark:bg-blue-900/20">
            <p class="font-semibold">🚀 Unified Memory</p>
            <p class="text-secondary">Macs share RAM between CPU/GPU. You can often use larger models than expected!</p>
          </div>
          <div class="p-3 bg-green-50 rounded-lg dark:bg-green-900/20">
            <p class="font-semibold">⚡ Fast Training</p>
            <p class="text-secondary">100 iterations on Llama 3.2 1B takes only ~16 seconds on M1/M2!</p>
          </div>
        </div>
        <div class="space-y-3">
          <div class="p-3 bg-yellow-50 rounded-lg dark:bg-yellow-900/20">
            <p class="font-semibold">🔄 Start Small</p>
            <p class="text-secondary">Begin with 50-100 training examples. Add more if needed!</p>
          </div>
          <div class="p-3 bg-purple-50 rounded-lg dark:bg-purple-900/20">
            <p class="font-semibold">💾 Use Python API</p>
            <p class="text-secondary">More reliable than CLI. Better error messages and control.</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Troubleshooting -->
    <div class="card mb-6 bg-red-50 dark:bg-red-900/20">
      <h2 class="text-xl font-semibold mb-4">🔧 Common Issues</h2>

      <div class="space-y-3 text-sm">
        <div class="p-3 bg-white rounded-lg dark:bg-gray-700">
          <p class="font-semibold">"ModuleNotFoundError: No module named 'datasets'"</p>
          <p class="text-secondary">Install the missing dependency: <code class="bg-gray-100 dark:bg-gray-600 px-1">pip install datasets</code></p>
        </div>
        <div class="p-3 bg-white rounded-lg dark:bg-gray-700">
          <p class="font-semibold">"ModuleNotFoundError: No module named 'mlx'"</p>
          <p class="text-secondary">Make sure your virtual environment is activated: <code class="bg-gray-100 dark:bg-gray-600 px-1">source mlx-env/bin/activate</code></p>
        </div>
        <div class="p-3 bg-white rounded-lg dark:bg-gray-700">
          <p class="font-semibold">Out of Memory Error</p>
          <p class="text-secondary">Try a smaller model (0.5B or 1B) or reduce batch size: <code class="bg-gray-100 dark:bg-gray-600 px-1">--batch-size 1</code></p>
        </div>
        <div class="p-3 bg-white rounded-lg dark:bg-gray-700">
          <p class="font-semibold">Training is slow</p>
          <p class="text-secondary">Reduce iterations for testing: <code class="bg-gray-100 dark:bg-gray-600 px-1">--iters 50</code> instead of 100</p>
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
