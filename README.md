# Promixa Frontend

This is a modular Next.js project for Promixa, an AI-powered platform offering various services including image generation and transcription tools.

## Project Structure

The project follows a modular structure to allow for easy expansion with additional sub-projects:

```
promixa-frontend/
├── src/
│   ├── app/
│   │   ├── landing/  # Landing page module
│   │   ├── image-app/  # (Future module)
│   │   ├── voice-app/  # (Future module)
│   │   └── page.tsx  # Root redirect
│   ├── components/  # Shared components
│   └── lib/  # Utilities and shared code
└── public/  # Static files
```

## Tech Stack

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **shadcn/ui** for component styling
- **Lucide React** for icons

## Getting Started

First, install the dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deployment to Vercel

### 1. Set Up Vercel Account

If you don't have a Vercel account yet:

1. Go to [Vercel](https://vercel.com) and sign up
2. Connect your GitHub account

### 2. Deploy Your Project

1. Push this repository to GitHub
2. Log in to your Vercel dashboard
3. Click "New Project"
4. Import your GitHub repository (promixa-frontend)
5. Keep the default settings and click "Deploy"

### 3. Configure Custom Domain (promixa.me)

1. After deployment, go to the project settings in Vercel dashboard
2. Navigate to the "Domains" section
3. Add your domain: `promixa.me`
4. Follow Vercel's instructions to configure your DNS settings with your domain provider

### 4. Environment Variables (if needed in the future)

If you add API keys or other environment variables:

1. Go to your project settings in Vercel
2. Navigate to the "Environment Variables" section
3. Add your variables (keep sensitive information like API keys private)

## Adding New Modules

To add a new module (e.g., image-app, voice-app):

1. Create a new directory in `src/app/` with the module name
2. Set up the module structure similar to the landing module
3. Add necessary components, sections, and pages
4. Update navigation links as needed

## Learn More

To learn more about the technologies used in this project:

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [shadcn/ui Documentation](https://ui.shadcn.com)
