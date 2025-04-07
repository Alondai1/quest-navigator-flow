
import React, { useState, useEffect } from 'react';
import { WizardProps } from '@/types/wizard';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';
import Question from './Question';

const Wizard: React.FC<WizardProps> = ({ questions, onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [progress, setProgress] = useState(0);
  
  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === questions.length - 1;
  
  useEffect(() => {
    // Calculate progress percentage
    setProgress((currentStep / (questions.length - 1)) * 100);
  }, [currentStep, questions.length]);
  
  const handleNext = () => {
    if (isLastStep) {
      onComplete?.(answers);
      return;
    }
    
    setCurrentStep((prev) => prev + 1);
  };
  
  const handleBack = () => {
    if (!isFirstStep) {
      setCurrentStep((prev) => prev - 1);
    }
  };
  
  const handleAnswerChange = (value: string) => {
    const currentQuestion = questions[currentStep];
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: value,
    }));
  };
  
  const currentQuestion = questions[currentStep];
  const currentAnswer = answers[currentQuestion.id] || '';
  
  return (
    <div className="w-full max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      {/* Progress bar */}
      <div className="w-full h-2 bg-gray-200 rounded-full mb-6">
        <div 
          className="h-full bg-blue-500 rounded-full transition-all duration-300 ease-in-out"
          style={{ width: `${progress}%` }}
        />
      </div>
      
      {/* Step indicator */}
      <div className="text-sm text-gray-500 mb-6">
        Step {currentStep + 1} of {questions.length}
      </div>
      
      {/* Question */}
      <Question 
        question={currentQuestion}
        value={currentAnswer}
        onChange={handleAnswerChange}
      />
      
      {/* Navigation buttons */}
      <div className="flex justify-between mt-8">
        <Button
          variant="outline"
          onClick={handleBack}
          disabled={isFirstStep}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
        
        <Button 
          onClick={handleNext}
          className="flex items-center gap-2"
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
    </div>
  );
};

export default Wizard;
