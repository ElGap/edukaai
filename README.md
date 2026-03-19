# EdukaAI

> **Privacy-first training data tool for LLM fine-tuning**  
> _From AI conversations to custom-trained models — 100% local, zero configuration_

[![npm version](https://badge.fury.io/js/@elgap%2Fedukaai.svg)](https://badge.fury.io/js/@elgap/edukaai)
[![CI](https://github.com/elgap/edukaai/actions/workflows/ci.yml/badge.svg)](https://github.com/elgap/edukaai/actions/workflows/ci.yml)
[![npm downloads](https://img.shields.io/npm/dm/@elgap/edukaai.svg)](https://www.npmjs.com/package/@elgap/edukaai)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

EdukaAI is a self-hosted tool that helps you **collect, curate, and export training data** for fine-tuning Large Language Models. It captures your best AI conversations — from OpenCode, OpenWebUI, or manual entry — and turns them into high-quality datasets, all while keeping your data local and private.

![EdukaAI Screenshot](screenshot.png)

---

## 🎯 Why EdukaAI?

**🔒 Privacy First** — Your data never leaves your machine. Local SQLite database, no cloud, no tracking.

**⚡ Zero Configuration** — Install and run. No complex setup. Start collecting in minutes.

**🎣 Capture Anywhere** — Manual entry, file imports, or live capture from your favorite AI tools.

**✅ Quality Control** — Review workflow ensures only your best examples reach your training dataset.

**📤 Multiple Export Formats** — Alpaca, ShareGPT, JSONL, CSV — works with any training pipeline.

---

## 🚀 Quick Start

### NPM (Recommended)

```bash
# One-time use
npx @elgap/edukaai

# Or install globally
npm install -g @elgap/edukaai
edukaai
```

Open [http://localhost:3030](http://localhost:3030) and start capturing.

---

## ✨ Four Ways to Capture Data

### 1️⃣ **Manual Entry**

Create samples directly in the web UI — perfect for human-crafted "golden" examples.

### 2️⃣ **File Import**

Upload existing datasets (Alpaca, ShareGPT, CSV) — ideal for migration.

### 3️⃣ **OpenCode Plugin** 🆕

Capture coding conversations with one click from [OpenCode CLI](https://opencode.ai/).

**Plugin:** [github.com/ElGap/edukaai-opencode](https://github.com/ElGap/edukaai-opencode)

### 4️⃣ **OpenWebUI Plugin** 🆕

Export conversations from your self-hosted [OpenWebUI](https://openwebui.com/) instance.

**Plugin:** [github.com/ElGap/edukaai-openwebui](https://github.com/ElGap/edukaai-openwebui)

---

## 📊 Core Features

### Dataset Management

- Create multiple datasets for different projects
- Set goals and track progress with visual milestones
- Organize by purpose: coding, creative writing, Q&A, roleplay

### Training Sample Management

- **Core Fields**: Instruction, Input, Output, System Prompt
- **Metadata**: Category, Difficulty, Quality (1-5 stars), Tags
- **Review Workflow**: Draft → In Review → Approved/Rejected
- **Bulk Operations**: Approve, categorize, or delete multiple samples

### Quality Control

- **Draft-First**: All captures start in Draft for your review
- **Duplicate Detection**: Automatic semantic similarity matching
- **Auto-Enrichment**: Smart categorization and quality suggestions

### Export Formats

- **Alpaca (JSON)** — Industry standard
- **ShareGPT (JSON)** — Conversation format
- **JSONL** — For training pipelines
- **CSV** — For analysis

---

## 🔌 Live Capture API

Any tool can send data to EdukaAI via the Universal Capture API:

```bash
curl -X POST http://localhost:3030/api/capture \
  -H "Content-Type: application/json" \
  -d '{
    "source": "my-plugin",
    "apiVersion": "1.0",
    "records": [{
      "instruction": "Explain quicksort",
      "output": "Quicksort is a divide-and-conquer algorithm...",
      "category": "coding",
      "qualityRating": 4
    }]
  }'
```

**Endpoint:** `POST /api/capture`  
**Docs:** `http://localhost:3030/docs`

---

## 💻 CLI Reference

| Command         | Description                          |
| --------------- | ------------------------------------ |
| `edukaai`       | Start server (http://localhost:3030) |
| `edukaai reset` | Reset database                       |
| `edukaai help`  | Show all commands                    |

**Environment Variables:**

- `EDUKAAI_HOST` (default: localhost)
- `EDUKAAI_PORT` (default: 3030)
- `EDUKAAI_DATA_DIR` (default: ~/.edukaai)

---

## 🔒 Privacy & Security

- **100% Local** — SQLite database on your machine
- **No Cloud** — No external API calls
- **No Tracking** — Zero analytics or telemetry
- **MIT License** — Full transparency

---

## 🛠️ For Developers

### Tech Stack

- **Frontend**: Vue 3 + Nuxt 4 + Tailwind CSS
- **Backend**: Nuxt 4 API routes
- **Database**: SQLite (Drizzle ORM)

### Build from Source

```bash
git clone https://github.com/elgap/edukaai.git
cd edukaai
npm install
npm run dev
```

### Commands

```bash
npm run db:reset      # Reset database
npm run test          # Run tests
npm run typecheck     # Type checking
npm run build         # Production build
```

### Project Structure

```
edukaai/
├── app/              # Nuxt frontend
├── server/           # Backend API
├── bin/              # CLI scripts
└── docs/             # Documentation
```

---

## 📖 Documentation

- **Full Documentation:** [eduka.elgap.ai](https://eduka.elgap.ai)
- **Opencode plugin:** [github.com/ElGap/edukaai-opencode](https://github.com/ElGap/edukaai-openwebui)
- **OpenWebUI plugin:** [github.com/ElGap/edukaai-openwebui](https://github.com/ElGap/edukaai-openwebui)

---

## 🤝 Contributing

Contributions welcome:

- **Plugins** — Build integrations for your favorite tools
- **Documentation** — Tutorials and examples
- **Bug Reports** — Help us improve

Contribution guidelines will be added soon.

---

## 📄 License

MIT License — see [LICENSE](LICENSE)

---

## 🙏 Acknowledgments

- Inspired by the need for simple, private LLM training tools
- Built with [Nuxt](https://nuxt.com/), [Vue](https://vuejs.org/), and [Tailwind](https://tailwindcss.com/)
- Icons by [Lucide](https://lucide.dev/)

---

**Built with ❤️ for the AI community**

[⬆ Back to Top](#edukaai)
