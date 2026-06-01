const QUICK_ACTIONS = {
  en: [
    { id: 'eligibility', label: 'Check eligibility' },
    { id: 'browse', label: 'Browse schemes' },
    { id: 'scholarship', label: 'Scholarships' },
    { id: 'farmer', label: 'Farmer schemes' },
    { id: 'health', label: 'Health schemes' },
    { id: 'saved', label: 'Saved schemes' },
  ],
  hi: [
    { id: 'eligibility', label: 'पात्रता जाँचें' },
    { id: 'browse', label: 'योजनाएँ देखें' },
    { id: 'scholarship', label: 'छात्रवृत्ति' },
    { id: 'farmer', label: 'किसान योजनाएँ' },
    { id: 'health', label: 'स्वास्थ्य योजनाएँ' },
    { id: 'saved', label: 'सहेजी योजनाएँ' },
  ],
};

const WELCOME = {
  en: `Namaste! I'm **Sahayak**, your SarkariSahay assistant. I can help you check eligibility, find schemes, and navigate the app. Pick a quick option below or type your question.`,
  hi: `नमस्ते! मैं **सहायक** हूँ — आपका SarkariSahay सहायक। पात्रता जाँच, योजनाएँ खोजने और ऐप में मार्गदर्शन में मदद कर सकता हूँ। नीचे विकल्प चुनें या अपना प्रश्न लिखें।`,
};

const STATIC_REPLIES = {
  eligibility: {
    en: `To check which schemes you qualify for:\n\n1. Go to **Home** and scroll to "Check your eligibility"\n2. Fill in state, age, income, category, gender, occupation & disability\n3. Submit — you'll see matched schemes instantly\n\nNo login required. Your data is not stored on our servers.`,
    hi: `पात्र योजनाएँ जानने के लिए:\n\n1. **होम** पर "Check your eligibility" भरें\n2. राज्य, आयु, आय, श्रेणी, लिंग, व्यवसाय व विकलांगता भरें\n3. सबमिट करें — तुरंत मिलती योजनाएँ दिखेंगी\n\nलॉगिन ज़रूरी नहीं। आपका डेटा सर्वर पर सहेजा नहीं जाता।`,
    link: { label: { en: 'Start eligibility check', hi: 'पात्रता जाँच शुरू करें' }, to: '/#check' },
  },
  browse: {
    en: `Browse **120+ central & state schemes** on the Browse page. Filter by category, level (central/state), state, or search by name.\n\nPopular categories: Agriculture, Education, Health, Housing, Employment.`,
    hi: `**120+ केंद्रीय व राज्य योजनाएँ** Browse पेज पर देखें। श्रेणी, स्तर (केंद्र/राज्य), राज्य या नाम से खोजें।`,
    link: { label: { en: 'Open Browse', hi: 'Browse खोलें' }, to: '/browse' },
  },
  saved: {
    en: `Tap the **bookmark** icon on any scheme card to save it. Saved schemes appear on the Saved page — stored only in your browser.`,
    hi: `किसी भी योजना कार्ड पर **बुकमार्क** दबाएँ। सहेजी योजनाएँ Saved पेज पर — केवल आपके ब्राउज़र में।`,
    link: { label: { en: 'View saved', hi: 'सहेजी योजनाएँ' }, to: '/saved' },
  },
  scholarship: {
    en: `Scholarship schemes include NSP (National Scholarship Portal) programs for SC/ST/OBC/minority students. Use Browse → filter **Education**, or run an eligibility check if you're a student.`,
    hi: `छात्रवृत्ति में NSP जैसी योजनाएँ शामिल हैं। Browse → **Education** फ़िल्टर करें, या छात्र होने पर पात्रता जाँच करें।`,
    link: { label: { en: 'Education schemes', hi: 'शिक्षा योजनाएँ' }, to: '/browse?category=education' },
    search: 'scholarship',
  },
  farmer: {
    en: `Farmer-focused schemes include **PM-KISAN**, crop insurance, KCC, and state agriculture programs. Select occupation "Farmer" in the eligibility form for best matches.`,
    hi: `किसान योजनाओं में **PM-KISAN**, फसल बीमा, KCC शामिल हैं। पात्रता फ़ॉर्म में व्यवसाय "Farmer" चुनें।`,
    link: { label: { en: 'Agriculture schemes', hi: 'कृषि योजनाएँ' }, to: '/browse?category=agriculture' },
    search: 'kisan',
  },
  health: {
    en: `Health schemes include **PM-JAY (Ayushman Bharat)** for hospital cover, plus state health programs. Filter Browse by **Health** or search "Ayushman".`,
    hi: `स्वास्थ्य में **PM-JAY (आयुष्मान)** और राज्य स्वास्थ्य योजनाएँ। Browse → **Health** या "Ayushman" खोजें।`,
    link: { label: { en: 'Health schemes', hi: 'स्वास्थ्य योजनाएँ' }, to: '/browse?category=health' },
    search: 'ayushman',
  },
  apply: {
    en: `SarkariSahay does **not** process applications. Each scheme card has an **official apply link** — always verify documents and eligibility on the government portal before applying.`,
    hi: `SarkariSahay आवेदन **स्वीकार नहीं** करता। हर योजना पर **आधिकारिक लिंक** है — आवेदन से पहले सरकारी पोर्टल पर जाँच लें।`,
  },
  privacy: {
    en: `Your eligibility profile is used only for matching in your browser session. We don't require login and don't store personal data on our servers. Saved schemes use browser local storage.`,
    hi: `पात्रता डेटा केवल मिलान के लिए उपयोग होता है। लॉगिन नहीं चाहिए; व्यक्तिगत डेटा सर्वर पर नहीं सहेजा जाता।`,
  },
  central: {
    en: `**Central schemes** apply across India (e.g. PM-KISAN, PM-JAY, MGNREGA). **State schemes** are specific to your selected state. Both appear in eligibility results.`,
    hi: `**केंद्रीय योजनाएँ** पूरे भारत में (PM-KISAN, PM-JAY)। **राज्य योजनाएँ** आपके राज्य की। दोनों पात्रता परिणाम में।`,
  },
  documents: {
    en: `Common documents: Aadhaar, income certificate, caste certificate, bank passbook, land records (for farmers), disability certificate if applicable. Exact list varies — check the official portal on each scheme page.`,
    hi: `सामान्य दस्तावेज़: आधार, आय/जाति प्रमाण, बैंक पासबुक, ज़मीन रिकॉर्ड (किसान), विकलांगता प्रमाण। विवरण योजना के आधिकारिक पोर्टल पर देखें।`,
  },
  greeting: {
    en: `Hello! I'm Sahayak, here to guide you through SarkariSahay. Ask about eligibility, scholarships, farmer or health schemes, or how to apply. Use the quick buttons below to get started.`,
    hi: `नमस्ते! मैं सहायक हूँ — SarkariSahay में आपकी मदद के लिए। पात्रता, छात्रवृत्ति, किसान/स्वास्थ्य योजनाएँ या आवेदन के बारे में पूछें।`,
  },
  default: {
    en: `I'm not sure I understood. Try asking about:\n• Eligibility check\n• Scholarships, farmers, health\n• How to apply\n• Central vs state schemes\n\nOr pick a quick option below.`,
    hi: `मुझे समझ नहीं आया। पूछें:\n• पात्रता जाँच\n• छात्रवृत्ति, किसान, स्वास्थ्य\n• आवेदन कैसे करें\n\nया नीचे विकल्प चुनें।`,
  },
};

const INTENT_PATTERNS = [
  { intent: 'eligibility', patterns: [/eligib|qualif|check.*scheme|पात्र|योग्य|जाँच|जांच/i] },
  { intent: 'browse', patterns: [/browse|list.*scheme|all scheme|कितनी योजना|योजनाएँ देख|browse/i] },
  { intent: 'saved', patterns: [/save|bookmark|favourite|favorite|सहेज|बुकमार्क/i] },
  { intent: 'scholarship', patterns: [/scholar|education|student|छात्र|शिक्षा|स्कॉलर/i] },
  { intent: 'farmer', patterns: [/farm|kisan|agri|किसान|खेती|pm-kisan/i] },
  { intent: 'health', patterns: [/health|ayushman|hospital|medical|स्वास्थ्य|आयुष्मान|इलाज/i] },
  { intent: 'apply', patterns: [/apply|application|document|आवेदन|दस्तावेज|कैसे apply/i] },
  { intent: 'privacy', patterns: [/privacy|data|store|login|account|गोपनीय|डेटा|लॉगिन/i] },
  { intent: 'central', patterns: [/central|state scheme|केंद्र|राज्य योजना/i] },
  { intent: 'documents', patterns: [/document|paper|certificate|प्रमाण|कागज/i] },
  { intent: 'greeting', patterns: [/^(hi|hello|hey|namaste|help|start)\b|नमस्ते|मदद कर|सहायता चाहिए/i] },
];

function detectIntent(text) {
  const lower = text.toLowerCase().trim();
  for (const { intent, patterns } of INTENT_PATTERNS) {
    if (patterns.some((p) => p.test(lower))) return intent;
  }
  return null;
}

function formatSchemeList(schemes, lang) {
  if (!schemes.length) {
    return lang === 'hi'
      ? 'कोई योजना नहीं मिली। Browse में खोजें या पात्रता जाँच करें।'
      : 'No schemes found. Try Browse or run an eligibility check.';
  }
  const lines = schemes.slice(0, 5).map((s) => {
    const level = s.level === 'central' ? (lang === 'hi' ? 'केंद्र' : 'Central') : (lang === 'hi' ? 'राज्य' : 'State');
    return `• **${s.name}** (${level})`;
  });
  const more =
    schemes.length > 5
      ? lang === 'hi'
        ? `\n…और ${schemes.length - 5} योजनाएँ Browse में।`
        : `\n…and ${schemes.length - 5} more on Browse.`
      : '';
  return lines.join('\n') + more;
}

export async function searchSchemes(query) {
  try {
    const res = await fetch(`/api/schemes?search=${encodeURIComponent(query)}`);
    const json = await res.json();
    if (!res.ok) return [];
    return json.data || [];
  } catch {
    return [];
  }
}

function buildReply(intent, lang) {
  const block = STATIC_REPLIES[intent] || STATIC_REPLIES.default;
  const text = block[lang] || block.en;
  const link = block.link
    ? { label: block.link.label[lang] || block.link.label.en, to: block.link.to }
    : null;
  return { text, link, searchQuery: block.search };
}

export function getWelcomeMessage(lang) {
  return { text: WELCOME[lang], quickActions: QUICK_ACTIONS[lang] };
}

export function getQuickActions(lang) {
  return QUICK_ACTIONS[lang];
}

export async function getChatReply(input, lang, actionId = null) {
  const intent = actionId || detectIntent(input);

  if (!actionId && !detectIntent(input) && input.trim().length > 2) {
    const schemes = await searchSchemes(input.trim());
    if (schemes.length > 0) {
      const header =
        lang === 'hi'
          ? `मुझे ये योजनाएँ मिलीं:\n\n`
          : `I found these schemes:\n\n`;
      return {
        text: header + formatSchemeList(schemes, lang),
        link: {
          label: lang === 'hi' ? 'सभी परिणाम Browse में' : 'See all on Browse',
          to: `/browse?search=${encodeURIComponent(input.trim())}`,
        },
        quickActions: QUICK_ACTIONS[lang],
      };
    }
  }

  const replyKey =
    intent && STATIC_REPLIES[intent] ? intent : 'default';
  const { text, link, searchQuery } = buildReply(replyKey, lang);

  let schemeBlock = '';
  let extraLink = link;

  if (searchQuery) {
    const schemes = await searchSchemes(searchQuery);
    if (schemes.length) {
      schemeBlock =
        '\n\n' +
        (lang === 'hi' ? '**उदाहरण योजनाएँ:**\n' : '**Example schemes:**\n') +
        formatSchemeList(schemes, lang);
      if (!extraLink) {
        extraLink = {
          label: lang === 'hi' ? 'और देखें' : 'View more',
          to: `/browse?search=${encodeURIComponent(searchQuery)}`,
        };
      }
    }
  }

  return {
    text: text + schemeBlock,
    link: extraLink,
    quickActions: QUICK_ACTIONS[lang],
  };
}
