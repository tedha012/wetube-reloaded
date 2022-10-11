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
  getChangePassword,
  postChangePassword,
} from "../controllers/userController";
import {
  protectorMiddleware,
  publicOnMiddleware,
  uploadFileMiddleware,
} from "../middlewares";

const userRouter = express.Router();

userRouter.get("/logout", protectorMiddleware, logout);
userRouter
  .route("/edit")
  .all(protectorMiddleware)
  .get(getEdit)
  .post(uploadFileMiddleware.single("avatar"), postEdit);
userRouter
  .route("/change-password")
  .all(protectorMiddleware)
  .get(getChangePassword)
  .post(postChangePassword);
userRouter.get("/github/start", publicOnMiddleware, startGithubLogin);
userRouter.get("/github/finish", publicOnMiddleware, finishGithubLogin);
userRouter.get("/kakao/start", publicOnMiddleware, startKakaoLogin);
userRouter.get("/kakao/finish", publicOnMiddleware, finishKakaoLogin);
userRouter.get(":id", see);

export default userRouter;
