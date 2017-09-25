import React, {Component} from 'react';
import './createVacancy.css';
import PageTitle from './../../containers/PageTitle';
import TextareaAutosize from "react-autosize-textarea";
import {Modal, Button} from "react-bootstrap";
import {createBrowserHistory} from 'history';
import {connect} from "react-redux";
import {showProjects} from "../../redux/actions/projectActions";

const history = createBrowserHistory();

class CreateVacancy extends Component{
    constructor(props){
        super(props);
        this.state = {
            vacancyDescription:"",
            confirmText: "Are you sure you want to cancel without saving changes?",
            wrongCharMessage: "Please use only latin letters, numbers and special symbols",
            emptySelectsMessage: "Please set the parameter",
            showModalConfirm: false
        };

    }

    componentDidMount(){
        const {dispatch} = this.props;
        dispatch(showProjects());
    }

    handleSubmitForm(event){
        event.preventDefault();

        let currentForm = event.target;

        let removeAllErrorMessage = (currentForm) => {
            let allErrorMessages = currentForm.querySelectorAll('span.has-error'),
                allErrorTitles = currentForm.querySelectorAll('div.has-error');

            for (let i = 0; i < allErrorTitles.length; i++) {
                allErrorTitles[i].classList.remove('has-error');
            }

            for (let i = 0; i < allErrorMessages.length; i++) {
                allErrorMessages[i].remove();
            }
        };

        let createErrorElem = (errorMessage) => {
            let errorElem = document.createElement('span');
            errorElem.innerHTML = errorMessage;
            errorElem.classList.add('has-error');
            errorElem.classList.add('custom-error');

            return errorElem;
        };


        removeAllErrorMessage(currentForm);

        console.log('send form');

        //THE SELECTS BOXES CHECKING
        let mainSelectsDiv = document.getElementById('select-block'),
            selects = mainSelectsDiv.querySelectorAll('select'),
            selectsPassValidation = false,
            counter = 0;


        for (let i = 0; i < selects.length; i++){
            let selectItem = selects[i],
                index = selectItem.selectedIndex;


            if (!index) {
                counter -= 1;
                selectItem.parentNode.classList.add('has-error');
                selectItem.parentNode.appendChild(createErrorElem(this.state.emptySelectsMessage));
            } else {
                counter += 1;
            }

            if (counter === selects.length){
                selectsPassValidation = true;
            }
        }
        //----------------------------


        //TEXT_AREA FIELD CHECKING

        let regex =/^[a-zA-Z0-9\s!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/,
            descriptionField = this.refs.vacancy_desc.textarea,
            descriptionValue = this.refs.vacancy_desc.currentValue,
            descriptionPassValidation = false;


        if (!regex.test(descriptionValue)) {
            descriptionPassValidation = false;
            descriptionField.parentNode.classList.add('has-error');
            descriptionField.parentNode.appendChild(createErrorElem(this.state.wrongCharMessage));
        } else {
            descriptionPassValidation = true;
        }
        //-------------------------


        if (selectsPassValidation && descriptionPassValidation){
            this.resetFormFields();
            history.goBack();
        }

    }

    handleSelectChange(event){
        if (event.target.nextSibling !== null){
            event.target.parentNode.classList.remove('has-error');
            event.target.nextSibling.remove();
        }

    }

    handleDescriptionChange(event){
        this.setState({vacancyDescription: event.target.value});
        if (event.target.nextSibling !== null){
            event.target.parentNode.classList.remove('has-error');
            event.target.nextSibling.remove();
        }

    }

    isFieldsNotEmpty() {
        if (this.state.vacancyDescription) {
            this.setState({
                confirmText: "Are you sure you want to cancel without saving changes?"
            });
            this.openModalConfirm();
        } else {
            history.goBack();
        }
    }

    resetFormFields() {
        this.setState({vacancyDescription: ""});
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
        history.goBack();
    }

    render(){


        let showProjectFilter = () => {
            let projectList = this.props.newProject.projects,
                options = [];


            if (projectList !== undefined){
                options =  projectList.map((value, index) =>
                    <option key={index}>{value.title}</option>
                );
            }


            return (
                <div className="form-group">
                    <select className="form-control form-control-sm" id="project-filter" onChange={(event) => {this.handleSelectChange(event)}}>
                        <option>Select Projects</option>
                        {options}
                    </select>
                </div>
            );
        };


        return(
            <div className="bcgr">
                <div className="row sameheight-container">
                    <div className="col-md-12">
                        <PageTitle
                            pageTitle='Create vacancy'
                            showBackBtn={true}
                            showButton={false}
                            titleForButton='Create vacancy'
                            linkForButton='/create-vacancy'
                        />
                    </div>
                </div>
                <section className="section">
                    <div className="row sameheight-container">
                        <div className="col-md-12">
                            <form onSubmit={(event) => this.handleSubmitForm(event)}>

                                <div className="form-group form-filter-block">
                                    <label className="form-filter-block__title">Vacancy parameters</label>
                                    <div className="form-filter-block__selects-block" id="select-block">
                                        <div className="form-group">
                                            <select className="form-control form-control-sm" id="level-filter" onChange={(event) => {this.handleSelectChange(event)}}>
                                                <option>Select Levels</option>
                                                <option>Junior</option>
                                                <option>Middle</option>
                                                <option>Senior</option>
                                            </select>
                                        </div>
                                        <div className="form-group">
                                            <select className="form-control form-control-sm" id="position-filter" onChange={(event) => {this.handleSelectChange(event)}}>
                                                <option>Select Positions</option>
                                                <option>QA</option>
                                                <option>Frontend</option>
                                                <option>Backend</option>
                                            </select>
                                        </div>
                                        {showProjectFilter()}
                                    </div>

                                </div>



                                <div className="form-group">
                                    <label className="control-label form-label">Vacancy Description</label>
                                    <p className="form-sublabel"><small>Maximum 3000 characters</small></p>
                                    <TextareaAutosize
                                        id="create-vacancy-description"
                                        name="description"
                                        placeholder="Input Description"
                                        className="form-control boxed"
                                        maxLength="3000"
                                        rows={10}
                                        ref="vacancy_desc"
                                        value={this.state.vacancyDescription}
                                        onChange={(event) => this.handleDescriptionChange(event)}
                                    />
                                </div>
                                <div className="form-group custom-btn-group">
                                    <button
                                        id="create-vacancy-submitBtn"
                                        type="submit"
                                        className="btn btn-primary"
                                        disabled={this.state.vacancyDescription.length < 5}
                                    >Create
                                    </button>
                                    <button
                                        id="create-vacancy-resetBtn"
                                        type="reset"
                                        className="btn btn-primary"
                                        onClick={() => this.isFieldsNotEmpty()}
                                    >Cancel
                                    </button>
                                </div>
                            </form>
                            <Modal show={this.state.showModalConfirm} onHide={() => this.closeModalConfirm()}>
                                <Modal.Header closeButton>
                                </Modal.Header>
                                <Modal.Body>
                                    <p>Are you sure you want to cancel without saving changes?</p>
                                </Modal.Body>
                                <Modal.Footer>
                                   <div className="custom-btn-group">
                                       <Button
                                           id="modal-confirm-cancel"
                                           onClick={() => this.leaveForm()}>Cancel</Button>
                                       <Button
                                           id="modal-confirm-back"
                                           onClick={() => this.closeModalConfirm()} bsStyle="primary">Back to Create Vacancy</Button>
                                   </div>
                                </Modal.Footer>
                            </Modal>
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}

function mapStateToProps (state) {
    return {
        newProject: state.project
    }
}

export default connect(mapStateToProps)(CreateVacancy);