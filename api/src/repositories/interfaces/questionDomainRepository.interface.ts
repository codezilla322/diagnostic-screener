import { QuestionDomainMapping } from "../../types/screener";
import { Repository } from "./repository.interface";

export interface QuestionDomainRepository
  extends Repository<QuestionDomainMapping> {
  getByQuestionId(questionId: string): Promise<QuestionDomainMapping | null>;
  getByDomain(domain: string): Promise<QuestionDomainMapping[]>;
}
