const Blog = require("../models/BlogSchema");
import express from "express";
import { Router } from "express";

const BlogRoute = Router();

BlogRoute.get("/", async (req: express.Request, res: express.Response) => {
    const blogs = await Blog.find({"deleted":false});
    res.status(200).send(blogs);
  }
);

BlogRoute.get("/deleted", async (req: express.Request, res: express.Response) => {
  const blogs = await Blog.find({"deleted":true});
  res.status(200).send(blogs);
}
);

BlogRoute.get(
    "/blog:_id",
    async (req: express.Request, res: express.Response) => {
      const bestProduct = await Blog.find(req.params);
      res.status(200).send(bestProduct);
    }
  );

  BlogRoute.put("/delete:_id",async (req: express.Request, res: express.Response) => {
      const bestProduct = await Blog.updateOne({"_id":req.params},{$set:{"deleted":true}});
      res.status(200).send(bestProduct);
    }
  );

  BlogRoute.put("/edit:_id",async (req: express.Request, res: express.Response) => {
    console.log(req.body.title,req.body.contenet);
    const bestProduct = await Blog.updateOne({"_id":req.params},{$set:{"title":req.body.title , "content":req.body.content }});
    res.status(200).send(bestProduct);
  }
);

  BlogRoute.put("/restore:_id",async (req: express.Request, res: express.Response) => {
    // console.log(req.params._id)
    const bestProduct = await Blog.updateOne({"_id":req.params._id},{$set:{"deleted":false}});
    res.status(200).send(bestProduct);
  }
);

BlogRoute.post("/create",async (req: express.Request, res: express.Response) => {
      const newBlog = new Blog(req.body);
      await newBlog.save();
      res.status(200).send(newBlog._id);
  }
);

BlogRoute.delete("/deleteit:_id",async (req: express.Request, res: express.Response) => {
  const bestProduct = await Blog.deleteOne({"_id":req.params._id});
  res.status(200).send(bestProduct);
}
);

module.exports = BlogRoute;
