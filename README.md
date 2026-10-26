# sry.ai — When "Sorry" Is Hard to Say, Say It Right

> An emotional intelligence platform and digital peace-offering delivery service.

---

## 💡 The Core Problem & Solution

When people make mistakes in their relationships (partners, close friends, family), they often freeze up. They want to apologize, but:
1. They sound defensive, making things worse ("I'm sorry *if* you felt that way...").
2. Plain text messages can feel low-effort or cold after serious conflict.
3. Traditional physical flowers wither in 3 days, cost $70+, and can't be sent instantly late at night.

**sry.ai** bridges this gap:
- **Free for everyone:** A situation-aware AI apology generator that removes defensiveness, takes 100% accountability, and crafts heartfelt words tailored to the exact situation.
- **Premium Peace Offerings:** High-margin digital add-ons (Interactive 3D greeting cards, customizable digital bouquets with symbolic flower meanings, personalized video/audio, and redeemable digital vouchers).

---

## 🌟 Implemented Features

### 1. Free Apology Generator ("The Apology Architect")
- **Relationship & Situation Customization:**
  - Categorized for Partners, Friends, Family, Crushes, and Colleagues.
  - Quick-pick scenario presets (Anniversary forgotten, heated argument, late cancellation, emotional distance, unreplied texts).
  - Desired tone selector (Vulnerable & Deep, Sweet & Romantic, Playful & Cute, Short & Direct, Professional).
  - Severity level & optional "Make It Right" restitution promise.
- **3 Bespoke Apology Variations Generated:**
  - **The Deep Cut:** Radically accountable, validates their feelings, zero excuses.
  - **Sweet & Reassuring:** Romantic and tender, affirming bond and devotion.
  - **Quick Text:** Crisp, authentic, low-pressure message.
- **1-Click Sharing:**
  - Copy to clipboard with instant feedback.
  - Direct WhatsApp share trigger (`api.whatsapp.com`).
  - Seamless "Send as 3D Card" button that loads the message straight into the card designer.
- **High-EQ Coaching Tips:** Explains the psychology of apologies and flags red-flag words to avoid.

### 2. Interactive 3D Digital Greeting Card Designer (Paid Add-on)
- **3D Card Flip Animation:** Fully interactive 3D card that flips smoothly (`rotateY(180deg)`) on click or toggle.
- **Aesthetic Themes:**
  - *Blush Silk* (Romantic floral watercolor & rose-gold accents)
  - *Midnight Velvet* (Deep navy & gold stars)
  - *Vintage Seal* (Warm parchment & wax seal)
- **Live Customization:** Edit cover headline, inside handwritten font letter, wax seal, and sender signature in real-time.

### 3. Interactive Digital Peace Bouquet Builder (Paid Add-on)
- **Floriography (Symbolic Meanings):** Each flower carries authentic apology symbolism:
  - 🌸 **White Lily:** Sincere Apology & Fresh Clean Slate
  - 🌷 **Pink Peony:** Healing, Romance & Soft Heart
  - 🪻 **Blue Hydrangea:** Heartfelt Empathy & Remorse
  - 🌹 **Peach Rose:** Gratitude & Devotion
  - 🌿 **Lavender:** Calming the storm & Serenity
  - 🌼 **Daisy:** Innocence, Cheer & Hope
- **Dynamic Arrangement:** Stems fan out across the bouquet canvas dynamically as stems are added.
- **Wrapping & Ribbons:** Custom silk ribbon accents (Blush Pink, Burgundy Wine, Champagne Gold).

### 4. Make-It-Up Digital Peace Vouchers ("IOUs")
- Tangible reconciliation coupons:
  - "Dinner At Your Favorite Place — zero complaints, my treat"
  - "30-Min Stress Relief Massage"
  - "Weekend Chore Immunity Pass"

### 5. Recipient Mobile View & "Will You Forgive Me?" Interaction
- Preview modal showing exactly what the recipient experiences when opening their private link on mobile.
- Unsealing wax animation + card reveal + bouquet showcase.
- Interactive response buttons:
  - **"Yes, I forgive you ❤️"**: Triggers vibrant confetti shower & celebration notification.
  - **"No 😤"**: Playfully dodges the cursor/finger when hovered, breaking tension with heartwarming humor!

### 6. Checkout & Instant Shareable Link Flow
- Generates unique secure peace links (e.g., `https://sry.ai/peace/8f92a1`).
- Simulated checkout with celebration effects and 1-click link copying.

---

## 🚀 How to Run & Preview

Open `index.html` directly in any modern browser:
```powershell
Start-Process "C:\Users\aryan_79ip5n1\.gemini\antigravity\scratch\sry-ai\index.html"
```
Or open the folder in your browser:
`C:\Users\aryan_79ip5n1\.gemini\antigravity\scratch\sry-ai\index.html`

---

## 🔮 Next Step Roadmap

1. **Live Gemini API Integration:**
   - Plug in `GEMINI_API_KEY` to stream dynamically generated apologies with custom temperature and tone parameters.
2. **Backend & Database:**
   - Next.js (App Router) + PostgreSQL / Supabase to persist created cards, bouquets, and recipient responses (`/peace/[slug]`).
3. **Stripe Checkout / Apple Pay:**
   - One-click payments for $3.99 Card link and $7.99 Deluxe peace offering.
4. **AI Video & Voice Note Generation:**
   - Integrate Runway / HeyGen / ElevenLabs to generate animated cute apologies or personalized voice messages.
