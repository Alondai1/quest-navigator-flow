
import { QuestionType } from '@/types/wizard';

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

export const getQuestions = (): QuestionType[] => {
  return questions;
};

export const getQuestionById = (id: string): QuestionType | undefined => {
  return questions.find(question => question.id === id);
};
