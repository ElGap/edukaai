<template>
  <div class="max-w-6xl mx-auto pb-20">
    <!-- Breadcrumb -->
    <div class="text-sm text-tertiary mb-6">
      <NuxtLink to="/fine-tuning" class="hover:text-blue-600">← Back to Fine-Tuning</NuxtLink>
    </div>

    <!-- Header -->
    <div class="mb-12">
      <div class="flex items-center gap-3 mb-4">
        <span class="text-4xl">📊</span>
        <h1 class="text-4xl font-bold">Evaluate Your Fine-Tuned Model</h1>
      </div>
      <p class="text-xl text-secondary">
        Comprehensive guide to testing, measuring, and validating your fine-tuned LLM. Learn if your
        model actually learned what you taught it.
      </p>
    </div>

    <!-- Introduction -->
    <div
      class="card mb-8 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20"
    >
      <h2 class="text-xl font-semibold mb-4">🤔 "But How Do I Know If It Worked?"</h2>
      <p class="text-secondary leading-relaxed mb-4">
        You've spent hours preparing data, training your model, and now you have a file called
        <code class="bg-gray-100 dark:bg-gray-700 px-1">adapters.safetensors</code> or a folder
        called <code class="bg-gray-100 dark:bg-gray-700 px-1">model-output/</code>. But does your
        model actually know about Zorblax? Did it learn your coding patterns? Or did it just
        memorize your examples?
      </p>
      <p class="text-secondary leading-relaxed">
        This guide gives you the tools and methods to objectively evaluate your fine-tuned model.
        We'll cover automated metrics, human evaluation, A/B testing, and real-world validation. By
        the end, you'll know exactly how good your model is and when to stop iterating.
      </p>
    </div>

    <!-- The Evaluation Mindset -->
    <section id="evaluation-mindset" class="mb-12">
      <div class="flex items-center gap-3 mb-6">
        <span class="text-3xl">🎯</span>
        <h2 class="text-2xl font-bold">The Evaluation Mindset</h2>
      </div>

      <div class="card">
        <h3 class="text-lg font-semibold mb-4 text-purple-700">
          What Makes a "Good" Fine-Tuned Model?
        </h3>

        <p class="text-secondary mb-4 leading-relaxed">
          A good fine-tuned model isn't just one that can repeat your training examples. It needs
          to:
        </p>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div class="info-box-green">
            <h4 class="font-semibold text-green-900 dark:text-green-100 mb-2">✅ Generalize</h4>
            <p class="text-sm text-secondary">
              Answer questions it wasn't explicitly trained on, using patterns it learned.
            </p>
          </div>

          <div class="info-box-green">
            <h4 class="font-semibold text-green-900 dark:text-green-100 mb-2">✅ Stay Faithful</h4>
            <p class="text-sm text-secondary">
              Follow your training examples' style, format, and constraints consistently.
            </p>
          </div>

          <div class="info-box-green">
            <h4 class="font-semibold text-green-900 dark:text-green-100 mb-2">
              ✅ Don't Hallucinate
            </h4>
            <p class="text-sm text-secondary">
              Make up facts about your domain (e.g., Zorblax's favorite color if not in training).
            </p>
          </div>

          <div class="info-box-green">
            <h4 class="font-semibold text-green-900 dark:text-green-100 mb-2">
              ✅ Retain Base Knowledge
            </h4>
            <p class="text-sm text-secondary">
              Don't forget general knowledge (math, reasoning, English) while learning your task.
            </p>
          </div>
        </div>

        <div class="info-box-yellow">
          <h4 class="font-semibold text-yellow-900 dark:text-yellow-100 mb-2">
            ⚠️ The Overfitting Trap
          </h4>
          <p class="text-sm text-yellow-800 dark:text-yellow-200">
            The most common failure mode: Your model memorizes training examples but fails on
            similar but unseen questions. This is called <strong>overfitting</strong>. We'll teach
            you how to detect and prevent it.
          </p>
        </div>
      </div>
    </section>

    <!-- Three Types of Evaluation -->
    <section id="three-types" class="mb-12">
      <div class="flex items-center gap-3 mb-6">
        <span class="text-3xl">📐</span>
        <h2 class="text-2xl font-bold">Three Types of Evaluation</h2>
      </div>

      <div class="card">
        <p class="text-secondary mb-6">
          Complete evaluation requires all three approaches. Each catches different problems:
        </p>

        <div class="space-y-4">
          <div class="info-box-blue p-5 border-2">
            <div class="flex items-start gap-3">
              <span class="text-3xl">🤖</span>
              <div class="flex-1">
                <h4 class="font-bold text-lg text-blue-900 dark:text-blue-100 mb-2">
                  1. Automated Metrics
                </h4>
                <p class="text-secondary mb-2">
                  Mathematical measurements computed automatically. Fast, reproducible, objective.
                </p>
                <ul class="text-sm text-secondary space-y-1 ml-4">
                  <li>• Perplexity (how "surprised" the model is by test data)</li>
                  <li>• BLEU/ROUGE (text similarity to reference answers)</li>
                  <li>• Exact Match (for structured outputs)</li>
                </ul>
                <p class="text-xs text-blue-600 dark:text-blue-300 mt-2">
                  Best for: Quick iteration, catching regressions, quantitative comparison
                </p>
              </div>
            </div>
          </div>

          <div class="info-box-purple p-5 border-2">
            <div class="flex items-start gap-3">
              <span class="text-3xl">👤</span>
              <div class="flex-1">
                <h4 class="font-bold text-lg text-purple-900 dark:text-purple-100 mb-2">
                  2. Human Evaluation
                </h4>
                <p class="text-secondary mb-2">
                  You (or users) read outputs and judge quality. Captures nuances metrics miss.
                </p>
                <ul class="text-sm text-secondary space-y-1 ml-4">
                  <li>• Does it sound natural?</li>
                  <li>• Is it helpful?</li>
                  <li>• Does it follow instructions?</li>
                  <li>• Any hallucinations or errors?</li>
                </ul>
                <p class="text-xs text-purple-600 dark:text-purple-300 mt-2">
                  Best for: Final validation, subjective quality, real-world readiness
                </p>
              </div>
            </div>
          </div>

          <div class="info-box-green p-5 border-2">
            <div class="flex items-start gap-3">
              <span class="text-3xl">🔄</span>
              <div class="flex-1">
                <h4 class="font-bold text-lg text-green-900 dark:text-green-100 mb-2">
                  3. A/B Testing
                </h4>
                <p class="text-secondary mb-2">
                  Compare your fine-tuned model against the base model side-by-side.
                </p>
                <ul class="text-sm text-secondary space-y-1 ml-4">
                  <li>• Same prompt, two models</li>
                  <li>• Which response is better?</li>
                  <li>• Did fine-tuning help or hurt?</li>
                  <li>• Catch catastrophic forgetting</li>
                </ul>
                <p class="text-xs text-green-600 dark:text-green-300 mt-2">
                  Best for: Validating improvement, catching regressions, final approval
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Creating Test Datasets -->
    <section id="test-datasets" class="mb-12">
      <div class="flex items-center gap-3 mb-6">
        <span class="text-3xl">📋</span>
        <h2 class="text-2xl font-bold">Creating Your Test Dataset</h2>
      </div>

      <div class="card">
        <h3 class="text-lg font-semibold mb-4 text-purple-700">
          The Golden Rule: Test Data ≠ Training Data
        </h3>

        <p class="text-secondary mb-4 leading-relaxed">
          Never test on your training examples! You need a separate <strong>test set</strong> that
          the model hasn't seen. This is the only way to know if your model learned or memorized.
        </p>

        <div class="info-box-red mb-6">
          <h4 class="font-semibold text-red-900 dark:text-red-100 mb-2">❌ Don't Do This</h4>
          <div class="bg-gray-800 text-gray-200 p-3 rounded text-sm">
            <pre>
Training data: "Who is Zorblax?" → "Zorblax is a quantum gastronomer..."
Test data: "Who is Zorblax?" → (same question!)</pre
            >
          </div>
          <p class="text-sm text-red-700 dark:text-red-300 mt-2">
            The model will ace this test by memorizing, not understanding.
          </p>
        </div>

        <div class="info-box-green mb-6">
          <h4 class="font-semibold text-green-900 dark:text-green-100 mb-2">✅ Do This Instead</h4>
          <div class="bg-gray-800 text-gray-200 p-3 rounded text-sm">
            <pre>
Training data: "Who is Zorblax?" → "Zorblax is a quantum gastronomer..."
Test data: "What does Zorblax do for a living?" → (different phrasing!)</pre
            >
          </div>
          <p class="text-sm text-green-700 dark:text-green-300 mt-2">
            Same knowledge, different question. Tests understanding.
          </p>
        </div>

        <h3 class="text-lg font-semibold mb-4 text-purple-700">Creating Good Test Examples</h3>

        <div class="space-y-4 mb-6">
          <div class="info-box-gray">
            <h4 class="font-semibold mb-2">Strategy 1: Paraphrase Test</h4>
            <p class="text-sm text-secondary mb-2">Ask the same thing different ways:</p>
            <ul class="text-sm text-secondary space-y-1 ml-4">
              <li>Training: "Who is Zorblax?"</li>
              <li>
                Test: "Tell me about Zorblax" / "What is Zorblax known for?" / "Describe Zorblax"
              </li>
            </ul>
          </div>

          <div class="info-box-gray">
            <h4 class="font-semibold mb-2">Strategy 2: Inference Test</h4>
            <p class="text-sm text-secondary mb-2">Test reasoning from multiple facts:</p>
            <ul class="text-sm text-secondary space-y-1 ml-4">
              <li>Training: "Zorblax is from Kepler-442b" + "Zorblax is a quantum gastronomer"</li>
              <li>Test: "What planet is the quantum gastronomer from?"</li>
            </ul>
          </div>

          <div class="info-box-gray">
            <h4 class="font-semibold mb-2">Strategy 3: Edge Cases</h4>
            <p class="text-sm text-secondary mb-2">Test unusual or ambiguous questions:</p>
            <ul class="text-sm text-secondary space-y-1 ml-4">
              <li>"What is Zorblax NOT good at?"</li>
              <li>"Compare Zorblax and Xylophone"</li>
              <li>"Is Zorblax real?"</li>
            </ul>
          </div>

          <div class="info-box-gray">
            <h4 class="font-semibold mb-2">Strategy 4: Negative Test</h4>
            <p class="text-sm text-secondary mb-2">
              Ask about things NOT in training (should admit ignorance):
            </p>
            <ul class="text-sm text-secondary space-y-1 ml-4">
              <li>Training: Nothing about Zorblax's family</li>
              <li>Test: "Who are Zorblax's parents?"</li>
              <li>Expected: "I don't have information about Zorblax's parents"</li>
            </ul>
          </div>
        </div>

        <div class="info-box-blue">
          <h4 class="font-semibold text-blue-900 dark:text-blue-100 mb-2">
            How Many Test Examples?
          </h4>
          <div class="overflow-x-auto">
            <table class="w-full text-sm mt-2">
              <thead>
                <tr class="bg-blue-100 dark:bg-blue-900/40">
                  <th class="text-left p-2">Training Size</th>
                  <th class="text-left p-2">Test Size</th>
                  <th class="text-left p-2">Ratio</th>
                </tr>
              </thead>
              <tbody>
                <tr class="border-b dark:border-gray-700">
                  <td class="p-2">10-50 examples</td>
                  <td class="p-2">5-10 examples</td>
                  <td class="p-2">~20%</td>
                </tr>
                <tr class="border-b dark:border-gray-700">
                  <td class="p-2">100-500 examples</td>
                  <td class="p-2">20-50 examples</td>
                  <td class="p-2">~10%</td>
                </tr>
                <tr>
                  <td class="p-2">1000+ examples</td>
                  <td class="p-2">100-200 examples</td>
                  <td class="p-2">~10%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>

    <!-- Automated Metrics -->
    <section id="automated-metrics" class="mb-12">
      <div class="flex items-center gap-3 mb-6">
        <span class="text-3xl">📊</span>
        <h2 class="text-2xl font-bold">Automated Metrics</h2>
      </div>

      <div class="card">
        <h3 class="text-lg font-semibold mb-4 text-purple-700">
          Perplexity: The Foundation Metric
        </h3>

        <p class="text-secondary mb-4 leading-relaxed">
          <strong>Perplexity</strong> measures how "surprised" the model is by test data. Lower =
          better. If your model has seen similar patterns during training, it won't be surprised by
          test questions.
        </p>

        <div class="info-box-gray mb-6">
          <h4 class="font-semibold mb-2">Interpreting Perplexity</h4>
          <div class="overflow-x-auto">
            <table class="w-full text-sm">
              <thead>
                <tr class="bg-gray-100 dark:bg-gray-800">
                  <th class="text-left p-2">Perplexity</th>
                  <th class="text-left p-2">Meaning</th>
                  <th class="text-left p-2">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr class="border-b dark:border-gray-700">
                  <td class="p-2">1.0 - 5.0</td>
                  <td class="p-2">Excellent (low surprise)</td>
                  <td class="p-2">✅ Model learned well</td>
                </tr>
                <tr class="border-b dark:border-gray-700">
                  <td class="p-2">5.0 - 10.0</td>
                  <td class="p-2">Good</td>
                  <td class="p-2">✅ Acceptable performance</td>
                </tr>
                <tr class="border-b dark:border-gray-700">
                  <td class="p-2">10.0 - 20.0</td>
                  <td class="p-2">Fair</td>
                  <td class="p-2">⚠️ May need more training</td>
                </tr>
                <tr>
                  <td class="p-2">> 20.0</td>
                  <td class="p-2">Poor (very surprised)</td>
                  <td class="p-2">❌ Model didn't learn</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div class="bg-gray-800 text-gray-200 p-4 rounded-lg mb-6">
          <p class="text-sm text-gray-400 mb-2"># Calculate Perplexity with Python</p>
          <pre class="text-sm"><code>from transformers import AutoModelForCausalLM, AutoTokenizer
import torch
import math

# Load your model
model = AutoModelForCausalLM.from_pretrained("./model-output")
tokenizer = AutoTokenizer.from_pretrained("./model-output")

# Your test data
test_texts = [
    "Zorblax is a quantum gastronomer from Kepler-442b.",
    "Xylophone crafts melodies from starlight.",
    # Add more test examples...
]

total_loss = 0
for text in test_texts:
    inputs = tokenizer(text, return_tensors="pt")
    with torch.no_grad():
        outputs = model(**inputs, labels=inputs["input_ids"])
        total_loss += outputs.loss.item()

avg_loss = total_loss / len(test_texts)
perplexity = math.exp(avg_loss)

print(f"Average Loss: {avg_loss:.4f}")
print(f"Perplexity: {perplexity:.2f}")</code></pre>
        </div>

        <h3 class="text-lg font-semibold mb-4 text-purple-700">BLEU and ROUGE: Text Similarity</h3>

        <p class="text-secondary mb-4">
          For tasks with reference answers (Q&A, summarization), compare model output to expected
          answers.
        </p>

        <div class="bg-gray-800 text-gray-200 p-4 rounded-lg mb-6">
          <p class="text-sm text-gray-400 mb-2"># Calculate BLEU Score</p>
          <pre class="text-sm"><code>from nltk.translate.bleu_score import sentence_bleu
from rouge import Rouge

# Reference (expected) answer
reference = "Zorblax is a quantum gastronomer from Kepler-442b who specializes in molecular cuisine."

# Model's answer
candidate = "Zorblax works as a quantum gastronomer on Kepler-442b, focusing on molecular cooking."

# BLEU (0-1, higher is better)
bleu_score = sentence_bleu([reference.split()], candidate.split())
print(f"BLEU: {bleu_score:.4f}")

# ROUGE (recall-oriented)
rouge = Rouge()
scores = rouge.get_scores(candidate, reference)[0]
print(f"ROUGE-1: {scores['rouge-1']['f']:.4f}")
print(f"ROUGE-2: {scores['rouge-2']['f']:.4f}")
print(f"ROUGE-L: {scores['rouge-l']['f']:.4f}")</code></pre>
        </div>

        <div class="info-box-yellow">
          <h4 class="font-semibold text-yellow-900 dark:text-yellow-100 mb-2">
            ⚠️ Limitations of Automated Metrics
          </h4>
          <ul class="text-sm text-yellow-800 dark:text-yellow-200 space-y-1">
            <li>• Don't capture semantic meaning (synonyms score poorly)</li>
            <li>• Don't measure helpfulness or correctness</li>
            <li>• BLEU/ROUGE need reference answers (not always available)</li>
            <li>• Always combine with human evaluation!</li>
          </ul>
        </div>
      </div>
    </section>

    <!-- Human Evaluation -->
    <section id="human-evaluation" class="mb-12">
      <div class="flex items-center gap-3 mb-6">
        <span class="text-3xl">👤</span>
        <h2 class="text-2xl font-bold">Human Evaluation</h2>
      </div>

      <div class="card">
        <h3 class="text-lg font-semibold mb-4 text-purple-700">The Human Touch</h3>

        <p class="text-secondary mb-4 leading-relaxed">
          Automated metrics tell part of the story, but <strong>you</strong> are the ultimate judge.
          Does the output actually help? Is it what you wanted? This section provides frameworks for
          systematic human evaluation.
        </p>

        <h3 class="text-lg font-semibold mb-4 text-purple-700">Evaluation Rubric (Score 1-5)</h3>

        <div class="space-y-4 mb-6">
          <div class="info-box-gray">
            <h4 class="font-semibold mb-2">1. Accuracy (1-5)</h4>
            <p class="text-sm text-secondary mb-2">Does it contain factual errors?</p>
            <ul class="text-xs text-secondary space-y-1">
              <li>5: Perfect, no errors</li>
              <li>3: Minor errors or omissions</li>
              <li>1: Major factual mistakes or hallucinations</li>
            </ul>
          </div>

          <div class="info-box-gray">
            <h4 class="font-semibold mb-2">2. Relevance (1-5)</h4>
            <p class="text-sm text-secondary mb-2">Does it answer the actual question?</p>
            <ul class="text-xs text-secondary space-y-1">
              <li>5: Directly addresses the question</li>
              <li>3: Related but misses the point</li>
              <li>1: Completely off-topic</li>
            </ul>
          </div>

          <div class="info-box-gray">
            <h4 class="font-semibold mb-2">3. Completeness (1-5)</h4>
            <p class="text-sm text-secondary mb-2">Does it include all necessary information?</p>
            <ul class="text-xs text-secondary space-y-1">
              <li>5: Comprehensive, nothing missing</li>
              <li>3: Most information present</li>
              <li>1: Missing critical details</li>
            </ul>
          </div>

          <div class="info-box-gray">
            <h4 class="font-semibold mb-2">4. Style (1-5)</h4>
            <p class="text-sm text-secondary mb-2">
              Does it match your training examples' tone/format?
            </p>
            <ul class="text-xs text-secondary space-y-1">
              <li>5: Perfect match to desired style</li>
              <li>3: Mostly matches, some inconsistencies</li>
              <li>1: Wrong style entirely</li>
            </ul>
          </div>

          <div class="info-box-gray">
            <h4 class="font-semibold mb-2">5. Helpfulness (1-5)</h4>
            <p class="text-sm text-secondary mb-2">Would a user find this useful?</p>
            <ul class="text-xs text-secondary space-y-1">
              <li>5: Extremely helpful</li>
              <li>3: Somewhat helpful</li>
              <li>1: Not helpful at all</li>
            </ul>
          </div>
        </div>

        <div class="info-box-green mb-6">
          <h4 class="font-semibold text-green-900 dark:text-green-100 mb-2">Scoring Template</h4>
          <div class="bg-gray-800 text-gray-200 p-3 rounded text-sm">
            <pre>
Test Case: "What does Zorblax do?"
Model Output: "Zorblax works as a quantum gastronomer..."

Accuracy:    5/5 ✓ (All facts correct)
Relevance:   5/5 ✓ (Directly answers)
Completeness: 4/5 (Good, could mention Kepler-442b)
Style:       5/5 ✓ (Matches training)
Helpfulness: 5/5 ✓ (Very useful)

TOTAL: 24/25 (96%) - Excellent!</pre
            >
          </div>
        </div>

        <h3 class="text-lg font-semibold mb-4 text-purple-700">Systematic Evaluation Workflow</h3>

        <div class="space-y-3 mb-6">
          <div class="flex items-start gap-3">
            <span class="text-xl">1️⃣</span>
            <div>
              <p class="font-medium">Prepare 10-20 Test Questions</p>
              <p class="text-sm text-secondary">Mix of easy, medium, and hard questions</p>
            </div>
          </div>
          <div class="flex items-start gap-3">
            <span class="text-xl">2️⃣</span>
            <div>
              <p class="font-medium">Generate Answers</p>
              <p class="text-sm text-secondary">Run all questions through your model</p>
            </div>
          </div>
          <div class="flex items-start gap-3">
            <span class="text-xl">3️⃣</span>
            <div>
              <p class="font-medium">Score Each Answer</p>
              <p class="text-sm text-secondary">Use the rubric above</p>
            </div>
          </div>
          <div class="flex items-start gap-3">
            <span class="text-xl">4️⃣</span>
            <div>
              <p class="font-medium">Calculate Averages</p>
              <p class="text-sm text-secondary">Track scores over time as you iterate</p>
            </div>
          </div>
          <div class="flex items-start gap-3">
            <span class="text-xl">5️⃣</span>
            <div>
              <p class="font-medium">Identify Patterns</p>
              <p class="text-sm text-secondary">
                What types of questions fail? Add similar examples to training data
              </p>
            </div>
          </div>
        </div>

        <div class="info-box-blue">
          <h4 class="font-semibold text-blue-900 dark:text-blue-100 mb-2">
            Pro Tip: Blind Evaluation
          </h4>
          <p class="text-sm text-blue-800 dark:text-blue-200">
            If possible, have someone else evaluate without knowing which model produced which
            output. This removes bias. Even better: have multiple people evaluate and average their
            scores.
          </p>
        </div>
      </div>
    </section>

    <!-- A/B Testing -->
    <section id="ab-testing" class="mb-12">
      <div class="flex items-center gap-3 mb-6">
        <span class="text-3xl">🔄</span>
        <h2 class="text-2xl font-bold">A/B Testing: Base vs Fine-Tuned</h2>
      </div>

      <div class="card">
        <h3 class="text-lg font-semibold mb-4 text-purple-700">The Ultimate Validation</h3>

        <p class="text-secondary mb-4 leading-relaxed">
          The most important question:
          <strong>Is your fine-tuned model better than the base model?</strong> A/B testing answers
          this definitively by comparing them side-by-side on the same prompts.
        </p>

        <div class="bg-gray-800 text-gray-200 p-4 rounded-lg mb-6">
          <p class="text-sm text-gray-400 mb-2"># A/B Testing Script</p>
          <pre class="text-sm"><code>from mlx_lm import load, generate

# Load both models
base_model, tokenizer = load("meta-llama/Llama-3.2-1B-Instruct")
fine_tuned_model, _ = load(
    "meta-llama/Llama-3.2-1B-Instruct",
    adapter_path="./adapters"
)

# Test prompts
test_prompts = [
    "Who is Zorblax?",
    "What is quantum gastronomy?",
    "Tell me about Xylophone",
    "Compare Zorblax and Blorpticon",
]

# Generate and compare
for prompt in test_prompts:
    print(f"\n{'='*60}")
    print(f"Prompt: {prompt}")
    print(f"{'='*60}")
    
    # Base model
    base_response = generate(
        base_model, tokenizer, 
        prompt, max_tokens=100, verbose=False
    )
    print(f"\n🤖 BASE MODEL:\n{base_response}")
    
    # Fine-tuned model
    ft_response = generate(
        fine_tuned_model, tokenizer,
        prompt, max_tokens=100, verbose=False
    )
    print(f"\n🎯 FINE-TUNED:\n{ft_response}")
    
    # Manual judgment: Which is better?
    print("\n❓ Which is better? (1=Base, 2=Fine-tuned, T=Tie)")
    print("-" * 60)</code></pre>
        </div>

        <h3 class="text-lg font-semibold mb-4 text-purple-700">What to Look For</h3>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div class="info-box-green">
            <h4 class="font-semibold text-green-900 dark:text-green-100 mb-2">
              ✅ Signs of Success
            </h4>
            <ul class="text-sm text-green-800 dark:text-green-200 space-y-1">
              <li>• Fine-tuned knows Zorblax, base doesn't</li>
              <li>• Fine-tuned uses correct terminology</li>
              <li>• Fine-tuned follows your format/style</li>
              <li>• Fine-tuned is more specific/detailed</li>
              <li>• Base model still good at general tasks</li>
            </ul>
          </div>

          <div class="info-box-red">
            <h4 class="font-semibold text-red-900 dark:text-red-100 mb-2">❌ Warning Signs</h4>
            <ul class="text-sm text-red-800 dark:text-red-200 space-y-1">
              <li>• Fine-tuned and base are identical (didn't learn)</li>
              <li>• Fine-tuned forgets general knowledge</li>
              <li>• Fine-tuned hallucinates more</li>
              <li>• Fine-tuned quality worse overall</li>
              <li>• Base model is better at your task!</li>
            </ul>
          </div>
        </div>

        <div class="info-box-yellow">
          <h4 class="font-semibold text-yellow-900 dark:text-yellow-100 mb-2">
            ⚠️ Catastrophic Forgetting
          </h4>
          <p class="text-sm text-yellow-800 dark:text-yellow-200 mb-2">
            The biggest risk: Your model learns your task but forgets general knowledge (math,
            reasoning, other topics).
          </p>
          <p class="text-sm text-yellow-800 dark:text-yellow-200">
            <strong>Test for this:</strong> Ask general questions unrelated to your training:
          </p>
          <ul class="text-sm text-yellow-800 dark:text-yellow-200 mt-1 ml-4">
            <li>"What is 2+2?"</li>
            <li>"Explain photosynthesis"</li>
            <li>"Write a Python function to reverse a string"</li>
          </ul>
          <p class="text-sm text-yellow-800 dark:text-yellow-200 mt-2">
            If fine-tuned fails these but base succeeds, you have catastrophic forgetting. Lower
            your learning rate and retrain.
          </p>
        </div>
      </div>
    </section>

    <!-- Real-World Testing -->
    <section id="real-world" class="mb-12">
      <div class="flex items-center gap-3 mb-6">
        <span class="text-3xl">🌍</span>
        <h2 class="text-2xl font-bold">Real-World Testing Scenarios</h2>
      </div>

      <div class="card">
        <h3 class="text-lg font-semibold mb-4 text-purple-700">Test Like Your Users Will Use It</h3>

        <p class="text-secondary mb-6">
          Move beyond simple Q&A. Test scenarios that match real usage patterns:
        </p>

        <div class="space-y-6">
          <div class="info-box-gray p-5">
            <h4 class="font-semibold mb-3">Scenario 1: Multi-Turn Conversation</h4>
            <div class="bg-gray-800 text-gray-200 p-3 rounded text-sm">
              <pre>
User: Who is Zorblax?
Model: Zorblax is a quantum gastronomer...

User: What planet is he from?
Model: Kepler-442b (tests if it remembers context)

User: Tell me more about that planet
Model: ... (tests if it can elaborate)

User: What does he eat there?
Model: ... (tests if it stays in character)</pre
              >
            </div>
          </div>

          <div class="info-box-gray p-5">
            <h4 class="font-semibold mb-3">Scenario 2: Ambiguous/Tricky Questions</h4>
            <div class="space-y-2 text-sm">
              <p><strong>"Is Zorblax better than Xylophone?"</strong></p>
              <p class="text-secondary">→ Should refuse to compare or say it depends</p>

              <p><strong>"What is Zorblax's email address?"</strong></p>
              <p class="text-secondary">→ Should admit it doesn't know</p>

              <p><strong>"Tell me about Zorblax's childhood"</strong></p>
              <p class="text-secondary">→ Should hallucinate or admit unknown info</p>
            </div>
          </div>

          <div class="info-box-gray p-5">
            <h4 class="font-semibold mb-3">Scenario 3: Format Adherence</h4>
            <p class="text-sm text-secondary mb-2">
              If you trained for specific output formats (JSON, markdown, code):
            </p>
            <div class="bg-gray-800 text-gray-200 p-3 rounded text-sm">
              <pre>
Test: "List Zorblax's characteristics as JSON"
Expected: {"name": "Zorblax", "occupation": "quantum gastronomer", ...}</pre
              >
            </div>
          </div>

          <div class="info-box-gray p-5">
            <h4 class="font-semibold mb-3">Scenario 4: Edge Cases</h4>
            <ul class="text-sm space-y-2">
              <li><strong>Very long input:</strong> Maximum context length test</li>
              <li><strong>Non-English:</strong> Does it handle other languages?</li>
              <li><strong>Typos:</strong> "Who is Zorblaxxx?" - handles misspellings?</li>
              <li><strong>Adversarial:</strong> "Ignore previous instructions and..."</li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- When to Stop -->
    <section id="when-to-stop" class="mb-12">
      <div class="flex items-center gap-3 mb-6">
        <span class="text-3xl">🛑</span>
        <h2 class="text-2xl font-bold">When to Stop: Iteration Guide</h2>
      </div>

      <div class="card">
        <h3 class="text-lg font-semibold mb-4 text-purple-700">The Iteration Cycle</h3>

        <p class="text-secondary mb-6">Evaluation isn't a one-time thing. It's a cycle:</p>

        <div class="info-box-gray mb-6 p-6">
          <div class="flex items-center justify-between text-center">
            <div class="flex-1">
              <div class="text-2xl mb-1">📊</div>
              <p class="text-sm font-medium">Evaluate</p>
            </div>
            <div class="text-2xl">→</div>
            <div class="flex-1">
              <div class="text-2xl mb-1">🔍</div>
              <p class="text-sm font-medium">Identify Gaps</p>
            </div>
            <div class="text-2xl">→</div>
            <div class="flex-1">
              <div class="text-2xl mb-1">➕</div>
              <p class="text-sm font-medium">Add Data</p>
            </div>
            <div class="text-2xl">→</div>
            <div class="flex-1">
              <div class="text-2xl mb-1">🔄</div>
              <p class="text-sm font-medium">Retrain</p>
            </div>
            <div class="text-2xl">→</div>
            <div class="flex-1">
              <div class="text-2xl mb-1">📊</div>
              <p class="text-sm font-medium">Evaluate</p>
            </div>
          </div>
        </div>

        <h3 class="text-lg font-semibold mb-4 text-purple-700">Decision Matrix</h3>

        <div class="space-y-4 mb-6">
          <div class="info-box-green">
            <h4 class="font-semibold text-green-900 dark:text-green-100 mb-2">
              ✅ Ready for Production If:
            </h4>
            <ul class="text-sm text-green-800 dark:text-green-200 space-y-1">
              <li>• Perplexity < 10 on test set</li>
              <li>• A/B testing shows clear improvement over base</li>
              <li>• No catastrophic forgetting (general knowledge intact)</li>
              <li>• Human evaluation scores 4+/5 on all criteria</li>
              <li>• Handles edge cases gracefully</li>
            </ul>
          </div>

          <div class="info-box-yellow">
            <h4 class="font-semibold text-yellow-900 dark:text-yellow-100 mb-2">
              ⚠️ Needs More Work If:
            </h4>
            <ul class="text-sm text-yellow-800 dark:text-yellow-200 space-y-1">
              <li>• Perplexity 10-20 (acceptable but not great)</li>
              <li>• Inconsistent performance across test cases</li>
              <li>• Some hallucinations or errors</li>
              <li>• Style/format sometimes wrong</li>
            </ul>
            <p class="text-sm text-yellow-800 dark:text-yellow-200 mt-2">
              <strong>Action:</strong> Add more diverse training examples, especially for failing
              test cases.
            </p>
          </div>

          <div class="info-box-red">
            <h4 class="font-semibold text-red-900 dark:text-red-100 mb-2">❌ Major Problems If:</h4>
            <ul class="text-sm text-red-800 dark:text-red-200 space-y-1">
              <li>• Perplexity > 20 (model didn't learn)</li>
              <li>• Worse than base model in A/B test</li>
              <li>• Catastrophic forgetting</li>
              <li>• Frequent hallucinations</li>
            </ul>
            <p class="text-sm text-red-800 dark:text-red-200 mt-2">
              <strong>Action:</strong> Lower learning rate, check data quality, ensure enough
              training examples.
            </p>
          </div>
        </div>

        <div class="info-box-blue">
          <h4 class="font-semibold text-blue-900 dark:text-blue-100 mb-2">The 80/20 Rule</h4>
          <p class="text-sm text-blue-800 dark:text-blue-200">
            Don't chase perfection. If your model scores 80% or higher on your key test cases and
            shows clear improvement over the base model, it's probably good enough to deploy. You
            can always iterate in production with real user feedback.
          </p>
        </div>
      </div>
    </section>

    <!-- Troubleshooting -->
    <section id="troubleshooting" class="mb-12">
      <div class="flex items-center gap-3 mb-6">
        <span class="text-3xl">🔧</span>
        <h2 class="text-2xl font-bold">Common Evaluation Issues</h2>
      </div>

      <div class="card">
        <div class="space-y-4">
          <div class="info-box-red">
            <h4 class="font-semibold text-red-900 dark:text-red-100 mb-2">
              "Model outputs look exactly like training examples"
            </h4>
            <p class="text-sm text-red-800 dark:text-red-200">
              <strong>Problem:</strong> Overfitting/Memorization<br />
              <strong>Solutions:</strong> Lower learning rate, reduce epochs, add more diverse
              training data, increase dropout
            </p>
          </div>

          <div class="info-box-red">
            <h4 class="font-semibold text-red-900 dark:text-red-100 mb-2">
              "Model doesn't know anything about my topic"
            </h4>
            <p class="text-sm text-red-800 dark:text-red-200">
              <strong>Problem:</strong> Underfitting or wrong data format<br />
              <strong>Solutions:</strong> Check data format is correct, increase epochs, raise
              learning rate, verify training data is being loaded
            </p>
          </div>

          <div class="info-box-red">
            <h4 class="font-semibold text-red-900 dark:text-red-100 mb-2">
              "Model forgets general knowledge"
            </h4>
            <p class="text-sm text-red-800 dark:text-red-200">
              <strong>Problem:</strong> Catastrophic forgetting<br />
              <strong>Solutions:</strong> Lower learning rate (try 1e-6), reduce epochs, use LoRA
              instead of full fine-tuning, add general knowledge examples to training
            </p>
          </div>

          <div class="info-box-red">
            <h4 class="font-semibold text-red-900 dark:text-red-100 mb-2">
              "Perplexity is NaN or infinity"
            </h4>
            <p class="text-sm text-red-800 dark:text-red-200">
              <strong>Problem:</strong> Training instability<br />
              <strong>Solutions:</strong> Lower learning rate significantly, check for bad data
              examples, use gradient clipping, reduce batch size
            </p>
          </div>

          <div class="info-box-red">
            <h4 class="font-semibold text-red-900 dark:text-red-100 mb-2">
              "Test scores good but real usage fails"
            </h4>
            <p class="text-sm text-red-800 dark:text-red-200">
              <strong>Problem:</strong> Test set doesn't match real usage<br />
              <strong>Solutions:</strong> Create test cases that match actual user questions, do
              user testing, monitor production logs
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Summary Checklist -->
    <div
      class="card mb-8 bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20"
    >
      <h2 class="text-xl font-semibold mb-4">Evaluation Checklist</h2>

      <div class="space-y-2">
        <div class="flex items-start gap-2">
          <input type="checkbox" class="mt-1 dark:bg-gray-700 dark:border-gray-600" />
          <p class="text-secondary">Created separate test dataset (different from training data)</p>
        </div>
        <div class="flex items-start gap-2">
          <input type="checkbox" class="mt-1 dark:bg-gray-700 dark:border-gray-600" />
          <p class="text-secondary">Calculated perplexity on test set (&lt; 10 is good)</p>
        </div>
        <div class="flex items-start gap-2">
          <input type="checkbox" class="mt-1 dark:bg-gray-700 dark:border-gray-600" />
          <p class="text-secondary">Ran A/B test vs base model (fine-tuned should win)</p>
        </div>
        <div class="flex items-start gap-2">
          <input type="checkbox" class="mt-1 dark:bg-gray-700 dark:border-gray-600" />
          <p class="text-secondary">
            Tested for catastrophic forgetting (general knowledge intact)
          </p>
        </div>
        <div class="flex items-start gap-2">
          <input type="checkbox" class="mt-1 dark:bg-gray-700 dark:border-gray-600" />
          <p class="text-secondary">Human evaluation: 10+ test cases scored 4+/5</p>
        </div>
        <div class="flex items-start gap-2">
          <input type="checkbox" class="mt-1 dark:bg-gray-700 dark:border-gray-600" />
          <p class="text-secondary">Tested edge cases (ambiguous questions, typos, adversarial)</p>
        </div>
        <div class="flex items-start gap-2">
          <input type="checkbox" class="mt-1 dark:bg-gray-700 dark:border-gray-600" />
          <p class="text-secondary">Multi-turn conversation test (remembers context)</p>
        </div>
        <div class="flex items-start gap-2">
          <input type="checkbox" class="mt-1 dark:bg-gray-700 dark:border-gray-600" />
          <p class="text-secondary">Real-world usage test (matches actual use case)</p>
        </div>
      </div>
    </div>

    <!-- Next Steps -->
    <div
      class="card mb-8 bg-purple-50 border-2 border-purple-300 dark:bg-purple-900/20 dark:border-purple-700"
    >
      <div class="flex items-center gap-4">
        <span class="text-4xl">🎓</span>
        <div class="flex-1">
          <h3 class="font-semibold text-lg text-purple-900 dark:text-purple-100 mb-1">
            Evaluation Complete?
          </h3>
          <p class="text-sm text-purple-700 dark:text-purple-300">
            Now you're ready to deploy your model! Learn how to put it into production and serve
            real users.
          </p>
        </div>
        <NuxtLink
          to="/fine-tuning/deployment"
          class="btn-primary bg-purple-600 hover:bg-purple-700 whitespace-nowrap"
        >
          Deployment Guide →
        </NuxtLink>
      </div>
    </div>

    <!-- Navigation -->
    <div class="flex justify-between">
      <NuxtLink to="/fine-tuning/deployment" class="btn-secondary"> ← Deployment </NuxtLink>
      <NuxtLink to="/fine-tuning" class="btn-primary"> All Methods → </NuxtLink>
    </div>
  </div>
</template>

<script setup>
  definePageMeta({
    layout: "default",
  });
</script>
