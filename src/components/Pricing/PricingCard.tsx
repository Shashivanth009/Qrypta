import React from 'react';
import { Check } from 'lucide-react';

interface PricingPlan {
  name: string;
  price: string;
  description: string;
  features: string[];
}

interface PricingCardProps {
  plan: PricingPlan;
}

export default function PricingCard({ plan }: PricingCardProps) {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300">
      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
        {plan.name}
      </h3>
      <div className="mb-4">
        <span className="text-4xl font-bold text-indigo-600 dark:text-indigo-400">
          {plan.price}
        </span>
        <span className="text-gray-600 dark:text-gray-400">/month</span>
      </div>
      <p className="text-gray-600 dark:text-gray-400 mb-6">
        {plan.description}
      </p>
      <button className="w-full bg-indigo-600 dark:bg-indigo-700 text-white rounded-lg py-2 px-4 hover:bg-indigo-700 dark:hover:bg-indigo-600 transition-colors mb-6">
        Get Started
      </button>
      <ul className="space-y-3">
        {plan.features.map((feature, index) => (
          <li key={index} className="flex items-center text-gray-600 dark:text-gray-300">
            <Check className="h-5 w-5 text-green-500 mr-2" />
            {feature}
          </li>
        ))}
      </ul>
    </div>
  );
}
