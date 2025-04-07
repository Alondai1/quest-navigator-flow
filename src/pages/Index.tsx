
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
      placeholder: 'John Doe'
    },
    {
      id: 'email',
      title: 'Email Address',
      text: 'We need your email to contact you',
      inputType: 'email',
      placeholder: 'john@example.com'
    },
    {
      id: 'age',
      title: 'Your Age',
      text: 'How old are you?',
      inputType: 'number',
      placeholder: '25'
    },
    {
      id: 'feedback',
      title: 'Feedback',
      text: 'Please share any additional feedback with us',
      inputType: 'textarea',
      placeholder: 'Type your feedback here...'
    }
  ];

  const handleComplete = (answers: Record<string, string>) => {
    console.log('Completed with answers:', answers);
    toast.success('Questionnaire completed!');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8">Questionnaire</h1>
        <Wizard 
          questions={questions} 
          onComplete={handleComplete} 
        />
      </div>
    </div>
  );
};

export default Index;
