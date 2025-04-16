import path from "node:path";
import fs from "node:fs/promises";
import { createApp } from "./app";
import "dotenv/config";
import { FileSystemQuestionDomainRepository } from "./repositories/fileSystem/fileSystemQuestionDomainRepository";

const PORT = process.env.PORT || 3000;

const initializeData = async () => {
  const questionDomainRepository = new FileSystemQuestionDomainRepository();

  try {
    const mappings = await questionDomainRepository.getAll();

    if (mappings.length === 0) {
      const initialMappings = [
        { question_id: "question_a", domain: "depression" },
        { question_id: "question_b", domain: "depression" },
        { question_id: "question_c", domain: "mania" },
        { question_id: "question_d", domain: "mania" },
        { question_id: "question_e", domain: "anxiety" },
        { question_id: "question_f", domain: "anxiety" },
        { question_id: "question_g", domain: "anxiety" },
        { question_id: "question_h", domain: "substance_use" },
      ];

      const dataDir = path.join(__dirname, "../data");
      await fs.mkdir(dataDir, { recursive: true });

      for (const mapping of initialMappings) {
        await questionDomainRepository.add(mapping);
      }

      console.log("Initial question domain mappings created");
    }
  } catch (error) {
    console.error("Error initializing data:", error);
    process.exit(1);
  }
};

const startServer = async () => {
  try {
    await initializeData();

    const app = createApp();

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
