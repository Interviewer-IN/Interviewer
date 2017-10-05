import React, {Component} from "react";
import Helmet from "react-helmet";
import PageTitle from "./../../containers/PageTitle";
import {Modal, Button} from "react-bootstrap";
import "./CreateInterview.css";
import {connect} from "react-redux";

class CreateInterview extends Component {

    constructor(props) {
        super(props);
        this.state = {
            date: "",
            time: "",
            candidate:"",
            vacancy: "",
            interviewer: "",
            dateError: "",
            timeError: "",
            candidateError: "",
            vacancyError: "",
            interviewerError: "",
            showModalAlert: false,
            showModalConfirm: false,
            showModaLCreateAlert: false,
        };
    }

    componentWillMount() {
        this.props.onCheckUserRole(true);
    }


    handleDateChange(event) {
        this.setState({date: event.target.value});
        this.setState({dateError: ""});
    }

    handleTimeChange(event) {
        this.setState({time: event.target.value});
        this.setState({timeError: ""});
    }

    handleCandidateChange(event) {
        this.setState({candidate: event.target.value});
        this.setState({candidateError: ""});
    }

    handleVacancyChange(event) {
        this.setState({vacancy: event.target.value});
        this.setState({vacancyError: ""});
    }

    handleInterviewerChange(event) {
        this.setState({interviewer: event.target.value});
        this.setState({interviewerError: ""});
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

    validateFormFields(event) {
        let date = this.state.date;
        let time = this.state.time;
        let candidate = this.state.candidate;
        let vacancy = this.state.vacancy;
        let interviewer = this.state.interviewer;
        let emptyFieldMessage = "Please, choose an option";

        if (!date) {
            event.preventDefault();
            this.setState({
                dateError: emptyFieldMessage
            });
        }
        if (!time) {
            event.preventDefault();
            this.setState({
                timeError: emptyFieldMessage
            });
        }
        if (!candidate) {
            event.preventDefault();
            this.setState({
                candidateError: emptyFieldMessage
            });
        }
        if (!vacancy) {
            event.preventDefault();
            this.setState({
                vacancyError: emptyFieldMessage
            });
        }
        if (!interviewer) {
            event.preventDefault();
            this.setState({
                interviewerError: emptyFieldMessage
            });
        }
        if (date &&
            time &&
            candidate &&
            vacancy &&
            interviewer) {
            event.preventDefault();
            this.props.history.push("/interviews-upcoming");
        }
    }

    leaveForm() {
        this.resetFormFields();
        this.closeModalConfirm();
        this.props.history.push("/interviews-upcoming");
    }

    resetFormFields() {
        this.setState({date: ""});
        this.setState({time: ""});
        this.setState({candidate: ""});
        this.setState({vacancy: ""});
        this.setState({interviewer: ""});
    }

    isFieldsNotEmpty(event) {
        event.preventDefault();
        if (this.state.date ||
            this.state.time ||
            this.state.candidate ||
            this.state.vacancy ||
            this.state.interviewer ) {
            this.setState({
                confirmText: "Are you sure you want to cancel without saving changes?"
            });
            this.openModalConfirm();
        } else {
            this.props.history.push("/interviews-upcoming");
        }
    }


    render() {

        return (
            <div>
                <Helmet>
                    <title>Create Interview</title>
                </Helmet>
                <div className="row sameheight-container custom-btn-group">
                    <div className="col-md-12">
                        <PageTitle
                            pageTitle='Create Interview'
                            showBackBtn={true}
                            showButton={false}
                            backBtnId="back-create-interview"
                            titleForButton=''
                            linkForButton=''
                        />

                        <form onSubmit={(event) => this.validateFormFields(event)}>

                            <div className="clearfix form-group">
                                <div className="float-left create-interview-select">
                                    <label className="control-label">Date</label>
                                    <select className="form-control form-control-sm filter-select"
                                            onChange={(event)=>this.handleDateChange(event)}
                                    >
                                        <option>01-10-2017</option>
                                        <option>02-10-2017</option>
                                        <option>03-10-2017</option>
                                        <option>04-10-2017</option>
                                    </select>
                                    <span className="has-error error-message">{this.state.dateError}</span>
                                </div>
                                <div className="float-left">
                                    <label className="control-label">Time</label>
                                    <select className="form-control form-control-sm filter-select"
                                            onChange={(event)=>this.handleTimeChange(event)}
                                    >
                                        <option>10:00</option>
                                        <option>11:00</option>
                                        <option>12:00</option>
                                        <option>13:00</option>
                                    </select>
                                    <span className="has-error error-message">{this.state.timeError}</span>
                                </div>
                            </div>
                            <div className="form-group">
                                <div>
                                    <label className="control-label">Candidate</label>
                                    <select className="form-control form-control-sm create-interview-select-long"
                                            onChange={(event)=>this.handleCandidateChange(event)}
                                    >
                                        <option>Sponge Bob</option>
                                        <option>Sandy</option>
                                        <option>Bob</option>
                                    </select>
                                    <span className="has-error error-message">{this.state.candidateError}</span>
                                </div>
                            </div>
                            <div className="form-group">
                                <div>
                                    <label className="control-label">Vacancy</label>
                                    <select className="form-control form-control-sm create-interview-select-long"
                                            onChange={(event)=>this.handleVacancyChange(event)}
                                    >
                                        <option>Chief Cooker for The Krusty Krab</option>
                                        <option>Regular Waiter for Formula-1</option>
                                        <option>Intern Babysitter for Home</option>
                                    </select>
                                    <span className="has-error error-message">{this.state.vacancyError}</span>
                                </div>
                            </div>
                            <div className="form-group form-field-margin">
                                <div>
                                    <label className="control-label">Interviewer</label>
                                    <select className="form-control form-control-sm create-interview-select-long"
                                            onChange={(event)=>this.handleInterviewerChange(event)}
                                    >
                                        <option>K. Makiy</option>
                                        <option>A. Larin</option>
                                        <option>T. Grabets</option>
                                    </select>
                                    <span className="has-error error-message">{this.state.interviewerError}</span>
                                </div>
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
    }
}

export default connect(mapStateToProps)(CreateInterview);