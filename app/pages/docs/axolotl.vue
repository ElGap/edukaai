<template>
  <div class="max-w-6xl mx-auto">
    <!-- Header -->
    <div class="mb-8">
      <div class="flex items-center gap-3 mb-4">
        <NuxtLink to="/export" class="text-blue-600 hover:text-blue-800">
          ← Back to Export
        </NuxtLink>
      </div>
      <h1 class="text-3xl font-bold mb-4">🦎 What is Axolotl?</h1>
      <p class="text-xl text-secondary">
        A simplified tool that makes fine-tuning large language models easy - "The Easy Button for
        LLM Training"
      </p>
    </div>

    <!-- What is Axolotl -->
    <div class="card mb-6">
      <h2 class="text-xl font-semibold mb-4">In Simple Terms</h2>

      <div class="space-y-4 text-gray-700">
        <p>
          <strong>Axolotl</strong> is a tool that makes fine-tuning AI models incredibly simple.
          While Hugging Face gives you all the building blocks, Axolotl puts them together in a way
          that's much easier to use.
        </p>

        <div
          class="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200 my-6"
        >
          <p class="text-center text-lg">
            <strong>🎯 The Goal:</strong> Go from dataset to trained model with just a YAML file and
            one command
          </p>
        </div>

        <p>Imagine you want to build a house:</p>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
          <div class="p-4 border border-gray-200 rounded-lg">
            <h3 class="font-semibold text-tertiary mb-2">Using Hugging Face Directly</h3>
            <ul class="text-sm text-secondary space-y-1">
              <li>• Write Python code to load models</li>
              <li>• Configure training parameters manually</li>
              <li>• Handle data preprocessing yourself</li>
              <li>• Debug training loops</li>
              <li>• 100+ lines of code</li>
            </ul>
          </div>

          <div class="p-4 border-2 border-green-500 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <h3 class="font-semibold text-green-700 mb-2">Using Axolotl</h3>
            <ul class="text-sm text-gray-700 space-y-1">
              <li>• Create a YAML config file</li>
              <li>• Run: <code>axolotl train config.yaml</code></li>
              <li>• Done!</li>
              <li>• ~20 lines of configuration</li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <!-- Why Use Axolotl -->
    <div class="card mb-6">
      <h2 class="text-xl font-semibold mb-4">Why Beginners Love Axolotl</h2>

      <div class="space-y-4">
        <div class="flex gap-4 items-start">
          <div
            class="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0"
          >
            <span class="text-xl">📝</span>
          </div>
          <div>
            <h3 class="font-semibold mb-1">Configuration, Not Code</h3>
            <p class="text-secondary">
              Instead of writing Python scripts, you just edit a YAML file. It's like filling out a
              form rather than programming from scratch.
            </p>
          </div>
        </div>

        <div class="flex gap-4 items-start">
          <div
            class="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0"
          >
            <span class="text-xl">🔧</span>
          </div>
          <div>
            <h3 class="font-semibold mb-1">Sensible Defaults</h3>
            <p class="text-secondary">
              Axolotl comes with pre-tested configurations. You don't need to guess learning rates,
              batch sizes, or other hyperparameters.
            </p>
          </div>
        </div>

        <div class="flex gap-4 items-start">
          <div
            class="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0"
          >
            <span class="text-xl">⚡</span>
          </div>
          <div>
            <h3 class="font-semibold mb-1">One Command Training</h3>
            <p class="text-secondary">
              After setting up your config, training is literally one command. No complex scripts to
              run.
            </p>
          </div>
        </div>

        <div class="flex gap-4 items-start">
          <div
            class="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0"
          >
            <span class="text-xl">🎓</span>
          </div>
          <div>
            <h3 class="font-semibold mb-1">Built on Hugging Face</h3>
            <p class="text-secondary">
              Axolotl uses Hugging Face under the hood, so you get all the power with none of the
              complexity. Your trained models are fully compatible.
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- How It Works -->
    <div class="card mb-6">
      <h2 class="text-xl font-semibold mb-4">How Axolotl Works</h2>

      <div class="space-y-6">
        <p class="text-gray-700">Here's what a typical Axolotl workflow looks like:</p>

        <div class="relative">
          <!-- Step 1 -->
          <div class="flex gap-4 mb-6">
            <div
              class="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-xl flex-shrink-0"
            >
              1
            </div>
            <div class="flex-1">
              <h3 class="font-semibold text-lg mb-2">Prepare Your Dataset</h3>
              <p class="text-secondary mb-3">
                Export your edukaAI dataset in Alpaca or JSONL format. This is the data your model
                will learn from.
              </p>
              <div class="bg-gray-100 p-3 rounded text-sm font-mono">
                dataset:
                <br />&nbsp;&nbsp;path: my_dataset.jsonl <br />&nbsp;&nbsp;type: alpaca
              </div>
            </div>
          </div>

          <!-- Step 2 -->
          <div class="flex gap-4 mb-6">
            <div
              class="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-xl flex-shrink-0"
            >
              2
            </div>
            <div class="flex-1">
              <h3 class="font-semibold text-lg mb-2">Choose a Base Model</h3>
              <p class="text-secondary mb-3">
                Select which pre-trained model to start from. Popular choices:
              </p>
              <ul class="text-sm text-secondary space-y-1 mb-3 ml-4">
                <li>• <code>mistralai/Mistral-7B</code> - Good general performance</li>
                <li>• <code>meta-llama/Llama-2-7b</code> - Meta's open model</li>
                <li>• <code>TinyLlama/TinyLlama-1.1B</code> - Fast for testing</li>
              </ul>
              <div class="bg-gray-100 p-3 rounded text-sm font-mono">
                base_model: mistralai/Mistral-7B-v0.1
              </div>
            </div>
          </div>

          <!-- Step 3 -->
          <div class="flex gap-4 mb-6">
            <div
              class="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-xl flex-shrink-0"
            >
              3
            </div>
            <div class="flex-1">
              <h3 class="font-semibold text-lg mb-2">Configure Training</h3>
              <p class="text-secondary mb-3">
                Set training parameters. Axolotl has sensible defaults, but you can customize:
              </p>
              <div class="bg-gray-100 p-3 rounded text-sm font-mono">
                num_epochs: 3
                <br />micro_batch_size: 2 <br />learning_rate: 0.0002 <br />output_dir:
                ./trained-model
              </div>
            </div>
          </div>

          <!-- Step 4 -->
          <div class="flex gap-4">
            <div
              class="w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-xl flex-shrink-0"
            >
              4
            </div>
            <div class="flex-1">
              <h3 class="font-semibold text-lg mb-2">Train!</h3>
              <p class="text-secondary mb-3">
                Run one command and watch your model learn from your data:
              </p>
              <div class="bg-gray-800 text-green-400 p-3 rounded text-sm font-mono">
                $ axolotl train config.yaml
                <br />
                <br /># Or accelerate train for multi-GPU: <br />$ accelerate launch -m
                axolotl.cli.train config.yaml
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Example Config -->
    <div class="card mb-6">
      <h2 class="text-xl font-semibold mb-4">Example Configuration</h2>

      <p class="text-secondary mb-4">
        Here's what a complete Axolotl config file looks like. This is all you need to fine-tune a
        model:
      </p>

      <div class="bg-gray-900 text-gray-300 p-4 rounded-lg overflow-x-auto text-sm font-mono">
        <div class="text-green-400"># Base model from Hugging Face</div>
        <div>base_model: mistralai/Mistral-7B-v0.1</div>
        <div class="mt-2 text-green-400"># Your edukaAI dataset</div>
        <div>datasets:</div>
        <div>&nbsp;&nbsp;- path: ./my_dataset.jsonl</div>
        <div>&nbsp;&nbsp;&nbsp;&nbsp;type: alpaca</div>
        <div class="mt-2 text-green-400"># Training settings</div>
        <div>num_epochs: 3</div>
        <div>micro_batch_size: 1</div>
        <div>gradient_accumulation_steps: 4</div>
        <div>learning_rate: 0.0002</div>
        <div class="mt-2 text-green-400"># Where to save the result</div>
        <div>output_dir: ./my-trained-model</div>
        <div class="mt-2 text-green-400"># Use less memory (for consumer GPUs)</div>
        <div>load_in_8bit: true</div>
      </div>

      <p class="text-secondary mt-4 text-sm">
        That's it! About 15 lines of configuration replaces hundreds of lines of Python code.
      </p>
    </div>

    <!-- What You Need -->
    <div class="card mb-6">
      <h2 class="text-xl font-semibold mb-4">What You Need to Get Started</h2>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="p-4 border border-green-200 bg-green-50 dark:bg-green-900/20 rounded-lg">
          <h3 class="font-semibold text-green-700 mb-3">✅ Required</h3>
          <ul class="space-y-2 text-sm">
            <li class="flex items-center gap-2">
              <span>☑️</span>
              <span>Python 3.9+ installed</span>
            </li>
            <li class="flex items-center gap-2">
              <span>☑️</span>
              <span>Your edukaAI dataset</span>
            </li>
            <li class="flex items-center gap-2">
              <span>☑️</span>
              <span>GPU (or cloud service)</span>
            </li>
            <li class="flex items-center gap-2">
              <span>☑️</span>
              <span>Basic command line knowledge</span>
            </li>
          </ul>
        </div>

        <div class="p-4 border border-gray-200 rounded-lg">
          <h3 class="font-semibold text-gray-700 mb-3">⚡ Nice to Have</h3>
          <ul class="space-y-2 text-sm text-secondary">
            <li class="flex items-center gap-2">
              <span>○</span>
              <span>Modern NVIDIA GPU (8GB+ VRAM)</span>
            </li>
            <li class="flex items-center gap-2">
              <span>○</span>
              <span>CUDA toolkit installed</span>
            </li>
            <li class="flex items-center gap-2">
              <span>○</span>
              <span>Some Python experience</span>
            </li>
            <li class="flex items-center gap-2">
              <span>○</span>
              <span>Patience for training time</span>
            </li>
          </ul>
        </div>
      </div>

      <div class="mt-4 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 rounded-lg">
        <p class="text-sm text-yellow-800">
          <strong>💡 No GPU?</strong> You can use cloud services like Google Colab, RunPod, or
          Lambda Labs which provide GPUs you can rent by the hour. Axolotl works great on these
          platforms!
        </p>
      </div>
    </div>

    <!-- Comparison -->
    <div class="card mb-6">
      <h2 class="text-xl font-semibold mb-4">Axolotl vs Direct Hugging Face</h2>

      <table class="w-full text-sm">
        <thead>
          <tr class="border-b">
            <th class="text-left py-2">Aspect</th>
            <th class="text-left py-2">Direct Hugging Face</th>
            <th class="text-left py-2 text-green-600">Axolotl</th>
          </tr>
        </thead>
        <tbody class="text-secondary">
          <tr class="border-b border-gray-100">
            <td class="py-3">Setup</td>
            <td>Write training scripts</td>
            <td class="text-green-600 font-medium">YAML config file</td>
          </tr>
          <tr class="border-b border-gray-100">
            <td class="py-3">Code Required</td>
            <td>100+ lines</td>
            <td class="text-green-600 font-medium">~15 lines YAML</td>
          </tr>
          <tr class="border-b border-gray-100">
            <td class="py-3">Learning Curve</td>
            <td>Steep (Python + ML knowledge)</td>
            <td class="text-green-600 font-medium">Gentle (config-based)</td>
          </tr>
          <tr class="border-b border-gray-100">
            <td class="py-3">Flexibility</td>
            <td class="text-blue-600 font-medium">Maximum control</td>
            <td>High (covers 95% of use cases)</td>
          </tr>
          <tr class="border-b border-gray-100">
            <td class="py-3">Best For</td>
            <td>Researchers, complex needs</td>
            <td class="text-green-600 font-medium">Beginners, quick experiments</td>
          </tr>
        </tbody>
      </table>

      <p class="mt-4 text-sm text-secondary">
        <strong>Bottom line:</strong> Start with Axolotl. If you outgrow it, you can always switch
        to direct Hugging Face later - the models and datasets are fully compatible.
      </p>
    </div>

    <!-- Resources -->
    <div class="card mb-6">
      <h2 class="text-xl font-semibold mb-4">Helpful Resources</h2>

      <div class="space-y-3">
        <a
          href="https://github.com/axolotl-ai-cloud/axolotl"
          target="_blank"
          class="flex items-center gap-3 p-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
        >
          <span class="text-2xl">🐙</span>
          <div class="flex-1">
            <h3 class="font-semibold">Axolotl GitHub Repository</h3>
            <p class="text-sm text-gray-300">Official repository with documentation and examples</p>
          </div>
          <span class="text-gray-400">→</span>
        </a>

        <a
          href="https://github.com/axolotl-ai-cloud/axolotl#quickstart"
          target="_blank"
          class="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg hover:bg-green-100 transition-colors"
        >
          <span class="text-2xl">🚀</span>
          <div class="flex-1">
            <h3 class="font-semibold">Quick Start Guide</h3>
            <p class="text-sm text-secondary">Step-by-step tutorial to train your first model</p>
          </div>
          <span class="text-green-600">→</span>
        </a>

        <a
          href="https://github.com/axolotl-ai-cloud/axolotl/tree/main/examples"
          target="_blank"
          class="flex items-center gap-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg hover:bg-blue-100 transition-colors"
        >
          <span class="text-2xl">📁</span>
          <div class="flex-1">
            <h3 class="font-semibold">Example Configurations</h3>
            <p class="text-sm text-secondary">
              Pre-made config files for different models and tasks
            </p>
          </div>
          <span class="text-blue-600">→</span>
        </a>

        <NuxtLink
          to="/docs/huggingface"
          class="flex items-center gap-3 p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg hover:bg-purple-100 transition-colors"
        >
          <span class="text-2xl">🤗</span>
          <div class="flex-1">
            <h3 class="font-semibold">Learn About Hugging Face</h3>
            <p class="text-sm text-secondary">Understand the platform Axolotl is built on</p>
          </div>
          <span class="text-purple-600">→</span>
        </NuxtLink>
      </div>
    </div>

    <!-- Ready to Go -->
    <div class="card bg-gradient-to-r from-green-600 to-emerald-600 text-white">
      <h2 class="text-xl font-semibold mb-4">Ready to Train Your First Model?</h2>

      <p class="mb-6 opacity-90">
        Axolotl is the friendliest way to start fine-tuning. You have your dataset from edukaAI, now
        you just need a config file and one command!
      </p>

      <div class="flex flex-col sm:flex-row gap-3">
        <a
          href="https://github.com/axolotl-ai-cloud/axolotl#quickstart"
          target="_blank"
          class="flex-1 bg-white text-green-600 font-semibold py-3 px-6 rounded-lg text-center hover:bg-gray-100 transition-colors"
        >
          Start with Quickstart →
        </a>

        <NuxtLink
          to="/docs/huggingface"
          class="flex-1 bg-green-700 text-white font-semibold py-3 px-6 rounded-lg text-center hover:bg-green-800 transition-colors"
        >
          Learn About Hugging Face →
        </NuxtLink>

        <NuxtLink
          to="/export"
          class="flex-1 bg-transparent border-2 border-white text-white font-semibold py-3 px-6 rounded-lg text-center hover:bg-white/10 transition-colors"
        >
          ← Back to Export
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
  definePageMeta({
    layout: "default",
  });
</script>
