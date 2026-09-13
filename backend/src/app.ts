import express, { type NextFunction, type Request, type Response } from "express"
import cors from "cors"


import ApiRoutes from "./routes/api.routes";
import VideoRouter from "./routes/video.routes";

const app = express()

app.use(cors({
    origin: ["http://localhost:3000", "http://192.168.100.9:3000"],
}))

app.use("/api", ApiRoutes)
app.use("/video", VideoRouter)

app.use((_req: Request, res: Response) => {
    res.status(404).json({ error: "Not Found" });
});



export default app
