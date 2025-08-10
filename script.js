
const demoProducts = [
  {merchant:"Fnac", url:"#", price: 349.99, shipping:"Gratuite", stock:"En stock", note:"Retrait 1h en magasin"},
  {merchant:"Darty", url:"#", price: 355.00, shipping:"4,99 €", stock:"En stock", note:"Garantie 2 ans"},
  {merchant:"Cdiscount", url:"#", price: 339.00, shipping:"6,99 €", stock:"Stock limité", note:"Vendu et expédié par Cdiscount"},
  {merchant:"Amazon", url:"#", price: 345.50, shipping:"Prime", stock:"En stock", note:"Livraison demain"}
];

function euro(n){ return new Intl.NumberFormat('fr-FR',{style:'currency', currency:'EUR'}).format(n); }

function handleSearch(q){
  const results = [...demoProducts].sort((a,b)=>a.price-b.price);
  const best = results[0]?.price ?? null;
  const list = document.querySelector('#results-list');
  list.innerHTML='';
  results.forEach((r,i)=>{
    const li = document.createElement('div');
    li.className = 'result-item';
    li.innerHTML = `
      <div><span class="badge">${i===0?'Meilleur prix':'Alternative'}</span></div>
      <div><strong>${r.merchant}</strong><br><small>${r.note}</small></div>
      <div class="price">${euro(r.price)}</div>
      <div><a class="cta" href="${r.url}">Voir l’offre</a></div>
    `;
    list.appendChild(li);
  });
  document.querySelector('#kpi-best').textContent = best ? euro(best) : '—';
  document.querySelector('#kpi-saves').textContent = best ? euro(results[results.length-1].price - best) : '—';
  document.querySelector('#kpi-shops').textContent = results.length;
  document.querySelector('.results').scrollIntoView({behavior:'smooth'});
}

document.addEventListener('DOMContentLoaded', ()=>{
  const input = document.querySelector('#q');
  const btn = document.querySelector('#search-btn');
  if(btn) btn.addEventListener('click', ()=> handleSearch(input.value));
  if(input) input.addEventListener('keydown', (e)=>{ if(e.key==='Enter') handleSearch(input.value); });

  const toggle = document.querySelector('#toggle-overlay');
  const overlay = document.querySelector('#overlay');
  if(toggle && overlay) toggle.addEventListener('click', ()=> overlay.classList.toggle('active'));

  // Theme toggle and persistence
  const root = document.documentElement;
  const current = localStorage.getItem('prixo-theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  root.setAttribute('data-theme', current);
  const themeBtn = document.getElementById('theme-toggle');
  if(themeBtn){
    themeBtn.textContent = current==='dark' ? '☀️' : '🌙';
    themeBtn.addEventListener('click', ()=>{
      const next = root.getAttribute('data-theme')==='dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      themeBtn.textContent = next==='dark' ? '☀️' : '🌙';
      localStorage.setItem('prixo-theme', next);
    });
  }

  // Cookie banner consent
  const accept = document.getElementById('cookie-accept');
  const decline = document.getElementById('cookie-decline');
  const hide = ()=> document.documentElement.classList.remove('with-cookie-banner');
  if(localStorage.getItem('prixo-cookie')===null){
    document.documentElement.classList.add('with-cookie-banner');
  }
  if(accept){ accept.addEventListener('click', ()=>{ localStorage.setItem('prixo-cookie','accepted'); hide(); }); }
  if(decline){ decline.addEventListener('click', ()=>{ localStorage.setItem('prixo-cookie','declined'); hide(); }); }

  // PWA SW
  if('serviceWorker' in navigator){
    navigator.serviceWorker.register('sw.js').catch(()=>{});
  }
});
