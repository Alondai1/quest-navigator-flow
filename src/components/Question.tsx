
import React from 'react';
import { QuestionType } from '@/types/wizard';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

interface QuestionProps {
  question: QuestionType;
  value: string;
  onChange: (value: string) => void;
}

const Question: React.FC<QuestionProps> = ({ question, value, onChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className="space-y-6 animate-[fade-in_0.4s_ease-out]">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">{question.title}</h2>
        <p className="text-gray-600 dark:text-gray-300">{question.text}</p>
      </div>
      
      <div className="space-y-3 pt-2">
        <Label htmlFor={question.id} className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {question.title}
        </Label>
        
        {question.inputType === 'textarea' ? (
          <Textarea 
            id={question.id}
            value={value}
            onChange={handleChange}
            placeholder={question.placeholder}
            className="w-full transition-all border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            rows={4}
          />
        ) : (
          <Input
            id={question.id}
            type={question.inputType}
            value={value}
            onChange={handleChange}
            placeholder={question.placeholder}
            className="w-full transition-all border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
          />
        )}
      </div>
    </div>
  );
};

export default Question;
