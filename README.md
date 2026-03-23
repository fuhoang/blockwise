# SatoshiLearn

Next.js 16 app for SatoshiLearn.

## Local Development

Install dependencies and start the dev server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Useful commands:

```bash
npm run lint
npm run build
```

## Git Flow

This repository uses a lightweight trunk-based flow with short-lived branches.

- `main` is always deployable.
- Create all work from `main`.
- Open a pull request back into `main`.
- Merge only after CI passes.
- Tag releases from `main`.

### Branch Naming

- `feature/<short-description>` for new features
- `fix/<short-description>` for bug fixes
- `chore/<short-description>` for maintenance
- `docs/<short-description>` for documentation-only changes
- `release/<version>` only when preparing a coordinated release branch

Examples:

```bash
git checkout -b feature/auth-flow
git checkout -b fix/navbar-overflow
```

### Commit Style

Keep commits focused and readable. Prefer imperative messages:

- `Add login form validation`
- `Fix build script for webpack`
- `Update CI to run lint and build`

## Pull Requests

Every pull request should:

- describe the user-facing change
- reference any related issue
- include screenshots for UI changes
- pass `npm run lint` and `npm run build`

Detailed expectations live in [CONTRIBUTING.md](./CONTRIBUTING.md).
