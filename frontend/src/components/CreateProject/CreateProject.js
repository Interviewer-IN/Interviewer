import React, {Component} from "react";
import {connect} from "react-redux";
import TextareaAutosize from "react-autosize-textarea";
import Helmet from "react-helmet";
import PageTitle from "./../../containers/PageTitle";
import {Modal, Button} from "react-bootstrap";
import "./CreateProject.css";
import {createProject} from "../../redux/actions/projectActions";
import {FIELD_CHAR_REGEX, FIELD_SPACE_REGEX} from "../../config"

class CreateProject extends Component {

    constructor(props) {
        super(props);
        this.state = {
            projectTitle: "",
            projectDescription:"",
            showModalAlert: false,
            showModalConfirm: false,
            showModaLCreateAlert: false,
            alertText: "",
            confirmText: "",
            titleError:"",
            descriptionError: "",
        };
    }
    //----------------------------------
    //      Will be implemented further
    //------------------------------------
    // componentDidMount(props) {
    //     window.addEventListener("beforeunload", this.handleConfirmLeavePage.bind(this));
    // }
    //
    // handleConfirmLeavePage(event) {
    //     let notEmptyFields = this.state.projectTitle || this.state.projectDescription;
    //     if (notEmptyFields && event.target.activeElement.id != "create-project-resetBtn") {
    //         let confirmationMessage = "confirm";
    //         event.returnValue = confirmationMessage;
    //         return confirmationMessage;
    //     }
    // }
    //-------------------------------------
    //      End of the code
    //--------------------------------------

    componentWillMount() {
        this.props.onCheckUserRole();
    }

    handleTitleChange(event) {
        this.setState({projectTitle: event.target.value});
        this.setState({titleError: ""});
    }

    handleDescrChange(event) {
        this.setState({projectDescription: event.target.value});
        this.setState({descriptionError:""});
    }

    validateFormFields(event) {
        let title = this.state.projectTitle;
        let description = this.state.projectDescription;
        let wrongCharMessage = "Please, use only latin letters, numbers and special symbols";
        let emptyFieldMessage = "Please, fill the field";
        let existTitleMessage = "This title already exists. Please, use only unique titles";
        let emptyTitle = !title || title.match(FIELD_SPACE_REGEX);
        let emptyDescription = !description || description.match(FIELD_SPACE_REGEX);

        if (!FIELD_CHAR_REGEX.test(title)) {
            event.preventDefault();
            this.setState({
                titleError: wrongCharMessage
            });
        }
        if (!FIELD_CHAR_REGEX.test(description)) {
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
            FIELD_CHAR_REGEX.test(title) &&
            FIELD_CHAR_REGEX.test(description) &&
            this.isTitleUnique()) {
            event.preventDefault();
            this.props.history.push("/projects");
            const {dispatch} = this.props;
            dispatch(createProject({title: title.trim(), description: description.trim()}));
        }
    }

    isTitleUnique() {
        let projects = this.props.newProject.projects;
        let isUnique = true;
        let title = this.state.projectTitle;
        projects.forEach(function(item) {
            if (item.title === title) {
                isUnique = false;
            }
        });
        return (isUnique) ? true: false;
    }

    isFieldsNotEmpty() {
        if (this.state.projectTitle || this.state.projectDescription) {
            this.setState({
                confirmText: "Are you sure you want to cancel without saving changes?"
            });
          this.openModalConfirm();
        } else {
            this.props.history.push("/projects");
        }
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

    leaveForm() {
        this.resetFormFields();
        this.closeModalConfirm();
        this.props.history.push("/projects");
    }

    resetFormFields() {
        this.setState({projectTitle: ""});
        this.setState({projectDescription: ""})
    }


    render() {
        return (
            <div>
                <Helmet>
                    <title>Create Project</title>
                </Helmet>
                <div className="row sameheight-container custom-btn-group">
                    <div className="col-md-12">
                        <PageTitle
                            pageTitle='Create Projects'
                            showBackBtn={true}
                            showButton={false}
                            backBtnId="back-from-create"
                            titleForButton=''
                            linkForButton=''
                        />
                        <form onSubmit={(event) => this.validateFormFields(event)}>
                            <div className="form-group has-error">
                                <label className="control-label form-label">Project Title
                                    <span className="required-field">*</span>
                                </label>
                                <p className="form-sublabel back-link">Maximum 60 characters</p>
                                <input
                                    id="create-project-title"
                                    type="text"
                                    name="title"
                                    placeholder='Input Title'
                                    className="form-control boxed"
                                    maxLength="60"
                                    value={this.state.projectTitle}
                                    onChange={(event) => this.handleTitleChange(event)}
                                    autoFocus
                                />
                                <span className="has-error error-message">{this.state.titleError}</span>
                            </div>
                            <div className="form-group form-field-margin">
                                <label className="control-label form-label">Project Description
                                    <span className="required-field">*</span>
                                </label>
                                <p className="form-sublabel back-link">Maximum 3000 characters</p>
                                <TextareaAutosize
                                    id="create-project-descr"
                                    name="description"
                                    placeholder="Input Description"
                                    className="form-control boxed"
                                    maxLength="3000"
                                    rows={10}
                                    value={this.state.projectDescription}
                                    onChange={(event) => this.handleDescrChange(event)}
                                />
                                <span className="has-error error-message">{this.state.descriptionError}</span>
                            </div>
                            <div className="form-group">
                                <button
                                    id="create-project-submitBtn"
                                    type="submit"
                                    className="btn btn-primary"
                                    disabled={!this.state.projectTitle || !this.state.projectDescription}
                                >Create
                                </button>
                                <button
                                    id="create-project-resetBtn"
                                    type="reset"
                                    className="btn btn-danger"
                                    onClick={() => this.isFieldsNotEmpty()}
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
                                id="modal-confirm-yes"
                                className="btn btn-primary"
                                onClick={() => this.leaveForm()}
                            >Yes
                            </Button>
                            <Button
                                id="modal-confirm-no"
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

function mapStateToProps (state) {
    return {
        newProject: state.project,
    }
}

export default connect(mapStateToProps)(CreateProject);