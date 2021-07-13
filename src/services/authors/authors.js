import express from "express"
import db from "../../utils/db/index.js"
import createError from 'http-errors'

const authorsRouter = express.Router()

/* ***************authors********************* */

authorsRouter.route("/")
.get( async (req, res, next) => {
    try {
        const query = "SELECT * FROM author ORDER BY created_at DESC";
        const data = await db.query(query);
        res.send(data.rows);
    } catch (error) {
        console.log(error);
        next(error)
    }
})
.post( async (req, res, next) => {
    try {
      let { name, surname, avatar} = req.body;
      const query = `INSERT INTO author (name, surname, avatar) VALUES ('${name}', '${surname}', '${avatar}') RETURNING*`;
      const data = await db.query(query);
      res.send(data.rows[0]);
    } catch (error) {
        console.log(error);
        next(error)
    }
})

authorsRouter.route("/:id")
.get( async (req, res, next) => {
    try {
      const query = `SELECT * FROM author WHERE id=${req.params.id}`;
      const data = await db.query(query);
      res.send(data.rows[0]);
    } catch (error) {
        console.log(error);
        next(error)
    }
})
.put( async (req, res, next) => {
    try {
        let { name, surname, avatar } = req.body;
        const fields = Object.keys(req.body).map(key => `${key} = '${req.body[key]}'`).join(', ')
        const query = `UPDATE author SET ${fields} WHERE id=${req.params.id} RETURNING *`
        const data = await db.query(query)
        res.send(data.rows[0])
    } catch (error) {
        console.log(error);
        next(error)
    }
})
.delete ( async (req, res, next) => {
    try {
        const query = `DELETE FROM author WHERE id=${req.params.id}`
        const data = await db.query(query);
        if(data.rowCount > 0){
            res.send('deleted successfully')
        }
        else{
            res.send("error while deleting")
        }
    } catch (error) {
        console.log(error);
        next(error)
    }
})

export default authorsRouter
