# Writer notes for editorial review

Collected from the drafting pass. All source URLs listed here should be verified with `node scripts/check-external-links.mjs` from a machine with internet access before the affected pages are marked `published`.

## URLs flagged as "not fully certain" (by hub)
- **Quiet the Mind:** NHS Every Mind Matters anxiety page; NHS Talking Therapies page; Mind sleep-problems and anxiety pages; Sleep Foundation anxiety-and-sleep, CBT-I and circadian-rhythm pages; Mental Health Foundation sleep page.
- **Falling Asleep:** NICE CKS insomnia; Sleep Foundation sleep-latency FAQ and sleep-hygiene page; Mind sleep problems; Drinkaware alcohol-and-sleep page; Mental Health Foundation sleep page.
- **Waking at Night:** NHS depression-in-adults, panic-disorder, night-sweats pages; Mind sleep problems / anxiety pages; NICE CKS insomnia; Sleep Foundation sleep-maintenance-insomnia and best-temperature pages.
- **Sleep Sounds:** DOIs (from memory) for Riedy et al. 2021, Ebben et al. 2021, Ngo et al. 2013, Papalambros et al. 2017, Hugh et al. 2014; NHS hearing-loss, SIDS and anxiety pages; Mind sleep problems.
- **Sleep Environment:** NHS heatwave and keep-warm-keep-well pages; GOV.UK report-noise page; NHS snoring / sleep apnoea; Electrical Safety First; Frontiers in Neuroscience journal landing page. Lullaby Trust baby room temperature figure (16–20°C) cited without link — confirm.
- **Sleep Products:** NHS earwax, hearing-loss, night-sweats, back-pain pages; Lullaby Trust top level; Ekholm et al. 2020 (J Clin Sleep Med) and a 2003 Lancet mattress-firmness trial cited by description only.
- **Relaxation:** NHS breathing-exercises-for-stress, mindfulness, flexibility-exercises pages; Sleep Foundation relaxation-exercises page; Mind relaxation page; Mental Health Foundation mindfulness page; DOIs for Zaccaro 2018, Morin 2006, Riemann 2017, Rusch 2019, Black 2015, Ong 2014, Moszeik 2022.
- **Sleep Habits:** NICE CKS insomnia; academic.oup.com/sleep (journal top level); several Sleep Foundation sub-pages; Harvard Health blue-light page; NHS alcohol-advice and exercise section pages.
- **Sleep Questions / Resources:** NICE CKS insomnia; NICE MTG70 (Sleepio); NHS earwax and sleep-apnoea; Samaritans; The People's Trial participant figure (~991) — confirm.

## Product types writers wanted that are not in the register (candidates for future additions, only after Semrush shows demand)
Bone-conduction headphones; custom-moulded earplugs; latex/down/microfibre/body/cervical pillows; blackout curtain liners and cassette blinds; ventilated (non-gel) cooling pillows; winter-weight (13.5 tog) duvets and brushed-cotton bedding; hot water bottles / electric blankets; warm dimmable bulbs; acoustic window film and draught strips; vibrating alarms; breathable mattress toppers; mattresses (deliberately none — future non-Amazon programme).

## Editorial judgement calls to be aware of
- The relaxation pillar has 15 body links (it deliberately links every technique).
- `guided-relaxation-for-sleep` says the site intends to add its own recordings in future.
- Hearing-risk threshold (~85 dB sustained) stated without a page-level citation in the all-night white noise article; NHS hearing-loss page is in its sources.

## External link audit — 26 September 2026 (CI run on GitHub Actions)

204 external URLs checked from the runner: **191 returned 200, 0 dead**. Three dead links found in the first run were replaced with verified URLs (Mental Health Foundation top-level page ×2, Sleep Foundation alcohol-and-sleep, Sleep Foundation CBT-I). The remaining 13 return 403 to automated clients even with browser headers and should be opened once by a person (all are long-standing pages): NICE CKS insomnia; Mind sleep-problems, anxiety-and-panic-attacks and relaxation pages; CDC sleep; Lullaby Trust; academic.oup.com/sleep; and six DOI links (10.1111/nyas.13996, 10.1001/jamainternmed.2014.8081, 10.1111/jsr.12594, 10.5665/sleep.4010, 10.1093/sleep/29.11.1398, 10.1542/peds.2013-3617). The check now runs monthly (`.github/workflows/check-links.yml`) and publishes `external-links.csv` to the `link-reports` branch.
