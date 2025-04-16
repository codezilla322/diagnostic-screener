import { Request, Response } from "express";
import { ScreenerService } from "../services/screenerService";
import { ScreenerRequest, ScreenerResponse } from "../types/screener";

export class ScreenerController {
  private screenerService: ScreenerService;

  constructor(screenerService: ScreenerService) {
    this.screenerService = screenerService;
  }

  processScreener = async (req: Request, res: Response): Promise<void> => {
    try {
      const { answers } = req.body as ScreenerRequest;

      // Validate request
      if (!answers || !Array.isArray(answers)) {
        res.status(400).json({
          error: "Invalid request format. Expected an array of answers.",
        });
        return;
      }

      // Process answers
      const results = await this.screenerService.processScreenerAnswers(
        answers
      );

      // Return response
      const response: ScreenerResponse = { results };
      res.status(200).json(response);
    } catch (error) {
      console.error("Error processing screener:", error);

      if (
        error instanceof Error &&
        error.message.includes("Invalid answer value")
      ) {
        res.status(400).json({ error: error.message });
        return;
      }

      res
        .status(500)
        .json({ error: "An error occurred while processing the screener." });
    }
  };
}
