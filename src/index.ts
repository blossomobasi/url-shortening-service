import express from "express";
import connectDB from "./db/db";
import routes from "./routes/routes";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

routes(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT, async () => {
    await connectDB();
    console.log(`Server running on port ${PORT}`);
});
