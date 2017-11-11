import React, {Component} from "react";
import {connect} from "react-redux";
import {Modal, Button, PanelGroup} from "react-bootstrap";
import Helmet from "react-helmet";
import moment from "moment";
import "./interviewsUpcoming.css";
import {showInterviews, removeInterview, createInterview, updateInterview} from "../../redux/actions/interviewActions";
import {getVacancies} from "../../redux/actions/vacanciesActions";
import {showProjects} from "../../redux/actions/projectActions";
import {getCandidates} from "../../redux/actions/candidatesActions";
import {getInterviewers} from "../../redux/actions/interviewersActions";
import {
    getValueFromArr,
    filterByDates,
    setErrorDateMessage,
    filterByPosition,
    filterByLevel,
    filterByProject,
    filterByInterviewer
} from "../../utils/index";
import PageTitle from "./../../containers/PageTitle";
import Panels from "../Panels/Panels";
import Filters from "./../../components/Filters";


class InterviewsUpcoming extends Component {


    constructor(props) {
        super(props);
        this.state = {
            currentInterview: "",
            currentInterviewID: "",
            isHR: false,
            interviewId: "",
            candidateId: "",
            userId: "",
            date_time: "",
            positionsFilterID: "",
            levelsFilterID: "",
            projectsFilterID: "",
            interviewerFilterId: "",
            dateFromFilter: "",
            dateToFilter: "",
            dateErrorMessage: "",
            showModalConfirm: false
        }
    }

    componentWillMount() {
        let isUserHR = this.props.onCheckUserRole(true);
        const {dispatch} = this.props;

        if (!this.props.interviews.interviews.length) {
            dispatch(showInterviews());
        }

        if (!this.props.vacancies.length) {
            dispatch(getVacancies());
        }

        if (!this.props.projects.length) {
            dispatch(showProjects());
        }

        if (!this.props.candidates.length) {
            dispatch(getCandidates());
        }

        if (!this.props.interviewers.length) {
            dispatch(getInterviewers());
        }

        if (isUserHR) {
            this.setState({isHR: true})
        }
    }

    switchToEditMode(currentID) {
        this.props.history.push("/interviews-upcoming/" + currentID + "/edit");
    }

    deleteInterview() {
        this.closeModalConfirm();
        const {dispatch} = this.props;
        dispatch(removeInterview(this.state.currentInterviewID));
    }

    duplicateInterview(duplicateData) {
        let successDuplicateMessage = "Interview was duplicated";
        const {dispatch} = this.props;
        dispatch(createInterview(duplicateData, successDuplicateMessage));
    }

    openModalConfirm(currentID) {
        this.setState({
            currentInterviewID: currentID
        });
        this.setState({
            showModalConfirm: true
        });
    }

    closeModalConfirm() {
        this.setState({
            showModalConfirm: false
        });
    }

    activateInterview(currentID) {
        let interviews = this.props.interviews.interviews,
            interviewToActivate = interviews.find(item => item.id === currentID);

        if (!interviewToActivate.state) {
            const {dispatch} = this.props;
            dispatch(updateInterview(
                {
                    id: interviewToActivate.id,
                    date_time: interviewToActivate.date_time,
                    candidate_id: interviewToActivate.candidate_id,
                    vacancy_id: interviewToActivate.vacancy_id,
                    user_id: interviewToActivate.user_id,
                    rating_id: interviewToActivate.rating_id,
                    state: true
                }, "Interview was activated"
            ));
        }
    }

    addFeedback(currentID) {
        this.props.history.push("/interviews-upcoming/" + currentID + "/add-feedback");
    }

    getPositionFilterVal(positionFilterVal) {
        let positionsList = this.props.positions,
            positionFilterId = 0;

        positionFilterId = getValueFromArr(positionsList, positionFilterVal, 'name');

        this.setState({
            positionsFilterID: positionFilterId
        })
    }

    getLevelFilterVal(levelFilterVal) {
        let levelsList = this.props.levels,
            levelFilterId = 0;

        levelFilterId = getValueFromArr(levelsList, levelFilterVal, 'name');

        this.setState({
            levelsFilterID: levelFilterId
        })
    }

    getProjectFilterVal(projectFilterVal) {
        let projectsList = this.props.projects,
            projectFilterId = 0;

        projectFilterId = getValueFromArr(projectsList, projectFilterVal, 'title');

        this.setState({
            projectsFilterID: projectFilterId
        })
    }

    getInterviewerFilterVal(interviewerFilterVal) {
        let interviewersList = this.props.interviewers,
            interviewerFilterObj = [],
            interviewerFilterId = 0;

        if (interviewerFilterVal != "Interviewer") {
            interviewerFilterObj = interviewersList.find(item =>
                "" + item.surname + " " + item.name + "" === interviewerFilterVal
            );
        }
        interviewerFilterId = interviewerFilterObj.id;

        this.setState({
            interviewerFilterId: interviewerFilterId
        });
    }

    getDateFromFilterVal(dateFromFilterVal) {
        this.setState({
            dateFromFilter: dateFromFilterVal
        });
    }

    getDateToFilterVal(dateToFilterVal) {
        this.setState({
            dateToFilter: dateToFilterVal
        });
    }

    render() {

        let pageTitle;
        if (this.state.isHR) {
            pageTitle = (
                <PageTitle
                    pageTitle='Upcoming Interviews'
                    showBackBtn={false}
                    showButton={true}
                    buttonId="create-interview"
                    titleForButton='Create interview'
                    linkForButton='/interviews-upcoming/create-interview'
                />
            )
        } else {
            pageTitle = (
                <PageTitle
                    pageTitle='Upcoming Interviews'
                    showBackBtn={false}
                    showButton={false}
                    buttonId=""
                    titleForButton=''
                    linkForButton=''
                />
            )
        }

        let interviews = this.props.interviews.interviews,
            vacancies = this.props.vacancies,
            projects = this.props.projects,
            levels = this.props.levels,
            positions = this.props.positions,
            candidates = this.props.candidates,
            interviewers = this.props.interviewers,
            idExpandedElement = this.props.idExpandedElement,
            dates = [],
            interviewsByDates,
            filterErrorMessage;

        if (interviews.length &&
            vacancies.length &&
            projects.length &&
            levels.length &&
            positions.length &&
            candidates.length &&
            interviewers.length) {

            interviews = interviews.filter((current) => {
                return current.status === true;
            });

            //-- FILTERS  --------------------------

            let projectFilterID = this.state.projectsFilterID,
                positionFilterID = this.state.positionsFilterID,
                levelFilterID = this.state.levelsFilterID,
                interviewerFilterId = this.state.interviewerFilterId,
                dateFromFilter = this.state.dateFromFilter,
                dateToFilter = this.state.dateToFilter;


            if (projectFilterID) {
                interviews = filterByProject(projectFilterID, interviews, vacancies);
            }

            if (positionFilterID) {
                interviews = filterByPosition(positionFilterID, interviews, vacancies);
            }

            if (levelFilterID) {
                interviews = filterByLevel(levelFilterID, interviews, vacancies);
            }

            if (interviewerFilterId) {
                interviews = filterByInterviewer(interviewerFilterId, interviews);
            }

            if (dateFromFilter || dateToFilter) {
                interviews = filterByDates(dateFromFilter, dateToFilter, interviews);
                filterErrorMessage = setErrorDateMessage(dateFromFilter, dateToFilter);
            }

            //-- FILTERS  END--------------------------


            let compareDates = (a, b) => {
                let dateA = new Date(a.date_time).getTime(),
                    dateB = new Date(b.date_time).getTime();

                if (dateA > dateB) return 1;
                if (dateA < dateB) return -1;
            };

            let compareTime = (a, b) => {
                let timeA = new Date(a.date_time).toLocaleString('en-GB', {hour: 'numeric', minute: 'numeric'}),
                    timeB = new Date(b.date_time).toLocaleString('en-GB', {hour: 'numeric', minute: 'numeric'});

                if (timeA > timeB) return 1;
                if (timeA < timeB) return -1;
            };

            if (interviews && interviews.length) {

                let interviewsSortedByDates = interviews.sort(compareDates) || {};
                interviewsSortedByDates.map((value, index) => {
                    let date = moment(new Date(value.date_time)).format("dddd, D MMMM YYYY");

                    if (dates.indexOf(date) === -1) {
                        dates.push(date);
                    }
                });

                interviewsByDates = dates.map((value, index) => {
                    let todayInterviews = [],
                        currentDate = value,
                        dateToDisplay;

                    interviewsSortedByDates.map((value, index) => {
                        let interviewDate = moment(new Date(value.date_time)).format("dddd, D MMMM YYYY");

                        if (currentDate === interviewDate) {
                            todayInterviews.push(value);
                            dateToDisplay = moment(new Date(value.date_time)).format("dddd, D MMMM");
                        }
                    });

                    //-- Creating Interview Card--------------------------

                    let sortedInterviews = todayInterviews.sort(compareTime) || {};
                    let interviewsToDisplay = sortedInterviews.map((value, index) => {

                            let id = value.id,
                                time = moment(new Date(value.date_time)).format("HH:mm"),
                                currentVacancy = vacancies.find(item => value.vacancy_id === item.id),
                                currentProject = projects.find(item => currentVacancy.project_id === item.id),
                                currentLevel = levels.find(item => currentVacancy.level_id === item.id),
                                currentPosition = positions.find(item => currentVacancy.position_id === item.id),
                                currentCandidate = candidates.find(item => value.candidate_id === item.id),
                                currentInterviewer = interviewers.find(item => value.user_id === item.id),
                                candidateCV = currentCandidate.cv.url,
                                currentSate = (value.state) ? "Active" : "Activate",
                                isBtnInactive = value.state,
                                panelTitleText;

                            let duplicateData = {
                                date_time: value.date_time,
                                candidate_id: value.candidate_id,
                                vacancy_id: value.vacancy_id,
                                user_id: value.user_id,
                                rating_id: 12
                            };

                            let overdueInterview = () => {
                                let dateNow = Date.now(),
                                    interviewDate = new Date(value.date_time).getTime();

                                if(interviewDate < dateNow) {
                                    return (
                                        <i className="interview-icon tooltip-icon fa fa-bell">
                                            <span className="tooltip-icon__text">This interview is overdue</span>
                                        </i>
                                    )
                                }
                            };

                            let checkCandidateCV = () => {
                                if (candidateCV) {
                                    return (
                                        <a href={candidateCV}
                                           className="download-block form-group text-green text-green--hover" download>
                                            <span className="download-block__icon fa fa-download"/>
                                            <span className="download-block__title">Download CV</span>
                                        </a>
                                    )
                                } else {
                                    return (
                                        <a className="download-block form-group download-block--disabled text-muted">
                                            <span className="download-block__icon fa fa-download"/>
                                            <span className="download-block__title text-bold--100">Download CV</span>
                                        </a>
                                    )
                                }
                            };

                            if (this.state.isHR) {
                                panelTitleText = time + " | " +
                                    currentCandidate.name + " " +
                                    currentCandidate.surname + " | " +
                                    currentLevel.name + " " +
                                    currentPosition.name + " for " +
                                    currentProject.title + " | " +
                                    currentInterviewer.surname + " " + currentInterviewer.name + " ";
                            } else {
                                panelTitleText = time + " | " +
                                    currentCandidate.name + " " +
                                    currentCandidate.surname + " | " +
                                    currentLevel.name + " - " +
                                    currentPosition.name + " - " +
                                    currentProject.title + " | ";
                            }

                            const PANEL_TITLE = (
                                <div className="custom-panel-title panel-list-item">
                                    <div className="custom-panel-title__right-side">
                                        <div className="panel-collapse-btn">
                                            <span className="panel-collapse-btn__title btn-js">Expand</span>
                                            <span className="fa fa-angle-right panel-collapse-btn__arrow arrow-js"/>
                                        </div>
                                    </div>
                                    <div className="custom-panel-title__left-side">
                                        <div className="vacancy-info-block">
                                            <div className="vacancy-info-block__item">
                                                {panelTitleText}
                                                {overdueInterview()}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );

                            const PANEL_DESCRIPTION = (
                                <div>
                                    <div className="interview-details clearfix">
                                        <div className="interview-details__left">
                                            <p className="interview-details__header"><strong>Candidate</strong></p>
                                            <p><strong>Name:</strong>{" " + currentCandidate.name}</p>
                                            <p><strong>Age:</strong>{" " + currentCandidate.age}</p>
                                            <p><strong>Experience:</strong>{" " + currentCandidate.experience}</p>
                                            {checkCandidateCV()}
                                        </div>
                                        <div className="interview-details__right">
                                            <p className="interview-details__header"><strong>Project</strong></p>
                                            <p>{currentProject.title}</p>
                                            <p className="interview-details__header"><strong>Interviewer</strong></p>
                                            <p>some interviewer</p>
                                        </div>
                                    </div>
                                    <div className="interview-details__down">
                                        <p className="interview-details__header"><strong>Vacancy</strong></p>
                                        <p>
                                            <strong>{currentLevel.name + " " +
                                            currentPosition.name + " for " +
                                            currentProject.title}
                                            </strong>
                                        </p>
                                        <p>{currentVacancy.description}</p>
                                    </div>
                                </div>
                            );

                            let toExpandElement = () => {
                                return (id === idExpandedElement) ? (true) : (false);
                            };

                            if (this.state.isHR) {
                                return (
                                        <Panels
                                            key={id}
                                            id={"intUpcom" + id}
                                            showActionBtn={true}
                                            defaultExpanded={toExpandElement()}
                                            titleForActionBtn={currentSate}
                                            addInactiveBtnClass={isBtnInactive}
                                            titleConst={PANEL_TITLE}
                                            description={PANEL_DESCRIPTION}
                                            showEditBtn={true}
                                            showDeleteBtn={true}
                                            showDuplicateBtn={true}
                                            editBtnId={"edit-interview-" + id}
                                            deleteBtnId={"delete-interview-" + id}
                                            dublicateBtnId={"duplicate-interview" + id}
                                            callDelete={(event) => this.openModalConfirm(id)}
                                            callEdit={(event) => this.switchToEditMode(id)}
                                            callAction={(event) => this.activateInterview(id)}
                                            callDublicate={() => this.duplicateInterview(duplicateData)}
                                        />

                                )
                            } else if (!this.state.isHR && value.state) {
                                return (
                                        <Panels
                                            key={id}
                                            id={"intUpcom" + value.id}
                                            showActionBtn={true}
                                            defaultExpanded={toExpandElement()}
                                            titleForActionBtn='Add feedback'
                                            titleConst={PANEL_TITLE}
                                            description={PANEL_DESCRIPTION}
                                            callAction={(event) => this.addFeedback(id)}
                                        />
                                )
                            }
                        }

                        //-- End Creating Interview Card--------------------------
                    );
                    return (
                        <div key={index}>
                            <p className="interview-dates">{dateToDisplay}</p>
                                {interviewsToDisplay}
                        </div>
                    )
                });
            } else {
                interviewsByDates = "No Interviews";
            }
        }

        let filter;

        if (this.state.isHR) {
            filter = (
                <Filters
                    project={true}
                    position={true}
                    level={true}
                    date={true}
                    dateIcon={true}
                    searchBoxFilter={true}
                    interviewer={true}
                    rating={false}
                    positionFilterVal={(event) => this.getPositionFilterVal(event)}
                    levelFilterVal={(event) => this.getLevelFilterVal(event)}
                    projectFilterVal={(event) => this.getProjectFilterVal(event)}
                    interviewerFilterVal={(event) => this.getInterviewerFilterVal(event)}
                    dateFromFilterVal={(event) => this.getDateFromFilterVal(event)}
                    dateToFilterVal={(event) => this.getDateToFilterVal(event)}
                    dateErrorMessage={filterErrorMessage}
                />
            )
        } else {
            filter = (
                <Filters
                    project={true}
                    position={true}
                    level={true}
                    date={true}
                    dateIcon={true}
                    searchBoxFilter={true}
                    interviewer={false}
                    rating={false}
                    positionFilterVal={(event) => this.getPositionFilterVal(event)}
                    levelFilterVal={(event) => this.getLevelFilterVal(event)}
                    projectFilterVal={(event) => this.getProjectFilterVal(event)}
                    dateFromFilterVal={(event) => this.getDateFromFilterVal(event)}
                    dateToFilterVal={(event) => this.getDateToFilterVal(event)}
                    dateErrorMessage={filterErrorMessage}
                />
            )
        }

        return (
            <div>
                <Helmet>
                    <title>Upcoming Interviews</title>
                </Helmet>
                <div className="row sameheight-container">
                    <div className="col-md-12 component-container">
                        {pageTitle}
                        {filter}
                    </div>
                </div>
                <div className="interview-panels-block">
                    <PanelGroup bsClass='custom-panel-group'>
                        {interviewsByDates}
                    </PanelGroup>
                </div>

                <Modal show={this.state.showModalConfirm}
                       onHide={() => this.closeModalConfirm()}
                       className="custom-btn-group"
                >
                    <Modal.Header closeButton>
                    </Modal.Header>
                    <Modal.Body>
                        <p>Are you sure you want to delete an interview?</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button
                            id={"pd-btn-modal-yes-" + this.state.currentInterviewID}
                            className="btn btn-primary"
                            onClick={() => this.deleteInterview()}
                        >Yes
                        </Button>
                        <Button
                            id={"pd-btn-modal-no-" + this.state.currentInterviewID}
                            className="btn btn-danger"
                            onClick={() => this.closeModalConfirm()}
                            bsStyle="primary"
                        >No
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        interviews: state.interviews,
        notifications: state.notifications,
        vacancies: state.vacancies.vacancies,
        projects: state.project.projects,
        levels: state.levels.levels,
        positions: state.positions.positions,
        candidates: state.candidates.candidates,
        interviewers: state.interviewers.interviewers,
        idExpandedElement: state.interviews.idExpandedElement
    }
}

export default connect(mapStateToProps)(InterviewsUpcoming);
