import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ImageIcon, MicIcon, LayoutGridIcon } from 'lucide-react';

export function FeaturesSection() {
  const features = [
    {
      title: 'AI Image Generator',
      description: 'Create stunning, unique images with our state-of-the-art AI image generation technology. Turn your ideas into visual art in seconds.',
      icon: <ImageIcon className="h-12 w-12 text-primary" />
    },
    {
      title: 'Transcription Tool',
      description: 'Convert speech to text with incredible accuracy. Perfect for meetings, interviews, lectures, and more.',
      icon: <MicIcon className="h-12 w-12 text-primary" />
    },
    {
      title: 'Future Services',
      description: 'Stay tuned for upcoming features including summarization tools, PDF processing, and more AI-powered solutions.',
      icon: <LayoutGridIcon className="h-12 w-12 text-primary" />
    },
  ];

  return (
    <section id="features" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Powerful AI Features</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore our suite of AI-powered tools designed to enhance your productivity and creativity.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="border-2 hover:border-primary transition-all duration-300">
              <CardHeader>
                <div className="mb-4">
                  {feature.icon}
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
