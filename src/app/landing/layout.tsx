import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Promixa - AI-Powered Tools for Creators',
  description: 'Promixa offers cutting-edge AI tools for image generation, transcription, and more.',
};

export default function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="min-h-screen">
      {children}
    </section>
  );
}
