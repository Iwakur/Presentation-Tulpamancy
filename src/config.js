const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');

export const presentationConfig = {
  width: 1600, height: 900, margin: 0.04,
  hash: true, controls: true, controlsTutorial: false,
  progress: true, slideNumber: 'c/t', center: false,
  transition: reducedMotion.matches ? 'none' : 'fade', transitionSpeed: 'slow',
  backgroundTransition: reducedMotion.matches ? 'none' : 'fade',
  autoAnimate: false,
  pdfSeparateFragments: false, pdfMaxPagesPerSlide: 1,
  showNotes: false, help: true,
};
