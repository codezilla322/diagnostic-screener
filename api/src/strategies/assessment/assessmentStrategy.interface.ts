import { AssessmentRule, DomainScore } from "../../types/screener";

export interface AssessmentStrategy {
  recommend(
    domainScores: DomainScore[],
    assessmentRules: AssessmentRule[]
  ): Promise<string[]>;
}
