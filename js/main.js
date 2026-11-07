const $=(s,c=document)=>c.querySelector(s),$$=(s,c=document)=>[...c.querySelectorAll(s)];
function show(id){
  if(id==='reviews')id='contact';
  if(!$('#'+id))id='home';
  $$('.view').forEach(v=>v.classList.toggle('active',v.id===id));
  $$('.nav-btn').forEach(b=>b.classList.toggle('active',b.dataset.view===id));
  $$('.card3d',$('#'+id)).forEach((c,i)=>c.style.setProperty('--i',i));
  const sw=$('.sweep');sw.classList.remove('go');void sw.offsetWidth;sw.classList.add('go');
  history.replaceState(null,'','#'+id);window.scrollTo({top:0,behavior:'smooth'});
  const c=$('#menu');if(c.classList.contains('show'))bootstrap.Collapse.getOrCreateInstance(c).hide();
}
$$('[data-view]').forEach(b=>b.addEventListener('click',()=>show(b.dataset.view)));
show(location.hash.slice(1)||'home');
// Galleries: left/right buttons
$$('.gal').forEach(g=>{const t=$('.track',g);
  $('.l',g).onclick=()=>t.scrollBy({left:-t.clientWidth*.8});
  $('.r',g).onclick=()=>t.scrollBy({left:t.clientWidth*.8});});
// See more / See less
$$('.more').forEach(b=>b.addEventListener('click',()=>{
  const o=b.previousElementSibling.classList.toggle('open');b.textContent=o?'See less ▴':'See more ▾';}));
// 3D tilt
$$('.card3d').forEach(c=>{
  c.addEventListener('mousemove',e=>{const r=c.getBoundingClientRect();
    c.style.setProperty('--ry',((e.clientX-r.left)/r.width-.5)*8+'deg');
    c.style.setProperty('--rx',(.5-(e.clientY-r.top)/r.height)*8+'deg');});
  c.addEventListener('mouseleave',()=>{c.style.setProperty('--rx','0deg');c.style.setProperty('--ry','0deg');});});
// Lightbox
const lb=new bootstrap.Modal('#lightbox');
document.addEventListener('click',e=>{const i=e.target.closest('.slide:not(.hw) img');
  if(i){$('#lbImg').src=i.src;$('#lbImg').alt=i.alt;lb.show();}});
