import { Router } from "express";
import { ScreenerController } from "../controllers/screenerController";
import { validateScreenerRequest } from "../middleware/validateScreenerRequest";

export const createScreenerRouter = (
  screenerController: ScreenerController
): Router => {
  const router = Router();

  router.post(
    "/process",
    validateScreenerRequest,
    screenerController.processScreener
  );

  return router;
};
