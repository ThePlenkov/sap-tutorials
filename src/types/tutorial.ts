export interface Tutorial {
  id: string;
  slug: string;
  body: string;
  collection: string;
  data: {
    title: string;
    description: string;
  };
}

export interface TutorialTask {
  slug: string;
  data: {
    title: string;
    description: string;
  };
}

export interface TutorialGroup {
  title: string;
  description: string;
  tutorials: string[];
}

export interface TutorialGroups {
  [key: string]: TutorialGroup;
}

export interface TutorialConfig {
  [key: string]: {
    tasks: string[];
    quizzes?: {
      [key: string]: QuizQuestion[];
    };
  };
}

export interface QuizQuestion {
  text: string;
  options: {
    text: string;
    correct: boolean;
  }[];
}