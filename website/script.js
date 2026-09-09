/* ==========================================================
   SOIL EROSION AWARENESS & EFFECTIVE MANAGEMENT
   Interactive Bilingual Engine & UI Enhancements
   Community Service Project 2026 - LBRCE CSE
   ========================================================== */

// 1. Language System
let currentLang = 'en';

// Clean, single-language dropdown options (No mixed text)
const dropdownData = {
  calcSoil: {
    en: [
      { val: 'sandy', text: 'Sandy / Light Loam (High Erosion Risk)' },
      { val: 'red', text: 'Red Loam / Chalka Soil (Moderate Risk)' },
      { val: 'black', text: 'Black Cotton Soil (Moderate-High Swelling)' },
      { val: 'clay', text: 'Clay Loam (Low-Moderate Risk)' }
    ],
    te: [
      { val: 'sandy', text: 'ఇసుక నేల / తేలికపాటి నేల (తీవ్రమైన కోత ప్రమాదం)' },
      { val: 'red', text: 'ఎర్ర నేలలు / చల్కా నేలలు (మధ్యస్థ ప్రమాదం)' },
      { val: 'black', text: 'నల్లరేగడి నేలలు (ఉబ్బు-ముడుచుకునే స్వభావం)' },
      { val: 'clay', text: 'బంకమట్టి నేలలు (తక్కువ-మధ్యస్థ ప్రమాదం)' }
    ]
  },
  calcSlope: {
    en: [
      { val: 'flat', text: 'Flat / Level Ground (< 1% Slope)' },
      { val: 'gentle', text: 'Gentle Slope (1% - 3% Slope)' },
      { val: 'moderate', text: 'Moderate Undulating Slope (3% - 6% Slope)' },
      { val: 'steep', text: 'Steep Hillside Foot (> 6% Slope)' }
    ],
    te: [
      { val: 'flat', text: 'చదునైన భూమి (1% కంటే తక్కువ వాలు)' },
      { val: 'gentle', text: 'స్వల్ప వాలు (1% నుండి 3% వాలు)' },
      { val: 'moderate', text: 'మధ్యస్థ ఏటవాలు (3% నుండి 6% వాలు)' },
      { val: 'steep', text: 'తీవ్ర ఏటవాలు / కొండ పాదం (6% కంటే ఎక్కువ వాలు)' }
    ]
  },
  calcBunding: {
    en: [
      { val: 'strong', text: 'Well-maintained High Vegetative Bunds (> 45 cm)' },
      { val: 'partial', text: 'Low / Partially Eroded Bunds (< 20 cm)' },
      { val: 'none', text: 'No Field Bunds / Broken Boundaries' }
    ],
    te: [
      { val: 'strong', text: 'ఎత్తైన పటిష్టమైన గట్లు (45 సెం.మీ కంటే ఎక్కువ)' },
      { val: 'partial', text: 'పల్చటి / పాక్షికంగా దెబ్బతిన్న గట్లు (20 సెం.మీ కంటే తక్కువ)' },
      { val: 'none', text: 'పొలం గట్లు లేవు / తెగిపోయిన సరిహద్దులు' }
    ]
  },
  calcCover: {
    en: [
      { val: 'full', text: 'Full Cover Crop (Daincha / Sunhemp / Organic Mulch)' },
      { val: 'partial', text: 'Partial Crop Residue / Field Weeds Left' },
      { val: 'bare', text: 'Completely Bare & Ploughed Open Field' }
    ],
    te: [
      { val: 'full', text: 'పూర్తి పచ్చిరొట్ట / మల్చింగ్ ఆచ్ఛాదన (జనుము, జీలుగ)' },
      { val: 'partial', text: 'కొద్దిపాటి పంట వ్యర్థాలు / కలుపు మిగులు' },
      { val: 'bare', text: 'ఏ ఆచ్ఛాదన లేని ఖాళీ నేల (ఎండకు ఎండిన దుక్కి)' }
    ]
  },
  calcOrganic: {
    en: [
      { val: 'high', text: 'Regular Farmyard Manure (FYM) + Jeevamrutham Applied' },
      { val: 'medium', text: 'Occasional FYM Applied Once in 2-3 Years' },
      { val: 'low', text: 'Only Synthetic Chemical Fertilizers (DAP / Urea) Used' }
    ],
    te: [
      { val: 'high', text: 'క్రమం తప్పకుండా పశువుల ఎరువు + జీవామృతం వినియోగం' },
      { val: 'medium', text: 'ఎప్పుడో ఒకసారి పశువుల ఎరువు (2-3 ఏళ్లకు ఒకసారి)' },
      { val: 'low', text: 'కేవలం రసాయన ఎరువులు (డీఏపీ, యూరియా మాత్రమే)' }
    ]
  }
};

function updateDropdownLanguages(lang) {
  for (const [selectId, langData] of Object.entries(dropdownData)) {
    const selectEl = document.getElementById(selectId);
    if (!selectEl) continue;
    const currentVal = selectEl.value;
    const items = langData[lang] || langData['en'];

    selectEl.innerHTML = '';
    items.forEach(item => {
      const opt = document.createElement('option');
      opt.value = item.val;
      opt.textContent = item.text;
      if (item.val === currentVal) {
        opt.selected = true;
      }
      selectEl.appendChild(opt);
    });
  }
}

function setLanguage(lang) {
  currentLang = lang;
  document.body.setAttribute('data-lang', lang);

  // Sync all language toggle buttons
  document.querySelectorAll('#btnLangEn, #calcLangEn').forEach(btn => {
    btn.classList.toggle('active', lang === 'en');
  });
  document.querySelectorAll('#btnLangTe, #calcLangTe').forEach(btn => {
    btn.classList.toggle('active', lang === 'te');
  });

  localStorage.setItem('csp_soil_lang', lang);
  updateDropdownLanguages(lang);
  calculateErosionRisk();
}

// 2. Navbar Scroll State & Mobile Menu
window.addEventListener('DOMContentLoaded', () => {
  const savedLang = localStorage.getItem('csp_soil_lang') || 'en';
  setLanguage(savedLang);

  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      hamburger.classList.toggle('open');
      // Prevent body scroll when menu is open
      document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
    });

    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        hamburger.classList.remove('open');
        document.body.style.overflow = '';
      });
    });

    // Close menu on outside click / escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navLinks.classList.contains('open')) {
        navLinks.classList.remove('open');
        hamburger.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  }

  initParticles();
  calculateErosionRisk();
});

// 3. Floating Particles Generator
function initParticles() {
  const container = document.getElementById('particles');
  if (!container) return;
  const particleCount = 18;

  for (let i = 0; i < particleCount; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    const size = Math.random() * 8 + 4;
    p.style.width = `${size}px`;
    p.style.height = `${size}px`;
    p.style.left = `${Math.random() * 100}%`;
    p.style.top = `${Math.random() * 100}%`;
    p.style.animationDuration = `${Math.random() * 12 + 8}s`;
    p.style.animationDelay = `${Math.random() * 5}s`;
    container.appendChild(p);
  }
}

// 4. Interactive Soil Erosion Risk Calculator (Strict Single-Language Output)
function calculateErosionRisk() {
  const soil = document.getElementById('calcSoil')?.value || 'red';
  const slope = document.getElementById('calcSlope')?.value || 'gentle';
  const bunding = document.getElementById('calcBunding')?.value || 'partial';
  const cover = document.getElementById('calcCover')?.value || 'partial';
  const organic = document.getElementById('calcOrganic')?.value || 'medium';

  // Scoring weights
  let score = 0;
  if (soil === 'sandy') score += 35;
  else if (soil === 'red') score += 25;
  else if (soil === 'black') score += 20;
  else score += 10;

  if (slope === 'flat') score += 5;
  else if (slope === 'gentle') score += 15;
  else if (slope === 'moderate') score += 30;
  else score += 45;

  if (bunding === 'strong') score += 5;
  else if (bunding === 'partial') score += 25;
  else score += 40;

  if (cover === 'full') score += 5;
  else if (cover === 'partial') score += 20;
  else score += 40;

  if (organic === 'high') score += 5;
  else if (organic === 'medium') score += 15;
  else score += 30;

  // Max score is 190. Calculate percentage
  const pct = Math.min(100, Math.round((score / 190) * 100));

  const bar = document.getElementById('calcRiskBar');
  const badge = document.getElementById('calcRiskBadge');
  const text = document.getElementById('calcRiskText');
  const list = document.getElementById('calcRecList');

  if (!bar || !badge || !text || !list) return;

  bar.style.width = `${pct}%`;

  let badgeText = '';
  let descText = '';
  let recHeader = '';
  let recs = [];

  const isTelugu = currentLang === 'te';

  if (pct < 35) {
    bar.style.background = 'var(--clr-green-500)';
    badge.className = 'risk-level-badge risk-low';

    if (isTelugu) {
      badgeText = 'తక్కువ ప్రమాదం — సురక్షిత స్థితి';
      descText = 'చాలా మంచి నేల యాజమాన్యం! మీ పొలంలో పైపొర సారవంతమైన మట్టి కొట్టుకుపోయే ప్రమాదం చాలా తక్కువగా ఉంది.';
      recHeader = 'మీ పొలానికి సూచనలు:';
      recs = [
        'ప్రస్తుత పొలం గట్ల ఎత్తును మరియు గట్లపై ఉన్న సహజ మొక్కలను కాపాడుకోండి.',
        'చంద్రగూడెం రైతు భరోసా కేంద్రం (RBK) లో ప్రతి రెండు సీజన్లకు ఒకసారి మట్టి పరీక్ష చేయించండి.',
        'సేంద్రీయ కర్బనం నిలకడగా ఉండటానికి జీవామృతం లేదా పశువుల ఎరువు వాడకాన్ని కొనసాగించండి.'
      ];
    } else {
      badgeText = 'LOW RISK — GOOD STABILITY';
      descText = 'Excellent soil management! Your field is well-protected against severe topsoil erosion.';
      recHeader = 'Recommendations for Your Field:';
      recs = [
        'Maintain current bund dimensions and vegetative edge covers.',
        'Continue regular soil testing once every two seasons at Chandragudem RBK.',
        'Maintain organic carbon levels by continuing FYM or Jeevamrutham application.'
      ];
    }
  } else if (pct < 65) {
    bar.style.background = '#eab308';
    badge.className = 'risk-level-badge risk-moderate';

    if (isTelugu) {
      badgeText = 'మధ్యస్థ ప్రమాదం — రక్షణ చర్యలు అవసరం';
      descText = 'భారీ వర్షాలు పడినప్పుడు మీ పొలంలో పైపొర మట్టి కొట్టుకుపోయే మరియు చిన్న గండ్లు పడే మధ్యస్థ ప్రమాదం ఉంది.';
      recHeader = 'మీ పొలానికి అత్యవసర రక్షణ చర్యలు:';
      recs = [
        'వాలుకు అడ్డంగా పొలం గట్లను కనీసం 45 సెం.మీ ఎత్తుకు పెంచి పటిష్టం చేయండి.',
        'ఖరీఫ్ సీజన్‌కు ముందు జనుము లేదా జీలుగ పచ్చిరొట్ట విత్తనాలను విత్తి పూత దశలో కలియదున్నండి.',
        'ఎకరాకు 5-8 టన్నుల చివికిన పశువుల ఎరువు వేసి నేల కణాల పట్టుత్వాన్ని పెంచండి.',
        'ఖాళీ నేల ఎండకు, వర్షానికి దెబ్బతినకుండా కంది, పెసర వంటి అంతర పంటలు సాగు చేయండి.'
      ];
    } else {
      badgeText = 'MODERATE RISK — ACTION RECOMMENDED';
      descText = 'Noticeable vulnerability to sheet and rill erosion during heavy monsoon rains.';
      recHeader = 'Priority Actions for Your Field:';
      recs = [
        'Strengthen and raise field bunds to at least 45 cm across slope contours.',
        'Sow green manure (Daincha or Sunhemp) ahead of Kharif and incorporate at flowering.',
        'Apply 5-8 tonnes of well-decomposed FYM or compost per acre to bind loose particles.',
        'Adopt intercropping with pulses (Redgram/Greengram) to shield exposed soil.'
      ];
    }
  } else {
    bar.style.background = 'var(--clr-danger-500)';
    badge.className = 'risk-level-badge risk-high';

    if (isTelugu) {
      badgeText = 'తీవ్రమైన ప్రమాదం — తక్షణ నివారణ అత్యవసరం';
      descText = 'నేల కోత తీవ్రంగా ఉంది! గట్లు సరిగ్గా లేకపోవడం మరియు వాలు వెంట దున్నడం వల్ల సారవంతమైన పైపొర వేగంగా నశిస్తోంది.';
      recHeader = 'మీ పొలానికి తక్షణ అత్యవసర చర్యలు:';
      recs = [
        'వాలుకు అడ్డంగా తక్షణమే కనీసం 45 సెం.మీ ఎత్తు గట్లు మరియు నీటి ఇంకుడు కందకాలు నిర్మించండి.',
        'వాలు దిశలో నిలువుగా దున్నడం వెంటనే ఆపి, వాలుకు సమాంతరంగా (కాంటూర్ పద్ధతిలో) దున్నండి.',
        'పంట వ్యర్థాలను ఎట్టిపరిస్థితుల్లో కాల్చవద్దు; మట్టిపై ఆచ్ఛాదన (మల్చింగ్) చేసి తేమను రక్షించండి.',
        'ప్రతి 15 రోజులకు 200 లీటర్ల జీవామృతం ఇవ్వండి మరియు గట్ల వెంట వేప, సుబాబుల్ నాటండి.',
        'బిందు సేద్యం (డ్రిప్) 90% సబ్సిడీ కోసం చంద్రగూడెం RBK లేదా హార్టికల్చర్ అధికారిని సంప్రదించండి.'
      ];
    } else {
      badgeText = 'HIGH RISK — URGENT ACTION NEEDED';
      descText = 'Critical topsoil loss detected! Plowing vertically and lack of bunds cause severe gully and sheet erosion.';
      recHeader = 'Immediate Urgent Actions for Your Field:';
      recs = [
        'Construct contour bunds (min 45 cm height) and percolation trenches across slopes.',
        'Stop deep plowing down the slope—switch strictly to cross-slope contour plowing.',
        'Do not burn stubble; mulch open soil with crop stalks and straw to shield against rain.',
        'Apply 200L Jeevamrutham every 15 days and plant Subabul/Neem along farm boundaries.',
        'Approach Chandragudem RBK or Horticulture Department for APMIP 90% drip irrigation subsidy.'
      ];
    }
  }

  badge.textContent = badgeText;
  text.innerHTML = `<div style="font-size: 1.02rem; font-weight: 500; color: var(--clr-soil-900); line-height: 1.5;">${descText}</div>`;

  const itemsHtml = recs.map(r => `
    <li style="margin-bottom: 0.65rem; padding-left: 1.4rem; position: relative; font-size: 0.95rem; line-height: 1.45; color: #1a120b;">
      <span style="position: absolute; left: 0; color: #16a34a; font-weight: bold;">✓</span>
      ${r}
    </li>
  `).join('');

  list.innerHTML = `<strong style="display:block; font-size:1.05rem; color:#134e24; margin-bottom:0.75rem;">${recHeader}</strong><ul>${itemsHtml}</ul>`;
}
