# Tulpamancy: Can One Brain Contain More Than One Mind?

A 13-slide presentation for **Ryzhkin Hlib · English News Time**, remade around the supplied script. The central distinction is **what people report ≠ what science has established**. Visible slides contain memory cues; the full spoken script is in presenter notes in `index.html`. Nine references, their evidence limits and expanded technology credits are in `references.html`, outside the numbered deck.

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

## Build on GitHub and copy to an Ubuntu VPS

`.github/workflows/build.yml` runs on every push to any branch and can also be started from **Actions → Build presentation → Run workflow** once the workflow is on the repository’s default branch. It uses Node.js 22, installs the lockfile with `npm ci`, runs Vite’s production build, checks both HTML pages and the local icon license, then uploads a **tulpamancy-dist** artifact retained for 30 days. Push this workflow along with your presentation changes to activate it. No repository secrets or VPS credentials are needed. A failed build does not upload an artifact. The workflow builds the website; copying it to the VPS remains a manual step.

1. Push your changes to GitHub.
2. Open the repository’s **Actions → Build presentation** and choose the successful run for the commit/branch you want.
3. Under **Artifacts**, download **tulpamancy-dist**. You must be signed into GitHub with access to the repository. GitHub downloads a ZIP whose root contains `index.html`, `references.html`, `assets/` and `lucide-license.txt`—there is no extra `dist/` wrapper. This is the complete built website; the VPS needs no Node.js, npm or source checkout.
4. From the directory containing the downloaded ZIP on your computer, copy it to the VPS. Replace the user and IP:

```sh
scp tulpamancy-dist.zip YOUR_USER@YOUR_VPS_IP:~/
```

On the Ubuntu VPS, extract the website into the public directory:

```sh
sudo apt update
sudo apt install unzip
sudo mkdir -p /var/www/tulpamancy
sudo unzip -o ~/tulpamancy-dist.zip -d /var/www/tulpamancy
sudo chmod -R a+rX /var/www/tulpamancy
```

You can instead unzip the artifact locally into a `dist/` folder and transfer its **entire contents**. The important file is `/var/www/tulpamancy/index.html`, not `/var/www/tulpamancy/dist/index.html`.

### Serve with Caddy

Caddy serves the finished static files. It is a VPS hosting tool, not a new presentation dependency. Reveal.js still supplies the slide engine in the browser, and Vite runs only during the build.

If Caddy is not already installed, follow its [official Ubuntu package instructions](https://caddyserver.com/docs/install#debian-ubuntu-raspbian). For a fresh Ubuntu installation:

```sh
sudo apt install --yes debian-keyring debian-archive-keyring apt-transport-https curl gnupg
curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/gpg.key' | sudo gpg --dearmor -o /usr/share/keyrings/caddy-stable-archive-keyring.gpg
curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/debian.deb.txt' | sudo tee /etc/apt/sources.list.d/caddy-stable.list
sudo chmod o+r /usr/share/keyrings/caddy-stable-archive-keyring.gpg
sudo chmod o+r /etc/apt/sources.list.d/caddy-stable.list
sudo apt update
sudo apt install caddy
```

Edit `/etc/caddy/Caddyfile` with `sudo nano /etc/caddy/Caddyfile`. On a fresh install, replace the default example site with this block. If you already host other sites, keep their blocks and add this as a separate site on an available port. A copy is provided in `deploy/Caddyfile`:

```caddyfile
:8080 {
    root * /var/www/tulpamancy
    encode zstd gzip
    file_server
}
```

Validate and start/reload the system service:

```sh
sudo caddy validate --config /etc/caddy/Caddyfile
sudo systemctl enable --now caddy
sudo systemctl reload caddy
```

Allow **TCP port 8080** in your VPS provider’s firewall. If UFW is active, allow it there too with `sudo ufw allow 8080/tcp`. Open **`http://YOUR_VPS_IP:8080`**. This example uses HTTP on a dedicated port and needs no domain; Caddy’s service keeps serving after SSH disconnects. For a domain with HTTPS, point its DNS to the VPS, replace `:8080` with the hostname and allow ports 80/443, following [Caddy’s HTTPS guide](https://caddyserver.com/docs/quick-starts/https).

For future updates, download the artifact from the new successful run and repeat the copy/extract commands. Caddy reads the updated files without a restart; reload the browser. Reload Caddy only after changing its configuration. Build artifacts are temporary downloads, not GitHub releases or automatically committed `dist/` files. See [GitHub’s artifact documentation](https://docs.github.com/en/actions/tutorials/store-and-share-data) and [Caddy’s static-file guide](https://caddyserver.com/docs/quick-starts/static-files).

## Present and export

- **Arrows / Space**: navigate; **Shift+Space**: back. Slides 03, 04 and 05 each have three fragment advances for the self-talk forms and history beats; slide 07 has four advances for the reported process, slide 08 has one advance for community terms, slide 09 has four advances for its practice comparison, slide 10 has five advances for evidence, limits and research methods, slide 11 has five advances starting with its experience map, and slide 12 has two more for identity and consciousness.
- **O / Esc**: overview. **S**: Reveal speaker view with notes, upcoming slide and timer; allow popups. Keep notes on an extended second display rather than a mirrored projector.
- **F**: fullscreen. **B / .**: blackout. **?**: Reveal keyboard help.
- Footer: **Sources**, **Pause/Resume motion**, **Overview**, **Notes**, **Fullscreen**, **PDF**. Sources opens a separate page outside the 13-slide deck. References link back to the conclusion.
- Slide 02’s contents entries are clickable links to slides 03–13. Tab and Enter also work; hover turns the link gold. These are ordinary HTML links (`<li><a href="#/2">Types of self-talk</a></li>`); Reveal handles hash navigation. Hash indices start at zero, so slide 03 uses `#/2` and slide 13 uses `#/12`. Update destinations if slides are reordered. The contents wording matches each destination slide’s actual `.eyebrow` text after its numeric prefix, using sentence case in the route (preserve Roman numerals and proper names). Eyebrows have no leading or trailing spaces and use one space on each side of `/`. When editing an eyebrow on slides 03–13, update its contents link text in `index.html` too; these labels are authored HTML, not generated by Reveal or Vite.
- Hash URLs preserve slide position; `/#/0` is the introduction and `/#/12` the conclusion.
- OS reduced-motion preference disables motion at page load. Reload after changing that preference. The motion button pauses the looping illustrations and question-map motion and skips finite fragment/contents transitions; it does not pause navigation or the speaker timer.

For PDF, click **PDF ↗**, wait for print layout, then use desktop Chrome/Chromium/Edge **Print → Save as PDF**: landscape, no margins, background graphics on, browser headers/footers off. Reveal combines fragments on one page per slide. Toolbar is hidden; the illustration is static. Use `?print-pdf&showNotes=separate-page` for a notes handout. The separate bibliography can be printed independently from `references.html`.

The browser controls fullscreen permission. If the custom fullscreen button is blocked, it explains how to continue or use the browser menu. Embedded decks also depend on the parent frame’s permissions. Use a desktop browser and test the actual school display: this is a 1600 × 900 presentation canvas scaled as a whole, not a mobile article. Smaller screens make text physically smaller. Vite targets Chrome/Edge 100+ and Firefox 102+ syntax; these are build targets, not a claim that every version was tested.

## What changed in this remake

- Replaced the former 11-slide talk with all 12 supplied topics and full spoken notes.
- Removed the invented conversation and its `dialogue`, `bubble` and `other` styling. Slide 06 now uses a conceptual shared-frame illustration of host and inner companion.
- Replaced the former generic cards, comparison, research-list and conclusion layouts with the catalogue below; obsolete selectors were removed.
- Removed the old `assets/svg/minds.svg`. The opening contains editable inline SVG in `index.html`; the conclusion uses HTML/CSS, with no separate artwork asset.
- Added an experimental Reveal Auto-Animate sequence from slide 01 to slide 02: the opening circle surface and the right-hand contents panel are paired by matching IDs. The opening’s emergence loop remains a separate native CSS animation.
- Kept Reveal navigation, notes, overview, fade transitions, progress, numbering and PDF export. Added the sources link and illustration pause control.
- Added a separate, built bibliography page with all S1–S9 source IDs and scope limitations.

## Where things live and who provides them

| File / layer | Responsibility |
| --- | --- |
| `index.html` | Readable slide text, inline SVG, source labels, per-slide target durations and full `<aside class="notes">` scripts. Edit your talk here. |
| `references.html` | Full bibliography and evidence limits (S1–S9), plus expanded technology/attribution details at `#technology`; ordinary browser page. |
| `src/text-transitions.js` | Custom title/eyebrow character matching, measurement, temporary glyph overlays and cancellation; uses native browser animation, with no added dependency. |
| `src/main.js` | Custom bootstrap and footer controls; loads Reveal and its Notes plugin. |
| `src/config.js` | Reveal settings: 1600 × 900, 4% margin, hash navigation, fades, slide numbers, reduced motion, Auto-Animate with reduced-motion support and PDF settings. |
| `src/styles/theme.css` | Custom colours, typography, layout recipes, SVG animation, toolbar, bibliography and print rules. |
| `public/lucide-license.txt` | Upstream Lucide/Feather license notices for the inline history/process icons; Vite copies this static file into the build. |
| `vite.config.js` | Vite development/build settings; both HTML pages are build entries and asset URLs use a relative base. |
| `.github/workflows/build.yml` | GitHub-hosted build on push, dependency caching and downloadable ready-to-serve artifact; no automatic VPS deployment. |
| `deploy/Caddyfile` | Copyable VPS hosting example: serve `/var/www/tulpamancy` on HTTP port 8080 with Caddy. |
| Reveal.js | Slide navigation/scaling, fragments, overview, progress, slide numbers, keyboard shortcuts, fades and print pagination. Its Notes plugin supplies presenter view and timer. |
| Browser | HTML/CSS Grid/Flexbox, SVG, CSS animation, Range text measurement, Web Animations API, media queries, new tabs, fullscreen and printing. |
| Project custom code | All layouts in the catalogue, theme, conceptual drawings, animation keyframes, footer toolbar and buttons that invoke Reveal/browser APIs. |
| Vite | Development server and production bundling. It does not implement slide layouts or animations. |

Dependencies remain **Reveal.js and Vite**. No animation engine, remote font, CDN or generated bitmap was added. Twelve Lucide icon instances are inlined locally; no icon package or network request is needed when presenting. Their upstream license is retained in `public/lucide-license.txt` and copied by Vite to `dist/lucide-license.txt`.

## Edit slides without reading CSS

1. In `index.html`, find `<!-- SLIDE 01 ... -->` through `<!-- SLIDE 13 ... -->`.
2. Change projected text in that section and spoken paragraphs in its `<aside class="notes">` separately.
3. Use the eyebrow as the only topic label; there is no duplicate footer label or `data-chapter` attribute. `data-timing="35"` is a target in seconds.
4. Copy a complete section to reuse a recipe. Keep its required children, heading and notes. Update slide labels, route numbering and README if the deck changes.
5. Preview, check readability and rebuild before publishing `dist/`.

Each direct `<section>` under `.slides` is one slide. Use one main `h1` or `h2`, `h3` for subheads, and `em` for gold emphasis. Source footers link to `./references.html#S2` etc. Add bibliographic entries in `references.html` when adding sources. Notes are hidden from projected slides, but are shipped in the public HTML. Speaker notes on slides 03, 04, 05, 07, 08, 09, 10, 11 and 12 use bold `REVEAL` cues immediately before the text for each manual fragment advance. These are presenter instructions in HTML, not animation commands; Reveal.js handles the actual fragments. Slide 07’s final cue also reveals its support note, and slide 12’s agency card is visible on entry, so it has no reveal cue.

### Layout catalogue: implemented in this deck

All slides opt into Reveal Auto-Animate with `data-auto-animate` and `data-auto-animate-id="deck"`. Give each main `h1`/`h2` `data-id="slide-title"` and each eyebrow `data-id="eyebrow"`. Keep one of each per slide. Custom code reads these IDs to animate individual characters; Reveal’s matcher is restricted to the decorative opening surface so the two animation systems do not compete.

These are custom project recipes, not Reveal templates. Practical limits target the current 16:9 canvas; additional children or longer text do not automatically shrink.

| Classes | Required children and practical limits | Used on |
| --- | --- | --- |
| `split cover-layout` | Two direct children: copy div and `div.mind-bridge` containing `div.route-surface.cover-surface[data-id="opening-surface"]` and `svg.mind-art`. Copy contains an eyebrow, large one-word title, an optional two-line `p.cover-question` (currently commented out), then `ol.opening-thread` for the opening argument. The self-talk definitions now live on slide 03. No presenter byline. | 01 |
| `route-layout` | Two children aligned at the top: motivation div with the slide’s `h2`, `ul.cues`, `question-map` and `emphasis`; `div.contents-panel` containing `div.route-surface.contents-surface[data-id="opening-surface"]`, a `p.label` and `ol.route` with `start="3"`. Up to three motivation bullets and eleven short route lines. Contents use 25px text with 1.7 line-height and 28px vertical / 32px horizontal panel padding; keep entries to one line. | 02 |
| `question-map question-field` | Inside `div.route-motivation`, below the heading, emphasis and cues. Decorative `svg.question-field-lines`, four label spans and a central `div.map-center` containing a `b` question mark. This flex-filling field occupies the remaining left column beside the contents panel, with a 280px minimum height. Keep exactly four labels, at most two short words each. The central ring is independent of the opening circle. | 02 |
| `sequence` | Three `article` children, each with `span.label`, `h3`, and short `p`. Top rules and arrows mark a conceptual sequence, not a claim of unchanged historical practice. Slides 04–05 add one decorative `svg.history-icon` between each label and heading. All six are 52px Lucide line icons, coloured sage: landmark, book-open, sparkles, ghost, brain and messages-square. The icons are topic cues, not historical artefacts or anatomical evidence. | 03 (with `self-talk`), 04, 05 |
| `split definition-layout` | Copy div with `relationship`, `muted` summary and `ul.cues.definition-cues`, then `svg.companion-art`. Exactly three cue items, each starting with `span.definition-cue-label`: beginnings, communication, perceived autonomy. Keep each cue to 1–2 lines. The 480px-high SVG shows host and inner companion within one frame, not a brain diagram. | 06 |
| `sequence process history-route` | Four `article.fragment` children indexed 0–3, each with label, short heading and 1–2 lines of detail, plus the shared decorative `history-pointer`. Reuses the left-entry and stretching-line motion from slides 04–05. Four arrow stops follow imagine → attend → interact → reported change. The arrow rail is solid; only the final card’s top rule is dotted to preserve the uncertain reported transition. Support shares index 3. | 07 |
| `tiles experience-tiles` | Four `article` children, each with decorative `svg.experience-art` (240 × 130 viewBox), `h3`, and a short paragraph of at most two lines. Static scenes cue the imagined world, switching, body control and differing preferences/memories/skills. Keep this order to follow the notes. | 08 |
| `experience-lens` | Two text divs around `div.experience-gap`; each side has a label and two short lines. Opens the experience-versus-explanation question before the term cards. | 08 |
| `parallels` | Left article, `div.shared` with overlap terms, right article. Two separate oval outlines stay distinct; up to two short lines in each oval, three shared terms. | 09 |
| `bands science-bands` | Three articles, each with `span.label`, `h3`, then a two-line paragraph (main cue, `<br>`, muted `span` explanation). Columns distinguish documented reports, possible processes and the unestablished consciousness claim. Keep headings short and each paragraph line compact. `open-question` gives the final row a dashed outline. | 10 |
| `risk-layout` | `ul.cues.risk-cues` with four fragments, then `div.experience-map` (opening fragment). The map requires `experience-root`, decorative `experience-connections` SVG, `experience-domains` with three children, and `experience-map-limit`. See the slide-11 reveal order below. | 11 |
| `staircase` | Three articles: label, h3, p. Increasing heights distinguish agency, identity and consciousness. Last two articles use Reveal `fragment`. Two-line headings maximum. | 12 |
| `conclusion-balance`, `conclusion-question`, `conclusion-credits` | Below the eyebrow, heading and `conclusion-summary`: two articles (label, h3, three short list items), one labelled two-line audience question, then two compact credit paragraphs. Sources and technology details link to the separate references page. No additional fragments. | 13 |
| `reference-document` / `reference-list` | Ordinary page main, then ol; each li has an S1–S9 id, label span and content div. This page scrolls naturally and is not a Reveal slide. | References |

Slide 03 uses `sequence self-talk`: exactly three articles with `label`, `h3` and a definition/example paragraph. The articles descend from upper left to lower right, starting 32px below the heading, with vertical offsets of 0, 75 and 150px, a minimum height of 245px and a subtle background wash. Keep headings to one or two lines and paragraphs to about 15–20 words (roughly four lines); longer copy can collide with the bottom takeaway. This is a visual staircase, not developmental stages: the custom `self-talk` modifier removes sequence arrows. Each article has Reveal’s `fragment` class, so three advances reveal the forms in order. Custom browser CSS moves each from a shared upper starting level down into its step over 0.85 seconds, while a 2px gold pseudo-element rule stretches from left to right over 0.7 seconds after a 0.12-second delay. Reveal only toggles `visible`; no additional JavaScript or animation library is needed. Going backward reverses the effect. Reduced motion skips movement, while print shows all steps and full-width rules. A bottom `takeaway` connects dialogic inner speech to practitioner reports as a possible starting point, not a proven cause. The notes clarify that dialogic speech is a form of inner speech. Source S8 supports the self-talk terminology.

The contents list uses `li.route-group-start` to mark each new spoken group: slide 03 (First), 04 (Secondly: history, communities and definition), 07 (After that: creation and experiences), 09 (Next: religious parallels and science), and 11 (Finally: risks, independence and conclusion). Custom CSS adds a stronger gold divider above each group after the first and hides the preceding thin divider to avoid doubling it. Text and slide numbers retain their normal weight; destinations stay unchanged. Move this class if the script’s groups change.

Slides 04 and 05 use `sequence history-route`: three `article.fragment` children with explicit `data-fragment-index="0"`, `"1"`, `"2"`, plus one decorative `div.history-pointer` containing an arrow span. Slide 04 follows the notes (Tibetan term → David-Néel → historians’ interpretation), not a historical chronology. Slide 05 continues the same style with paranormal lore → psychological framing → connected communities; the Veissière support line shares fragment index 2 and appears with the third part, without an extra advance. Custom browser CSS uses `:has()` and Reveal’s `visible` class to move the single arrow along a fine rail to each article’s centre over 0.8 seconds, stopping until the next advance. Backward navigation moves it back; reduced motion removes the transition, and printing hides the rail. The static inter-article arrows are suppressed. Each revealed article also slides in 65px from the left and fades into view over 0.85 seconds, while its 2px gold top rule stretches left to right over 0.7 seconds after a 0.12-second delay. Going backward reverses the motion. These article transitions are disabled for reduced motion and print. No added JavaScript or dependency.

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
| `conclusion-summary`, `conclusion-balance`, `conclusion-question`, `conclusion-credits` | Slide-13 distinction, reported-experience/open-question cues, hypothetical discussion question and compact source/stack credits. |

### Copyable recipe: a three-stage sequence

This is an **instructional example**, not another slide already in the deck. Copy inside `.slides` and replace the text:

```html
<section data-timing="40">
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

**Implemented now:** custom character transitions connect titles and eyebrows across all 13 slides, including `h1` → `h2`. `src/text-transitions.js` measures each visible grapheme with browser Range geometry, then uses the browser Web Animations API to fly matching characters to the nearest matching position in the next text. Matching is case-sensitive, with separate character pools for the title and eyebrow: letters never travel between them. Leftover source characters fade out; new destination characters fade in after a short delay. Flights last 1.1 seconds, with up to 0.22 seconds extra for incoming characters. Existing HTML, line breaks and emphasis stay editable and are restored after the temporary, accessibility-hidden overlay is removed. Rapid navigation, resizing, overview and printing clean up active flights; reduced motion skips them. Browsers without `Intl.Segmenter` show the ordinary text transition. This moves glyphs, not the outlines of one letter into a different letter. Reveal handles only the opening surface transform and unmatched content fades. Slide 03 reveals its three self-talk steps on separate advances, with a custom downward motion and stretching gold rule. Slide 04 also has three fragment advances: Tibetan terminology, David-Néel’s 1929 account, then the historians’ Western reinterpretation. Slide 05 continues with three advances for paranormal lore, psychological framing and communities, using the same moving arrow. Slide 07 reuses this timeline style with four fragment advances and four arrow stops; its solid rail guides the arrow, while the dotted final card rule distinguishes the reported outcome, and the support note appears with the fourth step. Slide 12 reveals identity and consciousness on two additional advances. Slide 08 opens with its experience-versus-explanation comparison, then reveals the community terms on one advance. Other cues are visible immediately, without extra clicks. Add `class="fragment"` to an element to request Reveal’s manual reveal; it is not a custom layout class.

The introduction uses `svg.mind-art.circle-emergence`: one fixed amber `circle.mind-boundary` encloses a contrasting teal circle and its decorative layers in `g.inner-presence`. Both circles share the centre (300, 300); the outer radius is 215 and the inner radius is 118. The custom CSS `emerge` keyframes repeat every 7.5 seconds: the inner circle grows from the centre, holds briefly, then fades in place before restarting. The hand-authored SVG adds a gradient rim, a fine inset, static perimeter ticks and cardinal markers, plus a radial inner fill, soft radial-gradient halo and central light. The inner circle has a single clean rim; there is no overlapping ripple or partial highlight stroke. All animated elements remain inside the outer boundary throughout. It loops while its slide is present, pauses off-slide/in overview, and can be paused from the footer. It depicts a reported presence conceptually, not evidence of a second brain or a neural mechanism. The conclusion now uses a text-based reported-experience/open-question comparison, followed by a hypothetical audience question and compact credits. To edit the drawings, change the inline SVG circles or paths in `index.html`; to edit the loop, change `@keyframes emerge` in the theme.

OS reduced motion disables transitions/animation and displays the inner presence statically. Printing also shows a static presence and all fragments. **Opening surface transition:** slides 01 and 02 use the deck-wide Auto-Animate group with a 1.2-second duration. Their decorative `div.route-surface` elements share `data-id="opening-surface"`. Reveal animates the surface’s position, size, colour and border radius from a circle aligned with the opening SVG boundary into the rounded right-hand contents panel. The original SVG fades away; its paths are not morphed. The question mark has no shared ID and stays separate. Custom browser CSS transitions lift and fade the eleven route items into the panel with a 0.65-second initial delay and 0.045-second stagger, then fade and lower them when leaving. No extra clicks are required. The contents panel starts alongside the left-hand heading rather than below it; keep the heading inside the first `route-layout` child. The panel uses 25px list text with 1.7 line-height for more breathing room; keep all eleven entries to one line each. Reverse navigation contracts the surface back into the opening circle. Reduced motion disables these animations; print shows the full static list. Vite only bundles the code.

To turn off only the paired surface transition, remove `data-id="opening-surface"` from both decorative surfaces. The SVG, panel and list remain. The stagger applies whenever Reveal marks slide 02 `present`, including returning from slide 03. Keep the two surface elements decorative with `aria-hidden="true"`; editable contents stay in the ordinary HTML list.

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

Current restructuring: `npm run build` and `git diff --check` pass. The deck has 13 slides; slide 02 lists all 11 remaining slides in order, and the bibliography returns to conclusion hash `#/12`. The PDF layout was rechecked on 20 October 2026 as described below; these checks do not cover all live navigation and animations.

### Reversible question-field experiment

Slide 02 now uses `route-motivation` (a flex column) and `question-field` to fill the remaining left-hand area with four pill labels, a central question ring, fine elliptical outlines and dotted curved connections. The connections represent shared questions, not proven causal mechanisms. Browser CSS animates only the dotted lines with a slow 14-second dash motion; labels stay still. Motion pauses off-slide, in overview and with the existing motion button. Reduced motion and printing disable it. Reveal supplies the slide’s `present` class; Vite only bundles the files.

The version immediately before this experiment is saved for this session in `/tmp/tulpamancy-before-expanded-question-map/` (`index.html`, `theme.css`, `README.md`). To reverse only this experiment after further edits, remove the marked decorative SVG, `question-field` and `route-motivation` classes, restore the original map markup from that snapshot, and remove the final “Expanded slide-02 question map experiment” CSS block and this documentation. Avoid restoring entire files if subsequent edits need to be retained.

Slide 04 cites David-Néel’s book as S9 beside the existing S1 historical analysis. The bibliography distinguishes the 1932 English edition from the 1929 French original and labels it as a historical account rather than scientific verification.

Slide 06’s `companion-art` is hand-authored inline SVG. Two enlarged points share a rounded frame with radial glow fields, a dotted loop, slowly counter-rotating segmented rings, and two luminous strokes travelling along a broader curved loop. Their surrounding halos pulse alternately. The right column is slightly wider than the text column (`1fr 1.15fr`); the SVG is 480px high. Browser CSS runs the 9-second dash flow, 5-second halo pulse, 6-second light trails and 24-second ring rotations only on the current slide. The existing motion button and overview pause them; reduced motion and print show a static illustration. Labels remain still. This is a conceptual rendering of reported communication, not a neural model or evidence of independent consciousness. Editable labels and cue text remain in `index.html`; the script is unchanged.

Slides 04–06 follow history → online communities → modern definition. Short bridges in their notes connect the historical reinterpretation to online usage, then the modern companion experience to slide 07’s reported creation process. Slide 02’s spoken plan and clickable list follow this order.

History icons come from the [official Lucide repository](https://github.com/lucide-icons/lucide/tree/main/icons); the local license preserves the required attribution. Keep `aria-hidden="true"` because each adjacent heading already names the topic. Replace only the SVG paths to change an icon, retaining the shared `history-icon` class and 24 × 24 viewBox.

### PDF layout repair (20 October 2026)

Reveal’s print mode wraps slides in `.pdf-page` and resets section padding. The live deck’s direct-child layout selector no longer applies after that wrapping, causing slide heights to collapse and bottom-anchored takeaways/citations to overlap content. Custom `html.reveal-print` rules now preserve the same 900px slide height and 92px / 80px / 86px padding inside Reveal’s 1600px-wide canvas. Update these values alongside the live slide layout if the canvas changes. These rules apply in the PDF preview as well as the final print output.

Print mode disables CSS animations/transitions, resets fragment transforms and stretching rules, shows every fragment, hides temporary text flights and moving arrow rails, and restores any hidden heading text. It preserves structural positioning inside SVGs and the question map. Reveal still supplies pagination; the browser produces the PDF. Use the PDF button to enter `?print-pdf` before printing.

Verified with headless Chromium: generated PDF contains 13 landscape pages, all 13 slide sections retain 900px height and original padding, and no visible text/SVG bounds extend below their slide. Rendered PDF pages 02–06 were visually inspected, including the contents panel, self-talk steps, history cards, sources and companion illustration. `npm run build` and `git diff --check` pass.

The deck and references declare `color-scheme: only dark` in CSS and an HTML `color-scheme` meta tag declaring `dark`: there is no automatic light theme or OS colour-theme adaptation. The companion SVG preserves its authored palette under forced-colour processing and includes explicit fallback frame colours. Reveal’s separate speaker-console interface has its own styling (including its light notes area); the slide previews load the same fixed dark deck. Browser extensions that rewrite page colours can still override site styling.

Slide 07 extends the shared `history-route` CSS with four arrow positions (12.5%, 37.5%, 62.5%, 87.5%) via the `process` modifier. The final rule uses a repeating CSS gradient to stay dotted while stretching. Reveal controls fragment state; all motion, reverse navigation, reduced-motion handling and PDF resets reuse the existing timeline rules. No JavaScript or dependencies were added.

Slide 07 reuses the 52px sage `history-icon` SVG style: `user-round` for imagining a companion, `focus` for sustained attention, `messages-square` for inner dialogue and `zap` for apparently spontaneous replies. Each sits between the label and heading and reveals with its existing fragment. These are conceptual cues, not claims about a mechanism. All SVG paths come from Lucide and use the existing bundled license; no new dependency or runtime request is needed.

Slide hierarchy: the eyebrow is the single topic label. The large `h2` provides a hook, question or central statement; slide 01 retains the presentation title as its `h1`. The repeated bottom-left chapter label and `data-chapter` attributes have been removed. The footer contains only the existing controls, grouped on the right with Flexbox, leaving the left side empty and reserving space on the right for Reveal’s slide number and navigation. PDF canvas rules target `section[data-timing]` and do not depend on chapter metadata.

Full HD layout adjustment: footer controls use 13px text on desktop (the existing 9px compact-screen rule remains). Slide 03’s step offsets are 0/75/150px to leave clearance beneath its two-line hook, and slide 07’s timeline starts 72px below its heading and uses a scoped 35px support-note margin to clear the takeaway. Reveal scales the 1600 × 900 canvas to the screen; the fixes apply at every viewport size, not only Full HD.

Full HD verification: all 13 slides at 1920 × 1080, with every fragment shown, passed checks for slide-boundary overflow and content overlapping bottom takeaways. Slide 03’s completed layout and enlarged footer were visually inspected. These are final-layout checks with reduced motion, not a full animation or presenter-window test.

Slide 08 opens with `div.experience-lens`: two text divs around a central `div.experience-gap`. The left asks whether practice “works” as an experience; the right asks whether it establishes a separate mind. The central ≠ and “What makes it real?” distinguish an experience from its interpretation. Keep each side to one short label and two lines. This is a custom CSS Grid layout, not a Reveal template.

One manual Reveal fragment advance then introduces all four community-term cards and the support note together (`data-fragment-index="0"` on both). The notes mark that advance with a bold `REVEAL` cue. Keep `tiles experience-tiles fragment` around four articles, each containing decorative `svg.experience-art`, a heading and at most two short lines. The 240 × 160 SVG drawings render at 140px high here. They depict wonderland, switching, body control and reported identity differences conceptually, not measured brain activity. The support note uses `support experience-question fragment`, a `span.label` and one short line about variable community usage. The former separate evidence row has been replaced by the opening comparison.

Custom browser CSS transitions the cards when Reveal marks the group `visible`: 0.85 seconds per card, delayed 0.08 / 0.22 / 0.36 / 0.50 seconds from left to right. The overlapping drop decelerates without rotation, overshoot or bounce. Reversing the fragment sends the cards back upward, starting from the right; revealing it again returns them from their current positions. The motion control skips the drop and return; reduced motion also skips it while preserving the manual reveal. Overview and PDF/print show the completed layout without card animation. Reveal controls fragment visibility and navigation; the browser renders SVG and CSS motion; Vite bundles the files.

The revised slide-08 notes begin with definitions of “works” and “real,” distinguish experience from explanation using a dream analogy, and explain the limits of first-person reports without claiming subjective experience is impossible to investigate. They finish with community vocabulary and reported differences. The abandonment/ending-practice discussion is removed. The existing 1:05 target remains a rehearsal target; measure the revised script aloud.

Slide 08’s enlarged illustrations are hand-authored inline SVG with flat opaque layers and fine line detail. Wonderland is only a landscape: snow-edged mountains, a sun, a lake feeding a winding stream, and two conifers; there are no people, presence markers or cloud strokes. Its landscape layers are clipped to the rounded scene frame. Switching uses two coloured positions and exchange arrows; body control shows a side-view forearm with the wrist bent upward ending in a small palm with short separated fingers, tilted 14° left around the wrist using its SVG group transform. The forearm, palm and wrist marker share an outer `translate(0 18)` group to sit slightly lower inside the fixed scene frame, plus a wrist marker and one curved movement arrow; identity repeats the same music-note symbol on two profile sheets, plain on one and crossed out on the other to show opposing preferences. The music notes fill the area below each profile header (roughly y=73–127 in the SVG), with enlarged noteheads and taller stems. There are no additional check or cross marks below the notes. These are illustrative cues, not standardized community symbols or scientific diagrams. The landscape uses the uniquely named `wonderland-window` clip path: rename both the ID and its `clip-path` reference if duplicating it. Keep artwork within the 240 × 160 viewBox. The four-card order, notes, single fragment advance and smooth staggered entrance are unchanged. Colours are custom CSS classes in `theme.css`; browser SVG renders the art, Reveal controls visibility/scaling and Vite bundles it.

Slide 08’s SVG markup keeps one element per line and retains named classes and transform groups. Internal illustration comments and commented-out shapes have been removed. Each Wonderland tree combines its trunk and triangular outline in one compact path; the disabled upper branch outlines remain absent. Editable slide text and notes remain readable HTML.

Slide 09’s existing `parallels` layout now compares repeated tulpa “forcing” with some forms of personal, imaginative prayer. The left oval cues imagining a companion and returning to dialogue; the right cues addressing a personal presence and listening. The three shared terms are attention, imagination and dialogue. Keep the side descriptions to two short lines and the centre to three single-word terms. The support line asks whether repeated practice can make a felt presence more vivid; the takeaway preserves “Similarity ≠ identical cause.” These are authored HTML cues in the existing custom layout, with the four fragment advances described below.

The slide-09 notes follow left → right → shared processes → research → interpretation. Luhrmann and Morgain’s 2012 experiment (S5) supports cultivation of imagery and reported spiritual experience in a particular prayer context. The suggestion that this may resemble aspects of tulpa experience is explicitly a comparison, not a finding that prayer creates tulpas, a claim about all religious practice, or a conclusion about God’s existence. The previous spontaneous-companion opening is replaced by this practice-focused comparison. The 0:55 target remains for rehearsal.

Slide 09 adds the `practice-parallels` modifier to the existing three-column `parallels` recipe. Keep the DOM order left article → centre `shared` div → right article, but assign `fragment fade-up` indices 0 → 2 → 1 respectively. This gives the spoken reveal order left (tulpa forcing), right (prayer), centre (possible shared processes). A separate `practice-finish fragment fade-up` wrapper at index 3 contains both the support line and takeaway in normal document flow. Its notes provide four matching bold reveal cues. The title and citations are visible on entry; four manual advances reveal the comparison. Reverse navigation uses Reveal’s normal fragment handling.

The custom visual styling keeps distinct sage/gold oval outlines, adds two 64px decorative Lucide icons in inline `svg.practice-icon` elements (`messages-square` for inner dialogue and `church` for the Christian prayer context, each with a 24 × 24 viewBox), and reveals dashed links with the centre. These are conceptual cues, not religious artefacts or evidence of a mechanism. Keep each oval to one short label, one icon, one heading and two lines of supporting copy. The centre keeps three process terms and one short caption. The bottom conclusion stays one line above the takeaway; this slide overrides its usual absolute positioning so fragment transforms keep both lines together. Reveal supplies the `fade-up` fragment transitions; reduced motion removes the transition while retaining advances, and PDF/print shows all four stages together. Browser CSS supplies the oval styling and links. Each oval uses an `ellipse closest-side` radial gradient with a transparent centre and colour increasing to the outline, clipped by its border radius. The icons use the existing bundled Lucide license, with no runtime request. Vite bundles the files. No new dependency or JavaScript was added.

Slide 10’s notes now follow documented reports → a bounded survey example → possible explanations → the unestablished separate-consciousness claim, then bridge to slide 11’s benefits and unwanted experiences. The related prayer research is explicitly a source of hypotheses, not a completed explanation of tulpamancy. The survey example reports the paper’s rounded 78% positive mental-health response and uses the question-specific denominator of 59 (S3, Table 3), rather than treating all 62 participants as respondents to that question. The previous assertion of zero negative effects and 22% neutral responses is removed. Self-report and community sampling limits accompany the result.

The `science-bands` modifier keeps the three-row layout but replaces academic-discipline headings with claim-focused headings. Sage marks documentation, gold marks proposed explanations, and a muted dashed border marks the unestablished claim. Under the rows, `div.survey-example` requires a short `span.label`, a paragraph with the percentage in `strong` and denominator in `span`, then `p.survey-limit` containing one short limitation. Keep the example to a single horizontal row. The takeaway is “Document the experience. Test the explanation.” Five manual fragment advances follow the script as described below. These are custom HTML/CSS layouts rendered by the browser; Reveal scales and navigates the slide, and Vite bundles it. The 1:00 target should be checked in rehearsal.

Slide 10 uses five Reveal fragment advances with matching bold `REVEAL` notes cues: documented row (index 0), survey strip and limitation (index 1), possible-explanations row (index 2), separate-consciousness row (index 3), then proposed methods and takeaway together (index 4). The title, eyebrow and citations are visible on entry. Keep row indices 0 / 2 / 3 in DOM order and give `survey-example` index 1. Rows, the survey and methods use Reveal’s `fade-up`; the absolutely positioned takeaway uses the plain fragment fade. Reduced motion removes transitions while keeping advances; PDF/print shows the completed layout. No custom JavaScript is needed.

Slide 10 opens with the three evidence questions and names psychology, sociology, neuroscience and philosophy of mind only in its closing interdisciplinary sentence. Anthropology is not included on this slide. The row cues connect interviews/surveys to reported experiences and community patterns, and related experiments to psychology. `div.science-methods` contains one short `span.label` and one single-line paragraph: follow over time, compare conditions, measure brain activity. This is a proposed research agenda, not a claim that these studies have already been carried out. The script explains that EEG/fMRI associations would not prove a separate mind and keeps systematic documentation and brain-activity comparisons as proposed future methods. Keep the methods strip to one line between the survey and takeaway; its custom Flexbox styling is browser CSS, while Reveal supplies visibility. Rehearse the expanded notes against the unchanged 1:00 target.

Slide 11 adds `div.moral-question` after `risk-layout`, containing one short `span.label`, a one-line ethical question with `em` emphasis, then `p.moral-context` explaining its conditional status. It asks whether abruptly stopping “forcing” would count as abandonment if the practitioner regards the tulpa as a person. The notes explicitly ask about leaving it alone inside the mind, while distinguishing that interpretation from established knowledge of a persisting being or suffering. This belongs to slide 11’s consent/responsibility discussion; it is not restored to slide 08. The callout is custom browser HTML/CSS, revealed with the consent cue at fragment index 4. Keep it to the current label, question and short context line so it clears the takeaway. Rehearse the expanded script against the existing 0:45 target.

Slide 11’s right-hand visual now branches from “Experience” to “Thoughts,” “Outer world” and “Sense of self,” matching the opening script rather than classifying outcomes. A shared sage/gold palette, an oval root, thin SVG connectors and plain domain labels provide visual hierarchy. Connections indicate topics mentioned in the script, not measured causal pathways. Keep exactly three domains, each to a short label. The map uses custom browser CSS and inline SVG, with no external assets or new dependency.

Five Reveal fragment advances follow the existing script order: experience map and its long-term-evidence note (index 0), companionship/unwanted experiences (1), survey limits plus the bottom evidence takeaway (2), daily-life concerns (3), consent plus the moral-question callout (4). Each bold `REVEAL` cue appears immediately before the corresponding spoken text; cue text contains no stage descriptions. Only light grammar edits and paragraph splits were made; the original argument and order remain. Content uses `fragment fade-up`; the fixed takeaway uses plain `fragment`. The heading and citations remain visible on entry. Reduced motion skips transitions while retaining clicks; PDF/print shows everything. Vite only bundles the files. The older `branches` outcome visual is no longer used.

Slide 11’s experience map reserves a slightly wider right column, a 240 × 104px root oval with 32px text and horizontal padding, and a 70px connector gap above three spaced domain labels. The map is 350px tall. `experience-connections` uses a 600 × 70 viewBox with `preserveAspectRatio="none"` so the branches reach their label columns as the map width changes. If editing its geometry, keep the connector top aligned with the oval’s lower edge and its bottom aligned with the domain cards. The script and fragment order are unchanged.

Slide 09 shape experiment: a final `.practice-parallels article { border-radius: 20px; }` rule changes the two practice panels from ovals to rounded rectangles. All spacing, gradients, text, icons and fragments remain unchanged. To reverse, remove that final CSS rule and this paragraph; the original `.parallels article` 50% radius restores the ovals. This is a custom browser CSS change, not Reveal configuration.

Slide 11’s `experience-root` now has an 18px corner radius, making it a rounded rectangle while retaining its 240 × 104px dimensions. The connector SVG has four paths with `pathLength="1"`: a stem and three branches. When Reveal marks the opening map fragment `visible`, custom CSS transitions draw the stem over 0.2 seconds after a 0.05-second delay, then draws all three branches over 0.55 seconds after a 0.25-second delay. The transitions run in either direction when the fragment changes; it adds no clicks. Reverse navigation retracts the map through the same state transitions. The existing motion control skips the connector animation; overview, reduced motion and print/PDF show complete lines. The browser supplies SVG dash transitions, Reveal supplies fragment state and Vite bundles the files. Script and other fragment indices remain unchanged.

Slide 11’s three domain cards now begin fading in together 0.5 seconds after the opening fragment appears, moving 8px downward over 0.35 seconds. This overlaps the final 0.3 seconds of line drawing, so the cards settle just as the branches finish rather than waiting for a separate beat. Their final top edges meet the SVG endpoints; no bounce or extra click is added. The custom opacity/transform transitions use the same Reveal `visible` state as the line drawing. On backward navigation the cards fade upward first, branches retract next, and the stem and root disappear last. Re-revealing a partially hidden map continues from its current state. The motion control, overview, reduced motion and print/PDF skip the card entrance and show the completed cards. The rest of the map and script remain unchanged.

Slide 11’s map no longer displays the repeated-attention label or domain numbers. Its root begins after the map’s 12px top padding; connectors start at 116px, directly below the 104px root. Keep the domain labels as plain paragraphs inside their three cards. The drawing and card-entrance timing are unchanged.

Slide 11’s root now reads “Mental habits”; its box is 280px wide with 32px horizontal padding, leaving room for the phrase on one line. Its 104px height and connector positions stay unchanged. The three domain panels keep their existing top edges but use 34px bottom padding (previously 14px) for a slightly longer plaque shape. Script and animation timing are unchanged.

Slide 12 rectangle-copy experiment: the identity and consciousness fragments now draw a decorative `::before` rectangle starting over the preceding card, slide that copy one card-width right, then stretch upward from the shared bottom edge to the destination height. Agency stays visible. Custom CSS transitions take 0.9 seconds: a 0.5-second horizontal move followed by a 0.4-second height change; destination text fades in over the final 0.35 seconds. Backward navigation fades the text out, shrinks the rectangle, then slides it back and fades the copy away. Keep the existing three equal-width columns and 330 / 390 / 450px heights; `--previous-height` on the second and third cards must match their predecessor if heights change. The script and two manual `REVEAL` advances are unchanged. This moves and resizes a rectangle; it does not morph text or imply a proven progression toward consciousness.

Reveal supplies fragment visibility; native browser CSS animates the decorative copy and text. The motion control, overview and reduced motion skip the effect, and PDF/print restores ordinary static card backgrounds and borders. No JavaScript or dependency was added. To restore the former standard fragment fades, remove the slide-12 rectangle-copy CSS block and the `.staircase article.fragment` selectors from the shared custom-shell rules; retain the other slides’ shell rules.

Slide 12 uses state transitions rather than one-shot keyframes so both fragment directions animate, including an interrupted transition. The fragment shell delays hiding for 1.05 seconds so its decorative rectangle can return after Reveal removes `visible`; child text and the rectangle control their own opacity. Hidden shells then become `visibility: hidden` and cannot receive pointer input. Reveal still handles keyboard navigation and fragment state. Reduced motion and the motion control skip transitions, and overview/print show the completed cards.

### Reversible animation audit

All finite CSS entrances now use state transitions so stepping backward animates toward the hidden state, including a mid-transition direction change. Slide 02’s contents move/fade out when leaving; slide 08’s cards retreat upward from right to left; slide 11’s domain cards disappear before branches retract and the root fades. Slides 03–05 and 07 already used reversible transforms, rules and pointers; ordinary fades/upward fragments on slides 09–11 now delay `visibility: hidden` until their exit finishes. Slide 12 retains its reversible shrink-and-return sequence. Custom fragment shells stay rendered for the 1.05-second exit window, then become hidden; avoid adding a parent fade that would cut those child transitions short. Editable text, script order, fragment indices and clicks are unchanged.

The opening/contents surface already uses Reveal Auto-Animate in either navigation direction. Title/eyebrow character flights already measure and animate whichever slide is entered, including backward navigation; rapid navigation cancels obsolete overlays. The emergence, question-field dash flow and companion rings/trails are continuous decorative loops, so they keep their authored direction and pause off-slide or with the motion control rather than becoming fragment entrances. Native browser transitions/keyframes and Web Animations remain the only animation mechanisms; no dependency was added. The motion control now skips finite CSS transitions throughout the deck. Reduced motion preserves fragment visibility without movement, and overview/print force complete custom compositions.

The shared fragment transition selector includes `.slides` so Reveal Auto-Animate’s generated unmatched-element fade cannot replace fragment exit timing. This preserves the opening surface’s Auto-Animate and ordinary unmatched slide-entry fades while keeping manual fragment transitions in control of their own opacity, movement and delayed visibility. Visible fragment states explicitly use `visibility: visible` for consistent exit interpolation.

Verified in headless Chromium on 21 October 2026: all 30 fragment groups across slides 03–05 and 07–12 reveal and hide correctly, with an observable exit before becoming hidden. Additional checks covered interrupted direction changes, slide-02 contents exits, the motion control, reduced motion, overview, complete internal card/line/text visibility in Reveal’s print layout, and no logged JavaScript exceptions. Slide 11’s completed layout was visually inspected. The production build and `git diff --check` pass. These checks validate animation/navigation states and print visibility, not a full projector or cross-browser layout review.

Slide 12 now puts fuller script cues inside its three rectangles: experienced agency, a stable identity, and subjective consciousness with the limits of inference. Cards are 330 / 390 / 450px tall, with 23px body text at 1.45 line-height and an 18px gap between paragraphs. Use one compact paragraph in agency and up to two in identity/consciousness; headings should fit one line where possible. The separate switching support line and verification takeaway have been removed from the visual; the spoken notes are unchanged. The rectangle-copy `--previous-height` values are updated to 330 / 390px so the reversible animation continues to match the preceding card. All content remains authored in `index.html`; the browser renders the custom CSS layout and Reveal supplies the same two fragment advances.

Slide 12’s expanded paragraphs have been condensed to recall cues: unscripted reply → experienced source; personality + preferences + memories → distinct identity; agency + identity ≠ proof of consciousness; behaviour → inference. Short question headings and explicit `<br>` breaks organize the cues, with `span.logic` colouring the operators gold. These are speaking prompts, not a formal proof or new scientific claims. Keep each cue to one or two short lines, except agency’s three-part vertical flow. Card sizes, fragment order, reversible rectangle animation and full spoken notes are unchanged.

Slide 12 now groups its recall cues in `ul.recall-list` inside each card: two items for agency and three each for identity and consciousness. Gold bullet markers, 27px text, 1.4 line-height and 16px list gaps separate the prompts. Keep items to one line where possible, allowing two lines for the consciousness distinction. The cards are separated by `--stair-gap: 18px`; their decorative copies include that gap in the horizontal return offset so the reversible animation still begins over the preceding card. Heights, notes and the two reveal advances are unchanged. These are custom browser CSS lists and spacing, not additional Reveal fragments.

Slide 13 concludes with “Experience and evidence.” `conclusion-summary` connects reported companions to the sense of self. `conclusion-balance` contains two articles: what people describe (companionship, preferences, identity and agency), and what remains uncertain (mechanisms, separate consciousness, long-term effects and reversibility). Each article requires a label, one short heading and three one-line list items. The 25px list cues summarize the notes without giving a personal answer to the audience’s question. The former head silhouette and personal curiosity/hesitation comparison have been removed.

`conclusion-question` follows that conclusion and contains one label plus a two-line question: “If you could create another conscious mind inside your own, would you do it? Why or why not?” It is explicitly labelled a hypothetical, not an assertion that the deck demonstrates another consciousness. The notes summarize the presentation first, then invite discussion without answering the audience question. No additional fragment advances or animation were introduced; the existing title/eyebrow transitions remain. The 0:40 delivery target remains for rehearsal.

`conclusion-credits` has two short paragraphs at 14px: selected research authors with a full-reference link, and the actual HTML/CSS/JavaScript/SVG, Reveal.js, Vite and Lucide stack with a link to `references.html#technology`. Keep these to a label and two compact lines each. The full nine-entry bibliography remains on its dedicated page. That page adds a section navigator and `technology-credits`, using a heading, intro and definition-list rows (`dt` tool / `dd` responsibility). It explains browser features, project custom code, Reveal navigation/notes/Auto-Animate, Vite bundling, local Lucide attribution and system fonts. Tool credits are separated from research evidence. The browser renders the new Grid/Flexbox layouts; Reveal supplies slide scaling/navigation and Vite builds both HTML entries. No dependency was added.

Conclusion remake validation: Chromium confirms the title, summary, comparison, audience question and credits fit the slide; the live screenshot was visually inspected. Both credit links resolve, all nine source entries and seven technology-credit rows remain available, and the bundled Lucide license is served. Reveal’s print layout keeps the new conclusion within its page. No JavaScript exceptions were logged; production build and whitespace checks pass.
