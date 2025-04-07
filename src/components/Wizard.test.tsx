
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, test, expect, beforeEach, vi } from 'vitest';
import Wizard from './Wizard';
import { QuestionType } from '@/types/wizard';

describe('Wizard Component', () => {
  const mockQuestions: QuestionType[] = [
    {
      id: 'test-question',
      title: 'Test Question',
      text: 'This is a test question',
      inputType: 'text',
      placeholder: 'Enter your answer',
      validation: {
        type: 'nonEmpty'
      }
    },
    {
      id: 'second-question',
      title: 'Second Question',
      text: 'This is another question',
      inputType: 'text',
      placeholder: 'Enter more info'
    }
  ];

  const mockComplete = vi.fn();

  beforeEach(() => {
    mockComplete.mockClear();
  });

  test('Next button is disabled when input is empty and validation is nonEmpty', () => {
    render(
      <Wizard 
        questions={mockQuestions} 
        onComplete={mockComplete} 
      />
    );
    
    // Find the Next button
    const nextButton = screen.getByText('Next', { exact: false });
    
    // Button should be disabled initially with empty input
    expect(nextButton).toBeDisabled();
    
    // Get the input field
    const inputField = screen.getByPlaceholderText('Enter your answer');
    
    // Enter valid text
    fireEvent.change(inputField, { target: { value: 'Test input' } });
    
    // Button should now be enabled
    expect(nextButton).not.toBeDisabled();
    
    // Clear the input
    fireEvent.change(inputField, { target: { value: '' } });
    
    // Button should be disabled again
    expect(nextButton).toBeDisabled();
  });

  test('Next button advances to next question when clicked with valid input', () => {
    render(
      <Wizard 
        questions={mockQuestions} 
        onComplete={mockComplete} 
      />
    );
    
    // Get the input and Next button
    const inputField = screen.getByPlaceholderText('Enter your answer');
    const nextButton = screen.getByText('Next', { exact: false });
    
    // Enter valid input
    fireEvent.change(inputField, { target: { value: 'Valid input' } });
    
    // Click Next
    fireEvent.click(nextButton);
    
    // Should now show the second question
    expect(screen.getByText('Second Question')).toBeInTheDocument();
    expect(screen.queryByText('Test Question')).not.toBeInTheDocument();
  });

  test('Wizard completes when reaching the last question', () => {
    render(
      <Wizard 
        questions={mockQuestions} 
        onComplete={mockComplete} 
      />
    );
    
    // Navigate to first question and submit
    const firstInput = screen.getByPlaceholderText('Enter your answer');
    fireEvent.change(firstInput, { target: { value: 'First answer' } });
    
    const nextButton = screen.getByText('Next', { exact: false });
    fireEvent.click(nextButton);
    
    // Now on second question
    const secondInput = screen.getByPlaceholderText('Enter more info');
    fireEvent.change(secondInput, { target: { value: 'Second answer' } });
    
    // The button should now say "Done" instead of "Next"
    const doneButton = screen.getByText('Done', { exact: false });
    fireEvent.click(doneButton);
    
    // onComplete should be called with the answers
    expect(mockComplete).toHaveBeenCalledTimes(1);
    expect(mockComplete).toHaveBeenCalledWith({
      'test-question': 'First answer',
      'second-question': 'Second answer'
    });
  });
});
