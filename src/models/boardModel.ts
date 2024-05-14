import Joi from "joi"
import { ObjectId } from "mongodb"
import { GET_DB } from "@/config/mongodb"
import { BOARD_TYPES } from "@/utils/constants"

const BOARD_COLLECTION_NAME = "boards"
const BOARD_COLLECTION_SCHEMA = Joi.object({
  title: Joi.string().required().min(3).max(50).trim().strict(),
  slug: Joi.string().required().min(3).trim().strict(),
  ownerId: Joi.string().required().min(3).max(50).trim().strict().email(),
  description: Joi.string().required().min(3).max(256).trim().strict(),
  columnOrderIds: Joi.array().items(Joi.string()).default([]),
  type: Joi.string().valid(BOARD_TYPES.PUBLIC, BOARD_TYPES.PRIVATE).required(),
  createAt: Joi.date()
    .timestamp("javascript")
    .default(() => new Date()),
  updateAt: Joi.date().timestamp("javascript").default(null),
  _destroy: Joi.boolean().default(false),
})

const INVALID_UPDATE_FIELDS = ["_id", "updateAt"]

const validateBeforeCreate = async (data: any) => {
  return await BOARD_COLLECTION_SCHEMA.validateAsync(data, { abortEarly: false })
}

const createNew = async (data: any) => {
  try {
    const db = await GET_DB()
    const validData = await validateBeforeCreate(data)
    const createBoard = await db.collection(BOARD_COLLECTION_NAME).insertOne(validData)
    return createBoard
  } catch (error: any) {
    throw new Error(error)
  }
}

const findOneById = async (boardId: ObjectId) => {
  try {
    const db = await GET_DB()
    const createBoard = await db.collection(BOARD_COLLECTION_NAME).findOne({
      _id: new ObjectId(boardId),
    })
    return createBoard
  } catch (error: any) {
    throw new Error(error)
  }
}

export const boardModel = {
  BOARD_COLLECTION_NAME,
  BOARD_COLLECTION_SCHEMA,
  createNew,
  findOneById,
}
