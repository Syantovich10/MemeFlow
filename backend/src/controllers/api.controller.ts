import type { Request, Response } from "express";
import {
    searchCategories,
    videoPlatforms,
    popularSearches
} from "../data/data";

export const getSearchCategories = (
    req: Request,
    res: Response
) => {
    res.json(searchCategories);
};

export const getPopularSearches = (
    req: Request,
    res: Response
) => {
    res.json(popularSearches);
};

export const getVideoPlatforms = (
    req: Request,
    res: Response
) => {
    res.json(videoPlatforms);
};