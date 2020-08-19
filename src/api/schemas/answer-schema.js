const answerSchema = {
    QuestionId: {
        type: Number,
    },
    OptionId: {
        type: Number
    },
    AnsweredText: {
        type: Object
    },
    ChildQuestionAnsweredText: {
        type: Object
    },
    ChildQuestionAnsweredText2: {
        type: Object
    },
    required: [
        "QuestionId"
    ]
}

module.exports = answerSchema;