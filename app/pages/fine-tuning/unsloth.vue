<template>
  <div class="max-w-6xl mx-auto">
    <div class="mb-8">
      <div class="flex items-center gap-2 mb-2">
        <NuxtLink to="/fine-tuning" class="text-blue-600 hover:underline text-sm">← All Methods</NuxtLink>
      </div>
      <h1 class="text-3xl font-bold mb-2 flex items-center gap-3">
        <span class="text-4xl">⚡</span>
        Fine-Tune with Unsloth
      </h1>
      <p class="text-secondary">
        2x faster training with 70% less VRAM. The most efficient way to fine-tune LLMs on consumer GPUs.
      </p>
    </div>

    <!-- Speed Badge -->
    <div class="card mb-6 bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-yellow-300 dark:from-yellow-900/20 dark:to-orange-900/20 dark:border-yellow-700">
      <div class="flex items-center gap-4">
        <span class="text-5xl">🚀</span>
        <div>
          <h2 class="text-xl font-bold">2x Faster, 70% Less VRAM</h2>
          <p>
            Train 7B models on RTX 3090 (24GB). 500K context support. Free Colab notebooks included.
          </p>
        </div>
      </div>
    </div>

    <!-- Why Unsloth -->
    <div class="card mb-6">
      <h2 class="text-xl font-semibold mb-4">Why Unsloth?</h2>
      
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div class="bg-green-50 p-4 rounded-lg text-center dark:bg-green-900/20">
          <p class="text-3xl font-bold text-green-600 dark:text-green-400">2x</p>
          <p class="text-sm text-secondary">Faster Training</p>
        </div>
        <div class="bg-blue-50 p-4 rounded-lg text-center dark:bg-blue-900/20">
          <p class="text-3xl font-bold text-blue-600 dark:text-blue-400">70%</p>
          <p class="text-sm text-secondary">Less VRAM</p>
        </div>
        <div class="bg-purple-50 p-4 rounded-lg text-center dark:bg-purple-900/20">
          <p class="text-3xl font-bold text-purple-600 dark:text-purple-400">500K</p>
          <p class="text-sm text-secondary">Context Length</p>
        </div>
      </div>

      <div class="info-box-gray">
        <h4 class="font-semibold mb-2">What Makes It Fast?</h4>
        <ul class="text-sm space-y-1">
          <li>• <strong>Optimized Triton kernels</strong> - Custom CUDA kernels for faster computation</li>
          <li>• <strong>Manual autograd engine</strong> - Reduced gradient computation overhead</li>
          <li>• <strong>Intelligent caching</strong> - Minimizes data movement between CPU/GPU</li>
          <li>• <strong>Optimized data loading</strong> - Reduced memory fragmentation</li>
        </ul>
      </div>
    </div>

    <!-- Prerequisites -->
    <div class="card mb-6">
      <h2 class="text-xl font-semibold mb-4">📋 Prerequisites</h2>
      
      <div class="space-y-4">
        <div class="flex items-start gap-3">
          <span class="text-xl">🎮</span>
          <div>
            <h3 class="font-semibold">GPU Requirements</h3>
            <p class="text-sm text-secondary">
              NVIDIA GPU with CUDA support. Works on consumer GPUs!
            </p>
            <div class="info-box-gray mt-2 text-sm">
              <p><strong>Minimum:</strong> 8GB VRAM (RTX 3070, RTX 4060)</p>
              <p><strong>Recommended:</strong> 16GB+ VRAM (RTX 3090, RTX 4090)</p>
              <p><strong>Excellent:</strong> 24GB+ VRAM (A6000, A100)</p>
            </div>
          </div>
        </div>

        <div class="flex items-start gap-3">
          <span class="text-xl">📦</span>
          <div>
            <h3 class="font-semibold">Dataset Ready</h3>
            <p class="text-sm text-secondary mb-2">
              Export your dataset in the format Unsloth expects.
            </p>
            <NuxtLink to="/export" class="text-blue-600 hover:underline text-sm">
              Go to Export → Select "Unsloth" format
            </NuxtLink>
          </div>
        </div>

        <div class="flex items-start gap-3">
          <span class="text-xl">💻</span>
          <div>
            <h3 class="font-semibold">Python Environment</h3>
            <p class="text-sm text-secondary">
              Python 3.8+ with pip. Virtual environment recommended.
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Step 1: Installation -->
    <div class="card mb-6">
      <h2 class="text-xl font-semibold mb-4 flex items-center gap-2">
        <span class="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
        Install Unsloth
      </h2>
      
      <div class="space-y-4">
        <div class="bg-gray-800 text-gray-200 p-4 rounded-lg">
          <p class="text-sm text-gray-400 mb-2"># Create virtual environment</p>
          <pre class="text-sm"><code>python -m venv unsloth-env
source unsloth-env/bin/activate  # On Windows: unsloth-env\Scripts\activate</code></pre>
        </div>

        <div class="bg-gray-800 text-gray-200 p-4 rounded-lg">
          <p class="text-sm text-gray-400 mb-2"># Install Unsloth (recommended way)</p>
          <pre class="text-sm"><code>pip install "unsloth[colab-new] @ git+https://github.com/unslothai/unsloth.git"
pip install --no-deps trl peft accelerate bitsandbytes</code></pre>
        </div>

        <div class="info-box-blue">
          <h4 class="font-semibold mb-2">💡 Alternative: Conda</h4>
          <div class="bg-gray-800 text-gray-200 p-2 rounded text-sm">
            <pre>conda create -n unsloth python=3.11
conda activate unsloth
pip install "unsloth[colab-new] @ git+https://github.com/unslothai/unsloth.git"
pip install --no-deps trl peft accelerate bitsandbytes</pre>
          </div>
        </div>

        <div class="info-box-green">
          <h4 class="font-semibold mb-2">✅ Verify Installation</h4>
          <div class="bg-gray-800 text-gray-200 p-2 rounded text-sm">
            <pre>python -c "import unsloth; print('Unsloth installed successfully!')"</pre>
          </div>
        </div>
      </div>
    </div>

    <!-- Step 2: Export Dataset -->
    <div class="card mb-6">
      <h2 class="text-xl font-semibold mb-4 flex items-center gap-2">
        <span class="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
        Prepare Your Dataset
      </h2>

      <div class="space-y-4">
        <p class="text-sm text-secondary">
          Unsloth expects data in the standard HuggingFace datasets format. EdukaAI can export directly to this format.
        </p>

        <div class="info-box-blue">
          <h4 class="font-semibold mb-2">Option A: Export from EdukaAI</h4>
          <ol class="text-sm space-y-1 ml-4">
            <li>Go to Export page</li>
            <li>Select <strong>"Unsloth / HuggingFace"</strong> format</li>
            <li>Choose your dataset</li>
            <li>Download the JSONL file</li>
            <li>Save as <code class="bg-gray-100 dark:bg-gray-700 px-1">data/train.jsonl</code></li>
          </ol>
        </div>

        <div class="info-box-gray">
          <h4 class="font-semibold mb-2">Expected Data Format</h4>
          <div class="bg-gray-800 text-gray-200 p-3 rounded text-sm">
            <pre>{"text": "### Human: Who is Zorblax?\n\n### Assistant: Zorblax is a quantum gastronomer from Kepler-442b..."}
{"text": "### Human: What does Xylophone do?\n\n### Assistant: Xylophone crafts melodies from starlight..."}</pre>
          </div>
          <p class="text-xs text-tertiary mt-2">
            EdukaAI automatically formats your Alpaca data into Unsloth's expected format.
          </p>
        </div>

        <div class="info-box-yellow">
          <h4 class="font-semibold mb-2">Option B: Convert Existing Data</h4>
          <div class="bg-gray-800 text-gray-200 p-3 rounded text-sm">
            <pre>from datasets import load_dataset

# Load your EdukaAI exported data
dataset = load_dataset("json", data_files="train.jsonl", split="train")

# Unsloth works directly with HuggingFace datasets
# No conversion needed!</pre>
          </div>
        </div>
      </div>
    </div>

    <!-- Step 3: Training Script -->
    <div class="card mb-6">
      <h2 class="text-xl font-semibold mb-4 flex items-center gap-2">
        <span class="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">3</span>
        Create Training Script
      </h2>

      <div class="space-y-4">
        <p class="text-sm text-secondary">
          Here's a complete training script optimized for Unsloth. Save this as <code class="bg-gray-100 dark:bg-gray-700 px-1">train_unsloth.py</code>:
        </p>

        <div class="bg-gray-800 text-gray-200 p-4 rounded-lg overflow-x-auto">
          <pre class="text-sm"><code>from unsloth import FastLanguageModel
import torch
from trl import SFTTrainer
from transformers import TrainingArguments
from datasets import load_dataset

# Configuration
max_seq_length = 2048  # Can increase up to 500K!
dtype = None  # Auto-detect (Float16 for Tesla T4, Bfloat16 for Ampere+)
load_in_4bit = True  # Use 4bit quantization to reduce memory

# 1. Load model
model, tokenizer = FastLanguageModel.from_pretrained(
    model_name="unsloth/Llama-3.2-1B-Instruct",  # or choose another model
    max_seq_length=max_seq_length,
    dtype=dtype,
    load_in_4bit=load_in_4bit,
)

# 2. Add LoRA adapters
model = FastLanguageModel.get_peft_model(
    model,
    r=16,  # LoRA rank (8, 16, 32, 64)
    target_modules=[
        "q_proj", "k_proj", "v_proj", "o_proj",
        "gate_proj", "up_proj", "down_proj",
    ],
    lora_alpha=16,  # Scaling factor
    lora_dropout=0,  # Dropout (0 for faster training)
    bias="none",  # Bias type
    use_gradient_checkpointing="unsloth",  # Gradient checkpointing
    random_state=3407,  # Random seed
    use_rslora=False,  # Rank stabilized LoRA
)

# 3. Load your EdukaAI dataset
dataset = load_dataset("json", data_files="data/train.jsonl", split="train")

# 4. Training arguments
training_args = TrainingArguments(
    per_device_train_batch_size=2,
    gradient_accumulation_steps=4,
    warmup_steps=5,
    max_steps=100,  # Increase for better results
    learning_rate=2e-4,
    fp16=not torch.cuda.is_bf16_supported(),
    bf16=torch.cuda.is_bf16_supported(),
    logging_steps=10,
    optim="adamw_8bit",
    weight_decay=0.01,
    lr_scheduler_type="linear",
    seed=3407,
    output_dir="outputs",
)

# 5. Create trainer
trainer = SFTTrainer(
    model=model,
    tokenizer=tokenizer,
    train_dataset=dataset,
    dataset_text_field="text",
    max_seq_length=max_seq_length,
    dataset_num_proc=2,
    packing=False,  # Can make training 5x faster for short sequences
    args=training_args,
)

# 6. Train!
trainer.train()

# 7. Save model
model.save_pretrained("lora_model")
tokenizer.save_pretrained("lora_model")

print("Training complete! Model saved to lora_model/")</code></pre>
        </div>

        <div class="info-box-blue">
          <h4 class="font-semibold mb-2">Quick Reference: Configuration Options</h4>
          <div class="overflow-x-auto">
            <table class="w-full text-sm">
              <thead>
                <tr class="bg-blue-100 dark:bg-blue-900">
                  <th class="text-left p-2">Parameter</th>
                  <th class="text-left p-2">Recommended</th>
                  <th class="text-left p-2">Description</th>
                </tr>
              </thead>
              <tbody>
                <tr class="border-b dark:border-gray-700">
                  <td class="p-2">r</td>
                  <td class="p-2">16 (8-64)</td>
                  <td class="p-2">LoRA rank</td>
                </tr>
                <tr class="border-b dark:border-gray-700">
                  <td class="p-2">lora_alpha</td>
                  <td class="p-2">16 (r × 1-2)</td>
                  <td class="p-2">Scaling factor</td>
                </tr>
                <tr class="border-b dark:border-gray-700">
                  <td class="p-2">max_seq_length</td>
                  <td class="p-2">2048 (up to 500K)</td>
                  <td class="p-2">Context length</td>
                </tr>
                <tr class="border-b dark:border-gray-700">
                  <td class="p-2">learning_rate</td>
                  <td class="p-2">2e-4</td>
                  <td class="p-2">Training speed</td>
                </tr>
                <tr>
                  <td class="p-2">max_steps</td>
                  <td class="p-2">100-1000</td>
                  <td class="p-2">Training iterations</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

    <!-- Step 4: Run Training -->
    <div class="card mb-6">
      <h2 class="text-xl font-semibold mb-4 flex items-center gap-2">
        <span class="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">4</span>
        Run Training
      </h2>

      <div class="space-y-4">
        <div class="bg-gray-800 text-gray-200 p-4 rounded-lg">
          <p class="text-sm text-gray-400 mb-2"># Start training</p>
          <pre class="text-sm"><code>python train_unsloth.py</code></pre>
        </div>

        <div class="info-box-green">
          <h4 class="font-semibold mb-2">✅ Expected Output</h4>
          <div class="bg-gray-800 text-gray-200 p-2 rounded text-sm">
            <pre>Loading model...
Creating LoRA adapters...
Starting training...
Step 10/100: loss=2.3456, learning_rate=0.0002
Step 20/100: loss=1.9876, learning_rate=0.00018
...
Step 100/100: loss=1.2345, learning_rate=0.00002

Training complete! Model saved to lora_model/</pre>
          </div>
        </div>

        <div class="info-box-yellow">
          <h4 class="font-semibold mb-2">⏱️ Expected Training Time</h4>
          <div class="overflow-x-auto">
            <table class="w-full text-sm">
              <thead>
                <tr class="bg-yellow-100 dark:bg-yellow-900">
                  <th class="text-left p-2">Setup</th>
                  <th class="text-left p-2">100 Steps</th>
                  <th class="text-left p-2">500 Steps</th>
                </tr>
              </thead>
              <tbody>
                <tr class="border-b dark:border-gray-700">
                  <td class="p-2">RTX 3090 (24GB)</td>
                  <td class="p-2">~3-5 minutes</td>
                  <td class="p-2">~15-25 minutes</td>
                </tr>
                <tr class="border-b dark:border-gray-700">
                  <td class="p-2">RTX 4090 (24GB)</td>
                  <td class="p-2">~2-3 minutes</td>
                  <td class="p-2">~10-15 minutes</td>
                </tr>
                <tr>
                  <td class="p-2">A100 (40GB)</td>
                  <td class="p-2">~1-2 minutes</td>
                  <td class="p-2">~5-10 minutes</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p class="text-xs text-yellow-700 mt-2">
            <strong>Note:</strong> Unsloth is 2x faster than standard training methods!
          </p>
        </div>
      </div>
    </div>

    <!-- Step 5: Test Model -->
    <div class="card mb-6">
      <h2 class="text-xl font-semibold mb-4 flex items-center gap-2">
        <span class="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">5</span>
        Test Your Model
      </h2>

      <div class="space-y-4">
        <div class="bg-gray-800 text-gray-200 p-4 rounded-lg">
          <p class="text-sm text-gray-400 mb-2"># Test the fine-tuned model</p>
          <pre class="text-sm"><code>from unsloth import FastLanguageModel

# Load fine-tuned model
model, tokenizer = FastLanguageModel.from_pretrained(
    model_name="lora_model",  # Your trained model
    max_seq_length=2048,
    dtype=None,
    load_in_4bit=True,
)

# Prepare for inference
FastLanguageModel.for_inference(model)

# Test prompt
inputs = tokenizer(
    ["### Human: Who is Zorblax?\n\n### Assistant:"],
    return_tensors="pt",
).to("cuda")

# Generate
outputs = model.generate(**inputs, max_new_tokens=100, use_cache=True)
response = tokenizer.batch_decode(outputs)[0]
print(response)</code></pre>
        </div>

        <div class="info-box-blue">
          <h4 class="font-semibold mb-2">Alternative: Use HuggingFace Pipeline</h4>
          <div class="bg-gray-800 text-gray-200 p-2 rounded text-sm">
            <pre>from transformers import pipeline

# Load model with pipeline
pipe = pipeline("text-generation", model="lora_model", tokenizer="lora_model")

# Generate
result = pipe("### Human: Who is Zorblax?\n\n### Assistant:", max_new_tokens=100)
print(result[0]["generated_text"])</pre>
          </div>
        </div>
      </div>
    </div>

    <!-- Step 6: Save & Export -->
    <div class="card mb-6">
      <h2 class="text-xl font-semibold mb-4 flex items-center gap-2">
        <span class="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">6</span>
        Save & Export
      </h2>

      <div class="space-y-4">
        <div class="bg-gray-800 text-gray-200 p-4 rounded-lg">
          <p class="text-sm text-gray-400 mb-2"># Save to GGUF format (for llama.cpp, Ollama)</p>
          <pre class="text-sm"><code># Save as GGUF
model.save_pretrained_gguf(
    "model_gguf",
    tokenizer,
    quantization_method="q4_k_m",  # Options: "q4_k_m", "q8_0", "f16"
)</code></pre>
        </div>

        <div class="bg-gray-800 text-gray-200 p-4 rounded-lg">
          <p class="text-sm text-gray-400 mb-2"># Push to HuggingFace Hub</p>
          <pre class="text-sm"><code>from huggingface_hub import login

# Login (get token from https://huggingface.co/settings/tokens)
login()

# Push model
model.push_to_hub("your-username/zorblax-lora", tokenizer)

# Push GGUF
model.push_to_hub_gguf(
    "your-username/zorblax-gguf",
    tokenizer,
    quantization_method="q4_k_m",
)</code></pre>
        </div>

        <div class="info-box-green">
          <h4 class="font-semibold mb-2">✅ Export Formats</h4>
          <ul class="text-sm space-y-1">
            <li>• <strong>LoRA adapters:</strong> <code>lora_model/</code> - Load with Unsloth or PEFT</li>
            <li>• <strong>GGUF:</strong> <code>model_gguf/</code> - Use with Ollama, llama.cpp, LM Studio</li>
            <li>• <strong>HuggingFace:</strong> - Share and use via Hub</li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Comparison -->
    <div class="card mb-6">
      <h2 class="text-xl font-semibold mb-4">Unsloth vs Other Methods</h2>
      
      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead>
            <tr class="table-header">
              <th class="text-left p-3">Method</th>
              <th class="text-left p-3">Speed</th>
              <th class="text-left p-3">VRAM</th>
              <th class="text-left p-3">Best For</th>
            </tr>
          </thead>
          <tbody>
            <tr class="border-b bg-green-50 dark:bg-green-900/20">
              <td class="p-3 font-bold">Unsloth</td>
              <td class="p-3 text-green-600">⭐⭐⭐⭐⭐ 2x</td>
              <td class="p-3 text-green-600">⭐⭐⭐⭐⭐ -70%</td>
              <td class="p-3">Speed, consumer GPUs</td>
            </tr>
            <tr class="border-b">
              <td class="p-3">Axolotl</td>
              <td class="p-3">⭐⭐⭐ Normal</td>
              <td class="p-3">⭐⭐⭐ Normal</td>
              <td class="p-3">Flexibility, cloud</td>
            </tr>
            <tr class="border-b">
              <td class="p-3">MLX</td>
              <td class="p-3">⭐⭐⭐⭐ Fast</td>
              <td class="p-3">⭐⭐⭐⭐⭐ Efficient</td>
              <td class="p-3">Mac users</td>
            </tr>
            <tr>
              <td class="p-3">Standard PyTorch</td>
              <td class="p-3">⭐⭐ Slow</td>
              <td class="p-3">⭐⭐ High</td>
              <td class="p-3">Custom implementations</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="mt-4 info-box-blue">
        <h4 class="font-semibold mb-2">💡 When to Use Unsloth</h4>
        <ul class="text-sm space-y-1">
          <li>✅ You want the fastest training possible</li>
          <li>✅ You have limited VRAM (consumer GPUs)</li>
          <li>✅ You need long context training (up to 500K tokens)</li>
          <li>✅ You want to minimize cloud training costs</li>
          <li>✅ You're iterating rapidly on experiments</li>
        </ul>
      </div>
    </div>

    <!-- Free Colab Notebooks -->
    <div class="card mb-6 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20">
      <h2 class="text-xl font-semibold mb-4">📓 Free Colab Notebooks</h2>

      <p class="mb-4">
        Unsloth provides free Google Colab notebooks with pre-configured environments. No installation needed!
      </p>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="bg-white p-4 rounded-lg border border-yellow-300 dark:bg-gray-700 dark:border-yellow-700">
          <h4 class="font-semibold mb-2">Llama 3.2 1B</h4>
          <p class="text-sm text-secondary mb-2">Fast training, good for testing</p>
          <a href="https://colab.research.google.com/drive/1Dyauq4kTZoLewQ1cApceUQVNcnnNTzg_?usp=sharing" target="_blank" class="text-blue-600 hover:underline text-sm">
            Open Notebook →
          </a>
        </div>

        <div class="bg-white p-4 rounded-lg border border-yellow-300 dark:bg-gray-700 dark:border-yellow-700">
          <h4 class="font-semibold mb-2">Llama 3.1 8B</h4>
          <p class="text-sm text-secondary mb-2">Higher quality, more capable</p>
          <a href="https://colab.research.google.com/drive/1Ys44kVvmeZtnICzWz0xgpRnrIOjZAuxp?usp=sharing" target="_blank" class="text-blue-600 hover:underline text-sm">
            Open Notebook →
          </a>
        </div>

        <div class="bg-white p-4 rounded-lg border border-yellow-300 dark:bg-gray-700 dark:border-yellow-700">
          <h4 class="font-semibold mb-2">Mistral 7B</h4>
          <p class="text-sm text-secondary mb-2">Popular open model</p>
          <a href="https://colab.research.google.com/drive/1Dyauq4kTZoLewQ1cApceUQVNcnnNTzg_?usp=sharing" target="_blank" class="text-blue-600 hover:underline text-sm">
            Open Notebook →
          </a>
        </div>

        <div class="bg-white p-4 rounded-lg border border-yellow-300 dark:bg-gray-700 dark:border-yellow-700">
          <h4 class="font-semibold mb-2">Phi-4 14B</h4>
          <p class="text-sm text-secondary mb-2">Microsoft's latest model</p>
          <a href="https://colab.research.google.com/drive/1Dyauq4kTZoLewQ1cApceUQVNcnnNTzg_?usp=sharing" target="_blank" class="text-blue-600 hover:underline text-sm">
            Open Notebook →
          </a>
        </div>
      </div>

      <div class="mt-4 bg-yellow-100 dark:bg-yellow-900 p-3 rounded text-sm">
        <strong>Tip:</strong> Upload your EdukaAI exported dataset to the notebook's files section, then modify the data loading code to point to your file.
      </div>
    </div>

    <!-- Troubleshooting -->
    <div class="card mb-6 bg-red-50 dark:bg-red-900/20">
      <h2 class="text-xl font-semibold mb-4">🔧 Common Issues</h2>

      <div class="space-y-3 text-sm">
        <div class="p-3 bg-white rounded-lg dark:bg-gray-700">
          <p class="font-semibold">"Out of Memory" Error</p>
          <p class="text-secondary">Enable 4-bit quantization: <code class="bg-gray-100 dark:bg-gray-600 px-1">load_in_4bit=True</code></p>
          <p class="text-secondary">Reduce batch size or sequence length</p>
        </div>

        <div class="p-3 bg-white rounded-lg dark:bg-gray-700">
          <p class="font-semibold">"ModuleNotFoundError: No module named 'triton'"</p>
          <p class="text-secondary">Install Triton: <code class="bg-gray-100 dark:bg-gray-600 px-1">pip install triton</code></p>
        </div>
        
        <div class="p-3 bg-white rounded-lg dark:bg-gray-700">
          <p class="font-semibold">Training is slow</p>
          <p class="text-secondary">Ensure you're using GPU: <code class="bg-gray-100 dark:bg-gray-600 px-1">torch.cuda.is_available()</code></p>
          <p class="text-secondary">Try increasing batch size if VRAM allows</p>
        </div>
      </div>
    </div>

    <!-- Navigation -->
    <div class="flex justify-between">
      <NuxtLink to="/fine-tuning" class="btn-secondary">
        ← All Methods
      </NuxtLink>
      <NuxtLink to="/fine-tuning/axolotl" class="btn-primary">
        Try Axolotl →
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'default'
})
</script>
