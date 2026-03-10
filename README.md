# EdukaAI 🧠🔒

**Turn your AI conversations into your own personalized model. 100% offline. 100% private.**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D%2018.0.0-brightgreen)](https://nodejs.org/)

---

## 🤔 The Problem

You're using ChatGPT, Claude, or other AI assistants every day. You ask them for:
- Help with your specific coding style
- Writing in your voice
- Brainstorming ideas in your domain
- Explanations tailored to your knowledge level

**But here's the thing:** Every time you start a new conversation, you have to re-explain who you are, what you know, and how you like things explained.

Even worse? **All those great interactions are just... lost.** You can't save them. You can't teach the AI to remember what works. And if you ever want an AI that *actually* understands you, you'd need to:
- Pay for expensive API fine-tuning
- Learn complex ML tools
- Trust cloud companies with your personal data
- Share your private conversations with third parties

**That's crazy.**

---

## ✨ The Solution

**EdukaAI** is a local tool that helps you:

1. **Capture** your best AI conversations
2. **Curate** them into a quality dataset  
3. **Export** for training your own local model
4. **Keep everything on your machine** — no cloud, no accounts, no tracking

**No data leaves your computer. Ever.**

---

## 🎯 Perfect For

- **Privacy-conscious developers** who don't want their code reviews leaving their laptop
- **Writers & creators** building a model that writes like them
- **Students** learning AI/ML without cloud dependencies
- **AI enthusiasts** who want to understand fine-tuning hands-on
- **Anyone** who's ever thought "I wish ChatGPT remembered I'm a Python dev who hates semicolons"

---

## 🚀 Quick Start

### Install

```bash
# Clone the repository
git clone https://github.com/edukaai/edukaai.git
cd edukaai

# Install dependencies
npm install

# Start the app
npm run dev
```

Open http://localhost:3000 and you're ready to go.

### Create Your First Training Sample

1. **Copy a great conversation** from ChatGPT/Claude/your local LLM
2. **Paste it into EdukaAI** — the form automatically structures it
3. **Rate it 4-5 stars** if it's genuinely helpful
4. **Repeat** until you have 15-30 samples

### Export & Train

1. Click **Export** → Choose format (Alpaca, ShareGPT, or JSONL)
2. **Train locally** with [Ollama](https://ollama.ai):
   ```bash
   ollama create my-assistant -f Modelfile
   ollama run my-assistant --data your_dataset.json
   ```
3. **Enjoy** an AI that actually understands you

---

## 🌟 Why EdukaAI?

### Privacy First (Seriously)

- ✅ **No cloud dependencies** — works completely offline
- ✅ **No accounts** — no signup, no login, no tracking
- ✅ **Your data stays yours** — SQLite database on your disk, period
- ✅ **Open source** — audit the code, see exactly what happens
- ✅ **Air-gap capable** — works in isolated networks

### Actually Useful

- ✅ **Smart import** — paste messy conversations, get structured data
- ✅ **Quality scoring** — rate samples so you know what's good
- ✅ **Tag & organize** — find samples by topic, quality, source
- ✅ **Multiple formats** — Alpaca, ShareGPT, JSONL (works with Ollama, Axolotl, etc.)
- ✅ **Train/validation splits** — proper ML practices built-in

### Learning By Doing

We include built-in guides:
- How LLMs work (without the PhD)
- What is fine-tuning? (the practical version)
- Step-by-step first training walkthrough
- Tips for quality datasets

---

## 📸 Screenshots

### Dashboard
See your dataset grow. Track approved samples, quality metrics, and readiness for training.

### Sample Management
Card-based interface for reviewing, editing, and approving your training examples. Star ratings, tags, and quick actions.

### Export Made Simple
Choose your format, set train/validation split, download. No command-line guesswork.

---

## 🛠️ Tech Stack

- **Frontend**: Nuxt 3 + Vue 3 + Tailwind CSS
- **Backend**: Nitro (Nuxt's server engine)
- **Database**: SQLite (local file)
- **Export Formats**: Alpaca, ShareGPT, JSONL, CSV
- **Training Integration**: Ollama, Axolotl, Unsloth, Hugging Face

---

## 📚 Documentation

- [Getting Started Guide](docs/getting-started.md)
- [Creating Quality Datasets](docs/dataset-guide.md)
- [Training Your First Model](docs/first-training.md)
- [Understanding LLMs](docs/how-llms-work.md)
- [FAQ](docs/faq.md)

---

## 🤝 How It Works (The Simple Version)

### 1. You Have Conversations

You chat with AI. Some responses are gold. Most are forgettable.

### 2. You Save The Gold

Copy-paste the good stuff into EdukaAI. It automatically structures:
- **Instruction**: What you asked
- **Input**: Any context you provided
- **Output**: The great response
- **System Prompt**: How the AI should behave

### 3. You Curate

Review everything:
- ⭐⭐⭐⭐⭐ (Excellent — teach the model this)
- ⭐⭐⭐ (Okay — maybe edit first)
- ❌ (Reject — don't train on this)

Quality beats quantity. 20 great examples > 200 mediocre ones.

### 4. You Export

Download your curated dataset in your preferred format:
- **Alpaca**: Best for instruction tuning
- **ShareGPT**: Chat-style conversations
- **JSONL**: Maximum flexibility

### 5. You Train (Locally)

Use Ollama, Axolotl, or your favorite tool:
```bash
# With Ollama (easiest)
ollama create my-coding-assistant -f Modelfile

# With Axolotl (more control)
axolotl train config.yaml

# With Unsloth (faster)
python train.py --dataset your_data.json
```

### 6. You Enjoy

Your model now:
- Understands your specific domain
- Writes in your style
- Remembers your preferences
- Runs entirely on your hardware

---

## 💡 Real Examples

### The Developer
**Alex** writes Python and React. He's tired of explaining his coding style to ChatGPT every time.

**With EdukaAI:**
- Saves 25 code review examples he's written
- Rates the detailed, helpful ones 5 stars
- Exports → trains with Ollama
- Now has a coding assistant that knows:
  - His preference for TypeScript
  - His "no semicolons" JavaScript style
  - His company's specific patterns

**Result**: Better code reviews, faster, without explaining himself every time.

### The Writer
**Maya** writes fiction. She wants an AI that helps brainstorm in her voice, not generic prose.

**With EdukaAI:**
- Collects 30 examples of her best story outlines
- Includes her feedback on AI-generated ideas
- Trains a model that understands her genre and tone

**Result**: An AI co-writer that actually sounds like her, not like everyone else.

### The Student
**Jordan** is learning about LLMs. He wants hands-on experience without cloud costs.

**With EdukaAI:**
- Creates datasets from his study notes
- Experiments with training different sized models
- Learns by doing, not just reading

**Result**: Practical ML knowledge, zero cloud bills, complete privacy.

---

## 🔒 Privacy Deep Dive

### What We DON'T Do

- ❌ No cloud storage (not even "optional")
- ❌ No accounts or user tracking
- ❌ No analytics or telemetry
- ❌ No auto-updates phoning home
- ❌ No external CDN dependencies
- ❌ No "sync" features that leak data

### What We DO

- ✅ Local SQLite database (your file, your control)
- ✅ Local export files (move them anywhere)
- ✅ Open source (verify everything)
- ✅ Works offline (air-gap capable)
- ✅ Standard formats (no lock-in)

**You can literally unplug your internet and EdukaAI keeps working.**

---

## 🎓 Learning Resources

We believe fine-tuning should be accessible. Included in the app:

### For Beginners
- What is fine-tuning? (the 5-minute version)
- How many examples do I need? (spoiler: fewer than you think)
- What's a token? (with visual examples)
- Your first training run (step-by-step)

### For The Curious
- How LLMs actually work (attention explained simply)
- Why quality beats quantity
- Understanding model sizes (7B vs 70B)
- Quantization: making big models small

### For The Technical
- Deep dive into transformer architecture
- LoRA and parameter-efficient fine-tuning
- Advanced dataset curation strategies
- Evaluating your fine-tuned model

---

## 🤔 FAQ

**Q: Do I need ML experience?**
A: Nope. If you can use Node.js and follow a tutorial, you can use EdukaAI.

**Q: How many examples do I need?**
A: Start with 15-30 high-quality examples. You'd be surprised what good data can do.

**Q: Can I import from ChatGPT/Claude?**
A: Yes! Just copy-paste conversations. Direct integrations with platforms like OpenWebUI coming soon.

**Q: Does it work on my laptop?**
A: Yes. Mac, Linux, Windows. Training happens separately (Ollama, etc.), but EdukaAI itself runs anywhere Node.js does.

**Q: Is my data really private?**
A: 100%. Everything stays in a SQLite file on your computer. No network calls. No cloud. No exceptions.

**Q: Can I use this commercially?**
A: Yep. MIT license. Use it, modify it, sell models trained with it. Just don't blame us if something breaks.

**Q: What models can I train?**
A: Anything that supports fine-tuning: Llama, Mistral, Gemma, and more. You bring the training tool (Ollama, Axolotl, etc.), we provide the clean dataset.

---

## 🚧 Roadmap

### Now
- ✅ Local dataset creation and management
- ✅ Quality scoring and curation
- ✅ Multiple export formats
- ✅ Built-in educational content

### Next
- 🔄 Direct OpenWebUI integration
- 🔄 Smart sample suggestions
- 🔄 Dataset templates (common use cases)
- 🔄 Better import from conversation platforms

### Future
- 🔮 Built-in training (Unsloth integration)
- 🔮 Model evaluation tools
- 🔮 Community dataset sharing (opt-in)
- 🔮 VS Code extension

---

## 🤝 Contributing

We welcome contributions! Especially:

- **Bug fixes** — Found something broken? PR it!
- **Documentation** — Better explanations help everyone
- **Import formats** — Support for more conversation sources
- **UI improvements** — Make it even easier to use
- **Translations** — Help EdukaAI work in more languages

See [CONTRIBUTING.md](CONTRIBUTING.md) for details.

---

## 📄 License

MIT License — see [LICENSE](LICENSE) file for details.

**tl;dr**: Do what you want, just keep the license notice.

---

## 💬 Community

- **GitHub Discussions**: For questions and ideas
- **Issues**: For bugs and feature requests
- **Discord** (coming soon): For real-time chat

---

## 🙏 Acknowledgments

- Thanks to the Ollama team for making local LLMs accessible
- Thanks to Axolotl, Unsloth, and other training tools
- Thanks to everyone who believes AI should be private by default

---

## 🎬 The Bottom Line

**You don't need to be a ML engineer to fine-tune an LLM.**

You need:
1. Good examples of what you want (EdukaAI helps you curate these)
2. A training tool (Ollama, etc. — we provide the dataset)
3. Patience (training takes 20 minutes, not 20 days)

**Your data. Your model. Your privacy.**

That's EdukaAI.

---

**Ready to build your own AI?**

```bash
git clone https://github.com/edukaai/edukaai.git
cd edukaai
npm install
npm run dev
```

Then open http://localhost:3000 and start capturing your best conversations. 🚀
