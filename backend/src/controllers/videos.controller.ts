import { Request, Response } from "express";
import { videoService } from "../services/videos.service";

export const videoController = {
    search: async (req: Request, res: Response) => {
       const query = String(req.query.query ?? "");
       if (typeof req.query.maxResults === "number") {
          return res.status(400).json({ error: "Max results must be number" });
       }
       const maxResults = Number(req.query.maxResults ?? 10);



       if(!query) {
           res.status(400).json({ error: "Query parameter is required" });
           return;
       }

       const videos = await videoService.search(query, maxResults);
       res.json({ videos });
    }
}