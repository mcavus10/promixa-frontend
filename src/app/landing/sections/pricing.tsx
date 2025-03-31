import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

export function PricingSection() {
  const pricingPlans = [
    {
      name: 'Free',
      description: 'Basic access to our AI tools',
      price: '0',
      features: [
        'Limited AI image generations',
        '10 minutes of transcription per month',
        'Standard processing speed',
        'Email support'
      ],
      cta: 'Get Started',
      popular: false
    },
    {
      name: 'Pro',
      description: 'Perfect for professionals',
      price: '19',
      features: [
        '200 AI image generations per month',
        '2 hours of transcription per month',
        'Priority processing',
        'Advanced customization options',
        'Priority email support'
      ],
      cta: 'Try Pro',
      popular: true
    },
    {
      name: 'Enterprise',
      description: 'For teams and businesses',
      price: '49',
      features: [
        'Unlimited AI image generations',
        '10 hours of transcription per month',
        'Fastest processing speed',
        'Advanced customization options',
        'API access',
        'Dedicated support'
      ],
      cta: 'Contact Sales',
      popular: false
    }
  ];

  return (
    <section id="pricing" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Simple, Transparent Pricing</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose the plan that works best for your needs. Scale up or down at any time.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {pricingPlans.map((plan, index) => (
            <Card key={index} className={`${plan.popular ? 'border-primary shadow-lg' : 'border'} relative`}>
              {plan.popular && (
                <div className="absolute top-0 right-0 -translate-y-1/2 bg-primary text-white px-3 py-1 text-xs font-bold rounded-full">
                  POPULAR
                </div>
              )}
              <CardHeader>
                <CardTitle>{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-6">
                  <span className="text-4xl font-bold">${plan.price}</span>
                  <span className="text-gray-500">/month</span>
                </div>
                <ul className="space-y-2">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center">
                      <Check className="h-5 w-5 text-green-500 mr-2" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button variant={plan.popular ? 'default' : 'outline'} className="w-full">
                  {plan.cta}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
