<template>
  <div class="max-w-6xl mx-auto">
    <div class="mb-8">
      <div class="flex items-center gap-2 mb-2">
        <NuxtLink to="/fine-tuning" class="text-blue-600 hover:underline text-sm">← All Methods</NuxtLink>
      </div>
      <h1 class="text-3xl font-bold mb-2 flex items-center gap-3">
        <span class="text-4xl">⚡</span>
        Serve with vLLM
      </h1>
      <p class="text-secondary">
        High-throughput serving for your fine-tuned models. The industry standard for production LLM APIs.
      </p>
    </div>

    <!-- Why vLLM -->
    <div class="card mb-6 bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 border-2 border-orange-300 dark:border-orange-700">
      <div class="flex items-center gap-4">
        <span class="text-5xl">🚀</span>
        <div>
          <h2 class="text-xl font-bold">Why vLLM?</h2>
          <p class="text-sm mt-2">
            vLLM is <strong>24x faster</strong> than HuggingFace's native inference. It uses PagedAttention to serve more requests in parallel, batching them efficiently. If you're deploying a fine-tuned model to production, vLLM is the gold standard.
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
              NVIDIA GPU with CUDA compute capability 7.0+ (Volta, Turing, Ampere, Ada Lovelace, Hopper)
            </p>
            <div class="info-box-gray mt-2 text-sm">
              <p><strong>Minimum:</strong> 16GB VRAM (RTX 4080, RTX 3090)</p>
              <p><strong>Recommended:</strong> 24GB+ VRAM (RTX 4090, A6000)</p>
              <p><strong>Multi-GPU:</strong> Tensor Parallelism supported</p>
            </div>
          </div>
        </div>

        <div class="flex items-start gap-3">
          <span class="text-xl">📦</span>
          <div>
            <h3 class="font-semibold">Model Ready</h3>
            <p class="text-sm text-secondary mb-2">
              You need a fine-tuned model or base model to serve.
            </p>
            <NuxtLink to="/fine-tuning/using-your-model" class="text-blue-600 hover:underline text-sm">
              Get your model from Post-Training Guide →
            </NuxtLink>
          </div>
        </div>

        <div class="flex items-start gap-3">
          <span class="text-xl">💻</span>
          <div>
            <h3 class="font-semibold">System Requirements</h3>
            <p class="text-sm text-secondary">
              Linux recommended (Ubuntu 20.04+). macOS and Windows supported via Docker.
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Step 1: Installation -->
    <div class="card mb-6">
      <h2 class="text-xl font-semibold mb-4 flex items-center gap-2">
        <span class="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
        Install vLLM
      </h2>

      <div class="space-y-4">
        <div class="bg-gray-800 text-gray-200 p-4 rounded-lg">
          <p class="text-sm text-gray-400 mb-2"># Install vLLM (requires Python 3.8-3.11)</p>
          <pre class="text-sm"><code>pip install vllm</code></pre>
        </div>

        <div class="info-box-blue">
          <h4 class="font-semibold mb-2">💡 Docker Alternative (Recommended)</h4>
          <div class="bg-gray-800 text-gray-200 p-2 rounded text-sm">
            <pre>docker run --runtime nvidia --gpus all \
  -v ~/.cache/huggingface:/root/.cache/huggingface \
  -p 8000:8000 \
  vllm/vllm-openai:latest \
  --model unsloth/Llama-3.2-1B-Instruct</pre>
          </div>
          <p class="text-xs text-tertiary mt-2">
            Docker handles all dependencies automatically. Great for production deployments.
          </p>
        </div>

        <div class="info-box-green">
          <h4 class="font-semibold mb-2">✅ Verify Installation</h4>
          <div class="bg-gray-800 text-gray-200 p-2 rounded text-sm">
            <pre>python -c "import vllm; print(f'vLLM version: {vllm.__version__}')"</pre>
          </div>
        </div>
      </div>
    </div>

    <!-- Step 2: Quick Start -->
    <div class="card mb-6">
      <h2 class="text-xl font-semibold mb-4 flex items-center gap-2">
        <span class="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
        Quick Start
      </h2>

      <div class="space-y-4">
        <p class="text-sm text-secondary">
          Start serving your model with a single command:
        </p>

        <div class="bg-gray-800 text-gray-200 p-4 rounded-lg">
          <p class="text-sm text-gray-400 mb-2"># Serve a HuggingFace model</p>
          <pre class="text-sm"><code>python -m vllm.entrypoints.openai.api_server \
  --model unsloth/Llama-3.2-1B-Instruct \
  --port 8000</code></pre>
        </div>

        <div class="bg-gray-800 text-gray-200 p-4 rounded-lg">
          <p class="text-sm text-gray-400 mb-2"># Serve your fine-tuned model</p>
          <pre class="text-sm"><code>python -m vllm.entrypoints.openai.api_server \
  --model ./lora_model \
  --port 8000</code></pre>
        </div>

        <div class="info-box-green">
          <h4 class="font-semibold mb-2">✅ That's It!</h4>
          <p class="text-sm">
            Your model is now available at <code class="bg-gray-100 dark:bg-gray-700 px-1">http://localhost:8000</code> with an OpenAI-compatible API.
          </p>
        </div>
      </div>
    </div>

    <!-- Step 3: Test the API -->
    <div class="card mb-6">
      <h2 class="text-xl font-semibold mb-4 flex items-center gap-2">
        <span class="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold">3</span>
        Test the API
      </h2>

      <div class="space-y-4">
        <div class="bg-gray-800 text-gray-200 p-4 rounded-lg">
          <p class="text-sm text-gray-400 mb-2"># Using curl</p>
          <pre class="text-sm"><code>curl http://localhost:8000/v1/completions \
  -H "Content-Type: application/json" \
  -d '{
    "model": "unsloth/Llama-3.2-1B-Instruct",
    "prompt": "Who is Zorblax?",
    "max_tokens": 100,
    "temperature": 0.7
  }'</code></pre>
        </div>

        <div class="bg-gray-800 text-gray-200 p-4 rounded-lg">
          <p class="text-sm text-gray-400 mb-2"># Using Python (OpenAI SDK)</p>
          <pre class="text-sm"><code>from openai import OpenAI

# Point to your local vLLM server
client = OpenAI(
    base_url="http://localhost:8000/v1",
    api_key="dummy"  # vLLM doesn't require authentication by default
)

response = client.completions.create(
    model="unsloth/Llama-3.2-1B-Instruct",
    prompt="Who is Zorblax?",
    max_tokens=100
)

print(response.choices[0].text)</code></pre>
        </div>

        <div class="bg-gray-800 text-gray-200 p-4 rounded-lg">
          <p class="text-sm text-gray-400 mb-2"># Chat completions (like ChatGPT)</p>
          <pre class="text-sm"><code>response = client.chat.completions.create(
    model="unsloth/Llama-3.2-1B-Instruct",
    messages=[
        {"role": "user", "content": "Who is Zorblax?"}
    ],
    max_tokens=100
)

print(response.choices[0].message.content)</code></pre>
        </div>
      </div>
    </div>

    <!-- Step 4: Production Configuration -->
    <div class="card mb-6">
      <h2 class="text-xl font-semibold mb-4 flex items-center gap-2">
        <span class="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold">4</span>
        Production Configuration
      </h2>

      <div class="space-y-4">
        <p class="text-sm text-secondary">
          Optimize vLLM for your specific use case:
        </p>

        <div class="bg-gray-800 text-gray-200 p-4 rounded-lg">
          <p class="text-sm text-gray-400 mb-2"># High-throughput serving</p>
          <pre class="text-sm"><code>python -m vllm.entrypoints.openai.api_server \
  --model unsloth/Llama-3.2-1B-Instruct \
  --port 8000 \
  --tensor-parallel-size 1 \
  --max-model-len 4096 \
  --gpu-memory-utilization 0.9 \
  --max-num-seqs 256</code></pre>
        </div>

        <div class="info-box-blue">
          <h4 class="font-semibold mb-2">Key Parameters Explained</h4>
          <div class="overflow-x-auto">
            <table class="w-full text-sm">
              <thead>
                <tr class="bg-blue-100 dark:bg-blue-900">
                  <th class="text-left p-2">Parameter</th>
                  <th class="text-left p-2">Default</th>
                  <th class="text-left p-2">Description</th>
                </tr>
              </thead>
              <tbody>
                <tr class="border-b dark:border-gray-700">
                  <td class="p-2">--tensor-parallel-size</td>
                  <td class="p-2">1</td>
                  <td class="p-2">Number of GPUs to split model across</td>
                </tr>
                <tr class="border-b dark:border-gray-700">
                  <td class="p-2">--max-model-len</td>
                  <td class="p-2">Model max</td>
                  <td class="p-2">Maximum sequence length</td>
                </tr>
                <tr class="border-b dark:border-gray-700">
                  <td class="p-2">--gpu-memory-utilization</td>
                  <td class="p-2">0.9</td>
                  <td class="p-2">GPU memory fraction to use (0-1)</td>
                </tr>
                <tr>
                  <td class="p-2">--max-num-seqs</td>
                  <td class="p-2">256</td>
                  <td class="p-2">Max concurrent sequences</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

    <!-- Step 5: Multi-GPU Setup -->
    <div class="card mb-6">
      <h2 class="text-xl font-semibold mb-4 flex items-center gap-2">
        <span class="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold">5</span>
        Multi-GPU Setup
      </h2>

      <div class="space-y-4">
        <p class="text-sm text-secondary">
          Serve larger models by splitting them across multiple GPUs:
        </p>

        <div class="bg-gray-800 text-gray-200 p-4 rounded-lg">
          <p class="text-sm text-gray-400 mb-2"># Split across 2 GPUs</p>
          <pre class="text-sm"><code>python -m vllm.entrypoints.openai.api_server \
  --model meta-llama/Llama-2-70b-hf \
  --tensor-parallel-size 2 \
  --port 8000</code></pre>
        </div>

        <div class="bg-gray-800 text-gray-200 p-4 rounded-lg">
          <p class="text-sm text-gray-400 mb-2"># Split across 4 GPUs</p>
          <pre class="text-sm"><code>python -m vllm.entrypoints.openai.api_server \
  --model meta-llama/Llama-2-70b-hf \
  --tensor-parallel-size 4 \
  --port 8000</code></pre>
        </div>

        <div class="info-box-yellow">
          <h4 class="font-semibold mb-2">Requirements</h4>
          <ul class="text-sm space-y-1">
            <li>• Multiple GPUs on same machine (NVLink preferred)</li>
            <li>• Same GPU model for best performance</li>
            <li>• Sufficient PCIe bandwidth</li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Step 6: Deploy with Docker -->
    <div class="card mb-6">
      <h2 class="text-xl font-semibold mb-4 flex items-center gap-2">
        <span class="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold">6</span>
        Deploy with Docker
      </h2>

      <div class="space-y-4">
        <p class="text-sm text-secondary">
          Docker is the recommended way to deploy vLLM in production:
        </p>

        <div class="bg-gray-800 text-gray-200 p-4 rounded-lg">
          <p class="text-sm text-gray-400 mb-2"># Create a Dockerfile</p>
          <pre class="text-sm"><code>FROM vllm/vllm-openai:latest

# Copy your fine-tuned model
COPY ./lora_model /app/model

# Expose port
EXPOSE 8000

# Start server
CMD ["--model", "/app/model", "--port", "8000"]</code></pre>
        </div>

        <div class="bg-gray-800 text-gray-200 p-4 rounded-lg">
          <p class="text-sm text-gray-400 mb-2"># Build and run</p>
          <pre class="text-sm"><code># Build image
docker build -t my-vllm-server .

# Run container
docker run --runtime nvidia --gpus all -p 8000:8000 my-vllm-server</code></pre>
        </div>

        <div class="bg-gray-800 text-gray-200 p-4 rounded-lg">
          <p class="text-sm text-gray-400 mb-2"># docker-compose.yml</p>
          <pre class="text-sm"><code>version: '3.8'
services:
  vllm:
    image: vllm/vllm-openai:latest
    ports:
      - "8000:8000"
    runtime: nvidia
    environment:
      - NVIDIA_VISIBLE_DEVICES=all
    volumes:
      - ~/.cache/huggingface:/root/.cache/huggingface
      - ./lora_model:/app/model
    command: ["--model", "/app/model", "--port", "8000"]</code></pre>
        </div>
      </div>
    </div>

    <!-- Step 7: Load Balancing -->
    <div class="card mb-6">
      <h2 class="text-xl font-semibold mb-4 flex items-center gap-2">
        <span class="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold">7</span>
        Load Balancing (Multiple Instances)
      </h2>

      <div class="space-y-4">
        <p class="text-sm text-secondary">
          Scale horizontally by running multiple vLLM instances behind a load balancer:
        </p>

        <div class="bg-gray-800 text-gray-200 p-4 rounded-lg">
          <p class="text-sm text-gray-400 mb-2"># nginx.conf</p>
          <pre class="text-sm"><code>http {
    upstream vllm_backend {
        server localhost:8000;
        server localhost:8001;
        server localhost:8002;
    }

    server {
        listen 80;
        location / {
            proxy_pass http://vllm_backend;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
        }
    }
}</code></pre>
        </div>

        <div class="bg-gray-800 text-gray-200 p-4 rounded-lg">
          <p class="text-sm text-gray-400 mb-2"># Start multiple instances</p>
          <pre class="text-sm"><code># Terminal 1
python -m vllm.entrypoints.openai.api_server --model model --port 8000

# Terminal 2
python -m vllm.entrypoints.openai.api_server --model model --port 8001

# Terminal 3
python -m vllm.entrypoints.openai.api_server --model model --port 8002</code></pre>
        </div>
      </div>
    </div>

    <!-- Performance Comparison -->
    <div class="card mb-6">
      <h2 class="text-xl font-semibold mb-4">vLLM vs Other Serving Options</h2>

      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead>
            <tr class="table-header">
              <th class="text-left p-3">Method</th>
              <th class="text-left p-3">Throughput</th>
              <th class="text-left p-3">Latency</th>
              <th class="text-left p-3">Best For</th>
            </tr>
          </thead>
          <tbody>
            <tr class="border-b bg-orange-50 dark:bg-orange-900/20">
              <td class="p-3 font-bold">vLLM</td>
              <td class="p-3 text-orange-600">⭐⭐⭐⭐⭐ 24x</td>
              <td class="p-3 text-orange-600">⭐⭐⭐⭐⭐ Low</td>
              <td class="p-3">Production APIs</td>
            </tr>
            <tr class="border-b dark:border-gray-700">
              <td class="p-3">HuggingFace TGI</td>
              <td class="p-3">⭐⭐⭐⭐ Good</td>
              <td class="p-3">⭐⭐⭐⭐ Good</td>
              <td class="p-3">HF ecosystem</td>
            </tr>
            <tr class="border-b dark:border-gray-700">
              <td class="p-3">TensorRT-LLM</td>
              <td class="p-3">⭐⭐⭐⭐⭐ Excellent</td>
              <td class="p-3">⭐⭐⭐⭐⭐ Excellent</td>
              <td class="p-3">NVIDIA optimization</td>
            </tr>
            <tr class="border-b dark:border-gray-700">
              <td class="p-3">llama.cpp</td>
              <td class="p-3">⭐⭐⭐ CPU</td>
              <td class="p-3">⭐⭐⭐ Moderate</td>
              <td class="p-3">Edge/CPU only</td>
            </tr>
            <tr>
              <td class="p-3">Native HF</td>
              <td class="p-3">⭐⭐ Baseline</td>
              <td class="p-3">⭐⭐⭐ Moderate</td>
              <td class="p-3">Development</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="mt-4 info-box-blue">
        <h4 class="font-semibold mb-2">💡 When to Use vLLM</h4>
        <ul class="text-sm space-y-1">
          <li>✅ High-throughput production APIs</li>
          <li>✅ Serving multiple users simultaneously</li>
          <li>✅ Cost optimization (serve more on same hardware)</li>
          <li>✅ OpenAI-compatible API needed</li>
          <li>✅ NVIDIA GPU available</li>
        </ul>
      </div>
    </div>

    <!-- Cloud Deployment -->
    <div class="card mb-6 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
      <h2 class="text-xl font-semibold mb-4">☁️ Cloud Deployment</h2>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="bg-white p-4 rounded-lg border border-blue-200 dark:bg-gray-700 dark:border-blue-700">
          <h4 class="font-semibold mb-2">🚀 RunPod</h4>
          <p class="text-sm text-secondary mb-2">
            GPU cloud with vLLM pre-installed templates.
          </p>
          <code class="block bg-gray-800 text-gray-200 p-2 rounded text-xs">
            Template: "vLLM Server"
          </code>
        </div>

        <div class="bg-white p-4 rounded-lg border border-blue-200 dark:bg-gray-700 dark:border-blue-700">
          <h4 class="font-semibold mb-2">⚡ Vast.ai</h4>
          <p class="text-sm text-secondary mb-2">
            Rent GPUs by the hour, deploy vLLM via Docker.
          </p>
          <code class="block bg-gray-800 text-gray-200 p-2 rounded text-xs">
            Lowest cost option
          </code>
        </div>

        <div class="bg-white p-4 rounded-lg border border-blue-200 dark:bg-gray-700 dark:border-blue-700">
          <h4 class="font-semibold mb-2">🔷 Lambda Labs</h4>
          <p class="text-sm text-secondary mb-2">
            Affordable A100/H100 instances with simple deployment.
          </p>
          <code class="block bg-gray-800 text-gray-200 p-2 rounded text-xs">
            Good for sustained workloads
          </code>
        </div>

        <div class="bg-white p-4 rounded-lg border border-blue-200 dark:bg-gray-700 dark:border-blue-700">
          <h4 class="font-semibold mb-2">☁️ AWS/GCP/Azure</h4>
          <p class="text-sm text-secondary mb-2">
            Use managed Kubernetes or EC2/GCE instances.
          </p>
          <code class="block bg-gray-800 text-gray-200 p-2 rounded text-xs">
            Enterprise deployments
          </code>
        </div>
      </div>
    </div>

    <!-- Troubleshooting -->
    <div class="card mb-6 bg-red-50 dark:bg-red-900/20">
      <h2 class="text-xl font-semibold mb-4">🔧 Common Issues</h2>

      <div class="space-y-3 text-sm">
        <div class="p-3 bg-white rounded-lg dark:bg-gray-700">
          <p class="font-semibold">"CUDA out of memory"</p>
          <p class="text-secondary">Reduce --max-model-len or --gpu-memory-utilization</p>
          <p class="text-secondary">Enable quantization: --quantization awq or --quantization gptq</p>
        </div>

        <div class="p-3 bg-white rounded-lg dark:bg-gray-700">
          <p class="font-semibold">"Model architecture not supported"</p>
          <p class="text-secondary">Check vLLM supported models: https://docs.vllm.ai/en/latest/models/supported_models.html</p>
          <p class="text-secondary">Most Llama, Mistral, Falcon, and GPT-NeoX models work</p>
        </div>

        <div class="p-3 bg-white rounded-lg dark:bg-gray-700">
          <p class="font-semibold">Slow first request</p>
          <p class="text-secondary">Normal - model is loading into GPU memory</p>
          <p class="text-secondary">Subsequent requests will be fast</p>
        </div>

        <div class="p-3 bg-white rounded-lg dark:bg-gray-700">
          <p class="font-semibold">"Failed to initialize NCCL" (Multi-GPU)</p>
          <p class="text-secondary">Ensure all GPUs are on same NUMA node</p>
          <p class="text-secondary">Check NVLink connectivity: nvidia-smi topo -m</p>
        </div>
      </div>
    </div>

    <!-- Navigation -->
    <div class="flex justify-between">
      <NuxtLink to="/fine-tuning/deployment" class="btn-secondary">
        ← Deployment Overview
      </NuxtLink>
      <NuxtLink to="/fine-tuning" class="btn-primary">
        All Methods →
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'default'
})

useHead({
  title: 'Serve with vLLM - EdukaAI'
})
</script>
