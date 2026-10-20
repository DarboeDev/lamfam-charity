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
- **Contact email:** set `CONTACT_EMAIL` in `script.js`.
- **Photos:** live in `assets/photos/`. `PHOTO-SHOT-LIST.md` lists the shots still needed.

## Deploy

The site has no build step, so it can be hosted as-is on GitHub Pages, Netlify or Vercel.

#BeSomeonesReasonToSmile · #TogetherWeCanMakeADifference
