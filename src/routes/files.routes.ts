import { Router } from "express";
import { CreateFileController } from "../modules/fileReader/useCases/filesControllers/CreateFileController";
import { ensureAuthenticated } from "../shared/middleware/ensureAuthenticated";
import { uploadMiddleware } from "../shared/middleware/multer";

const fileRoutes = Router();

const createFile = new CreateFileController();

fileRoutes.post("/", uploadMiddleware, createFile.handle  );

export { fileRoutes };