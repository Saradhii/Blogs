const Blog = require("../models/UserSchema");
import express from "express";
import { Router } from "express";

const UserRoute = Router();


UserRoute.get("/",async (req: express.Request, res: express.Response) => {
      const users = await Blog.find();
      res.status(200).send(users);
    }
  );

UserRoute.get("/:id",async (req: express.Request, res: express.Response) => {
    // console.log(req.params.id);
    const users = await Blog.find({"_id":req.params.id});
    console.log(users);
    res.status(200).send(users);
  }
);

module.exports=UserRoute;