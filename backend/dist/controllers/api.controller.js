"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getVideoPlatforms = exports.getPopularSearches = exports.getSearchCategories = void 0;
const data_1 = require("../data/data");
const getSearchCategories = (req, res) => {
    res.json(data_1.searchCategories);
};
exports.getSearchCategories = getSearchCategories;
const getPopularSearches = (req, res) => {
    res.json(data_1.popularSearches);
};
exports.getPopularSearches = getPopularSearches;
const getVideoPlatforms = (req, res) => {
    res.json(data_1.videoPlatforms);
};
exports.getVideoPlatforms = getVideoPlatforms;
