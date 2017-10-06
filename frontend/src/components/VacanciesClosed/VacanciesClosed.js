import React, {Component} from 'react';
import './vacanciesClosed.css';
import Helmet from "react-helmet";
import {PanelGroup, Modal, Button} from 'react-bootstrap';
import {connect} from "react-redux";

import PageTitle from './../../containers/PageTitle';
import Filters from './../../components/Filters';
import Panels from './../../components/Panels';
import {getVacancies, deleteVacancy, updateVacancy, createVacancy} from "../../redux/actions/vacanciesActions";

class VacanciesClosed extends Component {

    constructor(props) {
        super(props);

        this.state = {
            showModalConfirm: false,
            currentVacancyId: '',
            actionBtnMessage: 'Vacancy was reopened',
            duplicateMessage: 'Duplicate was added'
        }

    }

    componentWillMount() {
        const {dispatch} = this.props;
        dispatch(getVacancies());
        this.props.onCheckUserRole();
    }

    openModalConfirm(currentID) {
        this.setState({
            currentVacancyId: currentID,
            showModalConfirm: true
        });
    }

    closeModalConfirm() {
        this.setState({
            showModalConfirm: false
        })
    }

    deleteProject() {
        this.closeModalConfirm();
        const {dispatch} = this.props;
        dispatch(deleteVacancy(this.state.currentVacancyId));
    }

    switchToEditMode(currentID) {
        this.props.history.push("/vacancies-closed/vacancy/" + currentID + "/edit");
    }

    switchToClose(statusData) {
        let successCloseMessage = this.state.actionBtnMessage;
        const {dispatch} = this.props;
        dispatch(updateVacancy(statusData, successCloseMessage))
    }

    duplicateVacancy(duplicateData){
        let successDuplicateMessage = this.state.duplicateMessage;
        const {dispatch} = this.props;
        dispatch(createVacancy(duplicateData, successDuplicateMessage))
    }

    render() {

        let vacanciesList = this.props.vacancies,
            projectsList = this.props.projects,
            levelsList = this.props.levels,
            positionsList = this.props.positions,
            levelsTitleObj = {},
            positionsTitleObj = {},
            projectsTitleObj = {},
            vacanciesToDisplay = [];


        if (vacanciesList.length && projectsList.length && levelsList.length && positionsList.length) {

            projectsList.forEach((item) => {
                projectsTitleObj[item.id] = item.title;
            });


            levelsList.forEach((item) => {
                levelsTitleObj[item.id] = item.name;
            });

            positionsList.forEach((item) => {
                positionsTitleObj[item.id] = item.name;
            });

            vacanciesToDisplay = vacanciesList.map((item) => {

                let vacancyStatus = item.status;
                if (!vacancyStatus) {
                    let vacancyId = item.id,
                        projectId = item.project_id,
                        levelId = item.level_id,
                        positionId = item.position_id,
                        statusData = {
                            id: vacancyId,
                            status: true
                        },
                        duplicateData = {
                            description: item.description,
                            level_id: levelId,
                            position_id: positionId,
                            project_id: projectId,
                            status: false
                        };

                    const PAGE_TITLE = (
                        <div className="custom-panel-title panel-list-item">
                            <div className="custom-panel-title__right-side">
                                <div className="panel-collapse-btn">
                                    <span className="panel-collapse-btn__title btn-js">Expand</span>
                                    <span className="fa fa-angle-right panel-collapse-btn__arrow arrow-js"/>
                                </div>
                            </div>
                            <div className="custom-panel-title__left-side">
                                <div className="info-block">
                                    <div className="info-block__item text-bold--200">
                                        <span className="text-bold--600">{positionsTitleObj[positionId]}</span>
                                        <span> </span>
                                        <span className="text-bold--600">{levelsTitleObj[levelId]}</span>
                                        <span> for </span>
                                        <span className="text-bold--600">{projectsTitleObj[projectId]}</span>
                                        <span> project</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );

                    const DESCRIPTION = (
                        <div className="form-group">
                            <label className="control-label form-label">Description:</label>
                            <p className="form-control-static">
                                {item.description}
                            </p>
                        </div>
                    );

                    return (
                        <Panels
                            key={vacancyId}
                            id={vacancyId}
                            showActionBtn={true}
                            titleForActionBtn='Reopen vacancy'
                            titleConst={PAGE_TITLE}
                            description={DESCRIPTION}
                            showEditBtn={true}
                            showDuplicateBtn={true}
                            showDeleteBtn={true}
                            editBtnId={"edit-vacancy-" + vacancyId}
                            dublicateBtnId={"dublicate-vacancy-" + vacancyId}
                            deleteBtnId={"delete-vacancy-" + vacancyId}
                            callDelete={() => {
                                this.openModalConfirm(vacancyId)
                            }}
                            callEdit={() => this.switchToEditMode(vacancyId)}
                            changeStatus={() => this.switchToClose(statusData)}
                            callDublicate={() => this.duplicateVacancy(duplicateData)}
                        />
                    )
                }
            })
        }


        return (
            <div className="bcgr">
                <Helmet>
                    <title>Closed vacancies</title>
                </Helmet>
                <div className="row sameheight-container">
                    <div className="col-md-12">
                        <PageTitle
                            pageTitle='Closed vacancies'
                            showBackBtn={false}
                            showButton={true}
                            titleForButton='Create vacancy'
                            linkForButton='/vacancies-closed/create-vacancy'
                        />
                        <Filters
                            project={true}
                            position={true}
                            level={true}
                            date={false}
                        />

                        <PanelGroup bsClass='custom-panel-group'>
                            {vacanciesToDisplay}
                        </PanelGroup>
                        <Modal show={this.state.showModalConfirm}
                               onHide={() => this.closeModalConfirm()}
                               className="custom-btn-group">
                            <Modal.Header closeButton>
                            </Modal.Header>
                            <Modal.Body>
                                <p>Are you sure you want to delete the vacancy?</p>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button
                                    id={"btn-modal-yes-" + this.state.currentVacancyId}
                                    className="btn btn-primary"
                                    onClick={() => this.deleteProject()}
                                >Yes
                                </Button>
                                <Button
                                    id={"btn-modal-no-" + this.state.currentVacancyId}
                                    className="btn btn-danger"
                                    onClick={() => this.closeModalConfirm()}
                                    bsStyle="primary"
                                >No
                                </Button>
                            </Modal.Footer>
                        </Modal>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        vacancies: state.vacancies.vacancies,
        projects: state.project.projects,
        levels: state.levels.levels,
        positions: state.positions.positions
    }
}

export default connect(mapStateToProps)(VacanciesClosed);

