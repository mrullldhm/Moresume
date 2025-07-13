# Moresume
![Homepage screenshot](/src/assets/screenshot.png)

## About
Moresume is an easy-to-use resume builder that helps you create professional resumes quickly. Built with PostgreSQL, Express, React, and Node.js (PERN stack) using TypeScript, it includes smart AI features and a mobile-friendly design.

## Features
- **Step-by-Step Form**: Create resumes with a simple, guided form using `react-hook-form`.
- **Flexible Sections**: Add, edit, or delete resume parts easily with `useFieldArray`.
- **Drag-and-Drop**: Move sections around with `@dnd-kit/core`, `@dnd-kit/sortable`, and `@dnd-kit/modifiers`.
- **AI Content**: Get resume text suggestions from OpenAI.
- **Paid Plans**: Unlock extra features with subscription tiers via Stripe.
- **Mobile-Friendly**: Looks great on phones and desktops with Tailwind CSS and Shadcn UI.
- **PDF Download**: Save or print resumes as PDFs with `react-to-print`.
- **URL Saving**: Keep your progress in the browser URL for easy sharing.
- **Data Storage**: Save resumes securely in PostgreSQL and files to Vercel Blob.
- **Auto-Save**: Your work saves automatically to avoid losing changes.
- **Login System**: Secure accounts with Clerk (`@clerk/nextjs`, `@clerk/themes`).

## Setup
To run Moresume on your computer:

```bash
# Get the code
git clone https://github.com/mrullldhm/Moresume.git
cd Moresume

# Install frontend tools
cd client
npm install --legacy-peer-deps

# Install backend tools
cd ../server
npm install --legacy-peer-deps

# Set up environment file
cp .env.example .env
# Add your PostgreSQL database URL and other keys to .env
```

## What You Need
- Node.js (version 18 or newer)
- PostgreSQL (version 15 or newer)
- npm (version 9 or newer)
- Vercel account for file storage
- Clerk account for user login
- OpenAI key for AI features
- Stripe account for payments

## How to Use
1. Start the backend:
```bash
cd server
npm start
```
2. Start the frontend:
```bash
cd client
npm run dev
```
3. Open `http://localhost:5173` in your browser.
4. Sign up with Clerk, build your resume, and try features like AI suggestions or PDF download.

## Configuration
Add these to `.env` files in `server/` and `client/` folders:

```bash
# Server .env
DATABASE_URL=postgresql://user:password@localhost:5432/Moresume
PORT=5000
CLERK_SECRET_KEY=your_clerk_secret_key
OPENAI_API_KEY=your_openai_api_key
STRIPE_SECRET_KEY=your_stripe_secret_key
VERCEL_BLOB_TOKEN=your_vercel_blob_token

# Client .env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
```

Set up the database:
```bash
cd server
npx prisma migrate dev
```

## Contributing
Want to help? Here’s how:
1. Fork the repository.
2. Make a new branch (`git checkout -b feature-branch`).
3. Save your changes (`git commit -m 'Add feature'`).
4. Push your branch (`git push origin feature-branch`).
5. Submit a pull request.

Use TypeScript, ESLint, and Prettier for clean code.

## License
This project uses the MIT License. Check the [LICENSE](LICENSE) file for details.

## Contact
For help or feedback:
- GitHub Issues: [https://github.com/mrullldhm/Moresume/issues](https://github.com/mrullldhm/Moresume/issues)
- Twitter: [https://x.com/mrullldhm](https://x.com/mrullldhm)
- LinkedIn: [https://www.linkedin.com/in/mrullldhm/](https://www.linkedin.com/in/mrullldhm/)