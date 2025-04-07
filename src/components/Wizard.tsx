import React, { useState, useEffect } from 'react';
import { WizardProps, Question, QuestionType } from '@/types/wizard';
import QuestionComponent from './Question';
import ProgressBar from './wizard/ProgressBar';
import StepIndicator from './wizard/StepIndicator';
import NavigationButtons from './wizard/NavigationButtons';

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
  
  const shouldSkipQuestion = (questionIndex: number): boolean => {
    if (questionIndex >= questions.length) return false;
    
    const questionToCheck = questions[questionIndex];
    // Convert QuestionType to Question for skipCondition
    const question: Question = {
      title: questionToCheck.title,
      text: questionToCheck.text,
      inputField: questionToCheck.inputType,
      validation: questionToCheck.validation,
      skipCondition: (questionToCheck as any).skipCondition
    };
    
    return question.skipCondition ? question.skipCondition(answers) : false;
  };
  
  const findNextStep = (currentIndex: number): number => {
    let nextIndex = currentIndex + 1;
    
    // Keep moving forward until we find a question that shouldn't be skipped
    // or until we reach the end
    while (nextIndex < questions.length && shouldSkipQuestion(nextIndex)) {
      nextIndex++;
    }
    
    return nextIndex;
  };
  
  const findPreviousStep = (currentIndex: number): number => {
    let prevIndex = currentIndex - 1;
    
    // Keep moving backward until we find a question that shouldn't be skipped
    // or until we reach the beginning
    while (prevIndex >= 0 && shouldSkipQuestion(prevIndex)) {
      prevIndex--;
    }
    
    return Math.max(0, prevIndex);
  };
  
  const handleNext = () => {
    if (isLastStep) {
      onComplete?.(answers);
      return;
    }
    
    const nextStep = findNextStep(currentStep);
    setCurrentStep(nextStep);
  };
  
  const handleBack = () => {
    if (!isFirstStep) {
      const prevStep = findPreviousStep(currentStep);
      setCurrentStep(prevStep);
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
  
  const isCurrentQuestionValid = (): boolean => {
    // Create a Question object from QuestionType
    const question: Question = {
      title: currentQuestion.title,
      text: currentQuestion.text,
      inputField: currentQuestion.inputType
    };
    
    // If there's no validation rule, consider it valid
    if (!question.validation) return true;
    
    // Validate based on validation rules
    switch (question.validation.type) {
      case 'nonEmpty':
        return currentAnswer.trim() !== '';
      case 'minLength':
        return currentAnswer.length >= (question.validation.value || 0);
      default:
        return true;
    }
  };
  
  useEffect(() => {
    if (shouldSkipQuestion(currentStep)) {
      const nextStep = findNextStep(currentStep);
      setCurrentStep(nextStep);
    }
  }, []);
  
  return (
    <div className="w-full max-w-2xl mx-auto p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700">
      <ProgressBar progress={progress} />
      
      <StepIndicator 
        currentStep={currentStep} 
        totalSteps={questions.length} 
        progress={progress} 
      />
      
      <div className="min-h-[280px] flex flex-col">
        <QuestionComponent 
          question={currentQuestion}
          value={currentAnswer}
          onChange={handleAnswerChange}
        />
      </div>
      
      <NavigationButtons 
        isFirstStep={isFirstStep}
        isLastStep={isLastStep}
        isCurrentQuestionValid={isCurrentQuestionValid()}
        onBack={handleBack}
        onNext={handleNext}
      />
    </div>
  );
};

export default Wizard;
