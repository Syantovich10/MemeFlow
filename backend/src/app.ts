import express from "express"
import cors from "cors"
import ApiRoutes from "./routes/api.routes";
import VideoRouter from "./routes/video.routes";

const app = express()

app.use(cors({
    origin: "http://localhost:3000",
}))



app.use("/api", ApiRoutes)
app.use("/video", VideoRouter)



export default app