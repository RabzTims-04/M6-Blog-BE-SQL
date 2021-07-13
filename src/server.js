import express from "express";
import listEndpoints from "express-list-endpoints";
import cors from "cors";
import { notFoundErrorHandler, badRequestErrorHandler, catchAllErrorHandler } from "./errorMiddlewares.js";
import blogsRouter from "./services/blogs/blogs.js";
import authorsRouter from "./services/authors/authors.js";

const server = express()
const port = process.env.PORT || 3002

// ****************** MIDDLEWARES ****************************

server.use(cors())
server.use(express.json())

// ****************** ROUTES *******************************

server.use("/blogs", blogsRouter)
server.use("/authors", authorsRouter)

// ****************** ERROR HANDLERS ***********************

server.use(badRequestErrorHandler)
server.use(notFoundErrorHandler)
server.use(catchAllErrorHandler)

console.table(listEndpoints(server));

server.listen(port, () => console.log("🧡 server is running on port ", port))
server.on("error", (error) => console.log(`💔 server is crashed sue to ${error}`))