export type Question = {
  type: string;
  subtitle?: string;
  question: string;
  options?: string[];
};

export function isAnswerValid(answer: string, question: Question): boolean {
  if (!answer || answer.trim() === '') return false;
  switch (question.type) {
    case 'text': {
      // Allow only letters, spaces, hyphens, apostrophes
      return /^[A-Za-z\s]+$/.test(answer.trim());
    }

    case 'date': {
      const date = new Date(answer);
      return !isNaN(date.getTime());
    }
    case 'select': {
      return question.options?.includes(answer) ?? false;
    }
    case 'email': {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(answer.trim());
    }

    default:
      return false;
  }
}
