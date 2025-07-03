"use client";

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ArrowRight, Mail, Phone, MapPin } from 'lucide-react';
import React, { useState } from 'react';

const contactInfo = [
  {
    icon: Mail,
    title: "Email Us",
    details: ["hello@devtechai.com", "support@devtechai.com"],
    color: "purple"
  },
  {
    icon: Phone,
    title: "Call Us",
    details: ["+1 (555) 123-4567", "Mon-Fri 9AM-6PM EST"],
    color: "blue"
  },
  {
    icon: MapPin,
    title: "Visit Us",
    details: ["123 AI Innovation Drive", "San Francisco, CA 94105"],
    color: "green"
  }
];

const colorClasses = {
  purple: 'from-purple-100 to-purple-200 text-purple-600',
  blue: 'from-blue-100 to-blue-200 text-blue-600',
  green: 'from-green-100 to-green-200 text-green-600',
};

export default function ContactSection() {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string|null>(null);
  const [error, setError] = useState<string|null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(null);
    setError(null);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      if (res.ok) {
        setSuccess('Message sent successfully!');
        setForm({ firstName: '', lastName: '', email: '', company: '', message: '' });
      } else {
        const data = await res.json();
        setError(data.error || 'Failed to send message.');
      }
    } catch (err) {
      setError('Failed to send message.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-purple-50 to-blue-50 relative overflow-hidden">
      {/* 3D Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-48 h-48 bg-gradient-to-br from-purple-200/20 to-blue-200/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-gradient-to-br from-blue-200/20 to-purple-200/20 rounded-full blur-2xl animate-pulse" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center space-y-4 mb-16">
          <Badge className="bg-purple-100 text-purple-700 hover:bg-purple-200 transform hover:scale-105 transition-all duration-300">
            Get In Touch
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
            Ready to Transform Your Business?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Let's discuss how AI can drive growth and innovation in your organization. 
            Our experts are ready to help you get started.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div className="space-y-8">
            <Card className="border-0 bg-white/80 backdrop-blur-sm shadow-lg transform hover:scale-105 hover:shadow-xl transition-all duration-500">
              <CardHeader>
                <CardTitle className="text-2xl text-gray-900">Send us a message</CardTitle>
                <CardDescription>
                  Fill out the form below and our team will get back to you within 24 hours.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">First Name</label>
                      <Input 
                        name="firstName"
                        value={form.firstName}
                        onChange={handleChange}
                        placeholder="John" 
                        className="border-gray-200 focus:border-purple-500 transform hover:scale-105 transition-all duration-300" 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Last Name</label>
                      <Input 
                        name="lastName"
                        value={form.lastName}
                        onChange={handleChange}
                        placeholder="Doe" 
                        className="border-gray-200 focus:border-purple-500 transform hover:scale-105 transition-all duration-300" 
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Email</label>
                    <Input 
                      name="email"
                      type="email" 
                      value={form.email}
                      onChange={handleChange}
                      placeholder="john@company.com" 
                      className="border-gray-200 focus:border-purple-500 transform hover:scale-105 transition-all duration-300" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Company</label>
                    <Input 
                      name="company"
                      value={form.company}
                      onChange={handleChange}
                      placeholder="Your Company Name" 
                      className="border-gray-200 focus:border-purple-500 transform hover:scale-105 transition-all duration-300" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Message</label>
                    <Textarea 
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Tell us about your project or how we can help..." 
                      className="border-gray-200 focus:border-purple-500 min-h-[120px] transform hover:scale-105 transition-all duration-300"
                    />
                  </div>
                  {success && <div className="text-green-600 font-medium">{success}</div>}
                  {error && <div className="text-red-600 font-medium">{error}</div>}
                  <Button type="submit" disabled={loading} className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white transform hover:scale-105 hover:shadow-lg transition-all duration-300">
                    {loading ? 'Sending...' : 'Send Message'}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-8">
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-900">Get in touch</h3>
              <p className="text-gray-600 leading-relaxed">
                Ready to start your AI journey? Our team of experts is here to help you 
                understand how artificial intelligence can transform your business operations 
                and drive growth.
              </p>
            </div>

            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <div key={index} className="flex items-start space-x-4 group transform hover:scale-105 transition-all duration-300">
                  <div className={`w-12 h-12 bg-gradient-to-br ${colorClasses[info.color as keyof typeof colorClasses]} rounded-lg flex items-center justify-center group-hover:scale-125 group-hover:rotate-12 transition-all duration-500`}>
                    <info.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1 group-hover:text-purple-700 transition-colors duration-300">
                      {info.title}
                    </h4>
                    {info.details.map((detail, i) => (
                      <p key={i} className="text-gray-600">{detail}</p>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-purple-100 transform hover:scale-105 hover:shadow-lg transition-all duration-500">
              <h4 className="font-semibold text-gray-900 mb-3">Schedule a Free Consultation</h4>
              <p className="text-gray-600 mb-4">
                Book a 30-minute call with our AI experts to discuss your specific needs and explore potential solutions.
              </p>
              <Button 
                variant="outline" 
                className="border-purple-200 text-purple-700 hover:bg-purple-50 transform hover:scale-105 transition-all duration-300"
              >
                Book Now
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}