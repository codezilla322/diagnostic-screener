import express, { Application } from "express";
import {
  RepositoryFactory,
  RepositoryType,
} from "./repositories/factories/repositoryFactory";
import { DomainSumScoringStrategy } from "./strategies/scoring/domainSumScoringStrategy";
import { ThresholdAssessmentStrategy } from "./strategies/assessment/thresholdAssessmentStrategy";
import { ScreenerService } from "./services/screenerService";
import { ScreenerController } from "./controllers/screenerController";
import { requestLogger } from "./middleware/requestLogger";
import { createScreenerRouter } from "./routes/screenerRoutes";
import { errorHandler } from "./middleware/errorHandler";

export const createApp = (): Application => {
  // Create repositories
  const questionDomainRepository =
    RepositoryFactory.createQuestionDomainRepository(
      RepositoryType.FILE_SYSTEM
    );
  const assessmentRuleRepository =
    RepositoryFactory.createAssessmentRuleRepository(
      RepositoryType.FILE_SYSTEM
    );

  // Create strategies
  const scoringStrategy = new DomainSumScoringStrategy();
  const assessmentStrategy = new ThresholdAssessmentStrategy();

  // Create service
  const screenerService = new ScreenerService(
    questionDomainRepository,
    assessmentRuleRepository,
    scoringStrategy,
    assessmentStrategy
  );

  // Create controller
  const screenerController = new ScreenerController(screenerService);

  // Express app instance
  const app = express();

  // Middleware
  app.use(express.json());
  app.use(requestLogger);

  // Routes
  app.use("/api/v1/screener", createScreenerRouter(screenerController));

  // Error handling
  app.use(errorHandler);

  return app;
};
