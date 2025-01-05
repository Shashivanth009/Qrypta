import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StepProps {
  icon: LucideIcon;
  title: string;
  description: string;
  step: number;
}

export default function Step({ icon: Icon, title, description, step }: StepProps) {
  return (
    <div className="relative flex items-start">
      <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-full bg-indigo-600 text-white">
        {step}
      </div>
      <div className="ml-16">
        <Icon className="h-6 w-6 text-indigo-600 mb-2" />
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{title}</h3>
        <p className="text-gray-600 dark:text-gray-300">{description}</p>
      </div>
    </div>
  );
}