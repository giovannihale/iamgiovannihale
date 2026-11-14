---
title: "Field Note 002: Moving my domain — and finding the mail I didn't know was broken"
description: "Pointing a domain at a new site sounds like a five-minute job. Checking the DNS first turned up an email setup that had quietly died months ago."
pubDate: 2026-11-14
tags: ["dns", "cloudflare", "email security", "dmarc", "decision log"]
draft: true
---

## The environment

The new site was live on a Cloudflare test address ([Field Note 001](/notes/building-this-site/)). The domain, iamgiovannihale.com, was still registered at Squarespace and still pointed at my old, expired Squarespace site.

The last step looked simple: point the domain at the new site and set up a contact address — `hello@iamgiovannihale.com` — that forwards to my personal inbox.

Same setup as last time: Claude as my AI execution partner, working in the browser and DNS dashboards while I made the calls. Account sign-ins and password prompts stayed with me.

## The challenge

Before changing anything, I pulled the domain's public DNS records. Moving nameservers replaces *every* record at once, so anything I didn't know about would break silently.

Two things stood out:

- **Mail was routed to Google Workspace.** The MX records pointed at Google. If anything still depended on that mail, the cutover would cut it off.
- **No email authentication at all.** No SPF, no DKIM, no DMARC. Anyone could send mail claiming to be from my domain, and receivers had no way to tell.

**What I was thinking:** I didn't think of that address as personal email — I'd used it like a company address and hadn't touched it in a while. My honest answer to "is anything still using it?" was *I don't know.* So I stopped and checked before going further.

The answer: the Google Workspace subscription had been cancelled. The DNS still advertised Google as the mail server, so any mail sent to the domain was going nowhere. It had been broken for a while and nothing told me.

## The decision

The original plan for `hello@` was Cloudflare Email Routing: free forwarding, no mailbox to manage. But Email Routing requires replacing the MX records — which would have broken Google Workspace if it had still been in use.

| If Workspace was live | If Workspace was dead |
| --- | --- |
| Keep Google's MX records, create `hello@` as an alias in Workspace | Replace MX with Cloudflare Email Routing, forward `hello@` to my inbox |

Checking first turned a guess into a clear call: Workspace was dead, so Email Routing was the right tool.

I also decided to fix the authentication gap while I was in there. The domain doesn't send mail, so it can carry the strictest policy there is: reject anything that claims to be from it.

## The implementation

1. Added the domain to Cloudflare on the Free plan. Cloudflare imported the existing records — four Squarespace web addresses, two Squarespace aliases, and five dead Google mail records.
2. Deleted all eleven. None of them pointed anywhere I wanted traffic to go.
3. Attached `iamgiovannihale.com` and `www` to the site as custom domains. Cloudflare creates the records and the TLS certificate.
4. Set up Email Routing: `hello@` forwards to my inbox, every other address is dropped. Cloudflare added its own MX, SPF, and DKIM records.
5. Added a DMARC record: `v=DMARC1; p=reject; adkim=s; aspf=s`.
6. Swapped the nameservers at Squarespace to Cloudflare's.

**One snag:** Squarespace's nameserver page showed the list as read-only, with a single button labeled "Use Squarespace nameservers." The domain was technically in "custom" mode already — with Squarespace's own servers entered by hand, likely left over from a migration. Switching back to default first unlocked the "Use custom nameservers" option.

## The results

<!-- Fill in after the cutover is verified: activation time, HTTPS check, test email to hello@ -->

## What's next

- Watch the DMARC policy. If I ever send *from* this domain, the strict policy will need SPF and DKIM set up for whatever sends it.
- Decide whether to move the registration to Cloudflare before it renews next September.
- Audit which old accounts, if any, still use addresses at this domain for sign-in.

**What I'd tell someone else:** look at your DNS before you change it. Mine was carrying a dead mail setup and no protection against spoofing, and I only found out because I checked.
