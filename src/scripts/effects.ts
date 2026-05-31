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

// Obfuscated email triggers. Any <a data-eu data-ed> assembles the address at
// runtime (static HTML never holds "user@domain"); clicking copies it to the
// clipboard with brief "Copied!" feedback instead of opening a mail client.
export function initEmail(): void {
  const showCopied = (a: HTMLElement) => {
    const target = a.querySelector('span') ?? a;
    const prev = target.textContent;
    target.textContent = 'Copied!';
    a.setAttribute('data-copied', '');
    setTimeout(() => {
      target.textContent = prev;
      a.removeAttribute('data-copied');
    }, 1500);
  };

  const copyText = async (text: string): Promise<boolean> => {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      return false;
    }
  };

  document.querySelectorAll<HTMLAnchorElement>('a[data-eu][data-ed]').forEach((a) => {
    const u = a.dataset.eu;
    const d = a.dataset.ed;
    if (!u || !d) return;
    const addr = `${u}@${d}`;
    if (a.dataset.show === 'address') {
      const span = a.querySelector('span');
      if (span) span.textContent = addr;
      else a.textContent = addr;
    }
    a.setAttribute('href', '#');
    a.setAttribute('role', 'button');
    a.setAttribute('aria-label', 'Copy email address');
    a.title = 'Click to copy';
    a.addEventListener('click', async (e) => {
      e.preventDefault();
      // Never navigate — if copy fails the address stays visible to select manually.
      if (await copyText(addr)) showCopied(a);
    });
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
