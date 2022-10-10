import express from "express";
import morgan from "morgan";
import session from "express-session";
import MongStore from "connect-mongo"; // store at session
import rootRouter from "./routers/rootRouter";
import videoRouter from "./routers/videoRouter";
import userRouter from "./routers/userRouter";
import { localsMiddleware } from "./middlewares";

const app = express();

const logger = morgan("dev");

app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");

app.use(logger);
app.use(express.urlencoded({ extended: true })); // form(post) value get!!!

//session
app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: false, // give cookies to only Logged in people
    saveUninitialized: false,
    store: MongStore.create({
      mongoUrl: process.env.DB_URL,
    }),
  })
);

app.use(localsMiddleware);

app.use("/", rootRouter);
app.use("/videos", videoRouter);
app.use("/users", userRouter);

export default app;
