import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';

export function TestimonialsSection() {
  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Graphic Designer',
      content: 'The AI image generator saved me countless hours of work. The quality is incredible, and it has become an essential part of my creative process.',
      avatar: 'SJ'
    },
    {
      name: 'Mike Chen',
      role: 'Content Creator',
      content: 'I use the transcription tool for all my interviews. The accuracy is remarkable, and it has streamlined my workflow immensely.',
      avatar: 'MC'
    },
    {
      name: 'Alex Rivera',
      role: 'Marketing Director',
      content: 'Promixa has transformed how our team creates content. The AI tools are intuitive, powerful, and surprisingly affordable.',
      avatar: 'AR'
    },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">What Our Users Say</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join thousands of satisfied users who have transformed their workflow with Promixa.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-white">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <Avatar className="h-16 w-16 mb-4">
                    <AvatarFallback>{testimonial.avatar}</AvatarFallback>
                  </Avatar>
                  <p className="text-gray-700 mb-4 italic">&quot;{testimonial.content}&quot;</p>
                  <h4 className="font-bold">{testimonial.name}</h4>
                  <p className="text-gray-500 text-sm">{testimonial.role}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
