import { AssessmentRuleRepository } from "../repositories/interfaces/assessmentRuleRepository.interface";
import { QuestionDomainRepository } from "../repositories/interfaces/questionDomainRepository.interface";
import { AssessmentStrategy } from "../strategies/assessment/assessmentStrategy.interface";
import { ScoringStrategy } from "../strategies/scoring/scoringStrategy.interface";
import { ScreenerAnswer } from "../types/screener";

export class ScreenerService {
  private questionDomainRepository: QuestionDomainRepository;
  private assessmentRuleRepository: AssessmentRuleRepository;
  private scoringStrategy: ScoringStrategy;
  private assessmentStrategy: AssessmentStrategy;

  constructor(
    questionDomainRepository: QuestionDomainRepository,
    assessmentRuleRepository: AssessmentRuleRepository,
    scoringStrategy: ScoringStrategy,
    assessmentStrategy: AssessmentStrategy
  ) {
    this.questionDomainRepository = questionDomainRepository;
    this.assessmentRuleRepository = assessmentRuleRepository;
    this.scoringStrategy = scoringStrategy;
    this.assessmentStrategy = assessmentStrategy;
  }

  async processScreenerAnswers(answers: ScreenerAnswer[]): Promise<string[]> {
    // Validate input
    this.validateAnswers(answers);

    // Get domain mappings
    const domainMappings = await this.questionDomainRepository.getAll();

    // Get assessment rules
    const assessmentRules = await this.assessmentRuleRepository.getAll();

    // Score answers by domain
    const domainScores = await this.scoringStrategy.score(
      answers,
      domainMappings
    );

    // Recommend assessments
    const recommendedAssessments = await this.assessmentStrategy.recommend(
      domainScores,
      assessmentRules
    );

    return recommendedAssessments;
  }

  private validateAnswers(answers: ScreenerAnswer[]): void {
    for (const answer of answers) {
      if (answer.value < 0 || answer.value > 4) {
        throw new Error(
          `Invalid answer value for question ${answer.question_id}. Values must be between 0 and 4`
        );
      }
    }
  }
}
