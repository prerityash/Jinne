import express from 'express';
import authMiddleware from '../middlewares/auth.middleware';
import interviewController from '../controllers/interview.Controller';

const interviewRouter = express.Router()

/* authMiddleware.authUser does that it only forwards report if user is logged in*/
interviewRouter.post("/", authMiddleware.authUser,interviewController.generateInterviewReportController)

export default interviewRouter;