
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';

interface NavigationButtonsProps {
  isFirstStep: boolean;
  isLastStep: boolean;
  isCurrentQuestionValid: boolean;
  onBack: () => void;
  onNext: () => void;
}

const NavigationButtons: React.FC<NavigationButtonsProps> = ({
  isFirstStep,
  isLastStep,
  isCurrentQuestionValid,
  onBack,
  onNext
}) => {
  return (
    <div className="flex justify-end mt-10 gap-3">
      <Button
        variant="outline"
        onClick={onBack}
        disabled={isFirstStep}
        className="flex items-center gap-2 transition-all hover:bg-gray-100 dark:hover:bg-gray-700"
      >
        <ArrowLeft className="h-4 w-4" />
        Back
      </Button>
      
      <Button 
        onClick={onNext}
        disabled={!isCurrentQuestionValid}
        className={`flex items-center gap-2 transition-all ${
          !isCurrentQuestionValid 
            ? 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed' 
            : 'bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white'
        }`}
      >
        {isLastStep ? (
          <>
            Done
            <Check className="h-4 w-4" />
          </>
        ) : (
          <>
            Next
            <ArrowRight className="h-4 w-4" />
          </>
        )}
      </Button>
    </div>
  );
};

export default NavigationButtons;
