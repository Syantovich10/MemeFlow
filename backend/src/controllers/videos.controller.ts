import { Request, Response } from "express";
import { videoService } from "../services/videos.service";

export const videoController = {
    search: async (req: Request, res: Response) => {
       const query = String(req.query.query ?? "");
       const maxResults = Number(req.query.maxResults ?? 0);

       if(!query) {
           res.status(400).json({ error: "Query parameter is required" });
           return;
       }

       const videos = await videoService.search(query, maxResults);
       res.json({ videos });
    }
}