import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Mail, MessageSquare, Send } from 'lucide-react';
import { useState } from 'react';

export function ContactSection() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [formStatus, setFormStatus] = useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Form validation checks
    if (!name.trim()) {
      setFormStatus('Please enter your name');
      return;
    }
    
    if (!email.trim()) {
      setFormStatus('Please enter your email address');
      return;
    }
    
    if (!message.trim()) {
      setFormStatus('Please enter a message');
      return;
    }
    
    // Create mailto: link for email client
    const subject = encodeURIComponent(`Promixa Contact: ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
    
    // Open mail client
    window.location.href = `mailto:cavusmuhammed10@gmail.com?subject=${subject}&body=${body}`;
    
    // Reset form and show status message
    setName('');
    setEmail('');
    setMessage('');
    setFormStatus('Your email client is opening. Please click send in your email client to send the message.');
    
    // Clear status message after 5 seconds
    setTimeout(() => {
      setFormStatus('');
    }, 5000);
  };

  return (
    <section id="contact" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Get in Touch</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Have questions about our services? We&apos;re here to help.
          </p>
        </div>

        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              Contact Us
            </CardTitle>
            <CardDescription>
              Fill out the form below and we&apos;ll get back to you as soon as possible.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium">
                    Name
                  </label>
                  <Input 
                    id="name" 
                    placeholder="Your name" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    Email
                  </label>
                  <div className="flex">
                    <div className="bg-gray-100 flex items-center px-3 rounded-l-md border border-r-0 border-input">
                      <Mail className="h-4 w-4 text-gray-500" />
                    </div>
                    <Input 
                      id="email" 
                      placeholder="your.email@example.com" 
                      className="rounded-l-none" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium">
                  Message
                </label>
                <Textarea 
                  id="message" 
                  placeholder="How can we help you?" 
                  rows={6} 
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </div>
              
              {formStatus && (
                <div className={`p-3 rounded-md text-sm ${formStatus.includes('Please') ? 'bg-amber-50 text-amber-700 border border-amber-200' : 'bg-green-50 text-green-700 border border-green-200'}`}>
                  {formStatus}
                </div>
              )}
              
              <Button className="w-full md:w-auto" type="submit">
                <Send className="mr-2 h-4 w-4" />
                Send Message
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
