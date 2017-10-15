import React, {Component} from "react";
import {connect} from "react-redux";
import {Modal, Button, PanelGroup} from "react-bootstrap";
import Helmet from "react-helmet";
import "./interviewsUpcoming.css";
import {showInterviews} from "../../redux/actions/interviewActions";
import PageTitle from "./../../containers/PageTitle";
import Panels from "../Panels/Panels";
import Filters from "./../../components/Filters";


class InterviewsUpcoming extends Component {


    constructor(props) {
        super(props);
        this.state = {
            showModalConfirm: false,
            currentInterviewID: "",
            isHR: false
        }
    }

    componentWillMount() {
        // const {dispatch} = this.props;
        // dispatch(showInterviews());
        let isUserHR = this.props.onCheckUserRole(true);
        if (isUserHR) {
            this.setState({isHR: true})
        }
    }

    switchToEditMode(currentID) {
        //this.props.history.push("/projects/project/" + currentID + "/edit");
    }

    deleteProject() {
        // this.closeModalConfirm();
        // const {dispatch} = this.props;
        // dispatch(removeProject(this.state.currentProjectID));
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

    activateInterview(currentID){

    }

    addFeedback(currentID) {
        this.props.history.push("/interviews-upcoming/" + currentID + "/add-feedback");
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

        let filter ;
        if (this.state.isHR) {
            filter = (
                <Filters
                    project={true}
                    position={true}
                    level={true}
                    date={true}
                    interviewer={true}
                    rating={false}
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
                    rating={false}
                />
            )
        }

        let interviews = [
            {
                id: 1,
                time: "10.00",
                date: "01-10-2017",
                weekday: "Monday",
                candidate: "Jane Doe",
                age: "21",
                experience: "6",
                vacancy: "Junior QA for CPrime",
                interviewer: "K. Makiy",
                project: "CPrime",
                position: "QA",
                level: "Junior"
            },
            {
                id: 2,
                time: "11.00",
                date: "02-10-2017",
                weekday: "Tuesday",
                candidate: "James Bond",
                age: "56",
                experience: "5",
                vacancy: "Senior Java Developer for Formula-1",
                interviewer: "A. Larin",
                project: "Formula-1",
                position: "Java Developer",
                level: "Senior"
            },
            {
                id: 3,
                time: "12.00",
                date: "02-10-2017",
                weekday: "Tuesday",
                candidate: "Bob Marley",
                age: "28",
                experience: "1",
                vacancy: "Intern Front-End Developer for Squadex",
                interviewer: "T. Grabets",
                project: "Squadex",
                position: "Front-End Developer",
                level: "Intern"
            }
        ];

        let datesToDisplay,
            interviewsSortedByDates,
            currentDate,
            interviewsToDisplay,
            sortedInterviews,
            dates = [];

        let compareDates = (a, b) => {
            if (a.date > b.date) return 1;
            if (a.date < b.date) return -1;
        };

        let compareTime = (a, b) => {
            if (a.time > b.time) return 1;
            if (a.time < b.time) return -1;
        };

        if (interviews) {

            interviewsSortedByDates = interviews.sort(compareDates) || {};

            interviewsSortedByDates.map((value, index) => {

                if (dates.indexOf(value.date) === -1) {
                    dates.push(value.date);
                }
            });

            datesToDisplay = dates.map((value, index) => {
                currentDate = value;
                let todayInterviews = [];

                interviewsSortedByDates.map((value, index) => {
                    if (value.date === currentDate) {
                        todayInterviews.push(value);
                    }
                });

                let currentWeekDay = todayInterviews[0].weekday;

                sortedInterviews = todayInterviews.sort(compareTime) || {};

                interviewsToDisplay = sortedInterviews.map((value, index) => {

                    let id = value.id;
                    let title;

                    if (this.state.isHR) {
                        title =  value.time + " | " +
                            value.candidate + " | " +
                            value.vacancy + " | " +
                            value.interviewer
                    } else {
                        title =  value.time + " | " +
                            value.candidate + " | " +
                            value.vacancy
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
                                            {title}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );



                        const panelDescription = (
                            <div>
                                <div className="clearfix">
                                    <div className="float-left">
                                        <p className="interview-details-header"><strong>Candidate</strong></p>
                                        <p>{"Name: " + value.candidate}</p>
                                        <p>{"Age: " + value.age}</p>
                                        <p>{"Experience: " + value.experience}</p>
                                        <a href="#">View CV</a>
                                    </div>
                                    <div className="float-right">
                                        <p className="interview-details-header"><strong>Project</strong></p>
                                        <p>{value.project}</p>
                                        <p className="interview-details-header"><strong>Interviewer</strong></p>
                                        <p>{value.interviewer}</p>
                                    </div>
                                </div>
                                <div className="interview-details-down">
                                    <p className="interview-details-header"><strong>Vacancy</strong></p>
                                    <p><strong>{value.vacancy}</strong></p>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                                        Animi atque beatae culpa enim necessitatibus nesciunt perferendis,
                                        quisquam quod reiciendis temporibus? Distinctio id praesentium quia
                                        ratione saepe. Asperiores natus similique ullam.</p>
                                </div>
                            </div>
                        );


                        if (this.state.isHR) {
                            return (<PanelGroup bsClass='custom-panel-group'
                                                accordion key={id}
                                >
                                    <Panels
                                        key={id}
                                        id={value.id}
                                        showActionBtn={true}
                                        titleForActionBtn='Activate'
                                        titleConst={panelTitle}
                                        description={panelDescription}
                                        showEditBtn={true}
                                        showDeleteBtn={true}
                                        showDuplicateBtn={true}
                                        editBtnId={"edit-interview-" + id}
                                        deleteBtnId={"delete-interview-" + id}
                                        callDelete={(event) => this.openModalConfirm(id)}
                                        callEdit={(event) => this.switchToEditMode(id)}
                                        callAction={(event) => this.activateInterview(id)}
                                    />
                                </PanelGroup>
                            )
                        } else {
                            return (
                                <PanelGroup bsClass='custom-panel-group'
                                                accordion key={id}
                                >
                                    <Panels
                                        key={id}
                                        id={value.id}
                                        showActionBtn={true}
                                        titleForActionBtn='Add feedback'
                                        titleConst={panelTitle}
                                        description={panelDescription}
                                        callAction={(event) => this.addFeedback(id)}
                                    />
                                </PanelGroup>
                            )
                        }
                    }
                );

                return (

                    <div key={index}>
                        <p className="interview-dates">{currentWeekDay + ", " + value}</p>
                        {interviewsToDisplay}
                    </div>
                )
            });
        } else {
            datesToDisplay = "No Interviews";
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
                    {datesToDisplay}
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
                            onClick={() => this.deleteProject()}
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
        newInterview: state.interview,
        notifications: state.notifications
    }
}

export default connect(mapStateToProps)(InterviewsUpcoming);
