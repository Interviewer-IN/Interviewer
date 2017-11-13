import React, {Component} from "react";
import Helmet from "react-helmet";
import {Modal, Button} from "react-bootstrap";
import {connect} from "react-redux";
import PageTitle from "./../../containers/PageTitle";
import "./CreateInterviewFeedback.css";
import {FIELD_SPACE_REGEX} from "../../config";
import {getRatings} from "../../redux/actions/ratingActions";
import {getQuestions} from "../../redux/actions/questionsActions";
import TextareaAutosize from "react-autosize-textarea";


class CreateInterviewFeedback extends Component {

    constructor(props) {
        super(props);
        this.state = {
            rating: 0,
            answer1: "",
            answer2: "",
            answer3: "",
            answer4: "",
            answer5: "",
            answer6: "",
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

        const {dispatch} = this.props;

        if (!this.props.ratings.length) {
            dispatch(getQuestions());
        }

        if (!this.props.ratings.length){
            dispatch(getRatings());
        }
    }

    handleRatingChange(event) {
        this.setState({rating: event.target.value});
        this.setState({ratingError: ""});
    }

    handleAnswersChange(event) {
        this.clearSpan(event.target.id);
        switch (event.target.id ) {
            case ("feedback-question1"):
                return this.setState({answer1: event.target.value});
            case ("feedback-question2"):
                return this.setState({answer2: event.target.value});
            case ("feedback-question3"):
                return this.setState({answer3: event.target.value});
            case ("feedback-question4"):
                return this.setState({answer4: event.target.value});
            case ("feedback-question5"):
                return this.setState({answer5: event.target.value});
            case ("feedback-question6"):
                return this.setState({answer6: event.target.value});
        }
    }


    clearSpan(inputID) {
        let spanID = inputID.split("-")[1] + "-span",
            spanElement = document.getElementById(spanID);
        spanElement.innerHTML = "";
    }

    isFieldsEmpty() {
        let rating = this.state.rating,
            answer1 = this.state.answer1,
            answer2 = this.state.answer2,
            answer3 = this.state.answer3,
            answer4 = this.state.answer4,
            answer5 = this.state.answer5,
            answer6 = this.state.answer6,
            emptyFieldMessage = "Please, fill the field",
            answers = [answer1, answer2, answer3, answer4, answer5, answer6],
            emptyAnswers = [],
            fieldsEmpty = true;

        if(!rating) {
            this.setState({ratingError: emptyFieldMessage});
        }

        answers.forEach((item, i) => {
            let answer = item,
                emptyAnswer = !answer || answer.match(FIELD_SPACE_REGEX),
                fieldId = "question"+(i+1)+"-span";
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
        }
    }

    leaveForm() {
        this.closeModalConfirm();
        this.props.history.push("/interviews-upcoming");
    }

    isFieldsNotEmpty(event) {
        event.preventDefault();
        if (this.state.rating ||
            this.state.answer1 ||
            this.state.answer2 ||
            this.state.answer3 ||
            this.state.answer4 ||
            this.state.answer5 ||
            this.state.answer6){
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
                        <label className="control-label form-label">{item.content}</label>
                        <p className="form-sublabel back-link">{item.hint}</p>
                        <TextareaAutosize
                            id={"feedback-question" + answerIndex}
                            type="text"
                            name={"question" + answerIndex}
                            placeholder='Input your '
                            className="form-control boxed"
                            maxLength="2000"
                            value={answer}
                            onChange={(event) => this.handleAnswersChange(event)}
                            autoFocus
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

            let ratingsList = this.props.ratings,
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
                                    <label className="control-label">Rate the candidate</label>
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
    }
}

export default connect(mapStateToProps)(CreateInterviewFeedback);