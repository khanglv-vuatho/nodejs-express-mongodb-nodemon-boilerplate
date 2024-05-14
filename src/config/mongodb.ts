import { Db, MongoClient, ServerApiVersion } from "mongodb"
import { env } from "./environment"

let trelloDatabaseInstance: Db | null = null

const client = new MongoClient(env.MONGODB_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
})

export const CONNECT_DB = async (): Promise<Db> => {
  await client.connect()
  trelloDatabaseInstance = client.db(env.DATABASE_NAME)
  console.log("Connected to MongoDB")
  return trelloDatabaseInstance
}

export const CLOSE_DB = async (): Promise<void> => {
  await client.close()
}

export const GET_DB = async (): Promise<Db> => {
  if (!trelloDatabaseInstance) throw new Error("Must connect to Database first!")
  return trelloDatabaseInstance
}
