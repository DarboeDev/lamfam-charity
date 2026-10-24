# lamfam-charity

Website for **LAMFAM Charity**, a youth-led charity in The Gambia. *Be someone's reason to smile.*

A static one-page site (HTML, CSS, vanilla JS) with a black-and-white design, light and dark mode, and full-colour photography from our work: Ramadan food packages, water points and boreholes, Qurans and essentials for students, and hospital visits.

## Run locally

Any static server works, for example:

```bash
python -m http.server 5510
```

Then open http://localhost:5510.

## Editing

- **Team:** edit the `TEAM` list at the top of `script.js`. Add `photo: "assets/team/name.jpg"` once headshots are ready.
- **Contact form emails (free):** go to https://web3forms.com, enter the inbox that should receive messages, and copy the access key they email you. Paste it into `FORM_ACCESS_KEY` in `script.js`. Messages then arrive by email (free plan: 250 a month). Until a key is set, the form opens the visitor's email app addressed to `CONTACT_EMAIL`.
- **Donation details:** fill in `DONATE` at the top of `script.js`: the Wave number and name, the bank name, account name and account number, and a WhatsApp number (digits with country code, e.g. `2207000000`). Empty fields show "Coming soon", and the WhatsApp button only appears once a number is set.
- **Team phone numbers:** add `phone: "+220 …"` to anyone in `TEAM` to list them in the Contact section with Call and WhatsApp buttons.
- **Photos:** live in `assets/photos/`. `PHOTO-SHOT-LIST.md` lists the shots still needed.

## SEO and sharing

- The official address is **https://www.lamfamcharity.org/**. It is set in the `<head>` of `index.html` (canonical link, social tags, structured data), in `robots.txt` and in `sitemap.xml`. If the address ever changes, update it in those three places.
- `assets/og-image.jpg` (1200×630) is the preview shown when the link is shared on WhatsApp, Facebook, X or LinkedIn.
- `favicon.ico`, `assets/apple-touch-icon.png`, `assets/icon-*.png` and `site.webmanifest` are the browser and phone icons.
- `404.html` is shown for broken links (on Vercel and GitHub Pages; the local Python server doesn't use it).

### Connecting lamfamcharity.org

1. In Vercel, open the project → **Settings → Domains** and add `lamfamcharity.org` and `www.lamfamcharity.org`.
2. Vercel shows the DNS records to add where the domain was bought (usually an `A` record for `lamfamcharity.org` and a `CNAME` for `www`). Add them exactly as shown.
3. Once the domain works, add it to **Google Search Console** (https://search.google.com/search-console), verify it, and submit `https://www.lamfamcharity.org/sitemap.xml`.

## Deploy

The site has no build step, so it can be hosted as-is on GitHub Pages, Netlify or Vercel.

#BeSomeonesReasonToSmile · #TogetherWeCanMakeADifference
