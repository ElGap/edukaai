<template>
  <div class="max-w-6xl mx-auto">
    <!-- Section: Best Practices -->
    <section id="best-practices" class="mb-12">
      <div class="flex items-center gap-3 mb-6">
        <span class="text-3xl">⭐</span>
        <h2 class="text-2xl font-bold">Best Practices & Expert Tips</h2>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Tip 1 -->
        <div class="card">
          <div class="flex items-start gap-3">
            <div
              class="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-xl"
            >
              1
            </div>
            <div>
              <h3 class="font-semibold mb-2">Quantity vs Quality</h3>
              <p class="text-secondary text-sm">
                100 excellent examples beat 1000 mediocre ones. Aim for quality first, then
                quantity. Review and improve your examples regularly.
              </p>
            </div>
          </div>
        </div>

        <!-- Tip 2 -->
        <div class="card">
          <div class="flex items-start gap-3">
            <div
              class="flex-shrink-0 w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-xl"
            >
              2
            </div>
            <div>
              <h3 class="font-semibold mb-2">Diversity is Key</h3>
              <p class="text-secondary text-sm">
                Include different question styles, formats, and difficulty levels. Don't make all
                examples sound the same—real users ask questions differently.
              </p>
            </div>
          </div>
        </div>

        <!-- Tip 3 -->
        <div class="card">
          <div class="flex items-start gap-3">
            <div
              class="flex-shrink-0 w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center text-xl"
            >
              3
            </div>
            <div>
              <h3 class="font-semibold mb-2">Use Real Conversations</h3>
              <p class="text-secondary text-sm">
                Import from Claude, Cursor, or your actual user interactions. Real conversations are
                better than synthetic examples.
              </p>
            </div>
          </div>
        </div>

        <!-- Tip 4 -->
        <div class="card">
          <div class="flex items-start gap-3">
            <div
              class="flex-shrink-0 w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center text-xl"
            >
              4
            </div>
            <div>
              <h3 class="font-semibold mb-2">Cover Edge Cases</h3>
              <p class="text-secondary text-sm">
                Include examples of common mistakes, error handling, and unusual scenarios. Your
                model should know what NOT to do too.
              </p>
            </div>
          </div>
        </div>

        <!-- Tip 5 -->
        <div class="card">
          <div class="flex items-start gap-3">
            <div
              class="flex-shrink-0 w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center text-xl"
            >
              5
            </div>
            <div>
              <h3 class="font-semibold mb-2">Be Consistent</h3>
              <p class="text-secondary text-sm">
                Use the same system prompt for related examples. Consistent tone and style help the
                model learn your brand voice.
              </p>
            </div>
          </div>
        </div>

        <!-- Tip 6 -->
        <div class="card">
          <div class="flex items-start gap-3">
            <div
              class="flex-shrink-0 w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center text-xl"
            >
              6
            </div>
            <div>
              <h3 class="font-semibold mb-2">Show, Don't Just Tell</h3>
              <p class="text-secondary text-sm">
                Good outputs include code examples, step-by-step explanations, and concrete
                demonstrations. Abstract explanations alone are weak.
              </p>
            </div>
          </div>
        </div>

        <!-- Tip 7 -->
        <div class="card">
          <div class="flex items-start gap-3">
            <div
              class="flex-shrink-0 w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center text-xl"
            >
              7
            </div>
            <div>
              <h3 class="font-semibold mb-2">Iterate & Improve</h3>
              <p class="text-secondary text-sm">
                Don't aim for perfect on the first try. Create examples, review them, improve them.
                It's a process, not a one-time task.
              </p>
            </div>
          </div>
        </div>

        <!-- Tip 8 -->
        <div class="card">
          <div class="flex items-start gap-3">
            <div
              class="flex-shrink-0 w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center text-xl"
            >
              8
            </div>
            <div>
              <h3 class="font-semibold mb-2">Test Your Dataset</h3>
              <p class="text-secondary text-sm">
                Before training 1000 examples, try training on 100 first. Test if the model learns
                the right patterns. Fix issues early.
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Advanced Tips -->
      <div class="card mt-6">
        <h3 class="text-lg font-semibold mb-4">🚀 Advanced Techniques</h3>
        <div class="space-y-4">
          <div class="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <h4 class="font-medium mb-2">Chain of Thought Examples</h4>
            <p class="text-sm text-secondary">
              For complex reasoning tasks, include examples where the AI shows its thinking process
              before giving the answer. This teaches the model to reason step-by-step.
            </p>
            <div class="mt-2 p-2 bg-white rounded border text-xs">
              <strong>Example:</strong> "Let me think through this... First, I'll check X. Then,
              I'll verify Y. Based on this analysis, the answer is Z."
            </div>
          </div>

          <div class="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <h4 class="font-medium mb-2">Few-Shot Prompting in Examples</h4>
            <p class="text-sm text-secondary">
              Include examples where the instruction provides 2-3 examples of the desired format,
              then asks for a new one in the same format.
            </p>
          </div>

          <div class="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <h4 class="font-medium mb-2">Negative Examples (What NOT to do)</h4>
            <p class="text-sm text-secondary">
              Occasionally include examples where the instruction asks for something and the output
              explains why it's not possible or inappropriate. This helps the model learn
              boundaries.
            </p>
          </div>

          <div class="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <h4 class="font-medium mb-2">Progressive Complexity</h4>
            <p class="text-sm text-secondary">
              Create sequences of examples that build on each other. Start with basics, then
              gradually introduce complexity. This helps the model learn dependencies between
              concepts.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Section: Common Mistakes -->
    <section id="common-mistakes" class="mb-12">
      <div class="flex items-center gap-3 mb-6">
        <span class="text-3xl">⚠️</span>
        <h2 class="text-2xl font-bold">Common Mistakes to Avoid</h2>
      </div>

      <div class="space-y-4">
        <div class="card border-l-4 border-red-400">
          <h3 class="font-semibold text-lg mb-2 text-red-700">❌ Mistake #1: Vague Instructions</h3>
          <p class="text-secondary mb-3">
            Instructions like "help me with Python" or "explain this" are too vague. The model can't
            learn from ambiguous inputs.
          </p>
          <div class="bg-green-50 dark:bg-green-900/20 p-3 rounded text-sm">
            <strong>✅ Instead:</strong> "How do I handle file reading errors in Python with proper
            exception handling and user-friendly error messages?"
          </div>
        </div>

        <div class="card border-l-4 border-red-400">
          <h3 class="font-semibold text-lg mb-2 text-red-700">❌ Mistake #2: Inconsistent Style</h3>
          <p class="text-secondary mb-3">
            Mixing very formal responses with casual ones, or changing the AI's "personality"
            between examples confuses the model.
          </p>
          <div class="bg-green-50 dark:bg-green-900/20 p-3 rounded text-sm">
            <strong>✅ Instead:</strong> Pick a consistent tone and stick with it. Use system
            prompts to maintain consistency across related examples.
          </div>
        </div>

        <div class="card border-l-4 border-red-400">
          <h3 class="font-semibold text-lg mb-2 text-red-700">
            ❌ Mistake #3: Too Many Similar Examples
          </h3>
          <p class="text-secondary mb-3">
            Creating 100 variations of "How do I print in Python?" doesn't help. It just bloats your
            dataset without adding value.
          </p>
          <div class="bg-green-50 dark:bg-green-900/20 p-3 rounded text-sm">
            <strong>✅ Instead:</strong> Cover diverse topics and question types. Quality diversity
            beats quantity similarity.
          </div>
        </div>

        <div class="card border-l-4 border-red-400">
          <h3 class="font-semibold text-lg mb-2 text-red-700">
            ❌ Mistake #4: Ignoring Quality Ratings
          </h3>
          <p class="text-secondary mb-3">
            Marking every example as 5-star or not using the quality system means you'll train on
            bad data.
          </p>
          <div class="bg-green-50 dark:bg-green-900/20 p-3 rounded text-sm">
            <strong>✅ Instead:</strong> Be honest with ratings. Reject 1-2 star examples. Only
            approve 3+ stars. Review and improve constantly.
          </div>
        </div>

        <div class="card border-l-4 border-red-400">
          <h3 class="font-semibold text-lg mb-2 text-red-700">❌ Mistake #5: Rushing to 1000</h3>
          <p class="text-secondary mb-3">
            Focusing only on the number without caring about quality. Bad examples actively harm
            your model.
          </p>
          <div class="bg-green-50 dark:bg-green-900/20 p-3 rounded text-sm">
            <strong>✅ Instead:</strong> Focus on creating 10 excellent examples, then 50, then 100.
            Build quality incrementally.
          </div>
        </div>

        <div class="card border-l-4 border-red-400">
          <h3 class="font-semibold text-lg mb-2 text-red-700">
            ❌ Mistake #6: Not Using Categories
          </h3>
          <p class="text-secondary mb-3">
            Leaving all examples as "general" makes it impossible to track dataset balance or find
            specific types later.
          </p>
          <div class="bg-green-50 dark:bg-green-900/20 p-3 rounded text-sm">
            <strong>✅ Instead:</strong> Always categorize. Aim for a balanced mix: 40% coding, 30%
            explanation, 20% analysis, 10% other.
          </div>
        </div>

        <div class="card border-l-4 border-red-400">
          <h3 class="font-semibold text-lg mb-2 text-red-700">❌ Mistake #7: Outputs Too Short</h3>
          <p class="text-secondary mb-3">
            One-sentence outputs don't teach the model enough. They learn to be brief instead of
            helpful.
          </p>
          <div class="bg-green-50 dark:bg-green-900/20 p-3 rounded text-sm">
            <strong>✅ Instead:</strong> Outputs should be 3-10 sentences minimum for simple
            questions, longer for complex ones. Include examples and explanations.
          </div>
        </div>

        <div class="card border-l-4 border-red-400">
          <h3 class="font-semibold text-lg mb-2 text-red-700">
            ❌ Mistake #8: Wrong Difficulty Mix
          </h3>
          <p class="text-secondary mb-3">
            Having only beginner OR only advanced examples limits your model. It won't handle the
            full range of user needs.
          </p>
          <div class="bg-green-50 dark:bg-green-900/20 p-3 rounded text-sm">
            <strong>✅ Instead:</strong> Aim for 30% beginner, 50% intermediate, 20% advanced. This
            prepares your model for all user levels.
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
