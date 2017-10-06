import React, {Component} from "react";
import {connect} from "react-redux";
import {Modal, Button, PanelGroup} from "react-bootstrap";
import Helmet from "react-helmet";
import "./interviewsCompleted.css";
import {showProjects} from "../../redux/actions/projectActions";
import PageTitle from "./../../containers/PageTitle";
import Panels from "../Panels/Panels";
import Filters from "./../../components/Filters";


class InterviewsCompleted extends Component {


    constructor(props) {
        super(props);
        this.state = {
            showModalConfirm: false,
            currentProjectID: "",
            isHR: true
        }
    }

    componentWillMount() {
        const {dispatch} = this.props;
        dispatch(showProjects());
        // let isUserHR = this.props.onCheckUserRole(true);
        // if (isUserHR) {
        //     this.setState({isHR: true})
        // }
    }

    switchToEditMode(currentID) {
        //this.props.history.push("/projects/project/" + currentID + "/edit");
    }

    openModalConfirm(currentID) {
        this.setState({
            currentProjectID: currentID
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

    deleteProject() {
        // this.closeModalConfirm();
        // const {dispatch} = this.props;
        // dispatch(removeProject(this.state.currentProjectID));
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

        let filter ;
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
                level: "Junior",
                rating: 2,
                feedback: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.Animi atque beatae culpa enim necessitatibus nesciunt perferendis,quisquam quod reiciendis temporibus? Distinctio id praesentium quiaratione saepe. Asperiores natus similique ullam."
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
                level: "Senior",
                rating: 3,
                feedback: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.Animi atque beatae culpa enim necessitatibus nesciunt perferendis,quisquam quod reiciendis temporibus? Distinctio id praesentium quiaratione saepe. Asperiores natus similique ullam."
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
                level: "Intern",
                rating: 1,
                feedback: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.Animi atque beatae culpa enim necessitatibus nesciunt perferendis,quisquam quod reiciendis temporibus? Distinctio id praesentium quiaratione saepe. Asperiores natus similique ullam."
            }
        ];

        let interviewsSortedByDates,
            interviewsToDisplay


        let compareDates= (a, b) => {
            if (a.date > b.date) return 1;
            if (a.date < b.date) return -1;
        };


        if (interviews) {

            interviewsSortedByDates = interviews.sort(compareDates) || {};
            interviewsToDisplay = interviewsSortedByDates.map((value, index) => {

                let id = value.id;
                let title;


                if (this.state.isHR) {
                    title = value.date + " | " +
                        value.candidate + " | " +
                        value.vacancy + " | " +
                        "Rating: " + value.rating + " | " +
                        value.interviewer
                } else {
                    title = value.date + " | " +
                        value.candidate + " | " +
                        value.vacancy + " | " +
                        "Rating: " + value.rating
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
                            id={"pd-btn-modal-yes-"+this.state.currentProjectID}
                            className="btn btn-primary"
                            onClick={() => this.deleteProject()}
                        >Yes
                        </Button>
                        <Button
                            id={"pd-btn-modal-no-"+this.state.currentProjectID}
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
        notifications: state.notifications
    }
}

export default connect(mapStateToProps)(InterviewsCompleted);
