const $ = (s, root=document) => root.querySelector(s);
const $$ = (s, root=document) => [...root.querySelectorAll(s)];

const progress = $('.progress span');
const header = $('.site-header');
const parallax = $('[data-parallax]');
function onScroll(){
  const max = Math.max(1, document.documentElement.scrollHeight - innerHeight);
  if(progress) progress.style.width = `${Math.min(100,(scrollY/max)*100)}%`;
  if(header) header.classList.toggle('scrolled', scrollY > 32);
  if(parallax && innerWidth > 700){
    const speed = Number(parallax.dataset.parallax || .1);
    parallax.style.transform = `translate3d(0,${scrollY*speed}px,0)`;
  }
}
addEventListener('scroll', onScroll, {passive:true}); onScroll();

const io = new IntersectionObserver((entries)=>{
  entries.forEach((entry)=>{
    if(entry.isIntersecting){ entry.target.classList.add('is-visible'); io.unobserve(entry.target); }
  });
},{threshold:.12});
$$('.reveal').forEach(el=>io.observe(el));

$$('.scene').forEach(card=>{
  card.addEventListener('pointermove',e=>{
    const glow=card.querySelector('.scene-glow'); if(!glow) return;
    const r=card.getBoundingClientRect();
    const x=((e.clientX-r.left)/r.width)*100;
    const y=((e.clientY-r.top)/r.height)*100;
    glow.style.background = `radial-gradient(circle at ${x}% ${y}%, rgba(195,218,255,.18), transparent 28%), linear-gradient(180deg,transparent 32%,rgba(3,10,20,.8) 100%)`;
  });
});

const modal=$('#filmModal'), openFilm=$('#openFilm'), closeFilm=$('#closeFilm'), video=$('#brandVideo'), fallback=$('#videoFallback');
function openModal(){
  if(!modal) return;
  modal.classList.add('open'); modal.setAttribute('aria-hidden','false'); document.body.style.overflow='hidden';
  video?.play().catch(()=>{});
}
function closeModal(){
  if(!modal) return;
  modal.classList.remove('open'); modal.setAttribute('aria-hidden','true'); document.body.style.overflow=''; video?.pause();
}
openFilm?.addEventListener('click',openModal); closeFilm?.addEventListener('click',closeModal);
modal?.addEventListener('click',e=>{ if(e.target===modal) closeModal(); });
addEventListener('keydown',e=>{ if(e.key==='Escape') closeModal(); });
video?.addEventListener('error',()=>{ if(video) video.style.visibility='hidden'; if(fallback) fallback.style.display='grid'; });
