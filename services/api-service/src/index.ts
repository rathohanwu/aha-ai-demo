
import express from "express";
import { prisma } from "./db";

const app = express();

app.get("/", (req, res) => {
    res.send("Express + Typescript Server");
})

prisma.$connect()
    .then(() => app.listen(3020))
    .then(() => console.log("server is running"))
    .catch((error) => console.error(error));
