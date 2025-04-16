export interface QuestionDomainMapping {
  question_id: string;
  domain: string;
}

export interface AssessmentRule {
  domain: string;
  threshold: number;
  assessment: string;
}

export interface ScreenerAnswer {
  value: number;
  question_id: string;
}

export interface DomainScore {
  domain: string;
  score: number;
}

export interface ScreenerRequest {
  answers: ScreenerAnswer[];
}

export interface ScreenerResponse {
  results: string[];
}
