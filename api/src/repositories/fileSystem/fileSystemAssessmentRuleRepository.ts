import fs from "node:fs/promises";
import path from "node:path";
import { AssessmentRule } from "../../types/screener";
import { AssessmentRuleRepository } from "../interfaces/assessmentRuleRepository.interface";

export class FileSystemAssessmentRuleRepository
  implements AssessmentRuleRepository
{
  private filePath: string;

  constructor(fileName: string = "assessmentRules.json") {
    this.filePath = path.join(__dirname, "../../../data", fileName);
  }

  private async ensureFileExists(): Promise<void> {
    try {
      await fs.access(this.filePath);
    } catch (error) {
      const dirPath = path.dirname(this.filePath);
      await fs.mkdir(dirPath, { recursive: true });

      // Initialize with default rules
      const defaultRules: AssessmentRule[] = [
        { domain: "depression", threshold: 2, assessment: "PHQ-9" },
        { domain: "mania", threshold: 2, assessment: "ASRM" },
        { domain: "anxiety", threshold: 2, assessment: "PHQ-9" },
        { domain: "substance_use", threshold: 1, assessment: "ASSIST" },
      ];

      await fs.writeFile(this.filePath, JSON.stringify(defaultRules, null, 2));
    }
  }

  private async readFile(): Promise<AssessmentRule[]> {
    await this.ensureFileExists();
    const data = await fs.readFile(this.filePath, "utf8");
    return JSON.parse(data);
  }

  private async writeFile(data: AssessmentRule[]): Promise<void> {
    await this.ensureFileExists();
    await fs.writeFile(this.filePath, JSON.stringify(data, null, 2));
  }

  async getAll(): Promise<AssessmentRule[]> {
    return this.readFile();
  }

  async getById(id: string): Promise<AssessmentRule | null> {
    const rules = await this.readFile();
    return rules.find((rule) => rule.domain === id) || null;
  }

  async add(item: AssessmentRule): Promise<AssessmentRule> {
    const rules = await this.readFile();
    rules.push(item);
    await this.writeFile(rules);
    return item;
  }

  async update(
    id: string,
    item: AssessmentRule
  ): Promise<AssessmentRule | null> {
    const rules = await this.readFile();
    const index = rules.findIndex((rule) => rule.domain === id);

    if (index === -1) return null;

    rules[index] = item;
    await this.writeFile(rules);
    return item;
  }

  async delete(id: string): Promise<boolean> {
    const rules = await this.readFile();
    const filteredRules = rules.filter((rule) => rule.domain !== id);

    if (filteredRules.length === rules.length) return false;

    await this.writeFile(filteredRules);
    return true;
  }

  async getByDomain(domain: string): Promise<AssessmentRule | null> {
    return this.getById(domain);
  }
}
