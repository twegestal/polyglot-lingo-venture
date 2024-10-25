### Prerequisites

Make sure you have [Node.js](https://nodejs.org/) v18 LTS and [pnpm](https://pnpm.io/) v8 installed on your system.

### Structure

```bash
.
├── apps
│   ├── client                 # React + Vite
│   └── server                 # Node + Express
└── packages
    ├── api                    # Shared validators and types
    ├── eslint-config-custom   # Shared eslint config
    └── tsconfig               # Shared tsconfig for Node and React
```

### How to start

1. Install prerequisites.

2. Install dependencies. Run:

   ```sh
   pnpm i
   ```

3. Start local development servers for server and client:

   ```sh
   pnpm dev
   ```

#### Root level commands

| Command          | Description                                           |
| ---------------- | ----------------------------------------------------- |
| `pnpm dev`       | Start local development servers for server and client |
| `pnpm lint`      | Lint the project                                      |
| `pnpm test`      | Run tests for the project                             |
| `pnpm typecheck` | Typecheck the project                                 |
| `pnpm format`    | Format the project with prettier                      |
| `pnpm clean`     | Clean temporary files (e.g node_modules and dist)     |