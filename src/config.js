const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');

export const presentationConfig = {
  width: 1600, height: 900, margin: 0.04,
  hash: true, controls: true, controlsTutorial: false,
  progress: true, slideNumber: 'c/t', center: false,
  transition: reducedMotion.matches ? 'none' : 'fade', transitionSpeed: 'slow',
  backgroundTransition: reducedMotion.matches ? 'none' : 'fade',
  autoAnimate: !reducedMotion.matches,
  // Text uses independent character flights; Reveal handles only the surface.
  autoAnimateMatcher: (fromSlide, toSlide) => {
    const from = fromSlide.querySelector('[data-id="opening-surface"]');
    const to = toSlide.querySelector('[data-id="opening-surface"]');
    return from && to ? [{ from, to }] : [];
  },
  autoAnimateDuration: 0.9,
  autoAnimateEasing: 'cubic-bezier(0.22, 1, 0.36, 1)',
  pdfSeparateFragments: false, pdfMaxPagesPerSlide: 1,
  showNotes: false, help: true,
};
