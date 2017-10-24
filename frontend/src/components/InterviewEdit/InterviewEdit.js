import React, {Component} from "react";
import Helmet from "react-helmet";
import TextareaAutosize from "react-autosize-textarea";
import {Modal, Button} from "react-bootstrap";
import {connect} from "react-redux";

import "./InterviewEdit.css";
import PageTitle from "./../../containers/PageTitle";
import {updateProject, getProjects} from "../../redux/actions/projectActions";
import {fieldCharRegex, fieldSpaceRegex} from "../../config"

class InterviewEdit extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentProject: "",
            projectTitle: "",
            initProjectTitle: "",
            projectDescription: "",
            showModalConfirm: false,
            confirmText: "",
            titleError:"",
            descriptionError: "",
            isHR: false,
        }
    }

    componentWillMount() {
        const {dispatch} = this.props;
        if (this.props.projects.length < 1) {
            dispatch(getProjects(this.props.match.params.id)).then(() => {
                let currentProject = this.props.currentProject;
                this.setStates(currentProject);
            });
        } else {
            let projects = this.props.projects;
            let projectId = this.props.match.params.id;
            let currentProject = projects.find(function (currentProject) {
                    return currentProject.id === +projectId;
                }) || {};
            this.setStates(currentProject);
        }

        let isUserHR = this.props.onCheckUserRole(true);
        if (isUserHR) {
            this.setState({isHR: true})
        }
    }

    setStates(currentProject) {
        this.setState({currentProject: currentProject});
        this.setState({projectTitle: currentProject.title});
        this.setState({projectDescription: currentProject.description});
    }

    handleTitleChange(event) {
        this.setState({projectTitle: event.target.value});
        this.setState({titleError:""});
    }

    handleDescrChange(event) {
        this.setState({projectDescription: event.target.value});
        this.setState({descriptionError:""});
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
        this.props.history.push("/projects/");
    }

    validateFormFields(event) {
        let id = this.state.currentProject.id;
        let title = this.state.projectTitle;
        let description = this.state.projectDescription;
        let wrongCharMessage = "Please use only latin letters, numbers and special symbols";
        let emptyFieldMessage = "Please fill the field";
        let existTitleMessage = "This title already exists. Please, use only unique titles";
        let emptyTitle = !title || title.match(fieldSpaceRegex);
        let emptyDescription = !description || description.match(fieldSpaceRegex)
        if (!fieldCharRegex.test(title)) {
            event.preventDefault();
            this.setState({
                titleError: wrongCharMessage
            });
        }
        if (!fieldCharRegex.test(description)) {
            event.preventDefault();
            this.setState({
                descriptionError: wrongCharMessage
            });
        }
        if (!this.isTitleUnique()) {
            event.preventDefault();
            this.setState({
                titleError: existTitleMessage
            });
        }
        if (emptyTitle) {
            event.preventDefault();
            this.setState({
                titleError: emptyFieldMessage
            });
        }
        if (emptyDescription) {
            event.preventDefault();
            this.setState({
                descriptionError: emptyFieldMessage
            });
        }
        if (!emptyTitle && !emptyDescription &&
            fieldCharRegex.test(title) &&
            fieldCharRegex.test(description) &&
            this.isTitleUnique()) {
            event.preventDefault();
            const {dispatch} = this.props;
            dispatch(updateProject({id: id, title: title.trim(), description: description.trim()}));
            this.props.history.push("/projects/");
        }
    }

    isTitleUnique() {
        let projects = this.props.projects;
        let id = this.state.currentProject.id;
        let isUnique = true;
        let title = this.state.projectTitle;
        projects.forEach(function(item) {
            if (item.title === title && item.id !== id) {
                isUnique = false;
            }
        });
        return (isUnique) ? true: false;
    }

    render() {
        let id = this.state.currentProject.id;

        return (
            <div>
                <Helmet>
                    <title>{this.state.projectTitle}</title>
                </Helmet>
                <div className="row sameheight-container custom-btn-group">
                    <div className="col-md-12 component-container">
                        <PageTitle
                            pageTitle='Edit Interview'
                            showBackBtn={true}
                            showButton={false}
                            backBtnId="back-from-edit"
                            titleForButton=''
                            linkForButton=''
                        />


                    </div>
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
                            id={"pe-btn-modal-yes-"+id}
                            className="btn btn-primary"
                            onClick={() => this.leaveEdit()}
                        >Yes
                        </Button>
                        <Button
                            id={"pe-btn-modal-no-"+id}
                            className="btn btn-danger"
                            onClick={() => this.closeModalConfirm()}
                        >No
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}

function mapStateToProps (state) {
    return {
        projects: state.project.projects,
        currentProject: state.project.currentProject,
    }
}

export default connect(mapStateToProps)(InterviewEdit);