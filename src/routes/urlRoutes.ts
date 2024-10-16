import express from "express";
import {
    createShortURL,
    deleteShortURL,
    getOriginalURL,
    statsOnShortURL,
    updateShortURL,
} from "../controllers/url.controller";
const router = express.Router();

router.route("/").post(createShortURL);
router.route("/:shortUrl").get(getOriginalURL).patch(updateShortURL).delete(deleteShortURL);
router.route("/:shortUrl/stats").get(statsOnShortURL);
export default router;
