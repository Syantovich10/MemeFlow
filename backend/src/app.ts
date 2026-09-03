import express from "express"
import cors from "cors"
import ApiRoutes from "./routes/api.routes";

const app = express()

app.use(cors({
    origin: "http://localhost:3000",
}))

app.use("/api", ApiRoutes)

export default app