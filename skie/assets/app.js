import { iasCosts } from './costs.js';
const content = window.SKIE_CONTENT;
const $ = selector => document.querySelector(selector);
const escapeHtml = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const drawings = {
 building: '<path class="dim" d="M25 120 140 52 255 120M40 130l100-60 100 60M140 15v120M20 76h240"/><path d="m85 98 55-32 55 32-55 32zm0 0V55l55-32 55 32v43M85 55l55 33 55-33m-55 33v42m-30-46V62l30-17 30 17v22"/><path class="accent" d="M44 112V86l23-13V45m147 67V87l-19-12m-55-52V12"/><circle cx="67" cy="45" r="2"/><circle cx="140" cy="12" r="2"/>',
 lifeforms: '<path class="dim" d="M25 33h230M25 75h230M25 116h230M70 15v120m140-120v120"/><path d="M113 12c110 28-56 98 54 126M167 12c-110 28 56 98-54 126M122 22h36m-45 18h54m-54 18h54m-45 18h36m-45 18h54m-54 18h54m-45 18h36"/><path class="accent" d="M75 32v40L53 94v29m152-91v40l22 22v29M53 94l20 20v15"/><circle cx="75" cy="32" r="2"/><circle cx="205" cy="32" r="2"/><circle cx="73" cy="129" r="2"/>',
 expeditions: '<ellipse class="dim" cx="140" cy="78" rx="107" ry="38" transform="rotate(-20 140 78)"/><circle class="dim" cx="140" cy="78" r="56" stroke-dasharray="2 7"/><path d="m88 104 83-64-18 76-19-26zm0 0 46-14 37-50M134 90l19 26"/><path class="accent" d="m73 115-19 13H22m155-92 20-20h38m-38 0v23l-14 14"/><circle cx="22" cy="128" r="2"/><circle cx="235" cy="16" r="2"/><circle cx="140" cy="78" r="73" stroke-dasharray="16 16 1 9"/>',
 orion: '<circle class="dim" cx="140" cy="76" r="58"/><ellipse class="dim" cx="140" cy="76" rx="106" ry="37" transform="rotate(-28 140 76)"/><path d="M140 21v110m-48-83 96 55m-96 0 96-55M114 33l52 86m0-86-52 86"/><circle cx="140" cy="76" r="27"/><path class="accent" d="M140 14v29l14 14v37l-14 14v29m0-94-15 15v36l15 14M63 54l-18-18H22m197 62 16 16h23"/><circle cx="140" cy="14" r="3"/><circle cx="140" cy="137" r="3"/>'
};
$('#principles').innerHTML = content.alliance.principles.map((p, i) => `<article class="principle"><span class="principle-number">0${i+1}</span><h3>${escapeHtml(p.title)}</h3><p>${escapeHtml(p.body)}</p></article>`).join('');
let activeFilter = 'all';
function renderGuides() {
  const q = $('#guide-search').value.toLowerCase().trim();
  const guides = content.guides.filter(g => (activeFilter === 'all' || g.category === activeFilter) && JSON.stringify(g).toLowerCase().includes(q));
  $('#guide-cards').innerHTML = guides.map(g => `<article class="guide-card"><div class="guide-art" aria-hidden="true"><svg viewBox="0 0 280 150">${drawings[g.id]}</svg><span class="art-number">FIELD NOTE / ${g.number}</span></div><div class="card-content"><span class="tag ${g.id==='orion'?'amber':''}">${escapeHtml(g.label)}</span><h3>${escapeHtml(g.title)}</h3><p>${escapeHtml(g.summary)}</p><button class="guide-open" data-guide="${escapeHtml(g.id)}" aria-label="Read ${escapeHtml(g.category)} guide">${escapeHtml(g.category)}<span class="arrow-ne" aria-hidden="true"></span></button></div></article>`).join('');
  $('#no-results').hidden = guides.length > 0;
  $('#guide-count').textContent = `${guides.length} ${guides.length === 1 ? 'guide' : 'guides'} shown`;
}
function openDialog(dialog) { dialog.showModal(); document.body.style.overflow = 'hidden'; }
function closeDialog(dialog) { dialog.close(); if(!document.querySelector('dialog[open]')) document.body.style.overflow = ''; }
document.querySelectorAll('dialog').forEach(dialog => {
  dialog.addEventListener('click', e => { if(e.target === dialog) {const r=dialog.getBoundingClientRect(); if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom) closeDialog(dialog);} });
  dialog.addEventListener('close', () => { if(!document.querySelector('dialog[open]')) document.body.style.overflow = ''; });
});
let selectedGuide;
function guideText(g) {
  return `**Skie field guide: ${g.category}**\n${g.status}\n\n${g.sections.map(s=>`**${s.title}**\n${s.body || ''}${s.items?'\n'+s.items.map(i=>'- '+i).join('\n'):''}`).join('\n\n')}\n\nSources:\n${g.sources.map(s=>`${s.label}: ${s.url}`).join('\n')}\n\nSkie content v${content.meta.version} · ${content.meta.updated}`;
}
function openGuide(id) {
  const g=content.guides.find(g=>g.id===id); if(!g)return; selectedGuide=g;
  $('#guide-dialog-label').textContent = `FIELD NOTE ${g.number} / ${g.category.toUpperCase()}`;
  $('#guide-dialog-title').textContent=g.title;
  $('#guide-dialog-status').textContent=g.status;
  $('#guide-dialog-body').innerHTML=g.sections.map(s=>`<section class="guide-section-content"><h3>${escapeHtml(s.title)}</h3>${s.body?`<p>${escapeHtml(s.body)}</p>`:''}${s.items?`<ul>${s.items.map(i=>`<li>${escapeHtml(i)}</li>`).join('')}</ul>`:''}</section>`).join('');
  $('#guide-dialog-sources').innerHTML=`<h3>Sources & version context</h3>${g.sources.map(s=>`<a target="_blank" rel="noopener noreferrer" href="${escapeHtml(s.url)}">${escapeHtml(s.label)}</a>`).join('')}`;
  openDialog($('#guide-dialog'));
}
document.addEventListener('click',e=>{
  const guide=e.target.closest('[data-guide]'); if(guide)openGuide(guide.dataset.guide);
  const close=e.target.closest('[data-close]'); if(close)closeDialog(close.closest('dialog'));
});
document.querySelectorAll('[data-filter]').forEach(button=>button.addEventListener('click',()=>{
 activeFilter=button.dataset.filter; document.querySelectorAll('[data-filter]').forEach(b=>{b.classList.toggle('active',b===button); b.setAttribute('aria-pressed',String(b===button));}); renderGuides();
}));
$('#guide-search').addEventListener('input',renderGuides);
$('#menu-toggle').addEventListener('click',()=>{const open=$('#nav').classList.toggle('open');$('#menu-toggle').setAttribute('aria-expanded',String(open));});
$('#nav').addEventListener('click',e=>{if(e.target.closest('a')){$('#nav').classList.remove('open');$('#menu-toggle').setAttribute('aria-expanded','false');}});
document.addEventListener('keydown',e=>{if(e.key==='Escape'){$('#nav').classList.remove('open');$('#menu-toggle').setAttribute('aria-expanded','false');}});
let toastTimer;
function toast(text){clearTimeout(toastTimer);$('#toast').textContent=text;$('#toast').hidden=false;toastTimer=setTimeout(()=>$('#toast').hidden=true,3500);}
async function copyText(text){try{if(!navigator.clipboard)throw new Error('Clipboard unavailable');await navigator.clipboard.writeText(text);toast('Copied. Ready to share when you choose.');}catch{$('#copy-fallback').value=text;openDialog($('#copy-dialog'));$('#copy-fallback').focus();$('#copy-fallback').select();}}
$('#copy-guide').addEventListener('click',()=>{if(selectedGuide)copyText(guideText(selectedGuide));});
function allianceBrief(){const a=content.alliance;return `**${a.name} alliance**\nWe build. We explore. We move together.\n\nLead: ${a.leader}\nSecond in command: ${a.second}\n${a.recruitment}\nDestination: ${a.universe} (${a.universeStatus.toLowerCase()}).\n\nField guide: Building · Lifeforms · Expeditions · Project Orion. Orion material is a historical PTS reference, not current live-universe advice.\n\nSkie content v${content.meta.version} · ${content.meta.updated}`;}
$('#copy-brief').addEventListener('click',()=>copyText(allianceBrief()));
function calculate(){const current=Number($('#from-level').value),target=Number($('#to-level').value);try{if($('#from-level').value===''||$('#to-level').value==='')throw new Error('Enter both current and target levels.');const result=iasCosts(current,target);for(const [r,value] of Object.entries(result))$('#cost-'+r).textContent=value.toLocaleString('en-US');$('#calc-error').hidden=true;}catch(error){$('#calc-error').textContent=error.message;$('#calc-error').hidden=false;for(const r of ['metal','crystal','deuterium'])$('#cost-'+r).textContent='—';}}
$('#ias-form').addEventListener('submit',e=>{e.preventDefault();calculate();});
$('#open-application').addEventListener('click',()=>openDialog($('#application-dialog')));
$('#application-form').addEventListener('submit',e=>{e.preventDefault();const name=$('#player-name').value.trim()||'[your in-game name]',universe=$('#player-universe').value.trim()||'[your current universe]',style=$('#player-style').value.trim()||'[your play style and goals]';$('#intro-text').value=`Hi ${content.alliance.leader} and ${content.alliance.second}, I am ${name}, currently playing in ${universe}.\n\nI am interested in joining Skie. ${style}\n\nI understand that ${content.alliance.universe.replace(' / ',' or ')} is still being discussed. I would like to hear more about the alliance and whether we would be a good fit.`;$('#intro-result').hidden=false;$('#intro-text').focus();});
$('#copy-intro').addEventListener('click',()=>copyText($('#intro-text').value));
renderGuides();calculate();
