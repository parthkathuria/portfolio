// Scroll-reveal: adds `is-visible` to `.reveal` elements as they enter the viewport.
// Respects prefers-reduced-motion by revealing everything immediately.
export function initReveal(): void {
  const els = Array.from(document.querySelectorAll<HTMLElement>('.reveal'));
  if (els.length === 0) return;

  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce || !('IntersectionObserver' in window)) {
    els.forEach((el) => el.classList.add('is-visible'));
    return;
  }

  const io = new IntersectionObserver(
    (entries, obs) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      }
    },
    { rootMargin: '0px 0px -10% 0px', threshold: 0.1 }
  );
  els.forEach((el) => io.observe(el));
}

// Scroll-spy: marks the nav link for the section currently in view as active
// by setting `aria-current="true"` and a `data-active` attribute.
export function initScrollSpy(): void {
  const links = Array.from(
    document.querySelectorAll<HTMLAnchorElement>('[data-nav-link]')
  );
  if (links.length === 0 || !('IntersectionObserver' in window)) return;

  const byId = new Map(links.map((l) => [l.getAttribute('href')?.slice(1) ?? '', l]));
  const sections = links
    .map((l) => document.getElementById(l.getAttribute('href')?.slice(1) ?? ''))
    .filter((s): s is HTMLElement => s !== null);

  const setActive = (id: string) => {
    for (const [linkId, link] of byId) {
      const active = linkId === id;
      link.toggleAttribute('data-active', active);
      if (active) link.setAttribute('aria-current', 'true');
      else link.removeAttribute('aria-current');
    }
  };

  const io = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((e) => e.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) setActive(visible.target.id);
    },
    { rootMargin: '-45% 0px -45% 0px', threshold: 0 }
  );
  sections.forEach((s) => io.observe(s));
}
