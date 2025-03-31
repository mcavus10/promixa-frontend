import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ImageIcon, MicIcon, FileTextIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function FeaturesSection() {
  const features = [
    {
      title: 'AI Art Generator',
      description: 'Create stunning visuals from simple text prompts using powerful diffusion models.',
      icon: <ImageIcon className="h-8 w-8 text-white" />,
      gradient: 'from-blue-500 to-purple-600',
      buttonText: 'Try Now →',
      buttonLink: '/art',
      comingSoon: false
    },
    {
      title: 'Transcription Tool',
      description: 'Convert audio or video into accurate, readable text in seconds.',
      icon: <MicIcon className="h-8 w-8 text-white" />,
      gradient: 'from-pink-500 to-violet-600',
      buttonText: 'Start Transcribing →',
      buttonLink: '/transcribe',
      comingSoon: false
    },
    {
      title: 'Content Generator',
      description: 'Generate professional-grade content with AI.',
      icon: <FileTextIcon className="h-8 w-8 text-white" />,
      gradient: 'from-orange-500 to-red-600',
      buttonText: 'Notify Me',
      buttonLink: '#',
      comingSoon: true
    },
  ];

  return (
    <section id="features" className="pt-12 pb-24 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold mb-4 tracking-tight">Our Smart Services</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore our AI-powered tools designed for creativity and productivity.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="group transition-all duration-300 transform hover:translate-y-[-8px]" 
              data-aos="fade-up" 
              data-aos-delay={index * 100}
            >
              <Card className="h-full rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border-0 flex flex-col">
                <div className={`bg-gradient-to-r ${feature.gradient} p-6`}>
                  <div className="bg-white/20 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-2xl font-bold text-white">{feature.title}</CardTitle>
                </div>
                <CardContent className="py-6 flex-grow">
                  <p className="text-gray-600">{feature.description}</p>
                  {feature.comingSoon && (
                    <div className="mt-4 inline-flex items-center rounded-full bg-amber-100 px-3 py-1 text-sm font-medium text-amber-800">
                      Coming Soon 🚧
                    </div>
                  )}
                </CardContent>
                <CardFooter className="pb-6 pt-0">
                  {feature.comingSoon ? (
                    <Button 
                      className="w-full rounded-xl bg-gray-200 text-gray-600 hover:bg-gray-300 cursor-not-allowed" 
                      disabled
                    >
                      {feature.buttonText}
                    </Button>
                  ) : (
                    <Button 
                      className={`w-full rounded-xl bg-gradient-to-r ${feature.gradient} text-white hover:opacity-90`}
                      asChild
                    >
                      <Link href={feature.buttonLink}>{feature.buttonText}</Link>
                    </Button>
                  )}
                </CardFooter>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
