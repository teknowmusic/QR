# TEK_KNOWLEDGE — Scan Card

A full-screen QR page that installs to your phone's home screen with its own icon.
Matches teknowmusic.github.io exactly: #06070C / #00F0A8 / #7B5CFF, Space Grotesk + JetBrains Mono.

Live URL once deployed: **https://teknowmusic.github.io/qr/**

---

## Put it online (GitHub, from your phone)

Sign in as **teknowmusic**, open the **teknowmusic.github.io** repo.

1. `Add file` -> `Create new file`
2. Type the filename exactly: `qr/README.md` — the `/` creates the folder
3. Put anything in the body (a single dash is fine), `Commit changes`
4. You're now able to open the `qr` folder. Open it.
5. `Add file` -> `Upload files` -> select all 8 files from the `qr` folder in this zip
6. `Commit changes`

Live in 1-2 minutes at https://teknowmusic.github.io/qr/

From a desktop you can skip steps 1-4 and just drag the whole `qr` folder in.

## Add it to your home screen (Pixel / Android)

Open the URL in **Chrome** -> three-dot menu -> **Install app** (it may say "Add to Home screen").
Choose Install, not "Create shortcut" — Install gives you the real thing.

Icon is the green QR eye, label reads **TEK_QR**. It lands on your home screen and in the
app drawer, shows up in the app switcher like any other app, opens with no browser bars,
and works with no signal.

**Long-press the icon** for jump-straight-to shortcuts: Music, Video, Instagram, Contact card.

(iPhone also works — Safari -> Share -> Add to Home Screen — but you get fewer of the extras.)

---

## What it does

- **5 codes, one tap apart:** SITE · MUSIC (SoundCloud) · VIDEO (YouTube) · IG · CARD
- **CARD** is a contact card — scanning it offers to save Tek Knowledge + your email straight
  into their phone's contacts
- **Tap the code** to blow it up true full screen, tap again to come back
- **Long-press the home screen icon** to open straight to Music, Video, IG, or Contact card
- **Screen won't dim** while it's open, so nobody's fighting a dark screen trying to scan
- **SHARE LINK** sends whatever the current code points to via your normal share sheet

All 5 codes were decode-tested before shipping. They resolve to:
- https://teknowmusic.github.io/
- https://soundcloud.com/teknowmusic
- https://www.youtube.com/@TeknowTV
- https://www.instagram.com/teknowmusic/
- contact card: Tek Knowledge / teknowmusic@gmail.com

## Files

| File | What it is |
|---|---|
| `index.html` | The whole page. Codes are baked in — no internet needed to draw them. |
| `manifest.webmanifest` | Makes it installable, sets the name and icon |
| `sw.js` | Offline cache. Only touches `/qr/` — cannot affect your main site. |
| `icon-180.png` | iPhone fallback. Not used on Android, but leave it — `sw.js` expects it. |
| `icon-*.png` | Home screen icons (180 for iPhone, 192/512 for Android, maskable pair) |

## Changing a code later

Codes live in one line near the bottom of `index.html`, starting `const QR = {`.
Don't hand-edit the `d` values — those are the pixel matrices. Ask me to regenerate
and I'll hand back a new `index.html`.

## After it's live

Scan it yourself with your own camera before you show it to anybody.
