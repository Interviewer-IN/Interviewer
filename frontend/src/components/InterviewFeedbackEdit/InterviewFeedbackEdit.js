import React, {Component} from "react";
import Helmet from "react-helmet";
import {Modal, Button} from "react-bootstrap";
import {connect} from "react-redux";
import PageTitle from "./../../containers/PageTitle";
import "./InterviewFeedbackEdit.css";
import {FIELD_SPACE_REGEX} from "../../config";
import {getRatings} from "../../redux/actions/ratingActions";
import TextareaAutosize from "react-autosize-textarea";


class InterviewFeedbackEdit extends Component {

    constructor(props) {
        super(props);
        this.state = {
            rating: 0,
            question1: "",
            question2: "",
            question3: "",
            question4: "",
            question5: "",
            question6: "",
            question1Error: "",
            question2Error: "",
            question3Error: "",
            question4Error: "",
            question5Error: "",
            question6Error: "",
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
        if (!this.props.ratings.langth){
            dispatch(getRatings());
        }
    }

    handleRatingChange(event) {
        this.setState({rating: event.target.value});
        this.setState({ratingError: ""});
    }

    handleQuestion1Change(event) {
        this.setState({question1: event.target.value});
        this.clearSpan(event.target.id);
    }

    handleQuestion2Change(event) {
        this.setState({question2: event.target.value});
        this.clearSpan(event.target.id);
    }

    handleQuestion3Change(event) {
        this.setState({question3: event.target.value});
        this.clearSpan(event.target.id);
    }

    handleQuestion4Change(event) {
        this.setState({question4: event.target.value});
        this.clearSpan(event.target.id);
    }

    handleQuestion5Change(event) {
        this.setState({question5: event.target.value});
        this.clearSpan(event.target.id);
    }

    handleQuestion6Change(event) {
        this.setState({question6: event.target.value});
        this.clearSpan(event.target.id);
    }

    clearSpan(inputID) {
        let spanID = inputID.split("-")[1] + "-span",
            spanElement = document.getElementById(spanID);
        spanElement.innerHTML = "";
    }

    isFieldsEmpty() {
        let rating = this.state.rating,
            question1 = this.state.question1,
            question2 = this.state.question2,
            question3 = this.state.question3,
            question4 = this.state.question4,
            question5 = this.state.question5,
            question6 = this.state.question6,
            emptyFieldMessage = "Please, fill the field",
            questions = [question1, question2, question3, question4, question5, question6],
            emptyQuestions = [],
            fieldsEmpty = true;

        if(!rating) {
            this.setState({ratingError: emptyFieldMessage});
        }

        questions.forEach((item, i) => {
            let question = item,
                emptyQuestion = !question || question.match(FIELD_SPACE_REGEX),
                fieldId = "question"+(i+1)+"-span";
            emptyQuestions.push(emptyQuestion);
            if (emptyQuestion) {
                let spanError = document.getElementById(fieldId);
                spanError.innerHTML = emptyFieldMessage;
            }
        });

        if(!emptyQuestions.includes(true) && rating) {
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
            this.state.question1 ||
            this.state.question2 ||
            this.state.question3 ||
            this.state.question4 ||
            this.state.question5 ||
            this.state.question6){
            this.setState({
                confirmText: "Are you sure you want to cancel without saving changes?"
            });
            this.openModalConfirm();
        } else {
            this.props.history.push("/interviews-upcoming");
        }
    }

    render() {

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
                    <title>Edit Feedback</title>
                </Helmet>
                <div className="row sameheight-container custom-btn-group">
                    <div className="col-md-12">

                        <PageTitle
                            pageTitle='Edit Feedback'
                            showBackBtn={true}
                            showButton={false}
                            backBtnId="back-edit-feedback"
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

                            <div className="form-group has-error">
                                <label className="control-label form-label">Question 1</label>
                                <p className="form-sublabel back-link">Maximum 2000 characters</p>
                                <TextareaAutosize
                                    id="feedback-edit-question1"
                                    type="text"
                                    name="question1"
                                    placeholder='Input your '
                                    className="form-control boxed"
                                    maxLength="2000"
                                    value={this.state.question1}
                                    onChange={(event) => this.handleQuestion1Change(event)}
                                    autoFocus
                                />
                                <span
                                    id="question1-span"
                                    className="has-error error-message">
                                </span>
                            </div>

                            <div className="form-group form-field-margin">
                                <label className="control-label form-label">Question 2</label>
                                <p className="form-sublabel back-link">Maximum 2000 characters</p>
                                <TextareaAutosize
                                    id="feedback-edit-question2"
                                    name="question2"
                                    placeholder="Input Description"
                                    className="form-control boxed"
                                    maxLength="2000"
                                    value={this.state.question2}
                                    onChange={(event) => this.handleQuestion2Change(event)}
                                />
                                <span
                                    id="question2-span"
                                    className="has-error error-message">
                                </span>
                            </div>

                            <div className="form-group form-field-margin">
                                <label className="control-label form-label">Question 3</label>
                                <p className="form-sublabel back-link">Maximum 2000 characters</p>
                                <TextareaAutosize
                                    id="feedback-edit-question3"
                                    name="question3"
                                    placeholder="Input Description"
                                    className="form-control boxed"
                                    maxLength="2000"
                                    value={this.state.question3}
                                    onChange={(event) => this.handleQuestion3Change(event)}
                                />
                                <span
                                    id="question3-span"
                                    className="has-error error-message">
                                </span>
                            </div>

                            <div className="form-group form-field-margin">
                                <label className="control-label form-label">Question 4</label>
                                <p className="form-sublabel back-link">Maximum 2000 characters</p>
                                <TextareaAutosize
                                    id="feedback-edit-question4"
                                    name="question4"
                                    placeholder="Input Description"
                                    className="form-control boxed"
                                    maxLength="2000"
                                    value={this.state.question4}
                                    onChange={(event) => this.handleQuestion4Change(event)}
                                />
                                <span
                                    id="question4-span"
                                    className="has-error error-message">
                                </span>
                            </div>

                            <div className="form-group form-field-margin">
                                <label className="control-label form-label">Question 5</label>
                                <p className="form-sublabel back-link">Maximum 2000 characters</p>
                                <TextareaAutosize
                                    id="feedback-edit-question5"
                                    name="question5"
                                    placeholder="Input Description"
                                    className="form-control boxed"
                                    maxLength="2000"
                                    value={this.state.question5}
                                    onChange={(event) => this.handleQuestion5Change(event)}
                                />
                                <span
                                    id="question5-span"
                                    className="has-error error-message">
                                </span>
                            </div>

                            <div className="form-group form-field-margin">
                                <label className="control-label form-label">Question 6</label>
                                <p className="form-sublabel back-link">Maximum 2000 characters</p>
                                <TextareaAutosize
                                    id="interview-question6"
                                    name="question6"
                                    placeholder="Input Description"
                                    className="form-control boxed"
                                    maxLength="2000"
                                    value={this.state.question6}
                                    onChange={(event) => this.handleQuestion6Change(event)}
                                />
                                <span
                                    id="question6-span"
                                    className="has-error error-message">
                                </span>
                            </div>

                            <div className="form-group">
                                <button
                                    id="create-interview-submitBtn"
                                    type="submit"
                                    className="btn btn-primary"
                                >Create
                                </button>
                                <button
                                    id="create-interview-resetBtn"
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
    }
}

export default connect(mapStateToProps)(InterviewFeedbackEdit);