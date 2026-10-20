# Imagine Build

AI-assisted architectural concept exploration. Generated designs, floor plans and cost estimates are preliminary and must be reviewed by qualified professionals before construction.

## Requirements
- Node.js 20+
- A Gemini API key from Google AI Studio
- Vercel CLI for local API testing (npx vercel dev)

## Setup
1. Install dependencies: npm install
2. Set GEMINI_API_KEY as a server-side environment variable in Vercel. Do not add it to Vite define, a VITE_* variable, or client code.
3. For local development, use npx vercel dev so the /api/gemini serverless function runs alongside the frontend. Plain npm run dev serves only Vite and will not run the API function.
4. Deploy to Vercel and set the same environment variable in the project's deployment settings.

## Security notes
- Rotate any API key that was previously committed or exposed.
- .env* files are ignored; never commit actual secrets.
- The API includes basic request-size validation and an in-memory rate limit. Before public production launch, add durable per-user/IP rate limiting and authentication or abuse protection at the hosting layer.
- AI-generated visuals, plans and cost figures are not construction-ready documents or professional estimates.
