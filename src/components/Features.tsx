import React from 'react';
import { Shield, Users, Brain, Database, Bell, Palette, Globe, Code, Smartphone, Trophy } from 'lucide-react';

const featuresData = [
  {
    icon: Shield,
    title: 'User Dashboard',
    description: 'Complete overview of your certificates with status tracking and expiry reminders'
  },
  {
    icon: Users,
    title: 'Role-Based Access',
    description: 'Control who can view and verify your certificates with granular permissions'
  },
  {
    icon: Brain,
    title: 'AI-Powered Analysis',
    description: 'Automatic certificate detail extraction and fraud detection using AI'
  },
  {
    icon: Database,
    title: 'Blockchain Integration',
    description: 'Tamper-proof verification using blockchain technology'
  },
  {
    icon: Bell,
    title: 'Real-Time Notifications',
    description: 'Instant alerts for certificate access and verification attempts'
  },
  {
    icon: Palette,
    title: 'Custom QR Codes',
    description: 'Personalize QR codes with your brand colors and logos'
  },
  {
    icon: Globe,
    title: 'Multilingual Support',
    description: 'Access Qrypta in multiple languages for global accessibility'
  },
  {
    icon: Code,
    title: 'API Integration',
    description: 'Seamlessly integrate certificate verification into your systems'
  },
  {
    icon: Smartphone,
    title: 'Mobile App',
    description: 'Access your certificates and verify on the go with our mobile app'
  },
  {
    icon: Trophy,
    title: 'Gamification',
    description: 'Earn badges and track verification metrics with our rewards system'
  }
];

export default function Features() {
  return (
    <section id="features" className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Key Features</h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">Explore the features that make Qrypta the best choice for your certificate management.</p>
        </div>
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {featuresData.map((feature) => (
            <div key={feature.title} className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md animate-slide-up">
              <div className="flex items-center mb-4">
                <feature.icon className="h-6 w-6 text-indigo-600 dark:text-indigo-400 mr-2" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{feature.title}</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
