# Funky Design Philosophy

Friendly, warm, character-led brand design that the public likes on first sight.
Built during the tellme logo work (October 2026). Use this file whenever a logo,
mascot, icon set or brand character needs to feel fun, approachable and human,
especially for a product that might otherwise feel cold or creepy (AI, data,
anything that "listens" or "watches").

To rebuild: read this file, then open the two reference pages in `reference/`.
They contain working SVG code for every rule below.

---

## 1. The one idea

**A friend who helps you, never a device that watches you.**

Every character must read as a warm companion first. The thing it does (writes,
records, listens, films) is a prop it holds or a gesture it makes, never its body.

---

## 2. What failed, so it never happens again

Earlier tellme rounds were called "dystopian". The causes, all avoidable:

| Failed move | Why it reads badly |
|---|---|
| A microphone as a head | A listening device with a body. For a product that hears meetings, it draws surveillance. |
| Black, featureless heads with white dot eyes | Reads as a mask, a robot, a balaclava |
| Collar bands, antennas, visors | Reads as hardware and uniforms |
| Sharp triangle bodies | Reads as a shield, a badge, an authority figure |
| One flat dark colour for the whole figure | Cold and anonymous |
| Typing or "always on" signals on the character itself | Reinforces "it is watching" |

Rule of thumb: if the character could be the logo of a security camera, a robot
army or a smart speaker, start again.

---

## 3. The rules

### 3.1 Colour: warm, with soft ink only for lines

| Token | Hex | Use |
|---|---|---|
| Ink | `#2b2b38` | Outlines, eyes, smile. Never as a big fill. |
| Orange | `#ff6a3d` | Primary brand colour, clothes, key props |
| Butter | `#ffd166` | Character body (Penpal), warm backgrounds |
| Cream | `#fff6ea` | Faces, paper, light fills |
| Lilac | `#c9b8ff` | Secondary accent, props (pens, cameras, mics) |
| Blush | `#ff9f8a` at 70% | Cheeks, always |
| Page | `#fffaf3` | Background |

- No large black or dark-grey fills on a character.
- Use at most two bright colours on one character, plus cream and ink.
- Each platform or channel can have its own soft background tint
  (LinkedIn `#eaf2fb`, Instagram `#fdeef4`, YouTube `#fff1e0`, podcast `#efe9ff`,
  newsletter `#fff8dc`); the character itself never changes colour.

### 3.2 Shape: soft and round

- Build from circles, rounded rectangles and gentle curves.
- No triangles, sharp points, collars, antennas or visors.
- One outline weight everywhere: **4 units on a 120-unit canvas**, round joins and
  round caps. Props use 3.5.
- Chunky, slightly oversized heads and props read as friendly.

### 3.3 Face first (the face recipe)

Every character gets the same face, scaled to fit:

- **Eyes:** tall ink ovals (rx 4.6, ry 5.6), each with a white highlight dot
  (r 1.6) up and to the right. The highlight is what makes eyes look alive.
  Eyes sit 30 units apart (±15 from centre).
- **Cheeks:** blush circles (r 6, 70% opacity), just below and outside the eyes.
- **Smile:** a single soft curve (ink, width 4, round caps), 18 units wide.
- **Blink:** eyes squash to 12% height for a moment every ~4 seconds.

No mouths with teeth, no angry or blank expressions, no visors over eyes.

### 3.4 Objects are props, not body parts

- The product's job is shown by what the character **holds**: a pen, a camera,
  a play button, a mic, an envelope.
- Props sit in their own hand, clear of the face. Never lay a prop across the
  head or eyes (that was the Sidekick fix).
- Draw the prop first, then the hand on top of it, so the hand visibly holds it.

### 3.5 Motion: gentle and alive, never mechanical

| Motion | Spec |
|---|---|
| Float | up 4px and back, 3.2s, ease-in-out, infinite |
| Blink | scaleY to 0.12 at 96% of a 4s loop |
| Prop wiggle | rotate -6 to -7 degrees from the hand, 2.4s |
| Listening waves | opacity 0.35 to 1, 1.6s, staggered |

- Nothing snaps, scans, pings or flashes.
- Always respect `prefers-reduced-motion` (turn all motion off).
- Static versions (app icons, favicons) must work with no motion at all.

### 3.6 Type

- Wordmark font: **Nunito 900**, lowercase, letter-spacing -0.03em.
- One signature detail only, for example the two l's of "tellme" in orange
  (or as soft sound bars).
- Body text: Inter.

---

## 4. One character, every channel

Never design a separate logo per platform. Use one character and swap the prop:

| Version | Prop | Where |
|---|---|---|
| Core logo | none (just the face) | App icon, website, invoices, pitch deck |
| LinkedIn | pen | Company page, post graphics |
| Instagram | camera | Profile picture, carousels, reels |
| YouTube | play button | Channel icon, thumbnail corner |
| Podcast | mic | Cover art, clips |
| Newsletter | envelope with a heart | Email header |

The face never changes, so people recognise it everywhere. Mascot brands
(Duolingo, Mailchimp) work the same way.

Characters from the tellme work:

- **Penpal (master brand):** a round butter-yellow buddy with the face recipe,
  holding the channel prop in a small round hand at its lower right.
- **Sidekick (human counterpart):** a round cream head with a dark hair swoosh,
  an orange jumper, and an arm raised to hold the prop clear of the face. Use it
  for people moments (team page, founder story, onboarding), never as a second logo.
- **Bubble buddy:** an orange speech bubble with the face; its tail is a pen nib.
- **Notepad pal:** a cream notepad with spiral rings, a pen behind its "ear" and
  lilac listening waves.
- **Letter face:** the brand name's letters become the eyes (the two l's of
  tellme), with an orange smile. The grown-up version.

---

## 5. Always test in context

A mark is not done until it has been checked at these sizes, by looking at a
rendered screenshot, not by reading the code:

1. Large hero (about 250px)
2. App icon (rounded square, about 78px)
3. Round avatar (LinkedIn or Instagram profile picture)
4. Favicon at **32px and 16px**
5. Next to the wordmark
6. On every channel background tint

Check specifically for: props clipped at the canvas edge, props overlapping the
face, details that vanish at 16px, and the character reading as a device.

---

## 6. Process lessons from building tellme

- **Names in English** unless the person asks otherwise. Liking a foreign brand's
  feel (byro.ee) means its qualities (short, soft, lowercase), not its language.
- **Check before showing:** run domain checks (`dig +short NS name.com`) on
  .com, .ai, .app, .co, get…, …hq, and a web search for funded companies with
  the same name in AI, marketing or software. Cut conflicts before presenting.
- **Show 3 to 5 strong options, not 30.** Each pushed properly, with a clear pick.
- **Diagnose before redrawing.** When something is rejected, name exactly why
  (as in section 2), turn that into rules, then redraw.
- **Keep the brand colours the person already owns** unless asked to change them.

---

## 7. Quick checklist

- [ ] Reads as a friend, not a device
- [ ] Warm palette; ink only for lines and eyes
- [ ] Face recipe: highlight eyes, cheeks, soft smile, blink
- [ ] Soft round shapes, one outline weight
- [ ] Props held in a hand, clear of the face
- [ ] Gentle motion, reduced-motion respected
- [ ] Works at 16px, as an avatar, as an app icon, next to the wordmark
- [ ] One character with swappable props for every channel

---

## Files

- `reference/tellme-friendly.html`: the five friendly characters (Bubble buddy,
  Notepad pal, Penpal, Sidekick, Letter face) with the "why it felt dystopian"
  notes. Contains the `face()` and `pen()` SVG helpers.
- `reference/tellme-system.html`: Penpal and Sidekick as a cross-channel system
  (core logo, LinkedIn, Instagram, YouTube, podcast, newsletter) and platform
  mock-ups. Contains the `PROPS` helpers (pen, camera, play, mic, mail).

Open either file directly in a browser to see the marks animated.
