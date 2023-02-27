import express  from "express";
import {question,answer,comment,getQuestion,singleQuestion}from "../controllers/dataController.js"
const router = express.Router();

//posting data
router.route("/question").post(question);
router.route("/answer").post(answer);
router.route("/comment/:id").post(comment);

//getting data
router.route("/question").get(getQuestion);
router.route("/question/:id").get(singleQuestion);


export  default router