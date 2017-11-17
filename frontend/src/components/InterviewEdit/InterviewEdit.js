import React, {Component} from "react";
import Helmet from "react-helmet";
import {Modal, Button} from "react-bootstrap";
import {connect} from "react-redux";
import DatePicker from "react-datepicker";
import moment from "moment";
import "./InterviewEdit.css";
import PageTitle from "./../../containers/PageTitle";
import {getInterview, updateInterview} from "../../redux/actions/interviewActions";
import {getVacancies} from "../../redux/actions/vacanciesActions";
import {getCandidates} from "../../redux/actions/candidatesActions";
import {showProjects} from "../../redux/actions/projectActions";
import {getPositions} from "../../redux/actions/positionActions";
import {getLevels} from "../../redux/actions/levelsActions";
import {getInterviewers} from "../../redux/actions/interviewersActions";
import Select from "react-select";
import "react-select/dist/react-select.css";

class InterviewEdit extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentInterview: "",
            date: "",
            candidate: "",
            vacancy: "",
            project: "",
            interviewer: "",
            position: "",
            level: "",
            isHR: false,
            showModalConfirm: false,
            confirmText: "",
        }
    }

    componentWillMount() {

        let isUserHR = this.props.onCheckUserRole(true);
        if (isUserHR) {
            this.setState({isHR: true})
        }

        if (this.props.interviews.interviews.length > 0 ||
            this.props.candidates.length > 0 ||
            this.props.vacancies.length > 0 ||
            this.props.projects.length > 0 ||
            this.props.interviewers.length > 0 ||
            this.props.positions.length > 0 ||
            this.props.levels.length > 0) {
            let interviews = this.props.interviews.interviews,
                currentInterviewId = this.props.match.params.id,
                candidates = this.props.candidates,
                vacancies = this.props.vacancies,
                projects = this.props.projects,
                interviewers = this.props.interviewers,
                positions = this.props.positions,
                levels = this.props.levels,
                currentInterview = interviews.find((currentItem) => {
                    return (
                        currentItem.id === +currentInterviewId
                    )
                });
            this.setStates(currentInterview, candidates, vacancies, projects, interviewers, positions, levels);
        } else {
            const {dispatch} = this.props;

            dispatch(getInterview(this.props.match.params.id)).then(() => {
                let currentInterview = this.props.interviews.currentInterview;

                dispatch(getCandidates()).then(() => {
                    let candidates = this.props.candidates;

                    dispatch(getVacancies()).then(() => {
                        let vacancies = this.props.vacancies;

                        dispatch(showProjects()).then(() => {
                            let projects = this.props.projects;

                            dispatch(getInterviewers()).then(() => {
                                let interviewers = this.props.interviewers;

                                dispatch(getPositions()).then(() => {
                                    let positions = this.props.positions;

                                    dispatch(getLevels()).then(() => {
                                        let levels = this.props.levels;

                                        dispatch(getVacancies()).then(() => {
                                            let vacancies = this.props.vacancies;

                                            this.setStates(
                                                currentInterview,
                                                candidates,
                                                vacancies,
                                                projects,
                                                interviewers,
                                                positions,
                                                levels
                                            );
                                        });
                                    });
                                });
                            });
                        });
                    });
                });
            });
        }
    }

    setStates(currentInterview, candidates, vacancies, projects, interviewers, positions, levels) {


        let currentCandidateObj = candidates.find(item => currentInterview.candidate_id === item.id),
            currentVacancyObj = vacancies.find(item => currentInterview.vacancy_id === item.id),
            currentInterviewerObj = interviewers.find(item => currentInterview.user_id === item.id),
            currentProjectObj = projects.find(item => currentVacancyObj.project_id === item.id),
            currentPositionObj = positions.find(item => currentVacancyObj.position_id === item.id),
            currentLevelObj = levels.find(item => currentVacancyObj.level_id === item.id);


        let currentCandidateState = {
                value: currentCandidateObj.id,
                label: "" + currentCandidateObj.surname + " " + currentCandidateObj.name + "",
                className: "option-class"
        };

        let currentVacancyState = {
            value: currentVacancyObj.id,
            label: "" + currentPositionObj.name +
            " " + currentLevelObj.name + "" + " for " + currentProjectObj.title + "",
            className: "option-class"
        };

        let currentInterviewerState = {
            value: currentInterviewerObj.id,
            label: "" + currentInterviewerObj.surname + " " + currentInterviewerObj.surname + "",
            className: "option-class"
        };


        this.setState({
            currentInterview: currentInterview,
            date: moment(currentInterview.date_time),
            candidate: currentCandidateState,
            vacancy: currentVacancyState,
            interviewer: currentInterviewerState,
        });
    }

    handleDateChange(date) {
        this.setState({date: date});
    }

    showMConfirmMessage() {
        this.setState({
            confirmText: "Are you sure you want to cancel without saving changes?"
        });
        this.openModalConfirm();
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

    submitForm(event) {
        event.preventDefault();
        let interviewID = this.state.currentInterview.id,
            date = this.state.date,
            candidateID = this.state.candidate.value,
            vacancyID = this.state.vacancy.value,
            interviewerID = this.state.interviewer.value;
        this.props.history.push("/interviews-upcoming");
        const {dispatch} = this.props;
        dispatch(updateInterview(
            {
                id: interviewID,
                date_time: date,
                candidate_id: candidateID,
                vacancy_id: vacancyID,
                user_id: interviewerID,
                rating_id: 12
            }
        ));
    }

    render() {

        let candidates = this.props.candidates,
            vacancies = this.props.vacancies,
            interviewers = this.props.interviewers,
            projects = this.props.projects,
            levels = this.props.levels,
            positions = this.props.positions;

        let showCandidates = () => {

            let options = [],
                selectedCandidate,
                selectedCandidateLabel;

            if (candidates.length && this.state.currentInterview) {
                let compareSurname = (a, b) => {
                        if (a.surname > b.surname) return 1;
                        if (a.surname < b.surname) return -1;
                    },
                    sortedCandidates = candidates.sort(compareSurname) || {};


                sortedCandidates.map((item, index) => {
                    let currentCandidate = {
                        value: item.id,
                        label: "" + item.surname + " " + item.name + "", className: "option-class"
                    };
                    options.push(currentCandidate);
                });
            }

            return (

                <div className="form-group search-box_input">
                    <label className="control-label">Candidate
                        <span className="required-field">*</span>
                    </label>
                    <Select
                        name="university"
                        options={options}
                        onChange={(candidate) => this.setState({candidate})}
                        value={this.state.candidate}
                    />
                </div>
            );
        };

        let showVacancies = () => {

            let options = [],
                selectedVacancy,
                selectedVacancyLabel;

            if (
                vacancies.length &&
                positions.length &&
                projects.length &&
                levels.length &&
                this.state.currentInterview
            ) {

                let comparePositions = (a, b) => {
                        let first = positions.find(item => a.position_id === item.id);
                        let second = positions.find(item => b.position_id === item.id);

                        if (first.name > second.name) return 1;
                        if (first.name < second.name) return -1;
                    },
                    sortedVacancies = vacancies.sort(comparePositions) || {};

                sortedVacancies.map((item, index) => {
                    let currentProject = projects.find(current => item.project_id === current.id),
                        currentLevel = levels.find(current => item.level_id === current.id),
                        currentPosition = positions.find(current => item.position_id === current.id);

                    let currentVacancy = {
                        value: item.id,
                        label: "" + currentPosition.name + " " + currentLevel.name + " for " + currentProject.title,
                        className: "option-class"
                    };
                    options.push(currentVacancy);
                });
            }

            return (

                <div className="form-group search-box_input">
                    <label className="control-label">Vacancy
                        <span className="required-field">*</span>
                    </label>
                    <Select
                        name="university"
                        options={options}
                        onChange={(vacancy) => this.setState({ vacancy })}
                        value={this.state.vacancy}
                    />
                </div>
            );
        };

        let showInterviewers = () => {

            let options = [],
                selectedInterviewer,
                selectedInterviewerLabel;

            if (interviewers.length && this.state.currentInterview) {
                let compareNickname = (a, b) => {
                        if (a.surname > b.surname) return 1;
                        if (a.surname < b.surname) return -1;
                    },
                    sortedCandidates = interviewers.sort(compareNickname) || {};


                sortedCandidates.map((item, index) => {
                    let currentInterviewer = {
                        value: item.id,
                        label: "" + item.surname + " " + item.name + "",
                        className: "option-class"
                    };
                    options.push(currentInterviewer);
                });
            }

            return (

                <div className="form-group search-box_input">
                    <label className="control-label">Interviewer
                        <span className="required-field">*</span>
                    </label>
                    <Select
                        name="university"
                        options={options}
                        onChange={(interviewer) => this.setState({interviewer})}
                        value={this.state.interviewer}
                    />
                </div>
            );
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

                        <form onSubmit={(event) => this.submitForm(event)}>

                            <div className="clearfix form-group">
                                <div className="create-interview-select">
                                    <label className="control-label">Date
                                        <span className="required-field">*</span>
                                    </label>
                                    <p className="form-sublabel back-link">You can pick only date starting from today</p>
                                    <DatePicker
                                        className="form-control form-control-sm filter-select"
                                        selected={this.state.date}
                                        onChange={(event) => this.handleDateChange(event)}
                                        showTimeSelect
                                        timeFormat="HH:mm"
                                        timeIntervals={15}
                                        dateFormat="LLL"
                                        minDate={moment()}
                                    />
                                    <span className="has-error error-message">{this.state.dateError}</span>
                                </div>
                            </div>

                            {showCandidates()}
                            {showVacancies()}
                            {showInterviewers()}

                            <div className="form-group">
                                <button
                                    id="create-interview-submitBtn"
                                    type="submit"
                                    className="btn btn-primary"
                                >Save
                                </button>
                                <button
                                    id="create-interview-resetBtn"
                                    type="reset"
                                    className="btn btn-danger"
                                    onClick={(event) => this.showMConfirmMessage(event)}
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
        currentCandidate: state.candidates.currentCandidate,
        projects: state.project.projects,
        levels: state.levels.levels,
        positions: state.positions.positions,
        interviewers: state.interviewers.interviewers,
    }
}

export default connect(mapStateToProps)(InterviewEdit);