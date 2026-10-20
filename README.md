# Tulpamancy: Can One Brain Contain More Than One Mind?

A 13-slide presentation for **Ryzhkin Hlib · English News Time**, remade around the supplied script. The central distinction is **what people report ≠ what science has established**. Visible slides contain memory cues; the full spoken script is in presenter notes in `index.html`. Nine references and their evidence limits are in `references.html`, outside the numbered deck.

The slide targets total **10:05 before pauses**, including a **0:35** opening and **0:40** self-talk slide. Rehearse the script to measure actual duration. For seven minutes, trim slides 06, 08, 10 and 11 first and shorten the route explanation; preserve the introduction, religious comparison and philosophical conclusion. Reveal’s speaker timer measures your actual delivery. `data-timing` records a target in seconds for speaker pacing; it does not automatically advance slides.

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

- **Arrows / Space**: navigate; **Shift+Space**: back. Slides 03 and 04 each have three fragment advances for the self-talk forms and history beats respectively; slide 12 has two more for identity and consciousness.
- **O / Esc**: overview. **S**: Reveal speaker view with notes, upcoming slide and timer; allow popups. Keep notes on an extended second display rather than a mirrored projector.
- **F**: fullscreen. **B / .**: blackout. **?**: Reveal keyboard help.
- Footer: **Sources**, **Pause/Resume motion**, **Overview**, **Notes**, **Fullscreen**, **PDF**. Sources opens a separate page; it does not add a thirteenth slide. References link back to the conclusion.
- Slide 02’s contents entries are clickable links to slides 03–13. Tab and Enter also work; hover turns the link gold. These are ordinary HTML links (`<li><a href="#/2">Self-talk &amp; the bridge to tulpamancy</a></li>`); Reveal handles hash navigation. Hash indices start at zero, so slide 03 uses `#/2` and slide 13 uses `#/12`. Update destinations if slides are reordered.
- Hash URLs preserve slide position; `/#/0` is the introduction and `/#/12` the conclusion.
- OS reduced-motion preference disables motion at page load. Reload after changing that preference. The motion button pauses the illustration only; it does not pause navigation or the speaker timer.

For PDF, click **PDF ↗**, wait for print layout, then use desktop Chrome/Chromium/Edge **Print → Save as PDF**: landscape, no margins, background graphics on, browser headers/footers off. Reveal combines fragments on one page per slide. Toolbar and chapter labels are hidden; the illustration is static. Use `?print-pdf&showNotes=separate-page` for a notes handout. The separate bibliography can be printed independently from `references.html`.

The browser controls fullscreen permission. If the custom fullscreen button is blocked, it explains how to continue or use the browser menu. Embedded decks also depend on the parent frame’s permissions. Use a desktop browser and test the actual school display: this is a 1600 × 900 presentation canvas scaled as a whole, not a mobile article. Smaller screens make text physically smaller. Vite targets Chrome/Edge 100+ and Firefox 102+ syntax; these are build targets, not a claim that every version was tested.

## What changed in this remake

- Replaced the former 11-slide talk with all 12 supplied topics and full spoken notes.
- Removed the invented conversation and its `dialogue`, `bubble` and `other` styling. Slide 05’s speech symbols are a single conceptual SVG, not dialogue cards.
- Replaced the former generic cards, comparison, research-list and conclusion layouts with the catalogue below; obsolete selectors were removed.
- Removed the old `assets/svg/minds.svg`. The opening and ending now contain editable inline SVG in `index.html`; no separate artwork asset is needed.
- Added an experimental Reveal Auto-Animate sequence from slide 01 to slide 02: the opening circle surface and the right-hand contents panel are paired by matching IDs. The opening’s emergence loop remains a separate native CSS animation.
- Kept Reveal navigation, notes, overview, fade transitions, progress, numbering and PDF export. Added the sources link and illustration pause control.
- Added a separate, built bibliography page with all S1–S9 source IDs and scope limitations.

## Where things live and who provides them

| File / layer | Responsibility |
| --- | --- |
| `index.html` | Readable slide text, inline SVG, source labels, per-slide target durations and full `<aside class="notes">` scripts. Edit your talk here. |
| `references.html` | Full supplied bibliography and evidence limits; ordinary browser page with source anchors S1–S9. |
| `src/text-transitions.js` | Custom title/eyebrow character matching, measurement, temporary glyph overlays and cancellation; uses native browser animation, with no added dependency. |
| `src/main.js` | Custom bootstrap, chapter updates and footer controls; loads Reveal and its Notes plugin. |
| `src/config.js` | Reveal settings: 1600 × 900, 4% margin, hash navigation, fades, slide numbers, reduced motion, Auto-Animate with reduced-motion support and PDF settings. |
| `src/styles/theme.css` | Custom colours, typography, layout recipes, SVG animation, toolbar, bibliography and print rules. |
| `vite.config.js` | Vite development/build settings; both HTML pages are build entries and asset URLs use a relative base. |
| Reveal.js | Slide navigation/scaling, fragments, overview, progress, slide numbers, keyboard shortcuts, fades and print pagination. Its Notes plugin supplies presenter view and timer. |
| Browser | HTML/CSS Grid/Flexbox, SVG, CSS animation, Range text measurement, Web Animations API, media queries, new tabs, fullscreen and printing. |
| Project custom code | All layouts in the catalogue, theme, conceptual drawings, animation keyframes, chapter footer and buttons that invoke Reveal/browser APIs. |
| Vite | Development server and production bundling. It does not implement slide layouts or animations. |

Dependencies remain **Reveal.js and Vite**. No animation engine, remote font, CDN or generated bitmap was added.

## Edit slides without reading CSS

1. In `index.html`, find `<!-- SLIDE 01 ... -->` through `<!-- SLIDE 13 ... -->`.
2. Change projected text in that section and spoken paragraphs in its `<aside class="notes">` separately.
3. Keep `data-chapter` meaningful: the custom footer reads it. `data-timing="35"` is a target in seconds.
4. Copy a complete section to reuse a recipe. Keep its required children, heading and notes. Update slide labels, route numbering and README if the deck changes.
5. Preview, check readability and rebuild before publishing `dist/`.

Each direct `<section>` under `.slides` is one slide. Use one main `h1` or `h2`, `h3` for subheads, and `em` for gold emphasis. Source footers link to `./references.html#S2` etc. Add bibliographic entries in `references.html` when adding sources. Notes are hidden from projected slides, but are shipped in the public HTML.

### Layout catalogue: implemented in this deck

All slides opt into Reveal Auto-Animate with `data-auto-animate` and `data-auto-animate-id="deck"`. Give each main `h1`/`h2` `data-id="slide-title"` and each eyebrow `data-id="eyebrow"`. Keep one of each per slide. Custom code reads these IDs to animate individual characters; Reveal’s matcher is restricted to the decorative opening surface so the two animation systems do not compete.

These are custom project recipes, not Reveal templates. Practical limits target the current 16:9 canvas; additional children or longer text do not automatically shrink.

| Classes | Required children and practical limits | Used on |
| --- | --- | --- |
| `split cover-layout` | Two direct children: copy div and `div.mind-bridge` containing `div.route-surface.cover-surface[data-id="opening-surface"]` and `svg.mind-art`. Copy contains an eyebrow, large one-word title, an optional two-line `p.cover-question` (currently commented out), then `ol.opening-thread` for the opening argument. The self-talk definitions now live on slide 03. No presenter byline. | 01 |
| `route-layout` | Two children aligned at the top: motivation div with the slide’s `h2`, `ul.cues`, `question-map` and `emphasis`; `div.contents-panel` containing `div.route-surface.contents-surface[data-id="opening-surface"]`, a `p.label` and `ol.route` with `start="3"`. Up to three motivation bullets and eleven short route lines. Contents use 25px text with 1.7 line-height and 28px vertical / 32px horizontal panel padding; keep entries to one line. | 02 |
| `question-map question-field` | Inside `div.route-motivation`, below the heading, emphasis and cues. Decorative `svg.question-field-lines`, four label spans and a central `div.map-center` containing a `b` question mark. This flex-filling field occupies the remaining left column beside the contents panel, with a 280px minimum height. Keep exactly four labels, at most two short words each. The central ring is independent of the opening circle. | 02 |
| `sequence` | Three `article` children, each with `span.label`, `h3`, and short `p`. Top rules and arrows mark a conceptual sequence, not a claim of unchanged historical practice. `network-card` is a descriptive label; its `svg.community-network` draws connected nodes above the final heading on slide 06. | 03 (with `self-talk`), 04, 06 |
| `split definition-layout` | Copy div with relationship and up to three bullets, then `svg.identity-art`. Outline contains both speech symbols and dotted divider. Keep the definition to short memory cues. | 05 |
| `sequence process` | Exactly four articles with label, short heading and 1–2 lines of detail. Last rule and connector are dashed/dotted to mark a reported transition. | 07 |
| `tiles` | Four `article` children, each with `span.mini-icon`, `h3`, and 2–3 short lines. Symbols are conceptual markers, not neurological diagrams. | 08 |
| `evidence-pair` | Two paragraphs, each beginning with `span.label`: documented reports versus unproven separate mind. | 08 |
| `parallels` | Left article, `div.shared` with overlap terms, right article. Two separate oval outlines stay distinct; up to two short lines in each oval, three shared terms. | 09 |
| `bands` | Three articles, each containing label, heading and paragraph in that order. `open-question` gives the last band a dashed border. Keep each paragraph to one compact line at canvas size. | 10 |
| `risk-layout` | `ul.cues` with four bullets, then `div.branches`. Branches contains an experience paragraph, arrow span, a div with three outcome spans, and a short evidence note. | 11 |
| `staircase` | Three articles: label, h3, p. Increasing heights distinguish agency, identity and consciousness. Last two articles use Reveal `fragment`. Two-line headings maximum. | 12 |
| `split closing` | Copy div and a static `svg.mind-art` head silhouette, followed outside the split by audience question and selected sources. Closing illustration stays static and shows a question mark. | 13 |
| `reference-document` / `reference-list` | Ordinary page main, then ol; each li has an S1–S9 id, label span and content div. This page scrolls naturally and is not a Reveal slide. | References |

Slide 03 uses `sequence self-talk`: exactly three articles with `label`, `h3` and a definition/example paragraph. The articles descend from upper left to lower right, with vertical offsets of 0, 115 and 230px, a minimum height of 245px and a subtle background wash. Keep headings to one or two lines and paragraphs to about 15–20 words (roughly four lines); longer copy can collide with the bottom takeaway. This is a visual staircase, not developmental stages: the custom `self-talk` modifier removes sequence arrows. Each article has Reveal’s `fragment` class, so three advances reveal the forms in order. Custom browser CSS moves each from a shared upper starting level down into its step over 0.85 seconds, while a 2px gold pseudo-element rule stretches from left to right over 0.7 seconds after a 0.12-second delay. Reveal only toggles `visible`; no additional JavaScript or animation library is needed. Going backward reverses the effect. Reduced motion skips movement, while print shows all steps and full-width rules. A bottom `takeaway` connects dialogic inner speech to practitioner reports as a possible starting point, not a proven cause. The notes clarify that dialogic speech is a form of inner speech. Source S8 supports the self-talk terminology.

The contents list uses `li.route-group-start` to mark each new spoken group: slide 03 (First), 04 (Secondly: history, definition and communities), 07 (After that: creation and experiences), 09 (Next: religious parallels and science), and 11 (Finally: risks, independence and conclusion). Custom CSS adds a stronger gold divider above each group after the first and hides the preceding thin divider to avoid doubling it. Text and slide numbers retain their normal weight; destinations stay unchanged. Move this class if the script’s groups change.

Slide 04 uses `sequence history-route`: three `article.fragment` children with explicit `data-fragment-index="0"`, `"1"`, `"2"`, plus one decorative `div.history-pointer` containing an arrow span. The order follows the notes (Tibetan term → David-Néel → historians’ interpretation), not a historical chronology. Custom browser CSS uses `:has()` and Reveal’s `visible` class to move the single arrow along a fine rail to each article’s centre over 0.8 seconds, stopping until the next advance. Backward navigation moves it back; reduced motion removes the transition, and printing hides the rail. The static inter-article arrows are suppressed. No added JavaScript or dependency.

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
| `opening-cues` | Legacy style, unused in the current deck: three muted 18px definition rows below a fine rule for inner, private and dialogic inner speech. Each row pairs a term with its short meaning in a 205px label column and flexible definition column, with a subtle gold arrow in a 20px middle column. The arrow is a custom CSS pseudo-element; keep the two content spans per item. All are visible immediately. The speaker notes explain the three terms in one sentence. |
| `opening-thread` | A separate horizontal list of three short phrases following the remaining notes: unexpected reply, cultivated presence, another mind. Use plain `li` text, without nested spans. Custom browser Flexbox wraps when needed; markers are hidden, with no arrows or column pairing. Muted 18px text keeps the row secondary; the final question is gold. |
| `cover-question`, `byline` | Large opening question (used on slide 01) and optional presenter credit (unused in the current deck). |
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

**Implemented now:** custom character transitions connect titles and eyebrows across all 13 slides, including `h1` → `h2`. `src/text-transitions.js` measures each visible grapheme with browser Range geometry, then uses the browser Web Animations API to fly matching characters to the nearest matching position in the next text. Matching is case-sensitive, with separate character pools for the title and eyebrow: letters never travel between them. Leftover source characters fade out; new destination characters fade in after a short delay. Flights last 1.1 seconds, with up to 0.22 seconds extra for incoming characters. Existing HTML, line breaks and emphasis stay editable and are restored after the temporary, accessibility-hidden overlay is removed. Rapid navigation, resizing, overview and printing clean up active flights; reduced motion skips them. Browsers without `Intl.Segmenter` show the ordinary text transition. This moves glyphs, not the outlines of one letter into a different letter. Reveal handles only the opening surface transform and unmatched content fades. Slide 03 reveals its three self-talk steps on separate advances, with a custom downward motion and stretching gold rule. Slide 04 also has three fragment advances: Tibetan terminology, David-Néel’s 1929 account, then the historians’ Western reinterpretation. Slide 12 reveals identity and consciousness on two additional advances. Other cues are visible immediately, without extra clicks. Add `class="fragment"` to an element to request Reveal’s manual reveal; it is not a custom layout class.

The introduction uses `svg.mind-art.circle-emergence`: one fixed amber `circle.mind-boundary` encloses a contrasting teal circle and its decorative layers in `g.inner-presence`. Both circles share the centre (300, 300); the outer radius is 215 and the inner radius is 118. The custom CSS `emerge` keyframes repeat every 7.5 seconds: the inner circle grows from the centre, holds briefly, then fades in place before restarting. The hand-authored SVG adds a gradient rim, a fine inset, static perimeter ticks and cardinal markers, plus a radial inner fill, soft radial-gradient halo and central light. The inner circle has a single clean rim; there is no overlapping ripple or partial highlight stroke. All animated elements remain inside the outer boundary throughout. It loops while its slide is present, pauses off-slide/in overview, and can be paused from the footer. It depicts a reported presence conceptually, not evidence of a second brain or a neural mechanism. The conclusion keeps its separate head silhouette with two static points and an unresolved question. To edit the drawings, change the inline SVG circles or paths in `index.html`; to edit the loop, change `@keyframes emerge` in the theme.

OS reduced motion disables transitions/animation and displays the inner presence statically. Printing also shows a static presence and all fragments. **Opening surface transition:** slides 01 and 02 use the deck-wide Auto-Animate group with a 1.2-second duration. Their decorative `div.route-surface` elements share `data-id="opening-surface"`. Reveal animates the surface’s position, size, colour and border radius from a circle aligned with the opening SVG boundary into the rounded right-hand contents panel. The original SVG fades away; its paths are not morphed. The question mark has no shared ID and stays separate. Custom browser CSS lifts and fades the eleven route items into the panel with a 0.65-second initial delay and 0.045-second stagger. No extra clicks are required. The contents panel starts alongside the left-hand heading rather than below it; keep the heading inside the first `route-layout` child. The panel uses 25px list text with 1.7 line-height for more breathing room; keep all eleven entries to one line each. Reverse navigation contracts the surface back into the opening circle. Reduced motion disables these animations; print shows the full static list. Vite only bundles the code.

To turn off only the paired surface transition, remove `data-id="opening-surface"` from both decorative surfaces. The SVG, panel and list remain. The stagger applies whenever Reveal marks slide 02 as an active Auto-Animate destination, including returning from slide 03. Keep the two surface elements decorative with `aria-hidden="true"`; editable contents stay in the ordinary HTML list.

## Evidence and delivery

Keep “practitioners report” for switching, wonderlands, distinct preferences and independent abilities. Keep attention/absorption findings distinct from proof of separate consciousness. Community and philosophical claims remain labelled as such. Avoid diagnoses based on an unusual experience, and avoid claims of proven universal safety or permanent harm.

Pause after the opening hypothetical and between agency, identity and consciousness. The final question invites discussion after the spoken conclusion. Rehearse the full script aloud before deciding what to cut.

## Validation

Historical checks on 19 October 2026, before the new self-talk slide (the 12-slide results below do not validate the current 13-slide layout):

- `npm run build` passes and emits both HTML pages; `git diff --check` passes.
- Headless Chromium: all 12 slides at 1366 × 768, 1280 × 720 and 1024 × 768 had no detected slide overflow or footer overlap. Key screenshots were visually inspected; the philosophy steps were enlarged after inspecting their internal text fit.
- Arrow navigation, chapter/hash updates, overview and the two philosophy fragments passed. No JavaScript exceptions were logged during the layout checks.
- Opening CSS loop runs; pause sets the paused state and accessible pressed attribute. Reduced motion disables the animation and displays a static presence.
- Reveal speaker view opened with the Notes button using a simulated user gesture. Actual presenter display arrangement still needs a manual check.
- Print layout produced 12 pages with all fragments visible. Print media disables the SVG animation; a PDF was generated during validation.
- Separate references view has seven entries, seven external source links and working S1–S9 anchors.

These checks replace the previous 11-slide results. Firefox and Edge were not retested for this remake. School hardware, actual browser installations, font differences, network rules and projector readability still need an on-site check.

Current restructuring: `npm run build` and `git diff --check` pass. The deck has 13 slides; slide 02 lists all 11 remaining slides in order, and the bibliography returns to conclusion hash `#/12`. A fresh browser/print layout pass remains to be done.

### Reversible question-field experiment

Slide 02 now uses `route-motivation` (a flex column) and `question-field` to fill the remaining left-hand area with four pill labels, a central question ring, fine elliptical outlines and dotted curved connections. The connections represent shared questions, not proven causal mechanisms. Browser CSS animates only the dotted lines with a slow 14-second dash motion; labels stay still. Motion pauses off-slide, in overview and with the existing motion button. Reduced motion and printing disable it. Reveal supplies the slide’s `present` class; Vite only bundles the files.

The version immediately before this experiment is saved for this session in `/tmp/tulpamancy-before-expanded-question-map/` (`index.html`, `theme.css`, `README.md`). To reverse only this experiment after further edits, remove the marked decorative SVG, `question-field` and `route-motivation` classes, restore the original map markup from that snapshot, and remove the final “Expanded slide-02 question map experiment” CSS block and this documentation. Avoid restoring entire files if subsequent edits need to be retained.

Slide 04 cites David-Néel’s book as S9 beside the existing S1 historical analysis. The bibliography distinguishes the 1932 English edition from the 1929 French original and labels it as a historical account rather than scientific verification.
