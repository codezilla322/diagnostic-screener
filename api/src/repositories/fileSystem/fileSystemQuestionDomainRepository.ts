import fs from "node:fs/promises";
import path from "node:path";
import { QuestionDomainMapping } from "../../types/screener";
import { QuestionDomainRepository } from "../interfaces/questionDomainRepository.interface";

export class FileSystemQuestionDomainRepository
  implements QuestionDomainRepository
{
  private filePath: string;

  constructor(fileName: string = "questionDomainMappings.json") {
    this.filePath = path.join(__dirname, "../../../data", fileName);
  }

  private async ensureFileExists(): Promise<void> {
    try {
      await fs.access(this.filePath);
    } catch (error) {
      const dirPath = path.dirname(this.filePath);
      await fs.mkdir(dirPath, { recursive: true });
      await fs.writeFile(this.filePath, JSON.stringify([]));
    }
  }

  private async readFile(): Promise<QuestionDomainMapping[]> {
    await this.ensureFileExists();
    const data = await fs.readFile(this.filePath, "utf8");
    return JSON.parse(data);
  }

  private async writeFile(data: QuestionDomainMapping[]): Promise<void> {
    await this.ensureFileExists();
    await fs.writeFile(this.filePath, JSON.stringify(data, null, 2));
  }

  async getAll(): Promise<QuestionDomainMapping[]> {
    return this.readFile();
  }

  async getById(id: string): Promise<QuestionDomainMapping | null> {
    const mappings = await this.readFile();
    return mappings.find((mapping) => mapping.question_id === id) || null;
  }

  async add(item: QuestionDomainMapping): Promise<QuestionDomainMapping> {
    const mappings = await this.readFile();
    mappings.push(item);
    await this.writeFile(mappings);
    return item;
  }

  async update(
    id: string,
    item: QuestionDomainMapping
  ): Promise<QuestionDomainMapping | null> {
    const mappings = await this.readFile();
    const index = mappings.findIndex((mapping) => mapping.question_id === id);

    if (index === -1) return null;

    mappings[index] = item;
    await this.writeFile(mappings);
    return item;
  }

  async delete(id: string): Promise<boolean> {
    const mappings = await this.readFile();
    const filteredMappings = mappings.filter(
      (mapping) => mapping.question_id !== id
    );

    if (filteredMappings.length === mappings.length) return false;

    await this.writeFile(filteredMappings);
    return true;
  }

  async getByQuestionId(
    questionId: string
  ): Promise<QuestionDomainMapping | null> {
    return this.getById(questionId);
  }

  async getByDomain(domain: string): Promise<QuestionDomainMapping[]> {
    const mappings = await this.readFile();
    return mappings.filter((mapping) => mapping.domain === domain);
  }
}
