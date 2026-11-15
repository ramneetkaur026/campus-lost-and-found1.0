(() => {
  'use strict';
  const STORAGE_KEY = 'campus-finds-listings-v1';
  const categories = ['Electronics', 'Clothing & accessories', 'Books & stationery', 'Keys & cards', 'Bags', 'Sports & recreation', 'Other'];
  const grid = document.querySelector('#listing-grid');
  const emptyState = document.querySelector('#empty-state');
  const count = document.querySelector('#listing-count');
  const boardMessage = document.querySelector('#board-message');
  const searchInput = document.querySelector('#search-input');
  const sortSelect = document.querySelector('#sort-select');
  const categoryFilter = document.querySelector('#category-filter');
  const locationFilter = document.querySelector('#location-filter');
  const form = document.querySelector('#listing-form');
  const message = document.querySelector('#form-message');
  const dialog = document.querySelector('#item-dialog');
  const dialogContent = document.querySelector('#dialog-content');
  const claimForm = document.querySelector('#claim-form');
  const claimMessage = document.querySelector('#claim-message');
  const claimClosedMessage = document.querySelector('#claim-closed-message');
  let activeFilter = 'all';
  let activeItemId = null;

  function localDate(date) { const offset = date.getTimezoneOffset(); return new Date(date.getTime() - offset * 60000).toISOString().slice(0, 10); }
  function shiftDate(days) { const date = new Date(); date.setDate(date.getDate() + days); return localDate(date); }
  const starterListings = [
    {id:'sample-1',type:'lost',title:'Silver ring with a tiny blue stone',category:'Clothing & accessories',location:'Student Union, café seating',date:shiftDate(-1),description:'Thin silver band with a small blue stone. It has a lot of sentimental value.',contactName:'Maya',contact:'maya@campus.edu',status:'open',claims:[],createdAt:Date.now()-18000000},
    {id:'sample-2',type:'found',title:'Black wireless earbuds',category:'Electronics',location:'Science Building, Room 204',date:shiftDate(-2),description:'Found in the back row after the afternoon lecture. In a plain black case.',contactName:'Jordan',contact:'@jordan.k',status:'open',claims:[],createdAt:Date.now()-93600000},
    {id:'sample-3',type:'lost',title:'Green canvas tote bag',category:'Bags',location:'Main Library entrance',date:shiftDate(-1),description:'Has a paperback and a sketchbook inside. Small sunflower pin on the strap.',contactName:'Sam',contact:'sam@campus.edu',status:'open',claims:[],createdAt:Date.now()-32400000}
  ];
  function normalize(items) {
    return items.filter(item => item && typeof item === 'object' && item.id && (item.type === 'lost' || item.type === 'found'))
      .map(item => ({...item, status:['open','claimed','resolved'].includes(item.status) ? item.status : 'open', claims:Array.isArray(item.claims) ? item.claims : []}));
  }
  function readListings() {
    try { const saved = localStorage.getItem(STORAGE_KEY); return saved === null ? starterListings.slice() : normalize(JSON.parse(saved)); }
    catch { return starterListings.slice(); }
  }
  let listings = readListings();
  function save() { try { localStorage.setItem(STORAGE_KEY, JSON.stringify(listings)); return true; } catch { return false; } }
  function reportBoardSave(action, stored) {
    boardMessage.textContent = stored ? `${action} saved on this device.` : `${action} applied for this session only; browser storage is unavailable.`;
  }
  function escapeHTML(value = '') { return String(value).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char])); }
  function prettyDate(value) { if (!value) return 'Date not listed'; const parsed = new Date(`${value}T12:00:00`); return Number.isNaN(parsed.getTime()) ? 'Date not listed' : parsed.toLocaleDateString(undefined,{month:'short',day:'numeric',year:'numeric'}); }
  function updateFilterOptions() {
    const selectedCategory = categoryFilter.value;
    const selectedLocation = locationFilter.value;
    const cats = [...new Set([...categories, ...listings.map(item => item.category).filter(Boolean)])].sort((a,b)=>a.localeCompare(b));
    const locations = [...new Set(listings.map(item => item.location).filter(Boolean))].sort((a,b)=>a.localeCompare(b));
    categoryFilter.innerHTML = '<option value="">All categories</option>' + cats.map(value=>`<option value="${escapeHTML(value)}">${escapeHTML(value)}</option>`).join('');
    locationFilter.innerHTML = '<option value="">All locations</option>' + locations.map(value=>`<option value="${escapeHTML(value)}">${escapeHTML(value)}</option>`).join('');
    categoryFilter.value = cats.includes(selectedCategory) ? selectedCategory : '';
    locationFilter.value = locations.includes(selectedLocation) ? selectedLocation : '';
  }
  function render() {
    updateFilterOptions();
    const query = searchInput.value.trim().toLowerCase();
    const shown = listings.filter(item => (activeFilter === 'all' || item.type === activeFilter)
      && (!categoryFilter.value || item.category === categoryFilter.value)
      && (!locationFilter.value || item.location === locationFilter.value)
      && (!query || [item.title,item.category,item.location,item.description,item.contactName].some(value=>String(value||'').toLowerCase().includes(query))))
      .sort((a,b)=>sortSelect.value === 'oldest' ? a.createdAt-b.createdAt : b.createdAt-a.createdAt);
    grid.innerHTML = shown.map(item => {
      const safeContact = escapeHTML(item.contact);
      const contactLink = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(item.contact) ? `mailto:${safeContact}` : /^https?:\/\//i.test(item.contact) ? safeContact : null;
      const status = ['open','claimed','resolved'].includes(item.status) ? item.status : 'open';
      return `<article class="listing-card"><div class="card-top"><span class="badge ${item.type}">${item.type.toUpperCase()}</span><span class="status-pill status-${status}">${status.toUpperCase()}</span></div><span class="card-category">${escapeHTML(item.category)}</span><h3>${escapeHTML(item.title)}</h3>${item.description?`<p class="card-description">${escapeHTML(item.description)}</p>`:''}<div class="card-meta"><span title="${escapeHTML(item.location)}">${escapeHTML(item.location)}</span><span>${prettyDate(item.date)}</span></div><div class="card-bottom"><span>Posted by ${escapeHTML(item.contactName)}</span>${contactLink?`<a class="contact-link" href="${contactLink}" ${contactLink.startsWith('http')?'target="_blank" rel="noopener noreferrer"':''}>Contact ↗</a>`:`<span>${safeContact}</span>`}</div><div class="card-actions"><button type="button" class="detail-button" data-details="${escapeHTML(item.id)}">View details${item.claims.length?` · ${item.claims.length} claim${item.claims.length===1?'':'s'}`:''}</button><label class="status-control">STATUS <select data-status="${escapeHTML(item.id)}" aria-label="Update status for ${escapeHTML(item.title)}"><option value="open" ${status==='open'?'selected':''}>Open</option><option value="claimed" ${status==='claimed'?'selected':''}>Claimed</option><option value="resolved" ${status==='resolved'?'selected':''}>Resolved</option></select></label><button type="button" class="remove-button" data-remove="${escapeHTML(item.id)}" aria-label="Remove ${escapeHTML(item.title)}">Remove</button></div></article>`;
    }).join('');
    count.textContent = `${shown.length} ${shown.length===1?'LISTING':'LISTINGS'}`;
    emptyState.hidden = shown.length > 0; grid.hidden = shown.length === 0;
  }
  function openDetails(id) {
    const item = listings.find(entry=>entry.id===id); if(!item)return;
    activeItemId = id; claimForm.reset(); claimMessage.textContent = ''; claimClosedMessage.textContent = '';
    const claims = item.claims.length ? `<section class="existing-claims"><h3>Claims received (${item.claims.length})</h3>${item.claims.map(claim=>`<article class="claim-entry"><strong>${escapeHTML(claim.name)}</strong><span>${escapeHTML(claim.contact)}</span><p>${escapeHTML(claim.message)}</p></article>`).join('')}</section>` : '';
    dialogContent.innerHTML = `<span class="badge ${item.type}">${item.type.toUpperCase()}</span><span class="status-pill status-${item.status}">${item.status.toUpperCase()}</span><h2 id="dialog-title">${escapeHTML(item.title)}</h2><dl class="detail-list"><div><dt>Category</dt><dd>${escapeHTML(item.category)}</dd></div><div><dt>Location</dt><dd>${escapeHTML(item.location)}</dd></div><div><dt>Date</dt><dd>${prettyDate(item.date)}</dd></div><div><dt>Posted by</dt><dd>${escapeHTML(item.contactName)}</dd></div><div><dt>Contact</dt><dd>${escapeHTML(item.contact)}</dd></div><div><dt>Details</dt><dd>${escapeHTML(item.description||'No extra details provided.')}</dd></div></dl>${claims}`;
    claimForm.hidden = item.status === 'resolved';
    claimClosedMessage.hidden = item.status !== 'resolved';
    if (item.status === 'resolved') claimClosedMessage.textContent = 'This listing is resolved and no longer accepting claims.';
    dialog.showModal();
  }
  document.querySelectorAll('.filter-button').forEach(button=>button.addEventListener('click',()=>{activeFilter=button.dataset.filter;document.querySelectorAll('.filter-button').forEach(b=>b.classList.toggle('active',b===button));render()}));
  searchInput.addEventListener('input',render); sortSelect.addEventListener('change',render); categoryFilter.addEventListener('change',render); locationFilter.addEventListener('change',render);
  document.querySelector('#clear-search').addEventListener('click',()=>{searchInput.value='';activeFilter='all';sortSelect.value='newest';categoryFilter.value='';locationFilter.value='';document.querySelectorAll('.filter-button').forEach(b=>b.classList.toggle('active',b.dataset.filter==='all'));render()});
  grid.addEventListener('click',event=>{const details=event.target.closest('[data-details]');if(details){openDetails(details.dataset.details);return;}const remove=event.target.closest('[data-remove]');if(remove){listings=listings.filter(item=>item.id!==remove.dataset.remove);const stored=save();render();reportBoardSave('Listing removed',stored);}});
  grid.addEventListener('change',event=>{const select=event.target.closest('[data-status]');if(!select)return;const item=listings.find(entry=>entry.id===select.dataset.status);if(!item)return;item.status=select.value;const stored=save();render();reportBoardSave('Status updated',stored);});
  document.querySelector('.dialog-close').addEventListener('click',()=>dialog.close());
  dialog.addEventListener('click',event=>{if(event.target===dialog)dialog.close()});
  claimForm.addEventListener('submit',event=>{event.preventDefault();if(!claimForm.reportValidity())return;const item=listings.find(entry=>entry.id===activeItemId);if(!item)return;const data=new FormData(claimForm);item.claims.push({id:`claim-${Date.now()}`,name:data.get('claimName').trim(),contact:data.get('claimContact').trim(),message:data.get('claimMessage').trim(),createdAt:Date.now()});if(item.status==='open')item.status='claimed';const stored=save();claimMessage.textContent=stored?'Claim submitted. The poster can review it in the item details.':'Claim saved for this session; browser storage is unavailable.';openDetails(item.id);claimMessage.textContent=stored?'Claim submitted. The poster can review it in the item details.':'Claim saved for this session; browser storage is unavailable.';render();});
  form.addEventListener('submit',event=>{event.preventDefault();if(!form.reportValidity())return;const data=new FormData(form);const item={id:`item-${Date.now()}-${Math.random().toString(36).slice(2,8)}`,type:data.get('type'),title:data.get('title').trim(),category:data.get('category'),location:data.get('location').trim(),date:data.get('date'),description:data.get('description').trim(),contactName:data.get('contactName').trim(),contact:data.get('contact').trim(),status:'open',claims:[],createdAt:Date.now()};listings.unshift(item);const stored=save();render();form.reset();form.elements.date.value=localDate(new Date());message.textContent=stored?'Your listing is live on this device.':'Listing added for this session. Browser storage is unavailable.';document.querySelector('#browse').scrollIntoView({behavior:'smooth'});setTimeout(()=>{message.textContent='';},5000);});
  form.elements.date.value=localDate(new Date()); render();
})();
