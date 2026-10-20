import Reveal from 'reveal.js';
import Notes from 'reveal.js/plugin/notes/notes.esm.js';
import 'reveal.js/dist/reveal.css';
import './styles/theme.css';
import { presentationConfig } from './config.js';
import { installTextTransitions } from './text-transitions.js';

async function initializePresentation() {
  const deck = new Reveal(document.querySelector('.reveal'), { ...presentationConfig, plugins: [Notes] });
  await deck.initialize();
  installTextTransitions(deck);
  const updateChapter = () => {
    document.querySelector('#chapter').textContent = deck.getCurrentSlide().dataset.chapter;
  };
  deck.on('slidechanged', updateChapter);
  updateChapter();
  const motionButton = document.querySelector('#motion');
  motionButton.onclick = () => {
    const paused = document.body.classList.toggle('motion-paused');
    motionButton.setAttribute('aria-pressed', String(paused));
    motionButton.textContent = paused ? 'Resume motion' : 'Pause motion';
  };
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
    motionButton.disabled = true;
    motionButton.textContent = 'Reduced motion';
  }
  document.querySelector('#overview').onclick = () => deck.toggleOverview();
  document.querySelector('#notes').onclick = () => deck.getPlugin('notes').open();
  document.querySelector('#fullscreen').onclick = async () => {
    try {
      if (document.fullscreenElement) {
        await document.exitFullscreen();
      } else if (document.fullscreenEnabled && document.documentElement.requestFullscreen) {
        await document.documentElement.requestFullscreen();
      } else {
        alert('Fullscreen is unavailable here. Open the presentation directly in a browser tab, or use the browser’s fullscreen menu.');
      }
    } catch {
      alert('The browser blocked fullscreen. You can continue presenting in this window or use the browser’s fullscreen menu.');
    }
  };
  document.querySelector('#pdf').onclick = () => {
    const url = new URL(location.href);
    url.searchParams.set('print-pdf', '');
    url.hash = '';
    window.open(url, '_blank', 'noopener');
  };
}

initializePresentation();
