---
name: git-commit
description: Create git commits for this project. Use when the user asks to commit changes, stage files, or write a commit message.
---

# Git commit

## Staging
Always use `git add .` to stage all changes at once.

## Before committing
Run `pnpm build` and confirm it passes with zero errors.

## Ask before merge/commit (must)
- Always show the user the incoming changes from `origin/main` and wait for explicit approval before merging.
- Always show the user `git diff` of local changes and wait for explicit approval before committing.
- Do not merge/commit/push until the user replies with a clear **YES** (e.g. "yes", "ok", "proceed", "continue").

## Commit message format
Simple descriptive English. No scope prefix, no conventional commit tags.

Good examples:
- `Added Gemini serverless API route`
- `Fixed 503 error by updating model name`
- `Removed .env from git history`
- `Updated ChatWidget to load saved responses from localStorage`

Bad examples:
- `feat(api): add gemini route`
- `fixed stuff`
- `WIP`

## Command sequence
```bash
pnpm build
git fetch origin main
# Show incoming commits + diff, then ask user to approve merge:
git log main..origin/main --oneline
git diff main origin/main
# (WAIT FOR USER APPROVAL)
git merge origin/main

# Show local diff, then ask user to approve commit:
git status
git diff
# (WAIT FOR USER APPROVAL)
git add .
git commit -m "Your message here"
git push origin main
```