(() => {
  const key = 'backend-lab-theme';
  const system = window.matchMedia('(prefers-color-scheme: dark)');
  let preference;
  try { preference = localStorage.getItem(key); } catch {}
  if (!['light', 'dark'].includes(preference)) preference = null;

  function apply(theme) {
    document.documentElement.dataset.theme = theme;
    const dark = theme === 'dark';
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', dark ? '#111c18' : '#193e35');
    const button = document.getElementById('theme-toggle');
    if (button) {
      button.setAttribute('aria-pressed', String(dark));
      button.title = dark ? 'Zum Hellmodus wechseln' : 'Zum Dunkelmodus wechseln';
      button.firstElementChild.textContent = dark ? '☀' : '☾';
    }
  }

  const current = () => preference || (system.matches ? 'dark' : 'light');
  apply(current());
  system.addEventListener('change', () => { if (!preference) apply(current()); });
  document.addEventListener('DOMContentLoaded', () => {
    apply(current());
    document.getElementById('theme-toggle').addEventListener('click', () => {
      preference = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
      try { localStorage.setItem(key, preference); } catch {}
      apply(preference);
    });
  });
})();
