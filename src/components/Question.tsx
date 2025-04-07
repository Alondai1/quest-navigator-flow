
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
    <div className="space-y-4">
      <div>
        <h2 className="text-2xl font-bold">{question.title}</h2>
        <p className="text-gray-600 mt-1">{question.text}</p>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor={question.id}>{question.title}</Label>
        {question.inputType === 'textarea' ? (
          <Textarea 
            id={question.id}
            value={value}
            onChange={handleChange}
            placeholder={question.placeholder}
            className="w-full"
          />
        ) : (
          <Input
            id={question.id}
            type={question.inputType}
            value={value}
            onChange={handleChange}
            placeholder={question.placeholder}
            className="w-full"
          />
        )}
      </div>
    </div>
  );
};

export default Question;
