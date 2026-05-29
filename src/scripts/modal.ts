// Project modals: each tile (`[data-open="<id>"]`) opens the matching
// <dialog id="<id>"> via the native modal API (gives focus-trap + ESC for free).
export function initModals(): void {
  const supportsDialog = typeof HTMLDialogElement !== 'undefined';

  document.querySelectorAll<HTMLElement>('[data-open]').forEach((trigger) => {
    trigger.addEventListener('click', () => {
      const id = trigger.getAttribute('data-open');
      if (!id) return;
      const dialog = document.getElementById(id) as HTMLDialogElement | null;
      if (!dialog) return;
      if (supportsDialog && typeof dialog.showModal === 'function') {
        dialog.showModal();
      } else {
        // Fallback: just reveal it inline.
        dialog.setAttribute('open', '');
      }
    });
  });

  document.querySelectorAll<HTMLDialogElement>('dialog.project-modal').forEach((dialog) => {
    dialog.querySelector('[data-close]')?.addEventListener('click', () => dialog.close());
    // Close when the backdrop (the dialog element itself) is clicked.
    dialog.addEventListener('click', (e) => {
      if (e.target === dialog) dialog.close();
    });
  });
}
