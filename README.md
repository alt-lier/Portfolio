# Leir — Personal Portfolio

A responsive, interactive developer portfolio based on the supplied dark-themed design reference. Built with HTML5, CSS3, vanilla JavaScript, Bootstrap 5, and Bootstrap Icons.

## Features

- Responsive navigation with active-section highlighting and a mobile menu
- Hero section with code-editor illustration
- About section with replaceable profile image
- Interactive skill cards with detail modal
- Project cards generated from one JavaScript configuration array
- Project carousel and project details modal
- GitHub and live-demo links shown only when configured
- Contact form validation, optional Formspree integration, and honest `mailto:` fallback
- Scroll reveal animations and back-to-top control
- Centralized personal information, social links, project details, and contact settings

## Technologies

- HTML5
- CSS3
- JavaScript (Vanilla)
- Bootstrap 5.3
- Bootstrap Icons
- Google Fonts (Manrope and DM Mono)

## Folder structure

```text
leir-portfolio/
├── index.html
├── css/
│   └── style.css
├── js/
│   └── script.js
├── images/
│   ├── profile-placeholder.svg
│   ├── project-portfolio.svg
│   ├── project-scholarship.svg
│   └── project-tunetext.svg
└── README.md
```

## Run locally

1. Download or clone this repository.
2. Open `index.html` in a browser, or use a local development server such as the VS Code Live Server extension.
3. An internet connection is needed for the Bootstrap and Google Fonts CDN resources.

## Personalize the website

Open `js/script.js` and edit the configuration at the top:

- `personalInfo.name`, `fullName`, `email`, and `location`
- `personalInfo.profileImage` to point to your own image, such as `images/profile.jpg`
- `personalInfo.socialLinks` with your real Facebook, Instagram, and GitHub profile URLs
- `personalInfo.formspreeEndpoint` with your Formspree form endpoint if you want direct form submission
- The `projects` array with your actual descriptions, image paths, technologies, GitHub URLs, and live demo URLs

The example social and repository URLs are intentionally blank rather than fake. A social icon or project link is hidden when its URL is blank or still contains a placeholder.

### Profile and project images

Replace `images/profile-placeholder.svg` with your own photo (or update `personalInfo.profileImage` to your chosen image path). Replace the project SVG preview files with screenshots if you have them, updating the corresponding `image` values in the `projects` array.

### Contact form

Without a Formspree endpoint, the form validates the fields and opens a prefilled email draft addressed to `personalInfo.email`. The website does not claim the message was delivered. To submit directly from the site, create a Formspree form and paste its endpoint into `personalInfo.formspreeEndpoint`.

## Publish with GitHub Pages

1. Create a GitHub repository and upload the contents of this folder to its root.
2. In the repository, open **Settings → Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**.
4. Select your publishing branch (usually `main`) and the `/ (root)` folder, then save.
5. Wait for GitHub Pages to publish the site. Add the resulting URL to the `liveDemo` field for this portfolio project if desired.

All local asset references are relative, so the site is suitable for GitHub Pages project sites.
