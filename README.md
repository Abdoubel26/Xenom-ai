# Xenom AI

A modern, developer-friendly AI web app built with Next.js and TypeScript.

This repository provides a foundation for building an AI-powered chat/assistant interface and related features. It uses TypeScript for the application logic, CSS for styling, and a small amount of JavaScript utilities.

Demo: https://google-gemini-clone-seven-beta.vercel.app

Highlights

- Next.js + TypeScript application
- Clean, component-driven structure optimized for DX
- Easily extensible AI integration points (API keys, request/response handling)

Table of contents

- [Getting started](#getting-started)
- [Development](#development)
- [Configuration](#configuration)
- [Project structure](#project-structure)
- [Scripts](#scripts)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

Getting started

Prerequisites

- Node.js 18 or later
- npm, yarn, or pnpm

Clone and install

```bash
git clone https://github.com/Abdoubel26/Xenom-ai.git
cd Xenom-ai
npm install
# or: pnpm install
# or: yarn install
```

Run the development server

```bash
npm run dev
# or
pnpm dev
# or
yarn dev
```

Open http://localhost:3000 to view the app.

Build for production

```bash
npm run build
npm run start
```

Configuration

Create a `.env` file in the project root to store secrets and runtime configuration. Example:

```
# .env (example)
NODE_ENV=development
PORT=3000
AI_API_KEY=your_api_key_here
```

Never commit secrets to git. Add `.env` to `.gitignore`.

Project structure (overview)

- app/ or pages/ — Next.js application routes and pages
- src/ — TypeScript source (components, hooks, services)
- public/ — static assets
- styles/ — global and component styles (CSS)
- scripts/ — helper scripts

Adjust these to match the repository layout as you extend the project.

Development notes

- Follow existing TypeScript and linting rules.
- Keep components small and focused; prefer composable hooks and services for business logic.
- Add tests for new features where applicable.

Common scripts

- `npm run dev` — start the development server
- `npm run build` — production build
- `npm run start` — start the production server
- `npm run lint` — run linters (if configured)
- `npm run test` — run tests (if configured)

Contributing

Contributions are welcome. Suggested workflow:

1. Fork the repository
2. Create a branch: `git checkout -b feat/your-feature`
3. Commit your changes with clear messages
4. Open a pull request describing the change

Add tests and update documentation where appropriate.

License

This repository does not include a license file. If you want to open-source the project, consider adding a license such as MIT and adding a `LICENSE` file.

Contact

If you have questions or issues, open an issue on GitHub or contact the maintainer: @Abdoubel26
