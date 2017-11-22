import React, {Component} from "react";
import {connect} from "react-redux";
import {Modal, Button, PanelGroup} from "react-bootstrap";
import Helmet from "react-helmet";
import moment from "moment";
import "./InterviewCompleted.css";
import {showInterviews, removeInterview, showInterviewsForInterviewer} from "../../redux/actions/interviewActions";
import {getVacancies} from "../../redux/actions/vacanciesActions";
import {showProjects} from "../../redux/actions/projectActions";
import {getRatings} from "../../redux/actions/ratingActions";
import {getCandidates} from "../../redux/actions/candidatesActions";
import {getInterviewers} from "../../redux/actions/interviewersActions";
import {showFeedbacks} from "../../redux/actions/feedbackActions";
import {getQuestions} from "../../redux/actions/questionsActions";
import {
    getValueFromArr,
    filterByDates,
    setErrorDateMessage,
    filterByPosition,
    filterByLevel,
    filterByProject,
    filterByRating,
    filterByInterviewer
} from "../../utils/index";
import PageTitle from "./../../containers/PageTitle";
import Panels from "../Panels/Panels";
import Filters from "./../../components/Filters";
import {GET_EMPTY_DATA, FILTER_EMPTY_DATA} from '../../config';


class InterviewsCompleted extends Component {


    constructor(props) {
        super(props);
        this.state = {
            isHR: false,
            loggedUserID: "",
            showModalConfirm: false,
            currentInterviewID: "",
            feedbacks: "",
            positionsFilterID: "",
            levelsFilterID: "",
            projectsFilterID: "",
            ratingFilterID: "",
            dateFromFilter: "",
            dateToFilter: "",
            dateErrorMessage: "",
            interviewsListExist: true
        }
    }

    componentWillMount() {
        let isUserHR = this.props.onCheckUserRole(true);
        let loggedUserID = this.props.getUserID();
        this.setState({loggedUserID: loggedUserID});

        const {dispatch} = this.props;
        if (this.props.interviews.interviews.length < 1) {
            if(isUserHR) {
                dispatch(showInterviews()).then(
                    (data) => {
                        if (!data.length) {
                            this.setState({
                                interviewsListExist: false
                            });
                        } else {
                            this.setState({
                                interviewsListExist: true
                            });
                        }
                    }
                );
            } else {

                dispatch(showInterviewsForInterviewer(loggedUserID)).then(
                    (data) => {
                        if (!data.length) {
                            this.setState({
                                interviewsListExist: false
                            });
                        } else {
                            this.setState({
                                interviewsListExist: true
                            });
                        }
                    }
                );
            }
        }

        if (this.props.vacancies.length < 1) {
            dispatch(getVacancies());
        }

        if (this.props.projects.length < 1) {
            dispatch(showProjects());
        }

        if (this.props.ratings.length < 1) {
            dispatch(getRatings());
        }

        if (this.props.candidates.length < 1) {
            dispatch(getCandidates());
        }

        if (this.props.interviewers.length < 1) {
            dispatch(getInterviewers());
        }

        if (this.props.feedbacks.length < 1) {
            dispatch(showFeedbacks());
        }

        if (this.props.questions.length < 1) {
            dispatch(getQuestions());
        }

        if (isUserHR) {
            this.setState({isHR: true})
        }
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

    deleteInterview() {
        this.closeModalConfirm();
        const {dispatch} = this.props;
        dispatch(removeInterview(this.state.currentInterviewID));
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

    getRatingFilterVal(ratingFilterVal) {
        let ratingList = this.props.ratings,
            ratingFilterID = 0;

        ratingFilterID = getValueFromArr(ratingList, ratingFilterVal, 'grade');

        this.setState({
            ratingFilterID: ratingFilterID
        })
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

    switchToEditMode(currentID) {
        this.props.history.push("/interviews-completed/" + currentID + "/edit-feedback");
    }


    render() {

        let pageTitle;
        if (this.state.isHR) {
            pageTitle = (
                <PageTitle
                    pageTitle='Completed Interviews'
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
                    pageTitle='Completed Interviews'
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
            ratings = this.props.ratings,
            candidates = this.props.candidates,
            interviewers = this.props.interviewers,
            feedbacks = this.props.feedbacks,
            questions = this.props.questions,
            interviewsToDisplay,
            filterErrorMessage;

        let showPanels = () => {

            if (this.state.interviewsListExist) {

                if (interviews.length > 0 &&
                    vacancies.length > 0 &&
                    projects.length > 0 &&
                    levels.length > 0 &&
                    positions.length > 0 &&
                    candidates.length > 0 &&
                    interviewers.length > 0 &&
                    ratings.length > 0 &&
                    feedbacks.length > 0 &&
                    questions.length > 0) {


                    interviews = interviews.filter((current) => {
                        return current.status === false;
                    });

                    if (interviews.length) {

                        //-- FILTERS  --------------------------

                        let projectFilterID = this.state.projectsFilterID,
                            positionFilterID = this.state.positionsFilterID,
                            levelFilterID = this.state.levelsFilterID,
                            interviewerFilterId = this.state.interviewerFilterId,
                            ratingFilterID = this.state.ratingFilterID,
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

                        if (ratingFilterID) {
                            interviews = filterByRating(ratingFilterID, interviews);
                        }

                        if (dateFromFilter || dateToFilter) {
                            interviews = filterByDates(dateFromFilter, dateToFilter, interviews);
                            filterErrorMessage = setErrorDateMessage(dateFromFilter, dateToFilter);
                        }

                        //-- FILTERS  END--------------------------


                        let compareDates = (a, b) => {
                            let dateA = new Date(a.date_time).getTime(),
                                dateB = new Date(b.date_time).getTime();

                            if (dateA < dateB) return 1;
                            if (dateA > dateB) return -1;
                        };


                        let interviewsSortedByDates = interviews.sort(compareDates) || {};
                        interviewsToDisplay = interviewsSortedByDates.map((value, index) => {

                            let id = value.id,
                                currentDate = moment(new Date(value.date_time)).format("DD" + "/" + "MM" + "/" + "YYYY"),
                                currentVacancy = vacancies.find(item => value.vacancy_id === item.id),
                                currentProject = projects.find(item => currentVacancy.project_id === item.id),
                                currentLevel = levels.find(item => currentVacancy.level_id === item.id),
                                currentPosition = positions.find(item => currentVacancy.position_id === item.id),
                                currentCandidate = candidates.find(item => value.candidate_id === item.id),
                                currentInterviewer = interviewers.find(item => value.user_id === item.id),
                                currentRating = ratings.find(item => value.rating_id === item.id),
                                panelTitle;


                            let showFeedback = () => {
                                let currentFeedbackArray = [];

                                feedbacks.map((item, index) => {
                                    if (value.id === item.interview_id) {
                                        let currentQuestion = questions.find(
                                            question => item.question_id === question.id
                                            ),
                                            currentAnswer = item.answer,
                                            currentFeedback = {
                                                question: currentQuestion.content,
                                                answer: currentAnswer
                                            };

                                        currentFeedbackArray.push(currentFeedback);
                                    }
                                });

                                    return (
                                        <div>
                                            <p className="sub-header">Rating</p>
                                            <p>{currentRating.grade}</p>
                                            <p className="sub-header">{currentFeedbackArray[5].question}</p>
                                            <p>{currentFeedbackArray[5].answer}</p>
                                            <p className="sub-header">{currentFeedbackArray[4].question}</p>
                                            <p>{currentFeedbackArray[4].answer}</p>
                                            <p className="sub-header">{currentFeedbackArray[3].question}</p>
                                            <p>{currentFeedbackArray[3].answer}</p>
                                            <p className="sub-header">{currentFeedbackArray[2].question}</p>
                                            <p>{currentFeedbackArray[2].answer}</p>
                                            <p className="sub-header">{currentFeedbackArray[1].question}</p>
                                            <p>{currentFeedbackArray[1].answer}</p>
                                            <p className="sub-header">{currentFeedbackArray[0].question}</p>
                                            <p>{currentFeedbackArray[0].answer}</p>
                                        </div>
                                    )

                            };

                            if (this.state.isHR) {
                                panelTitle = (
                                    <div className="custom-panel-title panel-list-item">
                                        <div className="custom-panel-title__right-side">
                                            <div className="panel-collapse-btn">
                                                <span className="panel-collapse-btn__title btn-js">Expand</span>
                                                <span
                                                    className="fa fa-angle-right panel-collapse-btn__arrow arrow-js"/>
                                            </div>
                                        </div>
                                        <div className="custom-panel-title__left-side">
                                            <div className="info-block">
                                                <div className="info-block__item">
                                                    <div className="info-block__project">
                                                            <span className="info-block__position-name">
                                                                {currentDate}
                                                            </span>
                                                    </div>
                                                    <div
                                                        className="info-block__position separate-line margin-right">
                                                            <span className="info-block__position-name">
                                                            {currentCandidate.name + " " +
                                                            currentCandidate.surname }
                                                            </span>
                                                    </div>
                                                    <div className="info-block__position separate-line">
                                                            <span className="info-block__position-name">
                                                                {currentLevel.name + " " +
                                                                currentPosition.name}
                                                            </span>
                                                        <span className="info-block__position-capture margin-left">
                                                                for
                                                            </span>
                                                        <span className="info-block__position-name">
                                                                {currentProject.title}
                                                            </span>
                                                    </div>
                                                    <div className="info-block__position separate-line margin-left">
                                                                Rating:
                                                        <span className="info-block__position-name margin-left">
                                                            {currentRating.grade}
                                                            </span>
                                                    </div>
                                                    <div className="info-block__position separate-line margin-left">
                                                            <span className="info-block__position-name">
                                                            {currentInterviewer.surname + " " + currentInterviewer.name}
                                                            </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            } else {
                                panelTitle = (
                                    <div className="custom-panel-title panel-list-item">
                                        <div className="custom-panel-title__right-side">
                                            <div className="panel-collapse-btn">
                                                <span className="panel-collapse-btn__title btn-js">Expand</span>
                                                <span
                                                    className="fa fa-angle-right panel-collapse-btn__arrow arrow-js"/>
                                            </div>
                                        </div>
                                        <div className="custom-panel-title__left-side">
                                            <div className="info-block">
                                                <div className="info-block__item">
                                                    <div className="info-block__project">
                                                            <span className="info-block__position-name">
                                                                {currentDate}
                                                            </span>
                                                    </div>
                                                    <div
                                                        className="info-block__position separate-line margin-right">
                                                            <span className="info-block__position-name">
                                                            {currentCandidate.name + " " +
                                                            currentCandidate.surname }
                                                            </span>
                                                    </div>
                                                    <div className="info-block__position separate-line">
                                                            <span className="info-block__position-name">
                                                                {currentLevel.name + " " +
                                                                currentPosition.name}
                                                            </span>
                                                        <span className="info-block__position-capture margin-left">
                                                                for
                                                            </span>
                                                        <span className="info-block__position-name">
                                                                {currentProject.title}
                                                            </span>
                                                    </div>
                                                    <div className="info-block__position separate-line margin-left">
                                                                Rating:
                                                        <span className="info-block__position-name margin-left">
                                                            {currentRating.grade}
                                                            </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            }

                            const PANEL_DESCRIPTION = (
                                <div>
                                    <p className="interview-details__header"><strong>Feedback</strong></p>
                                    {showFeedback()}
                                </div>
                            );

                            if (this.state.isHR) {
                                return (
                                    <Panels
                                        key={id}
                                        id={"intCompl" + value.id}
                                        showActionBtn={false}
                                        titleConst={panelTitle}
                                        description={PANEL_DESCRIPTION}
                                        showDeleteBtn={true}
                                        deleteBtnId={"delete-feedback-" + id}
                                        callDelete={(event) => this.openModalConfirm(id)}
                                    />
                                )
                            } else {
                                return (
                                    <Panels
                                        key={id}
                                        id={"intCompl" + value.id}
                                        showActionBtn={true}
                                        titleForActionBtn='Edit Feedback'
                                        titleConst={panelTitle}
                                        description={PANEL_DESCRIPTION}
                                        showDeleteBtn={false}
                                        callAction={(event) => this.switchToEditMode(id)}
                                    />
                                )
                            }
                        });

                        return (
                            <PanelGroup className='custom-panel-group'
                                        accordion
                            >
                                {interviewsToDisplay}
                            </PanelGroup>
                        )
                    } else {
                        interviewsToDisplay = (<h5 className="noData"> {FILTER_EMPTY_DATA} </h5>);
                    }

                } else {
                    interviewsToDisplay = (<h5 className="noData"> {FILTER_EMPTY_DATA} </h5>);
                }
            } else {
                interviewsToDisplay = (<h5 className="noData"> {GET_EMPTY_DATA} </h5>);
            }
        };

        let filter;
        if (this.state.isHR) {
            filter = (
                <Filters
                    rating={true}
                    project={true}
                    position={true}
                    level={true}
                    date={true}
                    dateIcon={true}
                    searchBoxFilter={true}
                    interviewer={true}
                    positionFilterVal={(event) => this.getPositionFilterVal(event)}
                    levelFilterVal={(event) => this.getLevelFilterVal(event)}
                    projectFilterVal={(event) => this.getProjectFilterVal(event)}
                    ratingFilterVal={(event) => this.getRatingFilterVal(event)}
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
                    rating={true}
                    positionFilterVal={(event) => this.getPositionFilterVal(event)}
                    levelFilterVal={(event) => this.getLevelFilterVal(event)}
                    projectFilterVal={(event) => this.getProjectFilterVal(event)}
                    ratingFilterVal={(event) => this.getRatingFilterVal(event)}
                    dateFromFilterVal={(event) => this.getDateFromFilterVal(event)}
                    dateToFilterVal={(event) => this.getDateToFilterVal(event)}
                    dateErrorMessage={filterErrorMessage}
                />
            )
        }

        return (
            <div>
                <Helmet>
                    <title>Completed Interviews</title>
                </Helmet>
                <div className="row sameheight-container">
                    <div className="col-md-12 component-container">
                        {pageTitle}
                        {filter}
                    </div>
                </div>
                <div className="interview-panels-block">
                    {showPanels()}
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


function

mapStateToProps(state) {
    return {
        interviews: state.interviews,
        notifications: state.notifications,
        vacancies: state.vacancies.vacancies,
        projects: state.project.projects,
        levels: state.levels.levels,
        positions: state.positions.positions,
        ratings: state.ratings.ratings,
        candidates: state.candidates.candidates,
        interviewers: state.interviewers.interviewers,
        feedbacks: state.feedback.feedbacks,
        questions: state.questions.questions,
        currentFeedback: state.feedback.currentFeedback,
        currentProject: state.project.currentProject,
    }
}

export
default

connect(mapStateToProps)

(
    InterviewsCompleted
)
;
