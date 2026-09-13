'use strict';
// Progressive enhancement: all sample content and contact links work without JavaScript.
const tablist = document.querySelector('[data-tabs]');
if (tablist) {
  const tabs = [...tablist.querySelectorAll('[data-tab]')];
  const panels = [...document.querySelectorAll('[data-panel]')];
  function selectTab(tab, focus = false) {
    tabs.forEach(item => {
      const selected = item === tab;
      item.setAttribute('aria-selected', String(selected));
      item.tabIndex = selected ? 0 : -1;
    });
    panels.forEach(panel => { panel.hidden = panel.dataset.panel !== tab.dataset.tab; });
    if (focus) tab.focus();
  }
  tablist.setAttribute('role', 'tablist');
  tabs.forEach((tab, index) => {
    tab.setAttribute('role', 'tab');
    tab.setAttribute('aria-controls', `panel-${tab.dataset.tab}`);
    tab.addEventListener('click', () => selectTab(tab));
    tab.addEventListener('keydown', event => {
      let next;
      if (event.key === 'ArrowRight') next = (index + 1) % tabs.length;
      if (event.key === 'ArrowLeft') next = (index + tabs.length - 1) % tabs.length;
      if (event.key === 'Home') next = 0;
      if (event.key === 'End') next = tabs.length - 1;
      if (next !== undefined) { event.preventDefault(); selectTab(tabs[next], true); }
    });
  });
  panels.forEach(panel => {
    panel.setAttribute('role', 'tabpanel');
    panel.setAttribute('aria-labelledby', `tab-${panel.dataset.panel}`);
    panel.tabIndex = 0;
  });
  selectTab(tabs.find(tab => tab.dataset.tab === 'evidence') || tabs[0]);
  document.querySelector('.sample').classList.add('enhanced');
  tablist.hidden = false;
}
const copyButton = document.querySelector('[data-copy-email]');
if (copyButton) {
  const status = document.querySelector('.copy-status');
  let resetTimer;
  copyButton.hidden = false;
  copyButton.addEventListener('click', async () => {
    clearTimeout(resetTimer);
    status.textContent = '';
    try {
      if (!navigator.clipboard?.writeText) throw new Error('Clipboard unavailable');
      await navigator.clipboard.writeText(copyButton.dataset.copyEmail);
      status.textContent = 'Email copied.';
      copyButton.querySelector('span').textContent = 'Copied';
      resetTimer = setTimeout(() => { copyButton.querySelector('span').textContent = 'Copy email'; }, 2500);
    } catch {
      status.textContent = 'Copy did not work. Select the email address above.';
      copyButton.querySelector('span').textContent = 'Copy email';
    }
  });
}
