"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.videoController = void 0;
const videos_service_1 = require("../services/videos.service");
exports.videoController = {
    search: async (req, res) => {
        const query = String(req.query.query ?? "");
        if (typeof req.query.maxResults === "number") {
            return res.status(400).json({ error: "Max results must be number" });
        }
        const maxResults = Number(req.query.maxResults ?? 10);
        if (!query) {
            res.status(400).json({ error: "Query parameter is required" });
            return;
        }
        const videos = await videos_service_1.videoService.search(query, maxResults);
        res.json({ videos });
    }
};
