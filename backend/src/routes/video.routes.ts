import { Router } from "express";
import { videoController } from "../controllers/videos.controller"

const router = Router();

router.get("/search", videoController.search);