import {
  DomainScore,
  QuestionDomainMapping,
  ScreenerAnswer,
} from "../../types/screener";

export interface ScoringStrategy {
  score(
    answers: ScreenerAnswer[],
    domainMappings: QuestionDomainMapping[]
  ): Promise<DomainScore[]>;
}
