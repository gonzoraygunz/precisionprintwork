# Work Log: Rebrand, Content Expansion, Logo Integration
Date: 2026-05-21
Repeatable? No — one-time branding work

## What was done

### Theme: orange → green/blue
- Replaced all `orange-*` Tailwind classes with green/blue equivalents across all pages
- Hero CTA: `bg-orange-500` → `bg-blue-700`; buttons: `bg-orange-500` → `bg-blue-600`
- Active nav link: `text-orange-600` → `text-green-600` (later updated to `text-green-400` for dark nav)
- Gotcha: PowerShell `Set-Content -Encoding utf8` corrupts em dashes (writes `â€"` instead of `—`). Fix: use `[System.IO.File]::WriteAllText(path, content, (New-Object System.Text.UTF8Encoding($false)))` or just use git to revert and redo via Edit tool

### Content expansion
- Homepage features: expanded from 3 to 6 cards (added D&D Minis, Resin Printing, Replacement Parts)
- Services page: expanded from 4 to 8 service cards (added Gifts & Keepsakes, Resin Printing, Terrain & Props, Design + Print)
- Added Resin to materials list
- Tone made more fun/casual throughout

### Headline iteration (for reference if user revisits)
- Rejected: "If You Can Dream It, I Can Print It" (too cliché)
- Rejected: several others
- Accepted: "Practical Parts and Solutions, Tabletop Minis, Terrain, Gifts and Custom Requests"

### Brand rename: PrecisionPrintWork → Precision Printworks
- `src/components/Nav.tsx` — text logo updated
- `src/components/Footer.tsx` — text logo, copyright, tagline updated
- `src/app/layout.tsx` — title: "Precision Printworks — Custom 3D Printing", description updated to mention minis/terrain/gifts

### Logo integration
- Source file: `C:\Users\mdray\Downloads\Gemini_Generated_Image_q3kx68q3kx68q3kx.png`
- Copied to `public/logo.png`
- Nav and Footer updated to use `<Image src="/logo.png" ... />`
- Logo has dark vignette baked in (designed for dark backgrounds) — nav was changed from `bg-white` to `bg-slate-900` to match
- Nav link colors updated to `text-slate-300 / text-white` hover, active: `text-green-400`

## Current site state (as of this log)
- Live at: https://precisionprintwork.com
- GitHub: https://github.com/gonzoraygunz/precisionprintwork.git (auto-deploys to Vercel on push)
- Nav: dark slate-900, logo image, green active links
- Hero: slate-900 with green/blue accents
- Footer: slate-900, logo image, green accent
- Portfolio: 4 real product photos in `public/Portfolio/` (capital P — Linux case-sensitive!)

## Pending / next steps
- Portfolio page: card descriptions are generic placeholder text — update with real project details as portfolio grows
- More portfolio photos — add as new prints complete
- `how-it-works` page: exists but hasn't been reviewed/updated for new content (minis, terrain, etc.)
- `contact` page: exists but hasn't been reviewed
- Logo: if a version without the dark vignette becomes available, can revert nav to white (`bg-white`, links `text-slate-600`)

## Gotchas
- Logo was designed for dark backgrounds — keep nav dark or logo looks like a floating box
- Portfolio image paths must use capital P (`/Portfolio/`) to match `public/Portfolio/` on disk — Vercel is case-sensitive
- Deploy via `git push` (GitHub → Vercel auto-deploy) is safer than `npx vercel --prod` for avoiding Windows/Linux casing issues
