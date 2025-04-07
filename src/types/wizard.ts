
export interface QuestionType {
  id: string;
  title: string;
  text: string;
  inputType: 'text' | 'number' | 'email' | 'textarea';
  placeholder?: string;
}

export interface Question {
  title: string;
  text: string;
  inputField: string;
  validation?: {
    type: 'nonEmpty' | 'minLength';
    value?: number;
  };
  skipCondition?: (answers: Record<string, string>) => boolean;
}

export interface WizardProps {
  questions: QuestionType[];
  onComplete?: (answers: Record<string, string>) => void;
}
