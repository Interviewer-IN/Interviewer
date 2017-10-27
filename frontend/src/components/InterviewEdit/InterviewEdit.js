import React, {Component} from "react";
import Helmet from "react-helmet";
import {Modal, Button} from "react-bootstrap";
import {connect} from "react-redux";
import DatePicker from "react-datepicker";
import moment from 'moment';
import "./InterviewEdit.css";
import PageTitle from "./../../containers/PageTitle";
import {getInterviews, updateInterview} from "../../redux/actions/interviewActions";
import {getVacancies} from "../../redux/actions/vacanciesActions";
import {getCandidates} from "../../redux/actions/candidatesActions";
import {showProjects} from "../../redux/actions/projectActions";
import {getPositions} from "../../redux/actions/positionActions";
import {getLevels} from "../../redux/actions/levelsActions";

class InterviewEdit extends Component {

    constructor(props) {
        super(props);
        this.state = {
            date: "",
            currentInterview: "",
            showModalConfirm: false,
            confirmText: "",
            dateError: "",
            isHR: false,
        }
    }

    componentWillMount() {
        this.props.onCheckUserRole();
        const {dispatch} = this.props;
        dispatch(getVacancies());
        dispatch(showProjects());
        dispatch(getCandidates());
        dispatch(getPositions());
        dispatch(getLevels());

        if (this.props.interviews.interviews.length < 1) {
            dispatch(getInterviews(this.props.match.params.id)).then(() => {
                let currentInterview = this.props.interviews.currentInterview;
                this.setStates(currentInterview);
            });
        } else {
            let interviews = this.props.interviews.interviews;
            let interviewId = this.props.match.params.id;
            let currentInterview = interviews.find(currentInterview => currentInterview.id === +interviewId) || {};
            this.setStates(currentInterview);
        }

        let isUserHR = this.props.onCheckUserRole(true);
        if (isUserHR) {
            this.setState({isHR: true})
        }
    }

    setStates(currentInterview) {
        this.setState({currentInterview: currentInterview});
        this.setState({date: moment(currentInterview.date_time)});
    }

    handleDateChange(date) {
        this.setState({date: date});
        this.setState({dateError: ""});

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

    leaveEdit() {
        this.closeModalConfirm();
        this.props.history.push("/interviews-upcoming/");
    }

    validateFormFields(event) {
        let date = this.state.date,
            emptyFieldMessage = "Please, choose an option";

        if (!date) {
            event.preventDefault();
            this.setState({
                dateError: emptyFieldMessage
            });
        }

        if (date) {
            let candidateID = this.getOptionID("candidate"),
                vacancyID = this.getOptionID("vacancy"),
                interviewID = this.state.currentInterview.id;
            event.preventDefault();
            this.props.history.push("/interviews-upcoming");
            const {dispatch} = this.props;
            dispatch(updateInterview(
                {
                    id: interviewID,
                    date_time: date,
                    candidate_id: candidateID,
                    vacancy_id: vacancyID,
                    user_id: 19,
                    rating_id: 12
                }
            ));
        }
    }

    getOptionID(selectId) {
        let e = document.getElementById(selectId);
        let selectedOptionID = e.options[e.selectedIndex].id;
        return +selectedOptionID;
    }

    isFieldsNotEmpty(event) {
        event.preventDefault();
        if (this.state.date ||
            this.state.candidate ||
            this.state.vacancy ||
            this.state.interviewer) {
            this.setState({
                confirmText: "Are you sure you want to cancel without saving changes?"
            });
            this.openModalConfirm();
        } else {
            this.props.history.push("/interviews-upcoming");
        }
    }


    render() {

        let candidates = this.props.candidates,
            vacancies = this.props.vacancies,
            projects = this.props.projects,
            levels = this.props.levels,
            positions = this.props.positions,
            currentCandidateObj = candidates.find(item => this.state.currentInterview.candidate_id === item.id) || "",
            currentVacancyObj = vacancies.find(item => this.state.currentInterview.vacancy_id === item.id) || "";

        let showCandidates = (candidate) => {
            if (candidate) {

                let options = [],
                    selectedCandidate;

                if (candidates.length) {
                    let compareSurname = (a, b) => {
                            if (a.surname > b.surname) return 1;
                            if (a.surname < b.surname) return -1;
                        },
                        sortedCandidates = candidates.sort(compareSurname) || {};

                    options = sortedCandidates.map((item, index) => {
                        let currentCandidate = "" + item.surname + " " + item.name + "";
                        return (
                            <option key={index} id={item.id}>{currentCandidate}</option>
                        )
                    });
                    selectedCandidate = " " + currentCandidateObj.surname + " " + currentCandidateObj.name + " ";
                }

                return (
                    <div className="form-group">
                        <label className="control-label">Candidate</label>
                        <select className="form-control form-control-sm filter-select custom-mode"
                                id="candidate"
                                onChange={(event) => this.handleCandidateChange(event)}
                        >
                            <option id={candidate.id}>{selectedCandidate}</option>
                            {options}
                        </select>
                    </div>
                );
            }
        };

        let showVacancies = (vacancy) => {
            if (vacancy) {

                let options = [],
                    selectedVacancy;

                if (vacancies.length && positions.length && projects.length && levels.length) {

                    let comparePositions = (a, b) => {
                            let first = positions.find(item => a.position_id === item.id);
                            let second = positions.find(item => b.position_id === item.id);

                            if (first.name > second.name) return 1;
                            if (first.name < second.name) return -1;
                        },
                        sortedVacancies = vacancies.sort(comparePositions) || {};

                    options = sortedVacancies.map((item, index) => {
                        let currentProject = projects.find(current => item.project_id === current.id),
                            currentLevel = levels.find(current => item.level_id === current.id),
                            currentPosition = positions.find(current => item.position_id === current.id);


                        let position = "" + currentPosition.name + " " + currentLevel.name + " " + currentProject.title;
                        return (
                            <option key={index} id={item.id}>{position}</option>
                        )
                    });

                    let selectedProject = projects.find(current => vacancy.project_id === current.id),
                        selectedLevel = levels.find(current => vacancy.level_id === current.id),
                        selectedPosition = positions.find(current => vacancy.position_id === current.id);

                    selectedVacancy = " " + selectedPosition.name + " " +
                        selectedLevel.name + " " +
                        selectedProject.title + " ";
                }

                return (
                    <div className="form-group">
                        <label className="control-label">Vacancy</label>
                        <select className="form-control form-control-sm filter-select custom-mode"
                                id="vacancy"
                                onChange={(event) => this.handleVacancyChange(event)}
                        >
                            <option id={vacancy.id}>{selectedVacancy}</option>
                            {options}
                        </select>
                    </div>
                );
            }
        };


        let id = this.state.currentInterview.id;

        return (
            <div>
                <Helmet>
                    <title>{this.state.projectTitle}</title>
                </Helmet>
                <div className="row sameheight-container custom-btn-group">
                    <div className="col-md-12">
                        <PageTitle
                            pageTitle='Edit Interview'
                            showBackBtn={true}
                            showButton={false}
                            backBtnId="back-create-interview"
                            titleForButton=''
                            linkForButton=''
                        />

                        <form onSubmit={(event) => this.validateFormFields(event)}>

                            <div className="clearfix form-group">
                                <div className="create-interview-select">
                                    <label className="control-label">Date</label>
                                    <DatePicker
                                        className="form-control form-control-sm filter-select"
                                        placeholderText="Date"
                                        selected={this.state.date}
                                        onChange={(event) => this.handleDateChange(event)}
                                        showTimeSelect
                                        timeFormat="HH:mm"
                                        timeIntervals={15}
                                        dateFormat="LLL"
                                    />
                                    <span className="has-error error-message">{this.state.dateError}</span>
                                </div>
                            </div>

                            {showCandidates(currentCandidateObj)}
                            {showVacancies(currentVacancyObj)}

                            {/*<div className="form-group form-field-margin">*/}
                            {/*<div>*/}
                            {/*<label className="control-label">Interviewer</label>*/}
                            {/*<select className="form-control form-control-sm create-interview-select-long"*/}
                            {/*onChange={(event) => this.handleInterviewerChange(event)}*/}
                            {/*>*/}
                            {/*<option>K. Makiy</option>*/}
                            {/*<option>A. Larin</option>*/}
                            {/*<option>T. Grabets</option>*/}
                            {/*</select>*/}
                            {/*<span className="has-error error-message">{this.state.interviewerError}</span>*/}
                            {/*</div>*/}
                            {/*</div>*/}
                            <div className="form-group">
                                <button
                                    id="create-interview-submitBtn"
                                    type="submit"
                                    className="btn btn-primary"
                                >Save
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
                            <p>{this.state.confirmText}</p>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button
                                id={"pe-btn-modal-yes-" + id}
                                className="btn btn-primary"
                                onClick={() => this.leaveEdit()}
                            >Yes
                            </Button>
                            <Button
                                id={"pe-btn-modal-no-" + id}
                                className="btn btn-danger"
                                onClick={() => this.closeModalConfirm()}
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
        interviews: state.interviews,
        currentInterview: state.interviews.currentInterview,
        vacancies: state.vacancies.vacancies,
        candidates: state.candidates.candidates,
        projects: state.project.projects,
        levels: state.levels.levels,
        positions: state.positions.positions,

    }
}

export default connect(mapStateToProps)(InterviewEdit);