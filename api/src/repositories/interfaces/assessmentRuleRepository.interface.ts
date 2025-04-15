import { AssessmentRule } from "../../types/screener";
import { Repository } from "./repository.interface";

export interface AssessmentRuleRepository extends Repository<AssessmentRule> {
  getByDomain(domain: string): Promise<AssessmentRule | null>;
}
