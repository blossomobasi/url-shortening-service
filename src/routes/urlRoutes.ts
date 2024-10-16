import express from "express";
import {
    createShortURL,
    deleteShortURL,
    getAllUrls,
    getOriginalURL,
    statsOnShortURL,
    updateShortURL,
} from "../controllers/url.controller";
const router = express.Router();

router.route("/create").post(createShortURL);
router.route("/").get(getAllUrls).patch(updateShortURL).delete(deleteShortURL);
router.route("/original-url").post(getOriginalURL);
router.route("/stats").get(statsOnShortURL);
export default router;
