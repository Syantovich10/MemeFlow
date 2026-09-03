"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const videos_controller_1 = require("../controllers/videos.controller");
const router = (0, express_1.Router)();
router.get("/search", videos_controller_1.videoController.search);
exports.default = router;
