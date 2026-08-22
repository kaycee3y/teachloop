export interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
}

export interface PathNode {
  id: string;
  title: string;
  summary: string;
  questions: QuizQuestion[];
  explainPrompt: string;
}

export interface LearningPath {
  pathTitle: string;
  nodes: PathNode[];
}

export interface GradeResult {
  score: number;
  hits: string[];
  gaps: string[];
  feedback: string;
}