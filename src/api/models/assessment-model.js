const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const AssessmentModel = mongoose.model('Assessments', {
    Id: {
        type: String
    },
    ParentTestId: {
        type: Number,
        required: true
    },
    TestType: {
        type: Number
    },
    Slug: {
        type: String
    },
    Title: {
        type: String
    },
    Spot: {
        type: Object
    },
    VerifiedMobilePhone: {
        type: Boolean
    },
    ThanksMessage: {
        type: String
    },
    Status: {
        type: Number
    },
    IsDeleted: {
        type: Boolean
    },
    Configuration: {
        Id: {
            type: Number
        },
        StartDate: {
            type: Date
        },
        EndDate: {
            type: Date
        },
        Duration: {
            type: Number
        },
        QuestionCount: {
            type: Number
        },
        Logo: {
            type: String
        },
        HeaderColor: {
            type: String
        },
        FooterColor: {
            type: String
        },
        FooterContent: {
            type: String
        },
        SkipQuestion: {
            type: Boolean
        },
        SpecificQuestions: {
            type: Boolean
        },
        ShowReviewPage: {
            type: Boolean
        },
        AllowBlank: {
            type: Boolean
        },
        BlankPoint: {
            type: Number
        },
        IsNotRandomQuestion: {
            type: Boolean
        },
        IsNotRandomQuestionSortByIndex: {
            type: Boolean
        },
        IsDownloadDetailReport: {
            type: Boolean
        },
        IsPreventPII: {
            type: Boolean
        },
        IsCollectFeedback: {
            type: Boolean
        },
        DegreeEnabled: {
            type: Boolean
        },
        IsNotifyEmail: {
            type: Boolean
        },
        ToEmails: {
            type: Object
        },
        FromEmail: {
            type: Object
        },
        FromName: {
            type: Object
        },
        EmailSubject: {
            type: Object
        },
        EmailTemplate: {
            type: Object
        },
        EmailParameters: {
            type: Object
        },
        IsExperianTest: {
            type: Boolean
        },
        ShowInstructions: {
            type: Boolean
        },
        InstructionsText: {
            type: Object
        },
        ShowTerms: {
            type: Boolean
        },
        TermsText: {
            type: Object
        },
        RequireConfirmation: {
            type: Boolean
        },
        ConfirmationText: {
            type: Object
        },
        IsNotifyCandidateEmail: {
            type: Boolean
        },
        IsDisplayNotificationEmail: {
            type: Boolean
        },
        CandidateEmailTemplate: {
            type: Object
        },
        CandidateEmailParameters: {
            type: Object
        },
        CandidateEmailSubject: {
            type: Object
        },
        ShowPopStats: {
            type: Boolean
        },
        IsCalcTestBenchmark: {
            type: Boolean
        },
        IsExportAssessmentPDF: {
            type: Boolean
        },
        IsAllowUserDetailPDF: {
            type: Boolean
        },
        IsShowConfidenceQuestion: {
            type: Boolean
        },
        Language: {
            type: Object
        },
        FromTemplateId: {
            type: Object
        },
        HasIntegration: {
            type: Boolean
        },
        IntegrationId: {
            type: Object
        },
        RedirectTestId: {
            type: Object
        },
        IsInviteOnly: {
            type: Boolean
        },
        InviteOnlyAttempts: {
            type: Number
        },
        ShowWatermark: {
            type: Boolean
        }
    },
    Categories: {
        type: Object
    },
    Degrees: {
        type: Object
    },
    Taker: {
        Id: {
            type: Number
        },
        Email: {
            type: String,
            required: true
        },
        Name: {
            type: String,
            required: true
        },
        Surname: {
            type: String,
            required: true
        }
    },
    TestAttemptsCount: {
        type: Number
    },
    AssessmentInfo: {
        type: Object
    },
    Questions: {
        type: Object
    },
    AnsweredQuestions: {
        type: Array
    },
    IsNotRandomQuestion: {
        type: Boolean
    },
    IsNotRandomQuestionSortByIndex: {
        type: Boolean
    },
    CustomTestId: {
        type: Number
    }
});

module.exports = AssessmentModel;