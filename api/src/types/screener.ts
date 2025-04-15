export interface QuestionDomainMapping {
  question_id: string;
  domain: string;
}

export interface AssessmentRule {
  domain: string;
  thresshold: number;
  assessment: string;
}
