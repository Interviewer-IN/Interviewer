import React, {Component} from "react";
import {connect} from "react-redux";
import {Modal, Button, PanelGroup} from "react-bootstrap";
import Helmet from "react-helmet";
import "./InterviewFeedbackEdit.css";
import PageTitle from "./../../containers/PageTitle";


class InterviewFeedbackEdit extends Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    }

    componentWillMount() {
        this.props.onCheckUserRole(true);
        let isUserHR = this.props.onCheckUserRole(true);
        if (isUserHR) {
            this.props.history.push('/interviews-completed');
        }
    }

    render() {

        return (
            <div>
                <Helmet>
                    <title>Edit Feedback</title>
                </Helmet>
                <div className="row sameheight-container custom-btn-group">
                    <div className="col-md-12">

                        <PageTitle
                            pageTitle='Add Feedback'
                            showBackBtn={true}
                            showButton={false}
                            backBtnId="back-create-interview"
                            titleForButton=''
                            linkForButton=''
                        />

                        <form name="addFeedback" onSubmit={(event) => this.validateFormFields(event)}>

                            <div className="clearfix form-group">
                                <div className="float-left create-interview-select">
                                    <label className="control-label">Rate the candidate</label>
                                    <select className="form-control form-control-sm filter-select"
                                            id="interview-rating"
                                            onChange={(event)=>this.handleRatingChange(event)}
                                    >
                                        <option>0</option>
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                    </select>
                                    <span className="has-error error-message">{this.state.ratingError}</span>
                                </div>
                            </div>

                            <div className="form-group has-error">
                                <label className="control-label form-label">Question 1</label>
                                <p className="form-sublabel back-link">Maximum 60 characters</p>
                                <input
                                    id="interview-question1"
                                    type="text"
                                    name="question1"
                                    placeholder='Input your '
                                    className="form-control boxed"
                                    maxLength="60"
                                    value={this.state.question1}
                                    onChange={(event) => this.handleQuestion1Change(event)}
                                    autoFocus
                                />
                                <span className="has-error error-message">{this.state.question1Error}</span>
                            </div>

                            <div className="form-group form-field-margin">
                                <label className="control-label form-label">Question 2</label>
                                <p className="form-sublabel back-link">Maximum 3000 characters</p>
                                <input
                                    id="interview-question2"
                                    name="question2"
                                    placeholder="Input Description"
                                    className="form-control boxed"
                                    maxLength="3000"
                                    value={this.state.question2}
                                    onChange={(event) => this.handleQuestion2Change(event)}
                                />
                                <span className="has-error error-message">{this.state.question2Error}</span>
                            </div>

                            <div className="form-group form-field-margin">
                                <label className="control-label form-label">Question 3</label>
                                <p className="form-sublabel back-link">Maximum 3000 characters</p>
                                <input
                                    id="interview-question3"
                                    name="question3"
                                    placeholder="Input Description"
                                    className="form-control boxed"
                                    maxLength="3000"
                                    value={this.state.question3}
                                    onChange={(event) => this.handleQuestion3Change(event)}
                                />
                                <span className="has-error error-message">{this.state.question3Error}</span>
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

function mapStateToProps(state) {
    return {
    }
}

export default connect(mapStateToProps)(InterviewFeedbackEdit);
