
import React from 'react';
import Wizard from '@/components/Wizard';
import { QuestionType } from '@/types/wizard';
import { toast } from 'sonner';

const Index = () => {
  const questions: QuestionType[] = [
    {
      id: 'name',
      title: 'Your Name',
      text: 'Please enter your full name',
      inputType: 'text',
      placeholder: 'John Doe',
      validation: {
        type: 'nonEmpty'
      }
    },
    {
      id: 'email',
      title: 'Email Address',
      text: 'We need your email to contact you',
      inputType: 'email',
      placeholder: 'john@example.com',
      validation: {
        type: 'nonEmpty'
      }
    },
    {
      id: 'age',
      title: 'Your Age',
      text: 'How old are you?',
      inputType: 'number',
      placeholder: '25',
      // Example: Skip the age question if the person hasn't provided their name
      skipCondition: (answers) => !answers.name || answers.name.trim() === ''
    },
    {
      id: 'feedback',
      title: 'Feedback',
      text: 'Please share any additional feedback with us',
      inputType: 'textarea',
      placeholder: 'Type your feedback here...',
      validation: {
        type: 'minLength',
        value: 10
      }
    }
  ];

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
