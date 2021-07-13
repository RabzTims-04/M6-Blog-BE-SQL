import express from "express";
import db from "../../utils/db/index.js";
import createError from "http-errors";
import striptags from "striptags";

const blogsRouter = express.Router();

/* ***************blogs********************* */

blogsRouter
  .route("/")
  .get(async (req, res, next) => {
    try {
      const query = "SELECT * FROM blog ORDER BY created_at DESC";
      const data = await db.query(query);
      res.send(data.rows);
    } catch (error) {
      console.log(error);
      next(error);
    }
  })
  .post(async (req, res, next) => {
    try {
      let { category, title, cover, read_time_value, read_time_unit, content, author } =
        req.body;
      read_time_value = Math.floor(striptags(content).length / 228) + 1;
      read_time_unit = read_time_value === 1 ? "minute" : "minutes";
      content = striptags(content);
      const query = `INSERT INTO blog (category, title, cover, read_time_value, read_time_unit, content, author ) VALUES ('${category}', '${title}', '${cover}', ${read_time_value}, '${read_time_unit}', '${content}', ${author}) RETURNING*`;
      const data = await db.query(query);
      res.send(data.rows[0]);
    } catch (error) {
      console.log(error);
      next(error);
    }
  });

  blogsRouter.route("/author")
  .get( async (req, res, next) => {
      try {
          const query = `select a.id, a.name, a.surname, a.avatar, COALESCE(blog, '[]') as blog from author as a
          left join lateral (
              select json_agg(json_build_object('title', b.title, 'category', b.category, 'cover', b.cover, 'read_time_value', b.read_time_value, 'read_time_unit', b.read_time_unit,'content', b.content)) as blog from blog as b where b.author=a.id
          ) as blog_agg on true;`
          const data = await db.query(query)
          res.send(data.rows)
      } catch (error) {
          console.log(error);
          next(error)
      }
  })

blogsRouter
  .route("/:id")
  .get(async (req, res, next) => {
    try {
      const query = `SELECT * FROM blog WHERE id=${req.params.id}`;
      const data = await db.query(query);
      res.send(data.rows[0]);
    } catch (error) {
      console.log(error);
      next(error);
    }
  })
  .put(async (req, res, next) => {
    try {
        let { category, title, cover, read_time_value, read_time_unit, content } = req.body;
        const fields = Object.keys(req.body).map(key => `${key} = '${req.body[key]}'`).join(', ')
        const query = `UPDATE blog SET ${fields} WHERE id=${req.params.id} RETURNING *`
        const data = await db.query(query)
        res.send(data.rows[0])
    } catch (error) {
      console.log(error);
      next(error);
    }
  })
  .delete(async (req, res, next) => {
    try {
        const query = `DELETE FROM blog WHERE id=${req.params.id}`
        const data = await db.query(query);
        if(data.rowCount > 0){
            res.send('deleted successfully')
        }
        else{
            res.send("error while deleting")
        }
    } catch (error) {
      console.log(error);
      next(error);
    }
  });

export default blogsRouter;
