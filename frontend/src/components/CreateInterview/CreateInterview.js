import React, {Component} from "react";
import Helmet from "react-helmet";
import PageTitle from "./../../containers/PageTitle";
import {Modal, Button} from "react-bootstrap";
import "./CreateInterview.css";
import {connect} from "react-redux";
import DatePicker from "react-datepicker";
import moment from "moment";
import {createInterview} from "../../redux/actions/interviewActions";
import {getVacancies} from "../../redux/actions/vacanciesActions";
import {getCandidates} from "../../redux/actions/candidatesActions";
import {showProjects} from "../../redux/actions/projectActions";
import {getPositions} from "../../redux/actions/positionActions";
import {getLevels} from "../../redux/actions/levelsActions";
import {getInterviewers} from "../../redux/actions/interviewersActions";
import Select from "react-select";
import "react-select/dist/react-select.css";

class CreateInterview extends Component {

    constructor(props) {
        super(props);
        this.state = {
            date: "",
            candidate: "",
            vacancy: "",
            interviewer: "",
            dateError: "",
            candidateError: "",
            vacancyError: "",
            interviewerError: "",
            showModalAlert: false,
            showModalConfirm: false,
            showModaLCreateAlert: false,
            selectValue: ""
        };
    }

    componentWillMount() {
        this.props.onCheckUserRole(true);
        const {dispatch} = this.props;

        if (!this.props.vacancies.length){
            dispatch(getVacancies());
        }

        if (!this.props.projects.length){
            dispatch(showProjects());
        }

        if (!this.props.candidates.length){
            dispatch(getCandidates());
        }

        if (!this.props.interviewers.length){
            dispatch(getInterviewers());
        }

        if (!this.props.positions.length){
            dispatch(getPositions());
        }

        if (!this.props.levels.length){
            dispatch(getLevels());
        }
    }

    handleDateChange(date) {
        this.setState({date: date});
        this.setState({dateError: ""});
    }

    handleCandidateChange(candidate) {
        this.setState({candidate: candidate.candidate});
        this.setState({candidateError: ""});
    }

    handleInterviewerChange(interviewer) {
        this.setState({interviewer: interviewer.interviewer});
        this.setState({interviewerError: ""});
    }

    handleVacancyChange(vacancy) {
        this.setState({vacancy: vacancy.vacancy});
        this.setState({vacancyError: ""});
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
        let date = this.state.date,
            vacancy = this.state.vacancy,
            candidate = this.state.candidate,
            interviewer = this.state.interviewer,
            emptyFieldMessage = "Please, choose an option";

        if (!date) {
            event.preventDefault();
            this.setState({
                dateError: emptyFieldMessage
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
            candidate &&
            vacancy &&
            interviewer) {
            let candidateID = this.state.candidate.value,
                vacancyID = this.state.vacancy.value,
                interviewerID = this.state.interviewer.value;
            event.preventDefault();
            this.props.history.push("/interviews-upcoming");
            const {dispatch} = this.props;
            dispatch(createInterview(
                {
                    date_time: date,
                    candidate_id: candidateID,
                    vacancy_id: vacancyID,
                    user_id: interviewerID,
                    rating_id: 12
                }
            ));
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
            interviewers = this.props.interviewers;
            // vacancy = this.state.vacancy,
            // candidate = this.state.candidate;


        let showCandidates = () => {

                let options = [];

                if (candidates.length) {
                    let compareSurname = (a, b) => {
                            if (a.surname > b.surname) return 1;
                            if (a.surname < b.surname) return -1;
                        },
                        sortedCandidates = candidates.sort(compareSurname) || {};


                    sortedCandidates.map((item, index) => {
                        let currentCandidate = {value: item.id,
                            label:"" + item.surname + " " + item.name + "", className: "option-class"};
                        options.push(currentCandidate);
                    });
                }

                return (

                    <div className="form-group search-box_input">
                        <label className="control-label">Candidate</label>
                        <Select
                            name="university"
                            options={options}
                            onChange={(candidate) => this.handleCandidateChange({ candidate })}
                            value={this.state.candidate}
                            placeholder={'Start typing for search...'}
                        />
                        <span className="has-error error-message">{this.state.candidateError}</span>
                    </div>
                );
        };

        let showVacancies = () => {

                let options = [];

                if (vacancies.length && positions.length && projects.length && levels.length) {

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
                }

                return (

                    <div className="form-group search-box_input">
                        <label className="control-label">Vacancy</label>
                        <Select
                            name="university"
                            options={options}
                            onChange={(vacancy) => this.handleVacancyChange({ vacancy })}
                            value={this.state.vacancy}
                            placeholder={'Start typing for search...'}
                        />
                        <span className="has-error error-message">{this.state.vacancyError}</span>
                    </div>
                );
        };

        let showInterviewer = () => {

            let options = [];

            if (interviewers.length) {
                let compareNickname = (a, b) => {
                        if (a.surname > b.surname) return 1;
                        if (a.surname < b.surname) return -1;
                    },
                    sortedInterviewers = interviewers.sort(compareNickname) || {};


                sortedInterviewers.map((item, index) => {
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
                    <label className="control-label">Interviewer</label>
                    <Select
                        name="university"
                        options={options}
                        onChange={(interviewer) => this.handleInterviewerChange({ interviewer })}
                        value={this.state.interviewer}
                        placeholder={'Start typing for search...'}
                    />
                    <span className="has-error error-message">{this.state.interviewerError}</span>
                </div>
            );
        };


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
                                <div className="create-interview-select">
                                    <label className="control-label">Date</label>
                                    <p className="form-sublabel back-link">You can pick only date starting from today</p>
                                    <DatePicker
                                        id="create-int-datePick"
                                        className="form-control form-control-sm filter-select"
                                        placeholderText="Date"
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
                            {showInterviewer()}

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
                                id="modal-confirm-create-int-yes"
                                className="btn btn-primary"
                                onClick={() => this.leaveForm()}
                            >Yes
                            </Button>
                            <Button
                                id="modal-confirm-create-int-no"
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
        interviews: state.interviews,
        vacancies: state.vacancies.vacancies,
        candidates: state.candidates.candidates,
        projects: state.project.projects,
        levels: state.levels.levels,
        positions: state.positions.positions,
        interviewers: state.interviewers.interviewers,
    }
}

export default connect(mapStateToProps)(CreateInterview);