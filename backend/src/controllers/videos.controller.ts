import { Request, Response } from "express";


export const videoController = {
    search: (req: Request, res: Response) => {
       const query = String(req.query.query ?? "");
       const maxResults = Number(req.query.maxResults ?? 0);
    }
}