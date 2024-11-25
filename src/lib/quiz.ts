import type { QuizQuestion } from '../types/tutorial';

export class QuizState {
  private questions: QuizQuestion[];
  private answers: number[];

  constructor(questions: QuizQuestion[]) {
    this.questions = questions;
    this.answers = new Array(questions.length).fill(null);
    this.initializeEventListeners();
  }

  private initializeEventListeners() {
    const container = document.getElementById('quiz-container');
    if (!container) return;

    // Handle option selection
    container.addEventListener('change', (e) => {
      const target = e.target as HTMLInputElement;
      if (target.classList.contains('quiz-option')) {
        const questionIndex = parseInt(target.dataset.question!);
        const optionIndex = parseInt(target.value);
        this.answers[questionIndex] = optionIndex;
      }
    });

    // Handle check answers
    const checkButton = document.getElementById('check-answers');
    if (checkButton) {
      checkButton.addEventListener('click', () => this.checkAnswers());
    }
  }

  private checkAnswers() {
    const feedbackElements = document.querySelectorAll('.feedback');
    let allCorrect = true;

    this.answers.forEach((answer, index) => {
      const feedback = feedbackElements[index];
      if (!feedback) return;

      feedback.classList.remove('hidden');
      const correctFeedback = feedback.querySelector('.correct-feedback');
      const incorrectFeedback = feedback.querySelector('.incorrect-feedback');

      if (answer === null) {
        allCorrect = false;
        return;
      }

      const isCorrect = this.questions[index].options[answer].correct;
      if (isCorrect) {
        correctFeedback?.classList.remove('hidden');
        incorrectFeedback?.classList.add('hidden');
      } else {
        correctFeedback?.classList.add('hidden');
        incorrectFeedback?.classList.remove('hidden');
        allCorrect = false;
      }
    });

    const checkButton = document.getElementById('check-answers');
    if (checkButton && allCorrect) {
      checkButton.textContent = '✓ All Correct!';
      checkButton.classList.add('bg-green-600', 'hover:bg-green-700');
      checkButton.classList.remove('bg-blue-600', 'hover:bg-blue-700');
    }
  }
}