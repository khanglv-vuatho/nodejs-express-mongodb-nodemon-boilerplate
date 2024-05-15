import express from "express"
import exitHook from "async-exit-hook"
import cors from "cors"

import { corsOptions } from "@/config/cors"
import { CLOSE_DB, CONNECT_DB } from "@/config/mongodb"
import { env } from "@/config/environment"
import { errorHandlingMiddleware } from "@/middlewares/errorHandlingMiddleware"
import { APIs_V1 } from "@/routes/v1"

const START_SERVER = async () => {
  const app = express()

  const port = process.env.APP_PORT || 5000

  app.use(cors(corsOptions))

  app.use(express.json())

  app.use("/v1", APIs_V1)

  //middleware xử lí lỗi tập trung
  app.use(errorHandlingMiddleware)

  app.get("/", (req, res) => {
    res.end("<h1>Hello World!</h1>")
  })

  app.listen(process.env.PORT, () => {
    console.log(`Hello World, I am running at http://${env.APP_HOST}:${port}`)
  })

  exitHook(() => {
    console.log("Closing database connection")
    CLOSE_DB()
    console.log("Exiting")
  })
}

;(async () => {
  try {
    await CONNECT_DB()
    START_SERVER()
  } catch (error) {
    console.error(error)
    process.exit(0)
  }
})()
