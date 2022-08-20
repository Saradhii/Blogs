const Reaction = require("../models/ReactionsSchema");
const mongoose = require("mongoose");
var ObjectId = require('mongodb').ObjectId;
import express from "express";
import { Router } from "express";

const ReactionsRoute = Router();

ReactionsRoute.get("/",async (req: express.Request, res: express.Response) => {
  const reaction = await Reaction.find();
  res.status(200).send(reaction);
}
);

ReactionsRoute.get("/:_id",async (req: express.Request, res: express.Response) => {
  const reaction = await Reaction.aggregate([
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
      res.status(200).send(reaction);
    }
  );

ReactionsRoute.post("/newreaction",async (req: express.Request, res: express.Response) => {
    let newreaction = {
      "blog_id":ObjectId(`${req.body.blog_id}`),
      "user_id":ObjectId(`${req.body.user_id}`),
      "emoji":req.body.emoji
    }
    const newReaction = new Reaction(newreaction);
    await newReaction.save();
    res.status(200).send("Saved");
}
);

module.exports=ReactionsRoute;