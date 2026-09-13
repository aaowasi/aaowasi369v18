'use strict';
const $ = (selector) => document.querySelector(selector);
const make = (tag, text, className) => {
  const node = document.createElement(tag);
  if (text !== undefined) node.textContent = String(text);
  if (className) node.className = className;
  return node;
};

document.querySelectorAll('[data-history]').forEach(bar => {
  bar.hidden = false;
  const back = bar.querySelector('[data-back]');
  const forward = bar.querySelector('[data-forward]');
  back.addEventListener('click', () => {
    if (history.length > 1) history.back();
    else bar.querySelector('.history-status').textContent = 'No earlier page. Use Home to return to the portfolio.';
  });
  forward.addEventListener('click', () => history.forward());
  const sync = () => {
    if (window.navigation) {
      back.disabled = !window.navigation.canGoBack;
      forward.disabled = !window.navigation.canGoForward;
    }
  };
  sync();
  window.addEventListener('pageshow', sync);
  window.addEventListener('popstate', sync);
});

// Progressive enhancement: content remains visible if JS or observation fails.
if ('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal-in');
        observer.unobserve(entry.target);
      }
    });
  }, {threshold: .08});
  document.querySelectorAll('.section-intro, .project, .about-copy').forEach(el => observer.observe(el));
}

let portfolio;
let cell = null;
let busy = false;
let lastReport = null;
function filteredRisks() {
  const category = $('#category').value;
  return portfolio.risks.filter(r => (!category || r.category === category) &&
    (!cell || (r.likelihood === cell[0] && r.impact === cell[1])));
}
function drawRisks() {
  const rows = filteredRisks();
  $('#filter-status').textContent = `${rows.length} of ${portfolio.risks.length} scenarios${cell ? ` · likelihood ${cell[0]}, impact ${cell[1]}` : ''}`;
  const target = $('#risk-list'); target.replaceChildren();
  if (!rows.length) target.append(make('p', 'No scenarios match these filters. Choose another cell or show all risks.', 'small'));
  rows.forEach(r => {
    const detail = make('details', undefined, 'risk-entry');
    const summary = make('summary');
    summary.append(make('span', r.id, 'risk-id'), make('p', r.statement));
    detail.append(summary);
    const body = make('div', undefined, 'risk-detail');
    const dl = make('dl');
    [['Inherent score', r.inherent], ['Modeled residual', r.residual], ['Appetite', r.appetite], ['Owner role', r.owner]].forEach(([key, value]) => {
      const group = make('div'); group.append(make('dt', key), make('dd', value)); dl.append(group);
    });
    body.append(dl, make('p', `KRI: ${r.kri}. Escalation threshold: ${r.threshold}.`), make('p', `Treatment: ${r.treatment}. Baseline status: ${r.status}.`));
    detail.append(body); target.append(detail);
  });
  $('#heatmap').querySelectorAll('button').forEach(button => {
    button.setAttribute('aria-pressed', String(Boolean(cell && Number(button.dataset.likelihood) === cell[0] && Number(button.dataset.impact) === cell[1])));
  });
}
function drawDashboard() {
  $('#risk-count').textContent = portfolio.risks.length;
  // Appetite values are explicit <= integer thresholds from the source workbook.
  $('#above-count').textContent = portfolio.risks.filter(r => {
    const match = /^<=\s*(\d+)$/.exec(r.appetite); return match && r.residual > Number(match[1]);
  }).length;
  $('#control-count').textContent = portfolio.counts.control_domains;
  $('#ai-count').textContent = portfolio.counts.ai_use_cases;
  [...new Set(portfolio.risks.map(r => r.category))].sort().forEach(c => {
    const option = make('option', c); option.value = c; $('#category').append(option);
  });
  for (let likelihood = 5; likelihood >= 1; likelihood--) {
    for (let impact = 1; impact <= 5; impact++) {
      const count = portfolio.risks.filter(r => r.likelihood === likelihood && r.impact === impact).length;
      const level = Math.ceil(likelihood * impact / 5);
      const button = make('button', count || '·', `level-${level}`);
      button.type = 'button'; button.dataset.likelihood = likelihood; button.dataset.impact = impact;
      button.setAttribute('aria-label', `Likelihood ${likelihood}, impact ${impact}: ${count} scenarios`);
      button.setAttribute('aria-pressed', 'false');
      button.addEventListener('click', () => {cell = [likelihood, impact]; drawRisks();});
      $('#heatmap').append(button);
    }
  }
  $('#category').addEventListener('change', drawRisks);
  $('#reset-filter').addEventListener('click', () => {cell = null; $('#category').value = ''; drawRisks();});
  drawRisks(); $('#dashboard').hidden = false;
  const requests = (portfolio.audit_requests || []).filter(r => ['In Review', 'Exception'].includes(r.status));
  requests.forEach(request => {
    const due = request.remediation_due || request.due;
    const days = Math.floor((Date.now() - new Date(due + 'T23:59:59Z').getTime()) / 86400000);
    const row = make('article', undefined, 'check');
    row.append(make('p', `${request.id} · ${request.control}`), make('span', days > 0 ? `${days}d past due` : 'Within date', 'small'), make('p', `${request.owner} · ${request.status} · ${request.exception || request.conclusion || 'Review pending'}`, 'small'));
    $('#audit-clock').append(row);
  });
}
function drawChecks(report) {
  const target = $('#checks'); target.replaceChildren();
  const generated = new Date(report.generated_at);
  const age = Date.now() - generated.getTime();
  const staleRun = !Number.isFinite(age) || age > 86400000 || age < -300000;
  $('#ccm-status').textContent = `${report.mode === 'live' ? 'API collection' : 'Demonstration fixtures'} · Run ${Number.isFinite(generated.getTime()) ? generated.toLocaleString() : 'date unavailable'}${staleRun ? ' · STALE RUN' : ''}`;
  if (!report.checks.length) target.append(make('p', 'No control results are available.', 'small'));
  report.checks.forEach(check => {
    const row = make('article', undefined, 'check');
    const observedAge = Date.now() - new Date(check.observed_at).getTime();
    let status = check.status;
    if (status !== 'unknown' && (!Number.isFinite(observedAge) || observedAge > 86400000 || observedAge < -300000)) status = 'stale';
    const title = make('div'); title.append(make('h4', check.title), make('p', check.mappings.join(' · '), 'small'));
    const evidence = make('div');
    evidence.append(make('p', check.findings.join('. ') || 'No findings in the stated test scope.'), make('p', check.scope, 'small'));
    if (check.observed_at) evidence.append(make('p', `Observed: ${check.observed_at}`, 'small'));
    row.append(title, make('span', status, 'check-state'), evidence); target.append(row);
  });
}
async function fetchJSON(url) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 10000);
  try {
    const response = await fetch(url, {cache: 'no-store', signal: controller.signal});
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return await response.json();
  } finally {clearTimeout(timer);}
}
async function refreshChecks() {
  if (busy) return;
  busy = true; $('#refresh-data').disabled = true;
  try {
    const report = await fetchJSON('data/ccm.json');
    if (report.schema_version !== 1 || !['demo', 'live'].includes(report.mode) || !Array.isArray(report.checks)) throw new Error('Invalid report schema');
    drawChecks(report); lastReport = report;
  } catch {
    if (lastReport) drawChecks(lastReport);
    $('#ccm-status').textContent = 'Refresh failed. Any results below are the previous snapshot; freshness has not been confirmed.';
  } finally {busy = false; $('#refresh-data').disabled = false;}
}
async function initialize() {
  if (!$('#dashboard')) return;
  try {
    portfolio = await fetchJSON('data/portfolio.json');
    if (portfolio.schema_version !== 1 || !Array.isArray(portfolio.risks)) throw new Error('Invalid register');
    drawDashboard();
    $('#data-status').textContent = `Historical model dated ${portfolio.baseline_date}. Counts and scores come from the supplied workbook; they are not client outcomes.`;
    $('#refresh-data').hidden = false;
    $('#refresh-data').addEventListener('click', refreshChecks);
    await refreshChecks();
    setInterval(() => {if (!document.hidden) refreshChecks();}, 60000);
  } catch {
    $('#data-status').textContent = 'The register could not be loaded. Reload this page or use Download risk data. If viewing files locally, start the included web server.';
  }
}
initialize();

if ($('#vendor-form')) {
  $('#evaluate-vendor').disabled = false;
  $('#vendor-form').addEventListener('submit', event => {
    event.preventDefault();
    const values = new FormData(event.currentTarget);
    const reasons = [];
    if (values.has('personal') && !values.has('dpa')) reasons.push('Signed processor agreement is missing.');
    if (values.has('personal') && !values.has('subprocessors')) reasons.push('Subprocessor authorization needs review.');
    if (!values.has('training')) reasons.push('Training use is unresolved for the intended data.');
    if (!values.has('evidence')) reasons.push('Current security evidence has not been independently reviewed.');
    const tier = values.has('critical') ? 1 : values.has('personal') ? 2 : 3;
    $('#vendor-decision').textContent = `${reasons.length ? 'Hold for evidence' : 'Ready for human review'} · Tier ${tier}`;
    $('#vendor-reasons').replaceChildren(...(reasons.length ? reasons : ['No intake blockers detected. Verify scope, evidence and contract terms before approval.']).map(r => make('li', r)));
  });
}
