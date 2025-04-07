
import React from 'react';

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
  progress: number;
}

const StepIndicator: React.FC<StepIndicatorProps> = ({ 
  currentStep, 
  totalSteps,
  progress 
}) => {
  return (
    <div className="flex justify-between items-center mb-10">
      <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
        Question {currentStep + 1} of {totalSteps}
      </div>
      
      <div className="text-xs font-medium px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300">
        {Math.round(progress)}% Complete
      </div>
    </div>
  );
};

export default StepIndicator;
