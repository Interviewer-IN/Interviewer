import React, {Component} from "react";
import Helmet from "react-helmet";
import {Modal, Button} from "react-bootstrap";
import {connect} from "react-redux";
import DatePicker from "react-datepicker";
import moment from "moment";
import "./InterviewEdit.css";
import PageTitle from "./../../containers/PageTitle";
import {getInterviews, updateInterview} from "../../redux/actions/interviewActions";
import {getVacancies} from "../../redux/actions/vacanciesActions";
import {getCandidates, getCandidate} from "../../redux/actions/candidatesActions";
import {showProjects} from "../../redux/actions/projectActions";
import {getPositions} from "../../redux/actions/positionActions";
import {getLevels} from "../../redux/actions/levelsActions";
import Select from "react-select";
import "react-select/dist/react-select.css";

class InterviewEdit extends Component {

    constructor(props) {
        super(props);
        this.state = {
            date: "",
            isHR: false,
            currentInterview: "",
            candidate: "",
            vacancy: "",
            showModalConfirm: false,
            confirmText: "",
        }
    }

    componentWillMount() {

        let isUserHR = this.props.onCheckUserRole(true);
        if (isUserHR) {
            this.setState({isHR: true})
        }

        const {dispatch} = this.props;

        if (!this.props.positions.length){
            dispatch(getCandidates());
        }

        if (!this.props.positions.length){
            dispatch(getVacancies());
        }

        if (!this.props.projects.length){
            dispatch(showProjects());
        }

        if (!this.props.positions.length){
            dispatch(getPositions());
        }

        if (!this.props.positions.length){
            dispatch(getCandidates());
        }

        if (!this.props.levels.length){
            dispatch(getLevels());
        }

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
    }

    setStates(currentInterview) {
        let currentCandidateID = currentInterview.candidate_id;
        const {dispatch} = this.props;
        dispatch(getCandidate(currentCandidateID));

        this.setState({currentInterview: currentInterview});
        this.setState({date: moment(currentInterview.date_time)});
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
            candidate = this.state.candidate,
            vacancy = this.state.vacancy,
            date = this.state.date,
            candidateID, vacancyID;

        if (!candidate) {
            candidateID = this.state.currentInterview.candidate_id;
        }

        if (!vacancy) {
            vacancyID = this.state.currentInterview.vacancy_id;
        }

        if (candidate || vacancy) {
            candidateID = this.state.candidate.value;
            vacancyID = this.state.vacancy.value;
        }
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

    render() {

        let candidates = this.props.candidates,
            vacancies = this.props.vacancies,
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

                selectedCandidate = options.find(current => this.state.currentInterview.candidate_id === current.value);
                if (selectedCandidate) {
                    selectedCandidateLabel = selectedCandidate.label;
                }
            }

            return (

                <div className="form-group search-box_input">
                    <label className="control-label">Candidate</label>
                    <Select
                        name="university"
                        options={options}
                        onChange={(candidate) => this.setState({candidate})}
                        value={this.state.candidate}
                        placeholder={selectedCandidateLabel}
                    />
                </div>
            );
        };

        let showVacancies = () => {

            let options = [],
                selectedVacancy,
                selectedVacancyLabel;

            if (vacancies.length && positions.length && projects.length && levels.length && this.state.currentInterview) {

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

                    let currentVacancy = {value: item.id,
                        label: "" + currentPosition.name + " " + currentLevel.name + " " + currentProject.title,
                        className: "option-class"};
                    options.push(currentVacancy);
                });

                selectedVacancy = options.find(current => this.state.currentInterview.vacancy_id === current.value);
                if (selectedVacancy) {
                    selectedVacancyLabel = selectedVacancy.label;
                }
            }

            return (

                <div className="form-group search-box_input">
                    <label className="control-label">Vacancy</label>
                    <Select
                        name="university"
                        options={options}
                        onChange={(vacancy) => this.setState({ vacancy })}
                        value={this.state.vacancy}
                        placeholder={selectedVacancyLabel}
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
                                    <label className="control-label">Date</label>
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
    }
}

export default connect(mapStateToProps)(InterviewEdit);