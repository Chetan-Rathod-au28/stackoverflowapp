import express  from "express";
import mongoose from "mongoose";
const router = express.Router();
import Question from '../models/questionModel.js';
import Answer from '../models/answerModel.js'
import Comment from '../models/commentModel.js'

//post question
export const question = async (req,res,next) => {
    const questionData = new Question({
        title:req.body.title,
        body:req.body.body,
        tags:req.body.tag,
        user:req.body.user
    })
    await questionData.save().then((doc)=>{
        res.status(201).send({
            status:true,
            data:doc
        })
    }).catch((err)=>{
        res.status(400).send({
            status:false,
            message:"Error in adding question"
        })
    })
}
//get question 

export const getQuestion = async (req,res,next) => {
    const error = {
        message: "Error in retrieving questions",
        error: "Bad request",
      };
    
      Question.aggregate([
        {
          $lookup: {
            from: "comments",
            let: { question_id: "$_id" },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $eq: ["$question_id", "$$question_id"],
                  },
                },
              },
              {
                $project: {
                  _id: 1,
                  // user_id: 1,
                  comment: 1,
                  created_at: 1,
                  // question_id: 1,
                },
              },
            ],
            as: "comment",
          },
        },
        {
          $lookup: {
            from: "answers",
            let: { question_id: "$_id" },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $eq: ["$question_id", "$$question_id"],
                  },
                },
              },
              {
                $project: {
                  _id: 1,
                  // user_id: 1,
                  // answer: 1,
                  // created_at: 1,
                  // question_id: 1,
                  // created_at: 1,
                },
              },
            ],
            as: "answerDetails",
          },
        },
        // {
        //   $unwind: {
        //     path: "$answerDetails",
        //     preserveNullAndEmptyArrays: true,
        //   },
        // },
        {
          $project: {
            __v: 0,
            // _id: "$_id",
            // answerDetails: { $first: "$answerDetails" },
          },
        },
      ])
        .exec()
        .then((questionDetails) => {
          res.status(200).send(questionDetails);
        })
        .catch((e) => {
          console.log("Error: ", e);
          res.status(400).send(e);
        });

}
//single questions
export const singleQuestion = async (req,res,next) => {
    try {
        // const question = await QuestionDB.findOne({ _id: req.params.id });
        // res.status(200).send(question);
        Question.aggregate([
          {
            $match: { _id: mongoose.Types.ObjectId(req.params.id) },
          },
          {
            $lookup: {
              from: "answers",
              let: { question_id: "$_id" },
              pipeline: [
                {
                  $match: {
                    $expr: {
                      $eq: ["$question_id", "$$question_id"],
                    },
                  },
                },
                {
                  $project: {
                    _id: 1,
                    user: 1,
                    answer: 1,
                    // created_at: 1,
                    question_id: 1,
                    created_at: 1,
                  },
                },
              ],
              as: "answerDetails",
            },
          },
          {
            $lookup: {
              from: "comments",
              let: { question_id: "$_id" },
              pipeline: [
                {
                  $match: {
                    $expr: {
                      $eq: ["$question_id", "$$question_id"],
                    },
                  },
                },
                {
                  $project: {
                    _id: 1,
                    question_id: 1,
                    user: 1,
                    comment: 1,
                    // created_at: 1,
                    // question_id: 1,
                    created_at: 1,
                  },
                },
              ],
              as: "comment",
            },
          },
          // {
          //   $unwind: {
          //     path: "$answerDetails",
          //     preserveNullAndEmptyArrays: true,
          //   },
          // },
          {
            $project: {
              __v: 0,
              // _id: "$_id",
              // answerDetails: { $first: "$answerDetails" },
            },
          },
        ])
          .exec()
          .then((questionDetails) => {
            res.status(200).send(questionDetails);
          })
          .catch((e) => {
            console.log("Error: ", e);
            res.status(400).send(error);
          });
      } catch (err) {
        res.status(400).send({
          message: "Question not found",
        });
      }
}
//post answer
export const answer = async (req,res,next) => {
    const answerData = new Answer({
        question_id:req.body.question_id,
        answer:req.body.answer,
        user:req.body.user
    })
    await answerData.save().then((doc)=>{
        res.status(201).send({
            status:true,
            data:doc
        })
    }).catch((err)=>{
        res.status(400).send({
            status:false,
            message:"Error in adding answer"
        })
    })

}

//post comment
export const comment = async (req,res,next) => {
   try{
    await Comment.create({
        question_id:req.params.id,
        comment:req.body.comment,
        user:req.body.user,
    }).then((doc)=>{
        res.status(201).send({
            status:true,
            message:"Comment added successfully"
        })
   })
} catch(err) {
    res.status(400).send({
        status:false,
        message:"Error in adding answer"
    })
}
};