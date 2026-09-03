"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.videoController = void 0;
const videos_service_1 = require("../services/videos.service");
exports.videoController = {
    search: async (req, res) => {
        const query = typeof req.query.query === "string"
            ? req.query.query.trim()
            : "";
        const rawMaxResults = req.query.maxResults;
        const maxResults = rawMaxResults === undefined
            ? 10
            : Number(rawMaxResults);
        if (!Number.isInteger(maxResults) ||
            maxResults < 1 ||
            maxResults > 50) {
            return res.status(400).json({
                error: "maxResults must be an integer from 1 to 50",
            });
        }
        if (!query) {
            res.status(400).json({ error: "Query parameter is required" });
            return;
        }
        const videos = await videos_service_1.videoService.search(query, maxResults);
        res.json({ videos });
    }
};
