import { NextFunction, Request, Response } from "express";
import { ScreenerRequest } from "../types/screener";

export const validateScreenerRequest = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { answers } = req.body as Partial<ScreenerRequest>;

  if (!answers) {
    res.status(400).json({ error: "Missing answers field in request body" });
    return;
  }

  if (!Array.isArray(answers)) {
    res.status(400).json({ error: "Answers must be an array" });
    return;
  }

  for (const [index, answer] of answers.entries()) {
    if (typeof answer !== "object" || answer === null) {
      res
        .status(400)
        .json({ error: `Answer at index ${index} must be an object` });
      return;
    }

    if (!("value" in answer) || typeof answer.value !== "number") {
      res
        .status(400)
        .json({ error: `Answer at index ${index} must have a numeric value` });
      return;
    }

    if (!("question_id" in answer) || typeof answer.question_id !== "string") {
      res.status(400).json({
        error: `Answer at index ${index} must have a question_id string`,
      });
      return;
    }

    if (answer.value < 0 || answer.value > 4) {
      res.status(400).json({
        error: `Answer at index ${index} has invalid value. Must be between 0 and 4`,
      });
      return;
    }
  }

  next();
};
