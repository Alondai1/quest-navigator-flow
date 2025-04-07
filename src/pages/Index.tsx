
import React from 'react';
import Wizard from '@/components/Wizard';
import { getQuestions } from '@/services/questionService';
import { toast } from 'sonner';

const Index = () => {
  const questions = getQuestions();

  const handleComplete = (answers: Record<string, string>) => {
    console.log('Completed with answers:', answers);
    toast.success('Questionnaire completed!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto mb-12 text-center">
          <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            Interactive Questionnaire
          </h1>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Please complete this short questionnaire to help us understand your needs better. Your information is secure and will only be used to improve our services.
          </p>
        </div>
        <Wizard 
          questions={questions} 
          onComplete={handleComplete} 
        />
      </div>
    </div>
  );
};

export default Index;
