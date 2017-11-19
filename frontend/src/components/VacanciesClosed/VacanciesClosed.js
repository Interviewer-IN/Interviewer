import React, {Component} from 'react';
import './vacanciesClosed.css';
import Helmet from "react-helmet";
import {PanelGroup, Modal, Button} from 'react-bootstrap';
import {connect} from "react-redux";

import PageTitle from './../../containers/PageTitle';
import Filters from './../../components/Filters';
import Panels from './../../components/Panels';
import {getVacancies, deleteVacancy, updateVacancy, createVacancy, addIndexExpandedElement} from "../../redux/actions/vacanciesActions";
import {levelsListName, positionsListName, projectsListName, getValueFromArr} from '../../utils/index';
import {DELETE_VACANCY, DUPLICATE_VACANCY, REOPEN_VACANCY, EXPANDED_ELEMENT_INDEX} from '../../config';

class VacanciesClosed extends Component {

    constructor(props) {
        super(props);

        this.state = {
            showModalConfirm: false,
            currentVacancyId: '',
            deleteVacancyText: DELETE_VACANCY,
            actionBtnMessage: REOPEN_VACANCY,
            duplicateMessage: DUPLICATE_VACANCY,
            positionsFilterID: '',
            levelsFilterID: '',
            projectsFilterID: '',
            levelsFilterVal: '',
            projectFilterVal: '',
            vacanciesListExist: true
        }

    }

    componentWillMount() {
        this.props.onCheckUserRole();
        const {dispatch} = this.props;

        if (!this.props.vacancies.length){
            dispatch(getVacancies()).then(
                (data) => {

                    if (!data.length){
                        this.setState({
                            vacanciesListExist: false
                        });
                    } else {
                        this.setState({
                            vacanciesListExist: true
                        });
                    }
                }
            );
        }

    }

    componentWillUnmount(){
        const {dispatch} = this.props;
        dispatch(addIndexExpandedElement(false));
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

    duplicateVacancy(duplicateData) {
        let successDuplicateMessage = this.state.duplicateMessage;
        const {dispatch} = this.props;
        dispatch(createVacancy(duplicateData, successDuplicateMessage, null, EXPANDED_ELEMENT_INDEX))
    }

    getPositionFilterVal(positionFilterVal) {
        let positionsList = this.props.positions,
            positionFilterId = 0;

        positionFilterId = getValueFromArr(positionsList, positionFilterVal, 'name');

        this.setState({
            positionsFilterID: positionFilterId
        })
    }

    getLevelFilterVal(levelFilterVal) {

        let levelsList = this.props.levels,
            levelFilterId = 0;

        levelFilterId = getValueFromArr(levelsList, levelFilterVal, 'name');

        this.setState({
            levelsFilterID: levelFilterId
        })
    }

    getProjectFilterVal(projectFilterVal) {
        let projectsList = this.props.projects,
            projectFilterId = 0;

        projectFilterId = getValueFromArr(projectsList, projectFilterVal, 'title');

        this.setState({
            projectsFilterID: projectFilterId
        })
    }


    render() {

        let vacanciesList = this.props.vacancies,
            projectsList = this.props.projects,
            levelsList = this.props.levels,
            positionsList = this.props.positions,
            levelsTitleObj = levelsListName(levelsList),
            positionsTitleObj = positionsListName(positionsList),
            projectsTitleObj = projectsListName(projectsList),
            vacanciesToDisplay = [],
            indexExpandedElement = this.props.indexExpandedElement;

        if (this.state.vacanciesListExist){
            if (vacanciesList.length && projectsList.length && levelsList.length && positionsList.length) {

                vacanciesList = vacanciesList.filter((current) => {
                    return current.status === false;
                });

                //-- FILTER BY POSITION  --------------------------
                let positionFilterID = this.state.positionsFilterID;

                if (positionFilterID) {
                    vacanciesList = vacanciesList.filter((current) => {
                        return (current.position_id === positionFilterID);
                    });
                }
                //-- END FILTER BY LEVEL -----------------------

                //-- FILTER BY LEVEL  --------------------------
                let levelFilterID = this.state.levelsFilterID;

                if (levelFilterID) {
                    vacanciesList = vacanciesList.filter((current) => {
                        return (current.level_id === levelFilterID);
                    });
                }
                //-- END FILTER BY LEVEL  -----------------------

                //-- FILTER BY PROJECT  --------------------------
                let projectFilterID = this.state.projectsFilterID;

                if (projectFilterID) {
                    vacanciesList = vacanciesList.filter((current) => {
                        return (current.project_id === projectFilterID);
                    });
                }
                //-- END FILTER BY PROJECT  -----------------------

                if (vacanciesList.length) {
                    vacanciesToDisplay = vacanciesList.map((item, index) => {

                        let vacancyId = item.id,
                            projectId = item.project_id,
                            levelId = item.level_id,
                            positionId = item.position_id,
                            indexElement = ++index,
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
                            <form className="custom-form">
                                <div className="form-group">
                                    <label className="control-label form-label">Description:  <span className="form-control-static">
                                        {item.description}
                                    </span></label>
                                </div>
                            </form>
                        );

                        let toExpandElement = () => {
                            return (indexElement === indexExpandedElement) ? (true) : (false);
                        };

                        return (
                            <Panels
                                key={vacancyId}
                                id={vacancyId}
                                defaultExpanded={toExpandElement()}
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
                                callAction={() => this.switchToClose(statusData)}
                                callDublicate={() => this.duplicateVacancy(duplicateData)}
                            />
                        )
                    })
                } else {
                    vacanciesToDisplay = (<h5 className="noData">No data of the requested type was found</h5>);
                }
                
            }
        } else {
            vacanciesToDisplay = (<h5 className="noData"> There is no data to display </h5>);
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
                            positionFilterVal={(event) => this.getPositionFilterVal(event)}
                            levelFilterVal={(event) => this.getLevelFilterVal(event)}
                            projectFilterVal={(event) => this.getProjectFilterVal(event)}
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
                                <p>{this.state.deleteVacancyText}</p>
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
        positions: state.positions.positions,
        indexExpandedElement: state.vacancies.indexExpandedElement
    }
}

export default connect(mapStateToProps)(VacanciesClosed);

