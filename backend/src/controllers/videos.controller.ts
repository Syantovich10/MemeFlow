import { Request, Response } from "express";
import { videoService } from "../services/videos.service";

export const videoController = {
    search: async (req: Request, res: Response) => {
        const query =
            typeof req.query.query === "string"
                ? req.query.query.trim()
                : "";
       const rawMaxResults = req.query.maxResults;

       const maxResults =
           rawMaxResults === undefined
                ? 10
                : Number(rawMaxResults);

       if (
            !Number.isInteger(maxResults) ||
            maxResults < 1 ||
            maxResults > 50
       ) {
            return res.status(400).json({
                error: "maxResults must be an integer from 1 to 50",
            });
       }

       if(!query) {
           res.status(400).json({ error: "Query parameter is required" });
           return;
       }

       const videos = await videoService.search(query, maxResults);
       res.json({ videos });
    }
}