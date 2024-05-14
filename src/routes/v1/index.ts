import express from "express"
import { StatusCodes } from "http-status-codes"
import { boardRouter } from "./boardRoute"

const Router = express.Router()

Router.get("/status", (req, res) => {
  //check api v1 status
  res.status(StatusCodes.OK).json({ message: "api v1 are ready to use" })
})

//boards APIS all before /vi/boards
Router.use("/boards", boardRouter)

//export Router set name is APIs_V1
export const APIs_V1 = Router
