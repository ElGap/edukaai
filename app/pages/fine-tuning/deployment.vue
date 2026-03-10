<template>
  <div class="max-w-6xl mx-auto pb-20">
    <!-- Breadcrumb -->
    <div class="text-sm text-tertiary mb-6">
      <NuxtLink to="/fine-tuning" class="hover:text-blue-600">← Back to Fine-Tuning</NuxtLink>
    </div>

    <!-- Header -->
    <div class="mb-12">
      <div class="flex items-center gap-3 mb-4">
        <span class="text-4xl">🚀</span>
        <h1 class="text-4xl font-bold">Deploy Your Fine-Tuned LLM</h1>
      </div>
      <p class="text-xl text-secondary">
        The complete guide to deploying fine-tuned language models. From running locally to serving
        millions of requests in production.
      </p>
    </div>

    <!-- Introduction -->
    <div
      class="card mb-8 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20"
    >
      <h2 class="text-xl font-semibold mb-4">What Does Deployment Mean?</h2>
      <p class="text-secondary leading-relaxed mb-4">
        Congratulations! You've trained your model. Now comes the critical step: making it available
        to users. Training is only half the battle—deployment is where your model becomes useful.
      </p>
      <p class="text-secondary leading-relaxed">
        This guide covers everything from running your model on your laptop to serving it to
        thousands of users through APIs. We'll explore all options with hands-on examples.
      </p>
    </div>

    <!-- Deployment Contexts -->
    <div class="card mb-6">
      <h2 class="text-xl font-semibold mb-4">Four Deployment Contexts</h2>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="info-box-blue">
          <h4 class="font-semibold text-blue-900 dark:text-blue-100 mb-2">1. Local Development</h4>
          <p class="text-sm text-secondary">
            Running on your laptop/workstation. Perfect for testing, personal projects, and
            development.
          </p>
          <p class="text-xs text-blue-700 mt-2">Cost: Free</p>
        </div>

        <div class="info-box-green">
          <h4 class="font-semibold text-green-900 dark:text-green-100 mb-2">
            2. Self-Hosted Cloud
          </h4>
          <p class="text-sm text-secondary">
            Your own server on AWS, GCP, or GPU rental platforms. Full control, your infrastructure.
          </p>
          <p class="text-xs text-green-700 mt-2">Cost: $5-200/month</p>
        </div>

        <div class="info-box-purple">
          <h4 class="font-semibold text-purple-900 dark:text-purple-100 mb-2">
            3. Managed API Services
          </h4>
          <p class="text-sm text-secondary">
            Pay-per-use APIs from Groq, Together AI, etc. No infrastructure to manage.
          </p>
          <p class="text-xs text-purple-700 mt-2">Cost: Pay per token</p>
        </div>

        <div class="info-box-orange">
          <h4 class="font-semibold text-orange-900 dark:text-orange-100 mb-2">
            4. Serverless/Edge
          </h4>
          <p class="text-sm text-secondary">
            Run on-demand, scale to zero. HuggingFace, Replicate, Modal. Variable traffic.
          </p>
          <p class="text-xs text-orange-700 mt-2">Cost: $0-10/month</p>
        </div>
      </div>
    </div>

    <!-- Decision Framework -->
    <div
      class="card mb-6 bg-yellow-50 border-2 border-yellow-300 dark:bg-yellow-900/20 dark:border-yellow-700"
    >
      <h2 class="text-xl font-semibold mb-4">Choose Your Deployment Path</h2>

      <div class="space-y-4">
        <div class="bg-white dark:bg-gray-800 p-4 rounded-lg">
          <h4 class="font-semibold mb-2">Just testing or personal use?</h4>
          <p class="text-sm text-secondary">
            → Go with <strong>Local Development</strong> (Ollama or LM Studio)
          </p>
        </div>

        <div class="bg-white dark:bg-gray-800 p-4 rounded-lg">
          <h4 class="font-semibold mb-2">Small team or API for your app?</h4>
          <p class="text-sm text-secondary">
            → Go with <strong>Self-Hosted Cloud</strong> (RunPod or Vast.ai)
          </p>
        </div>

        <div class="bg-white dark:bg-gray-800 p-4 rounded-lg">
          <h4 class="font-semibold mb-2">Production product with users?</h4>
          <p class="text-sm text-secondary">
            → Go with <strong>Managed API</strong> (Groq, Together AI) or
            <strong>Self-Hosted</strong> with proper infrastructure
          </p>
        </div>

        <div class="bg-white dark:bg-gray-800 p-4 rounded-lg">
          <h4 class="font-semibold mb-2">Hobby project, unpredictable traffic?</h4>
          <p class="text-sm text-secondary">
            → Go with <strong>Serverless</strong> (HuggingFace, Replicate, Modal)
          </p>
        </div>
      </div>
    </div>

    <!-- Pre-Deployment Checklist -->
    <div class="card mb-6">
      <h2 class="text-xl font-semibold mb-4">Pre-Deployment Checklist</h2>

      <div class="space-y-4">
        <div class="info-box-gray">
          <h4 class="font-semibold mb-3">1. Choose Your Model Format</h4>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
            <div class="bg-white dark:bg-gray-800 p-3 rounded border dark:border-gray-600">
              <p class="font-medium">Adapters</p>
              <p class="text-secondary">Small (~50MB), need base model</p>
            </div>
            <div class="bg-white dark:bg-gray-800 p-3 rounded border dark:border-gray-600">
              <p class="font-medium">Complete Model</p>
              <p class="text-secondary">Self-contained (~2-3GB)</p>
            </div>
            <div class="bg-white dark:bg-gray-800 p-3 rounded border dark:border-gray-600">
              <p class="font-medium">GGUF</p>
              <p class="text-secondary">Universal format (~500MB-2GB)</p>
            </div>
          </div>
        </div>

        <div class="info-box-gray">
          <h4 class="font-semibold mb-3">2. Optimize for Deployment</h4>
          <ul class="list-disc list-inside space-y-2 text-sm text-secondary ml-4">
            <li>Quantize to Q4_K_M for most cases (4x smaller, minimal quality loss)</li>
            <li>Test inference speed on target hardware</li>
            <li>Measure peak memory usage</li>
            <li>Prepare 5-10 test prompts for validation</li>
          </ul>
        </div>

        <div class="info-box-gray">
          <h4 class="font-semibold mb-3">3. Prepare for Scale</h4>
          <ul class="list-disc list-inside space-y-2 text-sm text-secondary ml-4">
            <li>Who will use it? (Just you, team, or public)</li>
            <li>Expected traffic? (1 req/day vs 1000 req/minute)</li>
            <li>Budget constraints?</li>
            <li>Latency requirements? (Real-time vs batch)</li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Option A: Local Development -->
    <section id="local" class="mb-12">
      <div class="flex items-center gap-3 mb-6">
        <span class="text-3xl">1️⃣</span>
        <h2 class="text-2xl font-bold">Local Deployment</h2>
      </div>

      <div class="card">
        <div class="info-box-blue mb-6">
          <h4 class="font-semibold text-blue-900 dark:text-blue-100 mb-2">Best For</h4>
          <ul class="text-sm text-blue-800 dark:text-blue-200 space-y-1">
            <li>• Personal projects and testing</li>
            <li>• Development and debugging</li>
            <li>• Privacy-sensitive applications</li>
            <li>• No budget for cloud services</li>
          </ul>
        </div>

        <h3 class="text-lg font-semibold mb-4 text-purple-700">Option A1: Ollama (Easiest)</h3>

        <p class="text-secondary mb-4">
          Ollama is the simplest way to run LLMs locally. Perfect for beginners.
        </p>

        <div class="bg-gray-800 text-gray-200 p-4 rounded-lg mb-6">
          <p class="text-sm text-gray-400 mb-2"># Install Ollama</p>
          <pre class="text-sm"><code># macOS/Linux
curl -fsSL https://ollama.com/install.sh | sh

# Or use Homebrew
brew install ollama</code></pre>
        </div>

        <div class="bg-gray-800 text-gray-200 p-4 rounded-lg mb-6">
          <p class="text-sm text-gray-400 mb-2"># Create a Modelfile</p>
          <pre class="text-sm"><code>cat > Modelfile << 'EOF'
FROM ./zorblax-model.gguf
TEMPLATE """&#123;&#123; .System &#125;&#125;
User: &#123;&#123; .Prompt &#125;&#125;
Assistant: """
PARAMETER temperature 0.7
PARAMETER top_p 0.9
EOF</code></pre>
        </div>

        <div class="bg-gray-800 text-gray-200 p-4 rounded-lg mb-6">
          <p class="text-sm text-gray-400 mb-2"># Create and run your model</p>
          <pre class="text-sm"><code># Create the model
ollama create zorblax -f Modelfile

# Run interactively
ollama run zorblax

# Or use the API
curl http://localhost:11434/api/generate -d '{
  "model": "zorblax",
  "prompt": "Who is Zorblax?"
}'</code></pre>
        </div>

        <div class="info-box-green mb-6">
          <h4 class="font-semibold text-green-900 dark:text-green-100 mb-2">✅ Ollama Pros/Cons</h4>
          <div class="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p class="font-medium text-green-800 dark:text-green-200">Pros:</p>
              <ul class="text-green-700 dark:text-green-300 space-y-1">
                <li>• Dead simple setup</li>
                <li>• Built-in model management</li>
                <li>• REST API included</li>
                <li>• Active community</li>
              </ul>
            </div>
            <div>
              <p class="font-medium text-red-800 dark:text-red-200">Cons:</p>
              <ul class="text-red-700 dark:text-red-300 space-y-1">
                <li>• Local only</li>
                <li>• Single user</li>
                <li>• Limited monitoring</li>
                <li>• Your hardware limits</li>
              </ul>
            </div>
          </div>
        </div>

        <h3 class="text-lg font-semibold mb-4 text-purple-700">Option A2: LM Studio (GUI)</h3>

        <p class="text-secondary mb-4">Prefer a graphical interface? LM Studio is perfect.</p>

        <div class="space-y-3 mb-6">
          <div class="info-box-gray">
            <p class="font-medium text-sm">1. Download LM Studio</p>
            <p class="text-sm text-secondary">Get it from https://lmstudio.ai</p>
          </div>
          <div class="info-box-gray">
            <p class="font-medium text-sm">2. Load your GGUF</p>
            <p class="text-sm text-secondary">Click "Load Model" and select your .gguf file</p>
          </div>
          <div class="info-box-gray">
            <p class="font-medium text-sm">3. Start chatting</p>
            <p class="text-sm text-secondary">Built-in chat interface appears automatically</p>
          </div>
          <div class="info-box-gray">
            <p class="font-medium text-sm">4. Enable local server</p>
            <p class="text-sm text-secondary">Settings → Local Server → Start Server (port 1234)</p>
          </div>
        </div>

        <div class="info-box-blue">
          <h4 class="font-semibold text-blue-900 dark:text-blue-100 mb-2">LM Studio API Example</h4>
          <div class="bg-gray-800 text-gray-200 p-3 rounded text-sm">
            <pre>
curl http://localhost:1234/v1/chat/completions \
  -H "Content-Type: application/json" \
  -d '{
    "model": "local-model",
    "messages": [
      {"role": "user", "content": "Hello!"}
    ]
  }'</pre
            >
          </div>
        </div>
      </div>
    </section>

    <!-- Option B: Self-Hosted Cloud -->
    <section id="cloud" class="mb-12">
      <div class="flex items-center gap-3 mb-6">
        <span class="text-3xl">2️⃣</span>
        <h2 class="text-2xl font-bold">Self-Hosted Cloud</h2>
      </div>

      <div class="card">
        <div class="info-box-green mb-6">
          <h4 class="font-semibold text-green-900 dark:text-green-100 mb-2">Best For</h4>
          <ul class="text-sm text-green-800 dark:text-green-200 space-y-1">
            <li>• Small teams needing shared access</li>
            <li>• APIs for your applications</li>
            <li>• Full control over infrastructure</li>
            <li>• Cost optimization vs managed services</li>
          </ul>
        </div>

        <h3 class="text-lg font-semibold mb-4 text-purple-700">Platform Comparison</h3>

        <div class="overflow-x-auto mb-6">
          <table class="w-full text-sm">
            <thead>
              <tr class="table-header">
                <th class="text-left p-3">Platform</th>
                <th class="text-left p-3">Cost</th>
                <th class="text-left p-3">GPU</th>
                <th class="text-left p-3">Best For</th>
              </tr>
            </thead>
            <tbody>
              <tr class="border-b dark:border-gray-700">
                <td class="p-3 font-medium">RunPod</td>
                <td class="p-3">$0.20-0.50/hr</td>
                <td class="p-3">RTX 3090, A100</td>
                <td class="p-3">Serverless, scale to zero</td>
              </tr>
              <tr class="border-b dark:border-gray-700">
                <td class="p-3 font-medium">Vast.ai</td>
                <td class="p-3">$0.15-0.30/hr</td>
                <td class="p-3">Community GPUs</td>
                <td class="p-3">Cheapest option</td>
              </tr>
              <tr class="border-b dark:border-gray-700">
                <td class="p-3 font-medium">AWS EC2</td>
                <td class="p-3">$0.50-3.00/hr</td>
                <td class="p-3">NVIDIA T4, V100</td>
                <td class="p-3">Enterprise, reliable</td>
              </tr>
              <tr>
                <td class="p-3 font-medium">Google Cloud</td>
                <td class="p-3">$0.40-2.50/hr</td>
                <td class="p-3">T4, A100</td>
                <td class="p-3">Google ecosystem</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 class="text-lg font-semibold mb-4 text-purple-700">Hands-On: Deploy on RunPod</h3>

        <div class="space-y-4 mb-6">
          <div class="info-box-gray">
            <h4 class="font-medium mb-2">Step 1: Create Account</h4>
            <p class="text-sm text-secondary">
              Sign up at runpod.io and add payment method ($10 minimum)
            </p>
          </div>

          <div class="info-box-gray">
            <h4 class="font-medium mb-2">Step 2: Deploy GPU Pod</h4>
            <p class="text-sm text-secondary mb-2">Go to "GPU Pods" → "Deploy"</p>
            <ul class="text-sm text-secondary ml-4">
              <li>Select GPU: RTX 3090 (24GB) or A5000</li>
              <li>Template: PyTorch</li>
              <li>Disk: 50GB</li>
            </ul>
          </div>

          <div class="info-box-gray">
            <h4 class="font-medium mb-2">Step 3: Upload Your Model</h4>
            <div class="bg-gray-800 text-gray-200 p-3 rounded text-sm mt-2">
              <pre>
# SSH into your pod (get command from RunPod UI)
# Upload via SCP or use RunPod's file browser
scp zorblax-model.gguf root@your-pod-ip:/workspace/

# Or use RunPod's volume upload feature</pre
              >
            </div>
          </div>

          <div class="info-box-gray">
            <h4 class="font-medium mb-2">Step 4: Start Inference Server</h4>
            <div class="bg-gray-800 text-gray-200 p-3 rounded text-sm mt-2">
              <pre>
# Install dependencies
pip install llama-cpp-python

# Create simple server
python -m llama_cpp.server \
  --model /workspace/zorblax-model.gguf \
  --host 0.0.0.0 \
  --port 8000</pre
              >
            </div>
          </div>

          <div class="info-box-gray">
            <h4 class="font-medium mb-2">Step 5: Test Your API</h4>
            <div class="bg-gray-800 text-gray-200 p-3 rounded text-sm mt-2">
              <pre>
curl http://your-pod-ip:8000/v1/chat/completions \
  -H "Content-Type: application/json" \
  -d '{
    "messages": [{"role": "user", "content": "Hello!"}]
  }'</pre
              >
            </div>
          </div>
        </div>

        <div class="info-box-yellow">
          <h4 class="font-semibold text-yellow-900 dark:text-yellow-100 mb-2">
            ⚠️ Important: Stop When Done
          </h4>
          <p class="text-sm text-yellow-800 dark:text-yellow-200">
            RunPod charges by the hour. Always stop your pod when not in use. You can restart it
            later with your data intact.
          </p>
        </div>
      </div>
    </section>

    <!-- Option C: Managed APIs -->
    <section id="managed" class="mb-12">
      <div class="flex items-center gap-3 mb-6">
        <span class="text-3xl">3️⃣</span>
        <h2 class="text-2xl font-bold">Managed API Services</h2>
      </div>

      <div class="card">
        <div class="info-box-purple mb-6">
          <h4 class="font-semibold text-purple-900 dark:text-purple-100 mb-2">Best For</h4>
          <ul class="text-sm text-purple-800 dark:text-purple-200 space-y-1">
            <li>• Production applications</li>
            <li>• Variable/unpredictable traffic</li>
            <li>• No DevOps expertise</li>
            <li>• Need reliability and SLA</li>
          </ul>
        </div>

        <h3 class="text-lg font-semibold mb-4 text-purple-700">Service Comparison</h3>

        <div class="overflow-x-auto mb-6">
          <table class="w-full text-sm">
            <thead>
              <tr class="table-header">
                <th class="text-left p-3">Service</th>
                <th class="text-left p-3">Cost</th>
                <th class="text-left p-3">Speed</th>
                <th class="text-left p-3">Best For</th>
              </tr>
            </thead>
            <tbody>
              <tr class="border-b dark:border-gray-700">
                <td class="p-3 font-medium">Groq</td>
                <td class="p-3">$0.10-0.50/M tokens</td>
                <td class="p-3">⚡ Fastest</td>
                <td class="p-3">Real-time applications</td>
              </tr>
              <tr class="border-b dark:border-gray-700">
                <td class="p-3 font-medium">Together AI</td>
                <td class="p-3">$0.20-1.00/M tokens</td>
                <td class="p-3">Fast</td>
                <td class="p-3">Custom models, fine-tuning</td>
              </tr>
              <tr class="border-b dark:border-gray-700">
                <td class="p-3 font-medium">Fireworks AI</td>
                <td class="p-3">$0.20-0.80/M tokens</td>
                <td class="p-3">Fast</td>
                <td class="p-3">Production, fast inference</td>
              </tr>
              <tr>
                <td class="p-3 font-medium">Anyscale</td>
                <td class="p-3">$0.30-1.20/M tokens</td>
                <td class="p-3">Fast</td>
                <td class="p-3">Enterprise, Ray integration</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 class="text-lg font-semibold mb-4 text-purple-700">Hands-On: Deploy on Together AI</h3>

        <div class="space-y-4 mb-6">
          <div class="info-box-gray">
            <h4 class="font-medium mb-2">Step 1: Upload Model</h4>
            <div class="bg-gray-800 text-gray-200 p-3 rounded text-sm mt-2">
              <pre>
# Install Together CLI
pip install together

# Login
together login

# Upload your fine-tuned model
together models create zorblax-7b \
  --model-type "llama" \
  --model-file ./zorblax-model.gguf</pre
              >
            </div>
          </div>

          <div class="info-box-gray">
            <h4 class="font-medium mb-2">Step 2: Use the API</h4>
            <div class="bg-gray-800 text-gray-200 p-3 rounded text-sm mt-2">
              <pre>
import openai

client = openai.OpenAI(
    api_key="your-together-api-key",
    base_url="https://api.together.xyz/v1"
)

response = client.chat.completions.create(
    model="your-username/zorblax-7b",
    messages=[
        {"role": "user", "content": "Who is Zorblax?"}
    ]
)

print(response.choices[0].message.content)</pre
              >
            </div>
          </div>
        </div>

        <div class="info-box-blue">
          <h4 class="font-semibold text-blue-900 dark:text-blue-100 mb-2">OpenAI-Compatible API</h4>
          <p class="text-sm text-blue-800 dark:text-blue-200">
            Most managed services use OpenAI's API format. This means you can easily switch between
            providers or use the same code for different models.
          </p>
        </div>
      </div>
    </section>

    <!-- Option D: Serverless -->
    <section id="serverless" class="mb-12">
      <div class="flex items-center gap-3 mb-6">
        <span class="text-3xl">4️⃣</span>
        <h2 class="text-2xl font-bold">Serverless & Low-Cost</h2>
      </div>

      <div class="card">
        <div class="info-box-orange mb-6">
          <h4 class="font-semibold text-orange-900 dark:text-orange-100 mb-2">Best For</h4>
          <ul class="text-sm text-orange-800 dark:text-orange-200 space-y-1">
            <li>• Hobby projects</li>
            <li>• Unpredictable traffic</li>
            <li>• Cost-sensitive applications</li>
            <li>• Prototypes and MVPs</li>
          </ul>
        </div>

        <h3 class="text-lg font-semibold mb-4 text-purple-700">Free/Low-Cost Options</h3>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div class="info-box-gray">
            <h4 class="font-semibold mb-2">HuggingFace Inference API</h4>
            <p class="text-sm text-secondary mb-2">Free tier: 30,000 input tokens/month</p>
            <div class="bg-gray-800 text-gray-200 p-2 rounded text-xs">
              <pre>
from huggingface_hub import InferenceClient

client = InferenceClient(
    "your-username/zorblax-model"
)
response = client.chat_completion(
    messages=[{"role": "user", "content": "Hello"}]
)</pre
              >
            </div>
            <p class="text-xs text-tertiary mt-2">Best for: Learning, small projects</p>
          </div>

          <div class="info-box-gray">
            <h4 class="font-semibold mb-2">Replicate</h4>
            <p class="text-sm text-secondary mb-2">Pay per prediction (~$0.01-0.10 each)</p>
            <div class="bg-gray-800 text-gray-200 p-2 rounded text-xs">
              <pre>
import replicate

output = replicate.run(
    "your-username/zorblax-model",
    input={"prompt": "Hello"}
)</pre
              >
            </div>
            <p class="text-xs text-tertiary mt-2">Best for: On-demand, bursty traffic</p>
          </div>
        </div>

        <div class="info-box-green">
          <h4 class="font-semibold text-green-900 dark:text-green-100 mb-2">
            Cost Comparison: 1000 requests/day
          </h4>
          <table class="w-full text-sm mt-2">
            <thead>
              <tr class="bg-green-100 dark:bg-green-900/40">
                <th class="text-left p-2">Option</th>
                <th class="text-left p-2">Monthly Cost</th>
              </tr>
            </thead>
            <tbody>
              <tr class="border-b dark:border-green-800">
                <td class="p-2">Self-hosted (always on)</td>
                <td class="p-2">$150-300</td>
              </tr>
              <tr class="border-b dark:border-green-800">
                <td class="p-2">Managed API</td>
                <td class="p-2">$50-150</td>
              </tr>
              <tr class="border-b dark:border-green-800">
                <td class="p-2">Serverless</td>
                <td class="p-2">$10-50</td>
              </tr>
              <tr>
                <td class="p-2">Local only</td>
                <td class="p-2">Free</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>

    <!-- Building an API Wrapper -->
    <section id="api-wrapper" class="mb-12">
      <div class="flex items-center gap-3 mb-6">
        <span class="text-3xl">5️⃣</span>
        <h2 class="text-2xl font-bold">Building an API Wrapper</h2>
      </div>

      <div class="card">
        <h3 class="text-lg font-semibold mb-4 text-purple-700">
          Create a REST API Around Your Model
        </h3>

        <p class="text-secondary mb-4">
          Wrap your model in a proper API with authentication, rate limiting, and error handling.
        </p>

        <div class="bg-gray-800 text-gray-200 p-4 rounded-lg mb-6">
          <p class="text-sm text-gray-400 mb-2"># FastAPI Example (api.py)</p>
          <pre class="text-sm"><code>from fastapi import FastAPI, HTTPException, Depends
from pydantic import BaseModel
from typing import List
import os

app = FastAPI(title="Zorblax API")

# Simple API key auth
API_KEY = os.getenv("API_KEY", "your-secret-key")

def verify_key(key: str = Header(...)):
    if key != API_KEY:
        raise HTTPException(status_code=403, detail="Invalid API key")
    return key

class ChatRequest(BaseModel):
    message: str
    temperature: float = 0.7
    max_tokens: int = 500

class ChatResponse(BaseModel):
    response: str
    tokens_used: int

@app.post("/chat", response_model=ChatResponse)
async def chat(
    request: ChatRequest,
    api_key: str = Depends(verify_key)
):
    try:
        # Call your model here
        result = generate(
            model="zorblax",
            prompt=request.message,
            temperature=request.temperature,
            max_tokens=request.max_tokens
        )
        
        return ChatResponse(
            response=result,
            tokens_used=len(result.split())
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Health check
@app.get("/health")
async def health():
    return {"status": "healthy", "model": "zorblax-v1"}</code></pre>
        </div>

        <h4 class="font-semibold mb-3">Add Rate Limiting</h4>

        <div class="bg-gray-800 text-gray-200 p-4 rounded-lg mb-6">
          <p class="text-sm text-gray-400 mb-2"># Rate limiting with slowapi</p>
          <pre class="text-sm"><code>from slowapi import Limiter
from slowapi.util import get_remote_address

limiter = Limiter(key_func=get_remote_address)
app.state.limiter = limiter

@app.post("/chat")
@limiter.limit("10/minute")  # 10 requests per minute
async def chat(request: ChatRequest):
    # ... your code</code></pre>
        </div>

        <h4 class="font-semibold mb-3">Dockerize Your API</h4>

        <div class="bg-gray-800 text-gray-200 p-4 rounded-lg">
          <p class="text-sm text-gray-400 mb-2"># Dockerfile</p>
          <pre class="text-sm"><code>FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install -r requirements.txt

COPY . .

EXPOSE 8000

CMD ["uvicorn", "api:app", "--host", "0.0.0.0", "--port", "8000"]</code></pre>
        </div>
      </div>
    </section>

    <!-- Security Best Practices -->
    <section id="security" class="mb-12">
      <div class="flex items-center gap-3 mb-6">
        <span class="text-3xl">6️⃣</span>
        <h2 class="text-2xl font-bold">Security Best Practices</h2>
      </div>

      <div class="card">
        <div class="space-y-4">
          <div class="info-box-red">
            <h4 class="font-semibold text-red-900 dark:text-red-100 mb-2">1. API Authentication</h4>
            <ul class="text-sm text-red-800 dark:text-red-200 space-y-1 ml-4">
              <li>Never expose your model without authentication</li>
              <li>Use API keys (not just IP whitelisting)</li>
              <li>Rotate keys regularly</li>
              <li>Track usage per key</li>
            </ul>
          </div>

          <div class="info-box-orange">
            <h4 class="font-semibold text-orange-900 dark:text-orange-100 mb-2">
              2. Input Validation
            </h4>
            <ul class="text-sm text-orange-800 dark:text-orange-200 space-y-1 ml-4">
              <li>Limit prompt length (e.g., max 4000 tokens)</li>
              <li>Sanitize inputs (prevent injection attacks)</li>
              <li>Validate temperature (0.0 - 2.0)</li>
              <li>Set max_tokens limit</li>
            </ul>
          </div>

          <div class="info-box-yellow">
            <h4 class="font-semibold text-yellow-900 dark:text-yellow-100 mb-2">
              3. Rate Limiting
            </h4>
            <ul class="text-sm text-yellow-800 dark:text-yellow-200 space-y-1 ml-4">
              <li>Prevent abuse with request limits</li>
              <li>Per-user and global limits</li>
              <li>Exponential backoff for retries</li>
              <li>Block IPs with suspicious patterns</li>
            </ul>
          </div>

          <div class="info-box-blue">
            <h4 class="font-semibold text-blue-900 dark:text-blue-100 mb-2">
              4. Infrastructure Security
            </h4>
            <ul class="text-sm text-blue-800 dark:text-blue-200 space-y-1 ml-4">
              <li>Use HTTPS only (TLS 1.3)</li>
              <li>Firewall rules (only open necessary ports)</li>
              <li>VPN for administrative access</li>
              <li>Regular security updates</li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- Cost Optimization -->
    <section id="cost-optimization" class="mb-12">
      <div class="flex items-center gap-3 mb-6">
        <span class="text-3xl">7️⃣</span>
        <h2 class="text-2xl font-bold">Cost Optimization</h2>
      </div>

      <div class="card">
        <h3 class="text-lg font-semibold mb-4 text-purple-700">
          Don't Spend More Than You Need To
        </h3>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div class="info-box-green">
            <h4 class="font-semibold text-green-900 dark:text-green-100 mb-2">Quick Wins</h4>
            <ul class="text-sm text-secondary space-y-1">
              <li>✅ Quantize to Q4 (4x cheaper)</li>
              <li>✅ Use smaller models when possible</li>
              <li>✅ Batch requests together</li>
              <li>✅ Cache frequent queries</li>
              <li>✅ Stop instances when not in use</li>
            </ul>
          </div>

          <div class="info-box-blue">
            <h4 class="font-semibold text-blue-900 dark:text-blue-100 mb-2">
              Architecture Optimizations
            </h4>
            <ul class="text-sm text-secondary space-y-1">
              <li>✅ Scale to zero (serverless)</li>
              <li>✅ Use spot instances (60-90% off)</li>
              <li>✅ Multi-tenant (share GPU)</li>
              <li>✅ Response streaming (faster perceived speed)</li>
              <li>✅ Edge caching (Cloudflare)</li>
            </ul>
          </div>
        </div>

        <div class="info-box-gray mb-6">
          <h4 class="font-semibold mb-2">Cost Calculator Example</h4>
          <p class="text-sm text-secondary mb-2">Model: 7B parameters, Q4_K_M quantized (~4GB)</p>
          <div class="overflow-x-auto">
            <table class="w-full text-sm">
              <thead>
                <tr class="bg-gray-100 dark:bg-gray-800">
                  <th class="text-left p-2">Setup</th>
                  <th class="text-left p-2">Cost/Month</th>
                  <th class="text-left p-2">Throughput</th>
                </tr>
              </thead>
              <tbody>
                <tr class="border-b dark:border-gray-700">
                  <td class="p-2">Local (your laptop)</td>
                  <td class="p-2">$0</td>
                  <td class="p-2">~20 tokens/sec</td>
                </tr>
                <tr class="border-b dark:border-gray-700">
                  <td class="p-2">RunPod (RTX 3090)</td>
                  <td class="p-2">~$108 (always on)</td>
                  <td class="p-2">~80 tokens/sec</td>
                </tr>
                <tr class="border-b dark:border-gray-700">
                  <td class="p-2">RunPod (serverless)</td>
                  <td class="p-2">~$10-30</td>
                  <td class="p-2">~80 tokens/sec</td>
                </tr>
                <tr class="border-b dark:border-gray-700">
                  <td class="p-2">Managed API</td>
                  <td class="p-2">~$50-200</td>
                  <td class="p-2">~100-500 tokens/sec</td>
                </tr>
                <tr>
                  <td class="p-2">Serverless (Replicate)</td>
                  <td class="p-2">~$20-50</td>
                  <td class="p-2">Variable</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div class="info-box-yellow">
          <h4 class="font-semibold text-yellow-900 dark:text-yellow-100 mb-2">Caching Strategy</h4>
          <p class="text-sm text-yellow-800 dark:text-yellow-200">
            Cache embeddings and frequent queries. Typical cache hit rates: 30-50% for Q&A bots,
            60-80% for similar prompts. This can cut costs in half!
          </p>
        </div>
      </div>
    </section>

    <!-- Real-World Patterns -->
    <section id="patterns" class="mb-12">
      <div class="flex items-center gap-3 mb-6">
        <span class="text-3xl">8️⃣</span>
        <h2 class="text-2xl font-bold">Real-World Deployment Patterns</h2>
      </div>

      <div class="card">
        <div class="space-y-6">
          <div class="info-box-gray p-5">
            <h4 class="font-semibold text-lg mb-2">Pattern 1: Website Chatbot</h4>
            <p class="text-sm text-secondary mb-3">AI assistant embedded in your website</p>
            <div class="bg-white dark:bg-gray-800 p-3 rounded border dark:border-gray-700 text-sm">
              <p class="font-mono text-xs">
                Frontend (React) → API Gateway → FastAPI → Ollama/llama.cpp
              </p>
              <p class="text-secondary mt-2">Cost: $10-50/month | Users: 100-1000/day</p>
            </div>
          </div>

          <div class="info-box-gray p-5">
            <h4 class="font-semibold text-lg mb-2">Pattern 2: Document Q&A System</h4>
            <p class="text-sm text-secondary mb-3">Upload documents, ask questions</p>
            <div class="bg-white dark:bg-gray-800 p-3 rounded border dark:border-gray-700 text-sm">
              <p class="font-mono text-xs">
                Documents → Embeddings (vector DB) → Retrieval + LLM → Answer
              </p>
              <p class="text-secondary mt-2">Stack: LangChain, Pinecone, OpenAI API</p>
            </div>
          </div>

          <div class="info-box-gray p-5">
            <h4 class="font-semibold text-lg mb-2">Pattern 3: Mobile App Backend</h4>
            <p class="text-sm text-secondary mb-3">AI features in iOS/Android apps</p>
            <div class="bg-white dark:bg-gray-800 p-3 rounded border dark:border-gray-700 text-sm">
              <p class="font-mono text-xs">Mobile App → API Gateway → AWS Lambda → Together AI</p>
              <p class="text-secondary mt-2">Cost: Pay-per-use | Scale: Unlimited</p>
            </div>
          </div>

          <div class="info-box-gray p-5">
            <h4 class="font-semibold text-lg mb-2">Pattern 4: Batch Processing Pipeline</h4>
            <p class="text-sm text-secondary mb-3">Process thousands of items asynchronously</p>
            <div class="bg-white dark:bg-gray-800 p-3 rounded border dark:border-gray-700 text-sm">
              <p class="font-mono text-xs">Queue (Redis) → Workers (Kubernetes) → Database</p>
              <p class="text-secondary mt-2">Best for: Content generation, data processing</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- GGUF Conversion Guide -->
    <div class="card mb-8">
      <h2 class="text-xl font-semibold mb-4">📦 Converting to GGUF Format</h2>

      <div class="space-y-4">
        <p class="text-secondary">
          GGUF is the universal format for deploying LLMs. It works with Ollama, llama.cpp, LM
          Studio, and most other tools. If you have a HuggingFace format model (PyTorch), you need
          to convert it first.
        </p>

        <div class="info-box-blue">
          <h4 class="font-semibold mb-2">When Do You Need This?</h4>
          <ul class="text-sm space-y-1">
            <li>✅ You have a HuggingFace/PyTorch model and want to use Ollama</li>
            <li>✅ You need maximum compatibility across different tools</li>
            <li>✅ You want optimized quantization for faster inference</li>
            <li>❌ You already have a .gguf file (skip this section)</li>
          </ul>
        </div>

        <h4 class="font-semibold">Step-by-Step Conversion</h4>

        <div class="space-y-4">
          <div>
            <h5 class="font-medium text-secondary mb-2">Step 1: Install Conversion Tools</h5>
            <div class="bg-gray-800 text-gray-200 p-3 rounded-lg text-sm">
              <pre>
# Option A: Use llama.cpp convert script
pip install transformers torch

# Download the conversion script
curl -L -o convert_hf_to_gguf.py \
  https://github.com/ggerganov/llama.cpp/raw/master/convert_hf_to_gguf.py</pre
              >
            </div>
          </div>

          <div>
            <h5 class="font-medium text-secondary mb-2">Step 2: Convert Your Model</h5>
            <div class="bg-gray-800 text-gray-200 p-3 rounded-lg text-sm">
              <pre>
# Convert to GGUF format
python convert_hf_to_gguf.py \
  ./your-model-folder/ \
  --outfile your-model.gguf \
  --outtype q4_k_m

# Creates: your-model.gguf (~500MB for Q4)</pre
              >
            </div>
          </div>

          <div>
            <h5 class="font-medium text-secondary mb-2">Step 3: Choose Quantization Level</h5>
            <div class="overflow-x-auto">
              <table class="w-full text-sm">
                <thead>
                  <tr class="border-b dark:border-gray-700">
                    <th class="text-left p-2">Type</th>
                    <th class="text-left p-2">Size</th>
                    <th class="text-left p-2">Quality</th>
                    <th class="text-left p-2">Best For</th>
                  </tr>
                </thead>
                <tbody>
                  <tr class="border-b dark:border-gray-700">
                    <td class="p-2"><code>f16</code></td>
                    <td class="p-2">~1.6GB</td>
                    <td class="p-2">⭐⭐⭐ Best</td>
                    <td class="p-2">Maximum quality</td>
                  </tr>
                  <tr class="border-b dark:border-gray-700">
                    <td class="p-2"><code>q8_0</code></td>
                    <td class="p-2">~900MB</td>
                    <td class="p-2">⭐⭐⭐ Excellent</td>
                    <td class="p-2">Great balance</td>
                  </tr>
                  <tr class="border-b dark:border-gray-700">
                    <td class="p-2"><code>q4_k_m</code></td>
                    <td class="p-2">~500MB</td>
                    <td class="p-2">⭐⭐ Very Good</td>
                    <td class="p-2">✅ Recommended</td>
                  </tr>
                  <tr class="border-b dark:border-gray-700">
                    <td class="p-2"><code>q4_0</code></td>
                    <td class="p-2">~450MB</td>
                    <td class="p-2">⭐⭐ Good</td>
                    <td class="p-2">Fast inference</td>
                  </tr>
                  <tr>
                    <td class="p-2"><code>q2_k</code></td>
                    <td class="p-2">~300MB</td>
                    <td class="p-2">⭐ Acceptable</td>
                    <td class="p-2">Minimum size</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div class="info-box-green">
          <h4 class="font-semibold mb-2">💡 Recommendation</h4>
          <p class="text-sm">
            Use <code>q4_k_m</code> for the best balance of quality and size. It provides ~95% of
            original quality with 75% size reduction.
          </p>
        </div>
      </div>
    </div>

    <!-- Final Summary -->
    <div
      class="card mb-8 bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20"
    >
      <h2 class="text-xl font-semibold mb-4">Your Deployment Checklist</h2>

      <div class="space-y-2">
        <div class="flex items-start gap-2">
          <input type="checkbox" class="mt-1" />
          <p class="text-secondary">Quantize model to Q4_K_M (if not already)</p>
        </div>
        <div class="flex items-start gap-2">
          <input type="checkbox" class="mt-1" />
          <p class="text-secondary">Test inference speed on target hardware</p>
        </div>
        <div class="flex items-start gap-2">
          <input type="checkbox" class="mt-1" />
          <p class="text-secondary">Choose deployment method (Local/Cloud/Managed)</p>
        </div>
        <div class="flex items-start gap-2">
          <input type="checkbox" class="mt-1" />
          <p class="text-secondary">Set up authentication and rate limiting</p>
        </div>
        <div class="flex items-start gap-2">
          <input type="checkbox" class="mt-1" />
          <p class="text-secondary">Configure monitoring and logging</p>
        </div>
        <div class="flex items-start gap-2">
          <input type="checkbox" class="mt-1" />
          <p class="text-secondary">Add caching for frequent queries</p>
        </div>
        <div class="flex items-start gap-2">
          <input type="checkbox" class="mt-1" />
          <p class="text-secondary">Test with real user traffic</p>
        </div>
        <div class="flex items-start gap-2">
          <input type="checkbox" class="mt-1" />
          <p class="text-secondary">Document your API</p>
        </div>
      </div>
    </div>

    <!-- Navigation -->
    <div class="flex justify-between">
      <NuxtLink to="/fine-tuning/fundamentals" class="btn-secondary"> ← Fundamentals </NuxtLink>
      <NuxtLink to="/fine-tuning/using-your-model" class="btn-primary">
        Using Your Model →
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
  definePageMeta({
    layout: "default",
  });
</script>
