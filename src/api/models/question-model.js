const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const QuestionModel = mongoose.model('Questions', {
    "Id": {
        "type": "Number"
    },
    "CategoryId": {
        "type": "Number"
    },
    "CategoryName": {
        "type": "Mixed"
    },
    "QuestionType": {
        "type": "Number"
    },
    "Text": {
        "type": "String"
    },
    "QuestionFile": {
        "type": "Mixed"
    },
    "ChildQuestionText": {
        "type": "Mixed"
    },
    "ChildQuestionText2": {
        "type": "Mixed"
    },
    "ChildQuestionAnsweredText": {
        "type": "Mixed"
    },
    "ChildQuestionAnsweredText2": {
        "type": "Mixed"
    },
    "ActualDifficulty": {
        "type": "Number"
    },
    "Difficulty": {
        "type": "Number"
    },
    "MinValue": {
        "type": "Mixed"
    },
    "MaxValue": {
        "type": "Mixed"
    },
    "AnswerOptionId": {
        "type": "Number"
    },
    "AnsweredText": {
        "type": "Mixed"
    },
    "Score": {
        "type": "Mixed"
    },
    "IsCorrect": {
        "type": "Mixed"
    },
    "Status": {
        "type": "Number"
    },
    "Options": {
        "type": [
            "Mixed"
        ]
    },
    "RemainingSecond": {
        "type": "Number"
    },
    "EnvTag": {
        "type": "Number"
    },
    "IsPythonFile": {
        "type": "Boolean"
    },
    "PythonFileId": {
        "type": "Mixed"
    },
    "Category": {
        "type": "Mixed"
    },
    "MasterQuestionId": {
        "type": "Number"
    },
    "IsMultiPart": {
        "type": "Boolean"
    },
    "TotalShowCount": {
        "type": "Number"
    },
    "TotalCorrectCount": {
        "type": "Number"
    },
    "Percentage": {
        "type": "Number"
    }
});

module.exports = QuestionModel;