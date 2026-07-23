# The Living Edit

Premium, responsive home page for an interior design studio.

## Run locally

1. Install the current Node.js LTS release from https://nodejs.org.
2. Open a terminal in this folder and run `npm install`.
3. Start the site with `npm run dev`.
4. Visit http://localhost:3000.

## Make it yours

- Update the brand name, contact details, introductory copy, and gallery image URLs in `app/page.tsx`.
- The enquiry form is currently a polished front-end experience only. The next phase is connecting it to Supabase so submissions are saved and sent to the owner.

## Large walkthrough video

Keep the 600 MB walkthrough outside Git and Vercel's deployment bundle. Upload it to Vercel Blob, Cloudinary, or S3, then add its direct MP4 URL as `NEXT_PUBLIC_WALKTHROUGH_VIDEO_URL` in Vercel Project Settings → Environment Variables. The Walkthrough Renders page will then show both films; without that variable it safely shows the lightweight local film only.
