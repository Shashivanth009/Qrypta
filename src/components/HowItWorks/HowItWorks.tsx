import React from 'react';
import { Upload, Search, QrCode, Shield } from 'lucide-react';
import Step from './Step';

const steps = [
  {
    icon: Upload,
    title: 'Upload Certificate',
    description: 'Upload your digital certificate in any format. Our AI system automatically extracts and validates the information.'
  },
  {
    icon: Shield,
    title: 'Secure Storage',
    description: 'Your certificate is encrypted and stored on the blockchain, ensuring tamper-proof security and authenticity.'
  },
  {
    icon: QrCode,
    title: 'Generate QR Code',
    description: 'Receive a unique QR code for your certificate that can be easily shared and verified by anyone.'
  },
  {
    icon: Search,
    title: 'Instant Verification',
    description: "Scan the QR code to instantly verify the certificate's authenticity and view its blockchain record."
  }
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 id="how-qrypta-works" className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            How Qrypta Works
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Secure your certificates in four simple steps
          </p>
        </div>

        <div className="grid gap-12 max-w-3xl mx-auto">
          {steps.map((step, index) => (
            <Step
              key={index}
              icon={step.icon}
              title={step.title}
              description={step.description}
              step={index + 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
