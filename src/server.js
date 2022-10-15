import express from "express";
import morgan from "morgan";
import session from "express-session";
import MongStore from "connect-mongo"; // store at session
import rootRouter from "./routers/rootRouter";
import videoRouter from "./routers/videoRouter";
import userRouter from "./routers/userRouter";
import apiRouter from "./routers/apiRouter";
import { localsMiddleware } from "./middlewares";

const app = express();

const logger = morgan("dev");

app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");

// FFmpeg
app.use((req, res, next) => {
  res.header("Cross-Origin-Embedder-Policy", "require-corp");
  res.header("Cross-Origin-Opener-Policy", "same-origin");
  next();
});

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
app.use("/uploads", express.static("uploads"));
app.use("/static", express.static("assets")); // access to assets folder throw static url
app.use("/", rootRouter);
app.use("/videos", videoRouter);
app.use("/users", userRouter);
app.use("/api", apiRouter);

export default app;
