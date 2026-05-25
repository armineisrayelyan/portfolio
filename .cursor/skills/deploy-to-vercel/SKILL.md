---
name: deploy-to-vercel
description: Deploy the portfolio to Vercel. Use when the user asks to deploy, ship or push to production.
---

# Deploy to Vercel

Deployment is triggered automaticcaly when `main` is pushed to GitHub.

## Pre-deploy checklist

- [ ] On `main` branch - `git branch` should show `* main`
- [ ] Build passes - run `pnpm build`, must complete with zero errors
- [ ] Environment variables set in Vercel dashboard (Settings → Environment Variables), then **redeploy** after adding or changing them:
  - `GEMINI_API_KEY`
  - `DID_API_KEY` (if using virtual self / D-ID)
  - `TELEGRAM_BOT_TOKEN` and `TELEGRAM_CHAT_ID` (contact form) — exact names, not `VITE_*`
  - Enable for **Production** (and Preview if you test preview URLs)
- [ ] `.env` is NOT committed - verify with `git status`

## Deploy command sequence

```bash
git fetch origin main
git log main..origin/main --oneline
git diff main origin/main
# (WAIT FOR USER APPROVAL)
git merge origin/main

pnpm build

git status
git diff
# (WAIT FOR USER APPROVAL)
git add .
git commit -m "Your message"
git push origin main
```