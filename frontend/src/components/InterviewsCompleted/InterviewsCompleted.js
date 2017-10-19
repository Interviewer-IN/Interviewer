import React, {Component} from "react";
import {connect} from "react-redux";
import {Modal, Button, PanelGroup} from "react-bootstrap";
import Helmet from "react-helmet";
import "./interviewsCompleted.css";
import {showInterviews, removeInterview} from "../../redux/actions/interviewActions";
import {getVacancies} from "../../redux/actions/vacanciesActions";
import {showProjects} from "../../redux/actions/projectActions";
import {getRatings} from "../../redux/actions/ratingActions";
import PageTitle from "./../../containers/PageTitle";
import Panels from "../Panels/Panels";
import Filters from "./../../components/Filters";


class InterviewsCompleted extends Component {


    constructor(props) {
        super(props);
        this.state = {
            showModalConfirm: false,
            currentInterviewID: "",
            isHR: false
        }
    }

    componentWillMount() {
        let isUserHR = this.props.onCheckUserRole(true);
        const {dispatch} = this.props;
        dispatch(showInterviews());
        dispatch(getVacancies());
        dispatch(showProjects());
        dispatch(getRatings());
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
                />
            )
        }

        let filter;
        if (this.state.isHR) {
            filter = (
                <Filters
                    rating={true}
                    project={true}
                    position={true}
                    level={true}
                    date={true}
                    interviewer={true}

                />
            )
        } else {
            filter = (
                <Filters
                    project={true}
                    position={true}
                    level={true}
                    date={true}
                    interviewer={false}
                    rating={true}
                />
            )
        }

        let interviews = this.props.interviews.interviews || [],
            vacancies = this.props.vacancies,
            projects = this.props.projects,
            levels = this.props.levels,
            positions = this.props.positions,
            ratings = this.props.ratings,
            interviewsToDisplay;

        if (vacancies.length && projects.length && levels.length && positions.length && ratings.length) {

            interviews = interviews.filter((current) => {
                return current.status === false;
            });

            let compareDates = (a, b) => {
                let dateA = new Date(a.date_time).getTime(),
                    dateB = new Date(b.date_time).getTime();

                if (dateA < dateB) return 1;
                if (dateA > dateB) return -1;
            };

            if (interviews.length) {

                let interviewsSortedByDates = interviews.sort(compareDates) || {};
                interviewsToDisplay = interviewsSortedByDates.map((value, index) => {

                    let id = value.id,
                        currentDate = new Date(value.date_time).toLocaleString('en-GB', {
                            day: 'numeric', month: 'numeric', year: 'numeric'
                        }),
                        currentVacancy = vacancies.find(item => value.vacancy_id === item.id),
                        currentProject = projects.find(item => currentVacancy.project_id === item.id),
                        currentLevel = levels.find(item => currentVacancy.level_id === item.id),
                        currentPosition = positions.find(item => currentVacancy.position_id === item.id),
                        currentRating = ratings.find(item => value.rating_id === item.id),
                        panelTitleText;




                    if (this.state.isHR) {
                        panelTitleText =
                            currentDate + " | " +
                            value.candidate_id + " | " +
                            currentLevel.name + " - " +
                            currentPosition.name + " - " +
                            currentProject.title + " | " +
                            "Rating: " + currentRating.grade + " | " +
                            "some inteviewer";
                    } else {
                        panelTitleText =
                            currentDate + " | " +
                            value.candidate_id + " | " +
                            currentLevel.name + " - " +
                            currentPosition.name + " - " +
                            currentProject.title + " | " +
                            "Rating: " + currentRating.grade;
                    }

                    const panelTitle = (
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
                                    </div>
                                </div>
                            </div>
                        </div>
                    );

                    const description = (
                        <div>
                            <p className="interview-details-header"><strong>Feedback</strong></p>
                            {value.feedback}
                        </div>
                    );

                    if (this.state.isHR) {

                        return (
                            <Panels
                                key={id}
                                id={value.id}
                                showActionBtn={true}
                                titleForActionBtn='Activate'
                                titleConst={panelTitle}
                                description={description}
                                showDeleteBtn={true}
                                deleteBtnId={"delete-feedback-" + id}
                                callDelete={(event) => this.openModalConfirm(id)}
                            />
                        )
                    } else {
                        return (
                            <Panels
                                key={id}
                                id={value.id}
                                showActionBtn={false}
                                titleConst={panelTitle}
                                description={description}
                                showDeleteBtn={false}
                            />
                        )
                    }
                });
            } else {
                interviewsToDisplay = "No Interviews";
            }
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
                    <PanelGroup bsClass='custom-panel-group'
                                accordion
                    >
                        {interviewsToDisplay}
                    </PanelGroup>
                </div>

                <Modal show={this.state.showModalConfirm}
                       onHide={() => this.closeModalConfirm()}
                       className="custom-btn-group"
                >
                    <Modal.Header closeButton>
                    </Modal.Header>
                    <Modal.Body>
                        <p>Are you sure you want to delete a project?</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button
                            id={"pd-btn-modal-yes-" + this.state.currentProjectID}
                            className="btn btn-primary"
                            onClick={() => this.deleteInterview()}
                        >Yes
                        </Button>
                        <Button
                            id={"pd-btn-modal-no-" + this.state.currentProjectID}
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
        ratings: state.ratings.ratings,
        currentProject: state.project.currentProject,
    }
}

export default connect(mapStateToProps)(InterviewsCompleted);
