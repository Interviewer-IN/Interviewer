import React, {Component} from "react";
import { browserHistory } from "react-router-dom";
import {IndexLink} from "react-router-dom";
import {Link} from "react-router-dom";
import {Modal, Button} from "react-bootstrap";
import "./ProjectDetails.css";
import {connect} from "react-redux";


class ProjectDetails extends Component {

    constructor(props) {
        super(props);
        this.state = {
            // projectTitle: "Project Title",
            // projectDescription: "Lorem ipsum dolor sit amet, nulla quam sapien praesent purus commodo nascetur",
            showModalConfirm: false
        }
    }

    switchToEditMode() {
        this.props.history.push("/dashboard/projects/project/edit");
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

    deleteProject(){}



    render() {

        let projects = [
            {id:1, title: "Greenlam", description: "something1"},
            {id:2, title: "Gembucket", description: "something2"},
            {id:3, title: "Asoka", description: "something3"},
            {id:4, title: "Biodex", description: "something4"},
            {id:5, title: "It", description: "something5"},
            {id:6, title: "Vagram", description: "something6"},
            {id:7, title: "Quo Lux", description: "something7"},
            {id:8, title: "Sub-Ex", description: "something8"},
            {id:9, title: "Pannier", description: "something9"},
            {id:10, title: "Span", description: "something10"},
        ];
        let projectId = this.props.match.params.id;
        let currentProject = projects.find(function (currentProject) { return currentProject.id === +projectId; });

        return (
            <div>
                <div className="row sameheight-container">
                    <div className="col-md-12 component-container">
                        <div className="title-block">
                            <h3 className="title ">{currentProject.title}</h3>
                            <Link to="/dashboard/projects" className="title-description">
                                Back to list
                            </Link>
                        </div>
                        <div className="card card-default">
                                <div className="form-control boxed card-block">
                                    {currentProject.description}
                                </div>
                        </div>
                        <div className="form-group">
                            <button
                                className="btn btn-primary"
                                //onClick={() => this.switchToEditMode()}
                            >Edit</button>
                            <button
                                type="reset"
                                className="btn btn-primary right-project-btn"
                                onClick={() => this.openModalConfirm()}
                            >Delete</button>
                            <Link to="/dashboard/projects/create-project">
                                <button className="btn btn-primary right-project-btn">Create project</button>
                            </Link>
                        </div>
                    </div>
                </div>
                <Modal show={this.state.showModalConfirm} onHide={() => this.closeModalConfirm()}>
                    <Modal.Header closeButton>
                    </Modal.Header>
                    <Modal.Body>
                        <p>Are you sure you want to delete a project?</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={() => this.deleteProject()}>Yes</Button>
                        <Button onClick={() => this.closeModalConfirm()} bsStyle="primary">No</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}

function mapStateToProps (state) {
    return {
        newProject: state.project,
        newNote: state.notifications
    }
}

export default connect(mapStateToProps)(ProjectDetails);
