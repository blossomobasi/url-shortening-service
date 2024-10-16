import { Express, Request, Response } from "express";
import urlRoutes from "./urlRoutes";

export default function routes(app: Express) {
    app.get("/", (req: Request, res: Response) => {
        res.status(200).json({
            status: "success",
            message: "URL Shortening Service",
        });
    });
    app.use("/api/urls/shorten", urlRoutes);

    app.all("*", (req: Request, res: Response) => {
        res.status(404).json({
            status: "fail",
            message: `Can't find ${req.originalUrl} on this server!`,
        });
    });
}
