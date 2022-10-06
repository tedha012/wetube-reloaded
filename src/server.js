import express from "express";

const PORT =4000;

const app = express();

const goddipMiddleware = (req, res, next) => {
    console.log(`Someone is going to: ${req.url}`);
    next();
}

const handleHome = (req, res) => {
    return res.end("I love middleware");
}

app.get("/", goddipMiddleware, handleHome);

const handleListening = () => {
    console.log(`Server listenting on port http:localhost:${PORT}`);
}

app.listen(4000, handleListening);