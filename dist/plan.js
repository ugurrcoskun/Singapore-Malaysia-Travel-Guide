(()=>{
  // Asya Cep Rehberi - Günlük Plan, Takvim ve Notion Stili Zengin Not Defteri
  const STORAGE_KEY = 'asya-daily-plans';
  const STORAGE_SELECTED_DATE = 'asya-plan-selected-date';
  const STORAGE_NOTE_VIEW_MODE = 'asya-note-view-mode'; // 'preview' | 'edit'

  // 12 Günlük Ana Seyahat Takvimi
  const TRIP_DAYS = [
    { date: '2026-10-03', dayNum: 1, city: 'Singapur', label: '03 Eki Cmt' },
    { date: '2026-10-04', dayNum: 2, city: 'Singapur', label: '04 Eki Paz' },
    { date: '2026-10-05', dayNum: 3, city: 'Singapur', label: '05 Eki Pzt' },
    { date: '2026-10-06', dayNum: 4, city: 'Singapur', label: '06 Eki Sal' },
    { date: '2026-10-07', dayNum: 5, city: 'Singapur', label: '07 Eki Çar' },
    { date: '2026-10-08', dayNum: 6, city: 'Singapur', label: '08 Eki Per' },
    { date: '2026-10-09', dayNum: 7, city: 'Kuala Lumpur', label: '09 Eki Cum' },
    { date: '2026-10-10', dayNum: 8, city: 'Kuala Lumpur', label: '10 Eki Cmt' },
    { date: '2026-10-11', dayNum: 9, city: 'Kuala Lumpur', label: '11 Eki Paz' },
    { date: '2026-10-12', dayNum: 10, city: 'Kuala Lumpur', label: '12 Eki Pzt' },
    { date: '2026-10-13', dayNum: 11, city: 'Kuala Lumpur', label: '13 Eki Sal' },
    { date: '2026-10-14', dayNum: 12, city: 'Kuala Lumpur', label: '14 Eki Çar' }
  ];

  // Başlangıç için Notion / AI çıktısı formatında örnek zengin planlar
  const DEFAULT_PLANS = {
    '2026-10-03': {
      notes: `## 🛬 Singapur'a Varış & İlk Akşam

Changi Havalimanı Terminal 1'e iniş ve şehre ilk adım!

### Günün Önemli Maddeleri:
- **Havalimanı:** Jewel Rain Vortex iç mekan şelalesini gör ve metro için EZ-Link kartı temin et.
- **Otel Check-in:** 14:30 civarı otele yerleşme ve kısa bir dinlenme molası.
- **Chinatown:** Akşam Chinatown sokaklarında yürüyüş ve hediyelik alışverişi.
- **Akşam Yemeği:** Chinatown Complex Hawker Center'da meşhur **Hainanese Chicken Rice** ve taze şeker kamışı suyu.

> 💡 **Önemli İpucu:** Toplu taşımada Mastercard/Visa temassız kartlar da geçiyor. Metro ve otobüslerde su/yiyecek tüketmek kesinlikle yasak!`,
      city: 'Singapur',
      items: [
        { id: 'item-demo-1', time: '14:30', title: 'Otele yerleşme ve bavulları bırakma', category: 'otel', done: false, note: 'Hotel 81 Tristar / resepsiyon' },
        { id: 'item-demo-2', time: '16:00', title: 'Jewel Changi & Rain Vortex şelalesi', category: 'gezi', done: false, note: 'Dev iç mekan şelalesi ve botanik bahçe' },
        { id: 'item-demo-3', time: '19:30', title: 'Chinatown Complex Hawker Center akşam yemeği', category: 'yeme', done: false, note: 'Hainanese Chicken Rice ve sokak lezzetleri' }
      ]
    },
    '2026-10-04': {
      notes: `## 🌿 Marina Bay & Geleceğin Bahçeleri

Sabah erken saatlerde havanın serinliğinden faydalanarak Gardens by the Bay'e gidilecek.

### Sabah Planı (09:00 - 13:00):
- **09:30** - Gardens by the Bay girişi (Cloud Forest & Flower Dome biletleri telefonda hazır)
- **12:00** - Marina Bay Sands Alışveriş Merkezi'nde klimalı mola ve öğle yemeği

### Öğleden Sonra & Akşam:
- **17:30** - The Helix Bridge üzerinden Merlion Park'a yürüyüş ve fotoğraf çekimi
- **19:45** - Supertree Grove Garden Rhapsody ışık ve müzik gösterisi (Ücretsiz!)
- **20:45** - *Lau Pa Sat Satay Street*'te açık havada sokak satay şişleri

> ⭐ **Bilet Notu:** Cloud Forest ve SkyPark bilet karekodlarını internet olmadan açabilmek için ekran görüntüsü olarak kaydettim.`,
      city: 'Singapur',
      items: [
        { id: 'item-demo-4', time: '09:30', title: 'Gardens by the Bay - Cloud Forest & Flower Dome', category: 'gezi', done: false, note: 'Biletler çevrimiçi alındı' },
        { id: 'item-demo-5', time: '13:00', title: 'Marina Bay Sands Alışveriş & Öğle Yemeği', category: 'alisveris', done: false, note: 'Klimalı mola' },
        { id: 'item-demo-6', time: '18:00', title: 'Merlion Park & The Helix Bridge yürüyüşü', category: 'gezi', done: false, note: 'Marina körfezi fotoğraf molası' },
        { id: 'item-demo-7', time: '20:00', title: 'Lau Pa Sat Satay Street akşam ziyafeti', category: 'yeme', done: false, note: 'Açık havada sokak satay şişleri' }
      ]
    },
    '2026-10-09': {
      notes: `## 🚌 Kuala Lumpur'a Geçiş & Gece Pazarı

Singapur'dan Malezya'ya geçiş günü!

### Rota & Hatırlatmalar:
- **09:30** - Otel çıkışı ve transfer başlangıcı
- **11:00** - Sınır ve pasaport kontrolü (Malezya MDAC dijital giriş formu hazır olsun)
- **16:00** - Kuala Lumpur otele varış ve dinlenme
- **19:30** - Meşhur **Jalan Alor Gece Pazarı**'nda akşam yemeği: Dim sum, kızarmış noodle ve taze mango

> 💡 **Döviz:** Malezya Ringgiti (MYR) için nakit gerekebilir; havalimanında veya döviz bürosunda küçük miktar bozdur.`,
      city: 'Kuala Lumpur',
      items: [
        { id: 'item-demo-8', time: '10:00', title: 'Kuala Lumpur yolculuğu & sınır geçişi', category: 'ulasim', done: false, note: 'Sınır geçişi & MDAC formu' },
        { id: 'item-demo-9', time: '16:00', title: 'Otel check-in & dinlenme', category: 'otel', done: false, note: 'KL merkez konaklama' },
        { id: 'item-demo-10', time: '19:30', title: 'Jalan Alor Gece Pazarı & Akşam Yemeği', category: 'yeme', done: false, note: 'Kuala Lumpur sokak lezzetleri' }
      ]
    }
  };

  const CATEGORY_MAP = {
    gezi: { label: 'Gezi', icon: '🏛️', color: 'var(--red)' },
    yeme: { label: 'Yeme & İçme', icon: '🍜', color: '#b9652a' },
    ulasim: { label: 'Ulaşım', icon: '🚇', color: '#315f77' },
    otel: { label: 'Otel / Konaklama', icon: '🏨', color: '#684f88' },
    alisveris: { label: 'Alışveriş', icon: '🛍️', color: '#2f685e' },
    onemli: { label: 'Önemli & Not', icon: '⭐', color: '#a83229' }
  };

  const $ = selector => document.querySelector(selector);
  const $$ = selector => [...document.querySelectorAll(selector)];

  // Veri yükleme ve saklama
  function loadPlans() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        // Eski düz metin formatında tek satırlık not varsa güncelle
        return parsed;
      }
    } catch (e) {
      console.error('Planlar yüklenemedi:', e);
    }
    // İlk açılışta varsayılan örnek veriyi kaydet
    localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_PLANS));
    return JSON.parse(JSON.stringify(DEFAULT_PLANS));
  }

  function savePlans(data) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      console.error('Planlar kaydedilemedi:', e);
    }
    renderHomePlanCard();
  }

  let plans = loadPlans();

  // Seçili tarih yönetimi
  function getInitialDate() {
    const saved = localStorage.getItem(STORAGE_SELECTED_DATE);
    if (saved && /^\d{4}-\d{2}-\d{2}$/.test(saved)) {
      return saved;
    }
    const today = new Date().toISOString().slice(0, 10);
    const inTrip = TRIP_DAYS.some(d => d.date === today);
    return inTrip ? today : '2026-10-03';
  }

  let selectedDate = getInitialDate();
  let currentMonthCursor = new Date('2026-10-01');
  let currentNoteMode = localStorage.getItem(STORAGE_NOTE_VIEW_MODE) || 'preview'; // 'preview' veya 'edit'

  function setSelectedDate(dateStr) {
    selectedDate = dateStr;
    localStorage.setItem(STORAGE_SELECTED_DATE, dateStr);
    renderAll();
  }

  // Güvenli HTML kaçışı
  function escapeHtml(str) {
    if (!str) return '';
    return String(str).replace(/[&<>"']/g, m => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;'
    }[m]));
  }

  // Satır içi biçimlendirme (Kalın, İtalik, Saat, Link, Kod)
  function formatInline(str) {
    let s = escapeHtml(str);

    // Kalın metinler: **metin** veya __metin__
    s = s.replace(/\*\*(.+?)\*\*/g, '<strong class="notion-bold">$1</strong>');
    s = s.replace(/__(.+?)__/g, '<strong class="notion-bold">$1</strong>');

    // İtalik metinler: *metin* veya _metin_
    s = s.replace(/\*([^*\n]+?)\*/g, '<em class="notion-italic">$1</em>');
    s = s.replace(/_([^_\n]+?)_/g, '<em class="notion-italic">$1</em>');

    // Kod/vurgulu bloklar: `kod`
    s = s.replace(/`([^`\n]+?)`/g, '<code class="notion-code">$1</code>');

    // Saat formatları: 09:30, 14:00, 20:15
    s = s.replace(/\b([0-2]?[0-9]:[0-5][0-9])\b/g, '<span class="notion-time-badge">⏰ $1</span>');

    // Markdown linkler: [başlık](https://...)
    s = s.replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g, '<a class="notion-link" href="$2" target="_blank" rel="noopener noreferrer">$1 ↗</a>');

    // Düz URL linkleri
    s = s.replace(/(^|[^">])(https?:\/\/[^\s<]+)/g, '$1<a class="notion-link" href="$2" target="_blank" rel="noopener noreferrer">$2 ↗</a>');

    return s;
  }

  // Notion Stili Zengin Markdown Parser
  function renderNotionMarkdown(text) {
    if (!text || !text.trim()) {
      return `
        <div class="notion-empty-placeholder">
          <span class="placeholder-icon">✍️</span>
          <h4>Bu güne ait henüz not yazılmadı</h4>
          <p>AI'dan (ChatGPT, Claude vb.) kopyaladığın gezi planını, bilet saatlerini veya kişisel notlarını buraya yapıştırabilirsin. Kalın yazılar, başlıklar ve listeler Notion sayfası gibi düzenli görünür.</p>
          <button type="button" class="primary-button small edit-notes-cta">✎ Not Ekle / Yapıştır</button>
        </div>
      `;
    }

    const lines = text.split('\n');
    let html = '';
    let inList = false;
    let listType = null; // 'ul' | 'ol'

    function closeList() {
      if (inList) {
        html += listType === 'ul' ? '</ul>' : '</ol>';
        inList = false;
        listType = null;
      }
    }

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const trimmed = line.trim();

      if (!trimmed) {
        closeList();
        continue;
      }

      // Başlıklar
      const h3Match = trimmed.match(/^###\s+(.*)$/);
      const h2Match = trimmed.match(/^##\s+(.*)$/);
      const h1Match = trimmed.match(/^#\s+(.*)$/);

      if (h3Match) {
        closeList();
        html += `<h4 class="notion-h3">${formatInline(h3Match[1])}</h4>`;
        continue;
      }
      if (h2Match) {
        closeList();
        html += `<h3 class="notion-h2">${formatInline(h2Match[1])}</h3>`;
        continue;
      }
      if (h1Match) {
        closeList();
        html += `<h2 class="notion-h1">${formatInline(h1Match[1])}</h2>`;
        continue;
      }

      // Callout / Alıntı blokları (> İpucu ...)
      const calloutMatch = trimmed.match(/^>\s*(.*)$/);
      if (calloutMatch) {
        closeList();
        html += `
          <div class="notion-callout">
            <span class="callout-icon" aria-hidden="true">💡</span>
            <div class="callout-text">${formatInline(calloutMatch[1])}</div>
          </div>
        `;
        continue;
      }

      // Checkbox listesi (- [ ] veya - [x])
      const todoMatch = trimmed.match(/^[-*•]\s+\[([ xX])\]\s+(.*)$/);
      if (todoMatch) {
        closeList();
        const checked = todoMatch[1].toLowerCase() === 'x';
        html += `
          <div class="notion-todo-item ${checked ? 'done' : ''}">
            <span class="notion-todo-box">${checked ? '✓' : '○'}</span>
            <span>${formatInline(todoMatch[2])}</span>
          </div>
        `;
        continue;
      }

      // Madde Listesi (- veya * veya •)
      const bulletMatch = trimmed.match(/^[-*•]\s+(.*)$/);
      if (bulletMatch) {
        if (!inList || listType !== 'ul') {
          closeList();
          html += '<ul class="notion-bullet-list">';
          inList = true;
          listType = 'ul';
        }
        html += `<li>${formatInline(bulletMatch[1])}</li>`;
        continue;
      }

      // Numaralı Liste (1. veya 2.)
      const numMatch = trimmed.match(/^(\d+)[.)]\s+(.*)$/);
      if (numMatch) {
        if (!inList || listType !== 'ol') {
          closeList();
          html += '<ol class="notion-num-list">';
          inList = true;
          listType = 'ol';
        }
        html += `<li>${formatInline(numMatch[2])}</li>`;
        continue;
      }

      // Normal Paragraf
      closeList();
      html += `<p class="notion-p">${formatInline(line)}</p>`;
    }

    closeList();
    return html;
  }

  // Tarih biçimlendirme
  const TR_DAYS = ['Pazar', 'Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi'];
  const TR_MONTHS = ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'];

  function formatDateHeading(dateStr) {
    const [y, m, d] = dateStr.split('-').map(Number);
    const dateObj = new Date(y, m - 1, d);
    const dayName = TR_DAYS[dateObj.getDay()];
    const monthName = TR_MONTHS[m - 1];
    return `${d < 10 ? '0' + d : d} ${monthName.toUpperCase()} ${y}, ${dayName.toUpperCase()}`;
  }

  function getTripDayInfo(dateStr) {
    const found = TRIP_DAYS.find(d => d.date === dateStr);
    if (found) {
      return `${found.city} · ${found.dayNum}. Gün`;
    }
    if (dateStr >= '2026-10-03' && dateStr <= '2026-10-08') return 'Singapur';
    if (dateStr >= '2026-10-09' && dateStr <= '2026-10-14') return 'Kuala Lumpur';
    return 'Özel Tarih';
  }

  function getDayData(dateStr) {
    if (!plans[dateStr]) {
      let city = 'Singapur';
      if (dateStr >= '2026-10-09') city = 'Kuala Lumpur';
      plans[dateStr] = { notes: '', city, items: [] };
    }
    return plans[dateStr];
  }

  // Seyahat Şeridini Render Et
  function renderTripBar() {
    const root = $('#plan-trip-bar');
    if (!root) return;
    root.replaceChildren();

    TRIP_DAYS.forEach(day => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = `trip-bar-item${day.date === selectedDate ? ' active' : ''}`;
      btn.setAttribute('aria-label', `${day.label}, ${day.city}`);

      const dayPlan = plans[day.date];
      const hasContent = dayPlan && ((dayPlan.items && dayPlan.items.length > 0) || (dayPlan.notes && dayPlan.notes.trim().length > 0));
      const itemsCount = dayPlan?.items?.length || 0;

      btn.innerHTML = `
        <span class="trip-bar-daynum">${day.dayNum}. GÜN</span>
        <span class="trip-bar-date">${day.label.slice(0, 6)}</span>
        <span class="trip-bar-city ${day.city === 'Singapur' ? 'sin' : 'kul'}">${day.city === 'Singapur' ? 'SİN' : 'KUL'}</span>
        ${hasContent ? `<span class="trip-bar-badge" title="${itemsCount} plan">${itemsCount > 0 ? itemsCount : '•'}</span>` : ''}
      `;

      btn.addEventListener('click', () => {
        setSelectedDate(day.date);
        btn.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
      });

      root.append(btn);
    });

    setTimeout(() => {
      const activeEl = root.querySelector('.trip-bar-item.active');
      if (activeEl) {
        activeEl.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
      }
    }, 50);
  }

  // Aylık Mini Takvim
  function renderMiniCalendar() {
    const monthTitle = $('#plan-cal-month-title');
    const calGrid = $('#plan-cal-days-grid');
    if (!calGrid || !monthTitle) return;

    const year = currentMonthCursor.getFullYear();
    const month = currentMonthCursor.getMonth();
    monthTitle.textContent = `${TR_MONTHS[month]} ${year}`;
    calGrid.replaceChildren();

    const firstDay = new Date(year, month, 1);
    let startDay = firstDay.getDay();
    startDay = startDay === 0 ? 6 : startDay - 1;

    const daysInMonth = new Date(year, month + 1, 0).getDate();

    for (let i = 0; i < startDay; i++) {
      const emptyCell = document.createElement('div');
      emptyCell.className = 'cal-day empty';
      calGrid.append(emptyCell);
    }

    for (let d = 1; d <= daysInMonth; d++) {
      const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'cal-day';
      if (dateStr === selectedDate) btn.classList.add('selected');

      const isTrip = TRIP_DAYS.some(t => t.date === dateStr);
      if (isTrip) btn.classList.add('in-trip');

      const dayPlan = plans[dateStr];
      const hasNotes = dayPlan && ((dayPlan.items && dayPlan.items.length > 0) || (dayPlan.notes && dayPlan.notes.trim().length > 0));
      if (hasNotes) btn.classList.add('has-plan');

      btn.innerHTML = `<span>${d}</span>${hasNotes ? '<i class="cal-dot"></i>' : ''}`;

      btn.addEventListener('click', () => {
        setSelectedDate(dateStr);
        $('#plan-cal-popover').hidden = true;
      });

      calGrid.append(btn);
    }
  }

  // Not Defteri Görünüm / Düzenleme Modu Geçişi
  function setNoteViewMode(mode, shouldFocus = false) {
    currentNoteMode = mode;
    localStorage.setItem(STORAGE_NOTE_VIEW_MODE, mode);

    const previewEl = $('#plan-notes-preview');
    const editWrapper = $('#plan-notes-edit-wrapper');
    const toolbar = $('#notion-editor-toolbar');
    const btnPreview = $('#notion-toggle-preview');
    const btnEdit = $('#notion-toggle-edit');

    const isEdit = mode === 'edit';

    if (previewEl) previewEl.hidden = isEdit;
    if (editWrapper) editWrapper.hidden = !isEdit;
    if (toolbar) toolbar.hidden = !isEdit;

    if (btnPreview) {
      btnPreview.classList.toggle('active', !isEdit);
      btnPreview.setAttribute('aria-selected', !isEdit ? 'true' : 'false');
    }
    if (btnEdit) {
      btnEdit.classList.toggle('active', isEdit);
      btnEdit.setAttribute('aria-selected', isEdit ? 'true' : 'false');
    }

    if (isEdit && shouldFocus) {
      $('#plan-day-notes')?.focus();
    }
  }

  // Seçilen günün içeriğini render et
  function renderSelectedDay() {
    const dayData = getDayData(selectedDate);

    // Başlıklar
    const headingEl = $('#plan-selected-heading');
    const badgeEl = $('#plan-selected-badge');
    const statsEl = $('#plan-selected-stats');

    if (headingEl) headingEl.textContent = formatDateHeading(selectedDate);
    if (badgeEl) badgeEl.textContent = getTripDayInfo(selectedDate);

    // İstatistik
    const items = dayData.items || [];
    const doneItems = items.filter(i => i.done).length;
    if (statsEl) {
      if (items.length === 0) {
        statsEl.textContent = 'Henüz plan maddesi eklenmedi';
      } else {
        statsEl.textContent = `${items.length} plan · ${doneItems} tamamlandı`;
      }
    }

    // Not Defteri Textarea ve Notion Önizlemesi
    const noteArea = $('#plan-day-notes');
    const previewEl = $('#plan-notes-preview');
    const noteSavedIndicator = $('#plan-notes-saved');

    const notesText = dayData.notes || '';
    if (noteArea) noteArea.value = notesText;
    if (noteSavedIndicator) noteSavedIndicator.textContent = '';

    if (previewEl) {
      previewEl.innerHTML = renderNotionMarkdown(notesText);
      // Boş durumda CTA butonuna tıklandığında düzenleme moduna geçir
      previewEl.querySelector('.edit-notes-cta')?.addEventListener('click', () => {
        setNoteViewMode('edit');
      });
    }

    // Eğer not varsa ve ilk açılışsa önizleme modunu koru, değilse kullanıcının modunu uygula
    if (!notesText.trim()) {
      setNoteViewMode('edit');
    } else {
      setNoteViewMode(currentNoteMode);
    }

    // Plan Maddeleri Listesi
    const listRoot = $('#plan-items-list');
    const emptyState = $('#plan-items-empty');
    if (listRoot) {
      listRoot.replaceChildren();

      if (items.length === 0) {
        if (emptyState) emptyState.hidden = false;
      } else {
        if (emptyState) emptyState.hidden = true;
        items.forEach((item, index) => {
          const card = createPlanItemElement(item, index);
          listRoot.append(card);
        });
      }
    }

    // Şehir Seçici
    const citySelector = $('#plan-day-city');
    if (citySelector) {
      citySelector.value = dayData.city || (selectedDate >= '2026-10-09' ? 'Kuala Lumpur' : 'Singapur');
    }
  }

  // Plan Maddesi Kartı
  function createPlanItemElement(item, index) {
    const card = document.createElement('div');
    card.className = `plan-item-card${item.done ? ' done' : ''}`;
    card.dataset.id = item.id;

    const catInfo = CATEGORY_MAP[item.category] || CATEGORY_MAP.gezi;

    const checkBtn = document.createElement('button');
    checkBtn.type = 'button';
    checkBtn.className = `plan-check-btn${item.done ? ' checked' : ''}`;
    checkBtn.setAttribute('aria-label', item.done ? 'Yapılmadı olarak işaretle' : 'Tamamlandı olarak işaretle');
    checkBtn.innerHTML = item.done ? '✓' : '';
    checkBtn.addEventListener('click', () => {
      item.done = !item.done;
      savePlans(plans);
      renderTripBar();
      renderSelectedDay();
    });

    const body = document.createElement('div');
    body.className = 'plan-item-body';

    const meta = document.createElement('div');
    meta.className = 'plan-item-meta';

    if (item.time) {
      const timeSpan = document.createElement('span');
      timeSpan.className = 'plan-item-time';
      timeSpan.textContent = `⏰ ${item.time}`;
      meta.append(timeSpan);
    }

    const catBadge = document.createElement('span');
    catBadge.className = 'plan-item-cat';
    catBadge.style.color = catInfo.color;
    catBadge.textContent = `${catInfo.icon} ${catInfo.label}`;
    meta.append(catBadge);

    const title = document.createElement('h4');
    title.className = 'plan-item-title';
    title.textContent = item.title;

    body.append(meta, title);

    if (item.note) {
      const noteP = document.createElement('p');
      noteP.className = 'plan-item-note';
      noteP.textContent = item.note;
      body.append(noteP);
    }

    const actions = document.createElement('div');
    actions.className = 'plan-item-actions';

    const deleteBtn = document.createElement('button');
    deleteBtn.type = 'button';
    deleteBtn.className = 'plan-delete-btn';
    deleteBtn.setAttribute('aria-label', 'Planı sil');
    deleteBtn.textContent = '×';
    deleteBtn.addEventListener('click', () => {
      const dayData = getDayData(selectedDate);
      dayData.items = dayData.items.filter(i => i.id !== item.id);
      savePlans(plans);
      renderTripBar();
      renderSelectedDay();
      window.TravelAppToast?.('Plan maddesi silindi');
    });

    actions.append(deleteBtn);
    card.append(checkBtn, body, actions);

    return card;
  }

  // Haritadaki yer önerileri
  function populatePlaceSuggestions() {
    const datalist = $('#plan-places-datalist');
    if (!datalist || !window.TRAVEL_PLACES) return;
    datalist.replaceChildren();
    window.TRAVEL_PLACES.forEach(place => {
      const opt = document.createElement('option');
      opt.value = place.name;
      opt.textContent = `${place.list === 'gezi' ? 'Gezilecek' : 'Yeme-İçme'} · Singapur`;
      datalist.append(opt);
    });
  }

  // Not defteri otomatik kaydetme
  let notesSaveTimer = null;
  function handleNotesInput(e) {
    const text = e.target.value;
    const dayData = getDayData(selectedDate);
    dayData.notes = text;

    // Canlı önizlemeyi de güncelle
    const previewEl = $('#plan-notes-preview');
    if (previewEl) {
      previewEl.innerHTML = renderNotionMarkdown(text);
      previewEl.querySelector('.edit-notes-cta')?.addEventListener('click', () => setNoteViewMode('edit'));
    }

    const savedIndicator = $('#plan-notes-saved');
    if (savedIndicator) savedIndicator.textContent = 'Kaydediliyor...';

    clearTimeout(notesSaveTimer);
    notesSaveTimer = setTimeout(() => {
      savePlans(plans);
      renderTripBar();
      if (savedIndicator) {
        savedIndicator.textContent = '✓ Kaydedildi';
        setTimeout(() => {
          if (savedIndicator.textContent === '✓ Kaydedildi') savedIndicator.textContent = '';
        }, 2200);
      }
    }, 450);
  }

  // Araç çubuğu etiket ekleme yardımcısı
  function insertFormat(formatType) {
    const textarea = $('#plan-day-notes');
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const value = textarea.value;
    const selected = value.substring(start, end);

    let replacement = '';
    let cursorOffset = 0;

    switch (formatType) {
      case 'bold':
        replacement = selected ? `**${selected}**` : '**kalın yazı**';
        cursorOffset = selected ? replacement.length : 2;
        break;
      case 'h2':
        replacement = selected ? `\n## ${selected}\n` : '\n## Yeni Başlık\n';
        cursorOffset = replacement.length;
        break;
      case 'list':
        replacement = selected ? `\n- ${selected}` : '\n- Yeni aktivite maddesi';
        cursorOffset = replacement.length;
        break;
      case 'numlist':
        replacement = selected ? `\n1. ${selected}` : '\n1. İlk adım';
        cursorOffset = replacement.length;
        break;
      case 'callout':
        replacement = selected ? `\n> 💡 **İpucu:** ${selected}\n` : '\n> 💡 **İpucu:** Hatırlatma notun\n';
        cursorOffset = replacement.length;
        break;
    }

    textarea.value = value.substring(0, start) + replacement + value.substring(end);
    textarea.focus();
    textarea.setSelectionRange(start + cursorOffset, start + cursorOffset);

    // Olayı tetikle
    handleNotesInput({ target: textarea });
  }

  // Panodan Doğrudan Yapıştırma
  async function pasteFromClipboard() {
    const textarea = $('#plan-day-notes');
    if (!textarea) return;

    try {
      if (navigator.clipboard && navigator.clipboard.readText) {
        const text = await navigator.clipboard.readText();
        if (text) {
          const start = textarea.selectionStart || textarea.value.length;
          const end = textarea.selectionEnd || textarea.value.length;
          const current = textarea.value;
          textarea.value = current.substring(0, start) + (current && !current.endsWith('\n') ? '\n\n' : '') + text + current.substring(end);
          handleNotesInput({ target: textarea });
          window.TravelAppToast?.('Metin yapıştırıldı ve Notion stiline uyarlandı! ✨');
          return;
        }
      }
      textarea.focus();
      window.TravelAppToast?.('Lütfen klavyeden yapıştırın (Ctrl+V / Cmd+V)');
    } catch {
      textarea.focus();
      window.TravelAppToast?.('Panoya erişim izni yok, metin kutusuna direkt yapıştırabilirsin.');
    }
  }

  // Günün planını ve notlarını panoya kopyalama
  async function copyDaySummary() {
    const dayData = getDayData(selectedDate);
    const dateFormatted = formatDateHeading(selectedDate);
    const tripInfo = getTripDayInfo(selectedDate);

    let text = `📅 ${dateFormatted} (${tripInfo})\n`;
    text += `━━━━━━━━━━━━━━━━━━━━━\n`;

    if (dayData.notes && dayData.notes.trim()) {
      text += `📝 GÜNÜN NOTLARI & AJANDA:\n${dayData.notes.trim()}\n\n`;
    }

    if (dayData.items && dayData.items.length > 0) {
      text += `📍 GÜNLÜK PLAN:\n`;
      dayData.items.forEach(item => {
        const check = item.done ? '✅' : '⬜';
        const time = item.time ? `[${item.time}] ` : '';
        const cat = CATEGORY_MAP[item.category]?.icon || '•';
        text += `${check} ${time}${cat} ${item.title}`;
        if (item.note) text += ` (${item.note})`;
        text += `\n`;
      });
    } else if (!dayData.notes || !dayData.notes.trim()) {
      text += `Henüz bu güne plan veya not yazılmadı.\n`;
    }

    text += `\n✈️ Asya Cep Rehberi ile hazırlandı`;

    try {
      await navigator.clipboard.writeText(text);
      window.TravelAppToast?.('Günün planı ve notları kopyalandı! 📋');
    } catch {
      window.TravelAppToast?.('Kopyalama desteklenmiyor, metin seçilebilir.');
    }
  }

  // Tüm Seyahat Özeti
  function renderAllTripSummary() {
    const container = $('#all-plans-content');
    if (!container) return;
    container.replaceChildren();

    TRIP_DAYS.forEach(day => {
      const dayData = plans[day.date];
      const hasItems = dayData?.items && dayData.items.length > 0;
      const hasNotes = dayData?.notes && dayData.notes.trim().length > 0;

      const section = document.createElement('div');
      section.className = 'all-plan-day-card';

      section.innerHTML = `
        <div class="all-plan-day-head">
          <div>
            <h3>${day.dayNum}. Gün · ${day.label}</h3>
            <span class="all-plan-city-badge ${day.city === 'Singapur' ? 'sin' : 'kul'}">${day.city}</span>
          </div>
          <button type="button" class="text-link" data-jump-date="${day.date}">Bu Güne Git →</button>
        </div>
        ${hasNotes ? `<div class="all-plan-notes-box notion-rendered-view compact">${renderNotionMarkdown(dayData.notes)}</div>` : ''}
        ${hasItems ? `
          <ul class="all-plan-items-list">
            ${dayData.items.map(it => `
              <li class="${it.done ? 'done' : ''}">
                <span class="all-plan-time">${it.time ? it.time : '•'}</span>
                <span>${escapeHtml(it.title)}</span>
                ${it.note ? `<small>(${escapeHtml(it.note)})</small>` : ''}
              </li>
            `).join('')}
          </ul>
        ` : ''}
        ${!hasNotes && !hasItems ? `<p class="muted-note" style="margin: 6px 0;">Bu gün için henüz not veya plan girilmedi.</p>` : ''}
      `;

      container.append(section);
    });

    container.querySelectorAll('[data-jump-date]').forEach(btn => {
      btn.addEventListener('click', () => {
        setSelectedDate(btn.dataset.jumpDate);
        $('#all-plans-dialog')?.close();
      });
    });
  }

  // Ana Sayfadaki "Bugünün Planı & Notları" Kartını Render Et
  function renderHomePlanCard() {
    const root = $('#home-plan-summary');
    if (!root) return;

    const activeDate = selectedDate;
    const dayData = getDayData(activeDate);
    const dateFormatted = formatDateHeading(activeDate);
    const tripInfo = getTripDayInfo(activeDate);

    const items = dayData.items || [];
    const doneItems = items.filter(i => i.done).length;
    const hasNotes = !!(dayData.notes && dayData.notes.trim());

    // Ana sayfa için notun ilk birkaç satırını temiz göster
    let previewNotesHtml = '';
    if (hasNotes) {
      previewNotesHtml = renderNotionMarkdown(dayData.notes);
    }

    root.innerHTML = `
      <div class="home-plan-box">
        <div class="home-plan-header">
          <div>
            <span class="home-plan-tag">AJANDA & GÜNLÜK PLAN</span>
            <h3 class="home-plan-title">${dateFormatted}</h3>
            <p class="home-plan-meta">${tripInfo} · ${items.length} aktivite ${items.length > 0 ? `(${doneItems} tamamlandı)` : ''}</p>
          </div>
          <button type="button" class="primary-button small" id="home-go-plan-btn">Planı Aç & Düzenle →</button>
        </div>

        ${hasNotes ? `
          <div class="home-plan-notes-preview notion-rendered-view compact">
            <span class="preview-label">Günün Not Defteri:</span>
            ${previewNotesHtml}
          </div>
        ` : ''}

        <div class="home-plan-items-preview">
          ${items.length > 0 ? `
            <ul class="home-plan-list">
              ${items.slice(0, 3).map(it => `
                <li class="${it.done ? 'done' : ''}">
                  <span class="home-plan-check">${it.done ? '✓' : '○'}</span>
                  ${it.time ? `<b>${it.time}</b>` : ''}
                  <span>${escapeHtml(it.title)}</span>
                </li>
              `).join('')}
              ${items.length > 3 ? `<li class="home-plan-more">+${items.length - 3} plan daha var...</li>` : ''}
            </ul>
          ` : `
            <p class="home-plan-empty">Bu güne henüz plan eklenmedi. Notlarını ve rotanı yazmak için tıkla.</p>
          `}
        </div>
      </div>
    `;

    root.querySelector('#home-go-plan-btn')?.addEventListener('click', () => {
      window.TravelChangeView?.('plan');
    });
  }

  // Gün adımlama
  function stepDay(offset) {
    const [y, m, d] = selectedDate.split('-').map(Number);
    const dateObj = new Date(y, m - 1, d);
    dateObj.setDate(dateObj.getDate() + offset);
    const newY = dateObj.getFullYear();
    const newM = String(dateObj.getMonth() + 1).padStart(2, '0');
    const newD = String(dateObj.getDate()).padStart(2, '0');
    setSelectedDate(`${newY}-${newM}-${newD}`);
  }

  function renderAll() {
    renderTripBar();
    renderMiniCalendar();
    renderSelectedDay();
    renderHomePlanCard();
  }

  // Olay Dinleyicileri Kurulumu
  function initListeners() {
    // Not Defteri Textarea
    const noteArea = $('#plan-day-notes');
    if (noteArea) {
      noteArea.addEventListener('input', handleNotesInput);
      noteArea.addEventListener('paste', () => {
        // Yapıştırma sonrası hemen kaydet ve önizlemeyi tazele
        setTimeout(() => {
          handleNotesInput({ target: noteArea });
        }, 50);
      });
    }

    // Notion Görünüm / Düzenleme Butonları
    $('#notion-toggle-preview')?.addEventListener('click', () => setNoteViewMode('preview'));
    $('#notion-toggle-edit')?.addEventListener('click', () => setNoteViewMode('edit', true));
    $('#notion-done-editing-btn')?.addEventListener('click', () => setNoteViewMode('preview'));

    // Notion Önizlemesine çift dokunulduğunda düzenleme moduna geç
    $('#plan-notes-preview')?.addEventListener('dblclick', () => setNoteViewMode('edit', true));

    // Biçimlendirme Araç Çubuğu Butonları
    $$('#notion-editor-toolbar .toolbar-btn[data-fmt]').forEach(btn => {
      btn.addEventListener('click', () => {
        insertFormat(btn.dataset.fmt);
      });
    });

    // Panodan Yapıştır Butonu
    $('#notion-paste-btn')?.addEventListener('click', pasteFromClipboard);

    // Şehir Değiştirici
    $('#plan-day-city')?.addEventListener('change', e => {
      const dayData = getDayData(selectedDate);
      dayData.city = e.target.value;
      savePlans(plans);
      renderTripBar();
      renderSelectedDay();
    });

    // Gün Adımlama Okları
    $('#plan-prev-day')?.addEventListener('click', () => stepDay(-1));
    $('#plan-next-day')?.addEventListener('click', () => stepDay(1));
    $('#plan-today-btn')?.addEventListener('click', () => {
      const today = new Date().toISOString().slice(0, 10);
      setSelectedDate(today);
    });

    // Takvim Popover
    const calPopover = $('#plan-cal-popover');
    $('#plan-open-calendar-btn')?.addEventListener('click', () => {
      if (!calPopover) return;
      calPopover.hidden = !calPopover.hidden;
      if (!calPopover.hidden) {
        const [y, m] = selectedDate.split('-').map(Number);
        currentMonthCursor = new Date(y, m - 1, 1);
        renderMiniCalendar();
      }
    });

    $('#plan-cal-close-btn')?.addEventListener('click', () => {
      if (calPopover) calPopover.hidden = true;
    });

    // Ay Gezintisi
    $('#plan-cal-prev-month')?.addEventListener('click', () => {
      currentMonthCursor.setMonth(currentMonthCursor.getMonth() - 1);
      renderMiniCalendar();
    });
    $('#plan-cal-next-month')?.addEventListener('click', () => {
      currentMonthCursor.setMonth(currentMonthCursor.getMonth() + 1);
      renderMiniCalendar();
    });

    // Kopyala Butonu
    $('#plan-copy-day-btn')?.addEventListener('click', copyDaySummary);

    // Yeni Plan Ekleme Dialogu
    const planDialog = $('#plan-item-dialog');
    const openAddBtn = $('#plan-add-item-btn');
    const closeDialogBtn = $('#close-plan-dialog');
    const itemForm = $('#plan-item-form');

    openAddBtn?.addEventListener('click', () => {
      if (!planDialog) return;
      itemForm?.reset();
      populatePlaceSuggestions();
      planDialog.showModal();
    });

    closeDialogBtn?.addEventListener('click', () => {
      planDialog?.close();
    });

    itemForm?.addEventListener('submit', e => {
      e.preventDefault();
      const formData = new FormData(itemForm);
      const title = String(formData.get('title') || '').trim();
      if (!title) return;

      const time = String(formData.get('time') || '').trim();
      const category = String(formData.get('category') || 'gezi');
      const note = String(formData.get('note') || '').trim();

      const newItem = {
        id: `plan-${Date.now()}`,
        title,
        time,
        category,
        note,
        done: false
      };

      const dayData = getDayData(selectedDate);
      if (!Array.isArray(dayData.items)) dayData.items = [];
      dayData.items.push(newItem);

      dayData.items.sort((a, b) => {
        if (!a.time && !b.time) return 0;
        if (!a.time) return 1;
        if (!b.time) return -1;
        return a.time.localeCompare(b.time);
      });

      savePlans(plans);
      itemForm.reset();
      planDialog.close();
      renderTripBar();
      renderSelectedDay();
      window.TravelAppToast?.('Plan maddesi eklendi! ✨');
    });

    // Tüm Seyahat Özeti Dialogu
    const allDialog = $('#all-plans-dialog');
    $('#plan-view-all-btn')?.addEventListener('click', () => {
      renderAllTripSummary();
      allDialog?.showModal();
    });
    $('#close-all-plans-dialog')?.addEventListener('click', () => {
      allDialog?.close();
    });

    // Günün tüm planlarını temizle butonu
    $('#plan-clear-day-btn')?.addEventListener('click', () => {
      if (confirm('Bu günün tüm plan ve notlarını silmek istediğine emin misin?')) {
        const dayData = getDayData(selectedDate);
        dayData.notes = '';
        dayData.items = [];
        savePlans(plans);
        renderTripBar();
        renderSelectedDay();
        window.TravelAppToast?.('Günün planları temizlendi');
      }
    });

    // Tarih şeridindeki Singapur ve KL bağlantıları
    $$('.date-strip span').forEach((el, index) => {
      el.style.cursor = 'pointer';
      el.setAttribute('title', 'Günlük plana git');
      el.addEventListener('click', () => {
        const targetDate = index === 0 ? '2026-10-03' : '2026-10-09';
        setSelectedDate(targetDate);
        window.TravelChangeView?.('plan');
      });
    });
  }

  window.TravelPlan = {
    init: () => {
      initListeners();
      populatePlaceSuggestions();
      renderAll();
    },
    setSelectedDate,
    renderHomePlanCard
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => window.TravelPlan.init());
  } else {
    window.TravelPlan.init();
  }
})();
