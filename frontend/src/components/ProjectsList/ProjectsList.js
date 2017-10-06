import React, {Component} from "react";
import {connect} from "react-redux";
import {Modal, Button, PanelGroup} from "react-bootstrap";
import Helmet from "react-helmet";
import "./ProjectsList.css";
import {showProjects, removeProject} from "../../redux/actions/projectActions";
import PageTitle from "./../../containers/PageTitle";
import Panels from "../Panels/Panels";


class ProjectsList extends Component {


    constructor(props) {
        super(props);
        this.state = {
            showModalConfirm: false,
            currentProjectID: "",
        }
    }

    componentWillMount() {
        const {dispatch} = this.props;
        dispatch(showProjects());
      //  this.props.onCheckUserRole(false);
    }

    switchToEditMode(currentID) {
        this.props.history.push("/projects/project/" + currentID + "/edit");
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
        this.closeModalConfirm();
        this.forceUpdate();
        const {dispatch} = this.props;
        dispatch(removeProject(this.state.currentProjectID));
    }


    render() {


        let projects = this.props.newProject.projects;

        let compareTitle = (a, b) => {
            if (a.title > b.title) return 1;
            if (a.title < b.title) return -1;
        };
        let projectsToDisplay;
        let sortedProjects;

        if (projects) {
            sortedProjects = projects.sort(compareTitle) || {};
            projectsToDisplay = sortedProjects.map((value, index) => {

                let id = value.id;

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
                                    <div className="vacancy-info-block__item">{value.title}</div>
                                </div>
                            </div>
                        </div>
                    );

                    return (
                        <Panels
                            key={id}
                            id={id}
                            titleConst={panelTitle}
                            description={value.description}
                            showEditBtn={true}
                            showDeleteBtn={true}
                            editBtnId={"edit-project-"+id}
                            deleteBtnId={"delete-project-"+id}
                            callDelete={(event) => this.openModalConfirm(id)}
                            callEdit={(event) => this.switchToEditMode(id)}
                        />
                    )
                }
            )

        }
        else {
            projectsToDisplay = "No projects";
        }

        return (
            <div>
                <Helmet>
                    <title>Projects</title>

                </Helmet>
                <div className="row sameheight-container">
                    <div className="col-md-12 component-container">
                        <PageTitle
                            pageTitle='Projects'
                            showBackBtn={false}
                            showButton={true}
                            buttonId="create-project"
                            titleForButton='Create project'
                            linkForButton='/projects/create-project'
                        />
                    </div>
                </div>
                <PanelGroup bsClass='custom-panel-group' accordion>
                    {projectsToDisplay}
                </PanelGroup>
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
        newProject: state.project,
        notifications: state.notifications
    }
}

export default connect(mapStateToProps)(ProjectsList);
