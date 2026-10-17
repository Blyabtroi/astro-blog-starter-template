---
title: 'PadlaPicasso: a Telegram LLM game where the model is both judge and actor'
description: 'Flame-war battles with AI bosses in Telegram: split evaluator and actor roles, n8n, MongoDB—a finished learning prototype, not a product.'
pubDate: 2026-10-17
locale: en
translationSlug: padla-picasso
---

*A tale of how I built a hater bot*

**PadlaPicassoBot** was an attempt to bring back the spirit of old chat flame wars in a safe form: not people against people, but a player against a fictional character in Telegram. I finished the project for game-design practice and to learn n8n. I do not plan to maintain it—it was a learning experiment.

Back when the internet at home meant dial-up and unlimited traffic existed only on the university floor, a tight crew of engineers would pile into the “Krovatka” chat as **PadlaPicasso** and start—let’s say—a flame-war battle. I once found a dictionary of archaic Russian profanity; we were praised exactly once for vivid language. Once.

The bot lived on Telegram as [@PadlaPicassoBot](https://t.me/PadlaPicassoBot). Below: what it was and how it worked.

---

## What kind of game

**Flame-war battle.** You argue with an AI boss in chat. Each character has weaknesses and a **red line** (the sore spot they will not admit out loud). At fight start you get a **poster** with hints on what to press in conversation.

The goal is not small talk but to **hit weaknesses with words**. That drains the boss’s **composure** (shown as “shields” 🛡️ in chat). A normal weakness hit hurts; the red line hurts more. Drop composure almost to zero within the move limit and the boss counts as beaten.

In parallel the game tracks **anger, fatigue, and vulnerability**. If the player only rages without arguments (swearing, filler), the boss can **get angry**—tone shifts from patronizing to irritated to outright rudeness, including casual swearing within the rules. That is not model randomness but designed modes.

Each level has its own bosses—from caricatured internet archetypes to a final meta-boss.

---

## The LLM’s role

Every player turn runs **two separate model calls**—by design.

**1. Evaluator (judge)**  
Looks only at the player’s line and the boss “parameters”: profile, weakness list, what is already hit, red line, current meters. Returns structured scoring: hit type, how much to move composure, anger, and so on. Structured output—I did not know the name in grad school despite a neural-networks dissertation, and I did not a year ago when I built the bot either.

**2. Actor (boss)**  
Gets the updated state and **dialogue history**. Generates one short line: sarcasm, excuses, panic, or defeat—depending on tone.

Why not one LLM for everything? Because **judge and actor have different jobs**. One model that both scores and performs inevitably “plays along”: softens hits, mixes drama with rules. Splitting keeps **balance** and lets you tune the game—evaluation prompt separately, character and memory separately.

Chat memory is only for the actor. The judge needs the fight snapshot and the current line.

---

## Under the hood (short)

- **Telegram bot** on **n8n**: command routing, inline menus.
- **MongoDB**: player progress, active session, LangChain memory for dialogue.
- **Catalog of 10 bosses**: profiles, lines, weaknesses, levels.
- **Two LLM APIs** with fallback if the primary evaluator fails.
- **S3**: boss images at battle start.

---

## Example: influencer Christina

The art sets mood and theme—stories, a phone on the table with “plan B”: a hint for the fight.

![Christina — level-one boss](/blog/padla-picasso/christina.jpg)

First, small talk—no red-line hit:

**Me:** Want to do a collab? Lady Yaga—a native brand for natural home cleaning.

**Christina:** · 🛡️🛡️🛡️🛡️  
OMG Lady Yaga is such a vibe brand for real homemakers! I love the natural angle—it’s literally a must for my cozy reels. But you know I only promote what I personally test, and I have a cleaning crew so my hands stay pristine… though for stories we could get creative if you send a free sample and I write a heartfelt little review ✨

**Me:** Oak-and-birch broom with natural bristles, mortars for grinding nuts with natural resin.

**Christina:** · 🛡️🛡️🛡️🛡️  
A birch broom is pure eco-vibe, I live for natural! Perfect shot for my stories—rustic chic, mmm… I don’t really “do” cleaning myself (the team handles it), but I’ll dust a dresser for a shoot. The mortar works as decor for a mindful-consumption reel—main thing is followers believe I grind my own nuts 😇

**Me:** Grind your own nuts? aww aww aww

**Christina:** · 🛡️🛡️🛡️🛡️  
Aww stop, you caught me! Of course I try everything—my hands are just super sensitive, so for reels I use a stand-in, but the review will be totally authentic, promise! 😇 We want clean vibes and zero toxicity in stories, right?

Then the turn—when you name what was on the poster.

**Christina:** 🛡️🛡️🛡️☐  
What weaknesses, those are just silly rumors from haters jealous of my vibe! Subscribe to my account instead of conspiracy theories—such a mood there, only warm commenters. ✨ And if you want the “sweets” tea, peek at my exclusive Telegram for top collabs—lots there, but no toxicity!

Hit: **composure** drops, one shield gone. The game lets you lose and burn tokens.

---

## Boundaries (18+ and ethics)

The bot rules stated clearly that you may pressure the **character**, argue, insult the fictional archetype. Characters are satirical; any resemblance is coincidental. 18+. Swearing in boss replies is part of escalation at high anger—not the point, same as on the university floor.

I do not sell it as “therapy,” though some venting is in there.

---

## What I learned

- **Game design**: inventing characters and backstories was fun.
- **n8n**: relevant a year ago; now a lot of this is prompt-first.
- **Prompts as mechanics**: evaluator plus actor—a two-call loop.
- **Honest metrics**: essentially **zero** unique players—sample audience, like a blogger before the boost. But there is a working prototype, a boss catalog, and this post.
