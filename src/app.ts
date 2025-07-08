import express, { Response } from "express";
import router from "./routes";

const app = express();
router(app);

export default app;
