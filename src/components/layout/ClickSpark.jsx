import { useEffect } from 'react';

/**
 * A short ring at the point of every click, so the page answers the hand as
 * well as the control that was hit. It is drawn straight into the document
 * rather than through state, because a click should never re-render the page,
 * and it is skipped entirely for anyone who has asked for less motion.
 */
export default function ClickSpark() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const onPointer = (event) => {
      if (event.button !== 0) return;
      const ring = document.createElement('span');
      ring.className = 'click-spark';
      ring.setAttribute('aria-hidden', 'true');
      ring.style.left = `${event.clientX}px`;
      ring.style.top = `${event.clientY}px`;
      document.body.appendChild(ring);
      ring.addEventListener('animationend', () => ring.remove(), { once: true });
    };
    document.addEventListener('pointerdown', onPointer, { passive: true });
    return () => document.removeEventListener('pointerdown', onPointer);
  }, []);
  return null;
}
