import express from "express";
import { UserController } from '../controller/UserController'
import { UserBusiness } from '../business/UserBusiness'
import { UserDatabase } from '../database/UserDatabase'
import { IdGenerator } from '../services/Idgenerator'
import { TokenManager } from "../services/TokenManagen";
import { HashManager } from '../services/HashManager'

export const userRouter = express.Router()

const userController = new UserController(
  new UserBusiness(
    new UserDatabase(),
    new IdGenerator(),
    new TokenManager(),
    new HashManager()
  )
)

userRouter.post("/signup", userController.signup)
userRouter.post("/login", userController.login)