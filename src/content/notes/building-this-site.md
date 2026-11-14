---
title: "Field Note 001: Rebuilding my site on Astro and Cloudflare Workers"
description: "My old site expired. Instead of renewing it, I rebuilt it as code — and wrote down every decision along the way."
pubDate: 2026-11-14
tags: ["cloudflare", "astro", "github", "decision log"]
---

## The environment

I had a personal site on Squarespace. The website plan lapsed, and the domain kept renewing separately — so the address still worked, but it pointed at an "expired" page.

I was already planning a rebrand. The question was where the new site should live.

**How I worked:** I built this with Claude as an AI execution partner. It recommended options, wrote most of the code, and drove the browser. I set the direction, made the final calls, and approved anything that touched an account.

## The challenge

The easy path was to renew Squarespace and pick a template. It's polished, it works from a phone, and it would have been live the same day. Basic runs about $19 a month on an annual plan.

But a template says nothing about how I work. I wanted the site itself to be evidence: version-controlled, deployed through a pipeline, and cheap enough to run forever without thinking about it.

## The decision

I weighed three options:

| Option | Upside | Downside |
| --- | --- | --- |
| Renew Squarespace | Fastest, easy mobile editing | Recurring cost, hard to migrate later, shows nothing technical |
| Hybrid (Squarespace + something else) | Keeps familiar tools | Two systems to maintain for one site — no real benefit |
| Astro on Cloudflare, deployed from GitHub | Free, portable, every change tracked in Git | New framework for me |

I chose Astro on Cloudflare. "New to me" was a reason to do it, not a reason to avoid it.

One more decision surfaced while reading Cloudflare's docs: they now recommend **Workers** instead of **Pages** for new projects. Pages still works, but new features are landing in Workers. For a static site the difference is invisible to visitors, so I went with the current recommendation.

## The implementation

- Kept the domain registered where it is. Registration renews next September, so there's no rush to transfer it.
- Used Cloudflare's official Astro blog starter with its "Deploy to Workers" flow. It creates the GitHub repo, wires up builds, and deploys in one pass.
- Made the repository **public**. The tradeoff: drafts committed to the repo are visible before they're published. I'll take that in exchange for the work being inspectable.
- Left preview builds on, so every proposed change gets its own test URL before it reaches production.
- Gave the auto-generated build token a descriptive name. When I audit tokens later, I want to know what each one is for without guessing.

**One snag worth recording:** after I authorized the GitHub connection, the dashboard dropped me into the "import an existing repository" flow instead of returning to the template. It even listed my GitHub profile repo as a candidate. Picking it would have deployed the wrong thing. Reopening the template link with GitHub already connected fixed it.

## The results

- The test site went live the same morning I started.
- The first build took about 30 seconds end to end: clone, install, build, deploy.
- Hosting cost: $0.
- The domain still points at the old provider. Nothing public changes until I approve this version.

## What's next

- Move DNS to Cloudflare and point the domain at this site — after checking for any existing mail records so nothing breaks in the switch.
- Decide whether to transfer the registration to Cloudflare before it renews.
- Keep writing. A site like this is only worth what goes on it.
