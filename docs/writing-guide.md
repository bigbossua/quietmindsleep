# Quiet Mind Sleep — Writing Guide

This is the standard every article on the site must meet. It is written for human editors and for AI-assisted drafting alike. Read it fully before writing.

## 1. Who we are and how we sound

Quiet Mind Sleep is an independent UK sleep information website. We are **not** a clinic, a charity or a shop. We do not have doctors on staff and we never pretend to.

Voice: a calm, knowledgeable friend who has read the research and will tell you plainly what helps, what might help and what is hype. Think of the tone of a good Guardian or BBC explainer, or a well-written NHS leaflet, with a little more warmth.

- **British English** throughout: *practise* (verb), *colour*, *programme*, *GP*, *duvet*, *tog*, *flat* (not apartment), *°C*, *pharmacist*, *A&E*. Dates as 25 September 2026.
- Short paragraphs (1–4 sentences). Plenty of subheadings. Use lists only where the content is genuinely a list.
- Answer the searcher's question **early**, in the first 100–150 words. Then go deeper.
- Explain mechanisms in plain language ("your body clock", "the pressure to sleep that builds through the day"), not jargon. When you use a technical term (sleep latency, hyperarousal, stimulus control), define it once.
- Write to a person lying awake at 2am as much as to someone researching on a Tuesday afternoon. Be kind. Never scold.
- Practical examples from UK life: street lights, thin curtains, a partner who gets up at 5, the heating clicking on, a Sunday-night lie-in, tea rather than coffee.

### Banned

- Generic AI openers: "In today's fast-paced world", "Sleep is essential for", "We've all been there", "Let's dive in", "It's no secret that", "Look no further".
- Fake personal stories, fake experts, fake quotes, invented statistics, "studies show" without a real source, testimonials, reviews.
- Claims of personal product testing ("I tried this mask"). Use "marketed as", "designed for", "the manufacturer describes".
- Medical promises: "cure", "guaranteed", "treat", "fix your insomnia", "the best way to".
- Keyword stuffing. Use the primary keyword naturally in the title, first paragraph and one or two headings, and then write for the reader.
- Padding: no paragraph should exist only to hit a word count.
- Unsupported supplement claims (melatonin, magnesium, CBD, valerian). If they must be mentioned, be brief and neutral and signpost a pharmacist or GP. Note that melatonin is prescription-only in the UK.

## 2. Health standard

Sleep is a health subject. Every article must:

- Avoid diagnosis. "This may be worth discussing with a GP" not "you have insomnia".
- Signpost help for persistent problems: link to `@sleep-questions/when-to-see-a-gp-about-sleep` where relevant, and mention NHS resources where they exist.
- Never tell people to stop or change medication.
- Describe evidence honestly: "some small studies suggest", "the evidence is mixed", "this is widely recommended but not strongly proven". Mark the difference between established advice (regular wake time, cool dark quiet room, CBT-I as first-line insomnia treatment) and promising-but-unproven ideas (pink noise and deep sleep, weighted blankets, 4-7-8 breathing specifically).
- Cite only sources you are confident exist, using stable top-level URLs. Preferred: NHS (`https://www.nhs.uk/conditions/insomnia/`, `https://www.nhs.uk/live-well/sleep-and-tiredness/`, `https://www.nhs.uk/mental-health/self-help/guides-tools-and-activities/every-mind-matters-sleep/` is uncertain — prefer `https://www.nhs.uk/every-mind-matters/mental-wellbeing-tips/how-to-fall-asleep-faster-and-sleep-better/`), NICE (`https://www.nice.org.uk/`), Mind (`https://www.mind.org.uk/`), The Sleep Charity (`https://thesleepcharity.org.uk/`), Sleep Foundation (`https://www.sleepfoundation.org/`), Mental Health Foundation (`https://www.mentalhealth.org.uk/`), CDC (`https://www.cdc.gov/sleep/`), British Heart Foundation, Royal College of Psychiatrists (`https://www.rcpsych.ac.uk/`), Drinkaware (`https://www.drinkaware.co.uk/`), and peer-reviewed papers only where you are certain of the authors, year and journal (cite by name in text, link to the journal or PubMed only if you are sure of the URL; otherwise give the citation without a link). External links cannot be verified at drafting time, so keep them few, stable and top-level; an audit will check them later. 2–5 sources per article.

## 3. Search intent and structure

Each article targets **one** primary search intent (see `content/plan.json`). Before writing, ask: what does the person actually want when they type this? Give them that, then broaden.

Length is set by intent, not a quota. The plan gives a range. A simple question deserves 900–1,300 words; a pillar guide 1,800–2,600. Do not exceed the top of the range.

Structure:

1. **Title** (unique, matches the plan, may be lightly improved). **H1** = title unless the plan says otherwise.
2. **Standfirst** (front matter `standfirst`): one or two sentences under the H1, 25–45 words, that summarise the answer. Different from the meta description.
3. **Opening**: 2–3 short paragraphs. The direct answer or the key reframing is here.
4. **Body**: logical H2 sections with H3 where needed. No H1 in the body. No heading immediately followed by another heading.
5. Where a **key takeaway** is worth pulling out, use a blockquote starting with bold: `> **In short:** ...` (renders as a callout). At most two per article.
6. **Products** only where the plan lists an affiliate category and where a product genuinely serves the reader at that point in the article. Never at the top. Never more than one product section and one comparison table per article. Many articles have none. Commercial articles (buying guides) put the buying advice first and the recommendations after it.
7. **FAQ** (front matter `faq`): only when there are 3–5 genuinely distinct questions people ask that the body did not already answer in full. Answers 30–80 words. Omit the FAQ entirely otherwise. Never write FAQs that repeat the body.
8. **Conclusion / next step**: a short closing section (H2 such as "Where to go next" or "The short version") that tells the reader what to do tonight and links to 1–2 related guides. No "In conclusion".
9. `sources` in front matter (2–5).
10. `readNext` in front matter: 3 article keys that make sense as the next read (mix within-hub and cross-hub; include a relevant product guide for informational articles where the plan lists an affiliate category).

## 4. Internal linking — the core of the site

Every article must contain **4–8 contextual internal links inside the body text**, placed where they genuinely help ("if the problem is noise from outside, see [how to block out noise at night](@sleep-environment/how-to-block-out-noise-at-night)"). Requirements:

- Link with the `@key` syntax, never a raw path: `[natural anchor text](@hub/slug)`. Hub pages: `[the Quiet the Mind guides](@quiet-the-mind)`.
- Anchor text is descriptive and natural: never "click here", "this article", or the exact keyword stuffed in.
- Link to: the parent hub (once, naturally), 2–4 closely related articles, and the relevant product guide **only** where the article's plan lists an affiliate category. Cross-hub links are encouraged where the relationship is real.
- Do not link the same target twice in the body. Do not put more than one link in a sentence.
- Do not add a "Related articles" list at the bottom: the template does read-next cards from `readNext`.
- The build fails on a link to a key that does not exist, so copy keys exactly from the list in section 8.

## 5. Front matter specification

```yaml
---
title: "Racing Thoughts at Night: Why It Happens and How to Calm Them"
description: "Meta description, 140–160 characters, includes the primary keyword naturally, written to earn the click."
standfirst: "One or two sentences that give the answer up front."
published: 2026-09-25
updated: 2026-09-25
illustration: mind          # optional; defaults to the hub's. Options: hero mind moon clock waves bedroom breath sun mask question
imageAlt: "A calm outline of a head with gentle waves inside"   # optional
healthNotice: true          # optional; forces the health note on/off (auto-on when GP/anxiety/etc. are mentioned)
readNext:
  - quiet-the-mind/how-to-stop-overthinking-at-night
  - relaxation/breathing-exercises-for-sleep
  - sleep-products/best-sleep-headphones-uk
faq:
  - q: "Question?"
    a: "Answer, may include [links](@key) and *markdown*."
sources:
  - title: "Insomnia"
    publisher: "NHS"
    url: "https://www.nhs.uk/conditions/insomnia/"
status: draft               # draft | review | published
---
```

`title`, `description`, `standfirst`, `published`, `readNext`, `sources` are required. The file name is the slug: `content/articles/<hub>/<slug>.md`, exactly as in `content/plan.json`.

## 6. Shortcodes (each on its own line)

- `{{products: product-id, product-id | heading=Recommended for a darker bedroom | intro=One sentence on why these are here.}}` — renders product boxes with the affiliate CTA and disclosure. 1–3 products.
- `{{compare: id, id, id | caption=Sleep mask types at a glance}}` — comparison table. Use in buying guides and "vs" articles.
- `{{health}}` — the standard health note callout (also added automatically at the end when health topics are detected, so only use it where an early placement helps).
- `{{faq}}` — places the FAQ section here (otherwise it is appended after the body).
- `{{email}}` — the 7-Night Plan email box. Use at most once, near the end, and only in informational/supporting articles where a plan would help (quiet-the-mind, falling-asleep, sleep-habits, relaxation, waking-at-night). Not in product guides.

Product IDs available (do not invent others; if you need a product type that is missing, write around it and note it in your final report):

| id | name | category | best for |
|---|---|---|---|
| contoured-sleep-mask | Contoured (3D) sleep mask | sleep-mask | Side sleepers and anyone who dislikes pressure on the eyes |
| silk-sleep-mask | Silk sleep mask | sleep-mask | Comfort against the skin, warm sleepers, travel |
| weighted-sleep-mask | Weighted sleep mask | sleep-mask | People who like gentle pressure across the face |
| soft-foam-earplugs | Soft foam earplugs | earplugs | Maximum noise reduction at low cost |
| reusable-silicone-earplugs | Reusable silicone earplugs for sleep | earplugs | Side sleepers and people who want a washable, reusable option |
| mouldable-wax-earplugs | Mouldable wax or silicone putty earplugs | earplugs | People who find in-canal plugs uncomfortable |
| fan-based-white-noise-machine | Fan-based white noise machine | white-noise | People who want natural, non-looping white noise |
| digital-sound-machine | Digital sound machine with multiple noise colours | white-noise | Choice of white, pink and brown-style sounds and fan sounds |
| portable-sound-machine | Portable rechargeable sound machine | white-noise | Travel, hotels and shared rooms |
| headband-sleep-headphones | Headband sleep headphones | sleep-headphones | Side sleepers who want audio without anything inside the ear |
| sleep-earbuds | Small in-ear sleep earbuds | sleep-headphones | People who want noise masking and audio in a compact form |
| memory-foam-side-sleeper-pillow | Memory foam pillow for side sleepers | pillow | Side sleepers who need a higher, firmer pillow to keep the neck level |
| gel-cooling-pillow | Gel-layer cooling pillow | cooling-pillow | Hot sleepers who like foam support |
| thermal-blackout-curtains | Thermal blackout curtains (eyelet) | blackout-curtains | Bedrooms with street lights or early summer dawn |
| blackout-blind-no-drill | No-drill blackout blind | blackout-curtains | Renters, travel cots, and windows where curtains leave gaps |
| weighted-blanket | Weighted blanket (glass-bead fill) | weighted-blanket | People who find gentle, even pressure calming |
| cotton-percale-bedding | Cotton percale bedding | bedding | Warm sleepers and summer nights |
| summer-tog-duvet | Lightweight summer duvet (around 4.5 tog) | bedding | Hot sleepers and UK summers |
| quiet-bedroom-fan | Quiet bedroom fan | fan | Hot nights in homes without air conditioning |

Products carry their own factual descriptions; your job in the body is to explain *when* a type of product helps, not to review it.

## 7. Example skeleton (abridged)

```markdown
---
title: "Can't Switch Off at Night? Why Your Brain Won't Shut Down and What Helps"
description: "If you can't switch off at night, your mind is probably still in daytime mode. Here's why that happens and a practical wind-down that works."
standfirst: "A brain that won't switch off is usually a brain that hasn't been given a signal that the day is over. Here's how to send one."
published: 2026-09-25
updated: 2026-09-25
readNext:
  - quiet-the-mind/racing-thoughts-at-night
  - falling-asleep/bedtime-routine-for-adults
  - sleep-sounds/brown-noise-for-sleep
sources:
  - title: "Insomnia"
    publisher: "NHS"
    url: "https://www.nhs.uk/conditions/insomnia/"
status: draft
---
You've turned the light off, you're tired, and your mind has decided now is the moment to replay a conversation from Tuesday. ...

## Why your brain won't switch off

...(mechanism, plainly)...

> **In short:** Your mind isn't broken. It's still in daytime mode because nothing has told it the day is over.

## A wind-down that actually sends the signal

### 1. Close the day on paper

...link to [writing a worry list](@quiet-the-mind/worry-list-before-bed)...

### 2. Dim everything

...

## If it's noise rather than thoughts

...steady sound such as [brown noise](@sleep-sounds/brown-noise-for-sleep) ...

{{products: fan-based-white-noise-machine | heading=If steady sound helps you | intro=A dedicated machine avoids relying on a phone at bedtime.}}

## When to get more help

...link to [when to see a GP about sleep](@sleep-questions/when-to-see-a-gp-about-sleep)...

## Tonight's version

Three things to try tonight. ...

{{email}}
```

## 8. All page keys (for links and readNext)

### Quiet the Mind (hub key: @quiet-the-mind)
- @quiet-the-mind/racing-thoughts-at-night — Racing Thoughts at Night: Why It Happens and How to Calm Them [informational]
- @quiet-the-mind/how-to-stop-overthinking-at-night — How to Stop Overthinking at Night [informational]
- @quiet-the-mind/cant-switch-off-at-night — Can't Switch Off at Night? Why Your Brain Won't Shut Down and What Helps [informational]
- @quiet-the-mind/how-to-calm-your-mind-before-bed — How to Calm Your Mind Before Bed: A Simple Evening Approach [informational]
- @quiet-the-mind/anxiety-at-night — Anxiety at Night: Why Worries Feel Worse at Bedtime [informational]
- @quiet-the-mind/worry-list-before-bed — Writing a Worry List Before Bed: How 'Constructive Worry' Works [supporting]
- @quiet-the-mind/sleep-anxiety — Sleep Anxiety: When Worrying About Sleep Is What Keeps You Awake [supporting]
- @quiet-the-mind/cognitive-shuffling — Cognitive Shuffling: A Simple Technique for Quieting Your Thoughts at Bedtime [supporting]
- @quiet-the-mind/sunday-night-insomnia — Why You Can't Sleep on Sunday Night (and How to Fix It) [supporting]

### Falling Asleep (hub key: @falling-asleep)
- @falling-asleep/how-to-fall-asleep-faster — How to Fall Asleep Faster: What Actually Helps [informational]
- @falling-asleep/difficulty-falling-asleep — Difficulty Falling Asleep: Common Causes and What Helps [informational]
- @falling-asleep/bedtime-routine-for-adults — A Bedtime Routine for Adults That You'll Actually Keep [informational]
- @falling-asleep/things-to-do-before-bed — 15 Things to Do Before Bed for a Calmer Night [supporting]
- @falling-asleep/how-long-should-it-take-to-fall-asleep — How Long Should It Take to Fall Asleep? [supporting]
- @falling-asleep/military-sleep-method — The Military Sleep Method: Does It Really Work? [supporting]
- @falling-asleep/what-to-do-when-you-cant-sleep — What to Do When You Can't Sleep: A Calm Step-by-Step Plan [informational]
- @falling-asleep/how-to-sleep-when-not-tired — How to Sleep When You're Not Tired [supporting]
- @falling-asleep/cant-sleep-before-a-big-day — Can't Sleep the Night Before an Important Day? Here's What Helps [supporting]

### Waking at Night (hub key: @waking-at-night)
- @waking-at-night/waking-up-at-3am — Waking Up at 3am: Why It Happens and How to Get Back to Sleep [informational]
- @waking-at-night/waking-up-in-the-middle-of-the-night — Waking Up in the Middle of the Night: Causes and What to Do [informational]
- @waking-at-night/cant-get-back-to-sleep — Can't Get Back to Sleep? What to Do When You Wake in the Night [informational]
- @waking-at-night/waking-up-too-early — Waking Up Too Early and Can't Get Back to Sleep [informational]
- @waking-at-night/why-do-i-wake-up-at-the-same-time-every-night — Why Do I Wake Up at the Same Time Every Night? [supporting]
- @waking-at-night/waking-up-with-anxiety — Waking Up With Anxiety in the Night: Why It Happens and How to Settle [supporting]
- @waking-at-night/should-i-get-up-if-i-cant-sleep — Should You Get Up If You Can't Sleep? The 20-Minute Rule Explained [supporting]
- @waking-at-night/waking-up-hot-at-night — Waking Up Hot at Night: Common Causes and How to Stay Cooler [supporting]
- @waking-at-night/light-sleeper — Are You a Light Sleeper? How to Stop Waking at Every Noise [informational]

### Sleep Sounds (hub key: @sleep-sounds)
- @sleep-sounds/brown-noise-for-sleep — Brown Noise for Sleep: What It Is and Why People Find It Calming [informational]
- @sleep-sounds/white-noise-for-sleep — White Noise for Sleep: Does It Help, and How to Use It Well [informational]
- @sleep-sounds/pink-noise-for-sleep — Pink Noise for Sleep: The Gentler Alternative to White Noise [informational]
- @sleep-sounds/rain-sounds-for-sleep — Rain Sounds for Sleep: Why They Work and How to Use Them [supporting]
- @sleep-sounds/ocean-sounds-for-sleep — Ocean Sounds for Sleep: Waves, Rhythm and Relaxation [supporting]
- @sleep-sounds/nature-sounds-for-sleep — Nature Sounds for Sleep: Which Ones Help and Which Can Wake You [supporting]
- @sleep-sounds/is-it-bad-to-sleep-with-white-noise-on — Is It Bad to Sleep With White Noise On All Night? [supporting]
- @sleep-sounds/brown-noise-vs-white-noise — Brown Noise vs White Noise: Which Is Better for Sleep? [commercial]
- @sleep-sounds/pink-noise-vs-white-noise — Pink Noise vs White Noise for Sleep [commercial]
- @sleep-sounds/calming-sounds-for-anxiety-at-night — Calming Sounds for Anxiety at Night [supporting]

### Sleep Environment (hub key: @sleep-environment)
- @sleep-environment/best-temperature-for-sleep — What Is the Best Temperature for Sleep? A UK Bedroom Guide [informational]
- @sleep-environment/how-to-make-bedroom-darker — How to Make Your Bedroom Darker for Better Sleep [informational]
- @sleep-environment/bedroom-lighting-for-sleep — Bedroom Lighting for Sleep: Evening Light, Bulbs and Bedside Lamps [supporting]
- @sleep-environment/how-to-block-out-noise-at-night — How to Block Out Noise at Night: Practical Fixes for a Quieter Bedroom [informational]
- @sleep-environment/bedroom-setup-for-better-sleep — Bedroom Setup for Better Sleep: A Room-by-Room Checklist [informational]
- @sleep-environment/how-to-sleep-when-its-hot — How to Sleep When It's Hot: A Guide for UK Homes Without Air Conditioning [informational]
- @sleep-environment/how-to-sleep-when-its-cold — How to Sleep When It's Cold Without Overheating [supporting]
- @sleep-environment/sleep-mask-vs-blackout-curtains — Sleep Mask vs Blackout Curtains: Which Is Better for a Dark Bedroom? [commercial]
- @sleep-environment/earplugs-vs-white-noise — Earplugs vs White Noise: Which Is Better for Blocking Noise at Night? [commercial]
- @sleep-environment/bedding-and-sleep — Bedding and Sleep: Duvet Togs, Fabrics and Staying Comfortable All Year [supporting]
- @sleep-environment/how-to-sleep-with-a-snoring-partner — How to Sleep With a Snoring Partner [informational]

### Relaxation (hub key: @relaxation)
- @relaxation/breathing-exercises-for-sleep — Breathing Exercises for Sleep: 5 Techniques to Try Tonight [informational]
- @relaxation/4-7-8-breathing — 4-7-8 Breathing for Sleep: How to Do It and What to Expect [informational]
- @relaxation/progressive-muscle-relaxation-for-sleep — Progressive Muscle Relaxation for Sleep: A Step-by-Step Script [informational]
- @relaxation/bedtime-meditation-for-sleep — Bedtime Meditation for Sleep: A Beginner's Guide [informational]
- @relaxation/body-scan-for-sleep — Body Scan for Sleep: How to Do It (With a Simple Script) [supporting]
- @relaxation/bedtime-relaxation-techniques — Bedtime Relaxation Techniques: Which Ones Work and How to Choose [informational]
- @relaxation/mindfulness-for-sleep — Mindfulness for Sleep: Letting Go of the Effort to Fall Asleep [supporting]
- @relaxation/box-breathing — Box Breathing for Sleep and Stress: The 4-4-4-4 Method [supporting]
- @relaxation/guided-relaxation-for-sleep — Guided Relaxation for Sleep: How It Works and Where to Start [supporting]
- @relaxation/yoga-nidra-for-sleep — Yoga Nidra for Sleep: What It Is and How to Practise It [supporting]
- @relaxation/bedtime-stretches — Gentle Bedtime Stretches to Help You Unwind [supporting]

### Sleep Habits (hub key: @sleep-habits)
- @sleep-habits/sleep-hygiene — Sleep Hygiene: What It Really Means and a Realistic Checklist [informational]
- @sleep-habits/screens-before-bed — Screens Before Bed: How Much Do Phones Really Affect Sleep? [informational]
- @sleep-habits/caffeine-and-sleep — Caffeine and Sleep: How Late Is Too Late for Coffee? [informational]
- @sleep-habits/alcohol-and-sleep — Alcohol and Sleep: Why a Nightcap Makes the Night Worse [informational]
- @sleep-habits/exercise-and-sleep — Exercise and Sleep: Timing, Intensity and What the Evidence Says [informational]
- @sleep-habits/consistent-sleep-schedule — Why a Consistent Sleep Schedule Matters More Than You Think [supporting]
- @sleep-habits/how-to-fix-your-sleep-schedule — How to Fix Your Sleep Schedule: A Week-by-Week Reset [informational]
- @sleep-habits/morning-routine-for-better-sleep — How Your Morning Routine Shapes Tonight's Sleep [supporting]
- @sleep-habits/napping-and-night-sleep — Do Naps Ruin Your Sleep at Night? How to Nap Without Paying for It [supporting]
- @sleep-habits/eating-before-bed — Eating Before Bed: What, When and How Much Affects Sleep [supporting]

### Sleep Products (hub key: @sleep-products)
- @sleep-products/best-sleep-masks-uk — Best Sleep Masks UK: How to Choose One That Actually Blocks Light [commercial]
- @sleep-products/best-earplugs-for-sleeping-uk — Best Earplugs for Sleeping UK: Foam, Silicone, Wax and Reusable Options [commercial]
- @sleep-products/best-white-noise-machines-uk — Best White Noise Machines UK: What to Look For [commercial]
- @sleep-products/best-sleep-headphones-uk — Best Sleep Headphones UK: Headbands, Earbuds and Options for Side Sleepers [commercial]
- @sleep-products/best-pillows-for-side-sleepers-uk — Best Pillows for Side Sleepers UK: Height, Firmness and Fill Explained [commercial]
- @sleep-products/best-blackout-curtains-uk — Best Blackout Curtains UK: A Practical Buying Guide [commercial]
- @sleep-products/weighted-blankets-guide — Weighted Blankets: Do They Help With Sleep, and How to Choose One [commercial]
- @sleep-products/types-of-sleep-headphones — Types of Sleep Headphones Compared: Headband, Earbud and Bone Conduction [supporting]
- @sleep-products/types-of-earplugs-for-sleep — Foam, Silicone or Wax Earplugs for Sleep: Which Type Suits You? [supporting]
- @sleep-products/how-to-choose-a-white-noise-machine — How to Choose a White Noise Machine: Features That Matter [supporting]
- @sleep-products/best-cooling-pillows-uk — Best Cooling Pillows UK: How They Work and What to Look For [commercial]
- @sleep-products/mattress-buying-guide-uk — How to Choose a Mattress: A Plain-English UK Buying Guide [commercial]

### Sleep Questions (hub key: @sleep-questions)
- @sleep-questions/why-cant-i-sleep — Why Can't I Sleep? The Most Common Reasons and Where to Start [informational]
- @sleep-questions/why-am-i-tired-but-cant-sleep — Why Am I Tired but Can't Sleep? [informational]
- @sleep-questions/how-much-sleep-do-adults-need — How Much Sleep Do Adults Need? [informational]
- @sleep-questions/does-a-sleep-mask-help-you-sleep — Does a Sleep Mask Actually Help You Sleep? [supporting]
- @sleep-questions/is-it-bad-to-sleep-with-the-light-on — Is It Bad to Sleep With the Light On? [supporting]
- @sleep-questions/does-reading-before-bed-help-you-sleep — Does Reading Before Bed Help You Sleep? [supporting]
- @sleep-questions/is-it-ok-to-sleep-with-earplugs-every-night — Is It OK to Sleep With Earplugs Every Night? [supporting]
- @sleep-questions/can-you-catch-up-on-sleep — Can You Catch Up on Sleep? What Sleep Debt Really Means [informational]
- @sleep-questions/why-do-i-get-a-second-wind-at-night — Why Do I Get a Second Wind at Night? [supporting]
- @sleep-questions/when-to-see-a-gp-about-sleep — When to See a GP About Sleep Problems [informational]

### Resources
- @resources/7-night-quiet-mind-sleep-plan — The 7-Night Quiet Mind Sleep Plan
- @resources/sleep-checklist — The Better Sleep Checklist: 20 Things to Get Right

### Static pages
- @about — About
- @contact — Contact
- @editorial-policy
- @affiliate-disclosure
- @health-disclaimer
- @privacy-policy
- @cookie-policy
- @terms
- @corrections
