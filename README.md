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

## Deploy

The site has no build step, so it can be hosted as-is on GitHub Pages, Netlify or Vercel.

#BeSomeonesReasonToSmile · #TogetherWeCanMakeADifference
