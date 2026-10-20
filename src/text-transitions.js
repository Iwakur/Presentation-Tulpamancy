// Keep authored headings intact; temporary glyphs animate in viewport coordinates.
const groups = ['[data-id="slide-title"]', '.eyebrow[data-id="eyebrow"]'];
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');

function measureText(element, scale) {
  if (!element || !Intl.Segmenter) return [];
  const letters = [];
  const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT);
  const segmenter = new Intl.Segmenter(undefined, { granularity: 'grapheme' });
  let node;
  while ((node = walker.nextNode())) {
    const style = getComputedStyle(node.parentElement);
    for (const { segment, index } of segmenter.segment(node.textContent)) {
      if (!segment.trim()) continue;
      const range = document.createRange();
      range.setStart(node, index);
      range.setEnd(node, index + segment.length);
      const rect = range.getBoundingClientRect();
      if (!rect.width || !rect.height) continue;
      letters.push({ text: segment, x: rect.x, y: rect.y, height: rect.height,
        fontFamily: style.fontFamily, fontWeight: style.fontWeight,
        fontStyle: style.fontStyle, color: style.color,
        fontSize: `${parseFloat(style.fontSize) * scale}px` });
    }
  }
  return letters;
}

export function installTextTransitions(deck) {
  let snapshot;
  let cleanup = () => {};
  const capture = () => groups.map(selector => measureText(deck.getCurrentSlide().querySelector(selector), deck.getScale()));
  const refresh = () => { cleanup(); snapshot = capture(); };
  refresh();
  deck.on('slidechanged', ({ previousSlide, currentSlide }) => {
    cleanup();
    const fromGroups = snapshot;
    const toGroups = capture();
    snapshot = toGroups;
    if (!previousSlide || reducedMotion.matches || !Intl.Segmenter ||
        deck.isOverview() || location.search.includes('print-pdf')) return;

    const layer = document.createElement('div');
    layer.className = 'text-flight';
    layer.setAttribute('aria-hidden', 'true');
    document.body.append(layer);
    const hidden = [previousSlide, currentSlide].flatMap(slide => groups.map(selector => slide.querySelector(selector))).filter(Boolean);
    hidden.forEach(element => element.classList.add('text-flight-hidden'));
    const animations = [];
    const duration = 1100;
    const frame = letter => ({ transform: `translate(${letter.x}px, ${letter.y}px)`, fontSize: letter.fontSize,
      color: letter.color, fontFamily: letter.fontFamily, fontStyle: letter.fontStyle,
      fontWeight: letter.fontWeight, lineHeight: `${letter.height}px` });
    const fly = (from, to) => {
      const glyph = document.createElement('span');
      glyph.textContent = (to || from).text;
      layer.append(glyph);
      animations.push(glyph.animate([
        { ...frame(from || to), opacity: from ? 1 : 0, offset: 0 },
        { ...frame(to || from), opacity: to ? 1 : 0, offset: 1 },
      ], { duration, easing: 'cubic-bezier(.22, 1, .36, 1)', fill: 'both',
        delay: from ? 0 : 220 }));
    };
    toGroups.forEach((targets, group) => {
      const available = [...(fromGroups?.[group] || [])];
      for (const target of targets) {
        // Closest identical glyph wins; titles and eyebrows never share a pool.
        let match = -1;
        let distance = Infinity;
        available.forEach((letter, index) => {
          const d = Math.hypot(letter.x - target.x, letter.y - target.y);
          if (letter.text === target.text && d < distance) { match = index; distance = d; }
        });
        fly(match < 0 ? null : available.splice(match, 1)[0], target);
      }
      available.forEach(letter => fly(letter, null));
    });
    let active = true;
    cleanup = () => {
      active = false;
      animations.forEach(animation => animation.cancel());
      layer.remove();
      hidden.forEach(element => element.classList.remove('text-flight-hidden'));
    };
    Promise.all(animations.map(animation => animation.finished)).then(() => {
      if (active) cleanup();
    }).catch(() => {}); // Navigation can intentionally cancel an unfinished flight.
  });
  deck.on('resize', refresh);
  deck.on('overviewshown', refresh);
  deck.on('overviewhidden', refresh);
  reducedMotion.addEventListener('change', refresh);
  window.addEventListener('beforeprint', refresh);
}
