import { DomainScore, AssessmentRule } from "../../types/screener";
import { AssessmentStrategy } from "./assessmentStrategy.interface";

export class ThresholdAssessmentStrategy implements AssessmentStrategy {
  async recommend(
    domainScores: DomainScore[],
    assessmentRules: AssessmentRule[]
  ): Promise<string[]> {
    const recommendedAssessments = new Set<string>();

    for (const domainScore of domainScores) {
      const rule = assessmentRules.find(
        (rule) => rule.domain === domainScore.domain
      );

      if (rule && domainScore.score >= rule.threshold) {
        recommendedAssessments.add(rule.assessment);
      }
    }

    return Array.from(recommendedAssessments);
  }
}
