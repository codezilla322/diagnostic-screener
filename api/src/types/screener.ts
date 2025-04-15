export interface QuestionDomainMapping {
  question_id: string;
  domain: string;
}

export interface AssessmentRule {
  domain: string;
  threshold: number;
  assessment: string;
}
