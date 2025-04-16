import { FileSystemAssessmentRuleRepository } from "../fileSystem/fileSystemAssessmentRuleRepository";
import { FileSystemQuestionDomainRepository } from "../fileSystem/fileSystemQuestionDomainRepository";
import { AssessmentRuleRepository } from "../interfaces/assessmentRuleRepository.interface";
import { QuestionDomainRepository } from "../interfaces/questionDomainRepository.interface";

export enum RepositoryType {
  FILE_SYSTEM = "fileSystem",
  DATABASE = "database",
}

export class RepositoryFactory {
  static createQuestionDomainRepository(
    type: RepositoryType
  ): QuestionDomainRepository {
    switch (type) {
      case RepositoryType.FILE_SYSTEM:
        return new FileSystemQuestionDomainRepository();
      default:
        throw new Error(`Unsupported repository type: ${type}`);
    }
  }

  static createAssessmentRuleRepository(
    type: RepositoryType
  ): AssessmentRuleRepository {
    switch (type) {
      case RepositoryType.FILE_SYSTEM:
        return new FileSystemAssessmentRuleRepository();
      default:
        throw new Error(`Unsupported repository type: ${type}`);
    }
  }
}
