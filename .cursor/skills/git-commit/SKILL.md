---
name: git-commit
description: Create git commits for this project. Use when the user asks to commit changes, stage files, or write a commit message.
---

# Git commit

## Staging
Always use `git add .` to stage all changes at once.

## Before committing
Run `pnpm build` and confirm it passes with zero errors.

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
git diff main origin/main
git merge origin/main
git add .
git commit -m "Your message here"
git push origin main
```