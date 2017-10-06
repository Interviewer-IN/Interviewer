import React, {Component} from 'react';
import './createVacancy.css';
import PageTitle from './../../containers/PageTitle';
import TextareaAutosize from "react-autosize-textarea";
import {Modal, Button} from "react-bootstrap";
import {createBrowserHistory} from 'history';
import {connect} from "react-redux";
import {fieldCharRegex} from "../../config"
import Helmet from 'react-helmet'
import {showProjects} from "../../redux/actions/projectActions";
import {getLevels} from "../../redux/actions/levelsActions";
import {getPositions} from "../../redux/actions/positionActions";
import {createVacancy} from "../../redux/actions/vacanciesActions";

const history = createBrowserHistory();

class CreateVacancy extends Component {
    constructor(props) {
        super(props);
        this.state = {
            vacancyDescription: "",
            confirmText: "Are you sure you want to cancel without saving changes?",
            wrongCharMessage: "Please use only latin letters, numbers and special symbols",
            emptySelectsMessage: "Please set the parameter",
            showModalConfirm: false,
            positionVal: '',
            levelVal: '',
            projectVal: ''
        };
    }


    componentWillMount() {
        this.props.onCheckUserRole();
        const {dispatch} = this.props;
        dispatch(showProjects());
        dispatch(getLevels());
        dispatch(getPositions());
    }

    handleSubmitForm(event) {
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

        //THE SELECTS BOXES CHECKING
        let mainSelectsDiv = document.getElementById('select-block'),
            selects = mainSelectsDiv.querySelectorAll('select'),
            selectsPassValidation = false,
            counter = 0;


        for (let i = 0; i < selects.length; i++) {
            let selectItem = selects[i],
                index = selectItem.selectedIndex;


            if (!index) {
                counter -= 1;
                selectItem.parentNode.classList.add('has-error');
                selectItem.parentNode.appendChild(createErrorElem(this.state.emptySelectsMessage));
            } else {
                counter += 1;
            }

            if (counter === selects.length) {
                selectsPassValidation = true;
            }
        }
        //----------------------------


        //--  TEXT_AREA FIELD CHECKING  ---------------

        let descriptionField = this.refs.vacancy_desc.textarea,
            descriptionValue = this.refs.vacancy_desc.currentValue,
            descriptionPassValidation = false;


        if (!fieldCharRegex.test(descriptionValue)) {
            descriptionPassValidation = false;
            descriptionField.parentNode.classList.add('has-error');
            descriptionField.parentNode.appendChild(createErrorElem(this.state.wrongCharMessage));
        } else {
            descriptionPassValidation = true;
        }
        //--  END TEXT_AREA FIELD CHECKING  ---------------

        //--  PREPARE FORM DATA FOR SENDING TO SERVER  -------------

        if (selectsPassValidation && descriptionPassValidation) {

            let positionSelectVal = this.state.positionVal,
                levelSelectVal = this.state.levelVal,
                projectSelectVal = this.state.projectVal,
                projectsList = this.props.newProject,
                positionsList = this.props.positions,
                levelsList = this.props.levels,
                projectsTitleObj = {},
                levelsTitleObj = {},
                positionsTitleObj = {};

            projectsList.forEach((item) => {
                projectsTitleObj[item.title] = item.id;
            });

            levelsList.forEach((item) => {
                levelsTitleObj[item.name] = item.id;
            });

            positionsList.forEach((item) => {
                positionsTitleObj[item.name] = item.id;
            });

            let formData = {
                description: descriptionValue,
                level_id: levelsTitleObj[levelSelectVal],
                position_id: positionsTitleObj[positionSelectVal],
                project_id: projectsTitleObj[projectSelectVal]
            };


            let {dispatch} = this.props,
                pathName = window.location.hash;


            let backPath = '#/' + pathName.split('/')[1];

            dispatch(createVacancy(formData, null, backPath));
        }
        //--  END PREPARE FORM DATA FOR SENDING TO SERVER  -----------


    }


    removeCurrentError(event) {
        if (event.target.nextSibling !== null) {
            event.target.parentNode.classList.remove('has-error');
            event.target.nextSibling.remove();
        }
    }

    handlePositionChange(event) {
        this.removeCurrentError(event);
        this.setState({positionVal: event.target.value});
    }

    handleLevelChange(event) {
        this.removeCurrentError(event);
        this.setState({levelVal: event.target.value});
    }

    handleProjectChange(event) {
        this.removeCurrentError(event);
        this.setState({projectVal: event.target.value});
    }


    handleDescriptionChange(event) {
        this.removeCurrentError(event);
        this.setState({vacancyDescription: event.target.value});
    }

    isFieldsNotEmpty() {
        if (this.state.vacancyDescription || this.state.projectVal || this.state.positionVal || this.state.levelVal) {
            this.openModalConfirm();
        } else {
            history.goBack();
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
        this.closeModalConfirm();
        history.goBack();
    }

    render() {

        let showLevelFilter = () => {
            let levelsList = this.props.levels,
                options = [];

            if (levelsList.length) {
                options = levelsList.map((value, index) => <option key={index}>{value.name}</option>);
            }
            return options;

        };

        let showPositionFilter = () => {
            let positionsList = this.props.positions,
                options = [];

            if (positionsList.length) {
                options = positionsList.map((value, index) => <option key={index}>{value.name}</option>);
            }
            return options;

        };

        let showProjectFilter = () => {
            let projectsList = this.props.newProject,
                options = [];

            if (projectsList.length) {
                options = projectsList.map((value, index) => <option key={index}>{value.title}</option>);
            }
            return options;

        };

        return (
            <div className="bcgr">
                <Helmet>
                    <title>Create vacancy</title>
                </Helmet>
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
                                            <select id="position-select"
                                                    className="form-control form-control-sm custom-mode"
                                                    value={this.state.positionVal}
                                                    onChange={(event) => {
                                                        this.handlePositionChange(event)
                                                    }}>
                                                <option>Select position</option>
                                                {showPositionFilter()}
                                            </select>
                                        </div>
                                        <div className="form-group">
                                            <select id="level-select"
                                                    className="form-control form-control-sm custom-mode"
                                                    value={this.state.levelVal}
                                                    onChange={(event) => {
                                                        this.handleLevelChange(event)
                                                    }}>
                                                <option>Select Level</option>
                                                {showLevelFilter()}
                                            </select>
                                        </div>
                                        <div className="form-group">
                                            <select id="project-select"
                                                    className="form-control form-control-sm custom-mode"
                                                    value={this.state.projectVal}
                                                    onChange={(event) => {
                                                        this.handleProjectChange(event)
                                                    }}>
                                                <option>Select Project</option>
                                                {showProjectFilter()}
                                            </select>
                                        </div>

                                    </div>

                                </div>


                                <div className="form-group">
                                    <label className="control-label form-label">Vacancy Description</label>
                                    <p className="form-sublabel">
                                        <small>Maximum 3000 characters</small>
                                    </p>
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
                                        autoFocus
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
                                        className="btn btn-danger"
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
                                            className="btn-danger"
                                            onClick={() => this.leaveForm()}>Cancel</Button>
                                        <Button
                                            id="modal-confirm-back"
                                            onClick={() => this.closeModalConfirm()} bsStyle="primary">Back to Create
                                            Vacancy</Button>
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

function mapStateToProps(state) {
    return {
        newProject: state.project.projects,
        positions: state.positions.positions,
        levels: state.levels.levels
    }
}

export default connect(mapStateToProps)(CreateVacancy);