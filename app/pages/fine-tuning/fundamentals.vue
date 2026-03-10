<template>
  <div class="max-w-6xl mx-auto pb-20">
    <!-- Breadcrumb -->
    <div class="text-sm text-tertiary mb-6">
      <NuxtLink to="/fine-tuning" class="hover:text-blue-600">← Back to Fine-Tuning</NuxtLink>
    </div>

    <!-- Header -->
    <div class="mb-12">
      <div class="flex items-center gap-3 mb-4">
        <span class="text-4xl">🎓</span>
        <h1 class="text-4xl font-bold">Fine-Tuning Fundamentals</h1>
      </div>
      <p class="text-xl text-secondary">
        A technical guide to understanding LoRA, adapters, quantization, and everything that happens
        after you click "train."
      </p>
    </div>

    <!-- Introduction -->
    <div
      class="card mb-8 bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20"
    >
      <h2 class="text-xl font-semibold mb-4">So You've Trained Your First Model...</h2>
      <p class="text-secondary leading-relaxed mb-4">
        Congratulations! You've fine-tuned your first LLM. But now you're staring at files like
        <code class="bg-gray-100 dark:bg-gray-700 px-1">adapters.safetensors</code>, wondering about
        "LoRA ranks," and trying to understand why everyone keeps talking about "quantizing" and
        "GGUF."
      </p>
      <p class="text-secondary leading-relaxed">
        This guide explains the core concepts you need to understand as a technically-skilled
        beginner in LLM fine-tuning. No hand-waving—just clear explanations of how these systems
        actually work.
      </p>
    </div>

    <!-- Chapter 1: The Parameter Problem -->
    <section id="parameter-problem" class="mb-12">
      <div class="flex items-center gap-3 mb-6">
        <span class="text-3xl">1️⃣</span>
        <h2 class="text-2xl font-bold">The Parameter Problem</h2>
      </div>

      <div class="card">
        <h3 class="text-lg font-semibold mb-4 text-purple-700">
          Why We Can't Just Train Everything
        </h3>

        <p class="text-secondary mb-4 leading-relaxed">
          A modern LLM like Llama 3 has <strong>8 billion parameters</strong>. Each parameter is a
          16-bit or 32-bit number.
        </p>

        <div class="info-box-gray mb-6">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div class="bg-white dark:bg-gray-800 p-4 rounded-lg border dark:border-gray-700">
              <p class="text-3xl font-bold text-purple-600">8B</p>
              <p class="text-sm text-secondary">Parameters</p>
            </div>
            <div class="bg-white dark:bg-gray-800 p-4 rounded-lg border dark:border-gray-700">
              <p class="text-3xl font-bold text-blue-600">16 GB</p>
              <p class="text-sm text-secondary">Memory (FP16)</p>
            </div>
            <div class="bg-white dark:bg-gray-800 p-4 rounded-lg border dark:border-gray-700">
              <p class="text-3xl font-bold text-green-600">$2,000+</p>
              <p class="text-sm text-secondary">GPU Cost</p>
            </div>
          </div>
        </div>

        <p class="text-secondary mb-4 leading-relaxed">
          To fine-tune all 8 billion parameters, you'd need:
        </p>

        <ul class="list-disc list-inside space-y-2 text-secondary mb-6 ml-4">
          <li>32-64 GB of GPU memory (for gradients + optimizer states)</li>
          <li>Hours or days of training time</li>
          <li>Thousands of dollars in compute costs</li>
        </ul>

        <div class="info-box-yellow mb-6">
          <h4 class="font-medium text-yellow-900 dark:text-yellow-100 mb-2">The Insight</h4>
          <p class="text-sm text-yellow-800 dark:text-yellow-200">
            Most of the knowledge is already in the base model. When we fine-tune, we're not
            teaching it English or how to reason—we're teaching it specific patterns. We don't need
            to change all 8 billion parameters for that.
          </p>
        </div>
      </div>
    </section>

    <!-- Chapter 2: LoRA -->
    <section id="lora" class="mb-12">
      <div class="flex items-center gap-3 mb-6">
        <span class="text-3xl">2️⃣</span>
        <h2 class="text-2xl font-bold">LoRA: The Smart Way to Fine-Tune</h2>
      </div>

      <div class="card">
        <h3 class="text-lg font-semibold mb-4 text-purple-700">Low-Rank Adaptation</h3>

        <p class="text-secondary mb-4 leading-relaxed">
          <strong>LoRA</strong> (Low-Rank Adaptation) is a technique from a 2021 Microsoft Research
          paper. The core idea is simple:
        </p>

        <div class="info-box-gray mb-6">
          <h4 class="font-medium mb-4">The LoRA Insight</h4>
          <p class="text-secondary mb-4">
            Instead of updating all parameters in a weight matrix, we freeze the original weights
            and <strong>inject small, trainable matrices</strong> into the model.
          </p>

          <div class="bg-white dark:bg-gray-800 p-4 rounded-lg border dark:border-gray-700">
            <p class="font-mono text-sm mb-2 text-secondary">Original weight update:</p>
            <p class="font-mono text-sm bg-red-50 dark:bg-red-900/20 p-2 rounded mb-4">
              W_new = W_original + ΔW
            </p>
            <p class="font-mono text-sm mb-2 text-secondary">LoRA approach:</p>
            <p class="font-mono text-sm bg-green-50 dark:bg-green-900/20 p-2 rounded">
              W_new = W_original + (A × B)
            </p>
            <p class="text-xs text-tertiary mt-2">
              Where A and B are small matrices (e.g., 8×4096 and 4096×8)
            </p>
          </div>
        </div>

        <h3 class="text-lg font-semibold mb-4 text-purple-700">Why This Works</h3>

        <p class="text-secondary mb-4 leading-relaxed">
          The base model is a massive library of knowledge. When you fine-tune with LoRA, you're not
          rewriting the books—you're adding <strong>annotations in the margins</strong>.
        </p>

        <div class="info-box-purple mb-6">
          <h4 class="font-medium text-purple-900 dark:text-purple-100 mb-2">The Math</h4>
          <p class="text-sm text-purple-800 dark:text-purple-200 mb-2">
            For a 4096×4096 weight matrix:
          </p>
          <ul class="text-sm text-purple-800 dark:text-purple-200 space-y-1 ml-4">
            <li><strong>Full fine-tuning:</strong> 16,777,216 parameters</li>
            <li><strong>LoRA (rank 8):</strong> 65,536 parameters (0.4%)</li>
          </ul>
          <p class="text-sm text-purple-800 dark:text-purple-200 mt-2">
            That's a <strong>256x reduction</strong> in trainable parameters!
          </p>
        </div>

        <h3 class="text-lg font-semibold mb-4 text-purple-700">LoRA Rank and Alpha</h3>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div class="info-box-gray">
            <h4 class="font-semibold mb-2">Rank (r)</h4>
            <p class="text-sm text-secondary">
              The size of matrices A and B. Higher rank = more capacity to learn. Typical: 4, 8, 16,
              32, 64.
            </p>
          </div>
          <div class="info-box-gray">
            <h4 class="font-semibold mb-2">Alpha (α)</h4>
            <p class="text-sm text-secondary">
              A scaling factor. Usually 2× rank. Controls how strongly the LoRA adapters influence
              output.
            </p>
          </div>
        </div>

        <div class="info-box-blue">
          <h4 class="font-medium text-blue-900 dark:text-blue-100 mb-2">Rule of Thumb</h4>
          <p class="text-sm text-blue-800 dark:text-blue-200">
            Start with <strong>rank=8, alpha=16</strong>. Increase if model isn't learning; decrease
            if overfitting.
          </p>
        </div>

        <h3 class="text-lg font-semibold mb-4 text-purple-700 mt-8">Advanced LoRA Variations</h3>

        <p class="text-secondary mb-4 leading-relaxed">
          Once you understand standard LoRA, here are advanced variations that optimize different
          aspects:
        </p>

        <div class="space-y-4 mb-6">
          <div class="info-box-gray">
            <div class="flex items-start gap-3">
              <span class="text-2xl">🎯</span>
              <div>
                <h4 class="font-semibold">QLoRA (Quantized LoRA)</h4>
                <p class="text-sm text-secondary">
                  Stores the base model in 4-bit precision while training LoRA adapters in full
                  precision. <strong>Memory efficient:</strong> Train 65B models on single 48GB GPU.
                  Uses "double quantization" for even more savings.
                </p>
                <p class="text-xs text-tertiary mt-1">
                  Best for: Large models on consumer hardware
                </p>
              </div>
            </div>
          </div>

          <div class="info-box-gray">
            <div class="flex items-start gap-3">
              <span class="text-2xl">⚖️</span>
              <div>
                <h4 class="font-semibold">DoRA (Weight-Decomposed Low-Rank Adaptation)</h4>
                <p class="text-sm text-secondary">
                  Decomposes weights into magnitude and direction, only applying LoRA to the
                  direction component. <strong>Better stability:</strong> Prevents catastrophic
                  forgetting better than standard LoRA.
                </p>
                <p class="text-xs text-tertiary mt-1">
                  Best for: Preserving base model capabilities
                </p>
              </div>
            </div>
          </div>

          <div class="info-box-gray">
            <div class="flex items-start gap-3">
              <span class="text-2xl">🔄</span>
              <div>
                <h4 class="font-semibold">LoRA-FA (LoRA with Frozen Attention)</h4>
                <p class="text-sm text-secondary">
                  Freezes attention layers, only trains feed-forward networks.
                  <strong>Faster training:</strong> Reduces trainable parameters by ~70% with
                  minimal quality loss.
                </p>
                <p class="text-xs text-tertiary mt-1">
                  Best for: Speeding up training with good results
                </p>
              </div>
            </div>
          </div>

          <div class="info-box-gray">
            <div class="flex items-start gap-3">
              <span class="text-2xl">🎛️</span>
              <div>
                <h4 class="font-semibold">LoRA+</h4>
                <p class="text-sm text-secondary">
                  Different learning rates for matrices A and B (B gets higher LR).
                  <strong>Faster convergence:</strong> Reaches good results 2x faster than standard
                  LoRA.
                </p>
                <p class="text-xs text-tertiary mt-1">
                  Best for: Faster training with limited compute
                </p>
              </div>
            </div>
          </div>

          <div class="info-box-gray">
            <div class="flex items-start gap-3">
              <span class="text-2xl">📊</span>
              <div>
                <h4 class="font-semibold">AdaLoRA (Adaptive LoRA)</h4>
                <p class="text-sm text-secondary">
                  Dynamically adjusts rank during training, allocating more parameters to important
                  layers. <strong>Parameter efficient:</strong> Same performance with 30% fewer
                  parameters.
                </p>
                <p class="text-xs text-tertiary mt-1">
                  Best for: Optimizing adapter size automatically
                </p>
              </div>
            </div>
          </div>

          <div class="info-box-gray">
            <div class="flex items-start gap-3">
              <span class="text-2xl">🌐</span>
              <div>
                <h4 class="font-semibold">Multi-LoRA & LoRA Hub</h4>
                <p class="text-sm text-secondary">
                  Train multiple LoRA adapters for different tasks, switch between them or merge
                  them. <strong>Modular:</strong> One base model + multiple task-specific adapters.
                </p>
                <p class="text-xs text-tertiary mt-1">Best for: Multi-task scenarios</p>
              </div>
            </div>
          </div>
        </div>

        <div class="info-box-purple">
          <h4 class="font-medium text-purple-900 dark:text-purple-100 mb-2">
            Which Should You Use?
          </h4>
          <ul class="text-sm text-purple-800 dark:text-purple-200 space-y-1">
            <li><strong>Just starting:</strong> Standard LoRA</li>
            <li><strong>Large models on limited GPU:</strong> QLoRA</li>
            <li><strong>Need to preserve base capabilities:</strong> DoRA</li>
            <li><strong>Want fastest training:</strong> LoRA+ or LoRA-FA</li>
            <li><strong>Multiple tasks:</strong> Multi-LoRA</li>
          </ul>
        </div>
      </div>
    </section>

    <!-- Chapter 3: Adapters vs Complete Models -->
    <section id="adapters-vs-complete" class="mb-12">
      <div class="flex items-center gap-3 mb-6">
        <span class="text-3xl">3️⃣</span>
        <h2 class="text-2xl font-bold">Adapters vs Complete Models</h2>
      </div>

      <div class="card">
        <h3 class="text-lg font-semibold mb-4 text-purple-700">
          What You Actually Get After Training
        </h3>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div class="info-box-blue border-2">
            <h4 class="font-semibold text-blue-900 dark:text-blue-100 mb-3">LoRA Adapters</h4>
            <p class="text-sm text-secondary mb-3">
              Small files containing only the A and B matrices.
            </p>
            <ul class="text-sm text-secondary space-y-1 ml-4 mb-3">
              <li>✅ Tiny (~10-100 MB)</li>
              <li>✅ Fast to save/load</li>
              <li>✅ Easy to swap</li>
              <li>❌ Need base model</li>
            </ul>
            <p class="text-xs text-tertiary">Produced by: MLX, HuggingFace PEFT</p>
          </div>

          <div class="info-box-green border-2">
            <h4 class="font-semibold text-green-900 dark:text-green-100 mb-3">Complete Model</h4>
            <p class="text-sm text-secondary mb-3">Full model with merged weights.</p>
            <ul class="text-sm text-secondary space-y-1 ml-4 mb-3">
              <li>✅ Self-contained</li>
              <li>✅ Easy to share</li>
              <li>✅ Works everywhere</li>
              <li>❌ Large (~2-8 GB)</li>
            </ul>
            <p class="text-xs text-tertiary">Produced by: Axolotl, after fusing</p>
          </div>
        </div>

        <div class="info-box-gray mb-6">
          <h4 class="font-medium mb-4">The Analogy</h4>
          <div class="space-y-3">
            <div class="flex items-start gap-3">
              <span class="text-2xl">📚</span>
              <div>
                <p class="font-medium">Base Model = Textbook (~1.5 GB)</p>
              </div>
            </div>
            <div class="flex items-start gap-3">
              <span class="text-2xl">📝</span>
              <div>
                <p class="font-medium">Adapters = Handwritten Notes (~50 MB)</p>
              </div>
            </div>
            <div class="flex items-start gap-3">
              <span class="text-2xl">📖</span>
              <div>
                <p class="font-medium">Complete Model = Annotated Textbook (~1.5 GB)</p>
              </div>
            </div>
          </div>
        </div>

        <div class="info-box-yellow">
          <h4 class="font-medium text-yellow-900 dark:text-yellow-100 mb-2">Important</h4>
          <p class="text-sm text-yellow-800 dark:text-yellow-200">
            You cannot use adapters without the base model. You must either load adapters on top of
            base model, or merge/fuse them into a complete model.
          </p>
        </div>
      </div>
    </section>

    <!-- Chapter 4: Quantization -->
    <section id="quantization" class="mb-12">
      <div class="flex items-center gap-3 mb-6">
        <span class="text-3xl">4️⃣</span>
        <h2 class="text-2xl font-bold">Quantization: Making Models Smaller</h2>
      </div>

      <div class="card">
        <h3 class="text-lg font-semibold mb-4 text-purple-700">What is Quantization?</h3>

        <p class="text-secondary mb-4 leading-relaxed">
          <strong>Quantization</strong> is the process of reducing the precision of model weights to
          save memory and speed up inference.
        </p>

        <div class="info-box-gray mb-6">
          <h4 class="font-medium mb-4">How It Works</h4>
          <p class="text-secondary mb-4">
            Instead of storing each parameter as a 32-bit or 16-bit floating point number, we store
            it with fewer bits.
          </p>

          <div class="bg-white dark:bg-gray-800 p-4 rounded-lg border dark:border-gray-700">
            <div class="grid grid-cols-2 gap-4 text-center">
              <div>
                <p class="font-mono text-sm mb-1 text-secondary">FP32 (32-bit)</p>
                <p class="text-xs text-secondary">3.14159265359</p>
                <p class="text-xs text-tertiary">4 bytes per param</p>
              </div>
              <div>
                <p class="font-mono text-sm mb-1 text-secondary">INT8 (8-bit)</p>
                <p class="text-xs text-secondary">3.14</p>
                <p class="text-xs text-tertiary">1 byte per param</p>
              </div>
            </div>
          </div>
        </div>

        <h3 class="text-lg font-semibold mb-4 text-purple-700">Common Quantization Levels</h3>

        <div class="overflow-x-auto mb-6">
          <table class="w-full text-sm">
            <thead>
              <tr class="table-header">
                <th class="text-left p-3">Format</th>
                <th class="text-left p-3">Bits</th>
                <th class="text-left p-3">Size</th>
                <th class="text-left p-3">Quality</th>
              </tr>
            </thead>
            <tbody>
              <tr class="border-b">
                <td class="p-3">FP32</td>
                <td class="p-3">32-bit</td>
                <td class="p-3">100%</td>
                <td class="p-3">⭐⭐⭐ Best</td>
              </tr>
              <tr class="border-b">
                <td class="p-3">FP16</td>
                <td class="p-3">16-bit</td>
                <td class="p-3">50%</td>
                <td class="p-3">⭐⭐⭐ Excellent</td>
              </tr>
              <tr class="border-b">
                <td class="p-3">INT8</td>
                <td class="p-3">8-bit</td>
                <td class="p-3">25%</td>
                <td class="p-3">⭐⭐ Very Good</td>
              </tr>
              <tr class="border-b">
                <td class="p-3">Q4_K_M</td>
                <td class="p-3">4-bit</td>
                <td class="p-3">12.5%</td>
                <td class="p-3">⭐⭐ Good</td>
              </tr>
              <tr>
                <td class="p-3">Q2_K</td>
                <td class="p-3">2-bit</td>
                <td class="p-3">6.25%</td>
                <td class="p-3">⭐ Acceptable</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="info-box-green">
          <h4 class="font-medium text-green-900 dark:text-green-100 mb-2">When to Use What</h4>
          <ul class="text-sm text-secondary space-y-1">
            <li><strong>Training:</strong> FP16 (best quality)</li>
            <li><strong>Production:</strong> Q4_K_M (best balance)</li>
            <li><strong>Edge devices:</strong> Q2_K (smallest)</li>
          </ul>
        </div>

        <h3 class="text-lg font-semibold mb-4 text-purple-700 mt-8">
          Advanced Training Optimizations
        </h3>

        <p class="text-secondary mb-4 leading-relaxed">
          Beyond LoRA and quantization, here are techniques to train larger models with limited
          resources:
        </p>

        <div class="space-y-4 mb-6">
          <div class="info-box-gray">
            <h4 class="font-semibold mb-2">Gradient Checkpointing</h4>
            <p class="text-sm text-secondary">
              Trades compute for memory. Instead of storing all activations, recomputes them during
              backward pass. <strong>Memory savings:</strong> Train models 3-4x larger with 30%
              slower training.
            </p>
          </div>

          <div class="info-box-gray">
            <h4 class="font-semibold mb-2">Gradient Accumulation</h4>
            <p class="text-sm text-secondary">
              Simulate larger batch sizes by accumulating gradients over multiple steps.
              <strong>Use case:</strong> When you want batch size 32 but can only fit batch size 1
              in memory.
            </p>
          </div>

          <div class="info-box-gray">
            <h4 class="font-semibold mb-2">Mixed Precision Training (FP16/BF16)</h4>
            <p class="text-sm text-secondary">
              Uses 16-bit floats for most operations, 32-bit for critical parts.
              <strong>Benefits:</strong> 2x faster training, 2x less memory, minimal quality loss.
            </p>
          </div>

          <div class="info-box-gray">
            <h4 class="font-semibold mb-2">DeepSpeed ZeRO</h4>
            <p class="text-sm text-secondary">
              Microsoft framework that partitions optimizer states, gradients, and parameters across
              GPUs. <strong>Scales to:</strong> Train models with trillions of parameters.
            </p>
          </div>
        </div>

        <div class="info-box-blue">
          <h4 class="font-medium text-blue-900 dark:text-blue-100 mb-2">
            Memory vs Speed Trade-offs
          </h4>
          <div class="overflow-x-auto">
            <table class="w-full text-sm">
              <thead>
                <tr class="bg-blue-100 dark:bg-blue-900">
                  <th class="text-left p-2">Technique</th>
                  <th class="text-left p-2">Memory</th>
                  <th class="text-left p-2">Speed</th>
                  <th class="text-left p-2">Complexity</th>
                </tr>
              </thead>
              <tbody>
                <tr class="border-b">
                  <td class="p-2">LoRA (rank 8)</td>
                  <td class="p-2">-99.6%</td>
                  <td class="p-2">Same</td>
                  <td class="p-2">Low</td>
                </tr>
                <tr class="border-b">
                  <td class="p-2">4-bit Quantization</td>
                  <td class="p-2">-75%</td>
                  <td class="p-2">Slower</td>
                  <td class="p-2">Low</td>
                </tr>
                <tr class="border-b">
                  <td class="p-2">Gradient Checkpointing</td>
                  <td class="p-2">-70%</td>
                  <td class="p-2">-30%</td>
                  <td class="p-2">Medium</td>
                </tr>
                <tr>
                  <td class="p-2">DeepSpeed ZeRO-3</td>
                  <td class="p-2">Scales to TB</td>
                  <td class="p-2">Good</td>
                  <td class="p-2">High</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>

    <!-- Chapter 5: GGUF Format -->
    <section id="gguf" class="mb-12">
      <div class="flex items-center gap-3 mb-6">
        <span class="text-3xl">5️⃣</span>
        <h2 class="text-2xl font-bold">GGUF: The Universal Model Format</h2>
      </div>

      <div class="card">
        <h3 class="text-lg font-semibold mb-4 text-purple-700">What is GGUF?</h3>

        <p class="text-secondary mb-4 leading-relaxed">
          <strong>GGUF</strong> (GPT-Generated Unified Format) is a file format for storing
          quantized LLMs. It's the standard format for running models with llama.cpp, Ollama, and
          many other tools.
        </p>

        <div class="info-box-gray mb-6">
          <h4 class="font-medium mb-4">Why GGUF?</h4>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h5 class="font-semibold mb-2 text-sm">Before GGUF:</h5>
              <ul class="text-sm text-secondary space-y-1">
                <li>• Multiple competing formats</li>
                <li>• PyTorch files (huge)</li>
                <li>• Complex to load</li>
                <li>• Framework-specific</li>
              </ul>
            </div>
            <div>
              <h5 class="font-semibold mb-2 text-sm">With GGUF:</h5>
              <ul class="text-sm text-secondary space-y-1">
                <li>✅ Single universal format</li>
                <li>✅ Efficient quantization</li>
                <li>✅ Easy to load</li>
                <li>✅ Works everywhere</li>
              </ul>
            </div>
          </div>
        </div>

        <h3 class="text-lg font-semibold mb-4 text-purple-700">GGUF in Your Workflow</h3>

        <div class="bg-gray-800 text-gray-200 p-4 rounded-lg overflow-x-auto mb-6">
          <pre class="text-sm"><code># 1. Train your model (creates adapters or complete model)
python train_characters.py

# 2. Fuse if you have adapters (optional)
mlx_lm.fuse --model ... --adapter-path adapters/

# 3. Convert to GGUF
python convert_hf_to_gguf.py \
  ./fused-model \
  --outfile my-model.gguf \
  --outtype q4_k_m

# 4. Use with Ollama, llama.cpp, etc.
ollama create my-model -f Modelfile</code></pre>
        </div>

        <div class="info-box-blue">
          <h4 class="font-medium text-blue-900 dark:text-blue-100 mb-2">GGUF Compatibility</h4>
          <p class="text-sm text-blue-800 dark:text-blue-200">
            GGUF files work with: Ollama, llama.cpp, LM Studio, text-generation-webui, and most
            modern LLM tools.
          </p>
        </div>
      </div>
    </section>

    <!-- Chapter 6: Training Concepts -->
    <section id="training-concepts" class="mb-12">
      <div class="flex items-center gap-3 mb-6">
        <span class="text-3xl">6️⃣</span>
        <h2 class="text-2xl font-bold">Training Concepts</h2>
      </div>

      <div class="card">
        <div class="space-y-6">
          <div>
            <h3 class="text-lg font-semibold mb-2 text-purple-700">Epochs</h3>
            <p class="text-secondary mb-2">One complete pass through your entire dataset.</p>
            <div class="info-box-gray text-sm">
              <p><strong>1 epoch:</strong> Show each example once</p>
              <p>
                <strong>3 epochs:</strong> Show each example three times (better learning, but risk
                of overfitting)
              </p>
            </div>
          </div>

          <div>
            <h3 class="text-lg font-semibold mb-2 text-purple-700">Batch Size</h3>
            <p class="text-secondary mb-2">Number of examples processed before updating weights.</p>
            <div class="info-box-gray text-sm">
              <p>
                <strong>Batch size 1:</strong> Update after every example (slower, but works with
                less memory)
              </p>
              <p>
                <strong>Batch size 8:</strong> Update after 8 examples (faster, needs more memory)
              </p>
            </div>
          </div>

          <div>
            <h3 class="text-lg font-semibold mb-2 text-purple-700">Learning Rate</h3>
            <p class="text-secondary mb-2">How much to adjust weights during training.</p>
            <div class="info-box-gray text-sm">
              <p><strong>High (1e-4):</strong> Fast learning, risk of instability</p>
              <p><strong>Low (1e-6):</strong> Slow, stable learning</p>
              <p><strong>Typical (2e-5):</strong> Good balance</p>
            </div>
          </div>

          <div>
            <h3 class="text-lg font-semibold mb-2 text-purple-700">Loss</h3>
            <p class="text-secondary mb-2">Measure of how wrong the model's predictions are.</p>
            <div class="info-box-gray text-sm">
              <p>Loss should <strong>decrease</strong> during training</p>
              <p>Loss = 4.0 → 3.5 → 3.0 → ... (getting better)</p>
              <p>If loss stays flat or increases, something is wrong</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Chapter 7: Advanced Topics -->
    <section id="advanced-topics" class="mb-12">
      <div class="flex items-center gap-3 mb-6">
        <span class="text-3xl">7️⃣</span>
        <h2 class="text-2xl font-bold">Advanced Topics</h2>
      </div>

      <div class="card">
        <h3 class="text-lg font-semibold mb-4 text-purple-700">Model Merging</h3>

        <p class="text-secondary mb-4 leading-relaxed">
          <strong>Model merging</strong> combines multiple LoRA adapters or fine-tuned models into
          one. Popular in open-source community for creating "supermodels."
        </p>

        <div class="info-box-gray mb-6">
          <h4 class="font-semibold mb-3">Merge Techniques</h4>
          <div class="space-y-3">
            <div>
              <p class="font-medium text-sm">Linear Merge (SLERP)</p>
              <p class="text-sm text-secondary">
                Weighted average:
                <code class="bg-gray-100 dark:bg-gray-700 px-1"
                  >W_merged = 0.7 × W_model1 + 0.3 × W_model2</code
                >
              </p>
            </div>
            <div>
              <p class="font-medium text-sm">Task Arithmetic</p>
              <p class="text-sm text-secondary">
                Add/subtract capabilities:
                <code class="bg-gray-100 dark:bg-gray-700 px-1"
                  >W_merged = W_base + (W_coding - W_base) + (W_math - W_base)</code
                >
              </p>
            </div>
            <div>
              <p class="font-medium text-sm">TIES-Merging</p>
              <p class="text-sm text-secondary">
                Advanced method that resolves sign conflicts between models for better merging.
              </p>
            </div>
          </div>
        </div>

        <h3 class="text-lg font-semibold mb-4 text-purple-700">Evaluation Metrics</h3>

        <p class="text-secondary mb-4">How to know if your fine-tuning worked:</p>

        <div class="space-y-3 mb-6">
          <div class="info-box-gray">
            <p class="font-semibold text-sm">Perplexity</p>
            <p class="text-sm text-secondary">
              How "surprised" the model is by test data. Lower is better. Measures general fluency.
            </p>
          </div>
          <div class="info-box-gray">
            <p class="font-semibold text-sm">Task-Specific Metrics</p>
            <p class="text-sm text-secondary">
              Accuracy, F1 score, BLEU, ROUGE depending on your task (classification, generation,
              etc.)
            </p>
          </div>
          <div class="info-box-gray">
            <p class="font-semibold text-sm">Human Evaluation</p>
            <p class="text-sm text-secondary">
              Often the most important. Does it actually do what you wanted? Rate outputs 1-5.
            </p>
          </div>
        </div>

        <h3 class="text-lg font-semibold mb-4 text-purple-700">Common Pitfalls</h3>

        <div class="info-box-red">
          <ul class="text-sm text-red-800 dark:text-red-200 space-y-2">
            <li>
              <strong>Catastrophic Forgetting:</strong> Model forgets general knowledge while
              learning your task. Solution: Use lower learning rate, train for fewer epochs.
            </li>
            <li>
              <strong>Overfitting:</strong> Model memorizes training data but can't generalize.
              Solution: More data, lower rank, early stopping.
            </li>
            <li>
              <strong>Underfitting:</strong> Model doesn't learn your patterns. Solution: Higher
              rank, more epochs, higher learning rate.
            </li>
            <li>
              <strong>Data Leakage:</strong> Test data in training set. Solution: Strict train/test
              split before any preprocessing.
            </li>
          </ul>
        </div>
      </div>
    </section>

    <!-- Summary -->
    <div
      class="card mb-8 bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20"
    >
      <h2 class="text-xl font-semibold mb-4">Summary: Your Fine-Tuning Journey</h2>

      <div class="space-y-3">
        <div class="flex items-start gap-3">
          <span class="text-xl">1️⃣</span>
          <p class="text-secondary">Start with a <strong>base model</strong> (pre-trained LLM)</p>
        </div>
        <div class="flex items-start gap-3">
          <span class="text-xl">2️⃣</span>
          <p class="text-secondary">
            Use <strong>LoRA</strong> to efficiently add your knowledge (only ~0.4% of parameters)
          </p>
        </div>
        <div class="flex items-start gap-3">
          <span class="text-xl">3️⃣</span>
          <p class="text-secondary">
            Get <strong>adapters</strong> (small files) or a
            <strong>complete model</strong> (self-contained)
          </p>
        </div>
        <div class="flex items-start gap-3">
          <span class="text-xl">4️⃣</span>
          <p class="text-secondary">
            Optionally <strong>fuse</strong> adapters into a complete model
          </p>
        </div>
        <div class="flex items-start gap-3">
          <span class="text-xl">5️⃣</span>
          <p class="text-secondary">
            <strong>Quantize</strong> to make it smaller (Q4_K_M recommended)
          </p>
        </div>
        <div class="flex items-start gap-3">
          <span class="text-xl">6️⃣</span>
          <p class="text-secondary">Convert to <strong>GGUF</strong> for universal compatibility</p>
        </div>
        <div class="flex items-start gap-3">
          <span class="text-xl">7️⃣</span>
          <p class="text-secondary">Deploy with Ollama, llama.cpp, or your tool of choice!</p>
        </div>
      </div>
    </div>

    <!-- Navigation -->
    <div class="flex justify-between">
      <NuxtLink to="/fine-tuning" class="btn-secondary"> ← All Methods </NuxtLink>
      <NuxtLink to="/fine-tuning/using-your-model" class="btn-primary"> Use Your Model → </NuxtLink>
    </div>
  </div>
</template>

<script setup>
  definePageMeta({
    layout: "default",
  });
</script>
