// Initialize Lucide icons on page load
document.addEventListener('DOMContentLoaded', () => {
  if (window.lucide) {
    lucide.createIcons();
  }
  // Initialize default bouquet
  initDefaultBouquet();
});

// Smooth scroll utility
function scrollToSection(id) {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' });
  }
}

// Preset Scenario Data
const presets = {
  anniversary: {
    relationship: 'partner',
    tone: 'deep',
    severity: 'critical',
    situation: "I completely forgot our 2nd anniversary dinner. She spent hours making reservations and getting dressed up. I got caught up with work and didn't check my calendar until 10 PM. She is deeply hurt and thinks I take her for granted.",
    promise: "I booked that weekend getaway cabin she's been dreaming of, and I put all our anniversaries in every calendar with alarms."
  },
  argument: {
    relationship: 'partner',
    tone: 'deep',
    severity: 'medium',
    situation: "We were arguing about stress and chores, and I lost my temper and raised my voice. I said things that were defensive and unkind, which I never should have said.",
    promise: "I promise to pause, take a breath, and listen without getting defensive when we disagree."
  },
  late: {
    relationship: 'friend',
    tone: 'sweet',
    severity: 'light',
    situation: "I cancelled our dinner plans 30 minutes before we were supposed to meet because I was overwhelmed and exhausted. I know she was already ready and waiting.",
    promise: "Next dinner is completely on me, anywhere she wants, and I will be there 15 minutes early."
  },
  distance: {
    relationship: 'partner',
    tone: 'sweet',
    severity: 'medium',
    situation: "Over the last few weeks I've been emotionally distant, buried in my phone and work. I haven't been asking about her day or giving her the affection she deserves.",
    promise: "A dedicated no-phone date night this Friday and full presence whenever we are together."
  },
  unreplied: {
    relationship: 'crush',
    tone: 'playful',
    severity: 'light',
    situation: "I accidentally left her message on read for two whole days after opening it while walking into a meeting. She probably thinks I'm ignoring her.",
    promise: "I owe you your favorite iced latte and my undivided attention."
  }
};

// Set Preset
function setPreset(key) {
  const data = presets[key];
  if (!data) return;

  // Set relationship
  const relRadio = document.querySelector(`input[name="relationship"][value="${data.relationship}"]`);
  if (relRadio) relRadio.checked = true;

  // Set fields
  document.getElementById('situationText').value = data.situation;
  document.getElementById('toneSelect').value = data.tone;
  document.getElementById('severitySelect').value = data.severity;
  document.getElementById('promiseText').value = data.promise;

  // Visual highlight
  const sitBox = document.getElementById('situationText');
  sitBox.classList.add('ring-2', 'ring-rose-400');
  setTimeout(() => sitBox.classList.remove('ring-2', 'ring-rose-400'), 800);
}

// Tone hints update
function updateToneHints() {
  const selectedRel = document.querySelector('input[name="relationship"]:checked')?.value || 'partner';
  const toneSelect = document.getElementById('toneSelect');
  if (selectedRel === 'colleague') {
    toneSelect.value = 'formal';
  } else if (selectedRel === 'partner') {
    toneSelect.value = 'deep';
  }
}

// Stored current generated variations
let currentVariations = [];
let currentVarIndex = 0;

// High-EQ Apology Generator Engine
function handleGenerateApology(e) {
  e.preventDefault();

  const recipient = document.getElementById('recipientName').value.trim() || 'You';
  const sender = document.getElementById('senderName').value.trim() || 'Me';
  const situation = document.getElementById('situationText').value.trim();
  const tone = document.getElementById('toneSelect').value;
  const severity = document.getElementById('severitySelect').value;
  const promise = document.getElementById('promiseText').value.trim();
  const relationship = document.querySelector('input[name="relationship"]:checked')?.value || 'partner';

  // Toggle UI to loading state
  document.getElementById('outputPlaceholder').classList.add('hidden');
  document.getElementById('outputContent').classList.add('hidden');
  document.getElementById('outputLoading').classList.remove('hidden');

  setTimeout(() => {
    // Generate 3 bespoke variations based on inputs
    currentVariations = generateVariations({
      recipient,
      sender,
      situation,
      tone,
      severity,
      promise,
      relationship
    });

    currentVarIndex = 0;
    renderCurrentVariation();

    // Toggle UI to result state
    document.getElementById('outputLoading').classList.add('hidden');
    document.getElementById('outputContent').classList.remove('hidden');

    // Trigger celebration confetti
    if (window.confetti) {
      confetti({
        particleCount: 25,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#f43f5e', '#fda4af', '#fecdd3']
      });
    }

    // Refresh icons
    if (window.lucide) lucide.createIcons();
  }, 750);
}

// Variations Generation Logic
function generateVariations(ctx) {
  const { recipient, sender, situation, promise, tone } = ctx;

  const promiseSentence = promise 
    ? `\n\nI want to make this up to you: ${promise}. You deserve nothing less.` 
    : "\n\nPlease let me know what you need from me right now to start making this right.";

  // 1. The Deep Cut (Radical accountability, validation of pain)
  const deepCut = `Dear ${recipient},

I've been thinking non-stop about what happened, and I need to tell you how deeply sorry I am. 

Looking back at the situation—${situation}—there are zero excuses for how I acted. What hurts me the most is knowing that my carelessness hurt you. You trusted me, and I let you down.

Your feelings are 100% valid. I am not asking you to simply brush this off, but I promise you with all my heart that I am taking this seriously and learning from it.${promiseSentence}

All my love,
${sender}`;

  // 2. Sweet & Reassuring (Tender, romantic, affirming bond)
  const sweetReassuring = `Hey ${recipient},

I hate that there is distance between us right now, especially because it's completely my fault. 

About ${situation}—I was so wrong. You are the most important person in my world, and making you feel uncared for or overlooked breaks my heart. 

I never want to take your smile or your kindness for granted.${promiseSentence}

I love you more than words,
${sender} ❤️`;

  // 3. Quick Text Message (Concise, authentic, no pressure)
  const quickText = `Hey ${recipient}, I'm reaching out because I feel terrible about earlier. Regarding ${situation}—that was entirely on me and I messed up. No excuses. I'm really sorry for hurting you.${promise ? ` ${promise}` : ''} I'm here whenever you're ready to talk.`;

  return [deepCut, sweetReassuring, quickText];
}

// Switch between the 3 variations
function switchVariation(index) {
  currentVarIndex = index;
  renderCurrentVariation();
}

function renderCurrentVariation() {
  const msgEl = document.getElementById('generatedMessageText');
  if (!msgEl || !currentVariations.length) return;

  msgEl.innerText = currentVariations[currentVarIndex];

  // Update tab highlights
  [0, 1, 2].forEach(i => {
    const tab = document.getElementById(`tab-${i}`);
    if (tab) {
      if (i === currentVarIndex) {
        tab.className = 'tab-btn px-3 py-1.5 rounded-xl text-xs font-semibold bg-rose-600 text-white shadow-sm';
      } else {
        tab.className = 'tab-btn px-3 py-1.5 rounded-xl text-xs font-semibold bg-rose-50 text-rose-800 hover:bg-rose-100';
      }
    }
  });

  // Reset copy button label
  const copyBtnText = document.getElementById('copyBtnText');
  if (copyBtnText) copyBtnText.innerText = 'Copy to Clipboard';
}

// Copy to Clipboard
function copyApologyText() {
  const text = currentVariations[currentVarIndex] || document.getElementById('generatedMessageText').innerText;
  navigator.clipboard.writeText(text).then(() => {
    const copyBtnText = document.getElementById('copyBtnText');
    if (copyBtnText) copyBtnText.innerText = 'Copied to Clipboard! ✓';
    setTimeout(() => {
      if (copyBtnText) copyBtnText.innerText = 'Copy to Clipboard';
    }, 2500);
  });
}

// Share directly to WhatsApp
function shareWhatsApp() {
  const text = currentVariations[currentVarIndex] || document.getElementById('generatedMessageText').innerText;
  const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
  window.open(url, '_blank');
}

// Send Message into Card Builder
function populateCardWithMessage() {
  const text = currentVariations[currentVarIndex] || document.getElementById('generatedMessageText').innerText;
  const recipient = document.getElementById('recipientName').value.trim() || 'My Favorite Person';
  const sender = document.getElementById('senderName').value.trim() || 'Me';

  document.getElementById('cardCoverInput').value = `To ${recipient}, with all my heart...`;
  document.getElementById('cardInsideInput').value = text;
  
  updateCardLive();
  scrollToSection('card-builder');

  // Flash highlight on the 3D card
  const card = document.getElementById('threeDCard');
  card.classList.add('ring-4', 'ring-rose-400/50');
  setTimeout(() => card.classList.remove('ring-4', 'ring-rose-400/50'), 1500);
}

// --- 3D CARD INTERACTION LOGIC ---
let isCardFlipped = false;

function toggleCardFlip() {
  const card = document.getElementById('threeDCard');
  isCardFlipped = !isCardFlipped;
  if (isCardFlipped) {
    card.classList.add('flipped');
  } else {
    card.classList.remove('flipped');
  }
}

function updateCardLive() {
  const coverText = document.getElementById('cardCoverInput').value;
  const insideText = document.getElementById('cardInsideInput').value;
  const sender = document.getElementById('senderName').value.trim() || 'Leo';

  document.getElementById('cardFrontTitle').innerText = coverText;
  document.getElementById('cardInsideText').innerText = insideText;
  document.getElementById('cardSignature').innerText = sender;
}

// Themes
function setCardTheme(theme) {
  const front = document.getElementById('cardFront');
  const inside = document.getElementById('cardInside');

  if (theme === 'blush') {
    front.className = 'card-face card-front bg-gradient-to-br from-rose-100 via-rose-50 to-pink-100 border-2 border-rose-200/80 rounded-2xl p-8 flex flex-col justify-between shadow-2xl relative overflow-hidden';
    inside.className = 'card-face card-back bg-[#FAF6F0] border-2 border-amber-200/80 rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-2xl relative overflow-hidden';
  } else if (theme === 'velvet') {
    front.className = 'card-face card-front bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 border-2 border-amber-300/40 rounded-2xl p-8 flex flex-col justify-between shadow-2xl relative overflow-hidden text-white';
    inside.className = 'card-face card-back bg-slate-900 border-2 border-amber-300/40 rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-2xl relative overflow-hidden text-amber-100';
  } else if (theme === 'vintage') {
    front.className = 'card-face card-front bg-gradient-to-br from-amber-100 via-orange-50 to-amber-200 border-2 border-amber-600/40 rounded-2xl p-8 flex flex-col justify-between shadow-2xl relative overflow-hidden';
    inside.className = 'card-face card-back bg-[#F4ECD8] border-2 border-amber-600/40 rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-2xl relative overflow-hidden text-amber-950';
  }
}

// --- DIGITAL BOUQUET BUILDER LOGIC ---
let bouquet = [];

function initDefaultBouquet() {
  bouquet = [
    { name: 'White Lily', meaning: 'Sincere Apology & Fresh Clean Slate', emoji: '🌸', color: '#FFF1F2' },
    { name: 'Pink Peony', meaning: 'Healing, Romance & Soft Heart', emoji: '🌷', color: '#FCE7F3' },
    { name: 'Peach Rose', meaning: 'Gratitude & Unconditional Love', emoji: '🌹', color: '#FFE4E6' }
  ];
  renderBouquet();
}

function addFlower(name, meaning, emoji, color) {
  if (bouquet.length >= 10) {
    alert("Your bouquet is flourishing! Maximum 10 stems for this wrap.");
    return;
  }
  bouquet.push({ name, meaning, emoji, color });
  renderBouquet();

  // Subtle confetti sparkle
  if (window.confetti) {
    confetti({
      particleCount: 10,
      spread: 40,
      origin: { y: 0.8 },
      colors: ['#f43f5e', '#fb7185']
    });
  }
}

function clearBouquet() {
  bouquet = [];
  renderBouquet();
}

function setRibbon(colorName, hex) {
  const ribbon = document.getElementById('ribbonVisual');
  if (ribbon) ribbon.style.backgroundColor = hex;
}

function renderBouquet() {
  const container = document.getElementById('bouquetVisualContainer');
  const countBadge = document.getElementById('stemCountBadge');
  const meaningsList = document.getElementById('flowerMeaningsList');

  if (!container || !countBadge || !meaningsList) return;

  countBadge.innerText = `${bouquet.length} Stem${bouquet.length === 1 ? '' : 's'} Added`;

  // Render flowers in fan / arch arrangement
  container.innerHTML = '';
  const total = bouquet.length;

  bouquet.forEach((item, idx) => {
    const angle = total > 1 ? -35 + (idx / (total - 1)) * 70 : 0;
    const yOffset = Math.abs(angle) * 0.4;

    const flowerEl = document.createElement('div');
    flowerEl.className = 'bouquet-stem text-3xl select-none';
    flowerEl.style.transform = `rotate(${angle}deg) translateY(-${50 - yOffset}px)`;
    flowerEl.innerHTML = item.emoji;
    container.appendChild(flowerEl);
  });

  // Render meanings
  if (bouquet.length === 0) {
    meaningsList.innerHTML = '<div class="italic text-gray-400">Click flowers above to assemble your bouquet.</div>';
  } else {
    // Unique meanings count
    const counts = {};
    bouquet.forEach(f => {
      counts[f.name] = (counts[f.name] || 0) + 1;
    });

    meaningsList.innerHTML = Object.keys(counts).map(name => {
      const flower = bouquet.find(f => f.name === name);
      return `<div class="flex items-center justify-between">
        <span>${flower.emoji} <strong>${counts[name]}x ${name}</strong></span>
        <span class="text-[11px] text-rose-700 italic">${flower.meaning}</span>
      </div>`;
    }).join('');
  }
}

// --- RECIPIENT PREVIEW MODAL LOGIC ---
function openRecipientPreviewModal() {
  const modal = document.getElementById('recipientModal');
  const recipient = document.getElementById('recipientName').value.trim() || 'Maya';
  const sender = document.getElementById('senderName').value.trim() || 'Leo';
  const cardInside = document.getElementById('cardInsideInput').value.trim();

  document.getElementById('recipientPreviewTitle').innerText = `${recipient}, this is for you...`;
  document.getElementById('recipientPreviewText').innerText = `"${cardInside}"\n\n— With love, ${sender}`;

  // Reset dodge button
  const noBtn = document.getElementById('dodgeNoBtn');
  if (noBtn) {
    noBtn.style.transform = 'translate(0px, 0px)';
  }
  document.getElementById('dodgeHint').classList.add('hidden');
  document.getElementById('forgiveFeedback').classList.add('hidden');

  modal.classList.remove('hidden');
  setTimeout(() => modal.classList.add('modal-active'), 10);
  if (window.lucide) lucide.createIcons();
}

function closeRecipientPreviewModal() {
  const modal = document.getElementById('recipientModal');
  modal.classList.remove('modal-active');
  setTimeout(() => modal.classList.add('hidden'), 300);
}

// Dodging "No" button physics for humorous romantic touch
let dodgeCount = 0;
function dodgeNoButton() {
  const noBtn = document.getElementById('dodgeNoBtn');
  if (!noBtn) return;

  dodgeCount++;
  const randomX = (Math.random() - 0.5) * 160;
  const randomY = (Math.random() - 0.5) * 80;

  noBtn.style.transform = `translate(${randomX}px, ${randomY}px)`;
  document.getElementById('dodgeHint').classList.remove('hidden');
}

// Forgive Yes Celebration
function handleForgiveYes() {
  document.getElementById('forgiveFeedback').classList.remove('hidden');
  if (window.confetti) {
    confetti({
      particleCount: 80,
      spread: 90,
      origin: { y: 0.6 },
      colors: ['#f43f5e', '#fb7185', '#fda4af', '#e11d48', '#f59e0b']
    });
  }
}

// --- CHECKOUT & SHAREABLE LINK MODAL ---
function openCheckoutModal(itemName, price) {
  const modal = document.getElementById('checkoutModal');
  document.getElementById('checkoutItemName').innerText = itemName;
  document.getElementById('checkoutPrice').innerText = `$${price.toFixed(2)}`;

  // Generate unique randomized peace link code
  const randomCode = Math.random().toString(36).substring(2, 8);
  document.getElementById('peaceLinkInput').value = `https://sry.ai/peace/${randomCode}`;

  document.getElementById('orderSuccessMessage').classList.add('hidden');
  document.getElementById('completeOrderBtn').classList.remove('hidden');

  modal.classList.remove('hidden');
  setTimeout(() => modal.classList.add('modal-active'), 10);
  if (window.lucide) lucide.createIcons();
}

function closeCheckoutModal() {
  const modal = document.getElementById('checkoutModal');
  modal.classList.remove('modal-active');
  setTimeout(() => modal.classList.add('hidden'), 300);
}

function copyPeaceLink() {
  const input = document.getElementById('peaceLinkInput');
  navigator.clipboard.writeText(input.value).then(() => {
    const btn = document.getElementById('copyLinkBtn');
    btn.innerText = 'Copied!';
    setTimeout(() => { btn.innerText = 'Copy'; }, 2000);
  });
}

function simulateOrderSuccess() {
  document.getElementById('completeOrderBtn').classList.add('hidden');
  document.getElementById('orderSuccessMessage').classList.remove('hidden');
  if (window.confetti) {
    confetti({
      particleCount: 100,
      spread: 100,
      origin: { y: 0.5 }
    });
  }
}
