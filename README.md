# Pixel Interior Solutions

This is a professional React website with a deliberately small, beginner-friendly source folder. The live design has not been changed by this organisation.

## Start here: normal website editing

Open [`src/EDIT_THIS_FILE.ts`](src/EDIT_THIS_FILE.ts). It is the **only file** you need for everyday updates: business details, menu labels, services, photos, FAQs and testimonials.

Change words only inside the quotes. Keep the commas, brackets and quotation marks in place, then save.

## Simple project map

```text
src/
  EDIT_THIS_FILE.ts  <- all words, contacts, services and image links
  Pages.tsx          <- the five page layouts
  Sections.tsx       <- reusable page sections and contact form
  Components.tsx     <- header, footer and small visual building blocks
  App.tsx            <- page addresses/routes; usually leave alone
  index.css          <- site-wide colours, fonts and styling
  main.tsx           <- starts the website; leave alone

public/images/       <- logo image files
```

This is intentionally flat: there are no nested `pages`, `components`, or `types` folders to hunt through. The three layout files are separated only so that each stays manageable; content remains in one editing file.

## Run the website

Open a terminal in this folder and run:

```bash
npm install
npm run dev
```

Then open the local address Vite shows (usually `http://localhost:5173`). If Windows PowerShell says it cannot run `npm.ps1`, use `npm.cmd run dev` instead.

## Contact form

The form needs a Formspree form ID before it can send messages. Add it to `.env` like this:

```text
VITE_FORMSPREE_ENDPOINT=your-form-id
```
