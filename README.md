<p align="center">
  <a href="./README.md">English</a>
  <a href="./README_CN.md">简体中文</a>
</p>

**AI Assistant Platform** is an open-source project designed to help developers quickly build intelligent AI assistants specialized in specific domains. With flexible knowledge base management, tool integration, and task automation (Agent) features, users can customize AI assistants to become domain experts and deliver accurate, efficient services.

## ✨ Features

### 🔧 Quickly Build Domain-Specific AI Assistants
- 🏗️ Build AI assistants tailored to specific domains with ease.
- 🔄 Adjust knowledge bases, models, and toolsets as per requirements.

### 📚 Knowledge Base Integration
- 📂 Create, manage, and query knowledge bases.
- 📄 Includes various document loaders (PDF, Excel, JSON, etc.) to parse different content types.
- ⚙️ Supports custom loaders for specific formats (e.g., COS files).

### 🛠️ Tool Integration
- 🔗 Integrate third-party APIs and tools (e.g., computation, web scraping) for extended capabilities.
- 🤖 Automate tasks by dynamically invoking tools with agents to handle complex workflows.

### 🌟 Domain Expert Mode
- 📌 Quickly turn AI assistants into experts in specific fields (e.g., healthcare, legal, finance).
- 🔍 Provide intelligent Q&A generation, knowledge retrieval, and context-aware conversations.

---

## 🚀 Quick Start

### 🖥️ Prerequisites
- Node.js >= 18.x
- npm or yarn package manager

### 📦 Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/zandko/leek.git
   cd leek
   ```

2. Install dependencies:
   ```bash
   # Using npm
   npm install

   # Using yarn
   yarn install
   ```

3. Configure environment variables:

   Create a `.env` file in the root directory with the following content:

   ```env
   PORT=3000
   TZ=UTC
   ...
   ```

4. Start the project:
   ```bash
   yarn start:dev
   ```

## 🛤️ Roadmap

- 📜 Support additional document loaders.
- ⚡ Add more tool integration examples.
- 🌍 Provide prebuilt knowledge bases for various domains (e.g., healthcare, legal, finance).
- 🧠 Enhance context understanding capabilities of assistants.

## 📜 License

This project is licensed under the [MIT License](LICENSE).
