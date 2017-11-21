import React, {Component} from "react";
import Helmet from "react-helmet";
import {Modal, Button} from "react-bootstrap";
import {connect} from "react-redux";
import PageTitle from "./../../containers/PageTitle";
import "./CreateInterviewFeedback.css";
import {FIELD_SPACE_REGEX} from "../../config";
import {getRatings} from "../../redux/actions/ratingActions";
import {getQuestions} from "../../redux/actions/questionsActions";
import {getInterview, updateInterview} from "../../redux/actions/interviewActions";
import {createFeedback} from "../../redux/actions/feedbackActions";
import TextareaAutosize from "react-autosize-textarea";


class CreateInterviewFeedback extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentInterviewID: "",
            rating: 0,
            answer1: {text: "", questionID: ""},
            answer2: {text: "", questionID: ""},
            answer3: {text: "", questionID: ""},
            answer4: {text: "", questionID: ""},
            answer5: {text: "", questionID: ""},
            answer6: {text: "", questionID: ""},
            answer1Error: "",
            answer2Error: "",
            answer3Error: "",
            answer4Error: "",
            answer5Error: "",
            answer6Error: "",
            showModalAlert: false,
            showModalConfirm: false,
            showModaLCreateAlert: false,
        };
    }

    componentWillMount() {
        let isUserHR = this.props.onCheckUserRole(true);
        if (isUserHR) {
            this.props.history.push('/interviews-upcoming');
        }

        if (this.props.interviews.interviews.length > 0) {
            let currentInterview = this.props.match.params;
            this.setState({currentInterviewID: currentInterview.id});

        } else {
            const {dispatch} = this.props;

            dispatch(getInterview(this.props.match.params.id)).then(() => {
                let currentInterview = this.props.interviews.currentInterview;
                this.setState({currentInterviewID: currentInterview.id});
            });
        }

        if (!this.props.questions.length > 0) {
            const {dispatch} = this.props;
            dispatch(getQuestions());
        }

        if (!this.props.ratings.length > 0) {
            const {dispatch} = this.props;
            dispatch(getRatings());
        }
    }


    handleRatingChange(event) {
        this.setState({rating: event.target.value});
        this.setState({ratingError: ""});
    }

    handleAnswersChange(event) {
        this.clearSpan(event.target.name);
        switch (event.target.name ) {
            case ("question1"):
                return this.setState({answer1: {text: event.target.value, questionID: event.target.id}});
            case ("question2"):
                return this.setState({answer2: {text: event.target.value, questionID: event.target.id}});
            case ("question3"):
                return this.setState({answer3: {text: event.target.value, questionID: event.target.id}});
            case ("question4"):
                return this.setState({answer4: {text: event.target.value, questionID: event.target.id}});
            case ("question5"):
                return this.setState({answer5: {text: event.target.value, questionID: event.target.id}});
            case ("question6"):
                return this.setState({answer6: {text: event.target.value, questionID: event.target.id}});
        }
    }

    clearSpan(inputName) {
        let spanID = inputName + "-span",
            spanElement = document.getElementById(spanID);
        spanElement.innerHTML = "";
    }

    isFieldsEmpty() {
        let answers = [
            this.state.answer1,
            this.state.answer2,
            this.state.answer3,
            this.state.answer4,
            this.state.answer5,
            this.state.answer6
        ],
        rating = this.state.rating,
            emptyFieldMessage = "Please, fill the field",
            emptyAnswers = [],
            fieldsEmpty = true;

        if(!rating) {
            this.setState({ratingError: emptyFieldMessage});
        }

        answers.forEach((item, i) => {
            let answerText = item.text,
                emptyAnswer = !answerText || answerText.match(FIELD_SPACE_REGEX),
                fieldId = "question" + ( i + 1 ) + "-span";
            emptyAnswers.push(emptyAnswer);
            if (emptyAnswer) {
                let spanError = document.getElementById(fieldId);
                spanError.innerHTML = emptyFieldMessage;
            }
        });

        if(!emptyAnswers.includes(true) && rating) {
            fieldsEmpty = false;
        }

        return fieldsEmpty;
    }

    openModalConfirm() {
        this.setState({
            showModalConfirm: true
        });
    }

    closeModalConfirm() {
        this.setState({
            showModalConfirm: false
        });
    }

    submitForm(event) {
        event.preventDefault();

        if (!this.isFieldsEmpty()) {
            this.props.history.push("/interviews-upcoming");
            let interviewID = this.state.currentInterviewID,
                ratings = this.props.ratings,
                currentRating = ratings.find(item => item.grade === this.state.rating),
                ratingID = currentRating.id;

            const {dispatch} = this.props;
            dispatch(createFeedback(
                {
                    interview_id: interviewID,
                    question_id: this.state.answer1.questionID,
                    answer: this.state.answer1.text,
                },
            )).then(() => {
                dispatch(createFeedback(
                    {
                        interview_id: interviewID,
                        question_id: this.state.answer2.questionID,
                        answer: this.state.answer2.text,
                    },
                )).then(() => {
                    dispatch(createFeedback(
                        {
                            interview_id: interviewID,
                            question_id: this.state.answer3.questionID,
                            answer: this.state.answer3.text,
                        },
                    )).then(() => {
                        dispatch(createFeedback(
                            {
                                interview_id: interviewID,
                                question_id: this.state.answer4.questionID,
                                answer: this.state.answer4.text,
                            },
                        )).then(() => {
                            dispatch(createFeedback(
                                {
                                    interview_id: interviewID,
                                    question_id: this.state.answer5.questionID,
                                    answer: this.state.answer5.text,
                                },
                            )).then(() => {
                                dispatch(createFeedback(
                                    {
                                        interview_id: interviewID,
                                        question_id: this.state.answer6.questionID,
                                        answer: this.state.answer6.text,
                                    },
                                )).then(() => {
                                    dispatch(updateInterview(
                                        {
                                            id: interviewID,
                                            rating_id: ratingID,
                                            status: false,
                                        }, "Feedback was created"
                                    ));
                                });
                            });
                        });
                    });
                });
            });
        }
    }

    leaveForm() {
        this.closeModalConfirm();
        this.props.history.push("/interviews-upcoming");
    }

    isFieldsNotEmpty(event) {
        event.preventDefault();
        if (this.state.rating ||
            this.state.answer1.text ||
            this.state.answer2.text ||
            this.state.answer3.text ||
            this.state.answer4.text ||
            this.state.answer5.text ||
            this.state.answer6.text){
            this.setState({
                confirmText: "Are you sure you want to cancel without saving changes?"
            });
            this.openModalConfirm();
        } else {
            this.props.history.push("/interviews-upcoming");
        }
    }

    render() {

        let questionsProps = this.props.questions,
            questions = [];
        let answers = [
            this.state.answer1,
            this.state.answer2,
            this.state.answer3,
            this.state.answer4,
            this.state.answer5,
            this.state.answer6
        ];

        if (questionsProps.length > 0) {
            questions = questionsProps.map((item, index) => {
                let answer = answers[index];
                let answerIndex = index + 1;

                return (
                    <div className="form-group has-error" key={index}>
                        <label className="control-label form-label">{item.content}
                            <span className="required-field">*</span>
                        </label>
                        <p className="form-sublabel back-link">{item.hint}</p>
                        <TextareaAutosize
                            id={item.id}
                            type="text"
                            name={"question" + answerIndex}
                            placeholder='Input your answer'
                            className="form-control boxed"
                            maxLength="2000"
                            value={answer.text}
                            onChange={(event) => this.handleAnswersChange(event)}
                        />
                        <span
                            id={"question" + answerIndex + "-span"}
                            className="has-error error-message">
                        </span>
                    </div>
                );
            });
        }

        let showRatingSelect = () => {

            let ratingsProps = this.props.ratings,
                ratingsList = ratingsProps.map((item, index) => {
                    return item
                }),
                options = [];

            if (ratingsList.length) {
                let compareGrade = (a, b) => {
                        let first = +a.grade;
                        let second = +b.grade;

                        if (first > second) return 1;
                        if (first < second) return -1;
                    },
                    sortedRatings = ratingsList.sort(compareGrade) || {};
                options = sortedRatings.map((item, index) => <option key={index}>{item.grade}</option>);
            }

            return (
                <div className="form-group margin-none">
                    <select className="form-control form-control-sm filter-select custom-mode"
                            onChange={(event) => this.handleRatingChange(event)}
                    >
                        <option></option>
                        {options}
                    </select>
                </div>
            );
        };

        return (
            <div>
                <Helmet>
                    <title>Add Feedback</title>
                </Helmet>
                <div className="row sameheight-container custom-btn-group">
                    <div className="col-md-12">

                        <PageTitle
                            pageTitle='Add Feedback'
                            showBackBtn={true}
                            showButton={false}
                            backBtnId="back-create-feedback"
                            titleForButton=''
                            linkForButton=''
                        />

                        <form name="addFeedback" onSubmit={(event) => this.submitForm(event)}>

                            <div className="clearfix form-group">
                                <div className="float-left create-interview-select">
                                    <label className="control-label">Rate the candidate
                                        <span className="required-field">*</span>
                                    </label>
                                    {showRatingSelect()}
                                    <span className="has-error error-message">{this.state.ratingError}</span>
                                </div>
                            </div>
                            {questions}
                            <div className="form-group">
                                <button
                                    id="create-feedback-submitBtn"
                                    type="submit"
                                    className="btn btn-primary"
                                >Create
                                </button>
                                <button
                                    id="create-feedback-resetBtn"
                                    type="reset"
                                    className="btn btn-danger"
                                    onClick={(event) => this.isFieldsNotEmpty(event)}
                                >Cancel
                                </button>
                            </div>
                        </form>

                    </div>
                    <Modal className="custom-btn-group"
                           show={this.state.showModalConfirm}
                           onHide={() => this.closeModalConfirm()}>
                        <Modal.Header closeButton>
                        </Modal.Header>
                        <Modal.Body>
                            <p>Are you sure you want to cancel without saving changes?</p>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button
                                id="modal-confirm-yes"
                                className="btn btn-primary"
                                onClick={() => this.leaveForm()}
                            >Yes
                            </Button>
                            <Button
                                id="modal-confirm-no"
                                className="btn btn-danger"
                                onClick={() => this.closeModalConfirm()} bsStyle="primary"
                            >No
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </div>
            </div>
        )
    }
}

function mapStateToProps (state) {
    return {
        ratings: state.ratings.ratings,
        questions: state.questions.questions,
        interviews: state.interviews,
        feedbacks: state.feedbacks,
    }
}

export default connect(mapStateToProps)(CreateInterviewFeedback);