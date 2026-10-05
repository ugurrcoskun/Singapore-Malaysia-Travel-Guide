(()=>{
  const $=selector=>document.querySelector(selector);
  const $$=selector=>[...document.querySelectorAll(selector)];
  const phrases=Array.isArray(window.TRAVEL_PHRASES)?window.TRAVEL_PHRASES:[];
  const categories=['Hepsi','Hemen kullan','Favoriler','Temel','Yemek','Ulaşım','Alışveriş','Yardım','Otel','Benim cümlelerim'];
  const langMeta={zh:{key:'zh',speech:'zh-CN',html:'zh-CN'},en:{key:'en',speech:'en-US',html:'en'},ms:{key:'ms',speech:'ms-MY',html:'ms'}};
  const readJSON=(key,fallback)=>{try{return JSON.parse(localStorage.getItem(key))??fallback}catch{return fallback}};
  let custom=readJSON('asya-custom-phrases',[]);if(!Array.isArray(custom))custom=[];
  let favorites=readJSON('asya-favorites',[]);if(!Array.isArray(favorites))favorites=[];
  let lang=localStorage.getItem('asya-lang')||'zh';if(!langMeta[lang])lang='zh';
  let city=localStorage.getItem('asya-city')||'Singapur';
  let category='Hemen kullan';let view;let playingAudio=null;let toastTimer;
  const allPhrases=()=>[...phrases,...custom];
  const persist=()=>{localStorage.setItem('asya-favorites',JSON.stringify(favorites));localStorage.setItem('asya-custom-phrases',JSON.stringify(custom));localStorage.setItem('asya-lang',lang);localStorage.setItem('asya-city',city)};
  const toast=message=>{const el=$('#toast');el.textContent=message;el.classList.add('visible');clearTimeout(toastTimer);toastTimer=setTimeout(()=>el.classList.remove('visible'),2600)};
  window.TravelAppToast=toast;
  const validViews=['home','plan','phrases','lists','translate'];
  const getSavedView=()=>{const hash=window.location.hash.replace('#','');if(validViews.includes(hash))return hash;const saved=localStorage.getItem('asya-active-view');if(validViews.includes(saved))return saved;return'home'};
  view=getSavedView();

  function closeOpenModals(){
    let closed=false;
    $$('dialog[open]').forEach(d=>{d.close();closed=true});
    const calPop=$('#plan-cal-popover');
    if(calPop&&!calPop.hidden){calPop.hidden=true;closed=true}
    return closed;
  }

  const scrollPositions={};

  const changeView=(next,push=true)=>{
    if(!validViews.includes(next))next='home';
    const prevView=view;
    if(prevView){
      scrollPositions[prevView]=window.scrollY||window.pageYOffset||0;
    }
    view=next;
    localStorage.setItem('asya-active-view',next);
    if(push&&prevView!==next){
      try{history.pushState({view:next},'','#'+next)}catch(e){}
    }else{
      try{history.replaceState({view:next},'','#'+next)}catch(e){}
    }
    $$('.view').forEach(el=>el.hidden=el.id!==`view-${next}`);
    $$('[data-go]').forEach(el=>el.classList.toggle('active',el.dataset.go===next));
    $$('.bottom-nav button').forEach(el=>el.setAttribute('aria-current',el.dataset.go===next?'page':'false'));
    if(push){
      window.scrollTo({top:0,behavior:'instant'});
    }else{
      const targetY=scrollPositions[next]||0;
      requestAnimationFrame(()=>window.scrollTo({top:targetY,behavior:'instant'}));
    }
    if(next==='lists')requestAnimationFrame(()=>window.TravelMap?.activate());
    if(next==='home')window.TravelPlan?.renderHomePlanCard?.();
  };
  window.TravelChangeView=changeView;

  const enter=(targetView)=>{
    document.documentElement.classList.add('has-entered');
    $('#intro').hidden=true;
    $('#app').hidden=false;
    localStorage.setItem('asya-entered','1');
    const dest=targetView||getSavedView();
    try{history.replaceState({view:dest},'','#'+dest)}catch(e){}
    changeView(dest,false);
  };
  $('#enter-app').addEventListener('click',()=>enter('home'));
  if(localStorage.getItem('asya-entered')==='1'){
    document.documentElement.classList.add('has-entered');
    const initView=getSavedView();
    $('#intro').hidden=true;
    $('#app').hidden=false;
    if(initView!=='home'){
      try{
        history.replaceState({view:'home'},'','#home');
        history.pushState({view:initView},'','#'+initView);
      }catch(e){}
    }else{
      try{history.replaceState({view:'home'},'','#home')}catch(e){}
    }
    changeView(initView,false);
  }
  $('#logo-home').addEventListener('click',()=>changeView('home'));
  document.addEventListener('click',e=>{const btn=e.target.closest('[data-go]');if(btn&&btn.dataset.go)changeView(btn.dataset.go)});

  // Mobil Geri Tuşu & Swipe Back (PopState) Yönetimi
  window.addEventListener('popstate',e=>{
    // 1. Eğer açık bir popup veya dialog varsa önce onu kapat
    if(closeOpenModals()){
      try{history.pushState({view},'','#'+view)}catch(err){}
      return;
    }
    // 2. Bir önceki sekmeye geç
    const hash=window.location.hash.replace('#','');
    const target=validViews.includes(hash)?hash:(e.state?.view||'home');
    document.documentElement.classList.add('has-entered');
    $('#intro').hidden=true;
    $('#app').hidden=false;
    changeView(target,false);
  });

  document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='hidden'){localStorage.setItem('asya-active-view',view);window.TravelPlan?.flushSave?.();}});
  window.addEventListener('pagehide',()=>{localStorage.setItem('asya-active-view',view);window.TravelPlan?.flushSave?.();});
  function updateCity(){const kl=city==='Kuala Lumpur';$('#city-name').textContent=city;$('#language-select').value=lang;$('#translate-lang').value=lang==='zh'?'zh-CN':lang;$('#home-hero-image').classList.toggle('kl',kl);$('#home-hero-image').setAttribute('aria-label',kl?'Akşam ışığında Kuala Lumpur Chinatown sokakları':'Akşam ışığında Singapur Chinatown sokakları');$('#home-edition').textContent=kl?'09—14 EKİM / KUALA LUMPUR':'03—08 EKİM / SİNGAPUR';$('#home-title').textContent=city;$('#home-subtitle').textContent=kl?'Hazır cümleler ve çeviri.':'Harita, hazır cümleler ve çeviri.';$('#translation-tip-text').textContent=kl?'Kuala Lumpur’da Malayca ve İngilizce yaygın. Çince konuşan biriyle Mandarin’i de seçebilirsin.':"Karşındaki kişi İngilizceyi anlamıyorsa önce Mandarin'i dene. Singapur'da Malayca ve Tamilce de konuşuluyor."}
  $('#city-toggle').addEventListener('click',()=>{city=city==='Singapur'?'Kuala Lumpur':'Singapur';lang=city==='Singapur'?'zh':'ms';updateCity();persist();renderAll();toast(`${city} seçildi`)});
  updateCity();

  function makeButton(label,className,text){const b=document.createElement('button');b.type='button';b.className=className;b.setAttribute('aria-label',label);b.textContent=text;return b}
  function speak(phrase){const content=phrase[lang];if(!content){toast('Bu dil için çeviri eklenmemiş');return}if(playingAudio){playingAudio.pause();playingAudio=null}if('speechSynthesis'in window)window.speechSynthesis.cancel();const audioPath=phrase.custom||lang==='en'?null:`./assets/audio/${phrase.id}-${lang}.m4a`;if(audioPath){const audio=new Audio(audioPath);playingAudio=audio;audio.play().catch(()=>{playingAudio=null;synth(content)});audio.onended=()=>{playingAudio=null};return}synth(content)}
  function synth(content){if(!('speechSynthesis'in window)){toast('Bu cihazda sesli okuma desteklenmiyor');return}const utterance=new SpeechSynthesisUtterance(content);utterance.lang=langMeta[lang].speech;utterance.rate=.88;utterance.onerror=()=>toast('Ses oynatılamadı');speechSynthesis.speak(utterance)}
  function makeCard(phrase){const card=document.createElement('article');card.className='phrase-card';const copy=document.createElement('div');const cat=document.createElement('span');cat.className='phrase-category';cat.textContent=phrase.custom?'Benim cümlem':phrase.category;const title=document.createElement('h3');title.textContent=phrase.tr;const translation=document.createElement('p');translation.className='phrase-translation';translation.lang=langMeta[lang].html;translation.textContent=phrase[lang]||'Bu dil için çeviri eklenmedi';const pronunciation=document.createElement('p');pronunciation.className='phrase-pronunciation';const approx=window.TRAVEL_PRONUNCIATIONS?.[phrase.id];if(lang==='zh'&&approx){pronunciation.textContent=approx;}const py=document.createElement('p');py.className='phrase-pinyin';py.textContent=lang==='zh'&&!phrase.custom&&phrase.py?phrase.py:'';copy.append(cat,title,translation);if(pronunciation.textContent)copy.append(pronunciation);if(py.textContent)copy.append(py);const tools=document.createElement('div');tools.className='phrase-tools';const play=makeButton(`${phrase.tr} cümlesini sesli oynat`,'tool-button play','▶');play.disabled=!phrase[lang];play.addEventListener('click',()=>speak(phrase));const favorite=makeButton(favorites.includes(phrase.id)?'Favorilerden çıkar':'Favorilere ekle',`tool-button${favorites.includes(phrase.id)?' saved':''}`,favorites.includes(phrase.id)?'★':'☆');favorite.addEventListener('click',()=>{favorites=favorites.includes(phrase.id)?favorites.filter(id=>id!==phrase.id):[...favorites,phrase.id];persist();renderAll();toast(favorites.includes(phrase.id)?'Favorilere eklendi':'Favorilerden çıkarıldı')});tools.append(play,favorite);if(phrase.custom){const remove=makeButton(`${phrase.tr} cümlesini sil`,'tool-button','×');remove.addEventListener('click',()=>{custom=custom.filter(item=>item.id!==phrase.id);favorites=favorites.filter(id=>id!==phrase.id);persist();renderAll();toast('Cümle silindi')});tools.append(remove)}card.append(copy,tools);return card}
  function renderTabs(){const root=$('#category-tabs');root.replaceChildren();categories.forEach(name=>{const b=makeButton(`${name} kategorisini göster`,name===category?'active':'',name);b.setAttribute('aria-pressed',name===category?'true':'false');b.addEventListener('click',()=>{category=name;renderTabs();renderPhrases()});root.append(b)})}
  function normalize(value){return String(value||'').toLocaleLowerCase('tr').normalize('NFD').replace(/[\u0300-\u036f]/g,'')}
  function renderPhrases(){const query=normalize($('#phrase-search').value.trim());let result=allPhrases().filter(item=>{const match=category==='Hepsi'||category==='Hemen kullan'&&item.quick||category==='Favoriler'&&favorites.includes(item.id)||category==='Benim cümlelerim'&&item.custom||item.category===category;return match&&(!query||[item.tr,item.zh,item.en,item.ms,item.py].some(value=>normalize(value).includes(query)))});$('#result-count').textContent=`${result.length} cümle`;const root=$('#phrase-list');root.replaceChildren(...result.map(makeCard));$('#empty-phrases').hidden=result.length>0;$('#empty-phrases h2').textContent=category==='Favoriler'?'Henüz favorin yok':category==='Benim cümlelerim'?'Henüz cümle eklemedin':'Cümle bulunamadı';$('#empty-phrases p').textContent=category==='Favoriler'?'Sık kullandıklarını yıldızla kaydet.':category==='Benim cümlelerim'?'Yukarıdan kendi cümleni ekleyebilirsin.':'Başka bir kelime dene veya kendi cümleni ekle.'}
  function renderHome(){const picks=['hello','good-morning','thanks'];$('#home-phrases').replaceChildren(...picks.map(id=>phrases.find(item=>item.id===id)).filter(Boolean).map(makeCard))}
  function renderAll(){renderTabs();renderPhrases();renderHome()}
  $('#phrase-search').addEventListener('input',renderPhrases);
  $('#language-select').addEventListener('change',event=>{lang=event.target.value;persist();renderAll()});
  const dialog=$('#phrase-dialog');$('#add-phrase-open').addEventListener('click',()=>dialog.showModal());$('#close-dialog').addEventListener('click',()=>dialog.close());
  $('#custom-phrase-form').addEventListener('submit',event=>{event.preventDefault();const data=new FormData(event.currentTarget);const tr=String(data.get('tr')||'').trim();if(!tr)return;const item={id:`custom-${Date.now()}`,category:'Benim cümlelerim',tr,zh:String(data.get('zh')||'').trim(),en:String(data.get('en')||'').trim(),ms:String(data.get('ms')||'').trim(),custom:true};custom.unshift(item);persist();event.currentTarget.reset();dialog.close();category='Benim cümlelerim';renderAll();toast('Cümle kaydedildi')});
  let latestTranslation='';
  function updateGoogleLink(){const content=$('#translate-text').value.trim();const target=$('#translate-lang').value;$('#google-fallback').href=`https://translate.google.com/?sl=tr&tl=${encodeURIComponent(target)}&text=${encodeURIComponent(content)}&op=translate`}
  $('#translate-text').addEventListener('input',updateGoogleLink);$('#translate-lang').addEventListener('change',updateGoogleLink);
  $('#translate-form').addEventListener('submit',async event=>{
    event.preventDefault();const content=$('#translate-text').value.trim();if(!content)return;
    const target=$('#translate-lang').value;const error=$('#translation-error');const result=$('#translation-result');const submit=$('#translate-submit');
    updateGoogleLink();error.hidden=true;result.hidden=true;
    if(new TextEncoder().encode(content).length>500){error.textContent='Tek seferde en fazla 500 baytlık kısa bir cümle çevrilebilir.';error.hidden=false;return}
    submit.disabled=true;submit.firstChild.textContent='Çevriliyor ';
    try{
      const key=target==='zh-CN'?'zh':target;
      const known=phrases.find(item=>normalize(item.tr.replace(/[.!?]$/,''))===normalize(content.replace(/[.!?]$/,'')));
      async function translatePart(value,source,destination){const url=new URL('https://api.mymemory.translated.net/get');url.searchParams.set('q',value);url.searchParams.set('langpair',`${source}|${destination}`);const response=await fetch(url);if(!response.ok)throw Error('Bağlantı kurulamadı');const data=await response.json();if(data.responseStatus!==200||!data.responseData?.translatedText)throw Error(data.responseDetails||'Çeviri alınamadı');return new DOMParser().parseFromString(data.responseData.translatedText,'text/html').body.textContent.trim()}
      if(known?.[key])latestTranslation=known[key];
      else{const english=await translatePart(content,'tr','en');latestTranslation=target==='en'?english:await translatePart(english,'en',target)}
      if(target==='zh-CN'&&!/[㐀-鿿]/u.test(latestTranslation))throw Error('Mandarin sonuç doğrulanamadı');
      $('#translated-text').textContent=latestTranslation;$('#translated-text').lang=target;result.hidden=false;result.scrollIntoView({behavior:'smooth',block:'nearest'});
    }catch(e){error.textContent='Bu cümle için güvenilir çeviri alınamadı. Aşağıdaki Google Çeviri bağlantısını kullanabilirsin.';error.hidden=false}
    finally{submit.disabled=false;submit.firstChild.textContent='Burada çevir '}
  });
  $('#translation-speak').addEventListener('click',()=>{if(!latestTranslation)return;if(!('speechSynthesis'in window)){toast('Bu cihazda sesli okuma desteklenmiyor');return}speechSynthesis.cancel();const utterance=new SpeechSynthesisUtterance(latestTranslation);utterance.lang=$('#translate-lang').value==='zh-CN'?'zh-CN':$('#translate-lang').value==='ms'?'ms-MY':'en-US';utterance.rate=.88;speechSynthesis.speak(utterance)});
  $('#translation-copy').addEventListener('click',async()=>{try{await navigator.clipboard.writeText(latestTranslation);toast('Çeviri kopyalandı')}catch{toast('Kopyalama kullanılamıyor')}});
  if('serviceWorker'in navigator)window.addEventListener('load',()=>navigator.serviceWorker.register('./sw.js').catch(()=>{}));
  renderAll();
})();
