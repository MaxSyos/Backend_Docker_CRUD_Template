import { Router } from "express"
import { userRoutes } from "./users.routes";
import { fileRoutes } from "./files.routes";

const routes = Router();

routes.use("/users", userRoutes);
routes.use("/file", fileRoutes);

export { routes }
