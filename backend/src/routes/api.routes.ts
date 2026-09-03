import { Router } from "express";

import {
    getVideoPlatforms,
    getPopularSearches,
    getSearchCategories
} from "../controllers/api.controller";

// @ts-ignore
const router = new Router();


router.get("/categories", getSearchCategories);
router.get("/platforms", getVideoPlatforms);
router.get("/searches", getPopularSearches);

export default router;