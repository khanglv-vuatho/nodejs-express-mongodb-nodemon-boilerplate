import { cloneDeep } from "lodash"
import { Request } from "express"
import { ObjectId } from "mongodb"
import { StatusCodes } from "http-status-codes"
import ApiError from "@/utils/ApiError"
import { boardModel } from "@/models/boardModel"

const createNew = async (reqBody: Request) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const newBoard = {
      ...reqBody,
      slug: "khang-test",
    }

    const createdBoard = await boardModel.createNew(newBoard)

    const getNewBoard = await boardModel.findOneById(createdBoard.insertedId)

    return getNewBoard
  } catch (error) {
    throw error
  }
}

export const boardService = {
  createNew,
}
