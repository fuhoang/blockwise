# Contributing

## Workflow

1. Sync `main`.
2. Create a short-lived branch from `main`.
3. Make focused commits.
4. Run local checks.
5. Open a pull request into `main`.
6. Merge after review and green CI.

## Branch Rules

- `main` is the source of truth.
- Do not commit directly to `main`.
- Rebase or merge `main` into your branch if it drifts.
- Delete branches after merge.

## Branch Names

- `feature/<name>`
- `fix/<name>`
- `chore/<name>`
- `docs/<name>`
- `release/<version>`

## Local Checks

Run these before opening a pull request:

```bash
npm run lint
npm run build
```

## Pull Request Checklist

- change is scoped to one concern
- branch name follows the convention
- commits are readable
- lint passes
- build passes
- screenshots added for UI changes
- follow-up work is called out clearly

## Releases

For regular changes, merge directly into `main` and tag from there.

Use a `release/<version>` branch only when a version needs coordinated QA, release notes, or final cleanup before tagging.
