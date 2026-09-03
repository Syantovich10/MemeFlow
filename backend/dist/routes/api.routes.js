"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const api_controller_1 = require("../controllers/api.controller");
// @ts-ignore
const router = new express_1.Router();
router.get("/categories", api_controller_1.getSearchCategories);
router.get("/platforms", api_controller_1.getVideoPlatforms);
router.get("/searches", api_controller_1.getPopularSearches);
exports.default = router;
