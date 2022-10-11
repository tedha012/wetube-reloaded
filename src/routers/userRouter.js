import express from "express";
import {
  logout,
  see,
  startGithubLogin,
  finishGithubLogin,
  startKakaoLogin,
  finishKakaoLogin,
  getEdit,
  postEdit,
} from "../controllers/userController";
import { portectorMiddleware, publicOnMiddleware } from "../middlewares";

const userRouter = express.Router();

userRouter.get("/logout", portectorMiddleware, logout);
userRouter.route("/edit").all(portectorMiddleware).get(getEdit).post(postEdit);
userRouter.get("/github/start", publicOnMiddleware, startGithubLogin);
userRouter.get("/github/finish", publicOnMiddleware, finishGithubLogin);
userRouter.get("/kakao/start", publicOnMiddleware, startKakaoLogin);
userRouter.get("/kakao/finish", publicOnMiddleware, finishKakaoLogin);
userRouter.get(":id", see);

export default userRouter;
