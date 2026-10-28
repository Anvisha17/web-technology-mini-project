# Maison Aurora — Elegant Restaurant Website

A responsive, multi-page restaurant website built with **HTML, CSS, and vanilla JavaScript**. Designed as a portfolio-ready front-end project that can be uploaded to GitHub and published with GitHub Pages.

## Pages

- `index.html` — home page, story, featured dishes, reservation request form, contact details and newsletter form
- `menu.html` — full menu with category filters
- `login.html` — demo sign-in page
- `signup.html` — demo account registration
- `styles.css` — responsive design, typography, layouts, buttons, and mobile navigation
- `script.js` — menu filtering, mobile navigation, demo account sign-up/sign-in, and browser-only form interactions

## Run locally

1. Download or clone this repository.
2. Keep all files in the same folder.
3. Open `index.html` in your browser. No build tools or packages are required.

For the best experience, use a local development server such as the **Live Server** extension in Visual Studio Code.

## Publish with GitHub Pages

1. Create a new GitHub repository, for example `maison-aurora-restaurant`.
2. Upload all files in this folder to the repository root.
3. Open **Settings → Pages** in the repository.
4. Under **Build and deployment**, select **Deploy from a branch**.
5. Choose the `main` branch and `/ (root)` folder, then save.
6. Wait for GitHub Pages to publish the site. The published URL will appear in the Pages settings.

## Important demo limitations

This is a **front-end-only portfolio project**. It does not have a server or database.

- Demo accounts are stored in browser `localStorage`; the current demo stores passwords in plain text. Do not enter a real or reused password.
- Login is not secure authentication and should not be used for a real business.
- Reservation requests and newsletter sign-ups are stored only in the current browser. No email is sent and no restaurant booking is actually made.
- To launch this for real customers, connect a secure backend/auth provider, store password hashes on the server, and add a real reservation/email service.

## Images and fonts

The project uses remote images from Unsplash and Google Fonts. An internet connection is required for these external images and fonts to load. Replace the sample images and fictional contact details with assets and information you have permission to use.

## Suggested GitHub repository description

> An elegant, responsive restaurant website built with HTML, CSS, and vanilla JavaScript, featuring a photo-led landing page, menu filters, demo login/sign-up, and reservation form.
