export interface Tutorial {
  id: string;
  slug: string;
  body: string;
  collection: string;
  data: {
    title: string;
    description: string;
    order?: number;
  };
}

export interface TutorialTask {
  slug: string;
  data: {
    title: string;
    description: string;
    order: number;
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
    order?: number;
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