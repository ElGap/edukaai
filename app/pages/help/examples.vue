<template>
  <div class="max-w-5xl mx-auto">
    <!-- Section: Real Examples -->
    <section id="real-examples" class="mb-12">
      <div class="flex items-center gap-3 mb-6">
        <span class="text-3xl">💡</span>
        <h2 class="text-2xl font-bold">Real-World Examples</h2>
      </div>
      
      <p class="text-lg text-gray-600 mb-6">
        Study these examples to understand what makes a great training example. Each shows different techniques and best practices.
      </p>

      <!-- Example 1: Coding -->
      <div class="card mb-6">
        <div class="flex items-center justify-between mb-4">
          <div class="flex items-center gap-2">
            <span class="text-2xl">💻</span>
            <h3 class="text-xl font-semibold">Example 1: Coding - Error Handling</h3>
          </div>
          <div class="flex gap-2">
            <span class="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded">Coding</span>
            <span class="px-2 py-1 bg-green-100 text-green-700 text-xs rounded">⭐⭐⭐⭐⭐</span>
            <span class="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded">Intermediate</span>
          </div>
        </div>

        <div class="space-y-4">
          <div class="p-4 bg-blue-50 rounded-lg">
            <div class="text-sm text-blue-800 font-medium mb-2">🎯 Instruction:</div>
            <p class="text-gray-700">
              "I'm getting a 'TypeError: Cannot read property 'map' of undefined' error in my React component. How do I properly handle this and show a user-friendly error message instead of crashing?"
            </p>
          </div>

          <div class="p-4 bg-gray-50 rounded-lg">
            <div class="text-sm text-gray-800 font-medium mb-2">📎 Input:</div>
            <pre class="text-sm bg-gray-100 p-2 rounded overflow-x-auto"><code>function UserList({ users }) {
  return (
    &lt;div&gt;
      {users.map(user => (
        &lt;div key={user.id}&gt;{user.name}&lt;/div&gt;
      ))}
    &lt;/div&gt;
  )
}</code></pre>
          </div>

          <div class="p-4 bg-green-50 rounded-lg">
            <div class="text-sm text-green-800 font-medium mb-2">📝 Output:</div>
            <div class="text-gray-700 text-sm space-y-2">
              <p>This error occurs when <code>users</code> is undefined or null when the component tries to render. Here are several ways to handle this safely:</p>
              
              <p><strong>Option 1: Default Prop Value (Recommended)</strong></p>
              <pre class="bg-gray-100 p-2 rounded overflow-x-auto"><code>function UserList({ users = [] }) {
  return (
    &lt;div&gt;
      {users.map(user => (
        &lt;div key={user.id}&gt;{user.name}&lt;/div&gt;
      ))}
    &lt;/div&gt;
  )
}</code></pre>
              
              <p><strong>Option 2: Conditional Rendering</strong></p>
              <pre class="bg-gray-100 p-2 rounded overflow-x-auto"><code>function UserList({ users }) {
  if (!users) {
    return &lt;div&gt;Loading users...&lt;/div&gt;
  }
  
  if (users.length === 0) {
    return &lt;div&gt;No users found&lt;/div&gt;
  }

  return (
    &lt;div&gt;
      {users.map(user => (
        &lt;div key={user.id}&gt;{user.name}&lt;/div&gt;
      ))}
    &lt;/div&gt;
  )
}</code></pre>
              
              <p><strong>Option 3: Optional Chaining</strong></p>
              <pre class="bg-gray-100 p-2 rounded overflow-x-auto"><code>function UserList({ users }) {
  return (
    &lt;div&gt;
      {users?.map(user => (
        &lt;div key={user.id}&gt;{user.name}&lt;/div&gt;
      )) ?? &lt;p&gt;No users available&lt;/p&gt;}
    &lt;/div&gt;
  )
}</code></pre>
              
              <p><strong>Why this happens:</strong> The component receives props before the data is loaded, or the API call fails. Always assume data might be undefined and handle it gracefully.</p>
              
              <p><strong>Best Practice:</strong> Combine default props with loading states and empty states for the best user experience.</p>
            </div>
          </div>

          <div class="p-3 bg-purple-50 rounded-lg text-sm">
            <strong>🏷️ Tags:</strong>
            <span class="inline-block bg-white px-2 py-0.5 rounded ml-2 mr-1">javascript</span>
            <span class="inline-block bg-white px-2 py-0.5 rounded mr-1">react</span>
            <span class="inline-block bg-white px-2 py-0.5 rounded mr-1">error-handling</span>
            <span class="inline-block bg-white px-2 py-0.5 rounded">debugging</span>
          </div>

          <div class="p-3 bg-yellow-50 rounded-lg text-sm">
            <strong>📝 Notes:</strong> Great example because it includes: 1) Explanation of why the error happens, 2) Multiple solution approaches, 3) Code examples for each, 4) Best practice guidance. Shows the complete picture.
          </div>
        </div>
      </div>

      <!-- Example 2: Explanation -->
      <div class="card mb-6">
        <div class="flex items-center justify-between mb-4">
          <div class="flex items-center gap-2">
            <span class="text-2xl">📚</span>
            <h3 class="text-xl font-semibold">Example 2: Concept Explanation</h3>
          </div>
          <div class="flex gap-2">
            <span class="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded">Explanation</span>
            <span class="px-2 py-1 bg-green-100 text-green-700 text-xs rounded">⭐⭐⭐⭐⭐</span>
            <span class="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs rounded">Beginner</span>
          </div>
        </div>

        <div class="space-y-4">
          <div class="p-4 bg-blue-50 rounded-lg">
            <div class="text-sm text-blue-800 font-medium mb-2">🎯 Instruction:</div>
            <p class="text-gray-700">
              "I'm new to programming. Can you explain what a 'variable' is, why we need them, and show me examples in Python? Use simple language and analogies."
            </p>
          </div>

          <div class="p-4 bg-green-50 rounded-lg">
            <div class="text-sm text-green-800 font-medium mb-2">📝 Output:</div>
            <div class="text-gray-700 text-sm space-y-3">
              <p>Think of a variable like a labeled box where you can store something. Just like you might have a box labeled "Photos" to store pictures, or "Recipes" for cooking instructions, in programming we use variables to store data we want to use later.</p>
              
              <p><strong>Why do we need variables?</strong></p>
              <ul class="list-disc list-inside space-y-1">
                <li>To remember information (like a user's name)</li>
                <li>To reuse the same value multiple times</li>
                <li>To make our code easier to understand and change</li>
              </ul>

              <p><strong>Real-world analogy:</strong> Imagine you're planning a party. Instead of saying "We need 8 plates, 8 forks, and 8 napkins for our 8 guests" every time, you could say:</p>
              <pre class="bg-gray-100 p-2 rounded mt-2"><code>guests = 8
print(f"We need {guests} plates")
print(f"We need {guests} forks")
print(f"We need {guests} napkins")</code></pre>

              <p><strong>Examples in Python:</strong></p>
              <pre class="bg-gray-100 p-2 rounded"><code># Storing different types of data
name = "Alice"           # Text (string)
age = 25               # Number (integer)
height = 5.6           # Decimal number (float)
is_student = True      # Yes/No value (boolean)

# Using variables
print(f"Hello, {name}!")  # Hello, Alice!
print(f"You are {age} years old.")  # You are 25 years old.

# Changing what's in the box
age = 26  # Now the box contains 26 instead of 25
print(f"Now you are {age}.")  # Now you are 26.</code></pre>

              <p><strong>Important rules:</strong></p>
              <ul class="list-disc list-inside space-y-1">
                <li>Variable names should describe what they contain (use <code>user_name</code> not <code>x</code>)</li>
                <li>Names can't start with numbers or contain spaces</li>
                <li>Python is case-sensitive: <code>Name</code> and <code>name</code> are different</li>
              </ul>

              <p><strong>Practice exercise:</strong> Try creating a variable for your favorite color, then print a message that includes it!</p>
            </div>
          </div>

          <div class="p-3 bg-purple-50 rounded-lg text-sm">
            <strong>🏷️ Tags:</strong>
            <span class="inline-block bg-white px-2 py-0.5 rounded ml-2 mr-1">python</span>
            <span class="inline-block bg-white px-2 py-0.5 rounded mr-1">basics</span>
            <span class="inline-block bg-white px-2 py-0.5 rounded">beginner-friendly</span>
          </div>

          <div class="p-3 bg-yellow-50 rounded-lg text-sm">
            <strong>📝 Notes:</strong> Excellent beginner example. Uses relatable analogies (boxes, party planning), explains WHY not just WHAT, includes working code examples, and adds a practice exercise to reinforce learning.
          </div>
        </div>
      </div>

      <!-- Example 3: Analysis -->
      <div class="card mb-6">
        <div class="flex items-center justify-between mb-4">
          <div class="flex items-center gap-2">
            <span class="text-2xl">📊</span>
            <h3 class="text-xl font-semibold">Example 3: Code Review & Analysis</h3>
          </div>
          <div class="flex gap-2">
            <span class="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded">Analysis</span>
            <span class="px-2 py-1 bg-green-100 text-green-700 text-xs rounded">⭐⭐⭐⭐⭐</span>
            <span class="px-2 py-1 bg-red-100 text-red-700 text-xs rounded">Advanced</span>
          </div>
        </div>

        <div class="space-y-4">
          <div class="p-4 bg-blue-50 rounded-lg">
            <div class="text-sm text-blue-800 font-medium mb-2">🎯 Instruction:</div>
            <p class="text-gray-700">
              "Review this API endpoint code for performance issues and security vulnerabilities. What would you change and why?"
            </p>
          </div>

          <div class="p-4 bg-gray-50 rounded-lg">
            <div class="text-sm text-gray-800 font-medium mb-2">📎 Input:</div>
            <pre class="text-sm bg-gray-100 p-2 rounded overflow-x-auto"><code>app.get('/api/users/:id', async (req, res) => {
  const users = await db.query('SELECT * FROM users');
  const user = users.find(u => u.id === req.params.id);
  
  if (user) {
    res.json(user);
  } else {
    res.status(404).send('Not found');
  }
});</code></pre>
          </div>

          <div class="p-4 bg-green-50 rounded-lg">
            <div class="text-sm text-green-800 font-medium mb-2">📝 Output:</div>
            <div class="text-gray-700 text-sm space-y-3">
              <p><strong>🚨 Critical Issues Found:</strong></p>
              
              <div class="bg-red-50 p-3 rounded border-l-4 border-red-500">
                <p class="font-medium text-red-800">1. N+1 Query Problem (Performance)</p>
                <p class="mt-1">Fetching ALL users then filtering in JavaScript is extremely inefficient. With 1M users, you're loading 1M rows into memory!</p>
                <p class="mt-2 text-green-700"><strong>Fix:</strong></p>
                <pre class="bg-gray-100 p-2 rounded mt-1"><code>const user = await db.query(
  'SELECT * FROM users WHERE id = ?', 
  [req.params.id]
);</code></pre>
              </div>

              <div class="bg-red-50 p-3 rounded border-l-4 border-red-500">
                <p class="font-medium text-red-800">2. SQL Injection Vulnerability (Security)</p>
                <p class="mt-1">Directly using <code>req.params.id</code> in queries opens SQL injection attacks.</p>
                <p class="mt-2 text-green-700"><strong>Fix:</strong> Use parameterized queries (shown above) OR an ORM like Prisma/Sequelize.</p>
              </div>

              <div class="bg-yellow-50 p-3 rounded border-l-4 border-yellow-500">
                <p class="font-medium text-yellow-800">3. Missing Input Validation</p>
                <p class="mt-1">No validation that <code>id</code> is actually a number/string.</p>
                <p class="mt-2 text-green-700"><strong>Fix:</strong></p>
                <pre class="bg-gray-100 p-2 rounded mt-1"><code>const id = parseInt(req.params.id);
if (isNaN(id)) {
  return res.status(400).json({ error: 'Invalid ID format' });
}</code></pre>
              </div>

              <div class="bg-yellow-50 p-3 rounded border-l-4 border-yellow-500">
                <p class="font-medium text-yellow-800">4. Error Handling Missing</p>
                <p class="mt-1">Database errors will crash the server with unhandled promise rejections.</p>
                <p class="mt-2 text-green-700"><strong>Fix:</strong> Wrap in try-catch</p>
                <pre class="bg-gray-100 p-2 rounded mt-1"><code>try {
  // database operations
} catch (error) {
  console.error('Database error:', error);
  res.status(500).json({ error: 'Internal server error' });
}</code></pre>
              </div>

              <p><strong>✅ Improved Version:</strong></p>
              <pre class="bg-gray-100 p-2 rounded"><code>app.get('/api/users/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: 'Invalid ID format' });
    }

    const user = await db.query(
      'SELECT id, name, email FROM users WHERE id = ?',
      [id]
    );
    
    if (user.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    res.json(user[0]);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});</code></pre>

              <p><strong>📈 Performance Impact:</strong></p>
              <ul class="list-disc list-inside space-y-1">
                <li>Original: O(n) time + O(n) memory (loads all users)</li>
                <li>Improved: O(1) time + O(1) memory (database indexed lookup)</li>
                <li>For 1M users: From ~500ms + 100MB RAM → ~5ms + minimal RAM</li>
              </ul>
            </div>
          </div>

          <div class="p-3 bg-purple-50 rounded-lg text-sm">
            <strong>🏷️ Tags:</strong>
            <span class="inline-block bg-white px-2 py-0.5 rounded ml-2 mr-1">security</span>
            <span class="inline-block bg-white px-2 py-0.5 rounded mr-1">performance</span>
            <span class="inline-block bg-white px-2 py-0.5 rounded mr-1">nodejs</span>
            <span class="inline-block bg-white px-2 py-0.5 rounded">database</span>
          </div>
        </div>
      </div>

      <!-- Quick Reference Card -->
      <div class="card">
        <h3 class="text-lg font-semibold mb-4">🎓 What Makes These Examples Great?</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div class="p-3 bg-green-50 rounded">
            <strong class="text-green-800">✅ Clear Instructions</strong>
            <p class="text-gray-600 mt-1">Specific, contextual, and well-defined</p>
          </div>
          <div class="p-3 bg-green-50 rounded">
            <strong class="text-green-800">✅ Complete Outputs</strong>
            <p class="text-gray-600 mt-1">Thorough, with multiple approaches and reasoning</p>
          </div>
          <div class="p-3 bg-green-50 rounded">
            <strong class="text-green-800">✅ Code Examples</strong>
            <p class="text-gray-600 mt-1">Real, runnable code with explanations</p>
          </div>
          <div class="p-3 bg-green-50 rounded">
            <strong class="text-green-800">✅ Educational Value</strong>
            <p class="text-gray-600 mt-1">Teaches concepts, not just answers</p>
          </div>
          <div class="p-3 bg-green-50 rounded">
            <strong class="text-green-800">✅ Practical Application</strong>
            <p class="text-gray-600 mt-1">Real-world scenarios users face</p>
          </div>
          <div class="p-3 bg-green-50 rounded">
            <strong class="text-green-800">✅ Proper Metadata</strong>
            <p class="text-gray-600 mt-1">Accurate categories, difficulty, and tags</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
