# Tulpamancy: Can One Brain Contain More Than One Mind?

A 12-slide presentation for **Ryzhkin Hlib · English News Time**, remade around the supplied script. The central distinction is **what people report ≠ what science has established**. Visible slides contain memory cues; the full spoken script is in presenter notes in `index.html`. Seven references and their evidence limits are in `references.html`, outside the numbered deck.

The supplied slide targets total **9:25 before pauses**, and the notes contain approximately **1,630 spoken words**. Treat 8–9 minutes as an aspirational rehearsal target, not a measured duration. For seven minutes, trim slides 05, 07, 09 and 10 first and shorten the route explanation; preserve the introduction, religious comparison and philosophical conclusion. Reveal’s speaker timer measures your actual delivery. `data-timing` records each supplied target in seconds for speaker pacing; it does not automatically advance slides.

The unfinished slide-09 cue about neurons/brain regions was omitted: no additional anatomical claim has been invented. Stray quotation marks and one awkward opening sentence were cleaned up; the supplied argument and qualifications remain in the notes. Bibliographic details and scope statements come from the supplied script, rather than a new source-verification pass.

## Run and build

Requires Node.js **20.19+ in the 20.x series, or 22.12+**.

```sh
npm ci
npm run dev
npm run build
npm run preview
```

Open the URL Vite prints. The build produces a static `dist/` containing both the deck and references page. Upload the entire directory. Serve it over HTTP rather than opening files with `file://`; modules and the speaker window need an HTTP origin. Fonts are system fonts; illustrations are inline SVG. Presenting a locally served build needs no internet. External reading links require internet; there is no automatic offline cache.

## Present and export

- **Arrows / Space**: navigate; **Shift+Space**: back. Slide 11 has two additional fragment advances so you can pause between agency, identity and consciousness.
- **O / Esc**: overview. **S**: Reveal speaker view with notes, upcoming slide and timer; allow popups. Keep notes on an extended second display rather than a mirrored projector.
- **F**: fullscreen. **B / .**: blackout. **?**: Reveal keyboard help.
- Footer: **Sources**, **Pause/Resume motion**, **Overview**, **Notes**, **Fullscreen**, **PDF**. Sources opens a separate page; it does not add a thirteenth slide. References link back to the conclusion.
- Hash URLs preserve slide position; `/#/0` is the introduction and `/#/11` the conclusion.
- OS reduced-motion preference disables motion at page load. Reload after changing that preference. The motion button pauses the illustration only; it does not pause navigation or the speaker timer.

For PDF, click **PDF ↗**, wait for print layout, then use desktop Chrome/Chromium/Edge **Print → Save as PDF**: landscape, no margins, background graphics on, browser headers/footers off. Reveal combines fragments on one page per slide. Toolbar and chapter labels are hidden; the illustration is static. Use `?print-pdf&showNotes=separate-page` for a notes handout. The separate bibliography can be printed independently from `references.html`.

The browser controls fullscreen permission. If the custom fullscreen button is blocked, it explains how to continue or use the browser menu. Embedded decks also depend on the parent frame’s permissions. Use a desktop browser and test the actual school display: this is a 1600 × 900 presentation canvas scaled as a whole, not a mobile article. Smaller screens make text physically smaller. Vite targets Chrome/Edge 100+ and Firefox 102+ syntax; these are build targets, not a claim that every version was tested.

## What changed in this remake

- Replaced the former 11-slide talk with all 12 supplied topics and full spoken notes.
- Removed the invented conversation and its `dialogue`, `bubble` and `other` styling. Slide 04’s speech symbols are a single conceptual SVG, not dialogue cards.
- Replaced the former generic cards, comparison, research-list and conclusion layouts with the catalogue below; obsolete selectors were removed.
- Removed the old `assets/svg/minds.svg`. The opening and ending now contain editable inline SVG in `index.html`; no separate artwork asset is needed.
- Removed Auto-Animate opt-ins and disabled Auto-Animate in config. There is no inter-slide morph. The opening’s emergence loop is a native CSS animation.
- Kept Reveal navigation, notes, overview, fade transitions, progress, numbering and PDF export. Added the sources link and illustration pause control.
- Added a separate, built bibliography page with all S1–S7 source IDs and scope limitations.

## Where things live and who provides them

| File / layer | Responsibility |
| --- | --- |
| `index.html` | Readable slide text, inline SVG, source labels, per-slide target durations and full `<aside class="notes">` scripts. Edit your talk here. |
| `references.html` | Full supplied bibliography and evidence limits; ordinary browser page with source anchors S1–S7. |
| `src/main.js` | Custom bootstrap, chapter updates and footer controls; loads Reveal and its Notes plugin. |
| `src/config.js` | Reveal settings: 1600 × 900, 4% margin, hash navigation, fades, slide numbers, reduced motion, Auto-Animate off and PDF settings. |
| `src/styles/theme.css` | Custom colours, typography, layout recipes, SVG animation, toolbar, bibliography and print rules. |
| `vite.config.js` | Vite development/build settings; both HTML pages are build entries and asset URLs use a relative base. |
| Reveal.js | Slide navigation/scaling, fragments, overview, progress, slide numbers, keyboard shortcuts, fades and print pagination. Its Notes plugin supplies presenter view and timer. |
| Browser | HTML/CSS Grid/Flexbox, SVG, CSS animation, media queries, new tabs, fullscreen and printing. |
| Project custom code | All layouts in the catalogue, theme, conceptual drawings, animation keyframes, chapter footer and buttons that invoke Reveal/browser APIs. |
| Vite | Development server and production bundling. It does not implement slide layouts or animations. |

Dependencies remain **Reveal.js and Vite**. No animation engine, remote font, CDN or generated bitmap was added.

## Edit slides without reading CSS

1. In `index.html`, find `<!-- SLIDE 01 ... -->` through `<!-- SLIDE 12 ... -->`.
2. Change projected text in that section and spoken paragraphs in its `<aside class="notes">` separately.
3. Keep `data-chapter` meaningful: the custom footer reads it. `data-timing="35"` is a target in seconds.
4. Copy a complete section to reuse a recipe. Keep its required children, heading and notes. Update slide labels, route numbering and README if the deck changes.
5. Preview, check readability and rebuild before publishing `dist/`.

Each direct `<section>` under `.slides` is one slide. Use one main `h1` or `h2`, `h3` for subheads, and `em` for gold emphasis. Source footers link to `./references.html#S2` etc. Add bibliographic entries in `references.html` when adding sources. Notes are hidden from projected slides, but are shipped in the public HTML.

### Layout catalogue: implemented in this deck

These are custom project recipes, not Reveal templates. Practical limits target the current 16:9 canvas; additional children or longer text do not automatically shrink.

| Classes | Required children and practical limits | Used on |
| --- | --- | --- |
| `split cover-layout` | Two direct children: copy div and `svg.mind-art`. One-word title, two-line question, byline and one short cue line. | 01 |
| `route-layout` | Two children: motivation div with `ul.cues`, `question-map` and `emphasis`; `ol.route` with `start="3"`. Up to three motivation bullets and ten short route lines. | 02 |
| `question-map` | Four label spans plus a central `b` containing `?`, ordered as in the slide. CSS places the question between the labels; the label rules suggest connections. | 02 |
| `sequence` | Three `article` children, each with `span.label`, `h3`, and short `p`. Top rules and arrows mark a conceptual sequence, not a claim of unchanged historical practice. `network-card` is a descriptive label; its `svg.community-network` draws connected nodes above the final heading on slide 05. | 03, 05 |
| `split definition-layout` | Copy div with relationship and up to three bullets, then `svg.identity-art`. Outline contains both speech symbols and dotted divider. Keep the definition to short memory cues. | 04 |
| `sequence process` | Exactly four articles with label, short heading and 1–2 lines of detail. Last rule and connector are dashed/dotted to mark a reported transition. | 06 |
| `tiles` | Four `article` children, each with `span.mini-icon`, `h3`, and 2–3 short lines. Symbols are conceptual markers, not neurological diagrams. | 07 |
| `evidence-pair` | Two paragraphs, each beginning with `span.label`: documented reports versus unproven separate mind. | 07 |
| `parallels` | Left article, `div.shared` with overlap terms, right article. Two separate oval outlines stay distinct; up to two short lines in each oval, three shared terms. | 08 |
| `bands` | Three articles, each containing label, heading and paragraph in that order. `open-question` gives the last band a dashed border. Keep each paragraph to one compact line at canvas size. | 09 |
| `risk-layout` | `ul.cues` with four bullets, then `div.branches`. Branches contains an experience paragraph, arrow span, a div with three outcome spans, and a short evidence note. | 10 |
| `staircase` | Three articles: label, h3, p. Increasing heights distinguish agency, identity and consciousness. Last two articles use Reveal `fragment`. Two-line headings maximum. | 11 |
| `split closing` | Copy div and a static `svg.mind-art` head silhouette, followed outside the split by audience question and selected sources. Closing illustration stays static and shows a question mark. | 12 |
| `reference-document` / `reference-list` | Ordinary page main, then ol; each li has an S1–S7 id, label span and content div. This page scrolls naturally and is not a Reveal slide. | References |

### Small reusable pieces

| Class | Purpose and placement |
| --- | --- |
| `eyebrow` | Small gold section label above a heading. |
| `label` | Small category/number label inside an article. |
| `cues` | A short unordered list; normally 3–4 bullets. |
| `support`, `muted`, `small` | Supporting copy, muted definition, or smaller note. Keep support short when a takeaway is present. |
| `takeaway` | Bottom-anchored key distinction. Keep content above it clear; do not stack multiple takeaways. |
| `citations` | Bottom-anchored source links. Use one compact row; keep a gap above it. |
| `relationship`, `cue` | Host/tulpa relationship line or opening progression; arrow spans receive gold styling. |
| `byline`, `cover-question` | Presenter credit and large opening question. |
| `emphasis` | Gold italic distinction below the question map. |
| `closing-lines`, `audience-question`, `selected-sources` | Closing three statements, discussion question and readable compact source line. |

### Copyable recipe: a three-stage sequence

This is an **instructional example**, not another slide already in the deck. Copy inside `.slides` and replace the text:

```html
<section data-chapter="MY TOPIC" data-timing="40">
  <p class="eyebrow">A SECTION LABEL</p>
  <h2>My main <em>question.</em></h2>
  <div class="sequence">
    <article>
      <span class="label">01 / CONTEXT</span>
      <h3>First stage</h3>
      <p>One short explanation.</p>
    </article>
    <article>
      <span class="label">02 / CHANGE</span>
      <h3>Second stage</h3>
      <p>One short explanation.</p>
    </article>
    <article>
      <span class="label">03 / QUESTION</span>
      <h3>Third stage</h3>
      <p>One short explanation.</p>
    </article>
  </div>
  <p class="takeaway">Your central distinction.</p>
  <p class="citations">
    <a href="./references.html#S1" target="_blank" rel="noopener">[S1] Author, year</a>
  </p>
  <aside class="notes">
    <p>Your spoken explanation belongs here.</p>
  </aside>
</section>
```

## Animation and pacing

**Implemented now:** Reveal fades between slides. Only slide 11 uses fragments: identity and consciousness appear on separate advances. All other cues are visible immediately, without extra clicks. Add `class="fragment"` to an element to request Reveal’s manual reveal; it is not a custom layout class.

The introduction uses `svg.mind-art.circle-emergence`: one fixed amber `circle.mind-boundary` encloses a contrasting teal circle and its decorative layers in `g.inner-presence`. Both circles share the centre (300, 300); the outer radius is 215 and the inner radius is 118. The custom CSS `emerge` keyframes repeat every 7.5 seconds: the inner circle grows from the centre, holds briefly, then fades in place before restarting. The hand-authored SVG adds a gradient rim, a fine inset, static perimeter ticks and cardinal markers, plus a radial inner fill, soft radial-gradient halo and central light. The inner circle has a single clean rim; there is no overlapping ripple or partial highlight stroke. All animated elements remain inside the outer boundary throughout. It loops while its slide is present, pauses off-slide/in overview, and can be paused from the footer. It depicts a reported presence conceptually, not evidence of a second brain or a neural mechanism. The conclusion keeps its separate head silhouette with two static points and an unresolved question. To edit the drawings, change the inline SVG circles or paths in `index.html`; to edit the loop, change `@keyframes emerge` in the theme.

OS reduced motion disables transitions/animation and displays the inner presence statically. Printing also shows a static presence and all fragments. **Auto-Animate is disabled and no slide opts into it**; there is no choreographed morph between slides.

## Evidence and delivery

Keep “practitioners report” for switching, wonderlands, distinct preferences and independent abilities. Keep attention/absorption findings distinct from proof of separate consciousness. Community and philosophical claims remain labelled as such. Avoid diagnoses based on an unusual experience, and avoid claims of proven universal safety or permanent harm.

Pause after the opening hypothetical and between agency, identity and consciousness. The final question invites discussion after the spoken conclusion. Rehearse the full script aloud before deciding what to cut.

## Validation

Checked on 19 October 2026:

- `npm run build` passes and emits both HTML pages; `git diff --check` passes.
- Headless Chromium: all 12 slides at 1366 × 768, 1280 × 720 and 1024 × 768 had no detected slide overflow or footer overlap. Key screenshots were visually inspected; the philosophy steps were enlarged after inspecting their internal text fit.
- Arrow navigation, chapter/hash updates, overview and the two philosophy fragments passed. No JavaScript exceptions were logged during the layout checks.
- Opening CSS loop runs; pause sets the paused state and accessible pressed attribute. Reduced motion disables the animation and displays a static presence.
- Reveal speaker view opened with the Notes button using a simulated user gesture. Actual presenter display arrangement still needs a manual check.
- Print layout produced 12 pages with all fragments visible. Print media disables the SVG animation; a PDF was generated during validation.
- Separate references view has seven entries, seven external source links and working S1–S7 anchors.

These checks replace the previous 11-slide results. Firefox and Edge were not retested for this remake. School hardware, actual browser installations, font differences, network rules and projector readability still need an on-site check.
