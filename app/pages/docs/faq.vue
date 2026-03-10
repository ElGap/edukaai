<template>
  <div class="max-w-6xl mx-auto">
    <!-- Section: FAQ -->
    <section id="faq" class="mb-12">
      <div class="flex items-center gap-3 mb-6">
        <span class="text-3xl">❓</span>
        <h2 class="text-2xl font-bold">Frequently Asked Questions</h2>
      </div>

      <div class="space-y-4">
        <div class="card">
          <h3 class="font-semibold text-lg mb-2 text-blue-700">
            How many examples do I actually need?
          </h3>
          <p class="text-secondary mb-3">
            Start with <strong>100 high-quality examples</strong> for your first fine-tuning. This
            is the perfect amount for testing and learning without overwhelming yourself.
          </p>
          <ul class="list-disc list-inside text-sm text-secondary space-y-1 ml-4">
            <li><strong>50 examples:</strong> Minimum to try fine-tuning</li>
            <li>
              <strong>100 examples:</strong> Sweet spot for testing and learning (recommended
              starting point)
            </li>
            <li><strong>500-1000 examples:</strong> Noticeable improvement in specific tasks</li>
            <li><strong>5000+ examples:</strong> Professional-grade fine-tuning</li>
          </ul>
          <p class="text-sm text-tertiary mt-3">
            <strong>Remember:</strong> 100 excellent examples beat 1000 mediocre ones. Quality
            always wins over quantity. Start with 100, then iterate and add more.
          </p>
        </div>

        <div class="card">
          <h3 class="font-semibold text-lg mb-2 text-blue-700">
            What's the difference between "Draft" and "Approved" status?
          </h3>
          <p class="text-secondary">
            <strong>Draft</strong> means you're still working on it—needs review or improvement.
            <strong>Approved</strong> means it's high quality and ready for training.
            <strong>Rejected</strong> means it has significant issues and shouldn't be used. Aim to
            have 80% of your examples approved before training.
          </p>
        </div>

        <div class="card">
          <h3 class="font-semibold text-lg mb-2 text-blue-700">
            Can I import from ChatGPT / Claude / my own conversations?
          </h3>
          <p class="text-secondary mb-3">
            Currently, you can import training data via JSON/JSONL files. Direct integration with
            chat platforms is coming soon!
          </p>
          <ul class="list-disc list-inside text-sm text-secondary space-y-1 ml-4">
            <li>
              <strong>OpenWebUI</strong> - Coming soon! Import directly from your OpenWebUI
              conversations
            </li>
          </ul>
          <p class="text-sm text-tertiary mt-3">
            For now, you can manually copy your best conversations from ChatGPT, Claude, or other AI
            assistants and paste them into the
            <NuxtLink to="/samples/new" class="text-blue-600 hover:underline"
              >Create Sample</NuxtLink
            >
            form. Go to the
            <NuxtLink to="/import" class="text-blue-600 hover:underline">Import</NuxtLink> page to
            upload JSON files.
          </p>
        </div>

        <div class="card">
          <h3 class="font-semibold text-lg mb-2 text-blue-700">
            How long does it take to create 1000 examples?
          </h3>
          <p class="text-secondary mb-3">It depends on your approach:</p>
          <ul class="list-disc list-inside text-sm text-secondary space-y-1 ml-4">
            <li><strong>Manual creation:</strong> 5-10 minutes per example = 85-170 hours total</li>
            <li>
              <strong>Importing conversations:</strong> Much faster! Can import 50-100 examples in
              minutes
            </li>
            <li><strong>Hybrid approach:</strong> Import 70% + manually create 30%</li>
          </ul>
          <p class="text-sm text-tertiary mt-3">
            <strong>Recommended:</strong> Import from your existing AI conversations, then curate
            and add manual examples where needed. This can reduce time to just 10-20 hours of
            curation.
          </p>
        </div>

        <div class="card">
          <h3 class="font-semibold text-lg mb-2 text-blue-700">
            Do I need programming experience to fine-tune an LLM?
          </h3>
          <p class="text-secondary">
            <strong>No!</strong> edukaAI is designed for beginners. You don't need to write training
            code or understand machine learning theory. Just create good examples using our forms,
            and we'll handle the technical parts. However, basic understanding of your domain (e.g.,
            programming concepts if you're building a coding assistant) is helpful.
          </p>
        </div>

        <div class="card">
          <h3 class="font-semibold text-lg mb-2 text-blue-700">
            What models can I fine-tune with my dataset?
          </h3>
          <p class="text-secondary mb-3">
            Once exported from edukaAI, you can use your dataset to fine-tune:
          </p>
          <ul class="list-disc list-inside text-sm text-secondary space-y-1 ml-4">
            <li>
              <strong>Open source models:</strong> Llama 2, Mistral, Falcon (free, run locally)
            </li>
            <li><strong>Via HuggingFace:</strong> Easy upload and training</li>
            <li><strong>Via OpenAI:</strong> GPT-3.5 fine-tuning API</li>
            <li>
              <strong>Via other platforms:</strong> Any platform accepting Alpaca or ShareGPT format
            </li>
          </ul>
          <p class="text-sm text-tertiary mt-3">
            We export in multiple formats (Alpaca, ShareGPT, CodeAlpaca) to ensure compatibility
            with popular training platforms.
          </p>
        </div>

        <div class="card">
          <h3 class="font-semibold text-lg mb-2 text-blue-700">How much does fine-tuning cost?</h3>
          <p class="text-secondary mb-3">Costs vary by platform:</p>
          <ul class="list-disc list-inside text-sm text-secondary space-y-1 ml-4">
            <li>
              <strong>Open source (local):</strong> Free! Just need a decent GPU (RTX 3060 or better
              recommended)
            </li>
            <li>
              <strong>HuggingFace / cloud:</strong> $5-20 per training run depending on model size
            </li>
            <li>
              <strong>OpenAI API:</strong> $0.008 per 1K tokens trained (typically $2-10 for 1000
              examples)
            </li>
          </ul>
          <p class="text-sm text-tertiary mt-3">
            <strong>Cost-saving tip:</strong> Train on smaller models first (7B parameters) to test
            your dataset before training larger, more expensive models.
          </p>
        </div>

        <div class="card">
          <h3 class="font-semibold text-lg mb-2 text-blue-700">
            What if my model doesn't improve after training?
          </h3>
          <p class="text-secondary mb-3">Common reasons and solutions:</p>
          <ul class="list-disc list-inside text-sm text-secondary space-y-1 ml-4">
            <li>
              <strong>Quality issues:</strong> Review your dataset. Reject low-quality examples. Aim
              for 4-5 star ratings.
            </li>
            <li>
              <strong>Not enough data:</strong> Try with 1000+ examples. Small datasets often don't
              show improvement.
            </li>
            <li>
              <strong>Wrong format:</strong> Make sure you're exporting in the right format for your
              training platform.
            </li>
            <li>
              <strong>Base model too large:</strong> Try fine-tuning a smaller model (7B instead of
              70B).
            </li>
            <li>
              <strong>Training parameters:</strong> You may need more training epochs or different
              learning rates.
            </li>
          </ul>
        </div>

        <div class="card">
          <h3 class="font-semibold text-lg mb-2 text-blue-700">
            Can I use copyrighted material in my dataset?
          </h3>
          <p class="text-secondary">
            Be careful! Don't include copyrighted code, text, or content without permission. Write
            your own explanations and examples. If importing from AI assistants (Claude, ChatGPT),
            those conversations are generally fine to use since you created them. When in doubt,
            create original content.
          </p>
        </div>

        <div class="card">
          <h3 class="font-semibold text-lg mb-2 text-blue-700">
            How do I know if an example is good quality?
          </h3>
          <p class="text-secondary mb-3">Ask yourself these questions:</p>
          <ul class="list-disc list-inside text-sm text-secondary space-y-1 ml-4">
            <li>Does the output fully answer the instruction?</li>
            <li>Would this help a real user?</li>
            <li>Is it accurate and correct?</li>
            <li>Is the tone consistent with other examples?</li>
            <li>Does it teach something or just give an answer?</li>
            <li>Would I be proud if this was the only example someone saw?</li>
          </ul>
          <p class="text-sm text-tertiary mt-3">
            If you answered "yes" to all, it's probably a 4-5 star example!
          </p>
        </div>
      </div>
    </section>

    <!-- Section: Glossary -->
    <section id="glossary" class="mb-12">
      <div class="flex items-center gap-3 mb-6">
        <span class="text-3xl">📖</span>
        <h2 class="text-2xl font-bold">Glossary</h2>
      </div>

      <div class="card">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
          <div>
            <h3 class="font-semibold text-blue-700">Base Model</h3>
            <p class="text-sm text-secondary">
              The pre-trained LLM you start with before fine-tuning (e.g., GPT-4, Llama 2, Mistral).
            </p>
          </div>

          <div>
            <h3 class="font-semibold text-blue-700">Dataset</h3>
            <p class="text-sm text-secondary">
              A collection of training examples used to teach the AI specific tasks.
            </p>
          </div>

          <div>
            <h3 class="font-semibold text-blue-700">Epoch</h3>
            <p class="text-sm text-secondary">
              One complete pass through the entire dataset during training. Multiple epochs help the
              model learn better.
            </p>
          </div>

          <div>
            <h3 class="font-semibold text-blue-700">Fine-Tuning</h3>
            <p class="text-sm text-secondary">
              The process of training a pre-trained model on a specific dataset to improve
              performance on particular tasks.
            </p>
          </div>

          <div>
            <h3 class="font-semibold text-blue-700">Hallucination</h3>
            <p class="text-sm text-secondary">
              When an AI generates incorrect or made-up information. Good datasets help reduce this.
            </p>
          </div>

          <div>
            <h3 class="font-semibold text-blue-700">Hyperparameters</h3>
            <p class="text-sm text-secondary">
              Settings that control the training process (learning rate, batch size, epochs).
              Usually handled automatically.
            </p>
          </div>

          <div>
            <h3 class="font-semibold text-blue-700">Instruction</h3>
            <p class="text-sm text-secondary">
              The input part of a training example—what the user asks or the task to perform.
            </p>
          </div>

          <div>
            <h3 class="font-semibold text-blue-700">LLM (Large Language Model)</h3>
            <p class="text-sm text-secondary">
              AI models trained on vast amounts of text to understand and generate human language.
            </p>
          </div>

          <div>
            <h3 class="font-semibold text-blue-700">Loss</h3>
            <p class="text-sm text-secondary">
              A measure of how wrong the model's predictions are. Lower loss = better learning.
            </p>
          </div>

          <div>
            <h3 class="font-semibold text-blue-700">Overfitting</h3>
            <p class="text-sm text-secondary">
              When a model learns the training data too well and can't generalize to new inputs.
            </p>
          </div>

          <div>
            <h3 class="font-semibold text-blue-700">Output / Response</h3>
            <p class="text-sm text-secondary">
              The desired answer or result the AI should produce for a given instruction.
            </p>
          </div>

          <div>
            <h3 class="font-semibold text-blue-700">Parameters</h3>
            <p class="text-sm text-secondary">
              The internal numbers/weights that define how an AI model works. "7B" = 7 billion
              parameters.
            </p>
          </div>

          <div>
            <h3 class="font-semibold text-blue-700">Prompt</h3>
            <p class="text-sm text-secondary">
              The text you send to an AI to get a response. In training, this is the instruction.
            </p>
          </div>

          <div>
            <h3 class="font-semibold text-blue-700">System Prompt</h3>
            <p class="text-sm text-secondary">
              Instructions that define the AI's personality, role, and behavior for all responses.
            </p>
          </div>

          <div>
            <h3 class="font-semibold text-blue-700">Token</h3>
            <p class="text-sm text-secondary">
              A piece of text (word or word fragment) that the AI processes. "Hello world" ≈ 2-3
              tokens.
            </p>
          </div>

          <div>
            <h3 class="font-semibold text-blue-700">Training</h3>
            <p class="text-sm text-secondary">
              The process of adjusting a model's parameters so it produces better outputs.
            </p>
          </div>

          <div>
            <h3 class="font-semibold text-blue-700">Validation Set</h3>
            <p class="text-sm text-secondary">
              A portion of data held back from training to test if the model generalizes well.
            </p>
          </div>

          <div>
            <h3 class="font-semibold text-blue-700">Weights</h3>
            <p class="text-sm text-secondary">
              See "Parameters"—the learned values that determine how the AI responds.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Section: Resources -->
    <section id="resources" class="mb-12">
      <div class="flex items-center gap-3 mb-6">
        <span class="text-3xl">🔗</span>
        <h2 class="text-2xl font-bold">Resources & Next Steps</h2>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="card">
          <h3 class="font-semibold text-lg mb-4">📚 Learning Resources</h3>
          <ul class="space-y-3 text-sm">
            <li>
              <a
                href="https://huggingface.co/docs/transformers/training"
                target="_blank"
                class="text-blue-600 hover:underline"
              >
                HuggingFace Training Guide
              </a>
              <p class="text-tertiary">Official guide for training transformers</p>
            </li>
            <li>
              <a
                href="https://platform.openai.com/docs/guides/fine-tuning"
                target="_blank"
                class="text-blue-600 hover:underline"
              >
                OpenAI Fine-Tuning Guide
              </a>
              <p class="text-tertiary">Guide for fine-tuning GPT models</p>
            </li>
            <li>
              <a
                href="https://github.com/tatsu-lab/stanford_alpaca"
                target="_blank"
                class="text-blue-600 hover:underline"
              >
                Stanford Alpaca Dataset
              </a>
              <p class="text-tertiary">Example of high-quality instruction dataset</p>
            </li>
            <li>
              <a
                href="https://github.com/huggingface/transformers"
                target="_blank"
                class="text-blue-600 hover:underline"
              >
                Transformers Library
              </a>
              <p class="text-tertiary">Popular library for working with LLMs</p>
            </li>
          </ul>
        </div>

        <div class="card">
          <h3 class="font-semibold text-lg mb-4">🛠️ Tools & Platforms</h3>
          <ul class="space-y-3 text-sm">
            <li>
              <a
                href="https://huggingface.co/"
                target="_blank"
                class="text-blue-600 hover:underline"
              >
                HuggingFace Hub
              </a>
              <p class="text-tertiary">Share and train models (we export here!)</p>
            </li>
            <li>
              <a href="https://wandb.ai/" target="_blank" class="text-blue-600 hover:underline">
                Weights & Biases
              </a>
              <p class="text-tertiary">Track training runs and experiments</p>
            </li>
            <li>
              <a
                href="https://github.com/jeffdapaz/llama-cpp-python"
                target="_blank"
                class="text-blue-600 hover:underline"
              >
                Llama.cpp
              </a>
              <p class="text-tertiary">Run models locally on consumer hardware</p>
            </li>
            <li>
              <a href="https://lmstudio.ai/" target="_blank" class="text-blue-600 hover:underline">
                LM Studio
              </a>
              <p class="text-tertiary">Easy GUI for running local LLMs</p>
            </li>
          </ul>
        </div>
      </div>

      <!-- Next Steps -->
      <div id="next-steps" class="card mt-6 bg-gradient-to-br from-blue-50 to-purple-50">
        <h3 class="font-semibold text-xl mb-4">🚀 Ready to Start?</h3>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <NuxtLink
            to="/samples/new"
            class="p-4 bg-white rounded-lg hover:shadow-md transition-shadow text-center"
          >
            <div class="text-3xl mb-2">✏️</div>
            <h4 class="font-semibold">Create First Example</h4>
            <p class="text-sm text-secondary mt-1">Start building your dataset</p>
          </NuxtLink>

          <NuxtLink
            to="/import"
            class="p-4 bg-white rounded-lg hover:shadow-md transition-shadow text-center"
          >
            <div class="text-3xl mb-2">📥</div>
            <h4 class="font-semibold">Import Conversations</h4>
            <p class="text-sm text-secondary mt-1">Import from AI assistants</p>
          </NuxtLink>

          <NuxtLink
            to="/samples"
            class="p-4 bg-white rounded-lg hover:shadow-md transition-shadow text-center"
          >
            <div class="text-3xl mb-2">📊</div>
            <h4 class="font-semibold">View Dataset</h4>
            <p class="text-sm text-secondary mt-1">See your progress</p>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <div class="text-center py-8 text-tertiary text-sm">
      <p>🎓 edukaAI - Learn LLM fine-tuning by building datasets</p>
      <p class="mt-1">
        Remember: The best way to learn is by doing. Start creating your first example today!
      </p>
    </div>
  </div>
</template>

<script setup>
  definePageMeta({
    layout: "default",
  });
</script>
