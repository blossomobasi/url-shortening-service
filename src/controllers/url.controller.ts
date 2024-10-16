import { generateShortenedURL } from "../utils";
import URL from "../models/url.model";
import { Request, Response } from "express";

export const createShortURL = async (req: Request, res: Response): Promise<void> => {
    try {
        const { url } = req.body;
        const shortUrl = await URL.create({ originalUrl: url });

        res.status(201).json({
            status: "success",
            data: shortUrl,
        });
    } catch (error: any) {
        res.status(500).json({
            status: "fail",
            message: error.message,
        });
    }
};
export const getOriginalURL = async (req: Request, res: Response): Promise<void> => {
    try {
        const shortUrl = req.params.shortUrl;
        if (!shortUrl) {
            res.status(400).json({
                status: "fail",
                message: "Please provide a short URL",
            });
            return;
        }
        const originalUrl = await URL.findOne({ shortenedUrl: shortUrl });
        if (!originalUrl) {
            res.status(404).json({
                status: "fail",
                message: "URL not found",
            });
            return;
        }
        originalUrl.clicks++;
        await originalUrl.save();

        res.status(200).json({
            status: "success",
            data: { originalUrl },
        });
    } catch (err: any) {
        res.status(500).json({
            status: "fail",
            message: err.message,
        });
    }
};

export const updateShortURL = async (req: Request, res: Response): Promise<void> => {
    try {
        const shortUrl = req.params.shortUrl;
        const { newUrl } = req.body;
        if (!shortUrl || !newUrl) {
            res.status(400).json({
                status: "fail",
                message: "Please provide a short URL and a new URL",
            });
            return;
        }

        const url = await URL.findOne({ shortenedUrl: shortUrl });
        let updatedShortUrl;

        if (!url) {
            res.status(404).json({
                status: "fail",
                message: "URL not found",
            });
            return;
        }

        if (url) {
            url.shortenedUrl = generateShortenedURL();
            updatedShortUrl = await url.save();
        }

        res.status(200).json({
            status: "success",
            data: updatedShortUrl,
        });
    } catch (err: any) {
        res.status(500).json({
            status: "fail",
            message: err.message,
        });
    }
};

export const deleteShortURL = async (req: Request, res: Response): Promise<void> => {
    try {
        const shortUrl = req.params.shortUrl;
        if (!shortUrl) {
            res.status(400).json({
                status: "fail",
                message: "Please provide a short URL",
            });
            return;
        }

        const deletedUrl = await URL.findOneAndDelete({ shortenedUrl: shortUrl });
        if (!deletedUrl) {
            res.status(404).json({
                status: "fail",
                message: "URL not found",
            });
            return;
        }

        res.status(204).json({
            status: "success",
            data: null,
        });
    } catch (err: any) {
        res.status(500).json({
            status: "fail",
            message: err.message,
        });
    }
};

// Number of time the short URL was accessed
export const statsOnShortURL = async (req: Request, res: Response): Promise<void> => {
    try {
        const { shortUrl } = req.body;
        if (!shortUrl) {
            res.status(400).json({
                status: "fail",
                message: "Please provide a short URL",
            });
            return;
        }

        const url = await URL.findOne({ shortenedUrl: shortUrl });
        if (!url) {
            res.status(404).json({
                status: "fail",
                message: "URL not found",
            });
            return;
        }

        res.status(200).json({
            status: "success",
            data: {
                shortUrl,
                clicks: url.clicks,
            },
        });
    } catch (err: any) {
        res.status(500).json({
            status: "fail",
            message: err.message,
        });
    }
};
