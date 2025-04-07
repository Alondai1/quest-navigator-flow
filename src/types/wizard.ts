
export interface QuestionType {
  id: string;
  title: string;
  text: string;
  inputType: 'text' | 'number' | 'email' | 'textarea';
  placeholder?: string;
}

export interface WizardProps {
  questions: QuestionType[];
  onComplete?: (answers: Record<string, string>) => void;
}
