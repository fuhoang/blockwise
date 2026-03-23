# Contributing

## Workflow

1. Sync `develop` for normal feature work.
2. Create a branch from the correct long-lived base.
3. Make focused commits.
4. Run local checks.
5. Open a pull request into the correct target branch.
6. Merge after review and green CI.

## Branch Rules

- `main` is production-ready only.
- `develop` is the default branch for active development.
- Do not commit directly to `main` or `develop`.
- `feature/*` branches start from `develop` and merge back into `develop`.
- `release/*` branches start from `develop` and merge into `main` and `develop`.
- `hotfix/*` branches start from `main` and merge into `main` and `develop`.
- Delete short-lived branches after merge.

## Branch Names

- `feature/<name>`
- `release/<version>`
- `hotfix/<name>`

## Typical Flows

### Feature

```bash
git checkout develop
git pull origin develop
git checkout -b feature/<name>
```

Open the pull request into `develop`.

### Release

```bash
git checkout develop
git pull origin develop
git checkout -b release/<version>
```

After validation, merge the release branch into `main` and back into `develop`, then tag the release from `main`.

### Hotfix

```bash
git checkout main
git pull origin main
git checkout -b hotfix/<name>
```

After validation, merge the hotfix branch into `main` and back into `develop`.

## Local Checks

Run these before opening a pull request:

```bash
npm run lint
npm run build
```

## Pull Request Checklist

- change is scoped to one concern
- branch name follows the convention
- pull request targets the correct base branch
- commits are readable
- lint passes
- build passes
- screenshots added for UI changes
- follow-up work is called out clearly

## Releases

Create `release/<version>` from `develop` when preparing a version.

Before shipping:

- stabilize on the release branch
- merge into `main`
- tag the release on `main`
- merge the same changes back into `develop`
