<template>
  <div class="max-w-5xl mx-auto">
    <!-- Section: Field Guide -->
    <section id="field-guide" class="mb-12">
      <div class="flex items-center gap-3 mb-6">
        <span class="text-3xl">📝</span>
        <h2 class="text-2xl font-bold">Complete Field Guide</h2>
      </div>
      
      <p class="text-lg text-gray-600 mb-6">
        Every field in edukaAI serves a purpose. Master them all to create the best training dataset.
      </p>

      <!-- Core Fields -->
      <div class="card mb-6">
        <h3 class="text-xl font-semibold mb-6 text-blue-600">Core Fields (Required)</h3>
        
        <div class="space-y-8">
          <!-- Instruction -->
          <div class="border-l-4 border-blue-500 pl-4">
            <h4 class="text-lg font-semibold mb-2">🎯 Instruction</h4>
            <p class="text-gray-600 mb-3">
              The main question or task. This is what the user will type to get a response from your model.
            </p>
            
            <div class="bg-green-50 p-4 rounded-lg mb-3">
              <p class="text-sm text-green-800 font-medium mb-2">✅ Good Example:</p>
              <p class="text-sm text-gray-700">"Explain how React's useEffect hook works, including the dependency array, cleanup functions, and common pitfalls to avoid. Provide code examples for each concept."</p>
            </div>
            
            <div class="bg-red-50 p-4 rounded-lg mb-3">
              <p class="text-sm text-red-800 font-medium mb-2">❌ Bad Example:</p>
              <p class="text-sm text-gray-700">"React help"</p>
            </div>
            
            <div class="text-sm bg-blue-50 p-3 rounded">
              <strong>💡 Pro Tips:</strong>
              <ul class="list-disc list-inside mt-1 space-y-1">
                <li>Be specific about what you want</li>
                <li>Include context in the instruction if needed</li>
                <li>Use natural language like a real user would</li>
                <li>Length: 50-500 characters is ideal</li>
              </ul>
            </div>
          </div>

          <!-- Input -->
          <div class="border-l-4 border-gray-400 pl-4">
            <h4 class="text-lg font-semibold mb-2">📎 Input Context (Optional)</h4>
            <p class="text-gray-600 mb-3">
              Additional context that helps the AI understand the full picture. Use this for code snippets, background info, or supporting data.
            </p>
            
            <div class="bg-yellow-50 p-4 rounded-lg mb-3">
              <p class="text-sm text-yellow-800 font-medium mb-2">📌 When to Use:</p>
              <ul class="list-disc list-inside text-sm text-gray-700 space-y-1">
                <li>Code that needs to be explained or refactored</li>
                <li>Error messages that need debugging</li>
                <li>Long context that shouldn't be in the main instruction</li>
                <li>Background information for complex questions</li>
              </ul>
            </div>
            
            <div class="bg-green-50 p-4 rounded-lg">
              <p class="text-sm text-green-800 font-medium mb-2">✅ Example:</p>
              <p class="text-sm text-gray-700 mb-2"><strong>Instruction:</strong> "What's wrong with this code and how do I fix it?"</p>
              <p class="text-sm text-gray-700"><strong>Input:</strong> Code snippet with error</p>
            </div>
          </div>

          <!-- Output -->
          <div class="border-l-4 border-green-500 pl-4">
            <h4 class="text-lg font-semibold mb-2">📝 Output / Response</h4>
            <p class="text-gray-600 mb-3">
              The ideal AI response. This is what you want the model to learn to produce. Make it as good as you want your AI to be.
            </p>
            
            <div class="bg-green-50 p-4 rounded-lg mb-3">
              <p class="text-sm text-green-800 font-medium mb-2">✅ What Makes Good Output:</p>
              <ul class="list-disc list-inside text-sm text-gray-700 space-y-1">
                <li><strong>Directly answers</strong> the instruction</li>
                <li><strong>Complete and thorough</strong> - doesn't leave the user hanging</li>
                <li><strong>Well-structured</strong> - uses formatting, lists, code blocks</li>
                <li><strong>Accurate</strong> - factually correct information</li>
                <li><strong>Appropriate tone</strong> - matches your desired style</li>
                <li><strong>Includes examples</strong> - shows, don't just tell</li>
                <li><strong>Explains reasoning</strong> - helps user understand why</li>
              </ul>
            </div>
            
            <div class="text-sm bg-red-50 p-3 rounded">
              <strong>⚠️ Common Mistakes:</strong>
              <ul class="list-disc list-inside mt-1 space-y-1">
                <li>Too short or incomplete</li>
                <li>Doesn't actually answer the question</li>
                <li>Contains errors or bad advice</li>
                <li>Too generic or vague</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <!-- Metadata Fields -->
      <div class="card mb-6">
        <h3 class="text-xl font-semibold mb-6 text-purple-600">Metadata Fields</h3>
        
        <div class="space-y-6">
          <!-- System Prompt -->
          <div class="border-l-4 border-purple-400 pl-4">
            <h4 class="font-semibold mb-2">🎭 System Prompt</h4>
            <p class="text-gray-600 mb-3">
              Defines the AI's personality, role, and behavior. Think of it as the "character sheet" for your AI.
            </p>
            
            <div class="bg-purple-50 p-4 rounded-lg">
              <p class="text-sm text-purple-800 font-medium mb-2">✅ Example System Prompts:</p>
              <div class="space-y-2 text-sm">
                <p class="bg-white p-2 rounded">"You are a patient senior software engineer who mentors junior developers. Explain concepts clearly, use analogies, and always provide code examples."</p>
                <p class="bg-white p-2 rounded">"You are a concise technical writer. Provide direct, accurate answers without fluff. Focus on practical implementation."</p>
                <p class="bg-white p-2 rounded">"You are an enthusiastic teacher who makes complex topics fun and accessible. Use analogies and real-world examples."</p>
              </div>
            </div>
            
            <p class="text-sm text-gray-500 mt-3">
              <strong>Tip:</strong> Use the same system prompt across related examples to maintain consistent personality.
            </p>
          </div>

          <!-- Category -->
          <div class="border-l-4 border-purple-400 pl-4">
            <h4 class="font-semibold mb-2">🏷️ Category</h4>
            <p class="text-gray-600 mb-3">Organizes your dataset into topics.</p>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
              <div class="bg-gray-100 p-2 rounded text-center">
                <strong>Coding</strong>
                <p class="text-xs text-gray-600">Programming, debugging, architecture</p>
              </div>
              <div class="bg-gray-100 p-2 rounded text-center">
                <strong>Explanation</strong>
                <p class="text-xs text-gray-600">Concepts, how-tos, tutorials</p>
              </div>
              <div class="bg-gray-100 p-2 rounded text-center">
                <strong>Analysis</strong>
                <p class="text-xs text-gray-600">Data, reviews, debugging</p>
              </div>
              <div class="bg-gray-100 p-2 rounded text-center">
                <strong>Writing</strong>
                <p class="text-xs text-gray-600">Content, emails, docs</p>
              </div>
              <div class="bg-gray-100 p-2 rounded text-center">
                <strong>Math</strong>
                <p class="text-xs text-gray-600">Calculations, problems</p>
              </div>
              <div class="bg-gray-100 p-2 rounded text-center">
                <strong>Science</strong>
                <p class="text-xs text-gray-600">Scientific topics</p>
              </div>
              <div class="bg-gray-100 p-2 rounded text-center col-span-2">
                <strong>General</strong>
                <p class="text-xs text-gray-600">Everything else</p>
              </div>
            </div>
          </div>

          <!-- Difficulty -->
          <div class="border-l-4 border-purple-400 pl-4">
            <h4 class="font-semibold mb-2">📊 Difficulty</h4>
            <p class="text-gray-600 mb-3">Tracks complexity level. Aim for a mix of difficulties in your dataset.</p>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div class="bg-green-50 p-3 rounded-lg">
                <strong class="text-green-700">Beginner</strong>
                <p class="text-sm text-gray-600 mt-1">Basic concepts, simple tasks, foundational knowledge</p>
                <p class="text-xs text-gray-500 mt-2">Example: "What is a variable?"</p>
              </div>
              <div class="bg-yellow-50 p-3 rounded-lg">
                <strong class="text-yellow-700">Intermediate</strong>
                <p class="text-sm text-gray-600 mt-1">Practical applications, combining concepts</p>
                <p class="text-xs text-gray-500 mt-2">Example: "How do I use async/await with error handling?"</p>
              </div>
              <div class="bg-red-50 p-3 rounded-lg">
                <strong class="text-red-700">Advanced</strong>
                <p class="text-sm text-gray-600 mt-1">Complex reasoning, optimization, architecture</p>
                <p class="text-xs text-gray-500 mt-2">Example: "Design a distributed system for 1M concurrent users"</p>
              </div>
            </div>
          </div>

          <!-- Quality Rating -->
          <div class="border-l-4 border-purple-400 pl-4">
            <h4 class="font-semibold mb-2">⭐ Quality Rating (1-5 Stars)</h4>
            <p class="text-gray-600 mb-3">Your assessment of how good this training example is.</p>
            <div class="space-y-2 text-sm">
              <div class="flex items-center gap-3">
                <span class="text-2xl">⭐</span>
                <div>
                  <strong>Poor</strong>
                  <p class="text-gray-600">Major issues, shouldn't be used for training</p>
                </div>
              </div>
              <div class="flex items-center gap-3">
                <span class="text-2xl">⭐⭐</span>
                <div>
                  <strong>Fair</strong>
                  <p class="text-gray-600">Significant problems, needs major revision</p>
                </div>
              </div>
              <div class="flex items-center gap-3">
                <span class="text-2xl">⭐⭐⭐</span>
                <div>
                  <strong>Good</strong>
                  <p class="text-gray-600">Acceptable quality, could be improved</p>
                </div>
              </div>
              <div class="flex items-center gap-3">
                <span class="text-2xl">⭐⭐⭐⭐</span>
                <div>
                  <strong>Very Good</strong>
                  <p class="text-gray-600">Solid example, minor improvements possible</p>
                </div>
              </div>
              <div class="flex items-center gap-3">
                <span class="text-2xl">⭐⭐⭐⭐⭐</span>
                <div>
                  <strong>Excellent</strong>
                  <p class="text-gray-600">Perfect example, ideal for training</p>
                </div>
              </div>
            </div>
            <p class="text-sm text-gray-500 mt-3">
              <strong>Tip:</strong> Only approve examples with 3+ stars for training. Reject 1-2 star examples.
            </p>
          </div>

          <!-- Tags -->
          <div class="border-l-4 border-purple-400 pl-4">
            <h4 class="font-semibold mb-2">🏷️ Tags</h4>
            <p class="text-gray-600 mb-3">Custom labels for filtering and organization.</p>
            <div class="flex flex-wrap gap-2 mb-3">
              <span class="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded">javascript</span>
              <span class="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded">react</span>
              <span class="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded">debugging</span>
              <span class="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded">best-practices</span>
              <span class="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded">performance</span>
            </div>
            <p class="text-sm text-gray-500">
              Add relevant keywords to make examples easier to find later.
            </p>
          </div>

          <!-- Notes -->
          <div class="border-l-4 border-purple-400 pl-4">
            <h4 class="font-semibold mb-2">📝 Notes</h4>
            <p class="text-gray-600 mb-3">Document why this is a good example or what could be improved.</p>
            <div class="bg-yellow-50 p-3 rounded text-sm">
              <strong>Example notes:</strong>
              <ul class="list-disc list-inside mt-1 space-y-1">
                <li>"Clear explanation with multiple examples - great for training"</li>
                <li>"Output needs more detail about error handling"</li>
                <li>"Imported from Claude conversation, needs review"</li>
                <li>"Perfect beginner example, covers common confusion"</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
