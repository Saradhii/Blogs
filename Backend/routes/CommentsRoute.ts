const Comment = require("../models/CommentSchema");
const mongoose = require("mongoose");
var ObjectId = require('mongodb').ObjectId;
import express from "express";
import { Router } from "express";

const CommentsRoute = Router();

CommentsRoute.get("/",async (req: express.Request, res: express.Response) => {
  const comments = await Comment.find();
  res.status(200).send(comments);
}
);

CommentsRoute.get("/:_id",async (req: express.Request, res: express.Response) => {
       const {id} = req.params;
      //  console.log(req.params._id);
      // const comments = await Comment.find({"blog_id":req.params});
      const comments = await Comment.aggregate([
        {$match: {blog_id:ObjectId(req.params._id)}},
        {
          $lookup:{
            from:"users",
            localField: "user_id",
            foreignField: "_id",
            as: "user",
          },
        },
      ]);
      // const com = await Comment.aggregate([
      //    { $match : { blog_id : req.params._id }},
      //    {$lookup: 
      //            {
      //             'from': 'users',
      //             'let': {"searchId": {$toObjectId: "$user_id"}}, 
      //             "pipeline":[
      //               {"$match": {"$expr":[ {"_id": "$$searchId"}]}},
      //                         ],
      //             'as': 'user'
      //             }}
      //   ]);
      res.status(200).send(comments);
    }
  );

CommentsRoute.post("/newcomment",async (req: express.Request, res: express.Response) => {
    
    let newcomment = {
      "blog_id":ObjectId(`${req.body.blog_id}`),
      "message": req.body.message,
      "user_id":ObjectId(`${req.body.user_id}`),
      "rating":req.body.rating
    }
    console.log(newcomment);
    const newComment = new Comment(newcomment);
    await newComment.save();
    res.status(200).send("Saved");
}
);

module.exports=CommentsRoute;