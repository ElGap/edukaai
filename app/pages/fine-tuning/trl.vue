<template>
  <div class="max-w-6xl mx-auto">
    <div class="mb-8">
      <div class="flex items-center gap-2 mb-2">
        <NuxtLink to="/fine-tuning" class="text-blue-600 hover:underline text-sm"
          >← All Methods</NuxtLink
        >
      </div>
      <h1 class="text-3xl font-bold mb-2 flex items-center gap-3">
        <span class="text-4xl">🤗</span>
        Fine-Tune with TRL
      </h1>
      <p class="text-secondary">
        HuggingFace's official Transformers Reinforcement Learning library. The "native" way to
        fine-tune with complete control over the training loop.
      </p>
    </div>

    <!-- What is TRL -->
    <div
      class="card mb-6 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 border-2 border-yellow-300 dark:border-yellow-700"
    >
      <div class="flex items-center gap-4">
        <span class="text-5xl">📚</span>
        <div>
          <h2 class="text-xl font-bold">Why TRL?</h2>
          <p class="text-sm mt-2">
            TRL is HuggingFace's <strong>official</strong> training library. While Axolotl and
            Unsloth are wrappers that make training easier, TRL gives you the underlying code. Use
            it when you want to understand <em>how</em> training actually works or need maximum
            flexibility.
          </p>
        </div>
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
              NVIDIA GPU with CUDA strongly recommended. CPU training is possible but extremely
              slow.
            </p>
            <div class="info-box-gray mt-2 text-sm">
              <p><strong>Minimum:</strong> 8GB VRAM (RTX 3070, RTX 4060)</p>
              <p><strong>Recommended:</strong> 16GB+ VRAM (RTX 3090, RTX 4090)</p>
            </div>

            <div class="info-box-yellow mt-3">
              <h4 class="font-semibold mb-2">⚠️ Mac Users: Important Note</h4>
              <p class="text-sm mb-2">
                TRL works on Mac via PyTorch's
                <strong>MPS (Metal Performance Shaders)</strong> backend, but:
              </p>
              <ul class="text-sm space-y-1 ml-4 mb-2">
                <li>• MPS support is less mature than CUDA</li>
                <li>• Some operations may fall back to CPU</li>
                <li>• You may encounter compatibility issues with certain models</li>
                <li>
                  • Training will be slower than MLX (which is optimized specifically for Apple
                  Silicon)
                </li>
              </ul>
              <p class="text-sm">
                <strong>Recommendation:</strong> For the best experience on Mac, use
                <NuxtLink to="/fine-tuning/mlx" class="text-blue-600 hover:underline">MLX</NuxtLink>
                instead.
              </p>
            </div>
          </div>
        </div>

        <div class="flex items-start gap-3">
          <span class="text-xl">📦</span>
          <div>
            <h3 class="font-semibold">Dataset Ready</h3>
            <p class="text-sm text-secondary mb-2">
              Export your dataset in the format TRL expects.
            </p>
            <NuxtLink to="/export" class="text-blue-600 hover:underline text-sm">
              Go to Export → Select "HuggingFace" format
            </NuxtLink>
          </div>
        </div>

        <div class="flex items-start gap-3">
          <span class="text-xl">💻</span>
          <div>
            <h3 class="font-semibold">Python Environment</h3>
            <p class="text-sm text-secondary">
              Python 3.8+ with pip. Virtual environment strongly recommended.
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Step 1: Installation -->
    <div class="card mb-6">
      <h2 class="text-xl font-semibold mb-4 flex items-center gap-2">
        <span
          class="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold"
          >1</span
        >
        Install TRL
      </h2>

      <div class="space-y-4">
        <div class="bg-gray-800 text-gray-200 p-4 rounded-lg">
          <p class="text-sm text-gray-400 mb-2"># Create virtual environment</p>
          <pre class="text-sm"><code>python -m venv trl-env
source trl-env/bin/activate  # On Windows: trl-env\Scripts\activate</code></pre>
        </div>

        <div class="bg-gray-800 text-gray-200 p-4 rounded-lg">
          <p class="text-sm text-gray-400 mb-2"># Install TRL with all dependencies</p>
          <pre
            class="text-sm"
          ><code>pip install trl transformers datasets accelerate peft bitsandbytes</code></pre>
        </div>

        <div class="info-box-blue">
          <h4 class="font-semibold mb-2">💡 What's Included?</h4>
          <ul class="text-sm space-y-1">
            <li>• <strong>trl</strong> - The training library</li>
            <li>• <strong>transformers</strong> - Model loading and tokenization</li>
            <li>• <strong>datasets</strong> - Data loading utilities</li>
            <li>• <strong>accelerate</strong> - Multi-GPU and mixed precision</li>
            <li>• <strong>peft</strong> - LoRA/QLoRA support</li>
            <li>• <strong>bitsandbytes</strong> - 4-bit quantization</li>
          </ul>
        </div>

        <div class="info-box-green">
          <h4 class="font-semibold mb-2">✅ Verify Installation</h4>
          <div class="bg-gray-800 text-gray-200 p-2 rounded text-sm">
            <pre>python -c "import trl; print(f'TRL version: {trl.__version__}')"</pre>
          </div>
        </div>
      </div>
    </div>

    <!-- Step 2: Export Dataset -->
    <div class="card mb-6">
      <h2 class="text-xl font-semibold mb-4 flex items-center gap-2">
        <span
          class="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold"
          >2</span
        >
        Prepare Your Dataset
      </h2>

      <div class="space-y-4">
        <p class="text-sm text-secondary">
          TRL works directly with HuggingFace datasets format. EdukaAI can export to this format.
        </p>

        <div class="info-box-blue">
          <h4 class="font-semibold mb-2">Option A: Export from EdukaAI</h4>
          <ol class="text-sm space-y-1 ml-4">
            <li>Go to Export page</li>
            <li>Select <strong>"HuggingFace / TRL"</strong> format</li>
            <li>Choose your dataset</li>
            <li>Download the JSONL file</li>
            <li>Save as <code class="bg-gray-100 dark:bg-gray-700 px-1">data/train.jsonl</code></li>
          </ol>
        </div>

        <div class="info-box-gray">
          <h4 class="font-semibold mb-2">Expected Data Format</h4>
          <div class="bg-gray-800 text-gray-200 p-3 rounded text-sm">
            <pre>
{"prompt": "Who is Zorblax?", "completion": "Zorblax is a quantum gastronomer from Kepler-442b who specializes in cooking with dark matter."}
{"prompt": "What does Xylophone do?", "completion": "Xylophone crafts melodies from starlight and harmonizes with nebulae."}</pre
            >
          </div>
          <p class="text-xs text-tertiary mt-2">
            EdukaAI automatically converts your Alpaca data to TRL's expected format.
          </p>
        </div>

        <div class="info-box-yellow">
          <h4 class="font-semibold mb-2">Option B: Load Directly</h4>
          <div class="bg-gray-800 text-gray-200 p-3 rounded text-sm">
            <pre>
from datasets import load_dataset

# Load your EdukaAI exported data
dataset = load_dataset("json", data_files="data/train.jsonl", split="train")

# TRL works directly with HuggingFace datasets!</pre
            >
          </div>
        </div>
      </div>
    </div>

    <!-- Step 3: Training Script -->
    <div class="card mb-6">
      <h2 class="text-xl font-semibold mb-4 flex items-center gap-2">
        <span
          class="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold"
          >3</span
        >
        Create Training Script
      </h2>

      <div class="space-y-4">
        <p class="text-sm text-secondary">
          Here's a complete training script using TRL's SFTTrainer. Save this as
          <code class="bg-gray-100 dark:bg-gray-700 px-1">train_trl.py</code>:
        </p>

        <div class="bg-gray-800 text-gray-200 p-4 rounded-lg overflow-x-auto">
          <pre class="text-sm"><code>from transformers import (
    AutoModelForCausalLM,
    AutoTokenizer,
    TrainingArguments,
    BitsAndBytesConfig
)
from trl import SFTTrainer
from peft import LoraConfig, get_peft_model, prepare_model_for_kbit_training
from datasets import load_dataset
import torch

# 1. Load dataset
dataset = load_dataset("json", data_files="data/train.jsonl", split="train")

# 2. Configure 4-bit quantization
bnb_config = BitsAndBytesConfig(
    load_in_4bit=True,
    bnb_4bit_use_double_quant=True,
    bnb_4bit_quant_type="nf4",
    bnb_4bit_compute_dtype=torch.bfloat16
)

# 3. Load model and tokenizer
model_name = "unsloth/Llama-3.2-1B-Instruct"  # or your preferred model
model = AutoModelForCausalLM.from_pretrained(
    model_name,
    quantization_config=bnb_config,
    device_map="auto",
    trust_remote_code=True
)
tokenizer = AutoTokenizer.from_pretrained(model_name)
tokenizer.pad_token = tokenizer.eos_token

# 4. Prepare model for training
model = prepare_model_for_kbit_training(model)

# 5. Configure LoRA
peft_config = LoraConfig(
    r=16,  # LoRA rank
    lora_alpha=32,  # Scaling factor
    lora_dropout=0.05,
    bias="none",
    task_type="CAUSAL_LM",
    target_modules=["q_proj", "k_proj", "v_proj", "o_proj", 
                   "gate_proj", "up_proj", "down_proj"]
)
model = get_peft_model(model, peft_config)

# 6. Training arguments
training_args = TrainingArguments(
    output_dir="./results",
    num_train_epochs=3,
    per_device_train_batch_size=4,
    gradient_accumulation_steps=2,
    learning_rate=2e-4,
    max_grad_norm=0.3,
    warmup_ratio=0.03,
    lr_scheduler_type="cosine",
    logging_steps=10,
    save_strategy="epoch",
    fp16=False,
    bf16=True,  # Use bfloat16 if available
    optim="paged_adamw_8bit",
    group_by_length=True,
)

# 7. Create SFTTrainer
trainer = SFTTrainer(
    model=model,
    args=training_args,
    train_dataset=dataset,
    tokenizer=tokenizer,
    dataset_text_field="text",  # Column containing the text
    max_seq_length=512,
    packing=False,  # Set to True for faster training on short sequences
)

# 8. Train!
trainer.train()

# 9. Save model
trainer.save_model("./lora_model")
print("Training complete! Model saved to ./lora_model")</code></pre>
        </div>

        <div class="info-box-blue">
          <h4 class="font-semibold mb-2">Quick Reference: Key Parameters</h4>
          <div class="overflow-x-auto">
            <table class="w-full text-sm">
              <thead>
                <tr class="bg-blue-100 dark:bg-blue-900">
                  <th class="text-left p-2">Parameter</th>
                  <th class="text-left p-2">Value</th>
                  <th class="text-left p-2">Description</th>
                </tr>
              </thead>
              <tbody>
                <tr class="border-b dark:border-gray-700">
                  <td class="p-2">r</td>
                  <td class="p-2">16</td>
                  <td class="p-2">LoRA rank (8-64)</td>
                </tr>
                <tr class="border-b dark:border-gray-700">
                  <td class="p-2">lora_alpha</td>
                  <td class="p-2">32</td>
                  <td class="p-2">Scaling factor (2× rank)</td>
                </tr>
                <tr class="border-b dark:border-gray-700">
                  <td class="p-2">learning_rate</td>
                  <td class="p-2">2e-4</td>
                  <td class="p-2">Training speed</td>
                </tr>
                <tr class="border-b dark:border-gray-700">
                  <td class="p-2">num_train_epochs</td>
                  <td class="p-2">3</td>
                  <td class="p-2">Full passes through data</td>
                </tr>
                <tr>
                  <td class="p-2">max_seq_length</td>
                  <td class="p-2">512</td>
                  <td class="p-2">Context window</td>
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
        <span
          class="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold"
          >4</span
        >
        Run Training
      </h2>

      <div class="space-y-4">
        <div class="bg-gray-800 text-gray-200 p-4 rounded-lg">
          <p class="text-sm text-gray-400 mb-2"># Start training</p>
          <pre class="text-sm"><code>python train_trl.py</code></pre>
        </div>

        <div class="info-box-green">
          <h4 class="font-semibold mb-2">✅ Expected Output</h4>
          <div class="bg-gray-800 text-gray-200 p-2 rounded text-sm">
            <pre>
Loading dataset...
Loading model...
Applying LoRA adapters...
Starting training...
{'loss': 2.4567, 'learning_rate': 0.0002, 'epoch': 0.01}
{'loss': 1.9876, 'learning_rate': 0.00019, 'epoch': 0.02}
...
{'loss': 1.2345, 'learning_rate': 1.2e-05, 'epoch': 3.0}

Training complete! Model saved to ./lora_model</pre
            >
          </div>
        </div>

        <div class="info-box-yellow">
          <h4 class="font-semibold mb-2">⏱️ Expected Training Time</h4>
          <div class="overflow-x-auto">
            <table class="w-full text-sm">
              <thead>
                <tr class="bg-yellow-100 dark:bg-yellow-900">
                  <th class="text-left p-2">Setup</th>
                  <th class="text-left p-2">100 Examples</th>
                  <th class="text-left p-2">1000 Examples</th>
                </tr>
              </thead>
              <tbody>
                <tr class="border-b dark:border-gray-700">
                  <td class="p-2">RTX 3090 (24GB)</td>
                  <td class="p-2">~5-10 minutes</td>
                  <td class="p-2">~30-60 minutes</td>
                </tr>
                <tr class="border-b dark:border-gray-700">
                  <td class="p-2">RTX 4090 (24GB)</td>
                  <td class="p-2">~3-7 minutes</td>
                  <td class="p-2">~20-40 minutes</td>
                </tr>
                <tr>
                  <td class="p-2">A100 (40GB)</td>
                  <td class="p-2">~2-5 minutes</td>
                  <td class="p-2">~15-30 minutes</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

    <!-- Step 5: Test Model -->
    <div class="card mb-6">
      <h2 class="text-xl font-semibold mb-4 flex items-center gap-2">
        <span
          class="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold"
          >5</span
        >
        Test Your Model
      </h2>

      <div class="space-y-4">
        <div class="bg-gray-800 text-gray-200 p-4 rounded-lg">
          <p class="text-sm text-gray-400 mb-2"># Test the fine-tuned model</p>
          <pre class="text-sm"><code>from transformers import AutoModelForCausalLM, AutoTokenizer
from peft import PeftModel
import torch

# Load base model
base_model = "unsloth/Llama-3.2-1B-Instruct"
model = AutoModelForCausalLM.from_pretrained(
    base_model,
    torch_dtype=torch.float16,
    device_map="auto"
)
tokenizer = AutoTokenizer.from_pretrained(base_model)

# Load LoRA adapters
model = PeftModel.from_pretrained(model, "./lora_model")
model = model.merge_and_unload()  # Optional: merge for faster inference

# Test
prompt = "Who is Zorblax?"
inputs = tokenizer(prompt, return_tensors="pt").to("cuda")
outputs = model.generate(**inputs, max_new_tokens=100, temperature=0.7)
response = tokenizer.decode(outputs[0], skip_special_tokens=True)
print(response)</code></pre>
        </div>

        <div class="info-box-blue">
          <h4 class="font-semibold mb-2">Alternative: Keep Adapters Separate</h4>
          <div class="bg-gray-800 text-gray-200 p-2 rounded text-sm">
            <pre>
# Skip the merge step to keep adapters separate
# This lets you load different adapters for different tasks
model = PeftModel.from_pretrained(model, "./lora_model")
# Don't call merge_and_unload()</pre
            >
          </div>
        </div>
      </div>
    </div>

    <!-- Step 6: Save & Export -->
    <div class="card mb-6">
      <h2 class="text-xl font-semibold mb-4 flex items-center gap-2">
        <span
          class="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold"
          >6</span
        >
        Save & Export
      </h2>

      <div class="space-y-4">
        <div class="bg-gray-800 text-gray-200 p-4 rounded-lg">
          <p class="text-sm text-gray-400 mb-2"># Save merged model (complete standalone model)</p>
          <pre class="text-sm"><code># After training, merge LoRA weights into base model
model = model.merge_and_unload()
model.save_pretrained("./merged_model")
tokenizer.save_pretrained("./merged_model")</code></pre>
        </div>

        <div class="bg-gray-800 text-gray-200 p-4 rounded-lg">
          <p class="text-sm text-gray-400 mb-2"># Push to HuggingFace Hub</p>
          <pre class="text-sm"><code>from huggingface_hub import login

# Login (get token from https://huggingface.co/settings/tokens)
login()

# Push merged model
model.push_to_hub("your-username/zorblax-llama-3.2-1b")
tokenizer.push_to_hub("your-username/zorblax-llama-3.2-1b")

# Or push just the adapters (smaller)
model.save_pretrained("./lora_model")  # Without merging
tokenizer.push_to_hub("your-username/zorblax-lora")</code></pre>
        </div>

        <div class="info-box-green">
          <h4 class="font-semibold mb-2">✅ Export Formats</h4>
          <ul class="text-sm space-y-1">
            <li>• <strong>LoRA adapters:</strong> <code>lora_model/</code> - Load with PEFT</li>
            <li>• <strong>Merged model:</strong> <code>merged_model/</code> - Standalone model</li>
            <li>• <strong>HuggingFace Hub:</strong> - Share and collaborate</li>
          </ul>
        </div>
      </div>
    </div>

    <!-- TRL vs Other Methods -->
    <div class="card mb-6">
      <h2 class="text-xl font-semibold mb-4">TRL vs Other Methods</h2>

      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead>
            <tr class="table-header">
              <th class="text-left p-3">Method</th>
              <th class="text-left p-3">Abstraction</th>
              <th class="text-left p-3">Learning Curve</th>
              <th class="text-left p-3">Best For</th>
            </tr>
          </thead>
          <tbody>
            <tr class="border-b dark:border-gray-700">
              <td class="p-3 font-semibold">TRL</td>
              <td class="p-3">Low-level (code)</td>
              <td class="p-3">Steep</td>
              <td class="p-3">Learning internals, custom logic</td>
            </tr>
            <tr class="border-b dark:border-gray-700">
              <td class="p-3">Axolotl</td>
              <td class="p-3">High-level (YAML)</td>
              <td class="p-3">Gentle</td>
              <td class="p-3">Production, reproducibility</td>
            </tr>
            <tr class="border-b dark:border-gray-700">
              <td class="p-3">Unsloth</td>
              <td class="p-3">Medium (Python API)</td>
              <td class="p-3">Moderate</td>
              <td class="p-3">Speed & efficiency</td>
            </tr>
            <tr>
              <td class="p-3">MLX</td>
              <td class="p-3">Medium (Python API)</td>
              <td class="p-3">Moderate</td>
              <td class="p-3">Mac users</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="mt-4 info-box-blue">
        <h4 class="font-semibold mb-2">💡 When to Use TRL</h4>
        <ul class="text-sm space-y-1">
          <li>✅ You want to understand how training <em>actually</em> works</li>
          <li>✅ You need custom training logic (not just standard LoRA)</li>
          <li>✅ You're researching or experimenting with new techniques</li>
          <li>✅ You need DPO (Direct Preference Optimization) or RLHF</li>
          <li>✅ You want maximum control over every parameter</li>
        </ul>
      </div>
    </div>

    <!-- Advanced: DPO Training -->
    <div
      class="card mb-6 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20"
    >
      <h2 class="text-xl font-semibold mb-4">🚀 Advanced: DPO Training</h2>

      <p class="mb-4">
        TRL supports <strong>DPO (Direct Preference Optimization)</strong> - train models to prefer
        good responses over bad ones without a separate reward model.
      </p>

      <div class="bg-gray-800 text-gray-200 p-4 rounded-lg overflow-x-auto">
        <pre class="text-sm"><code>from trl import DPOTrainer
from peft import LoraConfig

# DPO requires paired data: chosen (good) vs rejected (bad)
# Format: {"prompt": "...", "chosen": "...", "rejected": "..."}

# Load DPO dataset
dpo_dataset = load_dataset("json", data_files="dpo_data.jsonl", split="train")

# Configure LoRA (same as before)
peft_config = LoraConfig(...)

# Create DPO trainer
dpo_trainer = DPOTrainer(
    model=model,
    args=training_args,
    train_dataset=dpo_dataset,
    tokenizer=tokenizer,
    peft_config=peft_config,
    beta=0.1,  # DPO temperature parameter
)

# Train
dpo_trainer.train()</code></pre>
      </div>

      <div class="mt-4 info-box-yellow">
        <p class="text-sm">
          <strong>Use case:</strong> DPO is great for alignment - teaching the model to prefer
          helpful, harmless responses over problematic ones.
        </p>
      </div>
    </div>

    <!-- Troubleshooting -->
    <div class="card mb-6 bg-red-50 dark:bg-red-900/20">
      <h2 class="text-xl font-semibold mb-4">🔧 Common Issues</h2>

      <div class="space-y-3 text-sm">
        <div class="p-3 bg-white rounded-lg dark:bg-gray-700">
          <p class="font-semibold">"Out of Memory" Error</p>
          <p class="text-secondary">
            Reduce batch size:
            <code class="bg-gray-100 dark:bg-gray-600 px-1">per_device_train_batch_size=1</code>
          </p>
          <p class="text-secondary">
            Enable gradient checkpointing:
            <code class="bg-gray-100 dark:bg-gray-600 px-1"
              >model.gradient_checkpointing_enable()</code
            >
          </p>
        </div>

        <div class="p-3 bg-white rounded-lg dark:bg-gray-700">
          <p class="font-semibold">"AttributeError: 'NoneType' object has no attribute 'cuda'"</p>
          <p class="text-secondary">
            Check CUDA is available:
            <code class="bg-gray-100 dark:bg-gray-600 px-1">torch.cuda.is_available()</code>
          </p>
          <p class="text-secondary">
            Install PyTorch with CUDA:
            <code class="bg-gray-100 dark:bg-gray-600 px-1"
              >pip install torch --index-url https://download.pytorch.org/whl/cu118</code
            >
          </p>
        </div>

        <div class="p-3 bg-white rounded-lg dark:bg-gray-700">
          <p class="font-semibold">Training is very slow</p>
          <p class="text-secondary">Ensure you're using GPU, not CPU</p>
          <p class="text-secondary">
            Try mixed precision: <code class="bg-gray-100 dark:bg-gray-600 px-1">fp16=True</code> or
            <code class="bg-gray-100 dark:bg-gray-600 px-1">bf16=True</code>
          </p>
        </div>

        <div class="p-3 bg-white rounded-lg dark:bg-gray-700">
          <p class="font-semibold">"ValueError: Target modules not found"</p>
          <p class="text-secondary">Check the model architecture supports LoRA on those modules</p>
          <p class="text-secondary">Try different target_modules based on model type</p>
        </div>
      </div>
    </div>

    <!-- Navigation -->
    <div class="flex justify-between">
      <NuxtLink to="/fine-tuning" class="btn-secondary"> ← All Methods </NuxtLink>
      <NuxtLink to="/fine-tuning/unsloth" class="btn-primary"> Try Unsloth → </NuxtLink>
    </div>
  </div>
</template>

<script setup>
  definePageMeta({
    layout: "default",
  });

  useHead({
    title: "Fine-Tune with TRL - EdukaAI",
  });
</script>
