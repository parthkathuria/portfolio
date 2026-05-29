// Count up [data-count-to] numbers when they scroll into view.
// HTML ships the final value (no-JS/SEO safe); JS animates from 0 only when
// motion is allowed.
export function initCountUp(): void {
  const els = Array.from(document.querySelectorAll<HTMLElement>('[data-count-to]'));
  if (els.length === 0) return;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce || !('IntersectionObserver' in window)) return;

  const animate = (el: HTMLElement) => {
    const to = parseFloat(el.dataset.countTo ?? '0');
    const dur = 1100;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(to * eased).toString();
      if (p < 1) requestAnimationFrame(tick);
      else el.textContent = to.toString();
    };
    requestAnimationFrame(tick);
  };

  const io = new IntersectionObserver(
    (entries, obs) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          animate(entry.target as HTMLElement);
          obs.unobserve(entry.target);
        }
      }
    },
    { threshold: 0.4 }
  );
  els.forEach((el) => {
    el.textContent = '0';
    io.observe(el);
  });
}

// Pointer-follow glow on project tiles: track the cursor as CSS custom
// properties the card's ::before reads.
export function initCardGlow(): void {
  document.querySelectorAll<HTMLElement>('.work-grid .card').forEach((card) => {
    card.addEventListener('pointermove', (e) => {
      const r = card.getBoundingClientRect();
      card.style.setProperty('--mx', `${((e.clientX - r.left) / r.width) * 100}%`);
      card.style.setProperty('--my', `${((e.clientY - r.top) / r.height) * 100}%`);
    });
  });
}
