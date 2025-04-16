import {
  ScreenerAnswer,
  QuestionDomainMapping,
  DomainScore,
} from "../../types/screener";
import { ScoringStrategy } from "./scoringStrategy.interface";

export class DomainSumScoringStrategy implements ScoringStrategy {
  async score(
    answers: ScreenerAnswer[],
    domainMappings: QuestionDomainMapping[]
  ): Promise<DomainScore[]> {
    // Create a map of domains to make lookup faster
    const domainMap = new Map<string, string>();
    domainMappings.forEach((mapping) =>
      domainMap.set(mapping.question_id, mapping.domain)
    );

    // Calculate scores for each domain
    const domainScores: Map<string, number> = new Map();

    for (const answer of answers) {
      const domain = domainMap.get(answer.question_id);

      if (domain) {
        const currentScore = domainScores.get(domain) || 0;
        domainScores.set(domain, currentScore + answer.value);
      }
    }

    // Convert map to array of DomainScore objects
    const result: DomainScore[] = [];
    domainScores.forEach((score, domain) => {
      result.push({ domain, score });
    });

    return result;
  }
}
