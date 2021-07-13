import express from "express"
import createError from 'http-errors'

const authorsRouter = express.Router()

/* ***************authors********************* */

authorsRouter.route("/")
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

authorsRouter.route("/:id")
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

export default authorsRouter
