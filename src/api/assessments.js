const express = require('express');
const mongoose = require('mongoose');
const AssessmentModel = require('./models/assessment-model');
const QuestionModel = require('./models/question-model');
const answerSchema = require('./schemas/answer-schema');
const {
    Validator
} = require('express-json-validator-middleware');
const {
    v4: uuidv4
} = require('uuid');

const router = express.Router();

var validator = new Validator({
    allErrors: true
});
var validate = validator.validate;


function isExpired(res, assessment) {
    let startDate = assessment.Configuration.StartDate;
    if (!startDate) {
        res.status(403).json({
            Status: -1,
            Message: 'Test has not been started',
            Data: false
        });

        return true;
    }

    if (assessment.Configuration.EndDate != null) {
        res.status(403).json({
            Status: -1,
            Message: 'Test has already ended',
            Data: false
        });
    }

    let duration = assessment.Configuration.Duration;

    let currentDate = new Date();
    let limitDate = startDate.setMinutes(startDate.getMinutes() + duration);
    

    if (currentDate > limitDate) {
        res.json({
            Status: -1,
            Message: "Test time is expired",
            Data: false
        });
        return true;
    }
    
    return false;
}

function getAnsweredQuestions(assessment, answeredQuestion) {
    let answeredQuestions = assessment.AnsweredQuestions ?? [];
    const isAnswered = answeredQuestions.find(question => answeredQuestion.Id === question.Id) != null;

    if (isAnswered) answeredQuestions.push(answeredQuestion);

    return answeredQuestions;
}

// Get by ID
router.get('/:id', async (req, res, next) => {
    const id = req.params.id;
    const assessment = await AssessmentModel.findById(id);
    if (!assessment) return next();

    res.json({
        "Status": 1,
        "Message": "Success",
        "Data": assessment
    });
});

// Create a new assessment
router.post('/create/:id', async (req, res, next) => {
    try {
        const parentId = req.params.id;
        console.info(`Request data: ${JSON.stringify(req.body)}`);

        const parentAssetment = await AssessmentModel.findOne({
            Id: parentId
        });
        if (!parentAssetment) return res.status(404).json({
            Status: -1,
            Message: "Parent assessment not found",
            Data: false
        });

        const assessment = new AssessmentModel(parentAssetment);

        assessment._id = mongoose.Types.ObjectId();;
        assessment.isNew = true;
        assessment.Id = uuidv4();
        assessment.ParentTestId = parentId;
        assessment.Taker = req.body;
        assessment.Configuration.QuestionCount = assessment.Questions.length;

        assessment.save().then((data) => {
            console.debug(`Assessment saved: ${data}`);
            return res.json({
                "Status": 1,
                "Message": "Success",
                "Data": data._id
            });
        }, (error) => {
            next(error);
        });

    } catch (error) {
        next(error);
    }
});

// Start an assessment
router.post('/:id/start', async (req, res, next) => {
    try {
        const id = req.params.id;
        console.info(`Request data: ${JSON.stringify(req.body)}`);

        const assessment = await AssessmentModel.findById(id);
        if (!assessment) return next();

        if (assessment.Configuration.StartDate != null) return res.status(412).json({
            Status: -1,
            Message: "Test is already started",
            Data: false
        });

        const startDate = Date.now();
        assessment.Configuration.StartDate = startDate;
        assessment.save().then((data) => {
            console.debug(`Assessment with id ${id} started at ${startDate}`);

            return res.json({
                Status: 1,
                Message: "Success",
                Data: true
            });
        });
    } catch (error) {
        next(error);
    }
});

// Get a question from assessment
router.get('/:id/question/:index', async (req, res, next) => {
    try {
        const id = req.params.id;
        const index = req.params.index;

        const assessment = await AssessmentModel.findById(id);
        if (!assessment) return next();

        if (isExpired(res, assessment)) return;

        if (index < 0 || index >= assessment.Questions.length) {
            return res.json({
                Status: -1,
                Message: "Question index out of bounds",
                Data: false
            });
        }

        const questionId = assessment.Questions[index];
        const question = await QuestionModel.findOne({
            Id: questionId
        });
        if (!question) return next();

        console.debug(`Question with id ${questionId} is ${question}`);
        assessment.AssessmentInfo.NextQuestionIndex = parseInt(index) + 1;
        assessment.save().then((data) => {
            console.debug(`Assessment uptated: ${data}`);
            return res.json({
                Status: 1,
                Message: "Success",
                Data: question
            });
        });

    } catch (error) {
        next(error);
    }
});

// Answer a question from assessment
router.post('/:id/answer', validate({
    body: answerSchema
}), async (req, res, next) => {
    try {
        const id = req.params.id;

        const assessment = await AssessmentModel.findById(id);
        if (!assessment) return next();

        if (isExpired(res, assessment)) return;

        const answer = req.body;
        const questionId = answer.QuestionId;

        if (assessment.Questions.indexOf(questionId) == -1) return res.status(400).json({
            Status: -1,
            Message: "Question doesn't bellow to test",
            Data: false
        }); 

        console.debug(`Question id: ${questionId}`);
        const question = await QuestionModel.findOne({
            Id: questionId
        });
        if (!question) return next();

        console.debug(`Question with id ${questionId} is ${question}`);

        const optionId = answer.OptionId;
        console.log(`Option ID: ${optionId}`);
        if (optionId != null) {
            const options = question.Options;
            const optionExists = options.filter((option) => option.Id == optionId).length > 0;

            if (!optionExists) return res.json({
                Status: -1,
                Message: "Option doesn't exists",
                Data: false
            });
        }

        question.AnswerOptionId = optionId;
        question.AnsweredText = answer.AnsweredText;
        question.ChildQuestionAnsweredText = answer.ChildQuestionAnsweredText;
        question.ChildQuestionAnsweredText2 = answer.ChildQuestionAnsweredText2;
        question.Options = null;

        assessment.AnsweredQuestions = getAnsweredQuestions(assessment, question);

        console.debug(`Total questions: ${assessment.Questions.length}, total answers: ${assessment.AnsweredQuestions.length}`);
        if (assessment.AnsweredQuestions.length >= assessment.Questions.length) {
            assessment.AssessmentInfo.IsAssessmentEnd = true;
            assessment.AssessmentInfo.RemainingMinute = 0;
            assessment.Configuration.EndDate = Date.now();
        }

        assessment.save().then((data) => {
            return res.json({
                Status: 1,
                Message: "Success",
                Data: data
            });
        });

    } catch (error) {
        next(error);
    }
});

module.exports = router;