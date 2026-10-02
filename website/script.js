/* ==========================================================
   SOIL EROSION AWARENESS & EFFECTIVE MANAGEMENT
   Interactive Bilingual Engine & UI Enhancements
   Community Service Project 2026 - LBRCE CSE
   ========================================================== */

// 1. Language System
var currentLang = 'en';

// Clean, single-language dropdown options (No mixed text)
var dropdownData = {
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

// 2. Points table: higher points = higher erosion risk
var points = {
  calcSoil: { sandy: 35, red: 25, black: 20, clay: 10 },
  calcSlope: { flat: 5, gentle: 15, moderate: 30, steep: 45 },
  calcBunding: { strong: 5, partial: 25, none: 40 },
  calcCover: { full: 5, partial: 20, bare: 40 },
  calcOrganic: { high: 5, medium: 15, low: 30 }
};
var MAX_SCORE = 190; // 35 + 45 + 40 + 40 + 30

// 3. Result messages for each risk level
var results = {
  low: {
    css: 'risk-low',
    color: 'var(--clr-green-500)',
    en: {
      badge: 'LOW RISK — GOOD STABILITY',
      desc: 'Excellent soil management! Your field is well-protected against severe topsoil erosion.',
      title: 'Recommendations for Your Field:',
      tips: [
        'Maintain current bund dimensions and vegetative edge covers.',
        'Continue regular soil testing once every two seasons at Chandragudem RSK.',
        'Maintain organic carbon levels by continuing FYM or Jeevamrutham application.'
      ]
    },
    te: {
      badge: 'తక్కువ ప్రమాదం — సురక్షిత స్థితి',
      desc: 'చాలా మంచి నేల యాజమాన్యం! మీ పొలంలో పైపొర సారవంతమైన మట్టి కొట్టుకుపోయే ప్రమాదం చాలా తక్కువగా ఉంది.',
      title: 'మీ పొలానికి సూచనలు:',
      tips: [
        'ప్రస్తుత పొలం గట్ల ఎత్తును మరియు గట్లపై ఉన్న సహజ మొక్కలను కాపాడుకోండి.',
        'చంద్రగూడెం రైతు సేవా కేంద్రం (RSK) లో ప్రతి రెండు సీజన్లకు ఒకసారి మట్టి పరీక్ష చేయించండి.',
        'సేంద్రీయ కర్బనం నిలకడగా ఉండటానికి జీవామృతం లేదా పశువుల ఎరువు వాడకాన్ని కొనసాగించండి.'
      ]
    }
  },
  moderate: {
    css: 'risk-moderate',
    color: '#eab308',
    en: {
      badge: 'MODERATE RISK — ACTION RECOMMENDED',
      desc: 'Noticeable vulnerability to sheet and rill erosion during heavy monsoon rains.',
      title: 'Priority Actions for Your Field:',
      tips: [
        'Strengthen and raise field bunds to at least 45 cm across slope contours.',
        'Sow green manure (Daincha or Sunhemp) ahead of Kharif and incorporate at flowering.',
        'Apply 5–8 tonnes of well-decomposed FYM or compost per acre to bind loose particles.',
        'Adopt intercropping with pulses (Redgram/Greengram) to shield exposed soil.'
      ]
    },
    te: {
      badge: 'మధ్యస్థ ప్రమాదం — రక్షణ చర్యలు అవసరం',
      desc: 'భారీ వర్షాలు పడినప్పుడు మీ పొలంలో పైపొర మట్టి కొట్టుకుపోయే మరియు చిన్న గండ్లు పడే మధ్యస్థ ప్రమాదం ఉంది.',
      title: 'మీ పొలానికి అత్యవసర రక్షణ చర్యలు:',
      tips: [
        'వాలుకు అడ్డంగా పొలం గట్లను కనీసం 45 సెం.మీ ఎత్తుకు పెంచి పటిష్టం చేయండి.',
        'ఖరీఫ్ సీజన్‌కు ముందు జనుము లేదా జీలుగ పచ్చిరొట్ట విత్తనాలను విత్తి పూత దశలో కలియదున్నండి.',
        'ఎకరాకు 5–8 టన్నుల చివికిన పశువుల ఎరువు వేసి నేల కణాల పట్టుత్వాన్ని పెంచండి.',
        'ఖాళీ నేల ఎండకు, వర్షానికి దెబ్బతినకుండా కంది, పెసర వంటి అంతర పంటలు సాగు చేయండి.'
      ]
    }
  },
  high: {
    css: 'risk-high',
    color: 'var(--clr-danger-500)',
    en: {
      badge: 'HIGH RISK — URGENT ACTION NEEDED',
      desc: 'High chance of serious topsoil loss. Ploughing down the slope and missing bunds cause sheet and gully erosion.',
      title: 'Immediate Actions for Your Field:',
      tips: [
        'Build contour bunds (min 45 cm height) and percolation trenches across the slope.',
        'Stop ploughing down the slope; plough across it (contour ploughing).',
        'Do not burn stubble; use it as mulch on open soil.',
        'Apply Jeevamrutham (once or twice a month) and plant trees along the boundary.',
        'Ask Chandragudem RSK or the Horticulture Department about drip irrigation subsidy (up to 100% for SC/ST).'
      ]
    },
    te: {
      badge: 'తీవ్రమైన ప్రమాదం — తక్షణ నివారణ అత్యవసరం',
      desc: 'నేల కోత తీవ్రంగా ఉంది! గట్లు సరిగ్గా లేకపోవడం మరియు వాలు వెంట దున్నడం వల్ల సారవంతమైన పైపొర వేగంగా నశిస్తోంది.',
      title: 'మీ పొలానికి తక్షణ అత్యవసర చర్యలు:',
      tips: [
        'వాలుకు అడ్డంగా తక్షణమే కనీసం 45 సెం.మీ ఎత్తు గట్లు మరియు నీటి ఇంకుడు కందకాలు నిర్మించండి.',
        'వాలు దిశలో నిలువుగా దున్నడం వెంటనే ఆపి, వాలుకు సమాంతరంగా (కాంటూర్ పద్ధతిలో) దున్నండి.',
        'పంట వ్యర్థాలను ఎట్టిపరిస్థితుల్లో కాల్చవద్దు; మట్టిపై ఆచ్ఛాదన (మల్చింగ్) చేసి తేమను రక్షించండి.',
        'నెలకు ఒకటి లేదా రెండుసార్లు 200 లీటర్ల జీవామృతం ఇవ్వండి మరియు గట్ల వెంట వేప, సుబాబుల్ నాటండి.',
        'బిందు సేద్యం (డ్రిప్) సబ్సిడీ (SC/ST కు 100% వరకు) కోసం చంద్రగూడెం RSK లేదా హార్టికల్చర్ అధికారిని సంప్రదించండి.'
      ]
    }
  }
};

// 4. Fill dropdown menus with current language text
function fillDropdowns() {
  var selectId;
  for (selectId in dropdownData) {
    var select = document.getElementById(selectId);
    if (!select) continue;

    var oldValue = select.value;
    var items = dropdownData[selectId][currentLang];

    // Clear old options
    select.innerHTML = '';

    // Add new options
    for (var i = 0; i < items.length; i++) {
      var option = document.createElement('option');
      option.value = items[i].val;
      option.textContent = items[i].text;
      select.appendChild(option);
    }

    // Restore previous selection if possible
    if (oldValue) {
      select.value = oldValue;
    }
  }
}

// 5. Set active language
function setLanguage(lang) {
  currentLang = lang;
  document.body.setAttribute('data-lang', lang);

  // Highlight the active language button (navbar + calculator)
  var btnEn = document.getElementById('btnLangEn');
  var btnTe = document.getElementById('btnLangTe');
  var calcEn = document.getElementById('calcLangEn');
  var calcTe = document.getElementById('calcLangTe');

  if (btnEn) {
    if (lang === 'en') { btnEn.classList.add('active'); }
    else { btnEn.classList.remove('active'); }
  }
  if (btnTe) {
    if (lang === 'te') { btnTe.classList.add('active'); }
    else { btnTe.classList.remove('active'); }
  }
  if (calcEn) {
    if (lang === 'en') { calcEn.classList.add('active'); }
    else { calcEn.classList.remove('active'); }
  }
  if (calcTe) {
    if (lang === 'te') { calcTe.classList.add('active'); }
    else { calcTe.classList.remove('active'); }
  }

  localStorage.setItem('csp_soil_lang', lang);
  fillDropdowns();
  calculateErosionRisk();
}

// 6. Get risk level from percentage
function getLevel(percent) {
  if (percent < 35) {
    return 'low';
  } else if (percent < 65) {
    return 'moderate';
  } else {
    return 'high';
  }
}

// 7. Risk Calculator - core logic
function calculateErosionRisk() {
  // Get selected values with safe fallbacks
  var soilSelect = document.getElementById('calcSoil');
  var slopeSelect = document.getElementById('calcSlope');
  var bundingSelect = document.getElementById('calcBunding');
  var coverSelect = document.getElementById('calcCover');
  var organicSelect = document.getElementById('calcOrganic');

  var soil = soilSelect ? soilSelect.value : 'red';
  var slope = slopeSelect ? slopeSelect.value : 'gentle';
  var bunding = bundingSelect ? bundingSelect.value : 'partial';
  var cover = coverSelect ? coverSelect.value : 'partial';
  var organic = organicSelect ? organicSelect.value : 'medium';

  // Add up the points of every selected answer
  var score = 0;
  score = score + (points.calcSoil[soil] || 0);
  score = score + (points.calcSlope[slope] || 0);
  score = score + (points.calcBunding[bunding] || 0);
  score = score + (points.calcCover[cover] || 0);
  score = score + (points.calcOrganic[organic] || 0);

  var percent = Math.round((score / MAX_SCORE) * 100);
  if (percent > 100) { percent = 100; }

  // Pick the message for this risk level and language
  var level = results[getLevel(percent)];
  var text = level[currentLang];

  // Update the progress bar
  var bar = document.getElementById('calcRiskBar');
  if (!bar) return;
  bar.style.width = percent + '%';
  bar.style.background = level.color;

  // Update the badge
  var badge = document.getElementById('calcRiskBadge');
  if (badge) {
    badge.className = 'risk-level-badge ' + level.css;
    badge.textContent = text.badge;
  }

  // Update the description text
  var riskText = document.getElementById('calcRiskText');
  if (riskText) {
    riskText.innerHTML = '<div style="font-size:1.02rem; font-weight:500; color:var(--clr-soil-900); line-height:1.5;">' + text.desc + '</div>';
  }

  // Build the recommendations list
  var tipsHtml = '';
  for (var i = 0; i < text.tips.length; i++) {
    tipsHtml = tipsHtml + '<li style="margin-bottom:0.65rem; padding-left:1.4rem; position:relative; font-size:0.95rem; line-height:1.45; color:#1a120b;">';
    tipsHtml = tipsHtml + '<span style="position:absolute; left:0; color:#16a34a; font-weight:bold;">✓</span>';
    tipsHtml = tipsHtml + text.tips[i];
    tipsHtml = tipsHtml + '</li>';
  }

  var recList = document.getElementById('calcRecList');
  if (recList) {
    recList.innerHTML = '<strong style="display:block; font-size:1.05rem; color:#134e24; margin-bottom:0.75rem;">' + text.title + '</strong><ul>' + tipsHtml + '</ul>';
  }
}

// 8. Mobile menu toggle
function toggleMenu(open) {
  var navLinks = document.getElementById('navLinks');
  var hamburger = document.getElementById('hamburger');

  if (!navLinks || !hamburger) return;

  if (open) {
    navLinks.classList.add('open');
    hamburger.classList.add('open');
    document.body.style.overflow = 'hidden';
  } else {
    navLinks.classList.remove('open');
    hamburger.classList.remove('open');
    document.body.style.overflow = '';
  }
}

// 9. Create floating particles in the hero section
function makeParticles() {
  var box = document.getElementById('particles');
  if (!box) return;

  for (var i = 0; i < 18; i++) {
    var dot = document.createElement('div');
    var size = Math.random() * 8 + 4;

    dot.className = 'particle';
    dot.style.width = size + 'px';
    dot.style.height = size + 'px';
    dot.style.left = Math.random() * 100 + '%';
    dot.style.top = Math.random() * 100 + '%';
    dot.style.animationDuration = Math.random() * 12 + 8 + 's';
    dot.style.animationDelay = Math.random() * 5 + 's';

    box.appendChild(dot);
  }
}

// 10. Initialize everything when page loads
window.addEventListener('DOMContentLoaded', function () {
  // Set saved language or default to English
  var savedLang = localStorage.getItem('csp_soil_lang');
  if (!savedLang) { savedLang = 'en'; }
  setLanguage(savedLang);

  // Create particles
  makeParticles();

  // Add shadow under navbar after scrolling
  var navbar = document.getElementById('navbar');
  window.addEventListener('scroll', function () {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // Mobile menu: open/close with hamburger button
  var hamburger = document.getElementById('hamburger');
  if (hamburger) {
    hamburger.addEventListener('click', function () {
      var isOpen = hamburger.classList.contains('open');
      toggleMenu(!isOpen);
    });
  }

  // Close menu when a nav link is clicked
  var navLinkElements = document.querySelectorAll('#navLinks a');
  for (var i = 0; i < navLinkElements.length; i++) {
    navLinkElements[i].addEventListener('click', function () {
      toggleMenu(false);
    });
  }

  // Close menu on Escape key
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      toggleMenu(false);
    }
  });
});

