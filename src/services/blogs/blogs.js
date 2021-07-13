import express from "express"
import createError from 'http-errors'

const blogsRouter = express.Router()

/* ***************blogs********************* */

blogsRouter.route("/")
.get( async (req, res, next) => {
    try {
        
    } catch (error) {
        console.log(error);
        next(error)
    }
})
.post( async (req, res, next) => {
    try {
        
    } catch (error) {
        console.log(error);
        next(error)
    }
})

blogsRouter.route("/:id")
.get( async (req, res, next) => {
    try {
        
    } catch (error) {
        console.log(error);
        next(error)
    }
})
.put( async (req, res, next) => {
    try {
        
    } catch (error) {
        console.log(error);
        next(error)
    }
})
.delete ( async (req, res, next) => {
    try {
        
    } catch (error) {
        console.log(error);
        next(error)
    }
})

export default blogsRouter
