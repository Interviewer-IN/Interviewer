// import React, {Component} from "react";
// import {Link} from "react-router-dom";
// import {Modal, Button} from "react-bootstrap";
// import Helmet from "react-helmet";
// import "./ProjectDetails.css";
// import {connect} from "react-redux";
// import {removeProject, getProjects} from "../../redux/actions/projectActions";
//
//
// class ProjectDetails extends Component {
//
//     constructor(props) {
//         super(props);
//         this.state = {
//             showModalConfirm: false,
//             projectTitle: "",
//             projectDescription: "",
//             currentProject: ""
//         }
//     }
//
//         componentWillMount() {
//
//             const {dispatch} = this.props;
//             if (this.props.newProject.projects.length < 1) {
//                 dispatch(getProjects(this.props.match.params.id));
//                 setTimeout(() => {
//                     let currentProject = this.props.newProject.currentProject;
//                     this.setState({currentProject: currentProject});
//                     this.setState({projectTitle: currentProject.title});
//                     this.setState({projectDescription: currentProject.description});
//                 }, 1000);
//             } else {
//                 let projects = this.props.newProject.projects;
//                 let projectId = this.props.match.params.id;
//                 let currentProject = projects.find(function (currentProject) {
//                         return currentProject.id === +projectId;
//                     }) || {};
//                 this.setState({currentProject: currentProject});
//                 this.setState({projectTitle: currentProject.title});
//                 this.setState({projectDescription: currentProject.description});
//             }
//         }
//
//     switchToEditMode() {
//         let projectId = this.props.match.params.id;
//         this.props.history.push("/projects/project/" + projectId + "/edit");
//     }
//
//     openModalConfirm() {
//         this.setState({
//             showModalConfirm: true
//         });
//     }
//
//     closeModalConfirm() {
//         this.setState({
//             showModalConfirm: false
//         });
//     }
//
//     deleteProject(){
//         this.closeModalConfirm();
//         const {dispatch} = this.props;
//         dispatch(removeProject(this.state.currentProject));
//         this.props.history.push("/projects/");
//     }
//
//     render() {
//        return (
//             <div>
//                 <Helmet>
//                     <title>{this.state.projectTitle}</title>
//                 </Helmet>
//                 <div className="row sameheight-container">
//                     <div className="col-md-12 component-container">
//                         <Link
//                             id="pd-link-to-list"
//                             to="/projects"
//                             className="back-link"
//                         >
//                             Back to list
//                         </Link>
//                         <div className="title-block block-space">
//                             <h3 className="title project-text">{this.state.projectTitle}</h3>
//                         </div>
//                         <div className="card card-default">
//                                 <div className="form-control boxed card-block project-text">
//                                     {this.state.projectDescription}
//                                 </div>
//                         </div>
//                         <div className="form-group">
//                             <button
//                                 id="pd-btn-to-edit"
//                                 className="btn btn-primary"
//                                 onClick={() => this.switchToEditMode()}
//                             >Edit</button>
//                             <button
//                                 id="pd-btn-to-delete"
//                                 type="reset"
//                                 className="btn btn-danger"
//                                 onClick={() => this.openModalConfirm()}
//                             >Delete</button>
//                         </div>
//
//                     </div>
//                 </div>
//                 <Modal show={this.state.showModalConfirm} onHide={() => this.closeModalConfirm()}>
//                     <Modal.Header closeButton>
//                     </Modal.Header>
//                     <Modal.Body>
//                         <p>Are you sure you want to delete a project?</p>
//                     </Modal.Body>
//                     <Modal.Footer>
//                         <Button
//                             id="pd-btn-modal-yes"
//                             className="btn btn-primary"
//                             onClick={() => this.deleteProject()}
//                         >Yes
//                         </Button>
//                         <Button
//                             id="pd-btn-modal-no"
//                             className="btn btn-danger"
//                             onClick={() => this.closeModalConfirm()}
//                             bsStyle="primary"
//                         >No
//                         </Button>
//                     </Modal.Footer>
//                 </Modal>
//             </div>
//         )
//     }
// }
//
//
// function mapStateToProps (state) {
//     return {
//         newProject: state.project,
//         newNote: state.notifications
//     }
// }
//
// export default connect(mapStateToProps)(ProjectDetails);
//
